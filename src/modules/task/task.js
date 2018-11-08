import storageService from '../localStorage/localStorageService';
import { generateId } from '../utils';
import { taskSchema, taskStatuses, saveAction } from './constants';

class Task {
  constructor ({ id, title, type, description, status = taskStatuses.opened }) {
    this.taskObj = {
      id: id || generateId(),
      title,
      type,
      description,
      status,
    };

    this.saveAction = id ? saveAction.update : saveAction.create;
  }

  save () {
    const tasks = storageService.get();
    const validationResult = this.validate();
    const task = { ...this.taskObj, updatedAt: new Date() };

    return new Promise((resolve, reject) => {
      if (validationResult.error)  {
        reject(validationResult);
      }

      if (this.saveAction === saveAction.create) {
        tasks.push(task);
      } else {
        const taskIndex = tasks.findIndex(({ id }) => id === task.id);

        tasks[taskIndex] = task;
      }

      storageService.set(tasks);
      resolve({ task });
    });
  }

  static remove (taskId) {
    const tasks = storageService.get();
    const newTasks = tasks.filter(({ id }) => id !== taskId);

    return new Promise((resolve, reject) => {
      try {        
        storageService.set(newTasks);
        resolve(newTasks);
      } catch (error) {
        reject(error);
      }
    });
  }

  static removeAll () {
    return new Promise((resolve, reject) => {
      try {        
        storageService.clear();
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }



  static finishAll () {    
    const tasks = storageService.get();
    const savePromises = tasks.map(task => {
      const newTask = new Task({
        ...task,
        status: taskStatuses.completed,
      });

      return newTask.save();            
    });

    return Promise.all(savePromises);
  }


  static validateField (name, value) {
    if (
      (taskSchema[name].isRequired && !value.trim())
      || typeof value !== taskSchema[name].type
    ) {
      return false;
    }

    return true;
  }

  validate () {
    const validationResult = {
      notValidFields: {},
    };

    Object.keys(taskSchema).forEach(fieldName => {
      const isValid = Task.validateField(fieldName, this.taskObj[fieldName]);

      validationResult.notValidFields[fieldName] = isValid;

      if (!isValid) {
        validationResult.error = true;
        validationResult.message = 'Not valid field';
      }
    });

    return validationResult;
  }
}

export default Task;
