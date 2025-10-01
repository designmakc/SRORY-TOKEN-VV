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

## 🔍 ФЛОУ РЕВЬЮ КОМПОНЕНТОВ

### 📋 Процесс ревью токенов компонента

Когда вы загружаете файл токенов компонента в папку `review-tokens/`, выполните следующие шаги:

#### 1️⃣ **Загрузка файла токенов**
```bash
# Поместите файл токенов в папку review-tokens/
# Например: review-tokens/checkbox_tokens.json
# Или: review-tokens/radiobutton_tokens.json
```

#### 2️⃣ **Запуск ревью токенов**
```bash
# Запустите команду для ревью токенов
npm run tokens:review -- --file review-tokens/checkbox_tokens.json
```

#### 3️⃣ **Проверка соответствия токенов**
Система автоматически проверит:
- ✅ Наличие всех токенов в системе
- ✅ Соответствие типов токенов
- ✅ Валидность значений
- ✅ Отсутствие хардкода

#### 4️⃣ **Анализ результатов**
После ревью вы получите отчет:
- 📊 **Статистика токенов** - сколько найдено/не найдено
- ✅ **Готовые токены** - которые можно использовать
- ❌ **Проблемные токены** - которые нужно добавить
- 💡 **Рекомендации** - что нужно исправить

#### 5️⃣ **Создание компонента**
После успешного ревью:
```bash
# Создайте компонент с найденными токенами
# Все токены будут автоматически проверены
```

### 🎯 **Примеры команд ревью**

```bash
# Ревью checkbox токенов
npm run tokens:review -- --file review-tokens/checkbox_tokens.json

# Ревью radiobutton токенов  
npm run tokens:review -- --file review-tokens/radiobutton_tokens.json

# Ревью всех файлов в папке
npm run tokens:review -- --folder review-tokens/
```

### 🔍 **АУДИТ СУЩЕСТВУЮЩИХ КОМПОНЕНТОВ**

Для проверки уже созданных компонентов на соответствие токенам:

```bash
# Аудит компонента на соответствие токенам
npm run tokens:audit -- src/components/OCheckbox.vue review-tokens/checkbox_tokens.json

# Аудит с именованными параметрами
npm run tokens:audit -- --component src/components/OCheckbox.vue --tokens review-tokens/checkbox_tokens.json
```

**Что проверяет аудит:**
- ✅ Используются ли правильные токены из файла
- ❌ Есть ли неверные токены (не из файла)
- ⚠️ Отсутствуют ли ожидаемые токены
- 🚨 Есть ли хардкод значения
- 📊 Процент соответствия токенам

### 📋 **Чек-лист ревью**

- [ ] Файл токенов загружен в `review-tokens/`
- [ ] Запущена команда `npm run tokens:review`
- [ ] Проверены все найденные токены
- [ ] Исправлены проблемные токены
- [ ] Валидация прошла успешно
- [ ] Компонент готов к созданию

### 🚨 **Критические требования**

1. **ВСЕ токены должны быть найдены** в системе
2. **НЕ должно быть хардкода** - только токены
3. **Валидация должна пройти** без ошибок
4. **Все типы токенов** должны соответствовать

### 💡 **Рекомендации**

- Проверяйте токены **ДО** создания компонента
- Исправляйте проблемы **СРАЗУ** после ревью
- Используйте **только найденные** токены
- **НЕ придумывайте** новые токены

## 📊 Статистика

- **Всего токенов:** 281
- **Категорий:** 9
- **Последнее обновление:** Автоматически при изменении токенов
- **Размер документации:** ~45 KB

---

*Документация сгенерирована автоматически системой Design Tokens*
