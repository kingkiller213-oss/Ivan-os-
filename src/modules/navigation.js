/**
 * Navigation and view management
 */

let currentView = 'studio';

export function setupNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  
  const navButtons = nav.querySelectorAll('button');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.v;
      switchView(view);
    });
  });
}

export function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('on');
  });
  
  // Show selected view
  const viewEl = document.getElementById(`v-${viewName}`);
  if (viewEl) {
    viewEl.classList.add('on');
    currentView = viewName;
    
    // Update nav indicator
    document.querySelectorAll('#nav button').forEach(btn => {
      btn.setAttribute('aria-current', btn.dataset.v === viewName ? 'true' : 'false');
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}

export function getCurrentView() {
  return currentView;
}
