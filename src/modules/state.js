/**
 * State management - persistence and data structure
 */

const K5 = 'ivanos:v5';
const OLD = ['ivanos:v4', 'ivanos:v3', 'ivanos:v2'];
const OLDAUDIO = 'ivanos:audio:';

export let state = {
  songs: [],
  album: { title: 'Untitled Album', notes: '', tracks: [] },
  focusId: null,
  sessions: [],
  activity: {},
  quickNote: '',
  goals: [],
  gear: [],
  software: [],
  wishlist: [],
  insights: []
};

export const files = {}; // versionId -> {url, name, ext, type}
export const buffers = {}; // versionId -> AudioBuffer
export const player = { songId: null, verId: null, playing: false, engine: 'element', volume: 1, rate: 1 };

let saveTimeout = null;

/**
 * Load state from storage
 */
export async function loadState() {
  for (const key of [K5].concat(OLD)) {
    try {
      const r = await window.storage?.get?.(key);
      if (r && r.value) {
        const parsed = JSON.parse(r.value);
        state = migrate(parsed, key);
        normalize();
        if (key !== K5) {
          await cleanupOldAudio();
          await saveState();
        }
        return;
      }
    } catch (e) {
      console.warn(`Failed to load state from ${key}:`, e);
    }
  }
  normalize();
}

/**
 * Migrate from older versions
 */
function migrate(d, key) {
  if (key === K5) return d;
  const map = { 0: 0, 1: 2, 2: 1, 3: 5, 4: 7, 5: 10 };
  (d.songs || []).forEach((s) => {
    s.stage = map[s.stage] !== undefined ? map[s.stage] : 0;
    (s.audio || []).forEach((v) => {
      v.status = map[v.status] !== undefined ? map[v.status] : 0;
    });
  });
  return d;
}

/**
 * Cleanup old audio entries
 */
async function cleanupOldAudio() {
  try {
    const r = await window.storage?.list?.(OLDAUDIO);
    if (r && r.keys) {
      for (const k of r.keys) {
        try {
          await window.storage.delete(k);
        } catch (e) {
          console.warn(`Failed to delete old audio key ${k}:`, e);
        }
      }
    }
  } catch (e) {
    console.warn('Failed to cleanup old audio:', e);
  }
}

/**
 * Persist state to storage
 */
export async function saveState() {
  try {
    await window.storage?.set?.(K5, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

/**
 * Queue a save operation (debounced)
 */
export function queueSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveState, 400);
}

/**
 * Normalize state structure
 */
function normalize() {
  if (!Array.isArray(state.songs)) state.songs = [];
  if (!state.album) state.album = { title: 'Untitled Album', notes: '', tracks: [] };
  if (!Array.isArray(state.album.tracks)) state.album.tracks = [];
  
  ['sessions', 'goals', 'gear', 'software', 'wishlist', 'insights'].forEach((k) => {
    if (!Array.isArray(state[k])) state[k] = [];
  });
  
  if (!state.activity || typeof state.activity !== 'object') state.activity = {};
  if (typeof state.quickNote !== 'string') state.quickNote = '';
}

/**
 * Initialize app (called after state is loaded)
 */
export function initializeApp() {
  // Any additional initialization can happen here
}
