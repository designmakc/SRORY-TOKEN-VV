import { ref, computed, onMounted } from 'vue';

export default {
  title: 'Design System/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Коллекция иконок дизайн-системы'
      }
    }
  }
};

const IconsShowcase = {
  setup() {
    const searchQuery = ref('');
    const selectedCategory = ref('all');
    const allIcons = ref([]);
    const categories = ref([]);
    const copiedIcon = ref('');
    
    onMounted(() => {
      const loadIcons = async () => {
        try {
          const icons = import.meta.glob('/src/assets/icon/**/*.svg', { 
            eager: true, 
            query: '?raw',
            import: 'default'
          });
          
          allIcons.value = Object.keys(icons).map(path => {
            const match = path.match(/\/src\/assets\/icon\/(.+)\.svg$/);
            if (match) {
              const fullPath = match[1];
              const parts = fullPath.split('/');
              const category = parts[0];
              const name = parts[parts.length - 1];
              return {
                name,
                category,
                fullPath,
                svgContent: icons[path]
              };
            }
            return null;
          }).filter(Boolean);
          
          // Получаем уникальные категории
          categories.value = ['all', ...new Set(allIcons.value.map(icon => icon.category))];
        } catch (error) {
          console.error('Ошибка загрузки иконок:', error);
        }
      };
      
      loadIcons();
    });
    
    const filteredIcons = computed(() => {
      let filtered = allIcons.value;
      
      if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(icon => icon.category === selectedCategory.value);
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(icon => 
          icon.name.toLowerCase().includes(query) ||
          icon.category.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    });
    
    const copyToClipboard = (text) => {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(text);
        copiedIcon.value = text;
        setTimeout(() => {
          copiedIcon.value = '';
        }, 2000);
      }
    };
    
    return {
      searchQuery,
      selectedCategory,
      allIcons,
      categories,
      filteredIcons,
      copyToClipboard,
      copiedIcon
    };
  },
  template: `
    <div style="padding: 24px; max-width: 1200px; margin: 0 auto; background-color: var(--color-background-page-lvl-2); position: relative;">
      <div 
        v-if="copiedIcon"
        style="
          position: fixed;
          top: 24px;
          right: 24px;
          background-color: var(--color-background-feedback-success-lvl-1);
          color: var(--color-text-on-feedback-success-lvl-1);
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
        "
      >
        Скопировано: {{ copiedIcon }}
      </div>
      
      <h1 style="margin-bottom: 24px;">Иконки дизайн-системы</h1>
      
      <div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
        <input 
          v-model="searchQuery"
          placeholder="Поиск иконок..."
          style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; min-width: 200px;"
        />
        <select 
          v-model="selectedCategory"
          style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px;"
        >
          <option v-for="category in categories" :key="category" :value="category">
            {{ category === 'all' ? 'Все категории' : category }}
          </option>
        </select>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">
        <div 
          v-for="icon in filteredIcons" 
          :key="icon.fullPath"
          style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding: 16px; 
            border: 1px solid #eee; 
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
          "
          @click="copyToClipboard(icon.fullPath)"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-background-page-lvl-3)'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'"
        >
          <div style="width: 24px; height: 24px; margin-bottom: 8px;" v-html="icon.svgContent">
          </div>
          <div style="font-size: 12px; text-align: center; word-break: break-all;">
            {{ icon.name }}
          </div>
          <div style="font-size: 10px; color: #666; margin-top: 4px;">
            {{ icon.category }}
          </div>
        </div>
      </div>
      
      <div v-if="filteredIcons.length === 0" style="text-align: center; padding: 40px; color: #666;">
        Иконки не найдены
      </div>
    </div>
  `
};

export const AllIcons = {
  render: () => ({
    components: { IconsShowcase },
    template: '<IconsShowcase />'
  })
};

AllIcons.parameters = {
  backgrounds: {
    default: 'design-system-bg',
    values: [
      {
        name: 'design-system-bg',
        value: 'var(--color-background-page-lvl-2)'
      }
    ]
  },
};

