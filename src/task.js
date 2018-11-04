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

class Task {
  constructor ({ id = generateId(), title, type, description }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.description = description;
  }

  save () {
    const result = this.validate();

    if (result.error)  {
      return result;
    }

    // TODO: implement saving
    // return this.save();
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
      const isValid = Task.validateField(fieldName, this[fieldName]);

      validationResult.notValidFields[fieldName] = isValid;

      if (!isValid) {
        validationResult.error = true;
      }
    });

    return validationResult;
  }
}

export default Task;
