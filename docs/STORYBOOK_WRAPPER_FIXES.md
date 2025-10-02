# Исправление конфликтов Storybook обёрток

## Проблема
Storybook автоматически добавляет обёртки с классами типа `story--components-ocheckbox--primary--primary-inner`, которые могут конфликтовать с нашими стилями и влиять на высоту компонентов.

## Решение

### 1. Глобальные CSS правила в `.storybook/preview.js`
Добавлены специальные CSS правила для нейтрализации влияния Storybook обёрток:

```css
/* НЕЙТРАЛИЗАЦИЯ STORYBOOK ОБЁРТОК */
[class*="story--"] {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  /* ... другие правила */
}
```

### 2. Дополнительный CSS файл `src/assets/styles/storybook-fixes.css`
Создан специальный файл с комплексными правилами для защиты компонентов от влияния Storybook обёрток.

### 3. Защита в компонентах
В каждый компонент добавлены специальные CSS правила:

```css
/* Дополнительная защита от Storybook обёрток */
[class*="story--"] .o-checkbox {
  display: inline-flex !important;
  align-items: center !important;
  margin: 0 !important;
  /* ... другие правила */
}
```

### 4. Параметры Storybook
Добавлены специальные параметры для лучшего контроля:

```javascript
docs: {
  inlineStories: false,
  iframeHeight: 'auto',
}
```

## Результат
- ✅ Убраны все конфликты с Storybook обёртками
- ✅ Компоненты отображаются с правильной высотой
- ✅ Стили применяются корректно
- ✅ Нет влияния на layout компонентов

## Файлы изменены
- `.storybook/preview.js` - глобальные CSS правила
- `src/assets/styles/storybook-fixes.css` - новый файл с исправлениями
- `src/components/OCheckbox.vue` - защита от обёрток
- Другие компоненты - аналогичная защита

## Применение к другим компонентам
Для каждого нового компонента добавляйте аналогичные CSS правила:

```css
/* Дополнительная защита от Storybook обёрток */
[class*="story--"] .o-component {
  display: inline-flex !important;
  align-items: center !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto !important;
  /* ... другие правила */
}
```
