module.exports = function higram(string) {
    return histogram(parseWords(string));
}

function parseWords(string) {
    return string.trim().split(/[^a-z-]+/);
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