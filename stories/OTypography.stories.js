import OTypography from '../src/components/OTypography.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';

export default {
  title: 'Typography/OTypography',
  component: OTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
      description: 'Вариант типографики'
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'div', 'span'],
      description: 'HTML тег для рендера'
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

// CSF3 формат с объектами
export const H1 = {
  args: {
    variant: 'h1',
    tag: 'h1'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Adaptive H1</OTypography>'
  })
};

export const H2 = {
  args: {
    variant: 'h2',
    tag: 'h2'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Adaptive H2</OTypography>'
  })
};

export const H3 = {
  args: {
    variant: 'h3',
    tag: 'h3'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Adaptive H3</OTypography>'
  })
};

export const H4 = {
  args: {
    variant: 'h4',
    tag: 'h4'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Adaptive H4</OTypography>'
  })
};

export const H5 = {
  args: {
    variant: 'h5',
    tag: 'h5'
  },
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Adaptive H5</OTypography>'
  })
};

export const AllVariants = {
  render: () => ({
    components: { OTypography },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <OTypography variant="h1" tag="h1">Adaptive H1</OTypography>
        <OTypography variant="h2" tag="h2">Adaptive H2</OTypography>
        <OTypography variant="h3" tag="h3">Adaptive H3</OTypography>
        <OTypography variant="h4" tag="h4">Adaptive H4</OTypography>
        <OTypography variant="h5" tag="h5">Adaptive H5</OTypography>
      </div>
    `
  })
};


