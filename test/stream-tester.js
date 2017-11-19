const { Readable, Writable } = require('stream');

module.exports = class StreamTester {
  createStream() {
    throw new Error('createStream() must be implemented by a subclass');
  }

  test(examples) {
    examples.forEach((example) => {
      test(example.name, (done) => {
        const stream = this.createStream();
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

        faucet.pipe(stream).pipe(sink);

        example.in.forEach(token => faucet.push(token));
        faucet.push(null);
      });
    });
  }
};
