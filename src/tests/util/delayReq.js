module.exports = (fn, timeout) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const magic = fn();
        res(magic);
      } catch (error) {
        rej(error);
      }
    }, timeout);
  });
};
