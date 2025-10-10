import { ref, watch } from 'vue';
import OCheckboxGroup from '../src/components/OCheckboxGroup.vue';
import OCheckbox from '../src/components/OCheckbox.vue';

export default {
  title: 'Components/Checkbox/OCheckboxGroup',
  component: OCheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Размер группы и чекбоксов'
    },
    label: {
      control: 'text',
      description: 'Заголовок группы'
    }
  }
};

export const Default = {
  render: (args) => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const checked1 = ref(false);
      const checked2 = ref(true);
      const checked3 = ref(false);

      return { args, checked1, checked2, checked3 };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox
          label="Опция 1"
          :size="args.size"
          :isChecked="checked1"
          @update:isChecked="checked1 = $event"
        />
        <OCheckbox
          label="Опция 2"
          :size="args.size"
          :isChecked="checked2"
          @update:isChecked="checked2 = $event"
        />
        <OCheckbox
          label="Опция 3"
          :size="args.size"
          :isChecked="checked3"
          @update:isChecked="checked3 = $event"
        />
      </OCheckboxGroup>
    `
  }),
  args: {
    size: 'md',
    label: ''
  }
};

export const WithLabel = {
  render: (args) => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const checked1 = ref(false);
      const checked2 = ref(true);
      const checked3 = ref(false);

      return { args, checked1, checked2, checked3 };
    },
    template: `
      <OCheckboxGroup v-bind="args">
        <OCheckbox
          label="Получать уведомления"
          :size="args.size"
          :isChecked="checked1"
          @update:isChecked="checked1 = $event"
        />
        <OCheckbox
          label="Подписаться на рассылку"
          :size="args.size"
          :isChecked="checked2"
          @update:isChecked="checked2 = $event"
        />
        <OCheckbox
          label="Согласен с условиями"
          :size="args.size"
          :isChecked="checked3"
          @update:isChecked="checked3 = $event"
        />
      </OCheckboxGroup>
    `
  }),
  args: {
    size: 'md',
    label: 'Настройки уведомлений'
  }
};

export const SizeMd = {
  render: () => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const options = ref([
        { id: 1, label: 'JavaScript', checked: true },
        { id: 2, label: 'TypeScript', checked: true },
        { id: 3, label: 'Vue.js', checked: false },
        { id: 4, label: 'React', checked: false }
      ]);

      const updateChecked = (id, value) => {
        const option = options.value.find(o => o.id === id);
        if (option) option.checked = value;
      };

      return { options, updateChecked };
    },
    template: `
      <OCheckboxGroup size="md" label="Технологии (Medium)">
        <OCheckbox
          v-for="option in options"
          :key="option.id"
          :label="option.label"
          size="md"
          :isChecked="option.checked"
          @update:isChecked="updateChecked(option.id, $event)"
        />
      </OCheckboxGroup>
    `
  })
};

export const SizeSm = {
  render: () => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const options = ref([
        { id: 1, label: 'JavaScript', checked: true },
        { id: 2, label: 'TypeScript', checked: true },
        { id: 3, label: 'Vue.js', checked: false },
        { id: 4, label: 'React', checked: false }
      ]);

      const updateChecked = (id, value) => {
        const option = options.value.find(o => o.id === id);
        if (option) option.checked = value;
      };

      return { options, updateChecked };
    },
    template: `
      <OCheckboxGroup size="sm" label="Технологии (Small)">
        <OCheckbox
          v-for="option in options"
          :key="option.id"
          :label="option.label"
          size="sm"
          :isChecked="option.checked"
          @update:isChecked="updateChecked(option.id, $event)"
        />
      </OCheckboxGroup>
    `
  })
};

export const Interactive = {
  render: () => ({
    components: { OCheckboxGroup, OCheckbox },
    setup() {
      const selectedLanguages = ref(['javascript', 'vue']);

      const languages = [
        { id: 'javascript', label: 'JavaScript' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'vue', label: 'Vue.js' },
        { id: 'react', label: 'React' },
        { id: 'angular', label: 'Angular' }
      ];

      const isChecked = (id) => selectedLanguages.value.includes(id);

      const toggleLanguage = (id) => {
        if (isChecked(id)) {
          selectedLanguages.value = selectedLanguages.value.filter(l => l !== id);
        } else {
          selectedLanguages.value.push(id);
        }
      };

      return { languages, selectedLanguages, isChecked, toggleLanguage };
    },
    template: `
      <div>
        <OCheckboxGroup size="md" label="Выберите языки программирования">
          <OCheckbox
            v-for="lang in languages"
            :key="lang.id"
            :label="lang.label"
            size="md"
            :isChecked="isChecked(lang.id)"
            @update:isChecked="toggleLanguage(lang.id)"
          />
        </OCheckboxGroup>
        <div style="margin-top: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <p style="color: var(--color-text-secondary); font-size: 14px; margin: 0;">
            Выбрано: {{ selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Ничего' }}
          </p>
        </div>
      </div>
    `
  })
};