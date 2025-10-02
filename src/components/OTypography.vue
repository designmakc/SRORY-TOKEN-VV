<template>
  <component 
    :is="computedTag" 
    :class="['o-typography', `o-typography--${variant}`]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useDesignTokens } from '@/composables/useDesignTokens';

const props = defineProps({
  /**
   * Вариант типографики из Figma
   * Заголовки:
   * - adaptive-h1, adaptive-h2, adaptive-h3, adaptive-h4, adaptive-h5
   * - header-6xl, header-5xl, header-4xl, header-3xl, header-2xl, header-xl, header-lg, header-md, header-sm, header-xs, header-2xs, header-3xs
   * - trim-4xl, trim-3xl, trim-2xl, trim-xl, trim-lg, trim-md, trim-sm, trim-xs, trim-2xs, trim-3xs
   * Текст:
   * - body-lg, body-lg-medium, body-md, body-sm, body-xs, body-2xs, body-2xs-bold
   * - label-lg, label-md, label-sm, label-xs
   */
  variant: {
    type: String,
    required: true,
    validator: (v) => [
      // Adaptive
      'adaptive-h1', 'adaptive-h2', 'adaptive-h3', 'adaptive-h4', 'adaptive-h5',
      // Header
      'header-6xl', 'header-5xl', 'header-4xl', 'header-3xl', 'header-2xl',
      'header-xl', 'header-lg', 'header-md', 'header-sm', 'header-xs', 'header-2xs', 'header-3xs',
      // Trim
      'trim-4xl', 'trim-3xl', 'trim-2xl', 'trim-xl', 'trim-lg', 'trim-md', 'trim-sm', 'trim-xs', 'trim-2xs', 'trim-3xs',
      // Body
      'body-lg', 'body-lg-medium', 'body-md', 'body-sm', 'body-xs', 'body-2xs', 'body-2xs-bold',
      // Label
      'label-lg', 'label-md', 'label-sm', 'label-xs'
    ].includes(v)
  },
  
  /**
   * HTML тег для рендеринга
   * Если не указан - определяется автоматически
   */
  tag: {
    type: String,
    default: null,
    validator: (v) => !v || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'].includes(v)
  }
});

// Инициализация токенов дизайна
useDesignTokens();

// Автоматическое определение тега
const computedTag = computed(() => {
  if (props.tag) return props.tag;
  
  // Adaptive -> соответствующий HTML тег
  if (props.variant.startsWith('adaptive-')) {
    return props.variant.replace('adaptive-', '');
  }
  
  // Body -> p
  if (props.variant.startsWith('body-')) {
    return 'p';
  }
  
  // Label -> span
  if (props.variant.startsWith('label-')) {
    return 'span';
  }
  
  // По умолчанию div
  return 'div';
});
</script>

<style scoped>
.o-typography {
  margin: 0;
  padding: 0;
}

/* ==================== ADAPTIVE HEADINGS ==================== */
/* Adaptive H1: font-family, font-size, font-weight, line-height */
.o-typography--adaptive-h1 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h1);
  font-weight: var(--typography-font-weight-h1);
  line-height: var(--typography-line-height-h1);
}

/* Adaptive H2: font-family, font-size, font-weight, line-height */
.o-typography--adaptive-h2 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h2);
  font-weight: var(--typography-font-weight-h2);
  line-height: var(--typography-line-height-h2);
}

/* Adaptive H3: font-family, font-size, font-weight, line-height */
.o-typography--adaptive-h3 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h3);
  font-weight: var(--typography-font-weight-h3);
  line-height: var(--typography-line-height-h3);
}

/* Adaptive H4: font-family, font-size, font-weight, line-height */
.o-typography--adaptive-h4 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h4);
  font-weight: var(--typography-font-weight-h4);
  line-height: var(--typography-line-height-h4);
}

/* Adaptive H5: font-family, font-size, font-weight, line-height */
.o-typography--adaptive-h5 {
  font-family: var(--typography-font-family);
  font-size: var(--typography-font-size-h5);
  font-weight: var(--typography-font-weight-h5);
  line-height: var(--typography-line-height-h5);
}

/* ==================== HEADER SCALE ==================== */
/* Header 6XL: font-family, font-size, font-weight, line-height */
.o-typography--header-6xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-6xl);
  font-weight: var(--typography-font-weight-header-6xl);
  line-height: var(--typography-line-height-header-6xl);
}

/* Header 5XL: font-family, font-size, font-weight, line-height */
.o-typography--header-5xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-5xl);
  font-weight: var(--typography-font-weight-header-5xl);
  line-height: var(--typography-line-height-header-5xl);
}

/* Header 4XL: font-family, font-size, font-weight, line-height */
.o-typography--header-4xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-4xl);
  font-weight: var(--typography-font-weight-header-4xl);
  line-height: var(--typography-line-height-header-4xl);
}

/* Header 3XL: font-family, font-size, font-weight, line-height */
.o-typography--header-3xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-3xl);
  font-weight: var(--typography-font-weight-header-3xl);
  line-height: var(--typography-line-height-header-3xl);
}

/* Header 2XL: font-family, font-size, font-weight, line-height */
.o-typography--header-2xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-2xl);
  font-weight: var(--typography-font-weight-header-2xl);
  line-height: var(--typography-line-height-header-2xl);
}

/* Header XL: font-family, font-size, font-weight, line-height */
.o-typography--header-xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-xl);
  font-weight: var(--typography-font-weight-header-xl);
  line-height: var(--typography-line-height-header-xl);
}

/* Header LG: font-family, font-size, font-weight, line-height */
.o-typography--header-lg {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-lg);
  font-weight: var(--typography-font-weight-header-lg);
  line-height: var(--typography-line-height-header-lg);
}

/* Header MD: font-family, font-size, font-weight, line-height */
.o-typography--header-md {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-md);
  font-weight: var(--typography-font-weight-header-md);
  line-height: var(--typography-line-height-header-md);
}

/* Header SM: font-family, font-size, font-weight, line-height */
.o-typography--header-sm {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-sm);
  font-weight: var(--typography-font-weight-header-sm);
  line-height: var(--typography-line-height-header-sm);
}

/* Header XS: font-family, font-size, font-weight, line-height */
.o-typography--header-xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-xs);
  font-weight: var(--typography-font-weight-header-xs);
  line-height: var(--typography-line-height-header-xs);
}

/* Header 2XS: font-family, font-size, font-weight, line-height */
.o-typography--header-2xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-2xs);
  font-weight: var(--typography-font-weight-header-2xs);
  line-height: var(--typography-line-height-header-2xs);
}

/* Header 3XS: font-family, font-size, font-weight, line-height */
.o-typography--header-3xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-3xs);
  font-weight: var(--typography-font-weight-header-3xs);
  line-height: var(--typography-line-height-header-3xs);
}

/* ==================== TRIM SCALE ==================== */
/* Trim 4XL: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-4xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-4xl);
  font-weight: var(--typography-font-weight-header-4xl);
  line-height: var(--typography-line-height-trim-4xl);
}

/* Trim 3XL: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-3xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-3xl);
  font-weight: var(--typography-font-weight-header-3xl);
  line-height: var(--typography-line-height-trim-3xl);
}

/* Trim 2XL: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-2xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-2xl);
  font-weight: var(--typography-font-weight-header-2xl);
  line-height: var(--typography-line-height-trim-2xl);
}

/* Trim XL: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-xl {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-xl);
  font-weight: var(--typography-font-weight-header-xl);
  line-height: var(--typography-line-height-trim-xl);
}

/* Trim LG: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-lg {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-lg);
  font-weight: var(--typography-font-weight-header-lg);
  line-height: var(--typography-line-height-trim-lg);
}

/* Trim MD: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-md {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-md);
  font-weight: var(--typography-font-weight-header-md);
  line-height: var(--typography-line-height-trim-md);
}

/* Trim SM: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-sm {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-sm);
  font-weight: var(--typography-font-weight-header-sm);
  line-height: var(--typography-line-height-trim-sm);
}

/* Trim XS: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-xs);
  font-weight: var(--typography-font-weight-header-xs);
  line-height: var(--typography-line-height-trim-xs);
}

/* Trim 2XS: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-2xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-2xs);
  font-weight: var(--typography-font-weight-header-2xs);
  line-height: var(--typography-line-height-trim-2xs);
}

/* Trim 3XS: font-family, font-size, font-weight, line-height (compact) */
.o-typography--trim-3xs {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-3xs);
  font-weight: var(--typography-font-weight-header-3xs);
  line-height: var(--typography-line-height-trim-3xs);
}

/* ==================== BODY TEXT ==================== */
/* Body LG: font-family, font-size, font-weight (regular), line-height */
.o-typography--body-lg {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-lg);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-lg);
}

/* Body LG Medium: font-family, font-size, font-weight (medium), line-height */
.o-typography--body-lg-medium {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-lg);
  font-weight: var(--typography-font-weight-medium);
  line-height: var(--typography-line-height-body-lg);
}

/* Body MD: font-family, font-size, font-weight (regular), line-height */
.o-typography--body-md {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-md);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-md);
}

/* Body SM: font-family, font-size, font-weight (regular), line-height */
.o-typography--body-sm {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-sm);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-sm);
}

/* Body XS: font-family, font-size, font-weight (regular), line-height */
.o-typography--body-xs {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-xs);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-xs);
}

/* Body 2XS: font-family, font-size, font-weight (regular), line-height */
.o-typography--body-2xs {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-2xs);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-4xs);
}

/* Body 2XS Bold: font-family, font-size, font-weight (bold), line-height */
.o-typography--body-2xs-bold {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-2xs);
  font-weight: var(--typography-font-weight-bold);
  line-height: var(--typography-line-height-body-4xs);
}

/* ==================== LABELS ==================== */
/* Label LG: font-family, font-size, font-weight (regular), line-height (compact) */
.o-typography--label-lg {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-lg);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-sm);
}

/* Label MD: font-family, font-size, font-weight (regular), line-height (compact) */
.o-typography--label-md {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-md);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-2xs);
}

/* Label SM: font-family, font-size, font-weight (regular), line-height (compact) */
.o-typography--label-sm {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-sm);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-trim-xs);
}

/* Label XS: font-family, font-size, font-weight (regular), line-height (compact) */
.o-typography--label-xs {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-body-xs);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-body-3xs);
}
</style>