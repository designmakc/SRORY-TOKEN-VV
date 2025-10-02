// .storybook/preview.js
import '../src/assets/fonts/fonts.css';
import '../src/assets/styles/storybook-fixes.css';

import { setup } from '@storybook/vue3';
import { useDesignTokens } from '@/composables/useDesignTokens';

// Функция для инжекции CSS переменных в DOM
const injectTokensToDOM = () => {
  const { cssVariables } = useDesignTokens();
  const root = document.documentElement;
  
  const cssVars = cssVariables.value;
  if (!cssVars) {
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

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  applyStorybookBackgrounds();
};

// Функция для применения правильных фонов в Storybook
const applyStorybookBackgrounds = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Фоны для всех областей Storybook */
    .docs-story,
    .sb-show-main,
    .sb-main-padded,
    .sb-canvas {
      background-color: var(--color-background-page-lvl-2) !important;
      font-family: var(--typography-font-family-body) !important;
      color: var(--color-text-primary) !important;
    }
    
    
  `;
  
  const existingStyle = document.getElementById('storybook-backgrounds');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  style.id = 'storybook-backgrounds';
  document.head.appendChild(style);
};

// Глобальный декоратор
export const decorators = [
  (story) => {
    // Инжектируем токены при монтировании
    setTimeout(() => {
      injectTokensToDOM();
    }, 0);
    
    return {
      components: { story },
      template: '<div style="display: inline-block; width: 100%; height: fit-content;"><story /></div>'
    };
  }
];

// Глобальные параметры
export const parameters = {
  actions: { 
    argTypesRegex: '^on[A-Z].*' 
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: false,
  },
  docs: {
    source: {
      type: 'dynamic',
      state: 'open',
      excludeDecorators: true,
      format: true,
      language: 'html',
    },
  },
  layout: 'centered',
  backgrounds: {
    disable: true,
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
  window.$injectTokens = injectTokensToDOM;
  window.$tokens = useDesignTokens();
  
  setTimeout(() => {
    injectTokensToDOM();
  }, 100);
});

export { useDesignTokens };