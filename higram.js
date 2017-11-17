#!/usr/bin/env node

const fs = require('fs');
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

inputStream()
  .pipe(wordTokenizer)
  .pipe(bigramTokenizer)
  .pipe(histogramParser);


function inputStream() {
  if (process.argv.length > 2) {
    return fs.createReadStream(process.argv[2]);
  }
  return process.stdin;
}
