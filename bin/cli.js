#!/usr/bin/env node

const fs = require('fs');
const WordTokenizer = require('../lib/word-tokenizer');
const BigramTokenizer = require('../lib/bigram-tokenizer');
const HistogramParser = require('../lib/histogram-parser');
const HistogramPrinter = require('../lib/histogram-printer');

function inputStream() {
  if (process.argv.length > 2) {
    return fs.createReadStream(process.argv[2]);
  }
  return process.stdin;
}

inputStream()
  .pipe(new WordTokenizer())
  .pipe(new BigramTokenizer())
  .pipe(new HistogramParser())
  .pipe(new HistogramPrinter())
  .pipe(process.stdout);

