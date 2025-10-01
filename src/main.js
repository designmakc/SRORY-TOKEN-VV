import './assets/fonts/fonts.css';
import './assets/styles/typography.css';

import { createApp } from 'vue';
import App from './App.vue';
import { designTokensPlugin, vTokens } from './plugins/designTokens';

const app = createApp(App);

app.use(designTokensPlugin, {
  autoInject: true,
  targetElement: ':root',
  initialTheme: 'blue',
  enableResponsive: true,
  prefix: '--'
});

app.directive('tokens', vTokens);

app.mount('#app');