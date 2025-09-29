import OCheckbox from '../src/components/OCheckbox.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';
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
    state: {
      control: 'select',
      options: ['default', 'hover', 'press'],
      description: 'Состояние интерактивности'
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
    hasLabel: {
      control: 'boolean',
      description: 'Показывать ли label'
    },
    label: {
      control: 'text',
      description: 'Текст label'
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

// Primary checkbox
export const Primary = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    isChecked: true,
    isDisabled: false,
    hasError: false,
    hasLabel: true,
    label: 'Primary checkbox'
  }
};

// Interactive checkbox
export const Interactive = {
  render: (args) => ({
    components: { OCheckbox },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <div>
        <OCheckbox 
          v-bind="args" 
          :isChecked="isChecked"
          @update:isChecked="isChecked = $event"
        />
        <p style="margin-top: 10px; color: white;">
          Checked: {{ isChecked }}
        </p>
      </div>
    `
  }),
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    isDisabled: false,
    hasError: false,
    hasLabel: true,
    label: 'Click me!'
  }
};

// Multiple checkboxes with v-model
export const MultipleCheckboxes = {
  render: () => ({
    components: { OCheckbox },
    setup() {
      const checkboxes = ref([
        { id: 1, label: 'Option 1', checked: false },
        { id: 2, label: 'Option 2', checked: true },
        { id: 3, label: 'Option 3', checked: false }
      ]);
      
      const toggleCheckbox = (id) => {
        const checkbox = checkboxes.value.find(cb => cb.id === id);
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      };
      
      return { checkboxes, toggleCheckbox };
    },
    template: `
      <div>
        <h3>Multiple Checkboxes</h3>
        <div v-for="checkbox in checkboxes" :key="checkbox.id" style="margin: 10px 0;">
          <OCheckbox 
            :isChecked="checkbox.checked"
            :label="checkbox.label"
            @update:isChecked="checkbox.checked = $event"
          />
        </div>
        <p style="margin-top: 20px; color: white;">
          Selected: {{ checkboxes.filter(cb => cb.checked).map(cb => cb.label).join(', ') }}
        </p>
      </div>
    `
  })
};

// Secondary checkbox
export const Secondary = {
  args: {
    variant: 'secondary',
    state: 'default',
    size: 'md',
    isChecked: true,
    isDisabled: false,
    hasError: false,
    hasLabel: true,
    label: 'Secondary checkbox'
  }
};

// Small size
export const Small = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'sm',
    isChecked: true,
    isDisabled: false,
    hasError: false,
    hasLabel: true,
    label: 'Small checkbox'
  }
};

// Unchecked state
export const Unchecked = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    isChecked: false,
    isDisabled: false,
    hasError: false,
    hasLabel: true,
    label: 'Unchecked checkbox'
  }
};

// Disabled state
export const Disabled = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    isChecked: true,
    isDisabled: true,
    hasError: false,
    hasLabel: true,
    label: 'Disabled checkbox'
  }
};

// Error state
export const Error = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    isChecked: true,
    isDisabled: false,
    hasError: true,
    hasLabel: true,
    label: 'Error checkbox'
  }
};

// All States Matrix (как в Figma)
export const AllStates = {
  render: () => ({
    components: { OCheckbox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; padding: 20px;">
        <!-- Row 1: default -->
        <div>
          <h4>Primary MD Checked</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary MD Checked</h4>
          <OCheckbox variant="secondary" state="default" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Primary MD Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="false" />
        </div>
        <div>
          <h4>Primary SM Checked</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary SM Checked</h4>
          <OCheckbox variant="secondary" state="default" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Primary SM Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="false" />
        </div>
        
        <!-- Row 2: hover -->
        <div>
          <h4>Primary MD Hover</h4>
          <OCheckbox variant="primary" state="hover" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary MD Hover</h4>
          <OCheckbox variant="secondary" state="hover" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Primary MD Hover Unchecked</h4>
          <OCheckbox variant="primary" state="hover" size="md" :isChecked="false" />
        </div>
        <div>
          <h4>Primary SM Hover</h4>
          <OCheckbox variant="primary" state="hover" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary SM Hover</h4>
          <OCheckbox variant="secondary" state="hover" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Primary SM Hover Unchecked</h4>
          <OCheckbox variant="primary" state="hover" size="sm" :isChecked="false" />
        </div>
        
        <!-- Row 3: press -->
        <div>
          <h4>Primary MD Press</h4>
          <OCheckbox variant="primary" state="press" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary MD Press</h4>
          <OCheckbox variant="secondary" state="press" size="md" :isChecked="true" />
        </div>
        <div>
          <h4>Primary MD Press Unchecked</h4>
          <OCheckbox variant="primary" state="press" size="md" :isChecked="false" />
        </div>
        <div>
          <h4>Primary SM Press</h4>
          <OCheckbox variant="primary" state="press" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Secondary SM Press</h4>
          <OCheckbox variant="secondary" state="press" size="sm" :isChecked="true" />
        </div>
        <div>
          <h4>Primary SM Press Unchecked</h4>
          <OCheckbox variant="primary" state="press" size="sm" :isChecked="false" />
        </div>
        
        <!-- Row 4: disabled -->
        <div>
          <h4>Primary MD Disabled</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="true" :isDisabled="true" />
        </div>
        <div>
          <h4>Secondary MD Disabled</h4>
          <OCheckbox variant="secondary" state="default" size="md" :isChecked="true" :isDisabled="true" />
        </div>
        <div>
          <h4>Primary MD Disabled Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="false" :isDisabled="true" />
        </div>
        <div>
          <h4>Primary SM Disabled</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="true" :isDisabled="true" />
        </div>
        <div>
          <h4>Secondary SM Disabled</h4>
          <OCheckbox variant="secondary" state="default" size="sm" :isChecked="true" :isDisabled="true" />
        </div>
        <div>
          <h4>Primary SM Disabled Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="false" :isDisabled="true" />
        </div>
        
        <!-- Row 5: error -->
        <div>
          <h4>Primary MD Error</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="true" :hasError="true" />
        </div>
        <div>
          <h4>Secondary MD Error</h4>
          <OCheckbox variant="secondary" state="default" size="md" :isChecked="true" :hasError="true" />
        </div>
        <div>
          <h4>Primary MD Error Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="md" :isChecked="false" :hasError="true" />
        </div>
        <div>
          <h4>Primary SM Error</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="true" :hasError="true" />
        </div>
        <div>
          <h4>Secondary SM Error</h4>
          <OCheckbox variant="secondary" state="default" size="sm" :isChecked="true" :hasError="true" />
        </div>
        <div>
          <h4>Primary SM Error Unchecked</h4>
          <OCheckbox variant="primary" state="default" size="sm" :isChecked="false" :hasError="true" />
        </div>
      </div>
    `
  })
};
