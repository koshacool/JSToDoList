const TASKS_DB_NAME = 'localstorageTasks';

class LocalStorageService {
  constructor () {
    const tasks = JSON.parse(localStorage.getItem(TASKS_DB_NAME));

    if (!tasks) {
      localStorage.setItem(TASKS_DB_NAME, JSON.stringify([]));
    }
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
