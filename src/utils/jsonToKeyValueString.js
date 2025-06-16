// utils/jsonToKeyValueString.js
// Devuelve un string con clave: valor por cada propiedad del objeto JSON

export function jsonToKeyValueString(obj) {
  if (!obj || typeof obj !== 'object') return ''
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${typeof value === 'object' && value !== null ? JSON.stringify(value) : value}`)
    .join('\n')
}
