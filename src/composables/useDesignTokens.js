// composables/useDesignTokens.js
import { ref, computed, watch } from 'vue';
import { 
  getSemanticTokens, 
  getComponentTokens,
  generateCSSVariables,
  clearCache,
  getConfigInfo,
  COLLECTION_HIERARCHY
} from '../utils/figma-variables-resolver';

// Глобальное состояние для темы и breakpoint
const currentTheme = ref('blue'); // blue, red, stone
const currentBreakpoint = ref('desktop'); // wide, desktop, tablet, mobile

/**
 * Композабл для работы с дизайн-токенами из Figma
 */
export function useDesignTokens() {
  // Вычисляемая конфигурация режимов
  const modeConfig = computed(() => ({
    theme: currentTheme.value,
    breakpoint: currentBreakpoint.value
  }));

  // Получение всех токенов (semantic + component) с учетом текущей темы и breakpoint
  const tokens = computed(() => {
    const semanticTokens = getSemanticTokens(modeConfig.value);
    const componentTokens = getComponentTokens(modeConfig.value);
    
    // Объединяем semantic и component токены
    return { ...semanticTokens, ...componentTokens };
  });

  // CSS переменные для инжекции в стили
  const cssVariables = computed(() => {
    return generateCSSVariables(modeConfig.value);
  });

  // Получение конкретного токена по имени
  const getToken = (tokenName) => {
    return tokens.value[tokenName] || null;
  };

  // Смена темы
  const setTheme = (theme) => {
    if (['blue', 'red', 'stone'].includes(theme)) {
      currentTheme.value = theme;
      clearCache(); // Очищаем кэш при смене темы
    } else {
      console.warn(`⚠️ Неизвестная тема: ${theme}`);
    }
  };

  // Смена breakpoint
  const setBreakpoint = (breakpoint) => {
    if (['wide', 'desktop', 'tablet', 'mobile'].includes(breakpoint)) {
      currentBreakpoint.value = breakpoint;
      clearCache(); // Очищаем кэш при смене breakpoint
    } else {
      console.warn(`⚠️ Неизвестный breakpoint: ${breakpoint}`);
    }
  };

  // Автоматическое определение breakpoint по ширине окна
  const setupResponsive = () => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setBreakpoint('wide');
      } else if (width >= 1280) {
        setBreakpoint('desktop');
      } else if (width >= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  };

  // Информация о конфигурации системы токенов
  const systemInfo = computed(() => getConfigInfo());

  return {
    // Состояние
    currentTheme: computed(() => currentTheme.value),
    currentBreakpoint: computed(() => currentBreakpoint.value),
    
    // Данные
    tokens,
    cssVariables,
    systemInfo,
    
    // Методы
    getToken,
    setTheme,
    setBreakpoint,
    setupResponsive
  };
}