<template>
  <div class="token-test">
    <h3>🧪 Тест токенов</h3>
    
    <div class="test-section">
      <h4>Прямые CSS переменные:</h4>
      <div 
        class="test-box"
        style="
          background-color: var(--color-background-feedback-primary, red);
          padding: var(--counter-padding-md-vertical, 5px) var(--counter-padding-md-horizontal, 10px);
          border-radius: var(--counter-border-radius, 4px);
          color: var(--color-text-inverse, white);
        "
      >
        Тест токенов
      </div>
    </div>
    
    <div class="test-section">
      <h4>Проверка DOM:</h4>
      <button @click="checkDOM">Проверить CSS переменные в DOM</button>
      <div v-if="domResult">
        <p>Найдено переменных: {{ domResult.count }}</p>
        <pre>{{ domResult.vars }}</pre>
      </div>
    </div>
    
    <div class="test-section">
      <h4>Ручная инжекция:</h4>
      <button @click="manualInject">Инжектировать токены</button>
      <p v-if="injectResult">{{ injectResult }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TokenTest',
  setup() {
    const domResult = ref(null)
    const injectResult = ref('')
    
    const checkDOM = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      
      const testVars = [
        '--counter-padding-md-vertical',
        '--counter-padding-md-horizontal',
        '--counter-border-radius',
        '--color-background-feedback-primary',
        '--color-text-inverse'
      ]
      
      const vars = []
      let count = 0
      
      testVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName)
        if (value) {
          vars.push(`${varName}: ${value}`)
          count++
        } else {
          vars.push(`${varName}: НЕ НАЙДЕН`)
        }
      })
      
      domResult.value = {
        count,
        vars: vars.join('\n')
      }
    }
    
    const manualInject = () => {
      if (window.$injectTokens) {
        window.$injectTokens()
        injectResult.value = '✅ Токены инжектированы'
        setTimeout(() => {
          checkDOM()
        }, 100)
      } else {
        injectResult.value = '❌ Функция $injectTokens не найдена'
      }
    }
    
    return {
      domResult,
      injectResult,
      checkDOM,
      manualInject
    }
  }
}
</script>

<style scoped>
.token-test {
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin: 20px 0;
  background: #f9f9f9;
}

.test-section {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.test-box {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  margin: 8px 0;
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

pre {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
