const higram = require('./higram');

test('a single bigram', () => {
  expect(higram('hello world')).toMatchObject({'hello world': 1});
});

