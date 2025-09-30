# 📚 Документация Design Tokens

> Автоматически генерируемая документация для системы дизайн-токенов

## 📁 Структура документации

- **[AVAILABLE_TOKENS.md](./AVAILABLE_TOKENS.md)** - Полный список всех доступных токенов
- **[README.md](./README.md)** - Этот файл с инструкциями

## 🚀 Быстрый старт

### 1. Генерация документации
```bash
npm run tokens:generate-docs
```

### 2. Поиск токенов
```bash
# ✅ ПРАВИЛЬНО - по исходным именам из JSON (с слешами)
npm run tokens:info -- --search "radiobutton"
npm run tokens:info -- --search "color/text"
npm run tokens:info -- --search "spacing/space"

# ❌ НЕПРАВИЛЬНО - по CSS переменным (с дефисами)
npm run tokens:info -- --search "radiobutton-size-radio-icon-md"
npm run tokens:info -- --search "color-text-primary"
```

### 3. Валидация токенов
```bash
npm run tokens:validate
```

## 📋 Доступные команды

| Команда | Описание |
|---------|----------|
| `npm run tokens:generate-docs` | Генерирует документацию токенов |
| `npm run tokens:info [term]` | Поиск токенов по термину |
| `npm run tokens:validate` | Валидация структуры токенов |
| `npm run tokens:generate-types` | Генерация TypeScript типов |

## 🎨 Категории токенов

### 🎨 Цвета (84 токена)
- Фоновые цвета
- Цвета текста
- Цвета границ
- Цвета иконок

### 📏 Отступы и промежутки (31 токен)
- Padding (внутренние отступы)
- Gap (промежутки между элементами)

### 📐 Размеры (23 токена)
- Размеры иконок
- Размеры полей ввода
- Основные размеры

### ✍️ Типографика (60 токенов)
- Размеры шрифтов
- Толщина шрифтов
- Высота строк
- Межбуквенные расстояния

### 🔲 Границы (13 токенов)
- Радиусы границ
- Толщина границ
- Цвета границ

### 🔘 Кнопки (25 токенов)
- Цвета кнопок
- Размеры кнопок
- Padding кнопок
- Border radius кнопок

## 💡 Примеры использования

### В Vue компонентах
```vue
<template>
  <button class="my-button">
    Кнопка
  </button>
</template>

<style scoped>
.my-button {
  background-color: var(--color-background-button-primary-default);
  color: var(--color-text-on-interactive-primary);
  padding: var(--padding-md);
  border-radius: var(--border-radius-md);
  font-size: var(--typography-font-size-header-sm);
}
</style>
```

### В JavaScript
```javascript
import { useDesignTokens } from '@/composables/useDesignTokens';

export default {
  setup() {
    const { getToken } = useDesignTokens();
    
    const primaryColor = getToken('color/background/button/primary/default');
    const textColor = getToken('color/text/primary');
    
    return { primaryColor, textColor };
  }
}
```

## 🔄 Автоматическое обновление

Документация обновляется автоматически при изменении `Basic-variables-full.json`:

1. Обновите файл `src/utils/Basic-variables-full.json`
2. Запустите `npm run tokens:generate-docs`
3. Документация будет обновлена автоматически

## 📝 Правила использования

1. **ВСЕГДА** проверяйте `docs/AVAILABLE_TOKENS.md` перед созданием компонента
2. **Используйте** `npm run tokens:info -- --search` для поиска токенов
3. **НЕ придумывайте** токены - только из документации
4. **Используйте** семантические токены: `getToken('color/button/primary/bg')`
5. **НЕ используйте** хардкод: НЕТ `#3b82f6`, НЕТ `16px`
6. **Только** CSS переменные: `var(--token-name)`

### 🔍 Правила поиска токенов

#### ✅ ПРАВИЛЬНО - поиск по исходным именам (JSON)
```bash
# Поиск по категории
npm run tokens:info -- --search "color"
npm run tokens:info -- --search "button"
npm run tokens:info -- --search "radiobutton"

# Поиск по подкатегории
npm run tokens:info -- --search "color/text"
npm run tokens:info -- --search "spacing/space"
npm run tokens:info -- --search "radiobutton/size"
```

#### ❌ НЕПРАВИЛЬНО - поиск по CSS переменным
```bash
# Эти команды НЕ РАБОТАЮТ!
npm run tokens:info -- --search "color-text-primary"
npm run tokens:info -- --search "radiobutton-size-radio-icon-md"
npm run tokens:info -- --search "spacing-space-8"
```

#### 🔄 Преобразование имен
- **JSON**: `radiobutton/size/radioIcon/md` → **CSS**: `--radiobutton-size-radio-icon-md`
- **Поиск**: используй JSON формат с слешами
- **В компонентах**: используй CSS формат с дефисами

## 🎯 Лучшие практики

### ✅ Правильно
```css
.button {
  background-color: var(--color-background-button-primary-default);
  color: var(--color-text-on-interactive-primary);
  padding: var(--padding-md);
  border-radius: var(--border-radius-md);
}
```

### ❌ Неправильно
```css
.button {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 16px;
  border-radius: 8px;
}
```

## 🔍 Поиск и фильтрация

### ⚠️ ВАЖНО: Правильный способ поиска токенов

**`tokenInfo.js` ищет по исходным именам из JSON, НЕ по CSS переменным!**

#### ✅ ПРАВИЛЬНО - по исходным именам (с слешами)
```bash
# Поиск по категории
npm run tokens:info -- --search "color"
npm run tokens:info -- --search "button"
npm run tokens:info -- --search "typography"

# Поиск по подкатегории
npm run tokens:info -- --search "color/text"
npm run tokens:info -- --search "spacing/space"
npm run tokens:info -- --search "radiobutton/size"

# Поиск по состоянию
npm run tokens:info -- --search "hover"
npm run tokens:info -- --search "active"
npm run tokens:info -- --search "disabled"

# Поиск по размеру
npm run tokens:info -- --search "sm"
npm run tokens:info -- --search "md"
npm run tokens:info -- --search "lg"
```

#### ❌ НЕПРАВИЛЬНО - по CSS переменным (с дефисами)
```bash
# Эти команды НЕ РАБОТАЮТ!
npm run tokens:info -- --search "color-text-primary"
npm run tokens:info -- --search "radiobutton-size-radio-icon-md"
npm run tokens:info -- --search "spacing-space-8"
```

### 🔄 Преобразование имен

| JSON (исходное) | CSS переменная | Поиск |
|----------------|----------------|-------|
| `radiobutton/size/radioIcon/md` | `--radiobutton-size-radio-icon-md` | ✅ `radiobutton/size/radioIcon` |
| `color/text/primary` | `--color-text-primary` | ✅ `color/text/primary` |
| `spacing/space/8` | `--spacing-space-8` | ✅ `spacing/space/8` |

### 📋 Примеры правильного поиска

```bash
# Найти все токены radiobutton
npm run tokens:info -- --search "radiobutton"

# Найти токены размеров
npm run tokens:info -- --search "size"

# Найти токены цветов текста
npm run tokens:info -- --search "color/text"

# Найти токены отступов
npm run tokens:info -- --search "spacing"

# Найти токены типографики
npm run tokens:info -- --search "typography"
```

## 📊 Статистика

- **Всего токенов:** 281
- **Категорий:** 9
- **Последнее обновление:** Автоматически при изменении токенов
- **Размер документации:** ~45 KB

---

*Документация сгенерирована автоматически системой Design Tokens*
