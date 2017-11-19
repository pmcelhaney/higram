const BigramTokenizer = require('../lib/bigram-tokenizer');
const StreamTester = require('./stream-tester');

const examples = [
  {
    name: 'two words',
    in: ['hello', 'world'],
    out: ['hello world'],
  },
  {
    name: 'nothing',
    in: [],
    out: [],
  },
  {
    name: 'one word',
    in: ['hello'],
    out: [],
  },
  {
    name: 'three words',
    in: ['hello', 'dear', 'world'],
    out: ['hello dear', 'dear world'],
  },
];

class BigramTokenizerTester extends StreamTester {
  createStream() {
    return new BigramTokenizer();
  }
}

new BigramTokenizerTester().test(examples);

