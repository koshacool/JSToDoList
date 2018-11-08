import storageService from './modules/localStorage/localStorageService';
import TaskList from './modules/taskList/taskList';

import './styles/index.scss';


document.addEventListener('DOMContentLoaded', () => {
  const tasks = storageService.get();

  new TaskList(tasks);
});
