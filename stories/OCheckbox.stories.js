import OCheckbox from '../src/components/OCheckbox.vue';
import { ref, watch } from 'vue';

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
    state: {
      control: 'select',
      options: ['default', 'hover', 'press'],
      description: 'Состояние компонента'
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
  render: (args) => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(args.isChecked);
      watch(() => args.isChecked, (newVal) => {
        isChecked.value = newVal;
      });
      return { args, isChecked };
    },
    template: `<OCheckbox v-bind="args" @update:isChecked="isChecked = $event" :isChecked="isChecked" />`
  }),
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Checkbox',
    isChecked: false
  }
};

export const Checked = {
  render: (args) => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(args.isChecked);
      watch(() => args.isChecked, (newVal) => {
        isChecked.value = newVal;
      });
      return { args, isChecked };
    },
    template: `<OCheckbox v-bind="args" @update:isChecked="isChecked = $event" :isChecked="isChecked" />`
  }),
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Checked checkbox',
    isChecked: true
  }
};

export const Disabled = {
  render: (args) => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(args.isChecked);
      watch(() => args.isChecked, (newVal) => {
        isChecked.value = newVal;
      });
      return { args, isChecked };
    },
    template: `<OCheckbox v-bind="args" @update:isChecked="isChecked = $event" :isChecked="isChecked" />`
  }),
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Disabled checkbox',
    isChecked: false,
    isDisabled: true
  }
};

export const Error = {
  render: (args) => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(args.isChecked);
      watch(() => args.isChecked, (newVal) => {
        isChecked.value = newVal;
      });
      return { args, isChecked };
    },
    template: `<OCheckbox v-bind="args" @update:isChecked="isChecked = $event" :isChecked="isChecked" />`
  }),
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
    setup() {
      const isChecked = ref(false);
      return { isChecked };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OCheckbox variant="primary" label="Primary checkbox" @update:isChecked="isChecked = $event" :isChecked="isChecked" />
        <OCheckbox variant="secondary" label="Secondary checkbox" @update:isChecked="isChecked = $event" :isChecked="isChecked" />
      </div>
    `
  })
};

export const AllSizes = {
  render: () => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(false);
      return { isChecked };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <OCheckbox size="md" label="Medium checkbox" @update:isChecked="isChecked = $event" :isChecked="isChecked" />
        <OCheckbox size="sm" label="Small checkbox" @update:isChecked="isChecked = $event" :isChecked="isChecked" />
      </div>
    `
  })
};
