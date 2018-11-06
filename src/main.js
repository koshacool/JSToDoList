import modalController from './modal';
import storageService from './localStorageService';
import { capitalize, debounce, countActiveTasks } from './utils';


const mainActionsBlockId = 'main-page__actions';
const addButtonClass = 'add-task';
const finishAllButtonClass = 'finish-all-tasks';
const removeAllButtonClass = 'remove-all-tasks';

// Filters buttons
const taskTypeSelectId = 'filters__task-type';
const inputFilterId = 'filters__search';
const filterButtonsBlockId = 'filters__buttons';
const filterButtonsClasses = {
  all: 'all',
  opened: 'opened',
  completed: 'completed',
};

const listBlockId = 'tasks-list';

class TaskList {
  constructor (tasks) {
    this.tasks = tasks;

    this.filtersState = {
      status: filterButtonsClasses.all,
      type: 'all',
      text: '',
    };

    this.initCommonStructure();

    this.$mainActionsBlock = document.getElementById(mainActionsBlockId);
    this.$taskTypeSelect = document.getElementById(taskTypeSelectId);
    this.$inputFilter = document.getElementById(inputFilterId);
    this.$filterButtonsBlock = document.getElementById(filterButtonsBlockId);
    this.$listBlock = document.getElementById(listBlockId);
    this.$taskCount = document.getElementById('tasks-count');

    this.onClickFilterButtons = this.onClickFilterButtons.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onInput = this.onInput.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);

    this.onEditTask = this.onEditTask.bind(this);
    this.onClickMainActions = this.onClickMainActions.bind(this);
    this.onClickFilterButtons = this.onClickFilterButtons.bind(this);

    this.renderTasks(this.tasks);
    this.initEventListeners();
  }

  initCommonStructure () {
    const { status } = this.filtersState;
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
          <option value="all">
            all
          </option>
          <option value="learning">
          	learning
          </option>
          <option value="shopping">
            shopping
          </option>
          <option value="traveling">
            traveling
          </option>
          <option value="sport">
            sport
          </option>
        </select>
        	<span id="tasks-count" class="tasks-count">${this.tasks.length} Tasks left</span>
		</div>

		<div id=${filterButtonsBlockId} class=${filterButtonsBlockId}>
			<button class="button ${filterButtonsClasses.all} 
          ${status === filterButtonsClasses.all ? 'active' : ''}"
      >All</button>
			<button class="button ${filterButtonsClasses.opened} 
          ${status === filterButtonsClasses.opened ? 'active' : ''}"
      >Opened</button>
			<button class="button ${filterButtonsClasses.completed} 
        ${status === filterButtonsClasses.completed ? 'active' : ''}"
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
    this.$inputFilter.addEventListener('keyup', debounce(this.onInput));
    this.$listBlock.addEventListener('click', this.onTaskChange);
  }

  createTaskElement ({ id, title, description, status }) {
    const $taskItem = document.createElement('div');
    $taskItem.classList.add('task-item', status);
    $taskItem.id = id;

    const $checkboxBlock = document.createElement('label');
    $checkboxBlock.className = 'checkbox-container';
    const $checkbox = document.createElement('input');
    $checkbox.setAttribute('type', 'checkbox');
    status === filterButtonsClasses.completed && $checkbox.setAttribute('checked', true);
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

    return $taskItem;
  }

  renderTasks () {
    const { status, type, text } = this.filtersState;
    const tasks = this.tasks.filter(task => {
      if (
        (status !== 'all' && task.status !== status)
        || (type !== 'all' && task.type !== type)
        || (text && task.title.toLowerCase().indexOf(text.toLowerCase()) === -1
          && task.description.toLowerCase().indexOf(text.toLowerCase()) === -1)
      ) {
        return false;
      }

      return true;
    });

    this.$taskCount.innerHTML = `${countActiveTasks(tasks)} Tasks left`;

    if (tasks.length) {
      tasks.forEach(taskObj => {
        const $taskItem = this.createTaskElement(taskObj);
        this.$listBlock.appendChild($taskItem);
      });
    } else {
      const $noTasks = document.createElement('h2');
      $noTasks.innerHTML = 'You haven\'t any tasks.';
      $noTasks.className = 'no-tasks';

      this.$listBlock.appendChild($noTasks);
    }
  }

  onClickMainActions ({ target }) {
    const isButton = target.classList.contains('button');

    if (isButton) {
      if (target.classList.contains(addButtonClass)) {
        modalController.open(this.onCreateTask);
      }

      if (target.classList.contains(finishAllButtonClass)) {
        const finishedTasks = this.tasks.map(task => ({
          ...task,
          status: filterButtonsClasses.completed,
        }));

        storageService.set(finishedTasks);
        this.tasks = finishedTasks;
        this.$listBlock.innerHTML = '';
        this.renderTasks();
      }

      if (target.classList.contains(removeAllButtonClass)) {
        storageService.clear();
        this.tasks = [];
        this.$listBlock.innerHTML = '';
        this.renderTasks();
      }
    }
  }

  onCreateTask (task) {
    this.$listBlock.innerHTML = '';
    this.tasks.push(task);
    this.renderTasks();
  }

  onEditTask ($task) {
    return task => {
      const $newTask = this.createTaskElement(task);

      this.tasks.push(task);
      this.$listBlock.replaceChild($newTask, $task);
    };
  }

  onClickFilterButtons ({ target }) {
    const rerenderTasks = filterValue => {
      this.filtersState.status = filterValue;
      this.$listBlock.innerHTML = '';
      this.renderTasks();
    };
    const isButton = target.classList.contains('button');
    const isClickedActiveFilter = target.classList
      .contains(this.filtersState.button);


    if (isButton && !isClickedActiveFilter) {
      const $prevActiveFilter = [].find.call(
        target.parentElement.children,
        elem => elem.classList.contains('active')
      );
      const filterValue = Object.keys(filterButtonsClasses)
        .find(value => target.classList.contains(value));

      $prevActiveFilter.classList.remove('active');
      target.classList.add('active');

      filterValue && rerenderTasks(filterValue);
    }
  }

  onChangeType ({ target: { value } }) {
    this.filtersState.type = value;
    this.$listBlock.innerHTML = '';
    this.renderTasks();
  }

  updateFilters (name, value) {
    this.filtersState[name] = value;
    this.$listBlock.innerHTML = '';
    this.renderTasks();
  }

  onInput ({ target }) {
    const value = target.value.trim();
    this.updateFilters('text', value);
  }

  onTaskChange  ({ target })  {
    const { tasks } = this;
    const $task = target.parentElement.parentElement;
    const taskId = $task.id;
    const taskActions = {
      remove: {
        isCurrent: target.classList.contains('task-actions__remove'),
        run: () => {
          const newTasks = tasks.filter(({ id }) => id !== taskId);

          storageService.set(newTasks);
          this.tasks = newTasks;
          this.$listBlock.removeChild($task);
        }
      },
      edit: {
        isCurrent: target.classList.contains('task-actions__edit'),
        run: () => {
          const taskObj = tasks.find(({ id }) => id === taskId);

          modalController.open(this.onEditTask($task), taskObj);
        }
      },
      changeStatus: {
        isCurrent: target.type === 'checkbox',
        run: () => {
          const isChecked = target.checked;
          const taskIndex = tasks.findIndex(({ id }) => id === taskId);
          const task = this.tasks[taskIndex];

          if (isChecked) {
            task.status = filterButtonsClasses.completed;
            $task.classList.add(filterButtonsClasses.completed);
            $task.classList.remove(filterButtonsClasses.opened);
          } else {
            task.status = filterButtonsClasses.opened;
            $task.classList.remove(filterButtonsClasses.completed);
            $task.classList.add(filterButtonsClasses.opened);
          }

          this.tasks[taskIndex] = task;
          storageService.set(this.tasks);
        }
      },
    };
    const action = Object.values(taskActions).find(({ isCurrent }) => isCurrent);

    if (action) {
      action.run();
    }
  }
}

export default TaskList;
