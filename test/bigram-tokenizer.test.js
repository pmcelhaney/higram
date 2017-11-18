const BigramTokenizer = require('../lib/bigram-tokenizer');

const { Readable, Writable } = require('stream');

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

examples.forEach((example) => {
  test(example.name, (done) => {
    const tokenizer = new BigramTokenizer();
    const faucet = new Readable();
    const sink = new Writable();

    const output = [];

    sink._write = (chunk, encoding, callback) => {
      output.push(chunk.toString());
      callback();
    };

    sink.on('finish', () => {
      expect(output).toEqual(example.out);
      done();
    });

    faucet.pipe(tokenizer).pipe(sink);

    example.in.forEach(token => faucet.push(token));
    faucet.push(null);
  });
});

