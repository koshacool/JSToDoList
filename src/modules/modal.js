import Task from './task/task';
import { taskTypes } from './task/constants';


const ERROR_CLASS_NAME = 'validation-error';

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

  createTaskForm (task = {}) {
    const { id = '', title = '', description = '', status = '' } = task;
    const $modalBody = document.getElementById('modal-body');
    const $typesBlock = this.createTypesSelect(task);

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
    `;
    $formBlock.appendChild($typesBlock);

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

  createTypesSelect ({ type = '' }) {
    const $typesBlock = document.createElement('div');
    $typesBlock.className = 'form-group';
    $typesBlock.innerHTML = `
      <label for="type"><i class="fa fa-car"></i> Task Type</label>
    `;

    const $select = document.createElement('select');
    $select.className = 'form-control';
    $select.setAttribute('name', 'type');

    Object.values(taskTypes).forEach(taskType => {
      const $option = document.createElement('option');
      $option.setAttribute('value', taskType);

      if (taskType === type) {
        $option.setAttribute('selected', 'selected');
      }

      $option.innerHTML = taskType;
      $select.appendChild($option);
    });

    $typesBlock.appendChild($select);

    return $typesBlock;
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
    task.save()
      .then(({ task }) => {
        this.callback && this.callback(task);
        this.close();
      })
      .catch(({ message, notValidFields }) => {
        for (let i = 0; i < formInputs.length; i++) {
          const { name } = formInputs[i];

          this.highlightInput(formInputs[i], notValidFields[name]);
        }

        // TODO: implement popup to show error message
        alert(message);
      });
  }

  onInputKeyUp ({ target }) {
    const { name, value } = target;
    const isValid = Task.validateField(name, value);

    this.highlightInput(target, isValid);
  }

  highlightInput ($input, isValid) {
    if (!isValid) {
      $input.classList.add(ERROR_CLASS_NAME);
    } else {
      $input.classList.remove(ERROR_CLASS_NAME);
    }
  }
}

const modalController = new FormModal();

export default modalController;
