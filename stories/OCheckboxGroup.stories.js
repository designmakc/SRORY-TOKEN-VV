import OCheckboxGroup from '../src/components/OCheckboxGroup.vue';
import OCheckbox from '../src/components/OCheckbox.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';
import { ref } from 'vue';

export default {
  title: 'Components/OCheckboxGroup',
  component: OCheckboxGroup,
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
    label: 'Уведомления',
    size: 'md'
  },
  render: args => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const selectedItems = ref(['email', 'sms']);
      return { args, selectedItems };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox 
          label="Уведомления по email" 
          :isChecked="selectedItems.includes('email')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('email');
            else selectedItems.splice(selectedItems.indexOf('email'), 1);
          }"
        />
        <OCheckbox 
          label="SMS уведомления" 
          :isChecked="selectedItems.includes('sms')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('sms');
            else selectedItems.splice(selectedItems.indexOf('sms'), 1);
          }"
        />
        <OCheckbox 
          label="Push уведомления" 
          :isChecked="selectedItems.includes('push')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('push');
            else selectedItems.splice(selectedItems.indexOf('push'), 1);
          }"
        />
        <OCheckbox 
          label="Telegram уведомления" 
          :isChecked="selectedItems.includes('telegram')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('telegram');
            else selectedItems.splice(selectedItems.indexOf('telegram'), 1);
          }"
        />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup label="Уведомления" size="md"><OCheckbox label="Уведомления по email" /><OCheckbox label="SMS уведомления" /><OCheckbox label="Push уведомления" /><OCheckbox label="Telegram уведомления" /></OCheckboxGroup>',
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
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const selectedItems = ref(['terms', 'data']);
      return { args, selectedItems };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox 
          label="Согласен с условиями" 
          :isChecked="selectedItems.includes('terms')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('terms');
            else selectedItems.splice(selectedItems.indexOf('terms'), 1);
          }"
          size="sm" 
        />
        <OCheckbox 
          label="Согласен на обработку данных" 
          :isChecked="selectedItems.includes('data')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('data');
            else selectedItems.splice(selectedItems.indexOf('data'), 1);
          }"
          size="sm" 
        />
        <OCheckbox 
          label="Рекламные предложения" 
          :isChecked="selectedItems.includes('ads')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('ads');
            else selectedItems.splice(selectedItems.indexOf('ads'), 1);
          }"
          size="sm" 
        />
        <OCheckbox 
          label="Участвовать в опросах" 
          :isChecked="selectedItems.includes('surveys')"
          @update:isChecked="(checked) => {
            if (checked) selectedItems.push('surveys');
            else selectedItems.splice(selectedItems.indexOf('surveys'), 1);
          }"
          size="sm" 
        />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup label="Настройки" size="sm"><OCheckbox label="Согласен с условиями" size="sm" /><OCheckbox label="Согласен на обработку данных" size="sm" /><OCheckbox label="Рекламные предложения" size="sm" /><OCheckbox label="Участвовать в опросах" size="sm" /></OCheckboxGroup>',
      },
    },
  },
};

export const WithoutLabel = {
  args: {
    size: 'md'
  },
  render: (args) => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      return { args };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox label="Спорт" :is-checked="true" />
        <OCheckbox label="Казино" :is-checked="true" />
        <OCheckbox label="Live игры" :is-checked="false" />
        <OCheckbox label="Покер" :is-checked="false" />
        <OCheckbox label="Турниры" :is-checked="false" />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup size="md"><OCheckbox label="Спорт" /><OCheckbox label="Казино" /><OCheckbox label="Live игры" /><OCheckbox label="Покер" /><OCheckbox label="Турниры" /></OCheckboxGroup>'
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
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      return { args };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox label="Уведомления по email" :is-checked="true" />
        <OCheckbox label="SMS уведомления" :is-checked="true" />
        <OCheckbox label="Push уведомления" :is-checked="true" />
        <OCheckbox label="Telegram уведомления" :is-checked="true" />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup label="Все выбрано" size="md"><OCheckbox label="Уведомления по email" /><OCheckbox label="SMS уведомления" /><OCheckbox label="Push уведомления" /><OCheckbox label="Telegram уведомления" /></OCheckboxGroup>'
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
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      return { args };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox label="Уведомления по email" :is-checked="false" />
        <OCheckbox label="SMS уведомления" :is-checked="false" />
        <OCheckbox label="Push уведомления" :is-checked="false" />
        <OCheckbox label="Telegram уведомления" :is-checked="false" />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup label="Ничего не выбрано" size="md"><OCheckbox label="Уведомления по email" /><OCheckbox label="SMS уведомления" /><OCheckbox label="Push уведомления" /><OCheckbox label="Telegram уведомления" /></OCheckboxGroup>'
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
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      return { args };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox label="Доступная опция 1" :is-checked="true" />
        <OCheckbox label="Доступная опция 2" :is-checked="false" />
        <OCheckbox label="Отключенная опция" :is-checked="false" :is-disabled="true" />
        <OCheckbox label="Еще одна доступная" :is-checked="false" />
      </OCheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<OCheckboxGroup label="С отключенными элементами" size="md"><OCheckbox label="Доступная опция 1" /><OCheckbox label="Доступная опция 2" /><OCheckbox label="Отключенная опция" :is-disabled="true" /><OCheckbox label="Еще одна доступная" /></OCheckboxGroup>'
      }
    }
  }
};

export const MixedSizes = {
  render: () => ({
    components: { OCheckboxGroup, OCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <OCheckboxGroup label="Размер MD" size="md">
          <OCheckbox label="Email уведомления" :is-checked="true" />
          <OCheckbox label="SMS уведомления" :is-checked="false" />
        </OCheckboxGroup>
        
        <OCheckboxGroup label="Размер SM" size="sm">
          <OCheckbox label="Email уведомления" :is-checked="true" size="sm" />
          <OCheckbox label="SMS уведомления" :is-checked="false" size="sm" />
        </OCheckboxGroup>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<div style="display: flex; flex-direction: column; gap: 2rem;"><OCheckboxGroup label="Размер MD" size="md"><OCheckbox label="Email уведомления" /><OCheckbox label="SMS уведомления" /></OCheckboxGroup><OCheckboxGroup label="Размер SM" size="sm"><OCheckbox label="Email уведомления" size="sm" /><OCheckbox label="SMS уведомления" size="sm" /></OCheckboxGroup></div>'
      }
    }
  }
};

export const InContext = {
  render: () => ({
    components: { OCheckboxGroup, OCheckbox },
    template: `
      <div style="max-width: 400px; padding: 2rem; background: var(--color-background-page-lvl-1); border-radius: var(--border-radius-lg);">
        <h3 style="margin: 0 0 1.5rem 0; font-family: var(--typography-font-family-header); font-size: var(--typography-font-size-header-lg); color: var(--color-text-primary);">
          Настройки уведомлений
        </h3>
        
        <p style="margin: 0 0 1.5rem 0; color: var(--color-text-secondary); font-size: var(--typography-font-size-body-md);">
          Выберите способы получения уведомлений
        </p>
        
        <OCheckboxGroup label="Способы уведомлений" size="md">
          <OCheckbox label="Email уведомления" :is-checked="true" />
          <OCheckbox label="Push уведомления" :is-checked="true" />
          <OCheckbox label="SMS сообщения" :is-checked="false" />
        </OCheckboxGroup>
        
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border-secondary);">
          <OCheckboxGroup label="Дополнительные настройки" size="sm">
            <OCheckbox label="Согласен с условиями" :is-checked="true" size="sm" />
            <OCheckbox label="Рекламные предложения" :is-checked="false" size="sm" />
          </OCheckboxGroup>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      source: {
        code: '<div style="max-width: 400px; padding: 2rem; background: var(--color-background-page-lvl-1); border-radius: var(--border-radius-lg);"><h3>Настройки уведомлений</h3><p>Выберите способы получения уведомлений</p><OCheckboxGroup label="Способы уведомлений" size="md"><OCheckbox label="Email уведомления" /><OCheckbox label="Push уведомления" /><OCheckbox label="SMS сообщения" /></OCheckboxGroup><div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border-secondary);"><OCheckboxGroup label="Дополнительные настройки" size="sm"><OCheckbox label="Согласен с условиями" size="sm" /><OCheckbox label="Рекламные предложения" size="sm" /></OCheckboxGroup></div></div>'
      }
    }
  }
};
