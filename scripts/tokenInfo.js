// scripts/tokenInfo.js
// Скрипт для получения детальной информации о токенах
// Использование:
//   node scripts/tokenInfo.js                    # Общая информация
//   node scripts/tokenInfo.js --collection theme # Информация о коллекции
//   node scripts/tokenInfo.js --search button    # Поиск токенов

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const IGNORED_COLLECTIONS = ['EightShapes Specs', 'Specs Layout', 'content'];

// Парсим аргументы
const searchTerm = args.find(arg => !arg.startsWith('--')) || null;
const collection = args.find(arg => arg.startsWith('--collection'))?.split('=')[1] || null;

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

function loadTokens() {
  return JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../src/utils/Basic-variables-full.json'),
      'utf-8'
    )
  );
}

function showGeneralInfo() {
  const data = loadTokens();
  
  log('cyan', '\n' + '='.repeat(70));
  log('cyan', '📊 ОБЩАЯ ИНФОРМАЦИЯ О ТОКЕНАХ');
  log('cyan', '='.repeat(70) + '\n');

  const activeCollections = data.collections.filter(
    c => !IGNORED_COLLECTIONS.includes(c.name)
  );

  console.log(`Всего коллекций: ${activeCollections.length} (игнорируется ${data.collections.length - activeCollections.length})`);
  console.log(`Всего токенов: ${activeCollections.reduce((sum, c) => sum + c.variables.length, 0)}\n`);

  log('yellow', '📦 КОЛЛЕКЦИИ:\n');

  activeCollections.forEach(collection => {
    const modes = collection.modes.map(m => m.name).join(', ');
    const defaultMode = collection.modes.find(m => m.modeId === collection.defaultModeId)?.name;
    
    log('blue', `  ${collection.name}`);
    console.log(`    ├─ Токенов: ${collection.variables.length}`);
    console.log(`    ├─ Режимов: ${collection.modes.length} (${modes})`);
    console.log(`    └─ По умолчанию: ${defaultMode}`);
    console.log('');
  });

  // Статистика по типам
  log('yellow', '📈 СТАТИСТИКА ПО ТИПАМ:\n');
  
  const typeStats = {};
  activeCollections.forEach(collection => {
    collection.variables.forEach(variable => {
      const type = variable.resolvedType;
      typeStats[type] = (typeStats[type] || 0) + 1;
    });
  });

  Object.entries(typeStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const bar = '█'.repeat(Math.ceil(count / 10));
      console.log(`    ${type.padEnd(15)} ${count.toString().padStart(4)} ${bar}`);
    });

  console.log('');
}

function showCollectionInfo(collectionName) {
  const data = loadTokens();
  const collection = data.collections.find(c => c.name === collectionName);

  if (!collection) {
    log('red', `\n❌ Коллекция "${collectionName}" не найдена\n`);
    log('yellow', 'Доступные коллекции:');
    data.collections.forEach(c => console.log(`  - ${c.name}`));
    console.log('');
    return;
  }

  log('cyan', '\n' + '='.repeat(70));
  log('cyan', `📦 КОЛЛЕКЦИЯ: ${collection.name}`);
  log('cyan', '='.repeat(70) + '\n');

  console.log(`ID: ${collection.id}`);
  console.log(`Токенов: ${collection.variables.length}`);
  console.log(`Режимов: ${collection.modes.length}\n`);

  log('yellow', '🎨 РЕЖИМЫ:\n');
  collection.modes.forEach(mode => {
    const isDefault = mode.modeId === collection.defaultModeId ? '(по умолчанию)' : '';
    console.log(`  ${mode.name.padEnd(15)} ${isDefault}`);
  });

  log('yellow', '\n📋 ТОП-20 ТОКЕНОВ:\n');
  collection.variables.slice(0, 20).forEach((variable, index) => {
    console.log(`  ${(index + 1).toString().padStart(2)}. ${variable.name}`);
    if (variable.description) {
      console.log(`      ${colors.cyan}${variable.description}${colors.reset}`);
    }
    console.log(`      Тип: ${variable.resolvedType}`);
    
    // Показываем пример значения
    const firstMode = collection.modes[0];
    const value = variable.valuesByMode[firstMode.modeId];
    
    if (value?.type === 'VARIABLE_ALIAS') {
      console.log(`      Значение: → ссылка на другой токен`);
    } else if (variable.resolvedType === 'COLOR' && typeof value === 'object') {
      const { r, g, b, a = 1 } = value;
      console.log(`      Значение: rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${a})`);
    } else {
      console.log(`      Значение: ${JSON.stringify(value)}`);
    }
    console.log('');
  });

  if (collection.variables.length > 20) {
    console.log(`  ... и ещё ${collection.variables.length - 20} токенов\n`);
  }
}

function searchTokens(searchTerm) {
  const data = loadTokens();
  
  log('cyan', '\n' + '='.repeat(70));
  log('cyan', `🔍 ПОИСК: "${searchTerm}"`);
  log('cyan', '='.repeat(70) + '\n');

  let foundCount = 0;

  data.collections.forEach(collection => {
    if (IGNORED_COLLECTIONS.includes(collection.name)) return;

    const matches = collection.variables.filter(v => 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matches.length > 0) {
      log('blue', `\n  📦 ${collection.name} (${matches.length} найдено):\n`);
      
      matches.forEach(variable => {
        console.log(`    • ${variable.name}`);
        if (variable.description) {
          console.log(`      ${colors.cyan}${variable.description}${colors.reset}`);
        }
        console.log(`      Тип: ${variable.resolvedType}`);
        console.log('');
        foundCount++;
      });
    }
  });

  if (foundCount === 0) {
    log('yellow', '  Ничего не найдено\n');
  } else {
    log('green', `\n✓ Найдено токенов: ${foundCount}\n`);
  }
}

function showHelp() {
  log('cyan', '\n' + '='.repeat(70));
  log('cyan', '📚 СПРАВКА');
  log('cyan', '='.repeat(70) + '\n');
  
  console.log('Использование:');
  console.log('  node scripts/tokenInfo.js [опции]\n');
  
  console.log('Опции:');
  console.log('  (без опций)              Показать общую информацию');
  console.log('  --collection <name>      Показать информацию о коллекции');
  console.log('  --search <term>          Найти токены по названию или описанию');
  console.log('  --help                   Показать эту справку\n');
  
  console.log('Примеры:');
  console.log('  node scripts/tokenInfo.js');
  console.log('  node scripts/tokenInfo.js --collection Semantic');
  console.log('  node scripts/tokenInfo.js --collection theme');
  console.log('  node scripts/tokenInfo.js --search button');
  console.log('  node scripts/tokenInfo.js --search "primary color"\n');
}

// Главная функция
function main() {
  try {
    if (args.includes('--help') || args.includes('-h')) {
      showHelp();
      return;
    }

    // Проверяем поиск по термину
    if (searchTerm) {
      searchTokens(searchTerm);
      return;
    }

    // Проверяем коллекцию
    if (collection) {
      showCollectionInfo(collection);
      return;
    }

    // По умолчанию показываем общую информацию
    showGeneralInfo();
    
  } catch (error) {
    log('red', '\n❌ Ошибка:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();