<template>
  <div 
    :class="[
      'o-checkbox',
      `o-checkbox--${variant}`,
      `o-checkbox--${size}`,
      `o-checkbox--${currentState}`,
      {
        'o-checkbox--checked': isChecked,
        'o-checkbox--disabled': isDisabled,
        'o-checkbox--error': hasError
      }
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="o-checkbox__box">
      <OIconWrap 
        v-if="isChecked"
        :sizeIcon="iconSize"
        :iconColor="iconColor"
        icon="navigation-action/success-check"
      />
    </div>
    <label v-if="hasLabel" class="o-checkbox__label">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import OIconWrap from './OIconWrap.vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v)
  },
  state: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'hover', 'press'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['md', 'sm'].includes(v)
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  hasLabel: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: 'Label checkbox'
  }
});

// Эмиты для родительского компонента
const emit = defineEmits(['update:isChecked', 'change']);

// Локальное состояние для интерактивности
const isHovered = ref(false);
const isPressed = ref(false);

// Текущее состояние (приоритет: pressed > hovered > props.state)
const currentState = computed(() => {
  if (isPressed.value) return 'press';
  if (isHovered.value) return 'hover';
  return props.state;
});

// Computed свойства для иконки
const iconSize = computed(() => {
  return props.size === 'md' ? 20 : 16;
});

const iconColor = computed(() => {
  return 'var(--color-text-on-interactive-primary)';
});

// Обработчики событий
const handleClick = (event) => {
  if (props.isDisabled) return;
  
  event.preventDefault();
  const newChecked = !props.isChecked;
  emit('update:isChecked', newChecked);
  emit('change', newChecked);
};

const handleMouseEnter = () => {
  if (props.isDisabled) return;
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
  isPressed.value = false;
};

const handleMouseDown = () => {
  if (props.isDisabled) return;
  isPressed.value = true;
};

const handleMouseUp = () => {
  isPressed.value = false;
};
</script>

<style scoped>
.o-checkbox {
  display: flex;
  align-items: center;
  gap: var(--gap-input-selection-label);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;
}

.o-checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: var(--checkbox-border-radius);
  transition: all 0.2s ease;
}

/* Размеры */
.o-checkbox--md .o-checkbox__box {
  width: var(--checkbox-size-md);
  height: var(--checkbox-size-md);
}

.o-checkbox--sm .o-checkbox__box {
  width: var(--checkbox-size-sm);
  height: var(--checkbox-size-sm);
}

/* UNCHECKED состояния - показываем border */
.o-checkbox:not(.o-checkbox--checked) .o-checkbox__box {
  background: transparent;
  border: var(--border-width-xs) solid;
}

/* Primary unchecked states */
.o-checkbox--primary:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-default);
}

.o-checkbox--primary.o-checkbox--hover:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-hover);
}

.o-checkbox--primary.o-checkbox--press:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-press);
}

/* Secondary unchecked states */
.o-checkbox--secondary:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-default);
}

.o-checkbox--secondary.o-checkbox--hover:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-hover);
}

.o-checkbox--secondary.o-checkbox--press:not(.o-checkbox--checked) .o-checkbox__box {
  border-color: var(--color-border-interactive-press);
}

/* CHECKED состояния - показываем background */
.o-checkbox--checked .o-checkbox__box {
  border: none;
}

/* Primary checked states */
.o-checkbox--primary.o-checkbox--checked .o-checkbox__box {
  background: var(--color-background-interactive-primary-default);
}

.o-checkbox--primary.o-checkbox--checked.o-checkbox--hover .o-checkbox__box {
  background: var(--color-background-interactive-primary-hover);
}

.o-checkbox--primary.o-checkbox--checked.o-checkbox--press .o-checkbox__box {
  background: var(--color-background-interactive-primary-press);
}

/* Secondary checked states */
.o-checkbox--secondary.o-checkbox--checked .o-checkbox__box {
  background: var(--color-background-interactive-secondary-default);
}

.o-checkbox--secondary.o-checkbox--checked.o-checkbox--hover .o-checkbox__box {
  background: var(--color-background-interactive-secondary-hover);
}

.o-checkbox--secondary.o-checkbox--checked.o-checkbox--press .o-checkbox__box {
  background: var(--color-background-interactive-secondary-press);
}

/* ERROR состояние */
.o-checkbox--error .o-checkbox__box {
  border-color: var(--color-border-interactive-error) !important;
}

.o-checkbox--error.o-checkbox--checked .o-checkbox__box {
  border: var(--border-width-xs) solid var(--color-border-interactive-error);
}

.o-checkbox--error .o-checkbox__label {
  color: var(--color-text-error);
}

/* DISABLED состояние */
.o-checkbox--disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

/* Label стили */
.o-checkbox__label {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-lg);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  user-select: none;
}

/* Hover эффекты для label */
.o-checkbox:not(.o-checkbox--disabled):hover .o-checkbox__label {
  cursor: pointer;
}
</style>
