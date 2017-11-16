const higram = require('./higram');

higram.generateBigramCountsFromStream(process.stdin, counts => {
    higram.histogramReader(counts).pipe(process.stdout);
});