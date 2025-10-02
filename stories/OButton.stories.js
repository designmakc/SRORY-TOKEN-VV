import OButton from '../src/components/OButton.vue';
import { getIconOptions } from '../src/utils/iconCollection';
import { useDesignTokens } from '../src/composables/useDesignTokens';

// Получаем список всех доступных иконок
const iconOptions = getIconOptions();
const iconValues = iconOptions.map(icon => icon.value);

// Функция для генерации динамического кода
const generateCode = (args) => {
  const props = [];
  
  // Основные props (всегда показываем если установлены)
  if (args.variant && args.variant !== 'primary') props.push(`variant="${args.variant}"`);
  if (args.size && args.size !== 'md') props.push(`size="${args.size}"`);
  
  // Label - показываем всегда если не isIconOnly и не дефолтное значение
  if (!args.isIconOnly && args.label) {
    props.push(`label="${args.label}"`);
  }
  
  // State - только если не default
  if (args.state && args.state !== 'default') props.push(`state="${args.state}"`);
  
  // Boolean props
  if (args.isIconOnly) props.push(':isIconOnly="true"');
  if (args.isLoading) props.push(':isLoading="true"');
  if (args.isDisabled) props.push(':isDisabled="true"');
  if (args.isRounded) props.push(':isRounded="true"');
  
  // Иконки
  if (args.hasLeftIcon) {
    props.push(':hasLeftIcon="true"');
    if (args.leftIcon && args.leftIcon !== 'communication/user-filled') {
      props.push(`leftIcon="${args.leftIcon}"`);
    }
  }
  if (args.hasRightIcon) {
    props.push(':hasRightIcon="true"');
    if (args.rightIcon && args.rightIcon !== 'arrows/arrow-right') {
      props.push(`rightIcon="${args.rightIcon}"`);
    }
  }
  
  // Счетчик
  if (args.hasCounter) {
    props.push(':hasCounter="true"');
    if (args.counter && args.counter !== '5') {
      props.push(`counter="${args.counter}"`);
    }
  }
  
  // Форматирование для читабельности
  if (props.length <= 2) {
    return `<OButton ${props.join(' ')} />`;
  } else {
    return `<OButton\n  ${props.join('\n  ')}\n/>`;
  }
};

export default {
  title: 'Components/OButton',
  component: OButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер кнопки',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accentGreen', 'accentBlue', 'outline'],
      description: 'Вариант стиля кнопки',
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'press'],
      description: 'Состояние кнопки (для документации)',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    label: {
      control: 'text',
      description: 'Текст кнопки',
      table: {
        defaultValue: { summary: 'Сделать действие' }
      }
    },
    isIconOnly: {
      control: 'boolean',
      description: 'Кнопка только с иконкой (без текста)',
      table: {
        defaultValue: { summary: false }
      }
    },
    isLoading: {
      control: 'boolean',
      description: 'Состояние загрузки',
      table: {
        defaultValue: { summary: false }
      }
    },
    isDisabled: {
      control: 'boolean',
      description: 'Заблокированное состояние',
      table: {
        defaultValue: { summary: false }
      }
    },
    isRounded: {
      control: 'boolean',
      description: 'Полностью скругленные углы',
      table: {
        defaultValue: { summary: false }
      }
    },
    hasLeftIcon: {
      control: 'boolean',
      description: 'Показывать иконку слева',
      table: {
        defaultValue: { summary: false }
      }
    },
    hasRightIcon: {
      control: 'boolean',
      description: 'Показывать иконку справа',
      table: {
        defaultValue: { summary: false }
      }
    },
    hasCounter: {
      control: 'boolean',
      description: 'Показывать счетчик (только для secondary xs/sm)',
      table: {
        defaultValue: { summary: false }
      }
    },
    leftIcon: {
      control: 'select',
      options: iconValues,
      description: 'Левая иконка (выберите из списка)',
      table: {
        defaultValue: { summary: 'communication/user-filled' }
      }
    },
    rightIcon: {
      control: 'select',
      options: iconValues,
      description: 'Правая иконка (выберите из списка)',
      table: {
        defaultValue: { summary: 'arrows/arrow-right' }
      }
    },
    counter: {
      control: 'text',
      description: 'Значение счетчика',
      table: {
        defaultValue: { summary: '5' }
      }
    },
    onClick: {
      action: 'clicked',
      description: 'Событие клика на кнопку'
    }
  },
  decorators: [
    (story, context) => {
      const { setTheme, setBreakpoint } = useDesignTokens();
      if (context.globals.theme) setTheme(context.globals.theme);
      if (context.globals.breakpoint) setBreakpoint(context.globals.breakpoint);
      return { components: { story }, template: '<story />' };
    }
  ]
};

// Default Story
export const Default = {
  args: {
    label: 'Сделать действие',
    size: 'md',
    variant: 'primary'
  },
  render: (args) => ({
    components: { OButton },
    setup() {
      return { args };
    },
    template: '<OButton v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};

// All Variants
export const AllVariants = {
  render: () => ({
    components: { OButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <OButton variant="primary" label="Primary" />
          <OButton variant="secondary" label="Secondary" />
          <OButton variant="tertiary" label="Tertiary" />
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <OButton variant="accentGreen" label="Accent Green" />
          <OButton variant="accentBlue" label="Accent Blue" />
          <OButton variant="outline" label="Outline" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<div style="display: flex; gap: 12px;">
  <OButton variant="primary" label="Primary" />
  <OButton variant="secondary" label="Secondary" />
  <OButton variant="tertiary" label="Tertiary" />
  <OButton variant="accentGreen" label="Accent Green" />
  <OButton variant="accentBlue" label="Accent Blue" />
  <OButton variant="outline" label="Outline" />
</div>`,
      },
    },
  },
};

// All Sizes
export const AllSizes = {
  render: () => ({
    components: { OButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OButton size="xs" label="Кнопка xs" />
        <OButton size="sm" label="Кнопка sm" />
        <OButton size="md" label="Кнопка md" />
        <OButton size="lg" label="Кнопка lg" />
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<div style="display: flex; gap: 12px;">
  <OButton size="xs" label="XS" />
  <OButton size="sm" label="SM" />
  <OButton size="md" label="MD" />
  <OButton size="lg" label="LG" />
</div>`,
      },
    },
  },
};



// Playground - интерактивная песочница
export const Play = {
  args: {
    label: 'Кнопка',
    size: 'md',
    variant: 'accentBlue',
    state: 'default',
    isIconOnly: true,
    isLoading: false,
    isDisabled: false,
    isRounded: true,
    hasLeftIcon: false,
    hasRightIcon: false,
    hasCounter: false,
    leftIcon: 'navigation-action/play',
    
  },
  render: (args) => ({
    components: { OButton },
    setup() {
      return { args };
    },
    template: '<OButton v-bind="args" />'
  }),
  parameters: {
    docs: {
      source: {
        transform: (code, storyContext) => generateCode(storyContext.args),
      },
    },
  },
};