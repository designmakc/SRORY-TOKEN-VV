<template>
    <button
      ref="buttonRef"
      :class="[
        'o-button',
        `o-button--${variant}`,
        `o-button--${size}`,
        `o-button--${currentState}`,
        {
          'o-button--icon-only': isIconOnly,
          'o-button--loading': isLoading,
          'o-button--disabled': isDisabled,
          'o-button--rounded': isRounded
        }
      ]"
      :style="buttonStyles"
      :disabled="isDisabled || isLoading"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="o-button__loading-overlay">
        <OIconWrap
          :sizeIcon="iconSize"
          :iconColor="iconColor"
          icon="communication/loader"
          class="o-button__icon o-button__icon--loading"
        />
      </div>
  
      <!-- Content Wrapper -->
      <div 
        class="o-button__content" 
        :class="{ 'o-button__content--hidden': isLoading }"
      >
        <!-- Left Icon (показывается если hasLeftIcon=true или isIconOnly=true) -->
        <OIconWrap
          v-if="showLeftIcon"
          :sizeIcon="iconSize"
          :iconColor="iconColor"
          :icon="leftIcon"
          class="o-button__icon o-button__icon--left"
        />
  
        <!-- Label (скрывается если isIconOnly=true) -->
        <div v-if="!isIconOnly && label" class="o-button__text-container">
          <OTypography
            :variant="labelVariant"
            class="o-button__label"
          >
            {{ label }}
          </OTypography>
        </div>
  
        <!-- Right Icon -->
        <OIconWrap
          v-if="hasRightIcon && rightIcon"
          :sizeIcon="iconSize"
          :iconColor="iconColor"
          :icon="rightIcon"
          class="o-button__icon o-button__icon--right"
        />
      </div>
    </button>

    <!-- Counter (только для secondary xs и sm) -->
    <OCounter
      v-if="showCounter"
      :label="counter"
      class="o-button__counter"
    />
  </template>
  
  <script setup>
  import { computed, ref, watch, nextTick } from 'vue';
  import OIconWrap from './OIconWrap.vue';
  import OTypography from './OTypography.vue';
  import OCounter from './OCounter.vue';
  
  const props = defineProps({
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'tertiary', 'accent-primary', 'outline', 'accent-secondary'].includes(v)
    },
    state: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'hover', 'press'].includes(v)
    },
    isIconOnly: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Сделать действие'
    },
    hasLeftIcon: {
      type: Boolean,
      default: false
    },
    hasRightIcon: {
      type: Boolean,
      default: false
    },
    hasCounter: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: String,
      default: 'navigation-action/plus'
    },
    rightIcon: {
      type: String,
      default: 'arrows/arrow-right'
    },
    counter: {
      type: [String, Number],
      default: '2'
    }
  });
  
  const emit = defineEmits(['click']);
  
  const buttonRef = ref(null);
  const savedWidth = ref(null);
  const isHovered = ref(false);
  const isPressed = ref(false);
  
  // Сохраняем ширину кнопки перед loading
  watch(() => props.isLoading, (newVal) => {
    if (newVal && buttonRef.value) {
      savedWidth.value = buttonRef.value.offsetWidth + 'px';
    } else {
      nextTick(() => {
        savedWidth.value = null;
      });
    }
  });
  
  const currentState = computed(() => {
    if (isPressed.value) return 'press';
    if (isHovered.value) return 'hover';
    return props.state;
  });
  
  // Показывать левую иконку если:
  // 1. isIconOnly=true (кнопка только с иконкой)
  // 2. hasLeftIcon=true И leftIcon указан
  const showLeftIcon = computed(() => {
    if (props.isIconOnly && props.leftIcon) return true;
    return props.hasLeftIcon && props.leftIcon;
  });
  
  // Counter показывается только для secondary с размерами xs и sm
  const showCounter = computed(() => {
    return props.hasCounter && 
           props.counter && 
           props.variant === 'secondary' && 
           (props.size === 'xs' || props.size === 'sm');
  });
  
  // Размер иконки: lg=24, md=24, sm=16, xs=16
  const iconSize = computed(() => {
    const sizeMap = {
      xs: 16,
      sm: 16,
      md: 24,
      lg: 24
    };
    return sizeMap[props.size] || 24;
  });
  
  const iconColor = computed(() => {
    if (props.variant === 'primary') {
      return 'var(--color-icon-on-interactive-primary)';
    }
    if (props.variant === 'tertiary') {
      return 'var(--color-icon-on-interactive-tertiary)';
    }
    return 'var(--color-icon-on-interactive-secondary)';
  });
  
  const labelVariant = computed(() => {
    const sizeMap = {
      xs: 'header-2xs',
      sm: 'header-2xs', 
      md: 'header-sm',
      lg: 'header-sm'
    };
    return sizeMap[props.size] || 'header-sm';
  });
  
  // Стили для кнопки с сохранением ширины при loading
  const buttonStyles = computed(() => {
    if (props.isLoading && savedWidth.value) {
      return {
        width: savedWidth.value
      };
    }
    return {};
  });
  
  const handleClick = (event) => {
    if (props.isDisabled || props.isLoading) return;
    emit('click', event);
  };
  
  const handleMouseEnter = () => {
    if (props.isDisabled || props.isLoading) return;
    isHovered.value = true;
  };
  
  const handleMouseLeave = () => {
    isHovered.value = false;
    isPressed.value = false;
  };
  
  const handleMouseDown = () => {
    if (props.isDisabled || props.isLoading) return;
    isPressed.value = true;
  };
  
  const handleMouseUp = () => {
    isPressed.value = false;
  };
  </script>
  
  <style scoped>
  .o-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    outline: none;
    position: relative;
    overflow: hidden;
  }
  
  /* Размеры кнопки */
  .o-button--xs {
    height: var(--button-size-height-xs);
    min-width: var(--button-size-min-width-xs);
    padding: var(--button-padding-vertical-xs) var(--button-padding-horizontal-xs);
    border-radius: var(--button-border-radius-xs);
  }
  
  .o-button--sm {
    height: var(--button-size-height-sm);
    min-width: var(--button-size-min-width-sm);
    padding: var(--button-padding-vertical-sm) var(--button-padding-horizontal-sm);
    border-radius: var(--button-border-radius-sm);
  }
  
  .o-button--md {
    height: var(--button-size-height-md);
    min-width: var(--button-size-min-width-md);
    padding: var(--button-padding-vertical-md) var(--button-padding-horizontal-md);
    border-radius: var(--button-border-radius-md);
  }
  
  .o-button--lg {
    height: var(--button-size-height-lg);
    min-width: var(--button-size-min-width-lg);
    padding: var(--button-padding-vertical-lg) var(--button-padding-horizontal-lg);
    border-radius: var(--button-border-radius-lg);
  }
  
  /* Icon-only кнопки */
  .o-button--icon-only.o-button--xs {
    padding: var(--button-padding-icon-only-xs);
  }
  
  .o-button--icon-only.o-button--sm {
    padding: var(--button-padding-icon-only-sm);
  }
  
  .o-button--icon-only.o-button--md {
    padding: var(--button-padding-icon-only-md);
  }
  
  .o-button--icon-only.o-button--lg {
    padding: var(--button-padding-icon-only-lg);
  }
  
  /* Rounded кнопки */
  .o-button--rounded {
    border-radius: var(--border-radius-full);
  }
  
  /* Content Wrapper */
  .o-button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-gap-icon-label);
    transition: opacity 0.2s ease;
  }
  
  .o-button__content--hidden {
    opacity: 0;
    pointer-events: none;
  }
  
  /* Loading Overlay */
  .o-button__loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  
  /* Primary variant */
  .o-button--primary {
    background: var(--color-background-button-primary-default);
    color: var(--color-text-on-interactive-primary);
  }
  
  .o-button--primary.o-button--hover {
    background: var(--color-background-button-primary-hover);
  }
  
  .o-button--primary.o-button--press {
    background: var(--color-background-button-primary-press);
  }
  
  .o-button--primary.o-button--loading {
    background: var(--color-background-button-primary-loader);
  }
  
  /* Secondary variant */
  .o-button--secondary {
    background: var(--color-background-button-secondary-default);
    color: var(--color-text-on-interactive-secondary);
  }
  
  .o-button--secondary.o-button--hover {
    background: var(--color-background-button-secondary-hover);
  }
  
  .o-button--secondary.o-button--press {
    background: var(--color-background-button-secondary-press);
  }
  
  .o-button--secondary.o-button--loading {
    background: var(--color-background-button-secondary-loader);
  }
  
  /* Tertiary variant */
  .o-button--tertiary {
    background: var(--color-background-button-tertiary-default);
    color: var(--color-text-on-interactive-secondary);
  }
  
  .o-button--tertiary.o-button--hover {
    background: var(--color-background-button-tertiary-hover);
  }
  
  .o-button--tertiary.o-button--press {
    background: var(--color-background-button-tertiary-press);
  }
  
  .o-button--tertiary.o-button--loading {
    background: var(--color-background-button-tertiary-loader);
  }
  
  /* Accent Primary variant */
  .o-button--accent-primary {
    background: var(--color-background-button-accent-primary-default);
    color: var(--color-text-on-interactive-secondary);
  }
  
  .o-button--accent-primary.o-button--hover {
    background: var(--color-background-button-accent-primary-hover);
  }
  
  .o-button--accent-primary.o-button--press {
    background: var(--color-background-button-accent-primary-press);
  }
  
  .o-button--accent-primary.o-button--loading {
    background: var(--color-background-button-accent-primary-loader);
  }
  
  /* Accent Secondary variant */
  .o-button--accent-secondary {
    background: var(--color-background-button-accent-secondary-default);
    color: var(--color-text-on-interactive-secondary);
  }
  
  .o-button--accent-secondary.o-button--hover {
    background: var(--color-background-button-accent-secondary-hover);
  }
  
  .o-button--accent-secondary.o-button--press {
    background: var(--color-background-button-accent-secondary-press);
  }
  
  .o-button--accent-secondary.o-button--loading {
    background: var(--color-background-button-accent-secondary-loader);
  }
  
  /* Outline variant */
  .o-button--outline {
    background: var(--color-background-button-outline-default);
    color: var(--color-text-on-interactive-secondary);
    border: var(--border-width-xs) solid var(--color-border-button-outline);
  }
  
  .o-button--outline.o-button--hover {
    background: var(--color-background-button-outline-hover);
  }
  
  .o-button--outline.o-button--press {
    background: var(--color-background-button-outline-press);
  }
  
  .o-button--outline.o-button--loading {
    background: var(--color-background-button-outline-loader);
  }
  
  /* Disabled состояние */
  .o-button--disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* Loading состояние */
  .o-button--loading {
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* Иконки */
  .o-button__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .o-button__icon--loading {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
/* Text Container */
.o-button__text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

/* Text Container padding для разных размеров */
.o-button--xs .o-button__text-container {
  padding: 0 var(--button-text-container-padding-horizontal-xs);
}

.o-button--sm .o-button__text-container {
  padding: 0 var(--button-text-container-padding-horizontal-sm);
}

.o-button--md .o-button__text-container {
  padding: 0 var(--button-text-container-padding-horizontal-md);
}

.o-button--lg .o-button__text-container {
  padding: 0 var(--button-text-container-padding-horizontal-lg);
}

/* Label */
.o-button__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
}
  
  /* Counter */
  .o-button__counter {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 2; /* Убедимся, что счетчик поверх кнопки */
    flex-shrink: 0;
  }
  
  /* Hover эффекты */
  .o-button:not(.o-button--disabled):not(.o-button--loading):hover {
    cursor: pointer;
  }
  
  /* Focus стили */
  .o-button:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }
  </style>