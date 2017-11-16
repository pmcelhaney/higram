module.exports = {
    read(stream, callback) {
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
            callback(histogram(words.filter(w => w.length > 0)));
        })

    }

}

function parseWords(string) {
    return string.split(/[^a-z-]+/);
}

function histogram(inputs) {
    return inputs.reduce((histogram, word, index, words) => { 
        if (index === 0) {
            return histogram;
        }
        const bigram = words[index-1] + ' ' + word; 
        histogram[bigram] = (histogram[bigram] || 0) + 1; 
        return histogram 
    }, {});
}