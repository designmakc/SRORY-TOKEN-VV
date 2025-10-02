import { ref, computed, onMounted } from 'vue';
import { useDesignTokens } from '../src/composables/useDesignTokens';

export default {
  title: 'Design System/Icons',
  
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Полная коллекция иконок дизайн-системы с удобным поиском, фильтрацией по категориям и быстрым копированием. Нажмите на иконку, чтобы скопировать её название для использования в компонентах.'
      }
    }
  },
  decorators: [
    (story, context) => {
      const { setTheme, setBreakpoint } = useDesignTokens();
      if (context.globals.theme) setTheme(context.globals.theme);
      if (context.globals.breakpoint) setBreakpoint(context.globals.breakpoint);
      return { components: { story }, template: '<story />' };
    }
  ]
};

const IconsShowcase = {
  setup() {
    const { getToken } = useDesignTokens();
    
    const searchQuery = ref('');
    const selectedCategory = ref('all');
    const copiedIcon = ref('');
    const showCopyNotification = ref(false);
    const allIcons = ref([]);
    const categories = ref([]);
    
    onMounted(() => {
      // Используем динамический импорт для совместимости с Storybook
      const loadIcons = async () => {
        try {
          const icons = import.meta.glob('/src/assets/icon/**/*.svg', { 
            eager: true, 
            as: 'raw' 
          });
          
          allIcons.value = Object.keys(icons).map(path => {
            const match = path.match(/\/src\/assets\/icon\/(.+)\.svg$/);
            if (!match) return null;
            
            const fullPath = match[1];
            const parts = fullPath.split('/');
            const category = parts[0];
            const name = parts.slice(1).join('/');
            
            return {
              id: fullPath,
              category,
              name,
              fullPath,
              svg: icons[path],
              label: `${category}/${name}`
            };
          }).filter(Boolean);
        } catch (error) {
          console.warn('Не удалось загрузить иконки:', error);
          allIcons.value = [];
        }
      };
      
      loadIcons().then(() => {
        const uniqueCategories = [...new Set(allIcons.value.map(icon => icon.category))];
        categories.value = [
          { value: 'all', label: 'Все категории', count: allIcons.value.length },
          ...uniqueCategories.sort().map(cat => ({
            value: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
            count: allIcons.value.filter(icon => icon.category === cat).length
          }))
        ];
      });
    });
    
    const filteredIcons = computed(() => {
      let filtered = allIcons.value;
      
      if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(icon => icon.category === selectedCategory.value);
      }
      
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(icon => 
          icon.label.toLowerCase().includes(query) ||
          icon.name.toLowerCase().includes(query) ||
          icon.category.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    });
    
    const copyIconName = async (icon) => {
      try {
        await navigator.clipboard.writeText(icon.fullPath);
        copiedIcon.value = icon.fullPath;
        showCopyNotification.value = true;
        setTimeout(() => {
          showCopyNotification.value = false;
        }, 2500);
      } catch (err) {
        // Ошибка копирования
      }
    };
    
    return {
      searchQuery,
      selectedCategory,
      categories,
      filteredIcons,
      copiedIcon,
      showCopyNotification,
      copyIconName,
      allIcons
    };
  },
  template: `
    <div class="icons-showcase">
      <!-- Header -->
      <div class="showcase-header">
        <div class="header-content">
          <h1 class="page-title">Библиотека иконок</h1>
          <p class="page-description">
            Выберите иконку и нажмите на неё для копирования названия
          </p>
          
          <!-- Stats -->
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-value">{{ filteredIcons.length }}</div>
              <div class="stat-label">Найдено</div>
            </div>
            <div class="stat-divider" />
            <div class="stat-card">
              <div class="stat-value">{{ allIcons.length }}</div>
              <div class="stat-label">Всего иконок</div>
            </div>
            <div class="stat-divider" />
            <div class="stat-card">
              <div class="stat-value">{{ categories.length - 1 }}</div>
              <div class="stat-label">Категорий</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="controls-wrapper">
        <div class="controls-container">
          <!-- Search -->
          <div class="search-box">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Поиск иконок..."
              class="search-input"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="search-clear"
              aria-label="Очистить"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <!-- Category Filter -->
          <div class="category-box">
            <select 
              v-model="selectedCategory"
              class="category-select"
            >
              <option 
                v-for="category in categories" 
                :key="category.value" 
                :value="category.value"
              >
                {{ category.label }} ({{ category.count }})
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Copy Notification -->
      <Transition name="notification">
        <div v-if="showCopyNotification" class="copy-toast">
          <svg class="toast-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="toast-content">
            <div class="toast-title">Скопировано!</div>
            <div class="toast-text">{{ copiedIcon }}</div>
          </div>
        </div>
      </Transition>
      
      <!-- Icons Grid -->
      <div v-if="filteredIcons.length > 0" class="icons-container">
        <div class="icons-grid">
          <button 
            v-for="icon in filteredIcons" 
            :key="icon.id"
            class="icon-card"
            @click="copyIconName(icon)"
            :title="'Нажмите, чтобы скопировать: ' + icon.fullPath"
          >
            <div class="icon-visual" v-html="icon.svg" />
            <div class="icon-details">
              <div class="icon-name">{{ icon.name }}</div>
              <div class="icon-badge">{{ icon.category }}</div>
            </div>
            <div class="icon-copy-hint">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 10.6V3.4C3 2.63 3.63 2 4.4 2h7.2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <svg class="empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="26" cy="26" r="16" stroke="currentColor" stroke-width="3"/>
          <path d="M38 38l14 14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <path d="M20 26h12M26 20v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3 class="empty-title">Иконки не найдены</h3>
        <p class="empty-text">
          Попробуйте изменить поисковый запрос<br/>или выберите другую категорию
        </p>
        <button class="empty-button" @click="searchQuery = ''; selectedCategory = 'all'">
          Сбросить фильтры
        </button>
      </div>
    </div>
  `
};

// Добавляем стили
if (typeof document !== 'undefined') {
  const styles = `
    <style>
    /* === LAYOUT === */
    .icons-showcase {
      min-height: 100vh;
      background: var(--color-background-page-lvl-1);
      padding: var(--gap-xl) var(--gap-lg);
    }

    /* === HEADER === */
    .showcase-header {
      max-width: var(--size-main-container-max-width);
      margin: 0 auto var(--gap-2xl);
      text-align: center;
    }

    .header-content {
      display: flex;
      flex-direction: column;
      gap: var(--gap-lg);
    }

    .page-title {
      font-family: var(--typography-font-family-header);
      font-size: var(--typography-font-size-header-3xl);
      font-weight: var(--typography-font-weight-bold);
      line-height: var(--typography-line-height-header-3xl);
      letter-spacing: var(--typography-letter-spacing-header-3xl);
      color: var(--color-text-primary);
      margin: 0;
    }

    .page-description {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-lg);
      line-height: var(--typography-line-height-body-lg);
      color: var(--color-text-secondary);
      margin: 0;
    }

    /* === STATS === */
    .stats-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--gap-md);
      background: var(--color-background-page-lvl-2);
      padding: var(--gap-lg);
      border-radius: var(--border-radius-xl);
      border: var(--border-width-xs) solid var(--color-border-secondary);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--gap-xs);
      min-width: var(--size-min-width-sm);
    }

    .stat-value {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-2xl);
      font-weight: var(--typography-font-weight-bold);
      line-height: 1;
      color: var(--color-text-primary);
    }

    .stat-label {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-sm);
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: var(--typography-font-weight-medium);
    }

    .stat-divider {
      width: var(--border-width-xs);
      height: var(--size-height-md);
      background: var(--color-border-secondary);
    }

    /* === CONTROLS === */
    .controls-wrapper {
      background: var(--color-background-page-lvl-2);
      border-top: var(--border-width-xs) solid var(--color-border-secondary);
      border-bottom: var(--border-width-xs) solid var(--color-border-secondary);
      padding: var(--gap-lg) 0;
      margin-bottom: var(--gap-xl);
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(8px);
      background: color-mix(in srgb, var(--color-background-page-lvl-1) 95%, transparent);
    }

    .controls-container {
      max-width: var(--size-main-container-max-width);
      margin: 0 auto;
      padding: 0 var(--gap-lg);
      display: flex;
      gap: var(--gap-md);
    }

    /* === SEARCH === */
    .search-box {
      position: relative;
      flex: 1;
      min-width: 0;
    }

    .search-icon {
      position: absolute;
      left: var(--gap-md);
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-icon-tertiary);
      pointer-events: none;
      flex-shrink: 0;
    }

    .search-input {
      width: 100%;
      height: var(--size-height-md);
      padding: 0 var(--gap-3xl) 0 calc(var(--gap-md) + var(--size-icon-md) + var(--gap-sm));
      border: var(--border-width-sm) solid var(--color-border-primary);
      border-radius: var(--border-radius-lg);
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-md);
      color: var(--color-text-primary);
      background: var(--color-background-page-lvl-1);
      transition: all 0.2s ease;
    }

    .search-input::placeholder {
      color: var(--color-text-tertiary);
    }

    .search-input:hover {
      border-color: var(--color-border-secondary);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-border-accent);
      background: var(--color-background-page-lvl-1);
      box-shadow: 0 0 0 var(--gap-3xs) var(--color-background-feedback-info-lvl-2);
    }

    .search-clear {
      position: absolute;
      right: var(--gap-md);
      top: 50%;
      transform: translateY(-50%);
        width: var(--size-icon-sm);
        height: var(--size-icon-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: var(--border-radius-sm);
      color: var(--color-icon-tertiary);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .search-clear:hover {
      background: var(--color-background-secondary);
      color: var(--color-icon-primary);
    }

    /* === CATEGORY FILTER === */
    .category-box {
      flex-shrink: 0;
      min-width: var(--size-min-width-lg);
    }

    .category-select {
      width: 100%;
      height: var(--size-height-md);
      padding: 0 var(--gap-md);
      border: var(--border-width-sm) solid var(--color-border-primary);
      border-radius: var(--border-radius-lg);
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-md);
      font-weight: var(--typography-font-weight-medium);
      color: var(--color-text-primary);
      background: var(--color-background-page-lvl-1);
      cursor: pointer;
      transition: all 0.2s ease;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2387898E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right var(--gap-md) center;
      padding-right: calc(var(--gap-md) + var(--size-icon-md));
    }

    .category-select:hover {
      border-color: var(--color-border-secondary);
    }

    .category-select:focus {
      outline: none;
      border-color: var(--color-border-accent);
      box-shadow: 0 0 0 var(--gap-3xs) var(--color-background-feedback-info-lvl-2);
    }

    /* === NOTIFICATION === */
    .copy-toast {
      position: fixed;
      top: var(--gap-xl);
      right: var(--gap-xl);
      display: flex;
      align-items: center;
      gap: var(--gap-md);
      background: var(--color-background-feedback-success-lvl-1);
      border: var(--border-width-sm) solid var(--color-border-feedback-success);
      padding: var(--gap-md) var(--gap-lg);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      max-width: var(--size-container-sm);
    }

    .toast-icon {
      flex-shrink: 0;
      color: var(--color-icon-feedback-success);
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-md);
      font-weight: var(--typography-font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--gap-xs);
    }

    .toast-text {
      font-family: var(--typography-font-family-secondary);
      font-size: var(--typography-font-size-body-sm);
      color: var(--color-text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notification-enter-active,
    .notification-leave-active {
      transition: all 0.3s ease;
    }

    .notification-enter-from {
      opacity: 0;
      transform: translateX(var(--size-offset-xl));
    }

    .notification-leave-to {
      opacity: 0;
      transform: translateY(calc(-1 * var(--gap-lg)));
    }

    /* === ICONS GRID === */
    .icons-container {
      max-width: var(--size-main-container-max-width);
      margin: 0 auto;
      padding: 0 var(--gap-lg);
    }

    .icons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--dropdown-size-min-width), 1fr));
      gap: var(--gap-lg);
    }

    .icon-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--gap-lg);
      background: var(--color-background-page-lvl-1);
      border: var(--border-width-sm) solid var(--color-border-secondary);
      border-radius: var(--border-radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .icon-card:hover {
      border-color: var(--color-border-accent);
      box-shadow: var(--shadow-lg);
      transform: translateY(calc(-1 * var(--gap-3xs)));
    }

    .icon-card:hover .icon-copy-hint {
      opacity: 1;
    }

    .icon-card:active {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }

    .icon-visual {
      width: var(--size-icon-lg);
      height: var(--size-icon-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--gap-md);
      color: var(--color-icon-primary);
      flex-shrink: 0;
    }

    .icon-visual :deep(svg) {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .icon-visual :deep(svg *) {
      fill: currentColor;
    }

    .icon-details {
      width: 100%;
      text-align: center;
    }

    .icon-name {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-sm);
      font-weight: var(--typography-font-weight-medium);
      color: var(--color-text-primary);
      margin-bottom: var(--gap-sm);
      word-break: break-word;
      line-height: 1.4;
    }

    .icon-badge {
      display: inline-block;
      font-family: var(--typography-font-family-secondary);
      font-size: var(--typography-font-size-body-xs);
      font-weight: var(--typography-font-weight-medium);
      color: var(--color-text-tertiary);
      background: var(--color-background-secondary);
      padding: var(--gap-xs) var(--gap-sm);
      border-radius: var(--border-radius-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .icon-copy-hint {
      position: absolute;
      top: var(--gap-sm);
      right: var(--gap-sm);
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-page-lvl-2);
      border: var(--border-width-xs) solid var(--color-border-secondary);
      border-radius: var(--border-radius-sm);
      color: var(--color-icon-secondary);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    /* === EMPTY STATE === */
    .empty-state {
      max-width: var(--size-container-md);
      margin: var(--gap-3xl) auto;
      text-align: center;
      padding: var(--gap-3xl) var(--gap-lg);
    }

    .empty-icon {
      color: var(--color-icon-tertiary);
      margin-bottom: var(--gap-xl);
    }

    .empty-title {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-xl);
      font-weight: var(--typography-font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0 0 var(--gap-md) 0;
    }

    .empty-text {
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-md);
      line-height: var(--typography-line-height-body-md);
      color: var(--color-text-secondary);
      margin: 0 0 var(--gap-xl) 0;
    }

    .empty-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--size-height-md);
      padding: 0 var(--gap-xl);
      font-family: var(--typography-font-family-body);
      font-size: var(--typography-font-size-body-md);
      font-weight: var(--typography-font-weight-semibold);
      color: var(--color-text-on-interactive-primary);
      background: var(--color-background-interactive-primary-default);
      border: none;
      border-radius: var(--border-radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .empty-button:hover {
      background: var(--color-background-interactive-primary-hover);
    }

    .empty-button:active {
      background: var(--color-background-interactive-primary-press);
    }

    /* === RESPONSIVE === */
    @media (max-width: var(--breakpoint-tablet)) {
      .icons-showcase {
        padding: var(--gap-lg) var(--gap-md);
      }

      .showcase-header {
        margin-bottom: var(--gap-xl);
      }

      .page-title {
        font-size: var(--typography-font-size-header-xl);
      }

      .stats-row {
        flex-wrap: wrap;
        padding: var(--gap-md);
      }

      .stat-divider {
        display: none;
      }

      .controls-wrapper {
        position: relative;
        padding: var(--gap-md) 0;
      }

      .controls-container {
        flex-direction: column;
        padding: 0 var(--gap-md);
      }

      .category-box {
        min-width: 0;
      }

      .icons-container {
        padding: 0 var(--gap-md);
      }

      .icons-grid {
        grid-template-columns: repeat(auto-fill, minmax(var(--category-card-min-width), 1fr));
        gap: var(--gap-md);
      }

      .copy-toast {
        top: var(--gap-md);
        right: var(--gap-md);
        left: var(--gap-md);
        max-width: none;
      }
    }

    @media (max-width: var(--breakpoint-mobile)) {
      .page-title {
        font-size: var(--typography-font-size-header-lg);
      }

      .page-description {
        font-size: var(--typography-font-size-body-md);
      }

      .stats-row {
        gap: var(--gap-sm);
      }

      .stat-card {
        min-width: var(--size-min-width-xs);
      }

      .stat-value {
        font-size: var(--typography-font-size-body-xl);
      }

      .icons-grid {
        grid-template-columns: repeat(auto-fill, minmax(var(--tab-size-min-width), 1fr));
        gap: var(--gap-sm);
      }

      .icon-card {
        padding: var(--gap-md);
      }

      .icon-visual {
        width: 32px;
        height: 32px;
      }

      .empty-state {
        padding: var(--gap-xl) var(--gap-md);
      }
    }
    </style>
  `;
  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles.replace('<style>', '').replace('</style>', '');
  if (!document.head.querySelector('style[data-icons-showcase]')) {
    styleElement.setAttribute('data-icons-showcase', 'true');
    document.head.appendChild(styleElement);
  }
}

export const IconsCollection = {
  render: () => ({
    components: { IconsShowcase },
    template: '<IconsShowcase />'
  })
};
