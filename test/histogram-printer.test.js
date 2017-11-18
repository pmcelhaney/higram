const HistogramPrinter = require('../lib/histogram-printer');

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

examples.forEach((example) => {
  test(example.name, (done) => {
    const printer = new HistogramPrinter();
    const faucet = new Readable({ objectMode: true });
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

    faucet.pipe(printer).pipe(sink);

    example.in.forEach(token => faucet.push(token));
    faucet.push(null);
  });
});

