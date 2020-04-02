class HttpException extends Error {
  constructor(resFn, flag, msg) {
    super();
    this.resFn = resFn;
    this.message = msg;
    this.flag = flag;
  }
}

module.exports = { HttpException };
