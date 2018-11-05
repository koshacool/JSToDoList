export const generateId = () => Math.random().toString(36).substr(2, 9);

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const countActiveTasks = tasks => tasks
  .reduce((prev, { status }) => status !== 'completed' ? prev + 1 : prev, 0);

export const debounce = (func, delay = 500) => {
  let timerId;

  return data => {
 	if (timerId) {
   	 	clearTimeout(timerId);
  	}
    
  	timerId = setTimeout(() => func(data), delay);
  };
};