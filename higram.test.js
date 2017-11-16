const Readable = require('stream').Readable;
const higram = require('./higram');

const examples = [
    { 
        name: 'a single bigram',
        in: 'hello world',
        out: {'hello world': 1}
    },
    {
        name: 'three words',
        in: 'three blind mice',
        out: {'three blind': 1, 'blind mice': 1}
    },
    {
        name: 'counts occurences',
        in: 'the quick brown the quick',
        out: {'the quick': 2, 'quick brown': 1, 'brown the': 1}
    },
    {
        name: 'one word',
        in: 'lonely',
        out: {}
    },
    {
        name: 'empty',
        in: '        ',
        out: {}
    },
    {
        name: 'multiple spaces between words',
        in: 'hello       world',
        out: {'hello world': 1}
    },
    {
        name: 'mixed whitespace (tabs, newline, etc.)',
        in: 'hello  \t\t \r \n     world',
        out: {'hello world': 1}
    },
    {
        name: 'hyphenated words',
        in: 'hello mother-in-law',
        out: {'hello mother-in-law': 1}
    },
    {
        name: 'same word three times',
        in: 'boom boom boom',
        out: {'boom boom': 2}
    },
    {
        name: 'case-insensitive',
        in: 'Boom boom POW',
        out: {'boom boom': 1, 'boom pow': 1}
    },

]

examples.forEach(example => {
    const stream = new Readable();
    stream.push(example.in);
    stream.push(null);
    
    xtest(example.name, (done) => {
        higram.read(stream, histogram => {
            expect(histogram).toEqual(example.out)
            done();
        });
    });
})

test('handles a stream that\'s not all in one chunk', (done) => {
    const stream = new Readable();
    stream.push('it ');
    stream.push('is ');
    stream.push('wha');
    stream.push('t i');
    stream.push('t i');
    stream.push('s');
    stream.push(null);

    higram.read(stream, histogram => {
        expect(histogram).toEqual({"is what": 1, "it is": 2, "what it": 1})
        done();
    });

})



/*
test the output function
integration test (STDIN)
integration test (file name as argument)
the actual test case given as an example
*/
