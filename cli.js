
const inputStream = process.stdin;
const WordTokenizer = require('./word-tokenizer');
const BigramTokenizer = require('./bigram-tokenizer');
const HistogramParser = require('./histogram-parser');
const HistogramReader = require('./histogram-reader');

const wordTokenizer = new WordTokenizer();
const bigramTokenizer = new BigramTokenizer();
const histogramParser = new HistogramParser();

histogramParser.on('histogram', (histogram) => {
  new HistogramReader(histogram).pipe(process.stdout);
});

inputStream
  .pipe(wordTokenizer)
  .pipe(bigramTokenizer)
  .pipe(histogramParser);
