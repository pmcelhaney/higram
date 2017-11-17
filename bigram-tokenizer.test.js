const BigramTokenizer = require('./bigram-tokenizer');

const { Readable, Transform, Writable } = require('stream');

test('two words (one bigram)', (done) => {
    const tokenizer = new BigramTokenizer();
    const faucet = new Readable();
    const sink = new Writable();

    const expected = ['hello world'];
    let output = [];

    sink._write = function (chunk, encoding, callback) {
        output.push(chunk.toString());
        callback();
    }

    sink.on('finish', () => {
        expect(output).toEqual(expected);
        done();
    });

    faucet.pipe(tokenizer).pipe(sink);

    faucet.push('hello');
    faucet.push('world');
    faucet.push(null);
})