import { loadState, initializeApp } from './modules/state.js';
import { renderShell } from './modules/shell.js';
import { setupNavigation } from './modules/navigation.js';
import { setupAudioHandlers } from './modules/audio.js';

/**
 * Main application initialization
 */
async function boot() {
  try {
    // Load persisted state from storage
    await loadState();
    
    // Render the shell/layout
    const appEl = document.getElementById('app');
    renderShell(appEl);
    
    // Initialize navigation
    setupNavigation();
    
    // Setup audio event handlers
    setupAudioHandlers();
    
    // Setup any remaining features
    initializeApp();
    
    console.log('✓ Ivan OS loaded successfully');
  } catch (error) {
    console.error('Failed to boot Ivan OS:', error);
    document.getElementById('app').innerHTML = '<div class="empty"><h2>Error Loading App</h2><p>' + error.message + '</p></div>';
  }
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
