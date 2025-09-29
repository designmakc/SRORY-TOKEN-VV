// .storybook/preview.js
import '../src/assets/fonts/fonts.css'; // ДОБАВЬ ЭТУ СТРОКУ

import { setup } from '@storybook/vue3';
import { useDesignTokens } from '@/composables/useDesignTokens';

// Функция для инжекции CSS переменных в DOM
const injectTokensToDOM = () => {
  const { cssVariables } = useDesignTokens();
  const root = document.documentElement;
  
  console.log('🎨 Storybook: Инжектирую токены в DOM...');
  
  const cssVars = cssVariables.value;
  if (!cssVars) {
    console.error('⚠️ Storybook: CSS переменные пустые');
    return;
  }

  // Парсим и применяем CSS переменные
  const vars = cssVars.split('\n').reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed) return acc;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) return acc;
    
    const key = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).replace(';', '').trim();
    
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  console.log(`✅ Storybook: Найдено ${Object.keys(vars).length} токенов`);

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Применяем стили для Storybook фонов
  applyStorybookBackgrounds();
  
  console.log('✅ Storybook: Токены применены к :root');
};

// Функция для применения правильных фонов в Storybook
const applyStorybookBackgrounds = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Фон для документации (левая панель) */
    .docs-story {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Фон для Canvas (область с компонентом) */
    .sb-show-main {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Фон для Canvas в режиме документации */
    .docs-story .sb-show-main {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Фон для основной области Storybook */
    .sb-main-padded {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Фон для Canvas области */
    .sb-canvas {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Фон для документации */
    .docs-story .docs-story {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
    
    /* Стили для story-label */
    .story-label {
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-secondary) !important;
    }
  `;
  
  // Удаляем старые стили если есть
  const existingStyle = document.getElementById('storybook-backgrounds');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  style.id = 'storybook-backgrounds';
  document.head.appendChild(style);
};

// Глобальный декоратор для инжекции CSS переменных
export const decorators = [
  (story, context) => {
    return {
      components: { story },
      template: `<story />`,
      setup() {
        // Инжектируем токены при рендере каждой истории
        setTimeout(() => {
          injectTokensToDOM();
        }, 0);
        
        // Применяем стили при смене темы
        if (context.globals.theme) {
          setTimeout(() => {
            applyStorybookBackgrounds();
          }, 100);
        }
        
        return {};
      }
    };
  }
];

// Глобальные параметры Storybook
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'page-lvl-2',
    values: [
      {
        name: 'page-lvl-2',
        value: 'var(--color-background-page-lvl-2)',
        title: 'Основной фон страницы (lvl-2)'
      },
      {
        name: 'page-lvl-2',
        value: 'var(--color-background-page-lvl-2)',
        title: 'Фон секций страницы (lvl-2)'
      },
      {
        name: 'page-lvl-3',
        value: 'var(--color-background-page-lvl-2)',
        title: 'Фон карточек на странице (lvl-2)'
      },
    ],
  },
};

// Глобальные типы для toolbar
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Тема оформления',
    defaultValue: 'blue',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'blue', title: 'Blue Theme' },
        { value: 'red', title: 'Red Theme' },
        { value: 'stone', title: 'Stone Theme' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  breakpoint: {
    name: 'Breakpoint',
    description: 'Адаптивный breakpoint',
    defaultValue: 'desktop',
    toolbar: {
      icon: 'browser',
      items: [
        { value: 'wide', title: 'Wide (≥1920px)' },
        { value: 'desktop', title: 'Desktop (≥1280px)' },
        { value: 'tablet', title: 'Tablet (≥768px)' },
        { value: 'mobile', title: 'Mobile (<768px)' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

// Настройка Vue 3
setup((app) => {
  // Добавляем глобальные функции для отладки
  window.$injectTokens = injectTokensToDOM;
  window.$tokens = useDesignTokens();
  
  // Инжектируем токены сразу при загрузке Storybook
  setTimeout(() => {
    console.log('🚀 Storybook: Инициализация токенов...');
    injectTokensToDOM();
  }, 100);
  
  // Обработчик смены темы
  const handleThemeChange = () => {
    console.log('🎨 Storybook: Смена темы, обновляю фоны...');
    setTimeout(() => {
      applyStorybookBackgrounds();
    }, 200);
  };
  
  // Добавляем обработчик для toolbar
  window.addEventListener('storybook-theme-changed', handleThemeChange);
});

// Экспорт для использования в stories
export { useDesignTokens };