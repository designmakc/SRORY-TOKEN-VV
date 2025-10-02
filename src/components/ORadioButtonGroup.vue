<template>
  <div :class="['o-radio-button-group', `o-radio-button-group--${size}`]">
    <!-- Заголовок группы -->
    <div v-if="label" class="o-radio-button-group__label">
      {{ label }}
    </div>
    
    <!-- Слот для радиокнопок -->
    <div class="o-radio-button-group__items">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Внешний вид
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value)
  },
  
  // Заголовок группы
  label: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.o-radio-button-group {
  display: flex;
  flex-direction: column;
}

.o-radio-button-group--md {
  gap: var(--gap-input-selection-md-group-header);
}

.o-radio-button-group--sm {
  gap: var(--gap-input-selection-sm-group-header);
}

/* === ЗАГОЛОВОК ГРУППЫ === */
.o-radio-button-group__label {
  font-family: var(--typography-font-family-header);
  font-size: var(--typography-font-size-header-sm);
  font-weight: var(--typography-font-weight-header-sm);
  line-height: var(--typography-line-height-header-sm);
  color: var(--color-text-primary);
}

/* === СПИСОК ЭЛЕМЕНТОВ === */
.o-radio-button-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--gap-input-selection-group-item);
}

/* === ЭЛЕМЕНТ РАДИОКНОПКИ === */
.o-radio-button-group__item {
  width: 100%;
}
</style>
