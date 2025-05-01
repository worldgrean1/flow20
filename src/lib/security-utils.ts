/**
 * Security Utilities for Browser Protection
 * Prevents unauthorized code inspection and tampering
 */

/**
 * Disables various browser debugging capabilities
 */
export function disableDevTools() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
  document.addEventListener('keydown', (e) => {
    // F12 key
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C
    if (
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      // For Mac: Command+Option+I or Command+Option+J or Command+Option+C
      (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Monitor for devtools opening via window size changes
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  
  if (widthThreshold || heightThreshold) {
    console.clear();
    document.body.innerHTML = '<h1>Developer tools detected. Please close developer tools to continue.</h1>';
  }

  // Setup continuous monitoring for devtools
  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      console.clear();
      document.body.innerHTML = '<h1>Developer tools detected. Please close developer tools to continue.</h1>';
    }
  }, 1000);

  // Detect if Console is open
  const detectConsole = () => {
    const startTime = new Date();
    console.log('%c', 'font-size:0;padding:' + Array(1000000).join(' '));
    const endTime = new Date();
    
    if (endTime.getTime() - startTime.getTime() > 50) {
      console.clear();
      document.body.innerHTML = '<h1>Console detected. Please close developer tools to continue.</h1>';
    }
  };

  // Run console detection occasionally
  setInterval(detectConsole, 2000);

  // Anti-debugging technique
  setInterval(() => {
    const dummy = new Function('debugger');
    dummy();
  }, 100);

  // Clear console logs
  console.clear();
  
  // Overwrite console methods
  if (process.env.NODE_ENV === 'production') {
    const noop = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml'] as const;
    
    methods.forEach((method) => {
      (console[method] as any) = noop;
    });
  }
}

/**
 * Protection against source code viewing
 */
export function preventSourceViewing() {
  // Adding a custom error handler to catch errors
  window.addEventListener('error', function(e) {
    // If the error is related to devtools or debugging, reload the page
    if (e.message && (
      e.message.includes('script') || 
      e.message.includes('debugger') ||
      e.message.includes('inspect')
    )) {
      window.location.reload();
    }
    return false;
  }, true);
  
  // Obfuscate code by adding this to the global scope
  Object.defineProperty(window, '_phantom', {
    get: function() {
      window.location.reload();
      return true;
    },
    configurable: false
  });

  // Check for Firebug
  Object.defineProperty(window, 'firebug', {
    get: function() {
      window.location.reload();
      return true;
    },
    configurable: false
  });
  
  // React DevTools detection
  const win = window as any;
  if (typeof win.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    Object.keys(win.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(key => {
      // Don't block completely to avoid breaking React, just disable functionality
      if (typeof win.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] === 'function') {
        win.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = () => {};
      }
    });
  }
}

/**
 * Activate all security features
 * Call this function on application startup
 */
export function activateSecurityFeatures() {
  // Check if we are in a browser environment
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      // Only enable in production mode
      disableDevTools();
      preventSourceViewing();
      
      // Additional protection
      document.addEventListener('DOMContentLoaded', () => {
        document.body.style.userSelect = 'none'; // Prevent text selection
      });
    }
  }
} 