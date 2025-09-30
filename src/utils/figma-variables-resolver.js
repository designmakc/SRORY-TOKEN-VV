import variablesData from './Basic-variables-full.json' with { type: 'json' };

// 🔧 Конфигурация 🔧
const allVariableData = [variablesData];

// Технические коллекции, которые нужно игнорировать
const IGNORED_COLLECTIONS = [
  'EightShapes Specs',
  'Specs Layout',
  'content'
];

// Иерархия коллекций
// - primitive/theme/adaptive: базовые значения (не используются напрямую в компонентах)
// - semantic: общие токены, ссылаются на базовые (используются в компонентах)
// - component: специфичные токены компонентов, ссылаются на semantic (используются в компонентах)
const COLLECTION_HIERARCHY = {
  SEMANTIC: 'semantic',
  THEME: 'theme',
  ADAPTIVE: 'adaptive',
  PRIMITIVE: 'primitive'
};

// Паттерны для определения компонентных коллекций
// Компонентные коллекции содержат токены специфичные для UI компонентов
const COMPONENT_COLLECTION_PATTERNS = [
  'component',
  'components',
  /Component$/i
];

// 🔧 НЕ РЕДАКТИРОВАТЬ НИЖЕ ЭТОЙ ЛИНИИ 🔧

// Основные lookup карты
const variableMap = new Map();
const collectionMap = new Map();
const modeMap = new Map();
const collectionNameToId = new Map();
const keyMap = new Map();

// Кэш для разрешенных значений
const resolveCache = new Map();

// Обработка коллекций с фильтрацией технических
function processCollections(collections) {
  collections.forEach(collection => {
    // Игнорируем технические коллекции
    if (IGNORED_COLLECTIONS.includes(collection.name)) {
      return;
    }

    collectionMap.set(collection.id, collection);
    collectionNameToId.set(collection.name, collection.id);
    
    // Создаем мапу mode для коллекции
    const modes = {};
    collection.modes.forEach(mode => {
      modes[mode.name] = mode.modeId;
    });
    modeMap.set(collection.name, modes);
    
    // Добавляем переменные в карты
    collection.variables.forEach(variable => {
      variableMap.set(variable.id, variable);
      keyMap.set(variable.key, variable);
    });
  });
}

// Автоматическая обработка всех JSON файлов
allVariableData.forEach(jsonData => {
  if (jsonData?.collections) {
    processCollections(jsonData.collections);
  }
});

// Получение доступных коллекций и их режимов
function getAvailableCollections() {
  const collections = {};
  for (const [collectionName, modes] of modeMap.entries()) {
    const collection = collectionMap.get(collectionNameToId.get(collectionName));
    collections[collectionName] = {
      modes: Object.keys(modes),
      defaultMode: collection.modes.find(m => m.modeId === collection.defaultModeId)?.name,
      id: collection.id,
      isCore: Object.values(COLLECTION_HIERARCHY).includes(collectionName)
    };
  }
  return collections;
}

// Конвертация имен режимов в ID с умными дефолтами
function resolveModeIds(modeConfig = {}) {
  const resolvedModes = {};
  
  // Извлекаем тему и breakpoint из конфига
  const { theme, breakpoint, ...customModes } = modeConfig;
  
  for (const [collectionName, availableModes] of modeMap.entries()) {
    const collection = collectionMap.get(collectionNameToId.get(collectionName));
    let modeId;
    
    // Для Primitive всегда используем дефолтный режим
    if (collectionName === COLLECTION_HIERARCHY.PRIMITIVE) {
      modeId = collection.defaultModeId;
    }
    // Применяем умную логику для специальных коллекций
    else if (collectionName === COLLECTION_HIERARCHY.THEME && theme) {
      modeId = availableModes[theme] || collection.defaultModeId;
    } else if (collectionName === COLLECTION_HIERARCHY.ADAPTIVE && breakpoint) {
      modeId = availableModes[breakpoint] || collection.defaultModeId;
    } else if (customModes[collectionName]) {
      modeId = availableModes[customModes[collectionName]] || collection.defaultModeId;
    } else {
      modeId = collection.defaultModeId;
    }
    
    resolvedModes[collectionName] = modeId;
  }
  
  return resolvedModes;
}

// Конвертация RGB в CSS
function rgbaToCSS(colorObj) {
  if (typeof colorObj !== 'object' || colorObj.type === 'VARIABLE_ALIAS') {
    return colorObj;
  }
  
  const { r, g, b, a = 1 } = colorObj;
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);
  
  return a === 1 
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${a})`;
}

// Добавление единиц измерения к токенам
function addUnits(value, variableName, resolvedType) {
  // Если значение уже строка с единицами - вернуть как есть
  if (typeof value === 'string') return value;
  
  // Если не число - вернуть как есть
  if (typeof value !== 'number') return value;

  // Определяем нужны ли единицы по имени токена и типу
  const name = variableName.toLowerCase();
  
  // Токены которые НЕ должны иметь единицы
  const noUnitsPatterns = [
    'opacity',
    'font-weight',
    'line-height',
    'z-index',
    'flex',
    'order',
    'scale',
    'ratio',
    'count',
    'index'
  ];
  
  // Исключения для border токенов - они ДОЛЖНЫ иметь единицы
  if (name.includes('border-width') || name.includes('border-radius')) {
    return `${value}px`;
  }
  
  // Проверяем паттерны без единиц
  if (noUnitsPatterns.some(pattern => name.includes(pattern))) {
    return value;
  }
  
  // Токены которые должны иметь px (по умолчанию для FLOAT)
  if (resolvedType === 'FLOAT') {
    // Проверяем что это размерная величина
    const sizePatterns = [
      'spacing',
      'padding',
      'margin',
      'gap',
      'size',
      'width',
      'height',
      'radius',
      'border-width', // Специфично для border-width
      'border-radius', // Специфично для border-radius
      'border',
      'offset',
      'inset',
      'top',
      'bottom',
      'left',
      'right',
      'font-size' // Добавляем font-size для размеров шрифта
    ];
    
    // Исключения для line-height (должен оставаться числом)
    if (name.includes('line-height')) {
      return value;
    }
    
    if (sizePatterns.some(pattern => name.includes(pattern))) {
      return `${value}px`;
    }
  }
  
  // По умолчанию возвращаем число как есть
  return value;
}

// Основная функция разрешения переменной с кэшированием
function resolveVariable(variableId, modeConfig = {}, depth = 0) {
  // Защита от бесконечной рекурсии
  if (depth > 10) {
    return null;
  }

  // Создаем ключ кэша
  const cacheKey = `${variableId}-${JSON.stringify(modeConfig)}`;
  if (resolveCache.has(cacheKey)) {
    return resolveCache.get(cacheKey);
  }

  const variable = variableMap.get(variableId);
  if (!variable) {
    return null;
  }

  const collection = collectionMap.get(variable.variableCollectionId);
  if (!collection) {
    return null;
  }

  // Разрешаем режимы для текущего контекста
  const resolvedModes = resolveModeIds(modeConfig);
  const modeId = resolvedModes[collection.name];
  const value = variable.valuesByMode[modeId];

  if (value === null || value === undefined) {
    
    // Возвращаем fallback значения для базовых токенов
    if (variable.name.includes('spacing/space-0')) return 0;
    if (variable.name.includes('border-radius/0')) return 0;
    if (variable.name.includes('border-width/0')) return 0;
    
    return null;
  }

  // Обработка алиасов
  if (value.type === 'VARIABLE_ALIAS') {
    const aliasId = value.id;
    
    // Обработка кросс-JSON ссылок
    if (aliasId.includes('/') && aliasId.startsWith('VariableID:')) {
      const keyPart = aliasId.substring('VariableID:'.length, aliasId.indexOf('/'));
      const referencedVariable = keyMap.get(keyPart);
      
      if (referencedVariable) {
        return resolveVariable(referencedVariable.id, modeConfig, depth + 1);
      } else {
        return null;
      }
    }
    
    // Обычные алиасы
    const result = resolveVariable(aliasId, modeConfig, depth + 1);
    resolveCache.set(cacheKey, result);
    return result;
  }

  // Обработка цветов
  if (variable.resolvedType === 'COLOR') {
    const result = rgbaToCSS(value);
    resolveCache.set(cacheKey, result);
    return result;
  }

  // Добавляем единицы измерения если нужно
  if (variable.resolvedType === 'FLOAT') {
    const result = addUnits(value, variable.name, variable.resolvedType);
    resolveCache.set(cacheKey, result);
    return result;
  }

  // Обработка числовых значений (включая 0)
  if (typeof value === 'number') {
    resolveCache.set(cacheKey, value);
    return value;
  }

  // Возвращаем другие значения
  resolveCache.set(cacheKey, value);
  return value;
}

// Получение переменной по имени
function getVariableByName(name, modeConfig = {}) {
  for (const variable of variableMap.values()) {
    if (variable.name === name) {
      return resolveVariable(variable.id, modeConfig);
    }
  }
  return null;
}

// Поиск переменных по паттерну с фильтрацией
function findVariablesByPattern(pattern, filterByCollection = null) {
  const matches = [];
  
  for (const variable of variableMap.values()) {
    const collection = collectionMap.get(variable.variableCollectionId);
    
    // Фильтруем по коллекции если указано
    if (filterByCollection && collection.name !== filterByCollection) {
      continue;
    }
    
    if (variable.name.includes(pattern)) {
      matches.push({
        name: variable.name,
        id: variable.id,
        type: variable.resolvedType,
        collectionName: collection?.name,
        description: variable.description || ''
      });
    }
  }
  
  return matches;
}


// Получение component токенов с автоматическим обнаружением
// Возвращает токены из semantic и component коллекций
function getComponentTokens(modeConfig = {}) {
  const componentVariables = {};
  
  for (const [varId, variable] of variableMap.entries()) {
    const collection = collectionMap.get(variable.variableCollectionId);
    
    // Пропускаем технические коллекции
    if (!collection || IGNORED_COLLECTIONS.includes(collection.name)) {
      continue;
    }
    
    // Проверяем, соответствует ли коллекция паттернам компонентных коллекций
    const isComponentCollection = COMPONENT_COLLECTION_PATTERNS.some(pattern => {
      if (typeof pattern === 'string') {
        return collection.name.toLowerCase().includes(pattern.toLowerCase());
      }
      return pattern.test(collection.name);
    });
    
    // Проверяем, является ли это semantic коллекцией
    const isSemanticCollection = collection.name === COLLECTION_HIERARCHY.SEMANTIC;
    
    // Проверяем, является ли это базовой коллекцией (primitive/theme/adaptive)
    const isBaseCollection = [
      COLLECTION_HIERARCHY.PRIMITIVE,
      COLLECTION_HIERARCHY.THEME,
      COLLECTION_HIERARCHY.ADAPTIVE
    ].includes(collection.name);
    
    // Включаем токены из semantic и component коллекций
    // Исключаем только primitive/theme/adaptive
    if ((isComponentCollection || isSemanticCollection) && !isBaseCollection) {
      const resolvedValue = resolveVariable(varId, modeConfig);
      if (resolvedValue !== null) {
        componentVariables[variable.name] = resolvedValue;
      }
    }
  }
  
  return componentVariables;
}

/**
 * Преобразование CamelCase в kebab-case
 * Примеры:
 * - radioIcon → radio-icon
 * - maxWidth → max-width
 * - fontSize → font-size
 * 
 * @param {String} str - Строка в CamelCase
 * @returns {String} Строка в kebab-case
 */
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
}

// Функция для определения, нужно ли добавлять 'px' к токену
function shouldAddPxSuffix(tokenName) {
  const pxTokenPatterns = [
    /^spacing\//,
    /^padding\//,
    /^margin\//,
    /^gap\//,
    /^size\//,
    /\/size\//,
    /\/padding\//,
    /\/margin\//,
    /\/gap\//,
    /\/min-width/,
    /\/max-width/,
    /\/min-height/,
    /\/max-height/,
    /border-radius/,
    /border-width/,
    /paragraph-spacing/,
    /checkbox\/size/,
    /checkbox\/padding/,
    /radiobutton\/size/,
    /button\/padding/,
    /button\/text-container\/padding-horizontal/,
    /chips\/size/,
    /chips\/padding/,
    /toggle\/size/,
    /counter\/size/,
    /main-content\/max-width/,
    /main-content\/min-width/
  ];
  
  return pxTokenPatterns.some(pattern => pattern.test(tokenName));
}

// Функция для форматирования значения токена с добавлением 'px' где нужно
function formatTokenValue(tokenName, value) {
  // Если значение уже строка с единицами или var() - оставляем как есть
  if (typeof value === 'string' && (
    value.includes('px') || 
    value.includes('rem') || 
    value.includes('%') || 
    value.includes('var(') ||
    value.includes('em') ||
    value.includes('vh') ||
    value.includes('vw')
  )) {
    return value;
  }
  
  // ✅ ДОБАВИТЬ: Добавление % к opacity токенам
  if (typeof value === 'number' && tokenName.includes('opacity')) {
    return `${value}%`;
  }
  
  // Если это число и токен требует px - добавляем
  if (typeof value === 'number' && shouldAddPxSuffix(tokenName)) {
    return `${value}px`;
  }
  
  return value;
}

/**
 * Генерация CSS переменных из токенов
 * Возвращает строку с CSS переменными для инжекции в :root
 * 
 * Преобразования:
 * - CamelCase → kebab-case (radioIcon → radio-icon)
 * - Слэши → дефисы (spacing/space-8 → spacing-space-8)
 * - Все в нижний регистр
 * 
 * Примеры:
 * - "radiobutton/size/radioIcon/md" → "--radiobutton-size-radio-icon-md"
 * - "button/maxWidth" → "--button-max-width"
 * 
 * @param {Object} modeConfig - Конфигурация режимов (theme, breakpoint)
 * @param {String} prefix - Префикс для CSS переменных (по умолчанию '--')
 * @returns {String} Строка CSS переменных
 */
function generateCSSVariables(modeConfig = {}, prefix = '--') {
  const componentTokens = getComponentTokens(modeConfig);
  
  const cssVars = [];
  
  // Добавляем все токены (semantic + component)
  for (const [name, value] of Object.entries(componentTokens)) {
    // Сначала преобразуем CamelCase в kebab-case, затем заменяем слэши и делаем toLowerCase
    const cssName = camelToKebab(name).replace(/\//g, '-').toLowerCase();
    const formattedValue = formatTokenValue(name, value);
    cssVars.push(`${prefix}${cssName}: ${formattedValue};`);
  }
  
  return cssVars.join('\n');
}

// Очистка кэша (полезно при смене темы/breakpoint)
function clearCache() {
  resolveCache.clear();
}

// Получение информации о текущей конфигурации
function getConfigInfo() {
  return {
    collections: Array.from(collectionMap.values()).map(c => ({
      name: c.name,
      modes: c.modes.map(m => m.name),
      defaultMode: c.modes.find(m => m.modeId === c.defaultModeId)?.name,
      variableCount: c.variables.length,
      isCore: Object.values(COLLECTION_HIERARCHY).includes(c.name)
    })),
    hierarchy: COLLECTION_HIERARCHY,
    ignoredCollections: IGNORED_COLLECTIONS,
    totalVariables: variableMap.size
  };
}

export { 
  // Основные функции
  resolveVariable, 
  getVariableByName, 
  getComponentTokens,
  
  // Утилиты
  getAvailableCollections,
  findVariablesByPattern,
  generateCSSVariables,
  clearCache,
  getConfigInfo,
  
  // Функции форматирования токенов
  shouldAddPxSuffix,
  formatTokenValue,
  camelToKebab,
  
  // Константы
  COLLECTION_HIERARCHY,
  COMPONENT_COLLECTION_PATTERNS,
  
  // Карты (для продвинутого использования)
  variableMap, 
  collectionMap,
  modeMap,
  keyMap
};