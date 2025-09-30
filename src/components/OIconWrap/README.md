# OIconWrap

Компонент для отображения иконок с поддержкой счетчиков. Использует готовый компонент `OCounter` для отображения счетчиков и поддерживает различные размеры, цвета и интеграцию с дизайн-системой.

## Особенности

- ✅ **Динамическая загрузка SVG** иконок из `src/assets/icon/`
- ✅ **Интеграция с OCounter** для отображения счетчиков
- ✅ **Поддержка токенов дизайн-системы** для цветов и размеров
- ✅ **Управление цветом иконок** через `currentColor` механизм
- ✅ **Поддержка оригинальных цветов** иконок
- ✅ **Валидация props** и обработка ошибок

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `sizeIcon` | Number | 24 | Размер иконки (12, 16, 20, 24, 32, 40, 56) |
| `icon` | String | 'navigation-action/play' | Путь к иконке (категория/название) |
| `hasCounter` | Boolean | false | Показывать счетчик (только для размеров 24 и 32) |
| `hasOwnColor` | Boolean | false | Использовать исходные цвета иконки |
| `iconColor` | String | 'var(--color-icon-primary)' | Цвет иконки через токен |
| `counterValue` | Number | 2 | Значение счетчика |
| `counterVariant` | String | 'inverse' | Вариант счетчика для OCounter (primary, secondary, tertiary, inverse) |

## Примеры использования

### Базовое использование

```vue
<OIconWrap 
  :sizeIcon="24"
  icon="navigation-action/play"
/>
```

### С счетчиком

```vue
<OIconWrap 
  :sizeIcon="24"
  icon="communication/notification-bell-filled"
  :hasCounter="true"
  :counterValue="3"
  counterVariant="inverse"
/>
```

### С собственными цветами

```vue
<OIconWrap 
  :sizeIcon="24"
  icon="navigation-action/heart-filled"
  :hasOwnColor="true"
/>
```

### Разные размеры

```vue
<OIconWrap :sizeIcon="12" icon="navigation-action/play" />
<OIconWrap :sizeIcon="16" icon="navigation-action/play" />
<OIconWrap :sizeIcon="20" icon="navigation-action/play" />
<OIconWrap :sizeIcon="24" icon="navigation-action/play" />
<OIconWrap :sizeIcon="32" icon="navigation-action/play" />
<OIconWrap :sizeIcon="40" icon="navigation-action/play" />
<OIconWrap :sizeIcon="56" icon="navigation-action/play" />
```

## Размеры иконок

### Поддерживаемые размеры:
- **12px** - для мелких элементов
- **16px** - для кнопок и ссылок
- **20px** - для навигации
- **24px** - стандартный размер (с поддержкой счетчиков)
- **32px** - увеличенный размер (с поддержкой счетчиков)
- **40px** - для заголовков
- **56px** - для больших элементов

### Счетчики:
- Показываются только для размеров **24px** и **32px**
- Размер счетчика автоматически подстраивается под размер иконки
- 24px → счетчик `md`
- 32px → счетчик `sm`

## Цвета иконок

### Токены дизайн-системы

```vue
<!-- Основной цвет иконки -->
<OIconWrap iconColor="var(--color-icon-primary)" />

<!-- Вторичный цвет -->
<OIconWrap iconColor="var(--color-icon-secondary)" />

<!-- Цвет для интерактивных элементов -->
<OIconWrap iconColor="var(--color-icon-interactive)" />
```

### Собственные цвета

```vue
<!-- Иконка с оригинальными цветами -->
<OIconWrap 
  :hasOwnColor="true"
  icon="navigation-action/heart-filled"
/>
```

## Позиционирование счетчика

Счетчик позиционируется в правом верхнем углу иконки:

```css
.counter-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}
```

### Форматирование значений

- Значения больше 99 отображаются как "99+"
- Используется компонент `OCounter` для единообразия дизайна

## Цвета иконок

### Токены дизайн-системы

```vue
<!-- Основной цвет иконки -->
<OIconWrap iconColor="var(--color-icon-primary)" />

<!-- Вторичный цвет -->
<OIconWrap iconColor="var(--color-icon-secondary)" />

<!-- Цвет для интерактивных элементов -->
<OIconWrap iconColor="var(--color-icon-interactive)" />
```

### Собственные цвета

```vue
<!-- Иконка с оригинальными цветами -->
<OIconWrap 
  :hasOwnColor="true"
  icon="navigation-action/heart-filled"
/>
```

## Структура файлов

```
src/components/OIconWrap/
├── OIconWrap.vue          # Основной компонент
├── index.js               # Экспорт компонента
└── README.md              # Документация

stories/
└── OIconWrap.stories.js   # Storybook stories
```

## Интеграция с OCounter

Компонент использует готовый `OCounter` для отображения счетчиков:

```vue
<OCounter 
  :label="counterLabel"
  :variant="counterVariant"
  :size="counterSize"
/>
```

Это обеспечивает:
- Единообразие дизайна счетчиков
- Поддержку всех вариантов OCounter
- Автоматическое форматирование значений

## Обработка ошибок

- Ошибки загрузки иконок логируются в консоль
- При ошибке возвращается пустая строка
- Компонент продолжает работать без иконки

## Производительность

- Использует `import.meta.glob` для динамической загрузки
- Иконки загружаются только при необходимости
- Поддержка eager loading для быстрого доступа

## Доступность

- Поддержка screen readers через aria-label
- Семантическая разметка для счетчиков
- Keyboard navigation support



