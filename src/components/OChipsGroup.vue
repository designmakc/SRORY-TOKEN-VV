<template>
  <div 
    ref="containerRef"
    class="o-chips-group"
    :class="[`o-chips-group--${deviceType}`]"
    @mousedown="handleMouseDown"
    @mouseleave="handleMouseLeave"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
  >
    <!-- Кнопка "Очистить" -->
    <OChips
      v-if="showResetButton"
      :label="resetButtonLabel"
      :hasLabel="true"
      :hasLeftIcon="false"
      :hasIconClose="false"
      :hasCounter="false"
      state="default"
      @click="handleResetClick"
    />

    <!-- Чипсы из слота -->
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, ref, onMounted, onUnmounted } from 'vue';
import OChips from './OChips.vue';

const props = defineProps({
  /**
   * Показывать ли кнопку сброса
   */
  hasButtonReset: {
    type: Boolean,
    default: true
  },

  /**
   * Текст кнопки сброса
   */
  resetButtonLabel: {
    type: String,
    default: 'Очистить'
  },

  /**
   * Тип устройства (влияет на layout)
   */
  deviceType: {
    type: String,
    default: 'desktop',
    validator: (value) => ['desktop', 'tablet', 'mobile'].includes(value)
  },

  /**
   * Режим выбора
   * single - можно выбрать только один чипс
   * multiple - можно выбрать несколько чипсов
   */
  selectionMode: {
    type: String,
    default: 'multiple',
    validator: (value) => ['single', 'multiple'].includes(value)
  },

  /**
   * Массив выбранных значений (v-model)
   */
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'reset']);

// Внутреннее состояние выбранных чипсов
const selectedChips = ref([...props.modelValue]);

// Ref для контейнера
const containerRef = ref(null);

// Состояние для drag-to-scroll
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Показывать кнопку "Очистить" только если hasButtonReset === true
const showResetButton = computed(() => {
  return props.hasButtonReset;
});

// Обработчик клика на кнопку "Очистить"
const handleResetClick = () => {
  selectedChips.value = [];
  emit('update:modelValue', []);
  emit('reset');
};

// Функция для регистрации чипса
const registerChip = (chipValue) => {
  // Ничего не делаем, просто для API
};

// Функция для обработки клика на чипс
const handleChipClick = (chipValue) => {
  if (props.selectionMode === 'single') {
    // Режим одиночного выбора
    if (selectedChips.value.includes(chipValue)) {
      selectedChips.value = [];
    } else {
      selectedChips.value = [chipValue];
    }
  } else {
    // Режим множественного выбора
    const index = selectedChips.value.indexOf(chipValue);
    if (index > -1) {
      selectedChips.value.splice(index, 1);
    } else {
      selectedChips.value.push(chipValue);
    }
  }
  emit('update:modelValue', [...selectedChips.value]);
};

// Функция для проверки, выбран ли чипс
const isChipSelected = (chipValue) => {
  return selectedChips.value.includes(chipValue);
};

// Drag-to-scroll handlers
const handleMouseDown = (e) => {
  // Только для tablet и mobile режимов
  if (props.deviceType === 'desktop') return;
  
  isDragging.value = true;
  startX.value = e.pageX - containerRef.value.offsetLeft;
  scrollLeft.value = containerRef.value.scrollLeft;
  containerRef.value.style.cursor = 'grabbing';
  containerRef.value.style.userSelect = 'none';
};

const handleMouseLeave = () => {
  if (isDragging.value) {
    isDragging.value = false;
    if (containerRef.value) {
      containerRef.value.style.cursor = 'grab';
      containerRef.value.style.userSelect = 'auto';
    }
  }
};

const handleMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false;
    if (containerRef.value) {
      containerRef.value.style.cursor = 'grab';
      containerRef.value.style.userSelect = 'auto';
    }
  }
};

const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - containerRef.value.offsetLeft;
  const walk = (x - startX.value) * 2; // Умножаем для более быстрого скролла
  containerRef.value.scrollLeft = scrollLeft.value - walk;
};

// Предоставляем контекст для дочерних компонентов
provide('chipsGroup', {
  registerChip,
  handleChipClick,
  isChipSelected
});
</script>

<style scoped>
.o-chips-group {
  display: flex;
  gap: var(--gap-input-selection-group-item);
  align-items: center;
  width: 100%;
}

/* Предотвращаем сжатие чипсов */
.o-chips-group > * {
  flex-shrink: 0;
}

/* Desktop: wrap content */
.o-chips-group--desktop {
  flex-wrap: wrap;
}

/* Tablet: horizontal scroll */
.o-chips-group--tablet {
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  /* Включаем touch scrolling для мобильных устройств */
  -webkit-overflow-scrolling: touch;
  /* Скрываем скроллбар */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  /* Курсор для drag-to-scroll */
  cursor: grab;
  /* Padding для теней */
  padding: var(--padding-2xs) 0;
  margin: calc(-1 * var(--padding-2xs)) 0;
}

.o-chips-group--tablet::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Mobile: horizontal scroll */
.o-chips-group--mobile {
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  /* Включаем touch scrolling для мобильных устройств */
  -webkit-overflow-scrolling: touch;
  /* Скрываем скроллбар */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  /* Курсор для drag-to-scroll */
  cursor: grab;
  /* Padding для теней */
  padding: var(--padding-2xs) 0;
  margin: calc(-1 * var(--padding-2xs)) 0;
}

.o-chips-group--mobile::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>

