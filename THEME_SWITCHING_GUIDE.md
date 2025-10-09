# Переключение тем в Storybook

## Обзор

В Storybook добавлена панель инструментов для переключения между темами BLUE, RED и STONE, а также адаптивными режимами (wide, desktop, tablet, mobile).

## Как использовать

### 1. Панель инструментов Theme
- **Расположение**: В верхней панели Storybook
- **Иконка**: Круг (circlehollow)
- **Опции**:
  - 🔵 **Blue Theme** - синяя тема (по умолчанию)
  - 🔴 **Red Theme** - красная тема  
  - ⚫ **Stone Theme** - серая тема

### 2. Панель инструментов Adaptive
- **Расположение**: В верхней панели Storybook
- **Иконка**: Мобильное устройство (mobile)
- **Опции**:
  - 🖥️ **Wide** - широкий экран
  - 🖥️ **Desktop** - десктоп (по умолчанию)
  - 📱 **Tablet** - планшет
  - 📱 **Mobile** - мобильный

## Техническая реализация

### Глобальные переменные
```javascript
// В .storybook/preview.js
export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'blue', title: 'Blue Theme', icon: 'circle' },
        { value: 'red', title: 'Red Theme', icon: 'circle' },
        { value: 'stone', title: 'Stone Theme', icon: 'circle' }
      ],
      dynamicTitle: true,
    },
  },
  adaptive: {
    description: 'Global adaptive mode for components',
    toolbar: {
      title: 'Adaptive',
      icon: 'mobile',
      items: [
        { value: 'wide', title: 'Wide', icon: 'desktop' },
        { value: 'desktop', title: 'Desktop', icon: 'desktop' },
        { value: 'tablet', title: 'Tablet', icon: 'mobile' },
        { value: 'mobile', title: 'Mobile', icon: 'mobile' }
      ],
      dynamicTitle: true,
    },
  },
};
```

### Декораторы в stories
```javascript
// В каждом stories файле
decorators: [
  (story, context) => {
    // Применяем темы к document.documentElement
    if (context.globals.theme) {
      document.documentElement.setAttribute('data-theme', context.globals.theme);
    }
    if (context.globals.adaptive) {
      document.documentElement.setAttribute('data-adaptive', context.globals.adaptive);
    }
    return { components: { story }, template: '<story />' };
  }
]
```

## CSS переменные

Темы работают через CSS переменные в `src/assets/styles/style.css`:

### Blue Theme (по умолчанию)
```css
[data-theme="blue"] {
  --theme-color-background-page-lvl-1: var(--color-blue-950);
  --theme-color-background-page-lvl-2: var(--color-blue-900);
  --theme-color-background-page-lvl-3: var(--color-blue-800);
  /* ... */
}
```

### Red Theme
```css
[data-theme="red"] {
  --theme-color-background-page-lvl-1: var(--color-grey-950);
  --theme-color-background-page-lvl-2: var(--color-grey-900);
  --theme-color-background-page-lvl-3: var(--color-grey-800);
  /* ... */
}
```

### Stone Theme
```css
[data-theme="stone"] {
  --theme-color-background-page-lvl-1: var(--color-stone-950);
  --theme-color-background-page-lvl-2: var(--color-stone-900);
  --theme-color-background-page-lvl-3: var(--color-stone-700);
  /* ... */
}
```

## Поддерживаемые компоненты

Все компоненты с префиксом "O" поддерживают переключение тем:

- ✅ **OButton** - кнопки
- ✅ **OCheckbox** - чекбоксы
- ✅ **OCheckboxGroup** - группы чекбоксов
- ✅ **OCounter** - счетчики
- ✅ **OIconWrap** - обертки иконок
- ✅ **ORadioButton** - радиокнопки
- ✅ **ORadioButtonGroup** - группы радиокнопок
- ✅ **OTypography** - типографика
- ✅ **Icons** - иконки

## Использование в компонентах

Компоненты автоматически используют CSS переменные:

```vue
<template>
  <div class="o-component">
    <slot />
  </div>
</template>

<style scoped>
.o-component {
  background: var(--color-background-page-lvl-1);
  color: var(--color-text-primary);
  padding: var(--padding-md);
}
</style>
```

При переключении темы в Storybook, все CSS переменные автоматически обновляются согласно выбранной теме.

## Отладка

### Проверка активной темы
```javascript
// В консоли браузера
console.log(document.documentElement.getAttribute('data-theme'));
console.log(document.documentElement.getAttribute('data-adaptive'));
```

### Проверка CSS переменных
```javascript
// В DevTools → Elements → :root
// Проверить CSS переменные для активной темы
```

## Примечания

- Переключение тем работает только в Storybook
- В production приложении темы нужно переключать программно
- Все компоненты должны использовать CSS переменные вместо хардкода цветов
- Адаптивные режимы влияют на размеры и отступы компонентов
