/**
 * Получить список всех доступных иконок
 * @returns {Array<{label: string, value: string, category: string}>}
 */
export function getIconOptions() {
  const icons = import.meta.glob('/src/assets/icon/**/*.svg', { eager: true });
  
  return Object.keys(icons)
    .map(path => {
      // Извлекаем путь после /src/assets/icon/
      const match = path.match(/\/src\/assets\/icon\/(.+)\.svg$/);
      if (!match) return null;
      
      const fullPath = match[1];
      const parts = fullPath.split('/');
      const category = parts[0];
      const name = parts.slice(1).join('/');
      
      return {
        label: `${category}/${name}`,
        value: fullPath,
        category: category
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Получить иконки сгруппированные по категориям
 * @returns {Object<string, Array<{label: string, value: string}>>}
 */
export function getIconsByCategory() {
  const icons = getIconOptions();
  
  return icons.reduce((acc, icon) => {
    if (!acc[icon.category]) {
      acc[icon.category] = [];
    }
    acc[icon.category].push({
      label: icon.label,
      value: icon.value
    });
    return acc;
  }, {});
}

/**
 * Получить список категорий
 * @returns {Array<string>}
 */
export function getCategories() {
  const iconsByCategory = getIconsByCategory();
  return Object.keys(iconsByCategory).sort();
}
