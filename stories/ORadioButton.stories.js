import ORadioButton from '../src/components/ORadioButton.vue';
import { ref } from 'vue';

export default {
  title: 'Components/ORadioButton',
  component: ORadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Размер радиокнопки'
    },
    label: {
      control: 'text',
      description: 'Текст метки'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Неактивное состояние'
    },
    hasError: {
      control: 'boolean',
      description: 'Состояние ошибки'
    },
    value: {
      control: 'text',
      description: 'Значение радиокнопки'
    }
  }
};

export const Default = {
  args: {
    size: 'md',
    label: 'Radio button',
    value: 'option1',
    isDisabled: false,
    hasError: false
  }
};

export const AllSizes = {
  render: () => ({
    components: { ORadioButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ORadioButton size="md" label="Medium radio" value="md" />
        <ORadioButton size="sm" label="Small radio" value="sm" />
      </div>
    `
  })
};

export const States = {
  render: () => ({
    components: { ORadioButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ORadioButton label="Normal radio" value="normal" />
        <ORadioButton label="Disabled radio" value="disabled" :isDisabled="true" />
        <ORadioButton label="Error radio" value="error" :hasError="true" />
      </div>
    `
  })
};