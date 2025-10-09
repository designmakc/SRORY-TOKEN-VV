import '../src/assets/fonts/fonts.css';
import '../src/assets/styles/style.css';
import '../src/assets/styles/storybook-fixes.css';

import { setup } from '@storybook/vue3';

export const parameters = {
  docs: {
    source: {
      type: 'dynamic',
      state: 'open',
      excludeDecorators: true,
      format: true,
      language: 'html',
    },
  },
  layout: 'centered',
};

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: [
        { value: 'blue', title: 'Blue', icon: 'circle' },
        { value: 'red', title: 'Red', icon: 'circle' },
        { value: 'stone', title: 'Stone', icon: 'circle' },
        { value: 'white', title: 'White', icon: 'circle' }
      ],
      dynamicTitle: true,
    },
  },
  adaptive: {
    description: 'Global adaptive mode for components',
    toolbar: {
      title: 'Adaptive',
      icon: 'mobile',
      items: [
        { value: 'wide', title: 'Wide', icon: 'grow' },
        { value: 'desktop', title: 'Desktop', icon: 'browser' },
        { value: 'tablet', title: 'Tablet', icon: 'tablet' },
        { value: 'mobile', title: 'Mobile', icon: 'mobile' }
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (story, context) => {
    const theme = context.globals.theme || 'blue';
    const adaptive = context.globals.adaptive || 'desktop';
    
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-adaptive', adaptive);
    }
    
    return story();
  }
];

setup((app) => {
  // Vue 3 setup
});