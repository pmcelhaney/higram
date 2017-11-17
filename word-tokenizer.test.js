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

