const { Transform } = require('stream');

module.exports = class HistogramPrinter extends Transform {
  constructor() {
    super({ writableObjectMode: true, readableObjectMode: false });
  }

  _transform(histogram, encoding, callback) {
    this.readLinesFromHistogram(histogram);
    this.sortLines();
    this.printAllLines();
    this.end();
    callback();
  }

  readLinesFromHistogram(histogram) {
    this.lines = Object.keys(histogram).map((name) => ({ name, count: histogram[name] }));
  }

  sortLines() {
    this.lines.sort((a, b) => b.count - a.count);
  }

  printAllLines() {
    this.lines.forEach((line) => {
      this.push(this.printLine(line));
    });
  }

  printLine(line) {
    return `${line.count} ${line.name}\n`;
  }
};
