const { Readable } = require('stream');

const HistogramParser = require('../lib/histogram-parser.js');

test('emit a histogram', (done) => {
  const parser = new HistogramParser();
  const stream = new Readable();
  stream.push('hello');
  stream.push('hello');
  stream.push('world');
  stream.push(null);

  parser.on('histogram', (histogram) => {
    expect(histogram).toEqual({ hello: 2, world: 1 });
    done();
  });

  stream.pipe(parser);
});
