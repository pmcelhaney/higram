const Histogram = require('./histogram.js');



test('histogram to object', () => {
    const histogram = new Histogram();
    histogram.add('bears');
    histogram.add('beets');
    histogram.add('beets');
    histogram.add('beets');
    histogram.add('battlestar-galactica');
    histogram.add('battlestar-galactica');
    expect(histogram.toObject()).toEqual({bears: 1, beets: 3, 'battlestar-galactica': 2})
});

test('histogram to stream', (done) => {
    const histogram = new Histogram();
    histogram.add('bears');
    histogram.add('beets');
    histogram.add('beets');
    histogram.add('beets');
    histogram.add('battlestar-galactica');
    histogram.add('battlestar-galactica');
    const stream = histogram.toStream();
    let output = '';
    stream.on('data', chunk => {
        output += chunk.toString();
    });

    const expected = [
        '3 beets\n',
        '2 battlestar-galactica\n',
        '1 bears\n',
    ].join('');

    stream.on('end', () => {
        expect(output).toEqual(expected);
        done();
    });
});