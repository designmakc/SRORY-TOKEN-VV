import ORadioButtonGroup from '../src/components/ORadioButtonGroup.vue';
import ORadioButton from '../src/components/ORadioButton.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';
import { ref } from 'vue';

export default {
  title: 'Components/RadioButton/ORadioButtonGroup',
  component: ORadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Размер компонента'
    },
    label: {
      control: 'text',
      description: 'Заголовок группы'
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

// === STORIES ===

export const Default = {
  args: {
    label: 'Способ оплаты',
    size: 'md'
  },
  render: args => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      const selectedValue = ref('card');
      return { args, selectedValue };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton 
          label="Банковская карта" 
          :isChecked="selectedValue === 'card'"
          @update:isChecked="(checked) => checked && (selectedValue = 'card')"
          value="card"
        />
        <ORadioButton 
          label="Наличными при получении" 
          :isChecked="selectedValue === 'cash'"
          @update:isChecked="(checked) => checked && (selectedValue = 'cash')"
          value="cash"
        />
        <ORadioButton 
          label="Банковский перевод" 
          :isChecked="selectedValue === 'transfer'"
          @update:isChecked="(checked) => checked && (selectedValue = 'transfer')"
          value="transfer"
        />
        <ORadioButton 
          label="Электронные деньги" 
          :isChecked="selectedValue === 'ewallet'"
          @update:isChecked="(checked) => checked && (selectedValue = 'ewallet')"
          value="ewallet"
        />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup
  label="Способ оплаты"
  size="md"
>
  <ORadioButton label="Банковская карта" value="card" />
  <ORadioButton label="Наличными при получении" value="cash" />
  <ORadioButton label="Банковский перевод" value="transfer" />
  <ORadioButton label="Электронные деньги" value="ewallet" />
</ORadioButtonGroup>`,
      },
    },
  },
};

export const Small = {
  args: {
    label: 'Настройки',
    size: 'sm'
  },
  render: args => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      const selectedValue = ref('option1');
      return { args, selectedValue };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton 
          label="Вариант 1" 
          :isChecked="selectedValue === 'option1'"
          @update:isChecked="(checked) => checked && (selectedValue = 'option1')"
          value="option1"
          size="sm" 
        />
        <ORadioButton 
          label="Вариант 2" 
          :isChecked="selectedValue === 'option2'"
          @update:isChecked="(checked) => checked && (selectedValue = 'option2')"
          value="option2"
          size="sm" 
        />
        <ORadioButton 
          label="Вариант 3" 
          :isChecked="selectedValue === 'option3'"
          @update:isChecked="(checked) => checked && (selectedValue = 'option3')"
          value="option3"
          size="sm" 
        />
        <ORadioButton 
          label="Вариант 4" 
          :isChecked="selectedValue === 'option4'"
          @update:isChecked="(checked) => checked && (selectedValue = 'option4')"
          value="option4"
          size="sm" 
        />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup
  label="Настройки"
  size="sm"
>
  <ORadioButton label="Вариант 1" size="sm" />
  <ORadioButton label="Вариант 2" size="sm" />
  <ORadioButton label="Вариант 3" size="sm" />
  <ORadioButton label="Вариант 4" size="sm" />
</ORadioButtonGroup>`,
      },
    },
  },
};

export const WithoutLabel = {
  args: {
    size: 'md'
  },
  render: (args) => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      return { args };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton label="Спорт" :isChecked="true" />
        <ORadioButton label="Казино" :isChecked="false" />
        <ORadioButton label="Live игры" :isChecked="false" />
        <ORadioButton label="Покер" :isChecked="false" />
        <ORadioButton label="Турниры" :isChecked="false" />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup size="md">
  <ORadioButton label="Спорт" />
  <ORadioButton label="Казино" />
  <ORadioButton label="Live игры" />
  <ORadioButton label="Покер" />
  <ORadioButton label="Турниры" />
</ORadioButtonGroup>`
      }
    }
  }
};

export const AllSelected = {
  args: {
    label: 'Все выбрано',
    size: 'md'
  },
  render: (args) => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      return { args };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton label="Банковская карта" :isChecked="true" />
        <ORadioButton label="Наличными при получении" :isChecked="false" />
        <ORadioButton label="Банковский перевод" :isChecked="false" />
        <ORadioButton label="Электронные деньги" :isChecked="false" />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup
  label="Все выбрано"
  size="md"
>
  <ORadioButton label="Банковская карта" />
  <ORadioButton label="Наличными при получении" />
  <ORadioButton label="Банковский перевод" />
  <ORadioButton label="Электронные деньги" />
</ORadioButtonGroup>`
      }
    }
  }
};

export const NoneSelected = {
  args: {
    label: 'Ничего не выбрано',
    size: 'md'
  },
  render: (args) => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      return { args };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton label="Банковская карта" :isChecked="false" />
        <ORadioButton label="Наличными при получении" :isChecked="false" />
        <ORadioButton label="Банковский перевод" :isChecked="false" />
        <ORadioButton label="Электронные деньги" :isChecked="false" />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup
  label="Ничего не выбрано"
  size="md"
>
  <ORadioButton label="Банковская карта" />
  <ORadioButton label="Наличными при получении" />
  <ORadioButton label="Банковский перевод" />
  <ORadioButton label="Электронные деньги" />
</ORadioButtonGroup>`
      }
    }
  }
};

export const WithDisabled = {
  args: {
    label: 'С отключенными элементами',
    size: 'md'
  },
  render: (args) => ({
    components: { ORadioButtonGroup, ORadioButton },
    setup() {
      return { args };
    },
    template: `
      <ORadioButtonGroup v-bind="args">
        <ORadioButton label="Доступная опция 1" :isChecked="true" />
        <ORadioButton label="Доступная опция 2" :isChecked="false" />
        <ORadioButton label="Отключенная опция" :isChecked="false" :isDisabled="true" />
        <ORadioButton label="Еще одна доступная" :isChecked="false" />
      </ORadioButtonGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<ORadioButtonGroup
  label="С отключенными элементами"
  size="md"
>
  <ORadioButton label="Доступная опция 1" />
  <ORadioButton label="Доступная опция 2" />
  <ORadioButton label="Отключенная опция" :isDisabled="true" />
  <ORadioButton label="Еще одна доступная" />
</ORadioButtonGroup>`
      }
    }
  }
};

export const MixedSizes = {
  render: () => ({
    components: { ORadioButtonGroup, ORadioButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <ORadioButtonGroup label="Размер MD" size="md">
          <ORadioButton label="Банковская карта" :isChecked="true" />
          <ORadioButton label="Наличными при получении" :isChecked="false" />
        </ORadioButtonGroup>
        
        <ORadioButtonGroup label="Размер SM" size="sm">
          <ORadioButton label="Банковская карта" :isChecked="true" size="sm" />
          <ORadioButton label="Наличными при получении" :isChecked="false" size="sm" />
        </ORadioButtonGroup>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<div style="display: flex; flex-direction: column; gap: 2rem;">
  <ORadioButtonGroup label="Размер MD" size="md">
    <ORadioButton label="Банковская карта" />
    <ORadioButton label="Наличными при получении" />
  </ORadioButtonGroup>
  <ORadioButtonGroup label="Размер SM" size="sm">
    <ORadioButton label="Банковская карта" size="sm" />
    <ORadioButton label="Наличными при получении" size="sm" />
  </ORadioButtonGroup>
</div>`
      }
    }
  }
};

export const InContext = {
  render: () => ({
    components: { ORadioButtonGroup, ORadioButton },
    template: `
      <div style="max-width: 400px; padding: 2rem; background: var(--color-background-page-lvl-1); border-radius: var(--border-radius-lg);">
        <h3 style="margin: 0 0 1.5rem 0; font-family: var(--typography-font-family-header); font-size: var(--typography-font-size-header-lg); color: var(--color-text-primary);">
          Оформление заказа
        </h3>
        
        <p style="margin: 0 0 1.5rem 0; color: var(--color-text-secondary); font-size: var(--typography-font-size-body-md);">
          Выберите способ оплаты и доставки
        </p>
        
        <ORadioButtonGroup label="Способ оплаты" size="md">
          <ORadioButton label="Банковская карта" :isChecked="true" />
          <ORadioButton label="Наличными при получении" :isChecked="false" />
          <ORadioButton label="Банковский перевод" :isChecked="false" />
        </ORadioButtonGroup>
        
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border-secondary);">
          <ORadioButtonGroup label="Способ доставки" size="sm">
            <ORadioButton label="Самовывоз" :isChecked="true" size="sm" />
            <ORadioButton label="Курьером" :isChecked="false" size="sm" />
          </ORadioButtonGroup>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: `<div style="max-width: 400px; padding: 2rem; background: var(--color-background-page-lvl-1); border-radius: var(--border-radius-lg);">
  <h3>Оформление заказа</h3>
  <p>Выберите способ оплаты и доставки</p>
  <ORadioButtonGroup label="Способ оплаты" size="md">
    <ORadioButton label="Банковская карта" />
    <ORadioButton label="Наличными при получении" />
    <ORadioButton label="Банковский перевод" />
  </ORadioButtonGroup>
  <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border-secondary);">
    <ORadioButtonGroup label="Способ доставки" size="sm">
      <ORadioButton label="Самовывоз" size="sm" />
      <ORadioButton label="Курьером" size="sm" />
    </ORadioButtonGroup>
  </div>
</div>`
      }
    }
  }
};