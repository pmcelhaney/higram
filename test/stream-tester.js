const { Readable, Writable } = require('stream');

module.exports = class StreamTester {

  constructor(options = {}) {
    this.inputObjectMode = options.inputObjectMode;
    this.outputObjectMode = options.outputObjectMode;
  }

  createStream() {
    throw new Error('createStream() must be implemented by a subclass');
  }

  test(examples) {
    examples.forEach((example) => {
      test(example.name, (done) => {
        const stream = this.createStream();
        const source = new Readable({ objectMode: this.inputObjectMode });
        const sink = new Writable({ objectMode: this.outputObjectMode });

        const output = [];

        sink._write = (chunk, encoding, callback) => {
          output.push(this.outputObjectMode ? chunk : chunk.toString());
          callback();
        };

        sink.on('finish', () => {
          expect(output).toEqual(example.out);
          done();
        });

        source.pipe(stream).pipe(sink);

        example.in.forEach(token => source.push(token));
        source.push(null);
      });
    });
  }
};
