# Patrick McElhaney's Coding Exercise

(The README was written before the first line of code, so these instructions probably don't work yet.)

## Installation

You should have NodeJS installed.

```sh
npm install
```

To run the tests:

```sh
npm test
```

## Usage

Call bigram and pass it a text file.

```sh
bigram message.txt
```

Or pipe a stream into STDIN

```sh
echo "The quick brown fox and the quick blue hare." | bigram
```

## Example

```sh
$ echo "The quick brown fox and the quick blue hare." | bigram
2 the quick
1 quick brown
1 brown fox
1 fox and
1 and the
1 quick blue
1 blue hare
```

The output uses the same format as UNIX's [`uniq -c`](https://en.wikipedia.org/wiki/Uniq).


## Assumptions

- The input is ASCII text 
- Case-insenstiive ("The quick" matches "the quick")
- A word consists of letters, numbers, and hypen (-). Anything else is a delimiter.
- Consecutive delimiters are collapsed to one ("the quick" matches "the      quick").

