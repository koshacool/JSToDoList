export const generateId = () => {
  const number = Math.random();
  return number.toString(36).substr(2, 9);
};
