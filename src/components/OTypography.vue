<template>
  <component 
    :is="tag" 
    :class="['o-typography', `o-typography--${variant}`]"
  >
    <slot />
  </component>
</template>

<script setup>
import { useDesignTokens } from '@/composables/useDesignTokens';

const props = defineProps({
  variant: {
    type: String,
    default: 'h1',
    validator: (v) => ['h1', 'h2', 'h3', 'h4', 'h5'].includes(v)
  },
  tag: {
    type: String,
    default: 'h1'
  }
});

// Инициализация токенов дизайна
useDesignTokens();
</script>

<style scoped>
.o-typography {
  margin: 0;
  padding: 0;
  height: fit-content; /* Hug - подстраивается под содержимое */
}



.o-typography--h1 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h1);
  font-weight: var(--typography-font-weight-h1);
  line-height: var(--typography-line-height-h1);
  color: var(--color-text-primary);
}

.o-typography--h2 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h2);
  font-weight: var(--typography-font-weight-h2);
  line-height: var(--typography-line-height-h2);
  color: var(--color-text-primary);
}

.o-typography--h3 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h3);
  font-weight: var(--typography-font-weight-h3);
  line-height: var(--typography-line-height-h3);
  color: var(--color-text-primary);
}

.o-typography--h4 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h4);
  font-weight: var(--typography-font-weight-h4);
  line-height: var(--typography-line-height-h4);
  color: var(--color-text-primary);
}

.o-typography--h5 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h5);
  font-weight: var(--typography-font-weight-h5);
  line-height: var(--typography-line-height-h5);
  color: var(--color-text-primary);
}
</style>
