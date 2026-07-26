/**
 * DOM manipulation utilities
 */

/**
 * Create element with attributes
 */
export function el(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'style') {
      Object.assign(element.style, value);
    } else if (key.startsWith('on')) {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, value);
    } else if (key === 'text') {
      element.textContent = value;
    } else if (key === 'html') {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Query selector wrapper
 */
export function q(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query selector all wrapper
 */
export function qa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Add event listener with cleanup
 */
export function on(el, event, handler, options = false) {
  el.addEventListener(event, handler, options);
  return () => el.removeEventListener(event, handler, options);
}

/**
 * Add class
 */
export function addClass(el, className) {
  el.classList.add(className);
}

/**
 * Remove class
 */
export function removeClass(el, className) {
  el.classList.remove(className);
}

/**
 * Toggle class
 */
export function toggleClass(el, className, force) {
  el.classList.toggle(className, force);
}

/**
 * Has class
 */
export function hasClass(el, className) {
  return el.classList.contains(className);
}

/**
 * Set attribute
 */
export function attr(el, name, value) {
  if (value === undefined) {
    return el.getAttribute(name);
  }
  el.setAttribute(name, value);
}

/**
 * Set data attribute
 */
export function data(el, key, value) {
  if (value === undefined) {
    return el.dataset[key];
  }
  el.dataset[key] = value;
}

/**
 * Show element
 */
export function show(el) {
  el.style.display = '';
}

/**
 * Hide element
 */
export function hide(el) {
  el.style.display = 'none';
}

/**
 * Show toast notification
 */
export function toast(message, duration = 2000) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  
  toastEl.textContent = message;
  addClass(toastEl, 'show');
  
  setTimeout(() => {
    removeClass(toastEl, 'show');
  }, duration);
}

/**
 * Scroll to element
 */
export function scrollTo(el, smooth = true) {
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

/**
 * Request animation frame helper
 */
export function raf(callback) {
  return requestAnimationFrame(callback);
}

/**
 * Emit custom event
 */
export function emit(target, eventName, detail = null) {
  const event = new CustomEvent(eventName, { detail, bubbles: true, cancelable: true });
  target.dispatchEvent(event);
}

/**
 * Listen to custom event
 */
export function listen(target, eventName, handler) {
  target.addEventListener(eventName, handler);
  return () => target.removeEventListener(eventName, handler);
}
