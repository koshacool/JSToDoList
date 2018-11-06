import Task from './task';


const ERROR_CLASS_NAME = 'validation-error';
const taskTypes = {
  learning: 'learning',
  shopping: 'shopping',
  traveling: 'traveling',
  sport: 'sport',
};

class FormModal {
  constructor () {
    this.$rootComponent = null;

    this.initModal = this.initModal.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.createTaskForm = this.createTaskForm.bind(this);
    this.onInputKeyUp = this.onInputKeyUp.bind(this);

    this.initModal();
    this.initEventListeners();
  }

  initModal () {
    const $mainBlock = document.getElementById('app');
    const $modal = document.createElement('div');

    $modal.className = 'modal';
    $modal.id = 'form-modal';
    $modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span id="modal-close" class="close">&times;</span>
          <h2 id="modal-title" class="modal-title">Modal title</h2>
        </div>
        <div id="modal-body" class="modal-body"></div>
        <div class="modal-footer">
          <button id="form-modal-save" class="button">Save</button>
        </div>
      </div>
  `;

    $mainBlock.appendChild($modal);

    this.$rootComponent = document.getElementById('form-modal');
  }

  initEventListeners () {
    const $closeButton = document.getElementById('modal-close');
    const $saveButton = document.getElementById('form-modal-save');

    $closeButton.addEventListener('click', this.close);
    $saveButton.addEventListener('click', this.saveForm);
  }

  createTaskForm ({ id = '', title = '', type = '', description = '', status = '' }) {
    const $modalBody = document.getElementById('modal-body');
    const $formBlock = document.createElement('form');

    $formBlock.className = 'task-form';
    $formBlock.id = 'task-form';

    $formBlock.innerHTML = `
      <div class="form-group">
        <label for="title"><i class="fa fa-car"></i> Title</label>
        <input type="text" class="form-input" id="title" 
          name="title" placeholder="Enter title" value=${title}>
      </div>
      <div class="form-group">
        <label for="description"><i class="fa fa-car"></i> Description</label>
        <textarea rows="4" cols="100" name="description" form="task-form" 
          name="description" id="description">
          ${description}
        </textarea>
      </div>
      <div class="form-group">
        <label for="type"><i class="fa fa-car"></i> Task Type</label>
        <select class="form-control" id="type" name="type" value=${type}>
          <option selected=${taskTypes.learning === type} value=${taskTypes.learning}>
            ${taskTypes.learning}
           </option>
          <option selected=${taskTypes.shopping === type} value=${taskTypes.shopping}>
            ${taskTypes.shopping}
          </option>
          <option selected=${taskTypes.traveling === type} value=${taskTypes.traveling}>
            ${taskTypes.traveling}
          </option>
          <option selected=${taskTypes.sport === type} value=${taskTypes.sport}>
            ${taskTypes.sport}
          </option>
        </select>
       </div>
    `;

    if (id) {
      const $idInput = document.createElement('input');

      $idInput.type = 'hidden';
      $idInput.className = 'task-id';
      $idInput.setAttribute('value', id);
      $idInput.setAttribute('name', 'id');

      $formBlock.appendChild($idInput);
    }

    if (status) {
      const $statusInput = document.createElement('input');

      $statusInput.type = 'hidden';
      $statusInput.className = 'task-status';
      $statusInput.setAttribute('value', status);
      $statusInput.setAttribute('name', 'status');

      $formBlock.appendChild($statusInput);
    }

    if ($modalBody.hasChildNodes()) {
      $modalBody.firstChild.replaceWith($formBlock);
    } else {
      $modalBody.appendChild($formBlock);
    }

    const formInputs = document.getElementById('task-form').elements;

    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener('keyup', this.onInputKeyUp);
    }
  }

  open (callback,  data = {}) {
    this.callback = callback;
    const $modalTitle = document.getElementById('modal-title');

    if (data.id) {
      $modalTitle.innerHTML = 'Edit Task';
    } else {
      $modalTitle.innerHTML = 'Create Task';
    }

    this.createTaskForm(data);

    this.$rootComponent.style.display = 'block';
  }

  close () {
    this.callback = null;
    this.$rootComponent.style.display = 'none';
  }

  saveForm () {
    const taskData = {};
    const formInputs = document.getElementById('task-form').elements;

    for (let i = 0; i < formInputs.length; i++) {
      const { name, value } = formInputs[i];
      taskData[name] = value;
    }

    const task = new Task(taskData);
    const { error, notValidFields, task: newTask } = task.save();

    if (!error) {
      this.callback && this.callback(newTask);
      this.close();
    } else {
      for (let i = 0; i < formInputs.length; i++) {
        const { name } = formInputs[i];

        this.highlightInput(formInputs[i], notValidFields[name]);
      }
    }
  }

  onInputKeyUp ({ target }) {
    const { name, value } = target;
    const isValid = Task.validateField(name, value);

    this.highlightInput(target, isValid);
  }

  highlightInput ($input, isValid) {
    if (!isValid) {
      $input.className = `${$input.className} ${ERROR_CLASS_NAME}`;
      return;
    }

    $input.classList.remove(ERROR_CLASS_NAME);
  }

}

const modalController = new FormModal();

export default modalController;
