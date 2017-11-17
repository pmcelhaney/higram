const { Writable } = require('stream');

module.exports = class HistogramParser extends Writable {
  constructor() {
    super();

    this.histogram = {};

    this.on('finish', () => {
      this.emit('histogram', this.histogram);
    });
  }

  _write(chunk, encoding, callback) {
    const item = chunk.toString();
    this.histogram[item] = (this.histogram[item] || 0) + 1;

    callback();
  }
};
