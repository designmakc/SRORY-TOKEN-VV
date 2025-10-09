import OTypography from '../src/components/OTypography.vue';

export default {
  title: 'Components/OTypography',
  component: OTypography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'header-6xl', 'header-5xl', 'header-4xl', 'header-3xl', 'header-2xl',
        'header-xl', 'header-lg', 'header-md', 'header-sm', 'header-xs',
        'body-lg', 'body-md', 'body-sm', 'body-xs',
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