class FormModal {
  constructor () {
    this.$rootComponent = null;

    this.initModal = this.initModal.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.createTaskForm = this.createTaskForm.bind(this);

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

  open (data) {
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
    this.$rootComponent.style.display = 'none';
  }

  saveForm () {
    // TODO: need to implement form validation and saving data
    this.close();
  }

  createTaskForm ({ id = '', title = '', type = '', description = '' }) {
    const $modalBody = document.getElementById('modal-body');
    const $formBlock = document.createElement('form');

    $formBlock.className = 'task-form';
    $formBlock.id = 'task-form';

    $formBlock.innerHTML = `
      <div class="form-group">
        <label for="title"><i class="fa fa-car"></i> Title</label>
        <input type="text" class="form-input" id="title" placeholder="Enter title" value=${title}>
      </div>
      <div class="form-group">
        <label for="type"><i class="fa fa-car"></i> Task Type</label>
        <input type="select" class="form-control" id="type" placeholder="Select type" value=${type}>
       </div>
      <div class="form-group">
        <label for="description"><i class="fa fa-car"></i> Description</label>
        <textarea rows="4" cols="100" name="comment" form="task-form" id="description">
          ${description}
        </textarea>
      </div>
    `;

    if (id) {
      const $idInput = document.createElement('input');

      $idInput.type = 'hidden';
      $idInput.className = 'task-id';
      $idInput.setAttribute('value', id);

      $formBlock.appendChild($idInput);
    }

    if ($modalBody.hasChildNodes()) {
      $modalBody.firstChild.replaceWith($formBlock);
    } else {
      $modalBody.appendChild($formBlock);
    }
  }
}

const modalController = new FormModal();

export default modalController;
