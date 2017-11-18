const { Transform } = require('stream');

module.exports = class HistogramParser extends Transform {
  constructor() {
    super({ readableObjectMode: true, writableObjectMode: false });
    this.histogram = {};
  }

  _final() {
    this.push(this.histogram);
  }

  _transform(chunk, encoding, callback) {
    const item = chunk.toString();
    this.histogram[item] = (this.histogram[item] || 0) + 1;
    callback();
  }
};
