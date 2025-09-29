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
          <VButton variant="primary" size="sm">Small</VButton>
          <VButton variant="primary" size="md">Medium</VButton>
          <VButton variant="primary" size="lg">Large</VButton>
        </div>
        
        <!-- Все варианты -->
        <div class="button-group">
          <h3>Варианты:</h3>
          <VButton variant="primary">Primary</VButton>
          <VButton variant="secondary">Secondary</VButton>
          <VButton variant="ghost">Ghost</VButton>
        </div>

        <!-- С иконками -->
        <div class="button-group">
          <h3>С иконками:</h3>
          <VButton variant="primary" left-icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+">
            Primary with Icon
          </VButton>
          <VButton variant="secondary" left-icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+">
            Secondary with Icon
          </VButton>
        </div>

        <!-- Disabled состояние -->
        <div class="button-group">
          <h3>Disabled:</h3>
          <VButton variant="primary" disabled>Primary Disabled</VButton>
          <VButton variant="secondary" disabled>Secondary Disabled</VButton>
          <VButton variant="ghost" disabled>Ghost Disabled</VButton>
        </div>
      </section>

      <section class="demo-section">
        <h2>Токены в действии</h2>
        <div class="token-showcase">
          <div class="color-box" :style="{ backgroundColor: getToken('color/brand/primary') }">
            Primary Color
          </div>
          <div class="color-box" :style="{ backgroundColor: getToken('color/brand/secondary') }">
            Secondary Color
          </div>
          <div class="spacing-demo">
            Spacing: {{ getToken('spacing/md') }}px
          </div>
        </div>
      </section>

      <!-- Директива v-tokens в действии -->
      <section class="demo-section">
        <h2>Использование v-tokens директивы</h2>
        <div 
          v-tokens="{
            backgroundColor: 'color/background/primary',
            padding: 'spacing/lg',
            borderRadius: 'border-radius/md'
          }"
          class="tokens-demo-box"
        >
          <p>Этот блок использует v-tokens директиву для применения токенов напрямую</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VButton from './components/VButton.vue';
import { useDesignTokens } from './composables/useDesignTokens';

const { 
  currentTheme, 
  currentBreakpoint, 
  getToken,
  setTheme,
  setBreakpoint 
} = useDesignTokens();

const selectedTheme = ref(currentTheme.value);
const selectedBreakpoint = ref(currentBreakpoint.value);

const handleThemeChange = () => {
  setTheme(selectedTheme.value);
  console.log('✅ Тема изменена на:', selectedTheme.value);
};

const handleBreakpointChange = () => {
  setBreakpoint(selectedBreakpoint.value);
  console.log('✅ Breakpoint изменён на:', selectedBreakpoint.value);
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
}

.app-header {
  background-color: var(--color-background-secondary);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.app-header h1 {
  margin: 0;
  font-size: var(--typography-font-size-2xl);
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-brand-primary);
}

.theme-controls {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  flex-wrap: wrap;
}

.theme-controls label {
  font-weight: var(--typography-font-weight-medium);
  font-size: var(--typography-font-size-sm);
}

.theme-controls select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  font-size: var(--typography-font-size-sm);
  cursor: pointer;
}

.app-content {
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: var(--spacing-2xl);
}

.demo-section h2 {
  font-size: var(--typography-font-size-xl);
  font-weight: var(--typography-font-weight-semibold);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
}

.button-group {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.token-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.color-box {
  padding: var(--spacing-lg);
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
  padding: var(--spacing-lg);
  background-color: var(--color-background-tertiary);
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