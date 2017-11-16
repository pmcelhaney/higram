module.exports = function higram(string) {
    return string.trim().split(/ +/).reduce((histogram, word, index, words) => { 
        if (index === 0) {
            return histogram;
        }
        const bigram = words[index-1] + ' ' + word; 
        histogram[bigram] = (histogram[bigram] || 0) + 1; 
        return histogram 
    }, {});
}