import variablesData from './Basic-variables-full.json' with { type: 'json' };

// 🔧 Конфигурация 🔧
const allVariableData = [variablesData];

// Технические коллекции, которые нужно игнорировать
const IGNORED_COLLECTIONS = [
  'EightShapes Specs',
  'Specs Layout',
  'content'
];

// Иерархия коллекций (от верхнего уровня к базовому)
const COLLECTION_HIERARCHY = {
  SEMANTIC: 'semantic',
  THEME: 'theme',
  ADAPTIVE: 'adaptive',
  PRIMITIVE: 'primitive'
};

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

// Получение всех семантических токенов (основная рабочая коллекция)
function getSemanticTokens(modeConfig = {}) {
  const semanticVariables = {};
  const semanticCollectionId = collectionNameToId.get(COLLECTION_HIERARCHY.SEMANTIC);
  
  if (!semanticCollectionId) {
    return semanticVariables;
  }
  
  for (const variable of variableMap.values()) {
    if (variable.variableCollectionId === semanticCollectionId) {
      const value = resolveVariable(variable.id, modeConfig);
      if (value !== null) {
        semanticVariables[variable.name] = value;
      }
    }
  }
  
  return semanticVariables;
}

// Получение component токенов
function getComponentTokens(modeConfig = {}) {
  const componentVariables = {};
  
  // Ищем все переменные, которые начинаются с component/ или содержат counter/
  for (const [varId, variable] of variableMap.entries()) {
    const collection = collectionMap.get(variable.collectionId);
    
    // Проверяем, что это component коллекция ИЛИ токен начинается с component/, counter/, checkbox/
    const isComponentCollection = collection && collection.name.toLowerCase().includes('component');
    const isCounterToken = variable.name.startsWith('counter/');
    const isComponentToken = variable.name.startsWith('component/');
    const isCheckboxToken = variable.name.startsWith('checkbox/');
    
    if (isComponentCollection || isCounterToken || isComponentToken || isCheckboxToken) {
      const resolvedValue = resolveVariable(varId, modeConfig);
      if (resolvedValue !== null) {
        componentVariables[variable.name] = resolvedValue;
      }
    }
  }
  
  return componentVariables;
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
  
  // Если это число и токен требует px - добавляем
  if (typeof value === 'number' && shouldAddPxSuffix(tokenName)) {
    return `${value}px`;
  }
  
  return value;
}

// Генерация CSS переменных из семантических токенов
function generateCSSVariables(modeConfig = {}, prefix = '--') {
  const semanticTokens = getSemanticTokens(modeConfig);
  const componentTokens = getComponentTokens(modeConfig);
  
  
  const cssVars = [];
  
  // Добавляем semantic токены
  for (const [name, value] of Object.entries(semanticTokens)) {
    const cssName = name.replace(/\//g, '-').toLowerCase();
    const formattedValue = formatTokenValue(name, value);
    cssVars.push(`${prefix}${cssName}: ${formattedValue};`);
  }
  
  // Добавляем component токены
  for (const [name, value] of Object.entries(componentTokens)) {
    const cssName = name.replace(/\//g, '-').toLowerCase();
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
  getSemanticTokens,
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
  
  // Константы
  COLLECTION_HIERARCHY,
  
  // Карты (для продвинутого использования)
  variableMap, 
  collectionMap,
  modeMap,
  keyMap
};