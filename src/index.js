import storageService from './localStorageService';
import TaskList from './main';

import './styles/index.scss';


document.addEventListener('DOMContentLoaded', () => {
  const tasks = storageService.get();

  new TaskList(tasks);
});
