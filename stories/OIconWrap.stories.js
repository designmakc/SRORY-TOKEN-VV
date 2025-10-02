import OIconWrap from '../src/components/OIconWrap.vue'
import { useDesignTokens } from '../src/composables/useDesignTokens'

export default {
  title: 'Components/OIconWrap',
  component: OIconWrap,
  tags: ['autodocs'], // ⚠️ ОБЯЗАТЕЛЬНО для автоматической документации
  argTypes: {
    sizeIcon: {
      control: { type: 'select' },
      options: [12, 16, 20, 24, 32, 40, 56],
      description: 'Размер иконки в пикселях'
    },
    icon: {
      control: { type: 'text' },
      description: 'Путь к иконке (категория/название)'
    },
    hasCounter: {
      control: { type: 'boolean' },
      description: 'Показывать счетчик (только для размеров 24 и 32)'
    },
    hasOwnColor: {
      control: { type: 'boolean' },
      description: 'Использовать исходные цвета иконки'
    },
    iconColor: {
      control: { type: 'color' },
      description: 'Цвет иконки через токен'
    },
    counterValue: {
      control: { type: 'number' },
      description: 'Значение счетчика'
    },
    counterVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
      description: 'Вариант счетчика'
    }
  },
  decorators: [
    (story, context) => {
      const { setTheme, setBreakpoint } = useDesignTokens();
      if (context.globals.theme) setTheme(context.globals.theme);
      if (context.globals.breakpoint) setBreakpoint(context.globals.breakpoint);
      return { components: { story }, template: '<story />' };
    }
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент для отображения иконок с поддержкой счетчиков. Поддерживает различные размеры, цвета и интеграцию с OCounter компонентом.'
      }
    }
  }
}

// Основные варианты
export const Default = {
  args: {
    sizeIcon: 24,
    icon: 'navigation-action/play',
    hasCounter: false,
    hasOwnColor: false,
    iconColor: 'var(--color-icon-primary)',
    counterValue: 2,
    counterVariant: 'inverse'
  },
  parameters: {
    docs: {
      source: {
        code: '<OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="false" :hasOwnColor="false" iconColor="var(--color-icon-primary)" :counterValue="2" counterVariant="inverse" />',
      },
    },
  },
}

// 1. Basic Icons
export const BasicIcons = {
  args: {
    sizeIcon: 24,
    icon: 'navigation-action/play',
    hasCounter: false,
    hasOwnColor: false
  },
  parameters: {
    docs: {
      source: {
        code: '<OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="false" :hasOwnColor="false" />',
      },
    },
  },
}

// 2. With Counter
export const WithCounter = {
  args: {
    sizeIcon: 24,
    icon: 'communication/notification-bell-filled',
    hasCounter: true,
    counterValue: 3,
    counterVariant: 'inverse'
  },
  parameters: {
    docs: {
      source: {
        code: '<OIconWrap :sizeIcon="24" icon="communication/notification-bell-filled" :hasCounter="true" :counterValue="3" counterVariant="inverse" />',
      },
    },
  },
}

// 3. Different Sizes
export const DifferentSizes = {
  args: {
    sizeIcon: 32,
    icon: 'navigation-action/settings',
    hasCounter: false,
    hasOwnColor: false
  },
  parameters: {
    docs: {
      source: {
        code: '<OIconWrap :sizeIcon="32" icon="navigation-action/settings" :hasCounter="false" :hasOwnColor="false" />',
      },
    },
  },
}

// 4. With Own Colors
export const WithOwnColors = {
  args: {
    sizeIcon: 24,
    icon: 'navigation-action/heart-filled',
    hasCounter: false,
    hasOwnColor: true
  },
  parameters: {
    docs: {
      source: {
        code: '<OIconWrap :sizeIcon="24" icon="navigation-action/heart-filled" :hasCounter="false" :hasOwnColor="true" />',
      },
    },
  },
}

// 5. All Variants
export const AllVariants = {
  render: () => ({
    components: { OIconWrap },
    template: `
      <div class="story-container">
        <div class="story-row">
          <span class="story-label">Primary:</span>
          <OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="true" :counterValue="2" counterVariant="primary" />
        </div>
        <div class="story-row">
          <span class="story-label">Secondary:</span>
          <OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="true" :counterValue="5" counterVariant="secondary" />
        </div>
        <div class="story-row">
          <span class="story-label">Tertiary:</span>
          <OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="true" :counterValue="12" counterVariant="tertiary" />
        </div>
        <div class="story-row">
          <span class="story-label">Inverse:</span>
          <OIconWrap :sizeIcon="24" icon="navigation-action/play" :hasCounter="true" :counterValue="99" counterVariant="inverse" />
        </div>
      </div>
    `
  })
}

// 6. In Context
export const InContext = {
  render: () => ({
    components: { OIconWrap },
    template: `
      <div class="context-container">
        <div class="context-buttons">
          <button class="context-button context-button--primary">
            <OIconWrap :sizeIcon="20" icon="navigation-action/play" />
            Play
          </button>
          <button class="context-button context-button--secondary">
            <OIconWrap :sizeIcon="20" icon="navigation-action/settings" />
            Settings
          </button>
        </div>
        
        <div class="context-stats">
          <div class="stat-item">
            <OIconWrap :sizeIcon="24" icon="communication/notification-bell-filled" :hasCounter="true" :counterValue="3" />
            <span class="stat-label">Notifications</span>
          </div>
          <div class="stat-item">
            <OIconWrap :sizeIcon="24" icon="communication/bubble-message-filled" :hasCounter="true" :counterValue="7" />
            <span class="stat-label">Messages</span>
          </div>
        </div>
        
        <div class="context-avatars">
          <div class="avatar-container">
            <span class="avatar-icon">👤</span>
            <div class="avatar-badge">
              <OIconWrap :sizeIcon="16" icon="navigation-action/heart-filled" :hasCounter="true" :counterValue="1" />
            </div>
          </div>
          <div class="avatar-container">
            <span class="avatar-icon">👤</span>
            <div class="avatar-badge">
              <OIconWrap :sizeIcon="16" icon="navigation-action/heart-filled" :hasCounter="true" :counterValue="99" />
            </div>
          </div>
        </div>
      </div>
    `
  })
}

// Добавляем CSS стили для Stories
const storyStyles = `
<style>
.story-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.story-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background-page-lvl-1);
}

.story-row--dark {
  background-color: var(--color-background-page-lvl-2);
}

.story-label {
  font-size: var(--typography-font-size-sm);
  font-weight: var(--typography-font-weight-medium);
  width: 80px;
  color: var(--color-text-primary);
  font-family: var(--typography-font-family-body);
}

.story-row--dark .story-label {
  color: var(--color-text-inverse);
}

/* Новые стили для замены Tailwind */
.sizes-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.number-logic-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.number-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.number-label {
  font-size: var(--typography-font-size-sm);
  color: var(--color-text-secondary);
  width: 80px;
  font-family: var(--typography-font-family-body);
}

.context-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--color-background-page-lvl-1);
  border-radius: var(--border-radius-lg);
}

.context-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.context-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: none;
  cursor: pointer;
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-sm);
  font-weight: var(--typography-font-weight-medium);
}

.context-button--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-on-interactive-primary);
}

.context-button--secondary {
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
}

.context-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-label {
  font-size: var(--typography-font-size-sm);
  color: var(--color-text-primary);
  font-family: var(--typography-font-family-body);
}

.context-avatars {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.avatar-container {
  position: relative;
  width: var(--size-avatar-md);
  height: var(--size-avatar-md);
  background-color: var(--color-background-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: var(--typography-font-size-xs);
}

.avatar-badge {
  position: absolute;
  top: calc(-1 * var(--gap-3xs));
  right: calc(-1 * var(--gap-3xs));
}
</style>
`

// Добавляем стили в document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = storyStyles.replace('<style>', '').replace('</style>', '')
  document.head.appendChild(styleElement)
}









