import OButton from '../src/components/OButton.vue';

export default {
  title: 'Components/OButton',
  component: OButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accent-primary', 'accent-secondary', 'outline'],
      description: 'Вариант стиля кнопки'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер кнопки'
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'press'],
      description: 'Размер кнопки'
    },
    label: {
      control: 'text',
      description: 'Текст кнопки'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Заблокированное состояние'
    },
    isLoading: {
      control: 'boolean',
      description: 'Состояние загрузки'
    }
  }
};

export const Default = {
  args: {
    label: 'Сделать действие',
    variant: 'primary',
    size: 'md',
    state: 'default'
  }
};

export const AllVariants = {
  render: () => ({
    components: { OButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <OButton variant="primary" label="Primary" />
        <OButton variant="secondary" label="Secondary" />
        <OButton variant="tertiary" label="Tertiary" />
        <OButton variant="accent-primary" label="Accent Primary" />
        <OButton variant="accent-secondary" label="Accent Secondary" />
        <OButton variant="outline" label="Outline" />
      </div>
    `
  })
};

export const AllSizes = {
  render: () => ({
    components: { OButton },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <OButton size="xs" label="XS" />
        <OButton size="sm" label="SM" />
        <OButton size="md" label="MD" />
        <OButton size="lg" label="LG" />
      </div>
    `
  })
};