// scripts/tokensReview.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function log(color, ...args) {
  console.log(colors[color], ...args, colors.reset);
}

// Витягує CSS змінні з Vue файлу
function extractCSSVariablesFromVue(vueFilePath) {
  const content = fs.readFileSync(vueFilePath, 'utf-8');
  const cssVariables = new Set();
  
  // Шукаємо всі var(--...) у <style>
  const varRegex = /var\(--([a-z0-9-]+)\)/gi;
  let match;
  
  while ((match = varRegex.exec(content)) !== null) {
    cssVariables.add(match[1]); // без префіксу --
  }
  
  return cssVariables;
}

// Конвертує токен Figma в CSS змінну (БЕЗ префіксу колекції)
function tokenToCSSVar(token) {
  // Видаляємо префікс колекції (component/, semantic/, primitive/)
  let cleanToken = token;
  if (token.startsWith('component/')) {
    cleanToken = token.substring('component/'.length);
  } else if (token.startsWith('semantic/')) {
    cleanToken = token.substring('semantic/'.length);
  } else if (token.startsWith('primitive/')) {
    cleanToken = token.substring('primitive/'.length);
  }
  
  // 1. CamelCase → kebab-case
  const kebabCase = cleanToken.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
  // 2. Замінюємо слэши на дефіси
  const cssName = kebabCase.replace(/\//g, '-').toLowerCase();
  return cssName;
}

function reviewTokens() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    log('red', '❌ Використання:');
    log('yellow', '  npm run tokens:review -- review-tokens/checkbox_tokens.json src/components/OCheckbox.vue');
    process.exit(1);
  }
  
  const figmaJsonPath = path.resolve(__dirname, '..', args[0]);
  const vueFilePath = path.resolve(__dirname, '..', args[1]);
  
  if (!fs.existsSync(figmaJsonPath)) {
    log('red', `❌ Файл Figma не знайдено: ${figmaJsonPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(vueFilePath)) {
    log('red', `❌ Vue компонент не знайдено: ${vueFilePath}`);
    process.exit(1);
  }

  // Завантажуємо дані
  const figmaData = JSON.parse(fs.readFileSync(figmaJsonPath, 'utf-8'));
  
  // Витягуємо CSS змінні з Vue
  const vueTokens = extractCSSVariablesFromVue(vueFilePath);

  log('cyan', '\n' + '='.repeat(70));
  log('cyan', '🔍 ПЕРЕВІРКА ТОКЕНІВ У VUE КОМПОНЕНТІ');
  log('cyan', '='.repeat(70));
  log('blue', `\n📄 Figma JSON: ${args[0]}`);
  log('blue', `📄 Vue компонент: ${args[1]}`);

  // Створюємо мапу токенів з Figma
  const figmaTokensMap = new Map();
  if (figmaData.tokensPreview && Array.isArray(figmaData.tokensPreview)) {
    figmaData.tokensPreview.forEach(token => {
      if (token.token) {
        const cssVar = tokenToCSSVar(token.token);
        figmaTokensMap.set(cssVar, {
          fullName: token.token,
          type: token.type,
          usageCount: token.usageCount
        });
      }
    });
  }

  log('blue', `\n📊 СТАТИСТИКА:`);
  log('blue', `  📦 Токенів у Figma: ${figmaTokensMap.size}`);
  log('blue', `  💻 Токенів у Vue: ${vueTokens.size}`);

  // АНАЛІЗ 1: Токени у Vue, які є в Figma ✅
  const correctTokens = [];
  vueTokens.forEach(cssVar => {
    if (figmaTokensMap.has(cssVar)) {
      const figmaToken = figmaTokensMap.get(cssVar);
      correctTokens.push({
        cssVar,
        figmaToken: figmaToken.fullName,
        usageCount: figmaToken.usageCount
      });
    }
  });

  // АНАЛІЗ 2: Токени у Vue, яких НЕМАЄ в Figma ❌
  const notInFigma = [];
  vueTokens.forEach(cssVar => {
    if (!figmaTokensMap.has(cssVar)) {
      notInFigma.push(cssVar);
    }
  });

  // АНАЛІЗ 3: Токени з Figma, які НЕ використані у Vue ⚠️
  const notUsedInVue = [];
  figmaTokensMap.forEach((data, cssVar) => {
    if (!vueTokens.has(cssVar)) {
      notUsedInVue.push({
        cssVar,
        figmaToken: data.fullName,
        usageCount: data.usageCount
      });
    }
  });

  // ВИВЕДЕННЯ РЕЗУЛЬТАТІВ

  log('green', `\n✅ ПРАВИЛЬНО ВИКОРИСТАНІ (${correctTokens.length}):`);
  log('green', '   Ці токени є в Figma і використовуються у Vue\n');
  if (correctTokens.length > 0) {
    correctTokens.forEach(item => {
      log('green', `   • --${item.cssVar}`);
      log('green', `     Figma: ${item.figmaToken}`);
      log('green', `     Використань у Figma: ${item.usageCount}x`);
    });
  } else {
    log('red', '   Немає правильно використаних токенів!');
  }

  log('red', `\n❌ ВИКОРИСТАНІ У VUE, АЛЕ НЕМАЄ В FIGMA (${notInFigma.length}):`);
  log('red', '   Ці токени використовуються у Vue, але відсутні в Figma JSON\n');
  if (notInFigma.length > 0) {
    notInFigma.forEach(cssVar => {
      log('red', `   • --${cssVar}`);
      log('yellow', `     ⚠️  Можливо треба додати в Figma або видалити з Vue`);
    });
  } else {
    log('green', '   Немає таких токенів - відмінно!');
  }

  log('yellow', `\n⚠️  Є В FIGMA, АЛЕ НЕ ВИКОРИСТАНІ У VUE (${notUsedInVue.length}):`);
  log('yellow', '   Ці токени є в Figma, але не використовуються у Vue\n');
  if (notUsedInVue.length > 0) {
    notUsedInVue.forEach(item => {
      log('yellow', `   • --${item.cssVar}`);
      log('yellow', `     Figma: ${item.figmaToken}`);
      log('yellow', `     Використань у Figma: ${item.usageCount}x`);
      log('yellow', `     💡 Додайте цей токен у Vue компонент`);
    });
  } else {
    log('green', '   Всі токени використані - відмінно!');
  }

  // ЗАГАЛЬНА ОЦІНКА
  const totalExpected = figmaTokensMap.size;
  const correctUsage = correctTokens.length;
  const readiness = totalExpected > 0 ? (correctUsage / totalExpected * 100) : 100;

  log('cyan', `\n${'─'.repeat(70)}`);
  
  if (readiness === 100 && notInFigma.length === 0) {
    log('green', colors.bright + `🎉 ГОТОВНІСТЬ: ${readiness.toFixed(1)}% - ІДЕАЛЬНО!`);
    log('green', '✅ Всі токени з Figma використані правильно');
    log('green', '✅ Немає зайвих токенів у Vue');
  } else if (readiness >= 80) {
    log('yellow', colors.bright + `⚠️  ГОТОВНІСТЬ: ${readiness.toFixed(1)}%`);
    if (notUsedInVue.length > 0) {
      log('yellow', `⚠️  Додайте ${notUsedInVue.length} токенів у Vue`);
    }
    if (notInFigma.length > 0) {
      log('yellow', `⚠️  Перевірте ${notInFigma.length} токенів (немає в Figma)`);
    }
  } else {
    log('red', colors.bright + `❌ ГОТОВНІСТЬ: ${readiness.toFixed(1)}%`);
    log('red', `❌ ${notUsedInVue.length} токенів з Figma не використані`);
    if (notInFigma.length > 0) {
      log('red', `❌ ${notInFigma.length} токенів у Vue немає в Figma`);
    }
  }

  log('cyan', '='.repeat(70) + '\n');
}

try {
  reviewTokens();
} catch (error) {
  log('red', '\n❌ Помилка:', error.message);
  console.error(error.stack);
  process.exit(1);
}