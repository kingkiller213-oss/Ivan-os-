/**
 * Central state management with persistence
 */

import * as events from './events.js';

const STORAGE_KEY = 'ivan-os-state';

let state = {
  songs: [],
  albums: [],
  sessions: [],
  gear: [],
  settings: {
    theme: 'dark',
    autoSave: true,
    notifications: true
  }
};

/**
 * Initialize state from storage
 */
export function init() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      state = JSON.parse(stored);
      events.emit(events.EVENTS.STATE_CHANGED, state);
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
}

/**
 * Get entire state
 */
export function getState() {
  return JSON.parse(JSON.stringify(state));
}

/**
 * Get state property
 */
export function get(path) {
  const parts = path.split('.');
  let value = state;
  for (const part of parts) {
    if (value === null || value === undefined) return undefined;
    value = value[part];
  }
  return value;
}

/**
 * Set state property
 */
export function set(path, value) {
  const parts = path.split('.');
  const lastPart = parts.pop();
  let obj = state;
  
  for (const part of parts) {
    if (!(part in obj)) obj[part] = {};
    obj = obj[part];
  }
  
  obj[lastPart] = value;
  save();
  events.emit(events.EVENTS.STATE_CHANGED, state);
}

/**
 * Update state object
 */
export function update(path, updates) {
  const current = get(path);
  const merged = { ...current, ...updates };
  set(path, merged);
}

/**
 * Add item to array
 */
export function push(path, item) {
  const arr = get(path) || [];
  arr.push(item);
  set(path, arr);
  return item;
}

/**
 * Remove item from array
 */
export function remove(path, predicate) {
  const arr = get(path) || [];
  const filtered = arr.filter(item => !predicate(item));
  set(path, filtered);
}

/**
 * Save state to storage
 */
export function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    events.emit(events.EVENTS.STATE_SAVED, state);
  } catch (error) {
    console.error('Failed to save state:', error);
    events.emit(events.EVENTS.ERROR, { message: 'Failed to save data' });
  }
}

/**
 * Clear all state
 */
export function clear() {
  state = {
    songs: [],
    albums: [],
    sessions: [],
    gear: [],
    settings: {
      theme: 'dark',
      autoSave: true,
      notifications: true
    }
  };
  save();
}

/**
 * Export state as JSON
 */
export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

/**
 * Import state from JSON
 */
export function importJSON(jsonString) {
  try {
    const imported = JSON.parse(jsonString);
    state = { ...state, ...imported };
    save();
    return true;
  } catch (error) {
    console.error('Failed to import state:', error);
    return false;
  }
}

/**
 * Get storage size in bytes
 */
export function getStorageSize() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Blob([data]).size : 0;
  } catch {
    return 0;
  }
}

// Auto-save on changes
export function enableAutoSave(interval = 5000) {
  setInterval(save, interval);
}
