<template>
  <label 
    :class="[
      'o-radio-button',
      `o-radio-button--${size}`,
      {
        'o-radio-button--disabled': isDisabled,
        'o-radio-button--error': hasError,
        'o-radio-button--checked': isChecked
      }
    ]"
    @click="handleClick"
  >
    <span 
      :class="[
        'o-radio-button__radio',
        {
          'o-radio-button__radio--checked': isChecked,
          'o-radio-button__radio--hover': isHovered && !isDisabled,
          'o-radio-button__radio--press': isPressed && !isDisabled
        }
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <span 
        v-if="isChecked" 
        class="o-radio-button__icon"
      />
    </span>
    
    <span v-if="hasLabel" class="o-radio-button__label">
      {{ label }}
    </span>
    
    
  </label>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Radio button'
  },
  hasLabel: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['md', 'sm'].includes(v)
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number],
    default: undefined
  }
});

const emit = defineEmits(['update:isChecked', 'change']);

const isHovered = ref(false);
const isPressed = ref(false);


const handleClick = () => {
  if (!props.isDisabled) {
    emit('update:isChecked', !props.isChecked);
    emit('change', props.value);
  }
};

const handleMouseEnter = () => {
  if (!props.isDisabled) {
    isHovered.value = true;
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

const handleMouseDown = () => {
  if (!props.isDisabled) {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  isPressed.value = false;
};
</script>

<style scoped>
.o-radio-button {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-input-selection-label);
  cursor: pointer;
  position: relative;
}


.o-radio-button--disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

/* Radio круг */
.o-radio-button__radio {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--color-border-interactive-default);
  transition: border-color 0.2s ease;
  flex-shrink: 0;
}

.o-radio-button--md .o-radio-button__radio {
  width: var(--radiobutton-size-md);
  height: var(--radiobutton-size-md);
}

.o-radio-button--sm .o-radio-button__radio {
  width: var(--radiobutton-size-sm);
  height: var(--radiobutton-size-sm);
}

/* Состояния border */
.o-radio-button__radio--checked {
  border-color: var(--color-border-interactive-default);
}

.o-radio-button__radio--checked.o-radio-button__radio--hover {
  border-color: var(--color-border-interactive-hover);
}

.o-radio-button__radio--checked.o-radio-button__radio--press {
  border-color: var(--color-border-interactive-press);
}

.o-radio-button--error .o-radio-button__radio {
  border-color: var(--color-border-interactive-error);
}

/* Внутренний круг (radioIcon) */
.o-radio-button__icon {
  border-radius: 50%;
  background-color: var(--color-background-interactive-primary-default);
  transition: background-color 0.2s ease;
}

.o-radio-button--md .o-radio-button__icon {
  width: var(--radiobutton-size-radio-icon-md);
  height: var(--radiobutton-size-radio-icon-md);
}

.o-radio-button--sm .o-radio-button__icon {
  width: var(--radiobutton-size-radio-icon-sm);
  height: var(--radiobutton-size-radio-icon-sm);
}

.o-radio-button__radio--hover .o-radio-button__icon {
  background-color: var(--color-background-interactive-primary-hover);
}

.o-radio-button__radio--press .o-radio-button__icon {
  background-color: var(--color-background-interactive-primary-press);
}

.o-radio-button--error .o-radio-button__icon {
  background-color: var(--color-icon-feedback-error);
}

/* Label */
.o-radio-button__label {
  font-family: var(--typography-font-family-secondary);
  font-size: var(--typography-font-size-body-lg);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-sm);
  color: var(--color-text-primary);
  user-select: none;
}

.o-radio-button--error .o-radio-button__label {
  color: var(--color-text-error);
}

/* Error message */
.o-radio-button__error-message {
  position: absolute;
  top: 100%;
  left: 0;
  font-family: var(--typography-font-family-secondary);
  font-size: var(--typography-font-size-body-lg);
  color: var(--color-text-error);
  margin-top: var(--gap-input-selection-label);
  display: none;
}

.o-radio-button--error .o-radio-button__error-message {
  display: block;
}


/* Hover states */
.o-radio-button:not(.o-radio-button--disabled):hover .o-radio-button__radio:not(.o-radio-button__radio--checked) {
  border-color: var(--color-border-interactive-hover);
}

.o-radio-button:not(.o-radio-button--disabled):active .o-radio-button__radio:not(.o-radio-button__radio--checked) {
  border-color: var(--color-border-interactive-press);
}
</style>
