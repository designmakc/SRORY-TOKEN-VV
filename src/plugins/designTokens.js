// plugins/designTokens.js
import { useDesignTokens } from '../composables/useDesignTokens';

/**
 * Плагин Vue для автоматической инжекции CSS переменных дизайн-токенов
 * Использование: app.use(designTokensPlugin, options)
 */
export const designTokensPlugin = {
  install(app, options = {}) {
    const {
      autoInject = true,
      targetElement = ':root',
      initialTheme = 'blue',
      enableResponsive = true,
      prefix = '--'
    } = options;

    const { setTheme, setupResponsive, cssVariables } = useDesignTokens();

    // Устанавливаем начальную тему
    setTheme(initialTheme);

    // Функция для инжекции CSS переменных
    const injectTokens = () => {
      if (!autoInject) {
        console.log('⚠️ Автоинжекция отключена');
        return;
      }

      const target = document.documentElement; // Используем documentElement вместо querySelector
      if (!target) {
        console.error('⚠️ Root element не найден');
        return;
      }

      console.log('🎨 Инжектирую токены...');
      
      const cssVars = cssVariables.value;
      console.log('🔍 cssVariables.value:', cssVars);
      
      if (!cssVars) {
        console.error('⚠️ CSS переменные пустые');
        console.log('🔍 cssVariables объект:', cssVariables);
        return;
      }

      console.log('📝 CSS переменные получены:', cssVars.substring(0, 200) + '...');

      // Парсим и применяем
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

      console.log(`✅ Найдено ${Object.keys(vars).length} токенов`);

      Object.entries(vars).forEach(([key, value]) => {
        target.style.setProperty(key, value);
      });
      
      console.log('✅ Токены применены к :root');
      
      // Проверяем, что токены действительно применились
      const testVar = '--counter-padding-md-vertical';
      const appliedValue = getComputedStyle(target).getPropertyValue(testVar);
      console.log(`🔍 Проверка токена ${testVar}:`, appliedValue);
      
      if (!appliedValue) {
        console.error(`❌ Токен ${testVar} не найден в DOM!`);
      } else {
        console.log(`✅ Токен ${testVar} успешно применен: ${appliedValue}`);
      }
    };

    // Инжектируем токены сразу после установки темы
    setTimeout(() => {
      console.log('🔄 Первая попытка инжекции токенов...');
      injectTokens();
    }, 0);

    // Инжектируем токены при монтировании
    app.mixin({
      mounted() {
        console.log('🚀 Компонент смонтирован:', this.$el?.tagName);
        // Инжектируем токены для любого компонента
        setTimeout(() => {
          console.log('🔄 Инжекция токенов после монтирования...');
          injectTokens();
        }, 50);
      }
    });

    // Дополнительная инжекция через DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('🔄 DOM загружен, инжектирую токены...');
        setTimeout(() => {
          injectTokens();
        }, 100);
      });
    } else {
      // DOM уже загружен
      console.log('🔄 DOM уже загружен, инжектирую токены...');
      setTimeout(() => {
        injectTokens();
      }, 100);
    }

    // Настраиваем responsive, если включено
    if (enableResponsive) {
      const cleanup = setupResponsive();
      
      // Очистка при размонтировании приложения
      app.config.globalProperties.$cleanupTokens = cleanup;
    }

    // Глобальное свойство для доступа к токенам
    app.config.globalProperties.$tokens = useDesignTokens();
    
    // Глобальная функция для ручной инжекции
    app.config.globalProperties.$injectTokens = injectTokens;
    
    // Добавляем в window для глобального доступа
    window.$injectTokens = injectTokens;
    window.$tokens = useDesignTokens();

    console.log('✅ Design Tokens Plugin установлен');
  }
};

// Директива для применения токенов к конкретному элементу
export const vTokens = {
  mounted(el, binding) {
    const { getToken } = useDesignTokens();
    const tokens = binding.value;

    if (typeof tokens === 'object') {
      Object.entries(tokens).forEach(([cssProperty, tokenName]) => {
        const value = getToken(tokenName);
        if (value !== null) {
          el.style[cssProperty] = value;
        }
      });
    }
  },
  updated(el, binding) {
    const { getToken } = useDesignTokens();
    const tokens = binding.value;

    if (typeof tokens === 'object') {
      Object.entries(tokens).forEach(([cssProperty, tokenName]) => {
        const value = getToken(tokenName);
        if (value !== null) {
          el.style[cssProperty] = value;
        }
      });
    }
  }
};

export default designTokensPlugin;