/**
 * Event system for app-wide communication
 */

const listeners = {};

/**
 * Subscribe to an event
 */
export function on(event, callback) {
  if (!listeners[event]) {
    listeners[event] = [];
  }
  listeners[event].push(callback);
  
  // Return unsubscribe function
  return () => {
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  };
}

/**
 * Emit an event
 */
export function emit(event, data) {
  if (!listeners[event]) return;
  listeners[event].forEach(callback => {
    try {
      callback(data);
    } catch (error) {
      console.error(`Error in event listener for ${event}:`, error);
    }
  });
}

/**
 * Subscribe once
 */
export function once(event, callback) {
  const unsubscribe = on(event, (data) => {
    callback(data);
    unsubscribe();
  });
  return unsubscribe;
}

/**
 * Clear all listeners for an event
 */
export function clear(event) {
  if (event) {
    delete listeners[event];
  } else {
    Object.keys(listeners).forEach(key => delete listeners[key]);
  }
}

/**
 * App events
 */
export const EVENTS = {
  SONG_CREATED: 'song:created',
  SONG_UPDATED: 'song:updated',
  SONG_DELETED: 'song:deleted',
  SONG_SELECTED: 'song:selected',
  
  ALBUM_UPDATED: 'album:updated',
  ALBUM_TRACK_ADDED: 'album:track:added',
  ALBUM_TRACK_REMOVED: 'album:track:removed',
  
  AUDIO_LOADED: 'audio:loaded',
  AUDIO_PLAYING: 'audio:playing',
  AUDIO_PAUSED: 'audio:paused',
  AUDIO_STOPPED: 'audio:stopped',
  
  SESSION_STARTED: 'session:started',
  SESSION_ENDED: 'session:ended',
  SESSION_LOGGED: 'session:logged',
  
  STATE_CHANGED: 'state:changed',
  STATE_SAVED: 'state:saved',
  
  VIEW_CHANGED: 'view:changed',
  NAV_CLICKED: 'nav:clicked',
  
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};
