import OCounter from '../src/components/OCounter.vue'
import { useDesignTokens } from '../src/composables/useDesignTokens'

// Функция для генерации динамического кода
const generateCode = (args) => {
  const props = [];
  
  // Добавляем только измененные props (не дефолтные)
  if (args.label && args.label !== '2') props.push(`label="${args.label}"`);
  if (args.variant && args.variant !== 'primary') props.push(`variant="${args.variant}"`);
  if (args.size && args.size !== 'md') props.push(`size="${args.size}"`);
  
  // Форматирование для читабельности
  if (props.length <= 2) {
    return `<OCounter ${props.join(' ')} />`;
  } else {
    return `<OCounter\n  ${props.join('\n  ')}\n/>`;
  }
};

export default {
  title: 'Components/OCounter',
  component: OCounter,
  tags: ['autodocs'], // ⚠️ ОБЯЗАТЕЛЬНО для автоматической документации
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Текст или число для отображения в счетчике',
      table: {
        defaultValue: { summary: '2' }
      }
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
      description: 'Стиль компонента',
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm', 'xs'],
      description: 'Размер компонента',
      table: {
        defaultValue: { summary: 'md' }
      }
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
  },
  render: (args) => ({
    components: { OCounter },
    setup() { return { args }; },
    template: '<OCounter v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
}

export const Secondary = {
  args: {
    label: '5',
    variant: 'secondary',
    size: 'md'
  },
  render: (args) => ({
    components: { OCounter },
    setup() { return { args }; },
    template: '<OCounter v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
}

export const Tertiary = {
  args: {
    label: '12',
    variant: 'tertiary',
    size: 'md'
  },
  render: (args) => ({
    components: { OCounter },
    setup() { return { args }; },
    template: '<OCounter v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
}

export const Inverse = {
  args: {
    label: '99+',
    variant: 'inverse',
    size: 'md'
  },
  render: (args) => ({
    components: { OCounter },
    setup() { return { args }; },
    template: '<OCounter v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
}

// История Docs для автодокументации
export const Docs = {
  args: {
    label: '42',
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    components: { OCounter },
    setup() { return { args }; },
    template: '<OCounter v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
      description: {
        story: 'Основная документация компонента OCounter с примерами использования и описанием всех вариантов'
      }
    }
  }
}

// Все варианты
export const AllVariants = {
  render: () => ({
    components: { OCounter },
    template: `
      <div class="story-container">
        <div class="story-row">
          <span class="story-label">Primary:</span>
          <OCounter label="2" variant="primary" size="md" />
          <OCounter label="5" variant="primary" size="sm" />
          <OCounter label="99+" variant="primary" size="xs" />
        </div>
        <div class="story-row">
          <span class="story-label">Secondary:</span>
          <OCounter label="2" variant="secondary" size="md" />
          <OCounter label="5" variant="secondary" size="sm" />
          <OCounter label="99+" variant="secondary" size="xs" />
        </div>
        <div class="story-row">
          <span class="story-label">Tertiary:</span>
          <OCounter label="2" variant="tertiary" size="md" />
          <OCounter label="5" variant="tertiary" size="sm" />
          <OCounter label="99+" variant="tertiary" size="xs" />
        </div>
        <div class="story-row story-row--dark">
          <span class="story-label">Inverse:</span>
          <OCounter label="2" variant="inverse" size="md" />
          <OCounter label="5" variant="inverse" size="sm" />
          <OCounter label="99+" variant="inverse" size="xs" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};

// Все размеры
export const AllSizes = {
  render: () => ({
    components: { OCounter },
    template: `
      <div class="story-container">
        <div class="story-row">
          <span class="story-label">MD:</span>
          <OCounter label="10" size="md" />
          <OCounter label="10" size="md" variant="secondary" />
        </div>
        <div class="story-row">
          <span class="story-label">SM:</span>
          <OCounter label="10" size="sm" />
          <OCounter label="10" size="sm" variant="secondary" />
        </div>
        <div class="story-row">
          <span class="story-label">XS:</span>
          <OCounter label="10" size="xs" />
          <OCounter label="10" size="xs" variant="secondary" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};

// Логика отображения чисел
export const NumberLogic = {
  render: () => ({
    components: { OCounter },
    template: `
      <div class="story-container number-logic-container">
        <div class="number-group">
          <span class="number-label">1:</span>
          <OCounter label="1" />
        </div>
        <div class="number-group">
          <span class="number-label">99:</span>
          <OCounter label="99" />
        </div>
        <div class="number-group">
          <span class="number-label">100:</span>
          <OCounter label="100" />
        </div>
        <div class="number-group">
          <span class="number-label">1000:</span>
          <OCounter label="1000" />
        </div>
        <div class="number-group">
          <span class="number-label">Custom:</span>
          <OCounter label="New!" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};

// В контексте использования (например, кнопка)
export const InContext = {
  render: () => ({
    components: { OCounter },
    template: `
      <div class="context-container">
        <h3>Новые сообщения</h3>
        <div class="context-buttons">
          <button class="context-button context-button--primary">
            Входящие
            <OCounter label="3" variant="inverse" size="sm" />
          </button>
          <button class="context-button context-button--secondary">
            Архив
            <OCounter label="15" variant="primary" size="sm" />
          </button>
        </div>
        
        <h3>Статистика</h3>
        <div class="context-stats">
          <div class="stat-item">
            Лайки:
            <OCounter label="1.2K" variant="primary" size="md" />
          </div>
          <div class="stat-item">
            Комментарии:
            <OCounter label="247" variant="secondary" size="sm" />
          </div>
        </div>

        <h3>Аватары</h3>
        <div class="context-avatars">
          <div class="avatar-container">
            <span class="avatar-icon">👤</span>
            <div class="avatar-badge">
              <OCounter label="2" variant="primary" size="xs" />
            </div>
          </div>
          <div class="avatar-container">
            <span class="avatar-icon">🔔</span>
            <div class="avatar-badge">
              <OCounter label="99+" variant="inverse" size="xs" />
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};

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
