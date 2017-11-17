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