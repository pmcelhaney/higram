module.exports = {
    generateBigramCountsFromStream(stream, callback) {
        const parts = [];
        const words = [];
        let partialWord = '';

        stream.on('data', chunk => {
            const wordsOrParts = parseWords(chunk.toString().toLowerCase());
            wordsOrParts[0] = partialWord + wordsOrParts[0];
            partialWord = wordsOrParts.pop();
            words.push(...wordsOrParts);
        })

        stream.on('end', () => {
            words.push(partialWord);
            callback(countBigrams(words.filter(w => w.length > 0)));
        })

    }

}

function parseWords(string) {
    return string.split(/[^a-z-]+/);
}

function countBigrams(words) {
    return words.reduce((counts, word, index) => { 
        if (index === 0) {
            return counts;
        }
        const bigram = words[index-1] + ' ' + word; 
        counts[bigram] = (counts[bigram] || 0) + 1; 
        return counts; 
    }, {});
}