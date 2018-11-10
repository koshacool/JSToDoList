import storageService from './localStorageService';

describe('localstorage service::', () => {
  test('By default should return empty array', () => {		
    expect(storageService.get()).toEqual([]);
  });

  test('Should return saved data', () => {
    const data = [1, 2, 3];

    storageService.set(data);	
    expect(storageService.get()).toEqual(data);    	
  });

  test('Clear should set data to empty array', () => {
    storageService.clear();	
    expect(storageService.get()).toEqual([]);    	
  });
});