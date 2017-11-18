#!/usr/bin/env node

const fs = require('fs');
const WordTokenizer = require('../lib/word-tokenizer');
const BigramTokenizer = require('../lib/bigram-tokenizer');
const HistogramParser = require('../lib/histogram-parser');
const HistogramReader = require('../lib/histogram-reader');

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
