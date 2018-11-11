import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    runtime.register();
  }
};
