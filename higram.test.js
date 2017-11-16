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
    
    test(example.name, (done) => {
        higram.generateBigramCountsFromStream(stream, histogram => {
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

    higram.generateBigramCountsFromStream(stream, histogram => {
        expect(histogram).toEqual({"is what": 1, "it is": 2, "what it": 1})
        done();
    });
});

test('writes the histogram to a stream', (done) => {
    const counts = {
        'one': 1,
        'two': 2,
        'ten': 10
    }

    const expected = [
        '10 ten\n',
        '2 two\n',
        '1 one\n'
    ].join('');

    const stream = higram.histogramReader(counts);

    let output = '';
    stream.on('data', chunk => {
        output += chunk.toString();
    });

    stream.on('end', () => {
        expect(output).toEqual(expected);
        done();
    });


})



/*
WordTokenizer
BigramCountParser
Histogram
integration test (stdin)
integration test (file name as argument)
the actual test case given as an example
*/

/*
End goal:

const inputStream = process.stdin;

const tokenizer = new WordTokenizer();
const bigramCountParser = new BigramCountParser();
bigramCountParser.on('histogram', histogram =>
    histogram.asTextStream().pipe(process.stdout);
);
inputStream.pipe(tokenizer).pipe(bigramCountParser);
*/
