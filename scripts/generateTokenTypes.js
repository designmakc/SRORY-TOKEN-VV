// scripts/generateTokenTypes.js
// Скрипт для генерации TypeScript типов из токенов Figma
// Запуск: node scripts/generateTokenTypes.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Импортируем данные токенов
const variablesData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../src/utils/Basic-variables-full.json'),
    'utf-8'
  )
);

const IGNORED_COLLECTIONS = ['EightShapes Specs', 'Specs Layout', 'content'];

function generateTypes() {
  const types = {
    themes: new Set(),
    breakpoints: new Set(),
    collections: new Map(),
    tokens: new Map()
  };

  // Собираем информацию о коллекциях и токенах
  variablesData.collections.forEach(collection => {
    if (IGNORED_COLLECTIONS.includes(collection.name)) return;

    // Собираем режимы
    collection.modes.forEach(mode => {
      if (collection.name === 'theme') {
        types.themes.add(mode.name);
      } else if (collection.name === 'adaptive') {
        types.breakpoints.add(mode.name);
      }
    });

    // Собираем имена токенов
    collection.variables.forEach(variable => {
      types.tokens.set(variable.name, {
        type: variable.resolvedType,
        collection: collection.name,
        description: variable.description || ''
      });
    });

    types.collections.set(collection.name, {
      modes: collection.modes.map(m => m.name),
      variableCount: collection.variables.length
    });
  });

  // Генерируем TypeScript файл
  let tsContent = `// Auto-generated file. Do not edit manually.
// Generated at: ${new Date().toISOString()}

/**
 * Доступные темы оформления
 */
export type ThemeName = ${Array.from(types.themes).map(t => `'${t}'`).join(' | ')};

/**
 * Доступные breakpoints
 */
export type Breakpoint = ${Array.from(types.breakpoints).map(b => `'${b}'`).join(' | ')};

/**
 * Конфигурация режимов для токенов
 */
export interface TokenModeConfig {
  /** Тема оформления */
  theme?: ThemeName;
  /** Breakpoint для адаптивности */
  breakpoint?: Breakpoint;
  /** Дополнительные режимы коллекций */
  [collectionName: string]: string | undefined;
}

/**
 * Типы значений токенов
 */
export type TokenValue = string | number;

/**
 * Имена всех доступных токенов
 */
export type TokenName = 
${Array.from(types.tokens.keys())
  .map(name => `  | '${name}'`)
  .join('\n')};

/**
 * Типы токенов по категориям
 */
export type ColorToken = string;
export type SpacingToken = number;
export type FontSizeToken = number;
export type BorderRadiusToken = number;

/**
 * Маппинг коллекций
 */
export interface CollectionInfo {
  modes: string[];
  variableCount: number;
}

export const COLLECTIONS: Record<string, CollectionInfo> = {
${Array.from(types.collections.entries())
  .map(([name, info]) => `  '${name}': {
    modes: [${info.modes.map(m => `'${m}'`).join(', ')}],
    variableCount: ${info.variableCount}
  }`)
  .join(',\n')}
};

/**
 * Константы тем
 */
export const THEMES = [${Array.from(types.themes).map(t => `'${t}'`).join(', ')}] as const;

/**
 * Константы breakpoints
 */
export const BREAKPOINTS = [${Array.from(types.breakpoints).map(b => `'${b}'`).join(', ')}] as const;

/**
 * Информация о токенах
 */
export interface TokenInfo {
  type: string;
  collection: string;
  description: string;
}

export const TOKEN_INFO: Record<TokenName, TokenInfo> = {
${Array.from(types.tokens.entries())
  .slice(0, 50) // Ограничиваем для примера
  .map(([name, info]) => `  '${name}': {
    type: '${info.type}',
    collection: '${info.collection}',
    description: '${info.description.replace(/'/g, "\\'")}'
  }`)
  .join(',\n')}
  // ... и остальные токены
};
`;

  // Сохраняем файл
  const outputPath = path.resolve(__dirname, '../src/types/tokens.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, tsContent);

  console.log('✅ TypeScript типы успешно сгенерированы:', outputPath);
  console.log(`📊 Статистика:
  - Тем: ${types.themes.size}
  - Breakpoints: ${types.breakpoints.size}
  - Коллекций: ${types.collections.size}
  - Токенов: ${types.tokens.size}
  `);

  return types;
}

// Запускаем генерацию
try {
  generateTypes();
} catch (error) {
  console.error('❌ Ошибка при генерации типов:', error);
  process.exit(1);
}