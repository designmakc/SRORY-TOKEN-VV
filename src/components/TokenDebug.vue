<template>
  <div class="token-debug">
    <h3>🔍 Диагностика токенов</h3>
    
    <div class="debug-section">
      <h4>CSS переменные:</h4>
      <pre>{{ cssVarsPreview }}</pre>
    </div>
    
    <div class="debug-section">
      <h4>Токены counter:</h4>
      <ul>
        <li>counter-padding-md-vertical: {{ getToken('counter/padding/md/vertical') }}</li>
        <li>counter-padding-md-horizontal: {{ getToken('counter/padding/md/horizontal') }}</li>
        <li>counter-border-radius: {{ getToken('counter/border-radius') }}</li>
        <li>color-background-feedback-primary: {{ getToken('color/background/feedback/primary') }}</li>
      </ul>
    </div>
    
    <div class="debug-section">
      <h4>DOM проверка:</h4>
      <button @click="checkDOM">Проверить CSS переменные в DOM</button>
      <div v-if="domCheck">
        <p>Найдено переменных: {{ domCheck.count }}</p>
        <pre>{{ domCheck.vars }}</pre>
      </div>
    </div>
    
    <div class="debug-section">
      <h4>Ручная инжекция:</h4>
      <button @click="manualInject">Инжектировать токены вручную</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useDesignTokens } from '@/composables/useDesignTokens'

export default {
  name: 'TokenDebug',
  setup() {
    const { tokens, cssVariables, getToken } = useDesignTokens()
    const domCheck = ref(null)
    
    const cssVarsPreview = computed(() => {
      const vars = cssVariables.value
      return vars ? vars.substring(0, 500) + '...' : 'Пусто'
    })
    
    const checkDOM = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      const vars = []
      let count = 0
      
      // Проверяем конкретные переменные
      const testVars = [
        '--counter-padding-md-vertical',
        '--counter-padding-md-horizontal', 
        '--counter-border-radius',
        '--color-background-feedback-primary'
      ]
      
      testVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName)
        if (value) {
          vars.push(`${varName}: ${value}`)
          count++
        }
      })
      
      domCheck.value = {
        count,
        vars: vars.join('\n')
      }
    }
    
    const manualInject = () => {
      if (window.$injectTokens) {
        window.$injectTokens()
        console.log('✅ Ручная инжекция выполнена')
        // Обновляем проверку DOM после инжекции
        setTimeout(() => {
          checkDOM()
        }, 100)
      } else {
        console.error('❌ Функция $injectTokens не найдена')
      }
    }
    
    return {
      tokens,
      cssVariables,
      getToken,
      cssVarsPreview,
      domCheck,
      checkDOM,
      manualInject
    }
  }
}
</script>

<style scoped>
.token-debug {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9f9f9;
}

.debug-section {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.debug-section h4 {
  margin: 0 0 8px 0;
  color: #333;
}

pre {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;
}

button:hover {
  background: #0056b3;
}

ul {
  margin: 8px 0;
  padding-left: 20px;
}

li {
  margin: 4px 0;
  font-family: monospace;
}
</style>
