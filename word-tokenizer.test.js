const BigramTokenizer = require('./word-tokenizer');

const { Readable, Transform, Writable } = require('stream');

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
]

examples.forEach(example => {
    test(example.name, (done) => {
        const tokenizer = new BigramTokenizer();
        const faucet = new Readable();
        const sink = new Writable();
    
        let output = [];
    
        sink._write = function (chunk, encoding, callback) {
            output.push(chunk.toString());
            callback();
        }
    
        sink.on('finish', () => {
            expect(output).toEqual(example.out);
            done();
        });
    
        faucet.pipe(tokenizer).pipe(sink);
    
        example.in.forEach(token => faucet.push(token));
        faucet.push(null);
    })

})

