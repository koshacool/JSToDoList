import runtime from 'serviceworker-webpack-plugin/lib/runtime';


export const registerServiceWorker = NODE_ENV => {
  if ('serviceWorker' in navigator) {
    if (NODE_ENV === 'development') {
      runtime.register();
    } else {
      navigator.serviceWorker.register('./sw.js');
    }
  }
};
