const HistogramPrinter = require('../lib/histogram-printer');
const StreamTester = require('./stream-tester');

const { Readable, Writable } = require('stream');

const examples = [
  {
    name: 'one item',
    in: [{ x: 1 }],
    out: ['1 x\n'],
  },

  {
    name: 'sorts the lines',
    in: [{ x: 1, y: 10, z: 2 }],
    out: ['10 y\n', '2 z\n', '1 x\n'],
  },
];

class HistogramPrinterTester extends StreamTester {
  constructor() {
    super({ inputObjectMode: true });
  }

  createStream() {
    return new HistogramPrinter();
  }
}

new HistogramPrinterTester().test(examples);
