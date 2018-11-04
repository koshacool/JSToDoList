import modalController from './modal';
import { capitalize } from './utils';

import './styles/index.scss';

const mainActionsBlockId = 'main-page__actions';
const addButtonClass = 'add-task';
const finishAllButtonClass = 'finish-all-tasks';
const removeAllButtonClass = 'remove-all-tasks';

// Filters buttons
const taskTypeSelectId = 'filters__task-type';
const inputFilterId = 'filters__search';
const filterButtonsBlockId = 'filters__buttons';
const filterButtonsClasses = {
  all: 'show-all',
  opened: 'show-opened',
  completed: 'show-completed',
};

const listBlockId = 'tasks-list';

const mockTasks = [
  {
    id: '1',
    title: 'test1',
    type: 'sport',
    description: 'Test 1 asfa asf asdfa blah blah blah',
  },
  {
    id: '2',
    title: 'test2',
    type: 'sport',
    description: 'Test 2 asfa asf asdfa blah blah blah',
    status: 'finished'
  },
  {
    id: '3',
    title: 'test3',
    type: 'sport',
    description: 'Test3 asfa asf asdfa blah blah blah',
  }
];

document.addEventListener('DOMContentLoaded', () => {
  new TaskList();
});

class TaskList {
  constructor (...props) {
    this.tasks = props.tasks || mockTasks;

    this.filtersState = {
      button: filterButtonsClasses.all,
      type: 'shopping',
      text: '',
    };

    this.initCommonStructure();

    this.$mainActionsBlock = document.getElementById(mainActionsBlockId);

    this.$taskTypeSelect = document.getElementById(taskTypeSelectId);
    this.$inputFilter = document.getElementById(inputFilterId);
    this.$filterButtonsBlock = document.getElementById(filterButtonsBlockId);

    this.$listBlock = document.getElementById(listBlockId);

    this.onClickFilterButtons = this.onClickFilterButtons.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onInput = this.onInput.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);

    this.renderTasks();
    this.initEventListeners();

  }

  initCommonStructure () {
    const activeButton = this.filtersState.button;
    const $mainBlock = document.getElementById('app');
    const $taskList = document.createElement('div');

    $taskList.className = 'task-list-container';
    $taskList.id = 'task-list-container';
    $taskList.innerHTML = `
      <div id=${mainActionsBlockId} class=${mainActionsBlockId}>
		<button class="button ${addButtonClass}">Add</button>
		<button class="button ${finishAllButtonClass}">Finish all</button>
		<button class="button ${removeAllButtonClass}">Remove all</button>
	</div>

	<div class="filters">
		<div class="filters__types">
			<select class="task-types" id=${taskTypeSelectId} name="type">
          		<option value="learning" selected=${this.filtersState.type ===
    'learning'}>
            		learning
           		</option>
          <option value="shopping" selected=${this.filtersState.type ===
    'shopping'}>
            shopping
          </option>
          <option value="traveling">
            traveling
          </option>
          <option value="sport">
            sport
          </option>
        </select>
        	<span class="tasks-count">4 items left</span>
		</div>

		<div id=${filterButtonsBlockId} class=${filterButtonsBlockId}>
			<button class="button ${filterButtonsClasses.all} 
          ${activeButton === filterButtonsClasses.all ? 'active' : ''}"
      >All</button>
			<button class="button ${filterButtonsClasses.opened} 
          ${activeButton === filterButtonsClasses.opened ? 'active' : ''}"
      >Opened</button>
			<button class="button ${filterButtonsClasses.completed} 
        ${activeButton === filterButtonsClasses.completed ? 'active' : ''}"
      >Completed</button>
		</div>
	</div>

	<input class="search" placeholder="search" id=${inputFilterId}>

	<div class=${listBlockId} id=${listBlockId}>
	
  </div>
  `;

    $mainBlock.appendChild($taskList);
  }

  initEventListeners () {
    this.$mainActionsBlock.addEventListener('click', this.onClickMainActions);
    this.$filterButtonsBlock.addEventListener('click',
      this.onClickFilterButtons);
    this.$taskTypeSelect.addEventListener('change', this.onChangeType);
    this.$inputFilter.addEventListener('keydown', this.onInput);
    this.$listBlock.addEventListener('click', this.onTaskChange);
  }

  renderTasks () {
    this.tasks.forEach(({ id, title, description, status }) => {
      const $taskItem = document.createElement('div');
      $taskItem.classList.add('task-item', status);
      $taskItem.id = id;

      const $checkboxBlock = document.createElement('label');
      $checkboxBlock.className = 'checkbox-container';
      const $checkbox = document.createElement('input');
      $checkbox.setAttribute('type', 'checkbox');
      status === 'finished' && $checkbox.setAttribute('checked', true);
      const $span = document.createElement('span');
      $span.className = 'checkmark';
      $checkboxBlock.appendChild($checkbox);
      $checkboxBlock.appendChild($span);

      const $textBlock = document.createElement('div');
      $textBlock.classList.add('task-text');
      $textBlock.innerHTML = `
        <div class="task-text__title">${capitalize(title)}</div>
				<div class="task-text__description">${capitalize(description)}</div>	
      `;

      const $actionsBlock = document.createElement('div');
      $actionsBlock.className = 'task-actions';
      $actionsBlock.innerHTML = `
        <i class="fa fa-pencil task-actions__button task-actions__edit"></i>
				<i class="fa fa-trash task-actions__button task-actions__remove"></i>	
      `;

      $taskItem.appendChild($checkboxBlock);
      $taskItem.appendChild($textBlock);
      $taskItem.appendChild($actionsBlock);

      this.$listBlock.appendChild($taskItem);
    });
  }

  onClickMainActions ({ target }) {
    const isButton = target.classList.contains('button');

    if (isButton) {
      if (target.classList.contains(addButtonClass)) {
        modalController.open();
      }

      if (target.classList.contains(finishAllButtonClass)) {
        // TODO: implement finish all tasks
      }

      if (target.classList.contains(removeAllButtonClass)) {
        // TODO: implement remove all tasks
      }
    }
  }

  onClickFilterButtons ({ target }) {
    const isButton = target.classList.contains('button');
    const isClickedActiveFilter = target.classList
      .contains(this.filtersState.button);

    if (isButton && !isClickedActiveFilter) {
      const $prevActiveFilter = [].find.call(
        target.parentElement.children,
        elem => elem.classList.contains('active')
      );

      $prevActiveFilter.classList.remove('active');
      target.classList.add('active');
      this.filtersState.button = Object.values(filterButtonsClasses).
        find(value => target.classList.contains(value));

      // TODO: implement data filter
    }
  }

  onChangeType ({ target: { value } }) {
    this.activeFilters.type = value;

    // TODO: implement filter tasks
  }

  onInput ({ key, target }) {
    const value = target.value.trim();

    if (key === 'Enter' && value !== this.activeFilters.text) {
      this.activeFilters.text = value;

      // TODO: implement filter tasks
    }
  }

  onTaskChange  ({ target })  {
    const $task = target.parentElement.parentElement;
    const taskActions = {
      remove: {
        isCurrent: target.classList.contains('task-actions__remove'),
        run: () => this.$listBlock.removeChild($task)
      },
      edit: {
        isCurrent:target.classList.contains('task-actions__edit'),
        run: () => {
          const taskObj = this.tasks.find(({ id }) => id === $task.id);

          modalController.open(taskObj);
        }
      },
      changeStatus: {
        isCurrent: target.type === 'checkbox',
        run: () => {
          const isChecked = target.checked;

          isChecked
            ? $task.classList.add('finished')
            : $task.classList.remove('finished');
        }
      },
    };
    const action = Object.values(taskActions).find(({ isCurrent }) => isCurrent);

    if (action) {
      action.run();
      // TODO: change api tasks not only in DOM
    }

    // if (isRemoveBtn) {
    //   $foo.removeChild($tag);
    //
    //   tagsArr.splice(tagsArr.indexOf($tag.firstElementChild.innerHTML), 1);
    // }
  }
}
