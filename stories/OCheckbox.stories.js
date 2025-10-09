import OCheckbox from '../src/components/OCheckbox.vue';
import { ref } from 'vue';

export default {
  title: 'Components/OCheckbox',
  component: OCheckbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Вариант стиля checkbox'
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Размер checkbox'
    },
    isChecked: {
      control: 'boolean',
      description: 'Состояние выбора'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Заблокированное состояние'
    },
    hasError: {
      control: 'boolean',
      description: 'Состояние ошибки'
    },
    label: {
      control: 'text',
      description: 'Текст label'
    }
  }
};

export const Default = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Checkbox',
    isChecked: false
  }
};

export const Checked = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Checked checkbox',
    isChecked: true
  }
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Disabled checkbox',
    isChecked: false,
    isDisabled: true
  }
};

export const Error = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Error checkbox',
    isChecked: false,
    hasError: true
  }
};

export const AllVariants = {
  render: () => ({
    components: { OCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OCheckbox variant="primary" label="Primary checkbox" />
        <OCheckbox variant="secondary" label="Secondary checkbox" />
      </div>
    `
  })
};

export const AllSizes = {
  render: () => ({
    components: { OCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OCheckbox size="md" label="Medium checkbox" />
        <OCheckbox size="sm" label="Small checkbox" />
      </div>
    `
  })
};
