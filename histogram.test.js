const Histogram = require('./histogram.js');

test('one item', () => {
    const histogram = new Histogram();
    histogram.add('bears');
    expect(histogram.toObject()).toEqual({bears: 1})
});

test('count', () => {
    const histogram = new Histogram();
    histogram.add('beets');
    histogram.add('beets');
    histogram.add('beets');
    expect(histogram.toObject()).toEqual({beets: 3})

});