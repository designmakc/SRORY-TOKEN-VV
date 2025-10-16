import OTypography from '../src/components/OTypography.vue';

export default {
  title: 'Components/OTypography',
  component: OTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'adaptive-h1', 'adaptive-h2', 'adaptive-h3', 'adaptive-h4', 'adaptive-h5',
        'header-6xl', 'header-5xl', 'header-4xl', 'header-3xl', 'header-2xl',
        'header-xl', 'header-lg', 'header-md', 'header-sm', 'header-xs', 'header-2xs', 'header-3xs',
        'trim-4xl', 'trim-3xl', 'trim-2xl', 'trim-xl', 'trim-lg', 'trim-md', 'trim-sm', 'trim-xs', 'trim-2xs', 'trim-3xs',
        'body-lg', 'body-lg-medium', 'body-md', 'body-sm', 'body-xs', 'body-2xs', 'body-2xs-bold',
        'label-lg', 'label-md', 'label-sm', 'label-xs'
      ],
      description: 'Вариант типографики'
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
      description: 'HTML тег'
    }
  }
};

export const Default = {
  render: (args) => ({
    components: { OTypography },
    setup() {
      return { args };
    },
    template: '<OTypography v-bind="args">Typography</OTypography>'
  }),
  args: {
    variant: 'header-lg',
    tag: 'h1'
  }
};

export const Headers = {
  render: () => ({
    components: { OTypography },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <OTypography variant="header-6xl">Header 6XL</OTypography>
        <OTypography variant="header-5xl">Header 5XL</OTypography>
        <OTypography variant="header-4xl">Header 4XL</OTypography>
        <OTypography variant="header-3xl">Header 3XL</OTypography>
        <OTypography variant="header-2xl">Header 2XL</OTypography>
        <OTypography variant="header-xl">Header XL</OTypography>
        <OTypography variant="header-lg">Header LG</OTypography>
        <OTypography variant="header-md">Header MD</OTypography>
        <OTypography variant="header-sm">Header SM</OTypography>
        <OTypography variant="header-xs">Header XS</OTypography>
      </div>
    `
  })
};

export const Body = {
  render: () => ({
    components: { OTypography },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OTypography variant="body-lg">Body Large</OTypography>
        <OTypography variant="body-md">Body Medium</OTypography>
        <OTypography variant="body-sm">Body Small</OTypography>
        <OTypography variant="body-xs">Body Extra Small</OTypography>
      </div>
    `
  })
};

export const Labels = {
  render: () => ({
    components: { OTypography },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OTypography variant="label-lg">Label Large</OTypography>
        <OTypography variant="label-md">Label Medium</OTypography>
        <OTypography variant="label-sm">Label Small</OTypography>
        <OTypography variant="label-xs">Label Extra Small</OTypography>
      </div>
    `
  })
};

export const Trim = {
  render: () => ({
    components: { OTypography },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <OTypography variant="trim-4xl">Trim 4XL</OTypography>
        <OTypography variant="trim-3xl">Trim 3XL</OTypography>
        <OTypography variant="trim-2xl">Trim 2XL</OTypography>
        <OTypography variant="trim-xl">Trim XL</OTypography>
        <OTypography variant="trim-lg">Trim LG</OTypography>
        <OTypography variant="trim-md">Trim MD</OTypography>
        <OTypography variant="trim-sm">Trim SM</OTypography>
        <OTypography variant="trim-xs">Trim XS</OTypography>
        <OTypography variant="trim-2xs">Trim 2XS</OTypography>
        <OTypography variant="trim-3xs">Trim 3XS</OTypography>
      </div>
    `
  })
};

export const Adaptive = {
  render: () => ({
    components: { OTypography },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <OTypography variant="adaptive-h1">Adaptive H1</OTypography>
        <OTypography variant="adaptive-h2">Adaptive H2</OTypography>
        <OTypography variant="adaptive-h3">Adaptive H3</OTypography>
        <OTypography variant="adaptive-h4">Adaptive H4</OTypography>
        <OTypography variant="adaptive-h5">Adaptive H5</OTypography>
      </div>
    `
  })
};