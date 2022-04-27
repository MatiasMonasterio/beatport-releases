export const getDiffDays = (date: number): number => {
  const diference: number = new Date().getTime() - date;
  return Math.trunc(diference / (1000 * 3600 * 24));
};
