# Форматирование кода в Storybook Stories

## Правила форматирования кода в `parameters.docs.source.code`

### 1. Простые компоненты (без дочерних элементов)
```html
<ComponentName prop1="value" prop2="value" />
```

### 2. Компоненты с несколькими атрибутами
```html
<ComponentName
  prop1="value"
  prop2="value"
  prop3="value"
/>
```

### 3. Компоненты с дочерними элементами
```html
<ParentComponent
  label="Заголовок"
  description="Описание"
  direction="vertical"
>
  <ChildComponent label="Значение 1" />
  <ChildComponent label="Значение 2" />
  <ChildComponent label="Значение 3" />
</ParentComponent>
```

### 4. Сложные вложенные структуры
```html
<div style="display: flex; flex-direction: column; gap: 2rem;">
  <OCheckboxGroup label="Размер MD" size="md">
    <OCheckbox label="Email уведомления" />
    <OCheckbox label="SMS уведомления" />
  </OCheckboxGroup>
  <OCheckboxGroup label="Размер SM" size="sm">
    <OCheckbox label="Email уведомления" size="sm" />
    <OCheckbox label="SMS уведомления" size="sm" />
  </OCheckboxGroup>
</div>
```

## Правила форматирования

1. **Отступы**: 2 пробела для каждого уровня вложенности
2. **Закрывающие теги**: на том же уровне отступа, что и открывающий тег
3. **Атрибуты**: каждый атрибут на новой строке с отступом
4. **Дочерние элементы**: отступ 2 пробела от родителя
5. **Длинные строки**: разбивать на несколько строк для читаемости

## Примеры правильного форматирования

### ✅ Хорошо
```html
<OCheckboxGroup
  label="Уведомления"
  size="md"
>
  <OCheckbox label="Уведомления по email" />
  <OCheckbox label="SMS уведомления" />
  <OCheckbox label="Push уведомления" />
  <OCheckbox label="Telegram уведомления" />
</OCheckboxGroup>
```

### ❌ Плохо
```html
<OCheckboxGroup label="Уведомления" size="md"><OCheckbox label="Уведомления по email" /><OCheckbox label="SMS уведомления" /><OCheckbox label="Push уведомления" /><OCheckbox label="Telegram уведомления" /></OCheckboxGroup>
```

## Применение

При создании новых stories всегда используйте многострочное форматирование для:
- Компонентов с дочерними элементами
- Компонентов с более чем 2 атрибутами
- Сложных вложенных структур
- Любого кода, который длиннее 80 символов
