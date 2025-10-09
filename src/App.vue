<!-- App.vue -->
<template>
  <div class="app">
    <!-- Панель управления темой -->
    <header class="app-header">
      <h1>Design System Demo</h1>
      
      <div class="theme-controls">
        <label>Тема:</label>
        <select v-model="selectedTheme" @change="handleThemeChange">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="stone">Stone</option>
        </select>

        <label>Breakpoint:</label>
        <select v-model="selectedBreakpoint" @change="handleBreakpointChange">
          <option value="wide">Wide (≥1920px)</option>
          <option value="desktop">Desktop (≥1280px)</option>
          <option value="tablet">Tablet (≥768px)</option>
          <option value="mobile">Mobile (<768px)</option>
        </select>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="app-content">
      <section class="demo-section">
        <h2>Кнопки с реальными токенами</h2>
        
        <!-- Все размеры -->
        <div class="button-group">
          <h3>Размеры:</h3>
          <OButton variant="primary" size="sm">Small</OButton>
          <OButton variant="primary" size="md">Medium</OButton>
          <OButton variant="primary" size="lg">Large</OButton>
        </div>
        
        <!-- Все варианты -->
        <div class="button-group">
          <h3>Варианты:</h3>
          <OButton variant="primary">Primary</OButton>
          <OButton variant="secondary">Secondary</OButton>
          <OButton variant="tertiary">Tertiary</OButton>
        </div>

        <!-- С иконками -->
        <div class="button-group">
          <h3>С иконками:</h3>
          <OButton variant="primary" icon="play" iconPosition="left">
            Primary with Icon
          </OButton>
          <OButton variant="secondary" icon="play" iconPosition="left">
            Secondary with Icon
          </OButton>
        </div>

        <!-- Disabled состояние -->
        <div class="button-group">
          <h3>Disabled:</h3>
          <OButton variant="primary" :isDisabled="true">Primary Disabled</OButton>
          <OButton variant="secondary" :isDisabled="true">Secondary Disabled</OButton>
          <OButton variant="tertiary" :isDisabled="true">Tertiary Disabled</OButton>
        </div>
      </section>

       <section class="demo-section">
         <h2>Токены в действии</h2>
         <div class="token-showcase">
           <div class="color-box" style="background-color: var(--color-background-button-primary-default);">
             Primary Color
           </div>
           <div class="color-box" style="background-color: var(--color-background-button-secondary-default);">
             Secondary Color
           </div>
           <div class="spacing-demo">
             Spacing: var(--gap-md)
           </div>
         </div>
       </section>

      <!-- CSS переменные в действии -->
      <section class="demo-section">
        <h2>Использование CSS переменных</h2>
        <div 
          class="tokens-demo-box"
          style="
            background-color: var(--color-background-page-lvl-2);
            padding: var(--padding-lg);
            border-radius: var(--border-radius-md);
          "
        >
          <p>Этот блок использует CSS переменные напрямую из Basic-variables.css</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import OButton from './components/OButton.vue';

// Простое управление темами через data-атрибуты
const selectedTheme = ref('blue');
const selectedBreakpoint = ref('desktop');

const handleThemeChange = () => {
  // Устанавливаем data-theme на document.documentElement
  document.documentElement.setAttribute('data-theme', selectedTheme.value);
};

const handleBreakpointChange = () => {
  // Устанавливаем data-adaptive на document.documentElement
  document.documentElement.setAttribute('data-adaptive', selectedBreakpoint.value);
};

// Инициализация при загрузке
document.documentElement.setAttribute('data-theme', selectedTheme.value);
document.documentElement.setAttribute('data-adaptive', selectedBreakpoint.value);
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-background-page-lvl-1);
  color: var(--color-text-primary);
}

.app-header {
  background-color: var(--color-background-page-lvl-2);
  padding: var(--padding-lg);
  border-bottom: 1px solid var(--color-border-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap-md);
}

.app-header h1 {
  margin: 0;
  font-size: var(--typography-font-size-h2);
  font-weight: var(--typography-font-weight-h2);
  color: var(--color-text-primary);
}

.theme-controls {
  display: flex;
  gap: var(--gap-md);
  align-items: center;
  flex-wrap: wrap;
}

.theme-controls label {
  font-weight: var(--typography-font-weight-medium);
  font-size: var(--typography-font-size-body-md);
}

.theme-controls select {
  padding: var(--padding-2xs) var(--padding-sm);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-page-lvl-1);
  color: var(--color-text-primary);
  font-size: var(--typography-font-size-body-md);
  cursor: pointer;
}

.app-content {
  padding: var(--padding-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: var(--padding-2xl);
}

.demo-section h2 {
  font-size: var(--typography-font-size-h3);
  font-weight: var(--typography-font-weight-h3);
  margin-bottom: var(--padding-lg);
  color: var(--color-text-primary);
}

.button-group {
  display: flex;
  gap: var(--gap-md);
  margin-bottom: var(--gap-md);
  flex-wrap: wrap;
}

.token-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--gap-lg);
}

.color-box {
  padding: var(--padding-lg);
  border-radius: var(--border-radius-md);
  color: white;
  font-weight: var(--typography-font-weight-medium);
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spacing-demo {
  padding: var(--padding-lg);
  background-color: var(--color-background-page-lvl-3);
  border-radius: var(--border-radius-md);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tokens-demo-box {
  border: 2px dashed var(--color-border-primary);
}

.tokens-demo-box p {
  margin: 0;
  color: var(--color-text-secondary);
}


/* Адаптивность */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .button-group {
    flex-direction: column;
  }

  .token-showcase {
    grid-template-columns: 1fr;
  }
}
</style>