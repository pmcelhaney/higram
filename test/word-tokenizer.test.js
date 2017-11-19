const WordTokenizer = require('../lib/word-tokenizer');
const StreamTester = require('./stream-tester');

const examples = [
  {
    name: 'one word',
    in: ['hello'],
    out: ['hello'],
  },
  {
    name: 'whitepace',
    in: [' hello '],
    out: ['hello'],
  },
  {
    name: 'two words',
    in: ['hello world'],
    out: ['hello', 'world'],
  },
  {
    name: 'muliple chunks',
    in: ['hello w', 'orld'],
    out: ['hello', 'world'],
  },
  {
    name: 'consecutive whitespace',
    in: ['hello     world'],
    out: ['hello', 'world'],
  },
  {
    name: 'only hyphen and letters count as word characters',
    in: ['mother-in-law_father-in-law'],
    out: ['mother-in-law', 'father-in-law'],
  },
  {
    name: 'converts to lowercase',
    in: ['The quick'],
    out: ['the', 'quick'],
  },
];

class WordTokenizerTester extends StreamTester {
  createStream() {
    return new WordTokenizer();
  }
}

new WordTokenizerTester().test(examples);
