const higram = require('./higram');

test('a single bigram', () => {
  expect(higram('hello world')).toMatchObject({'hello world': 1});
});


/*
three words
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
