import { 
  generateId, 
  capitalize, 
  debounce, 
  countActiveTasks,
  compareTasks,
  sortTasks,
} from './utils';


describe('Util functions tests::', () => {
  test('generateId function should generate unique values', () => {
    const values = [];

    for (let i = 0; i < 10; i++) {
      values.push(generateId());
    }

    values.forEach((value, index) => {
      for (let i = values.length - 1; index > index; i--) {
        expect(value).not.toEqual(values[i]);
      }
    });
  });

  test('should capitalize first letter', () => {
    expect(capitalize('a')).toEqual('A');
    expect(capitalize('text')).toEqual('Text');
    expect(capitalize('Text')).toEqual('Text');
    expect(capitalize('tEXT')).toEqual('TEXT');
  });

  test('Should correct count active tasks', () => {
    const tasksMock = {
      allCompleted: [
        { status: 'completed' },
        { status: 'completed' },
        { status: 'completed' },
      ],
      allActive: [
        { status: 'active' },
        { status: 'active' },
        { status: 'active' },
      ],
      oneActive: [
        { status: 'completed' },
        { status: 'active' },
        { status: 'completed' },
      ],
    };

    expect(countActiveTasks(tasksMock.allCompleted)).toEqual(0);
    expect(countActiveTasks(tasksMock.allActive))
      .toEqual(tasksMock.allActive.length);
    expect(countActiveTasks(tasksMock.oneActive)).toEqual(1);
  });

  test('should be executed with delay', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    debounce(callback)(123);

    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith(123);
  });

  test('Should correct compare date field in two tasks', () => {
    const createTask = miliseconds => ({ updatedAt: new Date(miliseconds) });
    const task1 = createTask(111111);
    const task2 = createTask(1111111);
  
    expect(compareTasks(task1, task1)).toBe(0);
    expect(compareTasks(task1, task2)).toBe(1);
    expect(compareTasks(task2, task1)).toBe(-1);
  });

  describe('Should correct sort tasks::', () => {
    const createTask = (miliseconds, status) => 
      ({ updatedAt: new Date(miliseconds), status });

    test('First should be opened', () => { 
      const tasks1 = [
        createTask(111111, 'completed'),
        createTask(111111, 'opened'),
      ];
      const res1 = [...tasks1].reverse();  
      expect(sortTasks(tasks1)).toEqual(res1);
    });

    test('First should be newer', () => { 
      const tasks = [
        createTask(111111, 'opened'),
        createTask(1111111, 'opened'),
      ];  
      const res = [...tasks].reverse();
      expect(sortTasks(tasks)).toEqual(res);
    });

    test('Should return correct order', () => { 
      const tasks2 = [
        createTask(1111111, 'completed'),
        createTask(111111, 'completed'),
      ];  
      
      expect(sortTasks(tasks2)).toEqual(tasks2);
    });
  });
});
