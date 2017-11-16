const higram = require('./higram');

test('a single bigram', () => {
  expect(higram('hello world')).toMatchObject({'hello world': 1});
});

test('three words', () => {
  expect(higram('three blind mice')).toMatchObject({'three blind': 1, 'blind mice': 1}); 
})

test('counts occurences', () => {
  expect(higram('the quick brown the quick')).toMatchObject({'the quick': 2, 'quick brown': 1, 'brown the': 1}); 
});

/*
one word
zero words
only whitespace
multiple spaces
mixed whitespace (tabs, newlines)
the same word several times
non word characters are ignored (letters, numbers, and hyphen count as word characters)
case-insensitive (always outputs lowercase)
stream rather than string
test the output function
integration test (STDIN)
integration test (file name as argument)
*/
