import './assets/fonts/fonts.css';
import './assets/styles/style.css';

import { createApp } from 'vue';
import App from './App.vue';
// Отключены старые способы генерации переменных - используем только Basic-variables.css
// import { designTokensPlugin, vTokens } from './plugins/designTokens';

const app = createApp(App);

// Отключен старый плагин токенов - используем только Basic-variables.css
// app.use(designTokensPlugin, {
//   autoInject: true,
//   targetElement: ':root',
//   initialTheme: 'blue',
//   enableResponsive: true,
//   prefix: '--'
// });

// app.directive('tokens', vTokens);

app.mount('#app');