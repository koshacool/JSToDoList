import { generateId } from './utils';


const taskSchema = {
  id: {
    type: 'string',
  },

  title: {
    type: 'string',
    isRequired: true,
  },

  type: {
    type: 'string',
    isRequired: true,
  },

  description: {
    type: 'string',
    isRequired: true,
  },

  status: {
    type: 'string',
  },
};

const TASKS_DB_NAME = 'localstorageTasks';

class Task {
  constructor ({ id, title, type, description, status = 'opened' }) {
    this.taskObj = {
      id: id || generateId(),
      title,
      type,
      description,
      status,
    };

    this.saveAction = id ? 'update' : 'create';
  }

  save () {
    const tasks = JSON.parse(localStorage.getItem(TASKS_DB_NAME));
    const result = this.validate();
    const task = { ...this.taskObj };

    if (result.error)  {
      return result;
    }

    if (this.saveAction === 'create') {
      tasks.push(task);    
    } else {
      const taskIndex = tasks.findIndex(({ id }) => id === task.id);

      tasks[taskIndex] = task;
    }

    
    localStorage.setItem(TASKS_DB_NAME, JSON.stringify(tasks));

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
