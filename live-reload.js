// Live reload functionality - uses both file checking and EventSource when available
(function() {
  // Allow disabling through console: window.stopLiveReload = true;
  window.stopLiveReload = window.stopLiveReload || false;

  if (window.stopLiveReload) {
    console.log('Live reload is disabled. To enable, set window.stopLiveReload = false;');
    return;
  }

  console.log('Live reload script initialized');
  
  // Try to use EventSource (better) if available
  if (typeof EventSource !== 'undefined') {
    console.log('Using EventSource for live reload');
    const source = new EventSource('http://localhost:35729/livereload');
    
    source.onmessage = function(event) {
      if (event.data === 'reload') {
        console.log('Live reload: Changes detected, reloading page...');
        window.location.reload();
      }
    };
    
    source.onerror = function() {
      console.log('Live reload: EventSource connection failed, falling back to polling');
      source.close();
      startPolling();
    };
  } else {
    console.log('EventSource not supported, using polling for live reload');
    startPolling();
  }
  
  // Fallback polling method
  function startPolling() {
    // Check for changes every 2 seconds
    const RELOAD_INTERVAL = 2000;
    
    // Initialize with the current timestamp
    let lastModified = new Date().getTime();
    
    // Function to check if page has been modified
    function checkForChanges() {
      fetch(window.location.href, {
        method: 'HEAD',
        cache: 'no-store'
      })
      .then(response => {
        const serverLastModified = response.headers.get('Last-Modified');
        if (serverLastModified) {
          const serverTime = new Date(serverLastModified).getTime();
          
          // If the page has been modified since our last check
          if (serverTime > lastModified) {
            console.log('Live reload: Changes detected, reloading page...');
            lastModified = serverTime;
            window.location.reload();
          }
        }
      })
      .catch(error => {
        console.error('Live reload: Error checking for changes:', error);
      });
    }
    
    // Start the periodic check
    setInterval(checkForChanges, RELOAD_INTERVAL);
    console.log('Live reload polling initialized. Checking for changes every', RELOAD_INTERVAL/1000, 'seconds');
  }
})();