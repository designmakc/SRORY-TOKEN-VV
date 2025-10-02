# Storybook Компактное Отображение - Руководство

## Что изменилось

Теперь в Storybook компоненты отображаются в компактном виде с чистым HTML кодом, а не с развёрнутым кодом и внутренней логикой.

## Настройки Storybook

### 1. Глобальные параметры (`.storybook/preview.js`)

```javascript
export const parameters = {
  docs: {
    source: {
      type: 'code', // Компактный формат
      state: 'closed', // Код свёрнут по умолчанию
      excludeDecorators: true,
      format: true,
      language: 'html',
    },
  },
  controls: {
    expanded: false, // Скрывает расширенные контролы
  },
};
```

## Формат Stories

### Правильный формат кода в документации

```javascript
export const Primary = {
  args: {
    variant: 'primary',
    label: 'Button text',
  },
  parameters: {
    docs: {
      source: {
        code: '<OButton variant="primary">Button text</OButton>',
      },
    },
  },
};
```

### Что показывать в коде

✅ **Показывать:**
- Чистый HTML/Vue синтаксис
- Только значимые props
- Компактный формат

✅ **Примеры:**
```html
<OCheckbox variant="primary" :isChecked="true" label="Checkbox" />
<OButton variant="primary" size="md">Button</OButton>
```

### Что НЕ показывать в коде

❌ **НЕ показывать:**
- Внутреннюю логику (ref, setup, const)
- Импорты и декларации
- Значения по умолчанию props
- JSX синтаксис

❌ **НЕправильные примеры:**
```html
<script setup>
import { ref } from 'vue';
const isActive = ref(true);
</script>
<template>
  <OButton :isActive="isActive" />
</template>
```

## Создание новых Stories

### 1. Базовый шаблон

```javascript
import OComponent from '../src/components/OComponent.vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';

export default {
  title: 'Components/OComponent',
  component: OComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Вариант стиля'
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

// Простая story
export const Primary = {
  args: {
    variant: 'primary'
  },
  parameters: {
    docs: {
      source: {
        code: '<OComponent variant="primary" />',
      },
    },
  },
};

// Сложная story
export const WithIcon = {
  args: {
    variant: 'primary',
    icon: 'save',
    label: 'Save'
  },
  parameters: {
    docs: {
      source: {
        code: `<OComponent
  variant="primary"
  icon="save"
  label="Save"
/>`,
      },
    },
  },
};
```

### 2. Обязательные элементы

- ✅ `tags: ['autodocs']`
- ✅ CSF3 формат (объекты, не функции)
- ✅ `parameters.docs.source.code` для каждой story
- ✅ Decorators для тем
- ✅ ArgTypes с описаниями

### 3. Минимум stories

- **Primary** - основной вариант
- **AllVariants** - все варианты
- **InContext** - в контексте использования

## Команды

```bash
# Запуск Storybook
npm run storybook

# Поиск токенов
npm run tokens:info --search button

# Валидация токенов
npm run tokens:validate
```

## Отладка

### Если код не отображается компактно:

1. Проверьте `parameters.docs.source.code` в каждой story
2. Убедитесь, что используется CSF3 формат
3. Проверьте глобальные параметры в `.storybook/preview.js`

### Если код показывает внутреннюю логику:

1. Убедитесь, что не используете `.bind({})`
2. Не используйте функции-истории `(args) => Template(args)`
3. Показывайте только HTML/Vue синтаксис

## Примеры

### ✅ Правильно

```javascript
export const Primary = {
  args: {
    variant: 'primary',
    label: 'Button'
  },
  parameters: {
    docs: {
      source: {
        code: '<OButton variant="primary">Button</OButton>',
      },
    },
  },
};
```

### ❌ Неправильно

```javascript
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Button'
};
// Нет parameters.docs.source.code
```

## Результат

Теперь в Storybook вы увидите:

- **Компактный код** вместо развёрнутого
- **Чистый HTML** вместо внутренней логики
- **Свёрнутый код** по умолчанию
- **Понятные примеры** для разработчиков

Это делает документацию более читаемой и полезной для команды разработки.
