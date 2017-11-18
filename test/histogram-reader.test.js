const HistogramReader = require('../lib/histogram-reader.js');

test('reads a histogram to a stream', (done) => {
  const stream = new HistogramReader({
    bears: 1,
    beets: 3,
    'battlestar-galactica': 2,
  });

  let output = '';
  stream.on('data', (chunk) => {
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
