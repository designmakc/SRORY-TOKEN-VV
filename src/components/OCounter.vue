<template>
  <div :class="['counter', `counter--${variant}`, `counter--${size}`]">
    <div 
      v-if="size !== 'xs'"
      :class="['counter-text', `counter-text--${variant}`, `counter-text--${size}`]"
    >
      {{ displayLabel }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'

export default {
  name: 'VCounter',
  props: {
    label: {
      type: [String, Number],
      default: '2'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'tertiary', 'inverse'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['md', 'sm', 'xs'].includes(value)
    }
  },
  setup(props) {
    const displayLabel = computed(() => {
      const numValue = Number(props.label)
      if (isNaN(numValue)) return props.label
      return numValue > 99 ? '99+' : numValue.toString()
    })

    // Принудительная инжекция токенов при монтировании компонента
    onMounted(() => {
      console.log('🔄 VCounter: Принудительная инжекция токенов...')
      if (window.$injectTokens) {
        window.$injectTokens()
      }
    })

    return {
      displayLabel
    }
  }
}
</script>

<style scoped>
/* Базовые стили - ТОЧНО по Figma */
.counter {
  display: inline-flex; /* Hug содержимое */
  align-items: center;
  justify-content: center;
  border-radius: var(--counter-border-radius, 9999px);
  box-sizing: border-box;
}

/* Варианты */
.counter--primary {
  background-color: var(--color-background-feedback-primary);
}

.counter--secondary {
  background-color: var(--color-background-feedback-secondary);
}

.counter--tertiary {
  border: var(--border-width-xs, 1px) solid var(--color-border-primary);
  background-color: transparent;
}

.counter--inverse {
  background-color: var(--color-background-feedback-inverse-lvl-1);
}

/* Размеры - ТОЧНО по Figma */
.counter--md {
  min-width: var(--counter-size-md-min-width, 20px); /* Минимальная ширина */
  height: var(--counter-size-md-height, 20px); /* Фиксированная высота */
  padding: var(--counter-padding-md-vertical, 2px) var(--counter-padding-md-horizontal, 6px);
}

.counter--sm {
  min-width: var(--counter-size-sm-min-width, 16px); /* Минимальная ширина */
  height: var(--counter-size-sm-height, 16px); /* Фиксированная высота */
  padding: var(--counter-padding-sm-vertical, 1px) var(--counter-padding-sm-horizontal, 4px);
}

.counter--xs {
  width: var(--counter-size-xs-width, 6px); /* Фиксированная ширина для xs */
  height: var(--counter-size-xs-height, 6px); /* Фиксированная высота для xs */
  padding: 0; /* БЕЗ padding по Figma */
}

/* Текст - ТОЧНО по Figma */
.counter-text {
  font-family: var(--typography-font-family-header);
  text-align: center;
  white-space: nowrap;
  line-height: 1;
}

.counter-text--md {
  font-size: var(--typography-font-size-header-2xs, 12px);
  font-weight: var(--typography-font-weight-semibold, 600);
  letter-spacing: var(--typography-letter-spacing-header-2xs, 0.36px);
}

.counter-text--sm {
  font-family: var(--typography-font-family-secondary);
  font-size: var(--typography-font-size-body-2xs, 8px);
  font-weight: var(--typography-font-weight-bold, 700);
}

/* Цвета текста */
.counter-text--primary,
.counter-text--inverse {
  color: var(--color-text-inverse);
}

.counter-text--secondary,
.counter-text--tertiary {
  color: var(--color-text-primary);
}
</style>
