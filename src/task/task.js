import storageService from '../localStorageService';
import { generateId } from '../utils';
import { taskSchema, taskStatuses } from './constants';

const saveAction = {
  update: 'update',
  create: 'create',
};

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
    const result = this.validate();
    const task = { ...this.taskObj };

    if (result.error)  {
      return result;
    }

    if (this.saveAction === saveAction.create) {
      tasks.push(task);    
    } else {
      const taskIndex = tasks.findIndex(({ id }) => id === task.id);

      tasks[taskIndex] = task;
    }
    
    storageService.set(tasks);

    return { task };
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
      }
    });

    return validationResult;
  }
}

export default Task;
