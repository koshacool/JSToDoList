export const generateId = () => Math.random().toString(36).substr(2, 9);

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
