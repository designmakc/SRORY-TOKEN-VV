<template>
  <div class="icon-wrap" :style="wrapperStyles">
    <!-- Контейнер для иконки -->
    <div 
      class="icon-container" 
      :class="{ 'has-own-color': hasOwnColor }"
      :style="iconContainerStyles"
      v-html="svgContent"
    />
    
    <!-- Счетчик через компонент OCounter -->
    <div 
      v-if="showCounter" 
      class="counter-badge"
    >
      <OCounter 
        :label="counterLabel"
        :variant="counterVariant"
        :size="counterSize"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import OCounter from '@/components/OCounter.vue';

const props = defineProps({
  sizeIcon: { 
    type: Number, 
    default: 24,
    validator: (value) => [12, 16, 20, 24, 32, 40, 56].includes(value)
  },
  icon: { 
    type: String, 
    default: 'navigation-action/play' 
  },
  hasCounter: { 
    type: Boolean, 
    default: false 
  },
  hasOwnColor: { 
    type: Boolean, 
    default: false 
  },
  iconColor: { 
    type: String, 
    default: 'var(--color-icon-primary)' 
  },
  counterValue: { 
    type: Number, 
    default: 2 
  },
  counterVariant: {
    type: String,
    default: 'inverse',
    validator: (value) => ['primary', 'secondary', 'tertiary', 'inverse'].includes(value)
  }
});

// Динамическая загрузка SVG
const svgContent = computed(() => {
  try {
    // Используем import.meta.glob для загрузки всех SVG
    const icons = import.meta.glob('/src/assets/icon/**/*.svg', { 
      eager: true, 
      as: 'raw' 
    });
    
    const iconPath = `/src/assets/icon/${props.icon}.svg`;
    return icons[iconPath] || '';
  } catch (error) {
    return '';
  }
});

// Стили wrapper
const wrapperStyles = computed(() => ({
  width: `${props.sizeIcon}px`,
  height: `${props.sizeIcon}px`
}));

// Стили контейнера иконки
const iconContainerStyles = computed(() => {
  if (props.hasOwnColor) {
    return {}; // Не применяем цвет
  }
  return {
    color: props.iconColor // Для currentColor механизма
  };
});

// Условие отображения счетчика
const showCounter = computed(() => {
  return props.hasCounter && (props.sizeIcon === 24 || props.sizeIcon === 32);
});

// Размер счетчика зависит от размера иконки
const counterSize = computed(() => {
  return props.sizeIcon === 24 ? 'md' : 'sm';
});

// Форматирование значения счетчика
const counterLabel = computed(() => {
  return props.counterValue > 99 ? '99+' : String(props.counterValue);
});
</script>

<style scoped>
.icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Применяем цвет ТОЛЬКО если НЕ hasOwnColor */
.icon-container:not(.has-own-color) :deep(svg) {
  width: 100%;
  height: 100%;
  /* НЕ применяем fill и stroke на уровне svg */
}

/* Применяем fill только к элементам с fill атрибутом */
.icon-container:not(.has-own-color) :deep(svg path[fill]:not([fill="none"])),
.icon-container:not(.has-own-color) :deep(svg circle[fill]:not([fill="none"])),
.icon-container:not(.has-own-color) :deep(svg rect[fill]:not([fill="none"])),
.icon-container:not(.has-own-color) :deep(svg polygon[fill]:not([fill="none"])),
.icon-container:not(.has-own-color) :deep(svg ellipse[fill]:not([fill="none"])) {
  fill: currentColor !important;
}

/* Применяем stroke ТОЛЬКО к элементам с stroke атрибутом (исключая "none") */
.icon-container:not(.has-own-color) :deep(svg path[stroke]:not([stroke="none"])),
.icon-container:not(.has-own-color) :deep(svg circle[stroke]:not([stroke="none"])),
.icon-container:not(.has-own-color) :deep(svg rect[stroke]:not([stroke="none"])),
.icon-container:not(.has-own-color) :deep(svg line[stroke]:not([stroke="none"])),
.icon-container:not(.has-own-color) :deep(svg polyline[stroke]:not([stroke="none"])) {
  stroke: currentColor !important;
}

/* Для элементов БЕЗ явных fill/stroke атрибутов - применяем только fill */
.icon-container:not(.has-own-color) :deep(svg path:not([fill]):not([stroke])),
.icon-container:not(.has-own-color) :deep(svg circle:not([fill]):not([stroke])),
.icon-container:not(.has-own-color) :deep(svg rect:not([fill]):not([stroke])),
.icon-container:not(.has-own-color) :deep(svg polygon:not([fill]):not([stroke])) {
  fill: currentColor !important;
}

/* Для иконок с собственными цветами - оставляем как есть */
.icon-container.has-own-color :deep(svg) {
  width: 100%;
  height: 100%;
}

/* Позиционирование счетчика */
.counter-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}
</style>


