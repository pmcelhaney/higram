const Histogram = require('./histogram.js');

test('one item', () => {
    const histogram = new Histogram();
    histogram.add('bears');
    expect(histogram.toObject()).toEqual({bears: 1})
});
