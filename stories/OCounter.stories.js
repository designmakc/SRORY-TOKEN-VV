import OCounter from '../src/components/OCounter.vue'

export default {
  title: 'Components/OCounter',
  component: OCounter,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст или число для отображения в счетчике'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
      description: 'Стиль компонента'
    },
    size: {
      control: 'select',
      options: ['md', 'sm', 'xs'],
      description: 'Размер компонента'
    }
  }
};

export const Default = {
  render: (args) => ({
    components: { OCounter },
    setup() {
      return { args };
    },
    template: '<OCounter v-bind="args" />'
  }),
  args: {
    label: '2',
    variant: 'primary',
    size: 'md'
  }
};

export const AllVariants = {
  render: () => ({
    components: { OCounter },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OCounter label="5" variant="primary" />
        <OCounter label="12" variant="secondary" />
        <OCounter label="99+" variant="tertiary" />
        <OCounter label="3" variant="inverse" />
      </div>
    `
  })
};

export const AllSizes = {
  render: () => ({
    components: { OCounter },
    setup() {
      return {};
    },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OCounter label="5" size="xs" />
        <OCounter label="12" size="sm" />
        <OCounter label="99+" size="md" />
      </div>
    `
  })
};