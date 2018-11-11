export const registerServiceWorker = NODE_ENV => {
  if ('serviceWorker' in navigator) {
    if (NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    } else {
      navigator.serviceWorker.register('/ToDoList/service-worker.js');
    }
  }
};
