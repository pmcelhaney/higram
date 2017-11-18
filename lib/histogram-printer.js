const { Transform } = require('stream');

module.exports = class HistogramReader extends Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: false });
  }

  _transform(histogram, encoding, callback) {
    const data = [];

    Object.keys(histogram).forEach((name) => {
      data.push({ name, count: histogram[name] });
    });

    data.sort((a, b) => b.count - a.count);

    data.forEach((item) => {
      this.push(`${item.count} ${item.name}\n`);
    });

    this.push(null);

    callback();
  }
};
