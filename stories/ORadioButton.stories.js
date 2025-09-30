import ORadioButton from '../src/components/ORadioButton.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';
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
    hasLabel: {
      control: 'boolean',
      description: 'Показывать метку'
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

// Primary
export const Primary = {
  args: {
    isChecked: false,
    label: 'Radio button',
    hasLabel: true,
    size: 'md',
    isDisabled: false,
    hasError: false,
    value: 'option1'
  },
  render: (args) => ({
    components: { ORadioButton },
    setup() {
      const checked = ref(args.isChecked);
      return { args, checked };
    },
    template: '<ORadioButton :isChecked="checked" @update:isChecked="checked = $event" v-bind="args" />'
  })
};

// AllStates
export const AllStates = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selected1 = ref(true);
      const selected2 = ref(false);
      const selected3 = ref(true);
      const selected4 = ref(false);
      const selected5 = ref(true);
      const selected6 = ref(false);
      const selected7 = ref(true);
      const selected8 = ref(false);
      return { 
        selected1, selected2, selected3, selected4, 
        selected5, selected6, selected7, selected8 
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; color: var(--color-text-primary);">Размер MD</h3>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <ORadioButton :isChecked="selected1" @update:isChecked="selected1 = $event" label="Checked" size="md" value="md1" />
            <ORadioButton :isChecked="selected2" @update:isChecked="selected2 = $event" label="Unchecked" size="md" value="md2" />
            <ORadioButton :isChecked="true" label="Disabled" size="md" :isDisabled="true" value="md3" />
            <ORadioButton :isChecked="true" label="Error" size="md" :hasError="true" value="md4" />
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px; color: var(--color-text-primary);">Размер SM</h3>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <ORadioButton :isChecked="selected5" @update:isChecked="selected5 = $event" label="Checked" size="sm" value="sm1" />
            <ORadioButton :isChecked="selected6" @update:isChecked="selected6 = $event" label="Unchecked" size="sm" value="sm2" />
            <ORadioButton :isChecked="true" label="Disabled" size="sm" :isDisabled="true" value="sm3" />
            <ORadioButton :isChecked="true" label="Error" size="sm" :hasError="true" value="sm4" />
          </div>
        </div>
      </div>
    `
  })
};

// RadioGroup
export const RadioGroup = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selectedOption = ref('option1');
      const setOption = (option) => {
        selectedOption.value = option;
      };
      return { selectedOption, setOption };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h3 style="color: var(--color-text-primary);">Выберите вариант:</h3>
        <ORadioButton 
          :isChecked="selectedOption === 'option1'" 
          @update:isChecked="(checked) => checked && setOption('option1')"
          label="Первый вариант" 
          value="option1"
        />
        <ORadioButton 
          :isChecked="selectedOption === 'option2'" 
          @update:isChecked="(checked) => checked && setOption('option2')"
          label="Второй вариант" 
          value="option2"
        />
        <ORadioButton 
          :isChecked="selectedOption === 'option3'" 
          @update:isChecked="(checked) => checked && setOption('option3')"
          label="Третий вариант" 
          value="option3"
        />
        <p style="margin-top: 16px; color: var(--color-text-secondary);">
          Выбрано: {{ selectedOption }}
        </p>
      </div>
    `
  })
};

// WithoutLabel
export const WithoutLabel = {
  args: {
    isChecked: false,
    hasLabel: false,
    size: 'md',
    isDisabled: false,
    hasError: false
  },
  render: (args) => ({
    components: { ORadioButton },
    setup() {
      const checked = ref(args.isChecked);
      return { args, checked };
    },
    template: '<ORadioButton :isChecked="checked" @update:isChecked="checked = $event" v-bind="args" />'
  })
};

// ErrorStates
export const ErrorStates = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selected1 = ref(true);
      const selected2 = ref(false);
      return { selected1, selected2 };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3 style="color: var(--color-text-primary);">Состояния ошибки:</h3>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <ORadioButton 
            :isChecked="selected1" @update:isChecked="selected1 = $event" 
            label="Checked с ошибкой" 
            :has-error="true"
            error-message="Это поле обязательно для заполнения"
            value="error1"
          />
          <ORadioButton 
            :isChecked="selected2" @update:isChecked="selected2 = $event" 
            label="Unchecked с ошибкой" 
            :has-error="true"
            error-message="Пожалуйста, выберите один из вариантов"
            value="error2"
          />
        </div>
      </div>
    `
  })
};

// InteractiveDemo
export const InteractiveDemo = {
  render: () => ({
    components: { ORadioButton },
    setup() {
      const selectedSize = ref('md');
      const selectedState = ref('default');
      const isDisabled = ref(false);
      const hasError = ref(false);
      
      const radioOptions = [
        { value: 'option1', label: 'Вариант 1' },
        { value: 'option2', label: 'Вариант 2' },
        { value: 'option3', label: 'Вариант 3' }
      ];
      
      const selectedOption = ref('option1');
      
      const setOption = (optionValue) => {
        selectedOption.value = optionValue;
      };
      
      return { 
        selectedSize, selectedState, isDisabled, hasError,
        radioOptions, selectedOption, setOption
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="color: var(--color-text-primary);">Настройки:</h3>
          <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
            <div>
              <label style="display: block; margin-bottom: 4px; color: var(--color-text-secondary);">Размер:</label>
              <select v-model="selectedSize" style="padding: 4px 8px; border: 1px solid var(--color-border-primary); border-radius: 4px;">
                <option value="md">MD</option>
                <option value="sm">SM</option>
              </select>
            </div>
            <div>
              <label style="display: block; margin-bottom: 4px; color: var(--color-text-secondary);">Состояние:</label>
              <select v-model="selectedState" style="padding: 4px 8px; border: 1px solid var(--color-border-primary); border-radius: 4px;">
                <option value="default">Default</option>
                <option value="disabled">Disabled</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 12px;">Результат:</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <ORadioButton 
              v-for="option in radioOptions"
              :key="option.value"
              :isChecked="selectedOption === option.value"
              @update:isChecked="(checked) => checked && setOption(option.value)"
              :label="option.label"
              :size="selectedSize"
              :isDisabled="selectedState === 'disabled'"
              :hasError="selectedState === 'error'"
              :value="option.value"
            />
          </div>
          <p style="margin-top: 12px; color: var(--color-text-secondary);">
            Выбрано: {{ selectedOption }}
          </p>
        </div>
      </div>
    `
  })
};
