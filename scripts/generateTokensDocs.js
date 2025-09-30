#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Импортируем resolver для работы с токенами
import { getComponentTokens, generateCSSVariables } from '../src/utils/figma-variables-resolver.js';

/**
 * Группирует токены по категориям
 */
function groupTokensByCategory(tokens) {
  const categories = {
    'color': {},
    'spacing': {},
    'size': {},
    'typography': {},
    'border': {},
    'button': {},
    'input': {},
    'icon': {},
    'background': {},
    'text': {},
    'other': {}
  };

  for (const [tokenName, tokenValue] of Object.entries(tokens)) {
    const category = getTokenCategory(tokenName);
    categories[category][tokenName] = tokenValue;
  }

  // Удаляем пустые категории
  Object.keys(categories).forEach(category => {
    if (Object.keys(categories[category]).length === 0) {
      delete categories[category];
    }
  });

  return categories;
}

/**
 * Определяет категорию токена по его названию
 */
function getTokenCategory(tokenName) {
  const lowerName = tokenName.toLowerCase();
  
  if (lowerName.includes('color/background')) return 'background';
  if (lowerName.includes('color/text')) return 'text';
  if (lowerName.includes('color/icon')) return 'icon';
  if (lowerName.includes('color/border')) return 'border';
  if (lowerName.includes('button')) return 'button';
  if (lowerName.includes('input')) return 'input';
  if (lowerName.includes('size/icon')) return 'icon';
  if (lowerName.includes('size/')) return 'size';
  if (lowerName.includes('typography/')) return 'typography';
  if (lowerName.includes('padding/') || lowerName.includes('gap/')) return 'spacing';
  if (lowerName.includes('color/')) return 'color';
  
  return 'other';
}

/**
 * Получает описание токена на основе его названия
 */
function getTokenDescription(tokenName, tokenValue) {
  const descriptions = {
    // Colors
    'color/background': 'Фоновый цвет',
    'color/text': 'Цвет текста',
    'color/border': 'Цвет границы',
    'color/icon': 'Цвет иконки',
    
    // Button
    'button/primary': 'Основная кнопка',
    'button/secondary': 'Вторичная кнопка',
    'button/ghost': 'Прозрачная кнопка',
    'button/outline': 'Кнопка с обводкой',
    
    // Sizes
    'size/icon': 'Размер иконки',
    'size/input': 'Размер поля ввода',
    'size/main': 'Основной размер',
    
    // Typography
    'typography/font-size': 'Размер шрифта',
    'typography/font-weight': 'Толщина шрифта',
    'typography/line-height': 'Высота строки',
    'typography/letter-spacing': 'Межбуквенное расстояние',
    
    // Spacing
    'padding': 'Внутренние отступы',
    'gap': 'Промежутки между элементами',
    
    // States
    'default': 'Обычное состояние',
    'hover': 'При наведении',
    'active': 'При нажатии',
    'focus': 'При фокусе',
    'disabled': 'Отключенное состояние',
    'error': 'Состояние ошибки',
    'success': 'Состояние успеха',
    'warning': 'Предупреждение'
  };

  // Ищем подходящее описание
  for (const [pattern, description] of Object.entries(descriptions)) {
    if (tokenName.includes(pattern)) {
      return description;
    }
  }

  return 'Токен дизайн-системы';
}

/**
 * Определяет тип токена
 */
function getTokenType(tokenName, tokenValue) {
  if (typeof tokenValue === 'string') {
    if (tokenValue.startsWith('rgb') || tokenValue.startsWith('rgba')) {
      return 'Color';
    }
    if (tokenValue.includes('px')) {
      return 'Size';
    }
    if (tokenValue.includes('rem') || tokenValue.includes('em')) {
      return 'Size';
    }
    return 'String';
  }
  
  if (typeof tokenValue === 'number') {
    return 'Number';
  }
  
  return 'Unknown';
}

/**
 * Генерирует пример использования токена
 */
function generateUsageExample(tokenName, tokenValue) {
  const cssVarName = `--${tokenName.replace(/\//g, '-')}`;
  
  if (tokenName.includes('color/background')) {
    return `background-color: var(${cssVarName});`;
  }
  
  if (tokenName.includes('color/text')) {
    return `color: var(${cssVarName});`;
  }
  
  if (tokenName.includes('color/border')) {
    return `border-color: var(${cssVarName});`;
  }
  
  if (tokenName.includes('size/icon')) {
    return `width: var(${cssVarName});\nheight: var(${cssVarName});`;
  }
  
  if (tokenName.includes('padding/')) {
    return `padding: var(${cssVarName});`;
  }
  
  if (tokenName.includes('gap/')) {
    return `gap: var(${cssVarName});`;
  }
  
  if (tokenName.includes('typography/font-size')) {
    return `font-size: var(${cssVarName});`;
  }
  
  if (tokenName.includes('typography/font-weight')) {
    return `font-weight: var(${cssVarName});`;
  }
  
  if (tokenName.includes('typography/line-height')) {
    return `line-height: var(${cssVarName});`;
  }
  
  if (tokenName.includes('border-radius')) {
    return `border-radius: var(${cssVarName});`;
  }
  
  return `var(${cssVarName})`;
}

/**
 * Генерирует Markdown документацию
 */
function generateMarkdownDocs(categories) {
  let markdown = `# 🎨 Доступные Design Tokens

> Автоматически сгенерированная документация токенов из Figma
> 
> **Последнее обновление:** ${new Date().toLocaleString('ru-RU')}
> 
> **Всего токенов:** ${Object.values(categories).reduce((total, category) => total + Object.keys(category).length, 0)}

## 📋 Содержание

`;

  // Генерируем содержание
  Object.keys(categories).forEach(category => {
    const categoryName = getCategoryDisplayName(category);
    const tokenCount = Object.keys(categories[category]).length;
    markdown += `- [${categoryName}](#${category}) (${tokenCount} токенов)\n`;
  });

  markdown += `\n---\n\n`;

  // Генерируем секции для каждой категории
  Object.entries(categories).forEach(([category, tokens]) => {
    const categoryName = getCategoryDisplayName(category);
    const tokenCount = Object.keys(tokens).length;
    
    markdown += `## ${categoryName} {#${category}}\n\n`;
    markdown += `**Количество токенов:** ${tokenCount}\n\n`;

    // Группируем токены по подкатегориям
    const subcategories = groupTokensBySubcategory(tokens);
    
    Object.entries(subcategories).forEach(([subcategory, subTokens]) => {
      if (subcategory !== 'general') {
        markdown += `### ${subcategory}\n\n`;
      }

      // Сортируем токены по алфавиту
      const sortedTokens = Object.entries(subTokens).sort(([a], [b]) => a.localeCompare(b));
      
      markdown += `| Токен | Значение | Тип | Описание | Использование |\n`;
      markdown += `|-------|----------|-----|----------|---------------|\n`;

      sortedTokens.forEach(([tokenName, tokenValue]) => {
        const cssVarName = `--${tokenName.replace(/\//g, '-')}`;
        const description = getTokenDescription(tokenName, tokenValue);
        const type = getTokenType(tokenName, tokenValue);
        const usage = generateUsageExample(tokenName, tokenValue);

        markdown += `| \`${cssVarName}\` | \`${tokenValue}\` | ${type} | ${description} | \`${usage}\` |\n`;
      });

      markdown += `\n`;
    });

    markdown += `---\n\n`;
  });

  // Добавляем секцию с примерами использования
  markdown += `## 🚀 Примеры использования

### В Vue компонентах

\`\`\`vue
<template>
  <button class="my-button">
    Кнопка
  </button>
</template>

<style scoped>
.my-button {
  background-color: var(--color-background-button-primary-default);
  color: var(--color-text-on-interactive-primary);
  padding: var(--padding-md);
  border-radius: var(--border-radius-md);
  font-size: var(--typography-font-size-header-sm);
}
</style>
\`\`\`

### В CSS

\`\`\`css
.card {
  background-color: var(--color-background-section-lvl-2-default);
  padding: var(--padding-lg);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-primary);
}

.card-title {
  color: var(--color-text-primary);
  font-size: var(--typography-font-size-header-md);
  font-weight: var(--typography-font-weight-header-md);
}
\`\`\`

### В JavaScript

\`\`\`javascript
import { useDesignTokens } from '@/composables/useDesignTokens';

export default {
  setup() {
    const { getToken } = useDesignTokens();
    
    const primaryColor = getToken('color/background/button/primary/default');
    const textColor = getToken('color/text/primary');
    
    return { primaryColor, textColor };
  }
}
\`\`\`

## 🔍 Поиск токенов

Используйте команду для поиска токенов:

\`\`\`bash
npm run tokens:info --search "button"
npm run tokens:info --search "color"
npm run tokens:info --search "size"
\`\`\`

## 📝 Обновление документации

Документация обновляется автоматически при изменении \`Basic-variables-full.json\`:

\`\`\`bash
npm run tokens:generate-docs
\`\`\`

---

*Документация сгенерирована автоматически системой Design Tokens*
`;

  return markdown;
}

/**
 * Получает отображаемое имя категории
 */
function getCategoryDisplayName(category) {
  const names = {
    'color': '🎨 Цвета',
    'spacing': '📏 Отступы и промежутки',
    'size': '📐 Размеры',
    'typography': '✍️ Типографика',
    'border': '🔲 Границы',
    'button': '🔘 Кнопки',
    'input': '📝 Поля ввода',
    'icon': '🎯 Иконки',
    'background': '🖼️ Фоны',
    'text': '📄 Текст',
    'other': '🔧 Прочие'
  };
  
  return names[category] || category;
}

/**
 * Группирует токены по подкатегориям
 */
function groupTokensBySubcategory(tokens) {
  const subcategories = {
    'general': {}
  };

  Object.entries(tokens).forEach(([tokenName, tokenValue]) => {
    const parts = tokenName.split('/');
    
    if (parts.length >= 2) {
      const subcategory = parts[1];
      if (!subcategories[subcategory]) {
        subcategories[subcategory] = {};
      }
      subcategories[subcategory][tokenName] = tokenValue;
    } else {
      subcategories['general'][tokenName] = tokenValue;
    }
  });

  return subcategories;
}

/**
 * Основная функция генерации документации
 */
async function generateTokensDocs() {
  try {
    console.log('🚀 Генерация документации токенов...');
    
    // Получаем компонентные токены (semantic + component)
    const tokens = getComponentTokens();
    console.log(`📊 Найдено ${Object.keys(tokens).length} токенов (semantic + component)`);
    
    // Группируем по категориям
    const categories = groupTokensByCategory(tokens);
    console.log(`📁 Создано ${Object.keys(categories).length} категорий`);
    
    // Генерируем Markdown
    const markdown = generateMarkdownDocs(categories);
    
    // Создаем директорию docs если её нет
    const docsDir = path.join(__dirname, '..', 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      console.log('📁 Создана директория docs/');
    }
    
    // Сохраняем файл
    const outputPath = path.join(docsDir, 'AVAILABLE_TOKENS.md');
    fs.writeFileSync(outputPath, markdown, 'utf8');
    
    console.log(`✅ Документация сохранена: ${outputPath}`);
    console.log(`📄 Размер файла: ${(markdown.length / 1024).toFixed(2)} KB`);
    
    // Показываем статистику
    console.log('\n📊 Статистика по категориям:');
    Object.entries(categories).forEach(([category, tokens]) => {
      const count = Object.keys(tokens).length;
      const percentage = ((count / Object.keys(tokens).length) * 100).toFixed(1);
      console.log(`  ${getCategoryDisplayName(category)}: ${count} токенов`);
    });
    
    console.log('\n🎉 Документация успешно сгенерирована!');
    
  } catch (error) {
    console.error('❌ Ошибка при генерации документации:', error);
    process.exit(1);
  }
}

// Запускаем генерацию
generateTokensDocs();
