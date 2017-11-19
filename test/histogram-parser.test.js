const StreamTester = require('./stream-tester');
const HistogramParser = require('../lib/histogram-parser.js');

const examples = [
  {
    name: 'a simple histogram',
    in: ['hello', 'hello', 'world'],
    out: [{ hello: 2, world: 1 }],
  },
  {
    name: 'no data',
    in: [],
    out: [{}],
  },
];

class HistogramParserTester extends StreamTester {
  constructor() {
    super({ outputObjectMode: true });
  }

  createStream() {
    return new HistogramParser();
  }
}

new HistogramParserTester().test(examples);
