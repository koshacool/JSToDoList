import { taskStatuses } from './task/constants';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const countActiveTasks = tasks => tasks.reduce(
  (prev, { status }) => status !== 'completed' ? prev + 1 : prev, 0);

export const debounce = (func, delay = 300) => {
  let timerId;

  return data => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => func(data), delay);
  };
};

const sort = (a, b) => {
  if (a.updatedAt < b.updatedAt) {
    return 1;
  }

  if (a.updatedAt === b.updatedAt) {
    return 0;
  }

  return -1;
};

export const sortTasks = tasksArr => {
  const openedTasks = [];
  const complitedTasks = [];

  tasksArr.forEach(task => {
    if (task.status === taskStatuses.completed) {
      complitedTasks.push(task);
    } else {
      openedTasks.push(task);
    }
  });

  return  [...openedTasks.sort(sort), ...complitedTasks.sort(sort)];
};


