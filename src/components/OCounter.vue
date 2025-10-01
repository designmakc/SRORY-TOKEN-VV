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
  name: 'OCounter',
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
  border-radius: var(--counter-border-radius);
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
  min-width: var(--counter-size-md-min-width);
  height: var(--counter-size-md-height);
  padding: var(--counter-padding-md-vertical) var(--counter-padding-md-horizontal);
}

.counter--sm {
  min-width: var(--counter-size-sm-min-width);
  height: var(--counter-size-sm-height);
  padding: var(--counter-padding-sm-vertical) var(--counter-padding-sm-horizontal);
}

.counter--xs {
  width: var(--counter-size-xs-width);
  height: var(--counter-size-xs-height);
  padding: var(--counter-padding-xs-vertical) var(--counter-padding-xs-horizontal);
}

/* Текст - ТОЧНО по Figma */
.counter-text {
  font-family: var(--typography-font-family-header);
  text-align: center;
  white-space: nowrap;
}

.counter-text--md {
  font-size: var(--typography-font-size-header-2xs);
  font-weight: var(--typography-font-weight-header-2xs);
  line-height: var(--typography-line-height-trim-2xs);
}

.counter-text--sm {
  font-family: var(--typography-font-family-secondary);
  font-size: var(--typography-font-size-body-2xs);
  font-weight: var(--typography-font-weight-bold);
  line-height: var(--typography-line-height-body-4xs);
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







