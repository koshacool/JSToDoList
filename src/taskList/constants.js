import { taskStatuses } from '../task/constants';

export const mainActionsBlockId = 'main-page__actions';

export const countBlockId = 'tasks-count';

export const listBlockId = 'tasks-list';

export const addButtonClass = 'add-task';
export const finishAllButtonClass = 'finish-all-tasks';
export const removeAllButtonClass = 'remove-all-tasks';

// Filters buttons
export const taskTypeSelectId = 'filters__task-type';
export const inputFilterId = 'filters__search';
export const filterButtonsBlockId = 'filters__buttons';
export const filterButtonsClasses = {
  ...taskStatuses,
  all: 'all',
};
