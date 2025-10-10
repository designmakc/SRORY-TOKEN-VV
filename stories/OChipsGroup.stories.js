import { ref, watch } from 'vue';
import OChipsGroup from '../src/components/OChipsGroup.vue';
import OChips from '../src/components/OChips.vue';

export default {
  title: 'Components/Chips/OChipsGroup',
  component: OChipsGroup,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
  },
  argTypes: {
    hasButtonReset: {
      control: 'boolean',
      description: 'Показывать кнопку "Очистить"'
    },
    resetButtonLabel: {
      control: 'text',
      description: 'Текст кнопки сброса'
    },
    deviceType: {
      control: 'select',
      options: ['desktop', 'tablet', 'mobile'],
      description: 'Тип устройства'
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Режим выбора: single или multiple'
    },
    modelValue: {
      control: 'object',
      description: 'Массив выбранных значений'
    }
  }
};

export const Default = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || []);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <OChipsGroup 
        v-bind="args" 
        :modelValue="selectedValues"
        @update:modelValue="handleUpdate"
      >
        <OChips
          label="Горячие"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="24"
          mode="filter"
          :state="isSelected('hot') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
        />
        <OChips
          label="Новые"
          :hasLeftIcon="true"
          leftIcon="subcategory/new"
          :hasCounter="true"
          :counterValue="12"
          mode="filter"
          :state="isSelected('new') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
        />
        <OChips
          label="Кэшбэк"
          :hasLeftIcon="true"
          leftIcon="subcategory/cashback"
          :hasCounter="true"
          :counterValue="8"
          mode="filter"
          :state="isSelected('cashback') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
        />
        <OChips
          label="Бонус"
          :hasLeftIcon="true"
          leftIcon="objects/gift-filled"
          :hasCounter="true"
          :counterValue="6"
          mode="filter"
          :state="isSelected('bonus') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('bonus') ? selectedValues.filter(v => v !== 'bonus') : [...selectedValues, 'bonus'])"
        />
        <OChips
          label="Акции"
          :hasLeftIcon="true"
          leftIcon="main/promotions"
          :hasCounter="true"
          :counterValue="2"
          mode="filter"
          :state="isSelected('promo') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('promo') ? selectedValues.filter(v => v !== 'promo') : [...selectedValues, 'promo'])"
        />
      </OChipsGroup>
    `
  }),
  args: {
    hasButtonReset: true,
    resetButtonLabel: 'Очистить',
    deviceType: 'desktop',
    selectionMode: 'multiple',
    modelValue: []
  }
};

export const WithPreselectedChips = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || ['hot', 'new', 'cashback']);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <OChipsGroup 
        v-bind="args" 
        :modelValue="selectedValues"
        @update:modelValue="handleUpdate"
      >
        <OChips
          label="Горячие"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="24"
          mode="filter"
          :state="isSelected('hot') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
        />
        <OChips
          label="Новые"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="12"
          mode="filter"
          :state="isSelected('new') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
        />
        <OChips
          label="Кэшбэк"
          :hasLeftIcon="true"
          leftIcon="subcategory/cashback"
          :hasCounter="true"
          :counterValue="8"
          mode="filter"
          :state="isSelected('cashback') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
        />
        <OChips
          label="Бонус"
          :hasLeftIcon="true"
          leftIcon="objects/gift-filled"
          :hasCounter="true"
          :counterValue="6"
          mode="filter"
          :state="isSelected('bonus') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('bonus') ? selectedValues.filter(v => v !== 'bonus') : [...selectedValues, 'bonus'])"
        />
        <OChips
          label="Акции"
          :hasLeftIcon="true"
          leftIcon="main/promotions"
          :hasCounter="true"
          :counterValue="2"
          mode="filter"
          :state="isSelected('promo') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('promo') ? selectedValues.filter(v => v !== 'promo') : [...selectedValues, 'promo'])"
        />
      </OChipsGroup>
    `
  }),
  args: {
    hasButtonReset: true,
    resetButtonLabel: 'Очистить',
    deviceType: 'desktop',
    selectionMode: 'multiple',
    modelValue: ['hot', 'new', 'cashback']
  }
};

export const SingleSelection = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || []);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <OChipsGroup 
        v-bind="args" 
        :modelValue="selectedValues"
        @update:modelValue="handleUpdate"
      >
        <OChips
          label="Горячие"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="24"
          mode="filter"
          :state="isSelected('hot') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('hot') ? [] : ['hot'])"
        />
        <OChips
          label="Новые"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="12"
          mode="filter"
          :state="isSelected('new') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('new') ? [] : ['new'])"
        />
        <OChips
          label="Кэшбэк"
          :hasLeftIcon="true"
          leftIcon="subcategory/cashback"
          :hasCounter="true"
          :counterValue="8"
          mode="filter"
          :state="isSelected('cashback') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('cashback') ? [] : ['cashback'])"
        />
      </OChipsGroup>
    `
  }),
  args: {
    hasButtonReset: false,
    resetButtonLabel: 'Очистить',
    deviceType: 'desktop',
    selectionMode: 'single',
    modelValue: []
  }
};

export const WithoutResetButton = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || ['hot', 'new']);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <OChipsGroup 
        v-bind="args" 
        :modelValue="selectedValues"
        @update:modelValue="handleUpdate"
      >
        <OChips
          label="Горячие"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="24"
          mode="filter"
          :state="isSelected('hot') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
        />
        <OChips
          label="Новые"
          :hasLeftIcon="true"
          leftIcon="subcategory/hot"
          :hasCounter="true"
          :counterValue="12"
          mode="filter"
          :state="isSelected('new') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
        />
        <OChips
          label="Кэшбэк"
          :hasLeftIcon="true"
          leftIcon="subcategory/cashback"
          :hasCounter="true"
          :counterValue="8"
          mode="filter"
          :state="isSelected('cashback') ? 'selected' : 'default'"
          @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
        />
      </OChipsGroup>
    `
  }),
  args: {
    hasButtonReset: false,
    resetButtonLabel: 'Очистить',
    deviceType: 'desktop',
    selectionMode: 'multiple',
    modelValue: ['hot', 'new']
  }
};

export const TabletLayout = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || ['hot', 'new', 'cashback']);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <div style="max-width: 768px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
        <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 12px;">
          Tablet: Горизонтальный скролл (свайпайте влево/вправо) →
        </p>
        <OChipsGroup 
          v-bind="args" 
          :modelValue="selectedValues"
          @update:modelValue="handleUpdate"
        >
          <OChips
            label="Горячие"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="24"
            mode="filter"
            :state="isSelected('hot') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
          />
          <OChips
            label="Новые"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="12"
            mode="filter"
            :state="isSelected('new') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
          />
          <OChips
            label="Кэшбэк"
            :hasLeftIcon="true"
            leftIcon="subcategory/cashback"
            :hasCounter="true"
            :counterValue="8"
            mode="filter"
            :state="isSelected('cashback') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
          />
          <OChips
            label="Бонус"
            :hasLeftIcon="true"
            leftIcon="objects/gift-filled"
            :hasCounter="true"
            :counterValue="6"
            mode="filter"
            :state="isSelected('bonus') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('bonus') ? selectedValues.filter(v => v !== 'bonus') : [...selectedValues, 'bonus'])"
          />
          <OChips
            label="Акции"
            :hasLeftIcon="true"
            leftIcon="main/promotions"
            :hasCounter="true"
            :counterValue="2"
            mode="filter"
            :state="isSelected('promo') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('promo') ? selectedValues.filter(v => v !== 'promo') : [...selectedValues, 'promo'])"
          />
          <OChips
            label="Популярные"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="18"
            mode="filter"
            :state="isSelected('popular') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('popular') ? selectedValues.filter(v => v !== 'popular') : [...selectedValues, 'popular'])"
          />
        </OChipsGroup>
      </div>
    `
  }),
  args: {
    hasButtonReset: true,
    resetButtonLabel: 'Очистить',
    deviceType: 'tablet',
    selectionMode: 'multiple',
    modelValue: ['hot', 'new', 'cashback']
  }
};

export const MobileLayout = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || ['hot', 'new', 'cashback']);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const isSelected = (value) => selectedValues.value.includes(value);

      return { args, selectedValues, handleUpdate, isSelected };
    },
    template: `
      <div style="max-width: 375px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
        <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 12px;">
          Mobile: Горизонтальный скролл (свайпайте влево/вправо) →
        </p>
        <OChipsGroup 
          v-bind="args" 
          :modelValue="selectedValues"
          @update:modelValue="handleUpdate"
        >
          <OChips
            label="Горячие"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="24"
            mode="filter"
            :state="isSelected('hot') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
          />
          <OChips
            label="Новые"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="12"
            mode="filter"
            :state="isSelected('new') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
          />
          <OChips
            label="Кэшбэк"
            :hasLeftIcon="true"
            leftIcon="subcategory/cashback"
            :hasCounter="true"
            :counterValue="8"
            mode="filter"
            :state="isSelected('cashback') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
          />
          <OChips
            label="Бонус"
            :hasLeftIcon="true"
            leftIcon="objects/gift-filled"
            :hasCounter="true"
            :counterValue="6"
            mode="filter"
            :state="isSelected('bonus') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('bonus') ? selectedValues.filter(v => v !== 'bonus') : [...selectedValues, 'bonus'])"
          />
          <OChips
            label="Акции"
            :hasLeftIcon="true"
            leftIcon="main/promotions"
            :hasCounter="true"
            :counterValue="2"
            mode="filter"
            :state="isSelected('promo') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('promo') ? selectedValues.filter(v => v !== 'promo') : [...selectedValues, 'promo'])"
          />
          <OChips
            label="Популярные"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="18"
            mode="filter"
            :state="isSelected('popular') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('popular') ? selectedValues.filter(v => v !== 'popular') : [...selectedValues, 'popular'])"
          />
        </OChipsGroup>
      </div>
    `
  }),
  args: {
    hasButtonReset: true,
    resetButtonLabel: 'Очистить',
    deviceType: 'mobile',
    selectionMode: 'multiple',
    modelValue: ['hot', 'new', 'cashback']
  }
};

// Interactive with Close Icon - можно закрыть чипы по иконке X
export const InteractiveWithClose = {
  render: (args) => ({
    components: { OChipsGroup, OChips },
    setup() {
      const selectedValues = ref(args.modelValue || []);
      const visibleChips = ref(['hot', 'new', 'cashback', 'bonus', 'promo']);
      
      watch(() => args.modelValue, (newVal) => {
        selectedValues.value = newVal;
      });

      const handleUpdate = (newValues) => {
        selectedValues.value = newValues;
      };

      const handleClose = (chipValue) => {
        // Удаляем чип из видимых
        visibleChips.value = visibleChips.value.filter(v => v !== chipValue);
        // Удаляем из выбранных, если был выбран
        if (selectedValues.value.includes(chipValue)) {
          selectedValues.value = selectedValues.value.filter(v => v !== chipValue);
        }
      };

      const handleReset = () => {
        // В режиме input кнопка "Очистить" удаляет ВСЕ чипсы
        visibleChips.value = [];
        selectedValues.value = [];
      };

      const isSelected = (value) => selectedValues.value.includes(value);
      const isVisible = (value) => visibleChips.value.includes(value);

      return { args, selectedValues, visibleChips, handleUpdate, handleClose, handleReset, isSelected, isVisible };
    },
    template: `
      <div>
        <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 12px;">
          Режим "input": Иконка X на чипсе удаляет его. Кнопка "Очистить" удаляет ВСЕ чипсы.
        </p>
        <OChipsGroup 
          v-bind="args" 
          :modelValue="selectedValues"
          @update:modelValue="handleUpdate"
          @reset="handleReset"
        >
          <OChips
            v-if="isVisible('hot')"
            label="Горячие"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="24"
            mode="input"
            :state="isSelected('hot') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('hot') ? selectedValues.filter(v => v !== 'hot') : [...selectedValues, 'hot'])"
            @close="handleClose('hot')"
          />
          <OChips
            v-if="isVisible('new')"
            label="Новые"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="12"
            mode="input"
            :state="isSelected('new') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('new') ? selectedValues.filter(v => v !== 'new') : [...selectedValues, 'new'])"
            @close="handleClose('new')"
          />
          <OChips
            v-if="isVisible('cashback')"
            label="Кэшбэк"
            :hasLeftIcon="true"
            leftIcon="subcategory/cashback"
            :hasCounter="true"
            :counterValue="8"
            mode="input"
            :state="isSelected('cashback') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('cashback') ? selectedValues.filter(v => v !== 'cashback') : [...selectedValues, 'cashback'])"
            @close="handleClose('cashback')"
          />
          <OChips
            v-if="isVisible('bonus')"
            label="Бонус"
            :hasLeftIcon="true"
            leftIcon="objects/gift-filled"
            :hasCounter="true"
            :counterValue="6"
            mode="input"
            :state="isSelected('bonus') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('bonus') ? selectedValues.filter(v => v !== 'bonus') : [...selectedValues, 'bonus'])"
            @close="handleClose('bonus')"
          />
          <OChips
            v-if="isVisible('promo')"
            label="Акции"
            :hasLeftIcon="true"
            leftIcon="main/promotions"
            :hasCounter="true"
            :counterValue="2"
            mode="input"
            :state="isSelected('promo') ? 'selected' : 'default'"
            @click="handleUpdate(isSelected('promo') ? selectedValues.filter(v => v !== 'promo') : [...selectedValues, 'promo'])"
            @close="handleClose('promo')"
          />
        </OChipsGroup>
      </div>
    `
  }),
  args: {
    hasButtonReset: true,
    resetButtonLabel: 'Очистить',
    deviceType: 'desktop',
    selectionMode: 'multiple',
    modelValue: ['hot', 'cashback']
  }
};

