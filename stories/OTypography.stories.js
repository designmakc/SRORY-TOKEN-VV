import OTypography from '../src/components/OTypography.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';

export default {
  title: 'Design System/OTypography',
  component: OTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        // Adaptive
        'adaptive-h1', 'adaptive-h2', 'adaptive-h3', 'adaptive-h4', 'adaptive-h5',
        // Header
        'header-6xl', 'header-5xl', 'header-4xl', 'header-3xl', 'header-2xl',
        'header-xl', 'header-lg', 'header-md', 'header-sm', 'header-xs', 'header-2xs', 'header-3xs',
        // Trim
        'trim-4xl', 'trim-3xl', 'trim-2xl', 'trim-xl', 'trim-lg', 'trim-md', 'trim-sm', 'trim-xs', 'trim-2xs', 'trim-3xs',
        // Body
        'body-lg', 'body-lg-medium', 'body-md', 'body-sm', 'body-xs', 'body-2xs', 'body-2xs-bold',
        // Label
        'label-lg', 'label-md', 'label-sm', 'label-xs'
      ],
      description: 'Вариант типографики из Figma'
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
      description: 'HTML тег (автоопределяется если не указан)'
    }
  },
};

// Простая story для тестирования контролов
export const Default = {
  args: {
    variant: 'adaptive-h1',
    tag: 'h1',
    children: 'Olymp Casino'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">{{ args.children }}</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="adaptive-h1" tag="h1">Olymp Casino</OTypography>',
      },
    },
  },
};

// Адаптивные заголовки
export const AdaptiveHeadings = {
  args: {
    variant: 'adaptive-h1',
    children: 'Адаптивный заголовок'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">{{ args.children }}</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="adaptive-h1">Адаптивный заголовок</OTypography>',
      },
    },
  },
};

// Шкала Header
export const HeaderScale = {
  args: {
    variant: 'header-3xl'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Header 3XL (28px)</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="header-3xl">Header 3XL (28px)</OTypography>',
      },
    },
  },
};

// Шкала Trim
export const TrimScale = {
  args: {
    variant: 'trim-xl'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Trim XL (22px / 20px)</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="trim-xl">Trim XL (22px / 20px)</OTypography>',
      },
    },
  },
};

// Варианты Body
export const BodyVariants = {
  args: {
    variant: 'body-md'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Body MD (14px) - Стандартный текст интерфейса</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="body-md">Body MD (14px) - Стандартный текст интерфейса</OTypography>',
      },
    },
  },
};

// Варианты Label
export const LabelVariants = {
  args: {
    variant: 'label-md',
    tag: 'label'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Label MD (14px / 14px)</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="label-md" tag="label">Label MD (14px / 14px)</OTypography>',
      },
    },
  },
};

// Сравнение Body vs Label
export const BodyVsLabel = {
  args: {
    variant: 'body-lg'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Body LG имеет обычный line-height для комфортного чтения</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="body-lg">Body LG имеет обычный line-height для комфортного чтения</OTypography>',
      },
    },
  },
};



// Полный пример страницы
export const FullPageExample = {
  args: {
    variant: 'adaptive-h1',
    tag: 'h1'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Olymp Design System</OTypography>'
  }),
  parameters: {
    docs: {
      source: {
        code: '<OTypography variant="adaptive-h1" tag="h1">Olymp Design System</OTypography>',
      },
    },
  },
};

