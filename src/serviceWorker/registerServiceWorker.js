export const registerServiceWorker = NODE_ENV => {
  if ('serviceWorker' in navigator) {
    if (NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ToDoList/sw.js');
      });
    } else {
      navigator.serviceWorker.register('/ToDoList/sw.js');
    }
  }
};
