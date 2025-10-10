<template>
  <div 
    class="o-chips" 
    :class="chipClasses"
    @click="handleClick"
  >
    <!-- Левая иконка -->
    <OIconWrap
      v-if="hasLeftIcon"
      :sizeIcon="20"
      :icon="leftIcon"
      :iconColor="iconColor"
      class="o-chips__icon-left"
    />

    <!-- Текст -->
    <OTypography
      v-if="hasLabel"
      tag="span"
      variant="label-lg"
      class="o-chips__label"
      :style="{ color: textColor }"
    >
      {{ label }}
    </OTypography>

    <!-- Счетчик -->
    <OCounter
      v-if="hasCounter"
      :label="counterValue"
      :variant="counterVariant"
      size="md"
      class="o-chips__counter"
    />

    <!-- Иконка закрытия -->
    <div
      v-if="showCloseIcon"
      class="o-chips__icon-close"
      @click.stop="handleClose"
    >
      <OIconWrap
        :sizeIcon="20"
        icon="navigation-action/close-cress"
        :iconColor="iconColor"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import OIconWrap from './OIconWrap.vue';
import OTypography from './OTypography.vue';
import OCounter from './OCounter.vue';

const props = defineProps({
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'hover', 'press', 'selected', 'selectedHover', 'disabled'].includes(value)
  },
  label: {
    type: String,
    default: 'Название'
  },
  hasLabel: {
    type: Boolean,
    default: true
  },
  hasIconClose: {
    type: Boolean,
    default: false  
  },
  hasCounter: {
    type: Boolean,
    default: false
  },
  hasLeftIcon: {
    type: Boolean,
    default: false
  },
  leftIcon: {
    type: String,
    default: 'communication/18-plus'
  },
  counterValue: {
    type: Number,
    default: 2
  },
  counterVariant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'tertiary', 'inverse'].includes(value)
  },
  mode: {
    type: String,
    default: 'filter',
    validator: (value) => ['filter', 'input', 'choice'].includes(value)
  }
});

const emit = defineEmits(['click', 'close']);

// Вычисляемые классы
const chipClasses = computed(() => ({
  [`o-chips--${props.state}`]: props.state,
  'o-chips--disabled': props.state === 'disabled',
  'o-chips--selected': props.state === 'selected' || props.state === 'selectedHover'
}));

// Цвет текста в зависимости от состояния
const textColor = computed(() => {
  return props.state === 'disabled' 
    ? 'var(--color-text-tertiary)' 
    : 'var(--color-text-primary)';
});

// Цвет иконок в зависимости от состояния
const iconColor = computed(() => {
  return props.state === 'disabled' 
    ? 'var(--color-icon-tertiary)' 
    : 'var(--color-icon-primary)';
});

// Показывать ли иконку закрытия в зависимости от режима и состояния
const showCloseIcon = computed(() => {
  if (props.state === 'disabled') return false;
  if (props.mode === 'input') return true;
  return props.hasIconClose;
});

// Обработчик клика на chip
const handleClick = (event) => {
  if (props.state === 'disabled') return;
  emit('click', event);
};

// Обработчик клика на иконку закрытия
const handleClose = (event) => {
  if (props.state === 'disabled') return;
  emit('close', event);
};
</script>

<style scoped>
.o-chips {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--chips-gap);
  min-width: var(--chips-size-min-width);
  height: var(--chips-size-height);
  padding: var(--chips-padding-vertical) var(--chips-padding-horizontal);
  border-radius: var(--chips-border-radius);
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color var(--duration-150) ease;
  user-select: none;
}

/* Состояния фона */
.o-chips--default {
  background-color: var(--color-background-interactive-tertiary-default);
  border: var(--border-width-xs) solid transparent;
}

.o-chips--hover {
  background-color: var(--color-background-interactive-tertiary-hover);
  border: var(--border-width-xs) solid transparent;
}

.o-chips--press {
  background-color: var(--color-background-interactive-tertiary-press);
  border: var(--border-width-xs) solid transparent;
}

.o-chips--selected {
  background-color: var(--color-background-interactive-tertiary-selected);
  border: var(--border-width-xs) solid var(--color-border-interactive-focus);
}

.o-chips--selectedHover {
  background-color: var(--color-background-interactive-tertiary-selected);
  border: var(--border-width-xs) solid var(--color-border-interactive-focus);
  box-shadow: 0 0 0 4px var(--color-background-interactive-tertiary-selected);
}

.o-chips--disabled {
  background-color: var(--color-background-interactive-tertiary-default);
  border: var(--border-width-xs) solid transparent;
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* Интерактивные состояния (без state prop) */
.o-chips:not(.o-chips--disabled):not(.o-chips--hover):not(.o-chips--press):not(.o-chips--selected):not(.o-chips--selectedHover):hover {
  background-color: var(--color-background-interactive-tertiary-hover);
}

.o-chips:not(.o-chips--disabled):not(.o-chips--hover):not(.o-chips--press):not(.o-chips--selected):not(.o-chips--selectedHover):active {
  background-color: var(--color-background-interactive-tertiary-press);
}

/* Hover на selected состояние */
.o-chips--selected:not(.o-chips--disabled):hover {
  background-color: var(--color-background-interactive-tertiary-selected);
  border: var(--border-width-xs) solid var(--color-border-interactive-focus);
  box-shadow: 0 0 0 4px var(--color-background-interactive-tertiary-selected);
}

/* Элементы */
.o-chips__icon-left,
.o-chips__icon-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.o-chips__icon-close {
  cursor: pointer;
}

.o-chips--disabled .o-chips__icon-close {
  cursor: not-allowed;
}

.o-chips__label {
  flex-shrink: 0;
  white-space: nowrap;
}

.o-chips__counter {
  flex-shrink: 0;
}
</style>

