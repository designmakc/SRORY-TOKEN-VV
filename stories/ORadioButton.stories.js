import ORadioButton from '../src/components/ORadioButton.vue';
import { ref, watch } from 'vue';

export default {
  title: 'Components/RadioButton/ORadioButton',
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
    isChecked: {
      control: 'boolean',
      description: 'Состояние выбора'
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
  render: (args) => ({
    components: { ORadioButton },
    setup() {
      const isChecked = ref(args.isChecked);
      watch(() => args.isChecked, (newVal) => {
        isChecked.value = newVal;
      });
      return { args, isChecked };
    },
    template: `<ORadioButton v-bind="args" @update:isChecked="isChecked = $event" :isChecked="isChecked" />`
  }),
  args: {
    size: 'md',
    label: 'Radio button',
    value: 'option1',
    isChecked: false,
    isDisabled: false,
    hasError: false
  }
};

export const AllSizes = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selectedValue = ref(null);
      return { selectedValue };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ORadioButton size="md" label="Medium radio" value="md" @change="selectedValue = $event" :isChecked="selectedValue === 'md'" />
        <ORadioButton size="sm" label="Small radio" value="sm" @change="selectedValue = $event" :isChecked="selectedValue === 'sm'" />
      </div>
    `
  })
};

export const States = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selectedValue = ref(null);
      return { selectedValue };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ORadioButton label="Normal radio" value="normal" @change="selectedValue = $event" :isChecked="selectedValue === 'normal'" />
        <ORadioButton label="Disabled radio" value="disabled" :isDisabled="true" @change="selectedValue = $event" :isChecked="selectedValue === 'disabled'" />
        <ORadioButton label="Error radio" value="error" :hasError="true" @change="selectedValue = $event" :isChecked="selectedValue === 'error'" />
      </div>
    `
  })
};