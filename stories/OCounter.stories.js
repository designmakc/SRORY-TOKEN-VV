import OCounter from '../src/components/OCounter.vue'
import { useDesignTokens } from '../src/composables/useDesignTokens'

export default {
  title: 'Components/OCounter',
  component: OCounter,
  tags: ['autodocs'], // ⚠️ ОБЯЗАТЕЛЬНО для автоматической документации
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Текст или число для отображения в счетчике'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
      description: 'Стиль компонента'
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm', 'xs'],
      description: 'Размер компонента'
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
        component: 'Компонент OCounter используется для отображения количественных меток, уведомлений и компактных числовых значений. Применяется в составе кнопок, бейджей, тегов и навигационных элементов.'
      }
    }
  }
}

// Основные варианты - ИСПОЛЬЗУЕМ CSF3 ФОРМАТ С ОБЪЕКТАМИ
export const Primary = {
  args: {
    label: '2',
    variant: 'primary',
    size: 'md'
  }
}

export const Secondary = {
  args: {
    label: '5',
    variant: 'secondary',
    size: 'md'
  }
}

export const Tertiary = {
  args: {
    label: '12',
    variant: 'tertiary',
    size: 'md'
  }
}

export const Inverse = {
  args: {
    label: '99+',
    variant: 'inverse',
    size: 'md'
  }
}

// История Docs для автодокументации
export const Docs = {
  args: {
    label: '42',
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Основная документация компонента OCounter с примерами использования и описанием всех вариантов'
      }
    }
  }
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
  width: 32px;
  height: 32px;
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
  top: -4px;
  right: -4px;
}
</style>
`

// Добавляем стили в document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = storyStyles.replace('<style>', '').replace('</style>', '')
  document.head.appendChild(styleElement)
}








