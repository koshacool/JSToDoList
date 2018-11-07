const { generateId, capitalize, debounce } = require('./utils');


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