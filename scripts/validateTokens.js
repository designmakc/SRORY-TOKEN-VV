// scripts/validateTokens.js
// Скрипт для валидации токенов и поиска проблем
// Запуск: node scripts/validateTokens.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IGNORED_COLLECTIONS = ['EightShapes Specs', 'Specs Layout', 'content'];
const REQUIRED_COLLECTIONS = ['Primitive', 'Semantic', 'theme', 'adaptive'];

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(color, ...args) {
  console.log(colors[color], ...args, colors.reset);
}

function validateTokens() {
  log('blue', '\n🔍 Начинаем валидацию токенов...\n');

  // Загружаем данные
  const variablesData = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../src/utils/Basic-variables-full.json'),
      'utf-8'
    )
  );

  const issues = [];
  const warnings = [];
  const stats = {
    totalCollections: 0,
    totalVariables: 0,
    totalModes: 0,
    brokenAliases: 0,
    emptyValues: 0
  };

  // Карты для быстрого поиска
  const variableMap = new Map();
  const collectionMap = new Map();

  // Строим карты
  variablesData.collections.forEach(collection => {
    collectionMap.set(collection.id, collection);
    collection.variables.forEach(variable => {
      variableMap.set(variable.id, variable);
    });
  });

  // 1. Проверяем наличие обязательных коллекций
  log('yellow', '📋 Проверка структуры коллекций...');
  const existingCollections = variablesData.collections.map(c => c.name);
  
  REQUIRED_COLLECTIONS.forEach(required => {
    if (!existingCollections.includes(required)) {
      issues.push(`❌ Отсутствует обязательная коллекция: ${required}`);
    } else {
      log('green', `  ✓ Коллекция "${required}" найдена`);
    }
  });

  // 2. Проверяем технические коллекции
  const technicalCollections = existingCollections.filter(name => 
    IGNORED_COLLECTIONS.includes(name)
  );
  
  if (technicalCollections.length > 0) {
    log('green', `  ✓ Технические коллекции будут игнорироваться: ${technicalCollections.join(', ')}`);
  }

  // 3. Анализируем каждую коллекцию
  log('yellow', '\n📊 Анализ коллекций...');
  
  variablesData.collections.forEach(collection => {
    if (IGNORED_COLLECTIONS.includes(collection.name)) {
      return; // Пропускаем технические
    }

    stats.totalCollections++;
    stats.totalModes += collection.modes.length;
    stats.totalVariables += collection.variables.length;

    log('blue', `\n  📦 Коллекция: ${collection.name}`);
    log('blue', `     Режимов: ${collection.modes.length}`);
    log('blue', `     Переменных: ${collection.variables.length}`);

    // Проверяем режимы
    if (collection.modes.length === 0) {
      warnings.push(`⚠️  Коллекция "${collection.name}" не имеет режимов`);
    }

    // Проверяем переменные
    collection.variables.forEach(variable => {
      const modes = Object.keys(variable.valuesByMode);
      
      // Проверяем, что есть значения для всех режимов
      if (modes.length !== collection.modes.length) {
        warnings.push(
          `⚠️  Переменная "${variable.name}" имеет значения не для всех режимов (${modes.length}/${collection.modes.length})`
        );
      }

      // Проверяем каждое значение
      Object.entries(variable.valuesByMode).forEach(([modeId, value]) => {
        if (value === null || value === undefined) {
          stats.emptyValues++;
          issues.push(`❌ Пустое значение у "${variable.name}" в режиме ${modeId}`);
        }

        // Проверяем алиасы
        if (value?.type === 'VARIABLE_ALIAS') {
          const aliasId = value.id;
          
          // Проверка обычных алиасов
          if (!aliasId.includes('/')) {
            if (!variableMap.has(aliasId)) {
              stats.brokenAliases++;
              issues.push(
                `❌ Сломанная ссылка у "${variable.name}": ссылается на несуществующую переменную ${aliasId}`
              );
            }
          }
          // Проверка кросс-JSON ссылок
          else if (aliasId.startsWith('VariableID:')) {
            const keyPart = aliasId.substring('VariableID:'.length, aliasId.indexOf('/'));
            const found = Array.from(variableMap.values()).some(v => v.key === keyPart);
            
            if (!found) {
              stats.brokenAliases++;
              issues.push(
                `❌ Сломанная кросс-ссылка у "${variable.name}": ключ ${keyPart} не найден`
              );
            }
          }
        }

        // Проверяем цвета
        if (variable.resolvedType === 'COLOR' && typeof value === 'object' && value.type !== 'VARIABLE_ALIAS') {
          const { r, g, b } = value;
          if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
            warnings.push(
              `⚠️  Некорректные RGB значения у "${variable.name}": r=${r}, g=${g}, b=${b}`
            );
          }
        }
      });
    });
  });

  // 4. Проверяем специфичные для вашей структуры вещи
  log('yellow', '\n🎨 Проверка тематической структуры...');
  
  const themeCollection = variablesData.collections.find(c => c.name === 'theme');
  if (themeCollection) {
    const themeNames = themeCollection.modes.map(m => m.name);
    const expectedThemes = ['blue', 'red', 'stone'];
    
    expectedThemes.forEach(theme => {
      if (themeNames.includes(theme)) {
        log('green', `  ✓ Тема "${theme}" найдена`);
      } else {
        warnings.push(`⚠️  Ожидаемая тема "${theme}" не найдена`);
      }
    });
  }

  const adaptiveCollection = variablesData.collections.find(c => c.name === 'adaptive');
  if (adaptiveCollection) {
    const breakpoints = adaptiveCollection.modes.map(m => m.name);
    const expectedBreakpoints = ['wide', 'desktop', 'tablet', 'mobile'];
    
    expectedBreakpoints.forEach(bp => {
      if (breakpoints.includes(bp)) {
        log('green', `  ✓ Breakpoint "${bp}" найден`);
      } else {
        warnings.push(`⚠️  Ожидаемый breakpoint "${bp}" не найден`);
      }
    });
  }

  // Выводим результаты
  log('blue', '\n' + '='.repeat(60));
  log('blue', '📊 СТАТИСТИКА');
  log('blue', '='.repeat(60));
  console.log(`Всего коллекций: ${stats.totalCollections}`);
  console.log(`Всего переменных: ${stats.totalVariables}`);
  console.log(`Всего режимов: ${stats.totalModes}`);
  console.log(`Сломанных ссылок: ${stats.brokenAliases}`);
  console.log(`Пустых значений: ${stats.emptyValues}`);

  if (warnings.length > 0) {
    log('yellow', '\n' + '='.repeat(60));
    log('yellow', '⚠️  ПРЕДУПРЕЖДЕНИЯ');
    log('yellow', '='.repeat(60));
    warnings.forEach(w => console.log(w));
  }

  if (issues.length > 0) {
    log('red', '\n' + '='.repeat(60));
    log('red', '❌ КРИТИЧЕСКИЕ ПРОБЛЕМЫ');
    log('red', '='.repeat(60));
    issues.forEach(i => console.log(i));
    log('red', '\n❌ Валидация не пройдена!\n');
    process.exit(1);
  } else {
    log('green', '\n' + '='.repeat(60));
    log('green', '✅ ВАЛИДАЦИЯ УСПЕШНО ЗАВЕРШЕНА!');
    log('green', '='.repeat(60));
    log('green', '\nВсе токены корректны и готовы к использованию.\n');
  }
}

// Запускаем валидацию
try {
  validateTokens();
} catch (error) {
  log('red', '\n❌ Ошибка при валидации:', error.message);
  console.error(error);
  process.exit(1);
}