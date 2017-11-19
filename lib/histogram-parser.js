const { Transform } = require('stream');

module.exports = class HistogramParser extends Transform {
  constructor() {
    super({ writableObjectMode: false, readableObjectMode: true });
    this.histogram = {};
  }

  _final(callback) {
    this.push(this.histogram);
    callback();
  }

  _transform(chunk, encoding, callback) {
    const item = chunk.toString();
    this.histogram[item] = (this.histogram[item] || 0) + 1;
    callback();
  }
};
