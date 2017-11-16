const higram = require('./higram');

test('a single bigram', () => {
    expect(higram('hello world')).toEqual({'hello world': 1});
});

test('three words', () => {
    expect(higram('three blind mice')).toEqual({'three blind': 1, 'blind mice': 1}); 
})

test('counts occurences', () => {
    expect(higram('the quick brown the quick')).toEqual({'the quick': 2, 'quick brown': 1, 'brown the': 1}); 
});

test('counts occurences', () => {
    expect(higram('the quick brown the quick')).toEqual({'the quick': 2, 'quick brown': 1, 'brown the': 1}); 
});

test('one word', () => {
    expect(higram('lonely')).toEqual({});
});

test('empty', () => {
    expect(higram('')).toEqual({});
});

test('only whitespace', () => {
    expect(higram('     ')).toEqual({});
});

test('multiple spaces between words', () => {
    expect(higram('hello       world')).toEqual({'hello world': 1});
});

test('mixed whitespace (tabs, newline, etc.)', () => {
    expect(higram('hello  \t\t \r \n     world')).toEqual({'hello world': 1});
});

test('non-whitespace delimiters', () => {
    expect(higram('hello;:_+world')).toEqual({'hello world': 1});
});

test('hyphenated words', () => {
    expect(higram('hello   mother-in-law')).toEqual({'hello mother-in-law': 1});
});

test('same word three times', () => {
    expect(higram('boom boom boom')).toEqual({'boom boom': 2})
})

test('case-insensitive', () => {
    expect(higram('Boom boom POW')).toEqual({'boom boom': 1, 'boom pow': 1});
});

/*
case-insensitive (always outputs lowercase)
stream rather than string
test the output function
integration test (STDIN)
integration test (file name as argument)
*/
