// scripts/componentAudit.js
// Скрипт для аудита существующих компонентов на соответствие токенам
// Запуск: node scripts/componentAudit.js --component src/components/OCheckbox.vue --tokens review-tokens/checkbox_tokens.json

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(colors[color], ...args, colors.reset);
}

function auditComponent() {
  // Получаем аргументы командной строки
  const args = process.argv.slice(2);
  
  let componentPath, tokensPath;
  
  // Проверяем аргументы
  const componentIndex = args.indexOf('--component');
  const tokensIndex = args.indexOf('--tokens');
  
  if (componentIndex !== -1 && tokensIndex !== -1) {
    // Используем --component и --tokens
    componentPath = args[componentIndex + 1];
    tokensPath = args[tokensIndex + 1];
  } else if (args.length >= 2) {
    // Используем позиционные аргументы
    componentPath = args[0];
    tokensPath = args[1];
  } else {
    log('red', '❌ Ошибка: Укажите пути к файлам');
    log('yellow', 'Примеры:');
    log('yellow', '  npm run tokens:audit -- --component src/components/OCheckbox.vue --tokens review-tokens/checkbox_tokens.json');
    log('yellow', '  npm run tokens:audit -- src/components/OCheckbox.vue review-tokens/checkbox_tokens.json');
    process.exit(1);
  }

  if (!componentPath || !tokensPath) {
    log('red', '❌ Ошибка: Укажите пути к файлам');
    process.exit(1);
  }

  log('blue', '\n🔍 НАЧИНАЕМ АУДИТ КОМПОНЕНТА...\n');

  try {
    // Загружаем компонент
    const componentContent = fs.readFileSync(
      path.resolve(__dirname, '..', componentPath),
      'utf-8'
    );

    // Загружаем токены
    const tokensData = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, '..', tokensPath),
        'utf-8'
      )
    );

    // Загружаем данные системы токенов
    const variablesData = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, '../src/utils/Basic-variables-full.json'),
        'utf-8'
      )
    );

    // Создаем карту токенов для быстрого поиска
    const tokenMap = new Map();
    variablesData.collections.forEach(collection => {
      collection.variables.forEach(variable => {
        const fullName = `${collection.name}/${variable.name}`;
        tokenMap.set(fullName, {
          ...variable,
          collection: collection.name,
          collectionId: collection.id
        });
      });
    });

    // Извлекаем токены из файла токенов
    const expectedTokens = new Set();
    if (tokensData.tokensPreview) {
      tokensData.tokensPreview.forEach(token => {
        expectedTokens.add(token.token);
      });
    }

    // Извлекаем CSS переменные из компонента
    const cssVariables = new Set();
    const hardcodedValues = [];
    
    // Ищем var(--token-name)
    const varMatches = componentContent.match(/var\(--[^)]+\)/g) || [];
    varMatches.forEach(match => {
      const tokenName = match.replace('var(--', '').replace(')', '');
      // Преобразуем CSS переменную в формат токена
      // --checkbox-border-radius -> component/checkbox/border-radius
      // --color-border-interactive-default -> semantic/color/border/interactive/default
      const tokenFormat = tokenName.replace(/-/g, '/');
      
      // Добавляем префикс коллекции в зависимости от типа токена
      let fullTokenName = tokenFormat;
      if (tokenFormat.startsWith('checkbox/')) {
        fullTokenName = `component/${tokenFormat}`;
      } else if (tokenFormat.startsWith('color/') || tokenFormat.startsWith('gap/') || 
                 tokenFormat.startsWith('padding/') || tokenFormat.startsWith('typography/')) {
        fullTokenName = `semantic/${tokenFormat}`;
      } else if (tokenFormat.startsWith('typography/font-family/')) {
        fullTokenName = `primitive/${tokenFormat}`;
      }
      
      // Также проверяем токены без префиксов (как они используются в компоненте)
      cssVariables.add(tokenFormat);
      
      cssVariables.add(fullTokenName);
    });

    // Ищем хардкод значения
    const hardcodedMatches = componentContent.match(/(#[0-9a-fA-F]{3,6}|[0-9]+(px|rem|em|%|vh|vw))/g) || [];
    hardcodedMatches.forEach(match => {
      // Исключаем значения из var() и комментариев
      if (!match.includes('var(') && !match.includes('/*')) {
        hardcodedValues.push(match);
      }
    });

    // Отладочная информация
    log('cyan', '\n🔍 ОТЛАДОЧНАЯ ИНФОРМАЦИЯ:');
    log('blue', `  Ожидаемых токенов: ${expectedTokens.size}`);
    log('blue', `  Используемых токенов: ${cssVariables.size}`);
    
    // Показываем первые несколько токенов для сравнения
    const expectedArray = Array.from(expectedTokens).slice(0, 5);
    const usedArray = Array.from(cssVariables).slice(0, 5);
    log('green', `  Ожидаемые (первые 5): ${expectedArray.join(', ')}`);
    log('yellow', `  Используемые (первые 5): ${usedArray.join(', ')}`);

    // Анализируем соответствие
    const usedTokens = new Set();
    const unusedExpectedTokens = new Set();
    const invalidTokens = new Set();
    const missingTokens = new Set();

    // Проверяем используемые токены
    cssVariables.forEach(token => {
      if (expectedTokens.has(token)) {
        usedTokens.add(token);
      } else {
        invalidTokens.add(token);
      }
    });

    // Проверяем ожидаемые токены
    expectedTokens.forEach(token => {
      if (!cssVariables.has(token)) {
        missingTokens.add(token);
      }
    });

    // Проверяем валидность токенов в системе
    const systemValidTokens = new Set();
    const systemInvalidTokens = new Set();

    cssVariables.forEach(token => {
      if (tokenMap.has(token)) {
        systemValidTokens.add(token);
      } else {
        systemInvalidTokens.add(token);
      }
    });

    // Выводим результаты
    log('cyan', `\n📄 АУДИТ КОМПОНЕНТА: ${path.basename(componentPath)}`);
    log('cyan', '='.repeat(60));

    // Статистика
    log('blue', '\n📊 СТАТИСТИКА:');
    log('green', `  ✅ Используется токенов: ${usedTokens.size}`);
    log('yellow', `  ⚠️  Отсутствует ожидаемых токенов: ${missingTokens.size}`);
    log('red', `  ❌ Неверных токенов: ${invalidTokens.size}`);
    log('red', `  ❌ Невалидных в системе: ${systemInvalidTokens.size}`);
    log('yellow', `  ⚠️  Хардкод значений: ${hardcodedValues.length}`);

    // Показываем используемые токены
    if (usedTokens.size > 0) {
      log('green', '\n  ✅ ИСПОЛЬЗУЕМЫЕ ТОКЕНЫ:');
      usedTokens.forEach(token => {
        const tokenInfo = tokenMap.get(token);
        log('green', `    • ${token} (${tokenInfo?.resolvedType || 'unknown'})`);
      });
    }

    // Показываем отсутствующие ожидаемые токены
    if (missingTokens.size > 0) {
      log('yellow', '\n  ⚠️  ОТСУТСТВУЮЩИЕ ОЖИДАЕМЫЕ ТОКЕНЫ:');
      missingTokens.forEach(token => {
        log('yellow', `    • ${token}`);
      });
    }

    // Показываем неверные токены
    if (invalidTokens.size > 0) {
      log('red', '\n  ❌ НЕВЕРНЫЕ ТОКЕНЫ (не из файла токенов):');
      invalidTokens.forEach(token => {
        log('red', `    • ${token}`);
      });
    }

    // Показываем невалидные в системе токены
    if (systemInvalidTokens.size > 0) {
      log('red', '\n  ❌ НЕВАЛИДНЫЕ В СИСТЕМЕ ТОКЕНЫ:');
      systemInvalidTokens.forEach(token => {
        log('red', `    • ${token}`);
      });
    }

    // Показываем хардкод
    if (hardcodedValues.length > 0) {
      log('yellow', '\n  ⚠️  ХАРДКОД ЗНАЧЕНИЯ:');
      hardcodedValues.forEach(value => {
        log('yellow', `    • ${value}`);
      });
    }

    // Оценка соответствия
    const totalExpected = expectedTokens.size;
    const usedExpected = usedTokens.size;
    const compliancePercentage = totalExpected > 0 ? (usedExpected / totalExpected * 100) : 0;

    log('blue', '\n📈 ОЦЕНКА СООТВЕТСТВИЯ:');
    
    if (compliancePercentage === 100) {
      log('green', `  🎉 СООТВЕТСТВИЕ: ${compliancePercentage.toFixed(1)}% - ИДЕАЛЬНО!`);
    } else if (compliancePercentage >= 80) {
      log('yellow', `  ⚠️  СООТВЕТСТВИЕ: ${compliancePercentage.toFixed(1)}% - ХОРОШО`);
    } else {
      log('red', `  ❌ СООТВЕТСТВИЕ: ${compliancePercentage.toFixed(1)}% - ТРЕБУЕТ ИСПРАВЛЕНИЯ`);
    }

    // Рекомендации
    log('cyan', '\n💡 РЕКОМЕНДАЦИИ:');
    
    if (missingTokens.size > 0) {
      log('yellow', '• Добавьте отсутствующие ожидаемые токены в компонент');
    }
    
    if (invalidTokens.size > 0) {
      log('red', '• Замените неверные токены на правильные из файла токенов');
    }
    
    if (systemInvalidTokens.size > 0) {
      log('red', '• Исправьте токены, которые не найдены в системе');
    }
    
    if (hardcodedValues.length > 0) {
      log('yellow', '• Замените хардкод значения на токены');
    }
    
    if (compliancePercentage === 100 && hardcodedValues.length === 0) {
      log('green', '• Компонент полностью соответствует токенам!');
    }

    // Финальная оценка
    log('blue', '\n' + '='.repeat(60));
    
    if (compliancePercentage === 100 && hardcodedValues.length === 0 && systemInvalidTokens.size === 0) {
      log('green', '🎉 КОМПОНЕНТ ПОЛНОСТЬЮ СООТВЕТСТВУЕТ ТОКЕНАМ!');
    } else if (compliancePercentage >= 80 && hardcodedValues.length === 0) {
      log('yellow', '⚠️  КОМПОНЕНТ В ОСНОВНОМ СООТВЕТСТВУЕТ, НО ЕСТЬ ЗАМЕЧАНИЯ');
    } else {
      log('red', '❌ КОМПОНЕНТ ТРЕБУЕТ ИСПРАВЛЕНИЯ');
    }

    log('blue', '='.repeat(60));

  } catch (error) {
    log('red', `❌ Ошибка при аудите компонента: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Запускаем аудит
try {
  auditComponent();
} catch (error) {
  log('red', '\n❌ Ошибка при аудите:', error.message);
  console.error(error);
  process.exit(1);
}
