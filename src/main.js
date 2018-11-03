import modalController from './modal';

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

document.addEventListener('DOMContentLoaded', () => {
  new TaskList();
});

class TaskList {
  constructor () {
    this.activeFilters = {
      button: filterButtonsClasses.all,
      type: 'shopping',
      text: '',
    };

    this.initCommonStructure();

    this.$mainActionsBlock = document.getElementById(mainActionsBlockId);

    this.$taskTypeSelect =  document.getElementById(taskTypeSelectId);
    this.$inputFilter =  document.getElementById(inputFilterId);
    this.$filterButtonsBlock =  document.getElementById(filterButtonsBlockId);

    this.$listBlock =  document.getElementById(listBlockId);

    this.onClickFilterButtons = this.onClickFilterButtons.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onInput = this.onInput.bind(this);

    this.initEventListeners();
	
  }

  initCommonStructure () {
    const activeButton = this.activeFilters.button;
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
          		<option value="learning" selected=${this.activeFilters.type === 'learning'}>
            		learning
           		</option>
          <option value="shopping" selected=${this.activeFilters.type === 'shopping'}>
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
			<button class="button ${filterButtonsClasses.all} ${activeButton === filterButtonsClasses.all ? 'active' : ''}">
				All
			</button>
			<button class="button ${filterButtonsClasses.opened} ${activeButton === filterButtonsClasses.opened ? 'active' : ''}">Opened</button>
			<button class="button ${filterButtonsClasses.completed} ${activeButton === filterButtonsClasses.completed ? 'active' : ''}">Completed</button>
		</div>
	</div>

	<input class="search" placeholder="search" id=${inputFilterId}>

	<div class=${listBlockId} id=${listBlockId}></div>
  `;

    $mainBlock.appendChild($taskList);
  }

  initEventListeners () {
  	this.$mainActionsBlock.addEventListener('click', this.onClickMainActions);
  	this.$filterButtonsBlock.addEventListener('click', this.onClickFilterButtons);
  	this.$taskTypeSelect.addEventListener('change', this.onChangeType);
  	this.$inputFilter.addEventListener('keydown', this.onInput);
  }

  onClickMainActions ({ target }) {
  	const isButton = target.classList.contains('button');  

 	if (isButton) {
    	if (target.classList.contains(addButtonClass)) {
    		modalController.open();
    	}

    	if (target.classList.contains(finishAllButtonClass)) {
    		console.log('finish all');

    		// TODO: implement finish all tasks
    	}

    	if (target.classList.contains(removeAllButtonClass)) {
    		console.log('remove all');

    		// TODO: implement remove all tasks
    	}
  	}
  }

  onClickFilterButtons ({ target }) {
  	const isClickedActiveFilter = target.classList.contains(this.activeFilters.button);  
    const isButton = target.classList.contains('button');

 	if (isButton && !isClickedActiveFilter) {
    	const $prevActiveFilter = [].find
    		.call(target.parentElement.children, elem => elem.classList.contains('active'));

    	$prevActiveFilter.classList.remove('active');
    	target.classList.add('active');
    	this.activeFilters.button = Object.values(filterButtonsClasses).find(value => target.classList.contains(value));

    	// TODO: implement data filter
  	}
  }

  onChangeType ({ target: { value } }) {
  	this.activeFilters.type = value;

  	// TODO: implement filter tasks
  }

  onInput  ({key, target})  {
  	const value = target.value.trim();

    if (key === 'Enter' && value !== this.activeFilters.text) {
      this.activeFilters.text = value;
      
  	// TODO: implement filter tasks
    }
  }
}