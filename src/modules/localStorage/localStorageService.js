const TASKS_DB_NAME = 'localstorageTasks';

class LocalStorageService {
  constructor () {
    let tasks = JSON.parse(localStorage.getItem(TASKS_DB_NAME));

    if (!tasks) {
      tasks = [];
      localStorage.setItem(TASKS_DB_NAME, JSON.stringify(tasks));
    }

    this.tasks = tasks;
  }

  get () {
    return JSON.parse(localStorage.getItem(TASKS_DB_NAME));
  }

  set (data) {
    return localStorage.setItem(TASKS_DB_NAME, JSON.stringify(data));
  }

  clear () {
    localStorage.setItem(TASKS_DB_NAME, JSON.stringify([]));
  }
}

const storageService = new LocalStorageService();

export default storageService;
