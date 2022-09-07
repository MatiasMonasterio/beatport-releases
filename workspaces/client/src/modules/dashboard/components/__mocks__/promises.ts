export const promiseResolved = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

export const promiseRejected = (): Promise<void> => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error());
    }, 0);
  });
};
