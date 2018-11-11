
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    if (NODE_ENV === 'development') {
      runtime.register();
    } else {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }
};
