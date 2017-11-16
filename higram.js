module.exports = function higram(string) {
    return string.split(' ').reduce((histogram, word, index, words) => { 
        const bigram = words[index-1] + ' ' + word; 
        histogram[bigram] = (histogram[bigram] || 0) + 1; 
        return histogram 
    }, {});
}