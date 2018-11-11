import storageService from './localStorage/localStorageService';
import TaskList from './taskList/taskList';
import { registerServiceWorker } from './serviceWorker/registerServiceWorker';

import './styles/index.scss';


registerServiceWorker(process.env.NODE_ENV);
document.addEventListener('DOMContentLoaded', () => {
  const tasks = storageService.get();
  new TaskList(tasks);
});
