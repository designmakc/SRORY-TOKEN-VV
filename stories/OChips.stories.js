import { ref, watch } from 'vue';
import OChips from '../src/components/OChips.vue';

export default {
  title: 'Components/Chips/OChips',
  component: OChips,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'press', 'selected', 'selectedHover', 'disabled'],
      description: 'Состояние чипа'
    },
    label: {
      control: 'text',
      description: 'Текст чипа'
    },
    hasLabel: {
      control: 'boolean',
      description: 'Показывать текст'
    },
    hasIconClose: {
      control: 'boolean',
      description: 'Показывать иконку закрытия'
    },
    hasCounter: {
      control: 'boolean',
      description: 'Показывать счетчик'
    },
    hasLeftIcon: {
      control: 'boolean',
      description: 'Показывать левую иконку'
    },
    leftIcon: {
      control: 'text',
      description: 'Путь к левой иконке (категория/название)'
    },
    counterValue: {
      control: 'number',
      description: 'Значение счетчика'
    },
    counterVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
      description: 'Вариант счетчика'
    },
    mode: {
      control: 'select',
      options: ['filter', 'input', 'choice'],
      description: 'Режим работы чипа (filter - фильтры, input - удаляемые теги, choice - выбор опции)'
    }
  }
};

// Default
export const Default = {
  render: (args) => ({
    components: { OChips },
    setup() {
      const handleClick = () => {
        console.log('Chip clicked');
      };

      const handleClose = () => {
        console.log('Close clicked');
      };

      return { args, handleClick, handleClose };
    },
    template: `
      <OChips 
        v-bind="args" 
        @click="handleClick"
        @close="handleClose"
      />
    `
  }),
  args: {
    state: 'default',
    label: 'Название',
    hasLabel: true,
    hasIconClose: false,
    hasCounter: false,
    hasLeftIcon: false,
    leftIcon: 'navigation-action/star',
    counterValue: 2,
    counterVariant: 'primary',
    mode: 'filter'
  }
};

// Hover
export const Hover = {
  render: (args) => ({
    components: { OChips },
    setup() {
      return { args };
    },
    template: '<OChips v-bind="args" />'
  }),
  args: {
    state: 'hover',
    label: 'Название',
    hasLabel: true,
    hasIconClose: true
  }
};

// Press
export const Press = {
  render: (args) => ({
    components: { OChips },
    setup() {
      return { args };
    },
    template: '<OChips v-bind="args" />'
  }),
  args: {
    state: 'press',
    label: 'Название',
    hasLabel: true,
    hasIconClose: true
  }
};

// Selected
export const Selected = {
  render: (args) => ({
    components: { OChips },
    setup() {
      return { args };
    },
    template: '<OChips v-bind="args" />'
  }),
  args: {
    state: 'selected',
    label: 'Название',
    hasLabel: true,
    hasIconClose: true
  }
};

// SelectedHover
export const SelectedHover = {
  render: (args) => ({
    components: { OChips },
    setup() {
      return { args };
    },
    template: '<OChips v-bind="args" />'
  }),
  args: {
    state: 'selectedHover',
    label: 'Название',
    hasLabel: true,
    hasIconClose: true
  }
};

// Disabled
export const Disabled = {
  render: (args) => ({
    components: { OChips },
    setup() {
      const handleClick = () => {
        console.log('Should not fire - Chip clicked');
      };

      const handleClose = () => {
        console.log('Should not fire - Close clicked');
      };

      return { args, handleClick, handleClose };
    },
    template: `
      <OChips 
        v-bind="args" 
        @click="handleClick"
        @close="handleClose"
      />
    `
  }),
  args: {
    state: 'disabled',
    label: 'Название',
    hasLabel: true,
    hasIconClose: true
  }
};



// Interactive Example
export const InteractiveExample = {
  render: () => ({
    components: { OChips },
    setup() {
      const chips = ref([
        { id: 1, label: 'JavaScript', selected: false },
        { id: 2, label: 'TypeScript', selected: true },
        { id: 3, label: 'Vue.js', selected: false },
        { id: 4, label: 'React', selected: false },
        { id: 5, label: 'Angular', selected: false }
      ]);

      const toggleChip = (id) => {
        const chip = chips.value.find(c => c.id === id);
        if (chip) {
          chip.selected = !chip.selected;
        }
      };

      const removeChip = (id) => {
        chips.value = chips.value.filter(c => c.id !== id);
      };

      return { chips, toggleChip, removeChip };
    },
    template: `
      <div>
        <div style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 16px;">
          Кликните на chip чтобы выбрать/отменить, на крестик чтобы удалить
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <OChips
            v-for="chip in chips"
            :key="chip.id"
            :label="chip.label"
            :state="chip.selected ? 'selected' : 'default'"
            hasLabel
            hasIconClose
            @click="toggleChip(chip.id)"
            @close="removeChip(chip.id)"
          />
        </div>
        <div style="margin-top: 16px; color: var(--color-text-secondary); font-size: 14px;">
          Выбрано: {{ chips.filter(c => c.selected).map(c => c.label).join(', ') || 'Ничего' }}
        </div>
      </div>
    `
  })
};

// Mode: Filter - фильтры контента
export const ModeFilter = {
  render: () => ({
    components: { OChips },
    setup() {
      const filters = ref([
        { id: 1, label: 'Горячие', value: 'hot', selected: false, icon: 'subcategory/hot', count: 24 },
        { id: 2, label: 'Новые', value: 'new', selected: true, icon: 'subcategory/new', count: 12 },
        { id: 3, label: 'Кэшбэк', value: 'cashback', selected: false, icon: 'subcategory/cashback', count: 8 },
        { id: 4, label: 'Бонус', value: 'bonus', selected: false, icon: 'objects/gift-filled', count: 6 }
      ]);

      const toggleFilter = (id) => {
        const filter = filters.value.find(f => f.id === id);
        if (filter) {
          filter.selected = !filter.selected;
        }
      };

      return { filters, toggleFilter };
    },
    template: `
      <div>
        <div style="color: var(--color-text-secondary); line-height: var(--typography-line-height-body-sm); font-size: 14px; margin-bottom: 16px;">
          <strong>Mode: filter</strong> - Чипы-фильтры<br/>
          • Клик переключает состояние selected/default<br/>
          • Иконка X НЕ показывается<br/>
          • Используется для фильтрации контента
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <OChips
            v-for="filter in filters"
            :key="filter.id"
            :label="filter.label"
            :hasLeftIcon="true"
            :leftIcon="filter.icon"
            :hasCounter="true"
            :counterValue="filter.count"
            mode="filter"
            :state="filter.selected ? 'selected' : 'default'"
            @click="toggleFilter(filter.id)"
          />
        </div>
        <div style="margin-top: 16px; color: var(--color-text-secondary); font-size: 14px;">
          Активные фильтры: {{ filters.filter(f => f.selected).map(f => f.label).join(', ') || 'Нет' }}
        </div>
      </div>
    `
  })
};

// Mode: Input - удаляемые теги/значения
export const ModeInput = {
  render: () => ({
    components: { OChips },
    setup() {
      const tags = ref([
        { id: 1, label: 'JavaScript' },
        { id: 2, label: 'TypeScript' },
        { id: 3, label: 'Vue.js' },
        { id: 4, label: 'React' },
        { id: 5, label: 'Angular' }
      ]);

      const removeTag = (id) => {
        tags.value = tags.value.filter(t => t.id !== id);
      };

      return { tags, removeTag };
    },
    template: `
      <div>
        <div style="color: var(--color-text-secondary); line-height: var(--typography-line-height-body-sm); font-size: 14px; margin-bottom: 16px;">
          <strong>Mode: input</strong> - Введенные значения (теги, email)<br/>
          • Иконка X ВСЕГДА показывается<br/>
          • Клик на X удаляет элемент из списка<br/>
          • Обычно без состояния selected<br/>
          • Используется для списков удаляемых элементов
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <OChips
            v-for="tag in tags"
            :key="tag.id"
            :label="tag.label"
            mode="input"
            state="default"
            @close="removeTag(tag.id)"
          />
        </div>
        <div style="margin-top: 16px; color: var(--color-text-secondary); font-size: 14px;">
          Всего тегов: {{ tags.length }}
        </div>
      </div>
    `
  })
};

// Mode: Choice - выбор одной опции
export const ModeChoice = {
  render: () => ({
    components: { OChips },
    setup() {
      const sizes = ref([
        { id: 1, label: 'XS', value: 'xs' },
        { id: 2, label: 'S', value: 's' },
        { id: 3, label: 'M', value: 'm' },
        { id: 4, label: 'L', value: 'l' },
        { id: 5, label: 'XL', value: 'xl' }
      ]);

      const selectedSize = ref('m');

      const selectSize = (value) => {
        selectedSize.value = value;
      };

      return { sizes, selectedSize, selectSize };
    },
    template: `
      <div>
        <div style="color: var(--color-text-secondary); font-size: 14px; line-height: var(--typography-line-height-body-sm); margin-bottom: 16px;">
          <strong>Mode: choice</strong> - Выбор одной опции (как радио-кнопки)<br/>
          • Клик выбирает опцию<br/>
          • Иконка X НЕ показывается<br/>
          • Только одна опция может быть выбрана<br/>
          • Используется для выбора размера, варианта доставки и т.д.
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <OChips
            v-for="size in sizes"
            :key="size.id"
            :label="size.label"
            mode="choice"
            :state="selectedSize === size.value ? 'selected' : 'default'"
            @click="selectSize(size.value)"
          />
        </div>
        <div style="margin-top: 16px; color: var(--color-text-secondary); font-size: 14px;">
          Выбранный размер: {{ selectedSize.toUpperCase() }}
        </div>
      </div>
    `
  })
};

// Comparison - сравнение всех режимов
export const ModeComparison = {
  render: () => ({
    components: { OChips },
    setup() {
      const filterSelected = ref(true);
      const tags = ref(['JavaScript', 'Vue.js', 'React']);
      const choiceSelected = ref('m');

      const toggleFilter = () => {
        filterSelected.value = !filterSelected.value;
      };

      const removeTag = (tag) => {
        tags.value = tags.value.filter(t => t !== tag);
      };

      const selectChoice = (value) => {
        choiceSelected.value = value;
      };

      return { filterSelected, tags, choiceSelected, toggleFilter, removeTag, selectChoice };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <!-- Filter Mode -->
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">Filter Mode</h3>
          <p style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">
            Клик переключает, без иконки X
          </p>
          <OChips
            label="Горячие предложения"
            :hasLeftIcon="true"
            leftIcon="subcategory/hot"
            :hasCounter="true"
            :counterValue="24"
            mode="filter"
            :state="filterSelected ? 'selected' : 'default'"
            @click="toggleFilter"
          />
        </div>

        <!-- Input Mode -->
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">Input Mode</h3>
          <p style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">
            Всегда с иконкой X для удаления
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <OChips
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              mode="input"
              state="default"
              @close="removeTag(tag)"
            />
          </div>
        </div>

        <!-- Choice Mode -->
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">Choice Mode</h3>
          <p style="color: var(--color-text-secondary); font-size: 14px; margin-bottom: 12px; line-height: var(--typography-line-height-body-sm);">
            Выбор одной опции, без иконки X
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <OChips
              v-for="size in ['XS', 'S', 'M', 'L', 'XL']"
              :key="size"
              :label="size"
              mode="choice"
              :state="choiceSelected === size.toLowerCase() ? 'selected' : 'default'"
              @click="selectChoice(size.toLowerCase())"
            />
          </div>
        </div>
      </div>
    `
  })
};

