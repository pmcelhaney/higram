module.exports = {
    read(stream, callback) {
        const parts = [];

        stream.on('data', chunk => {
            parts.push(chunk.toString());
        })

        stream.on('end', () => {
            callback(higram(parts.join('')));
        })

    }

}


function higram(string) {
    return histogram(parseWords(string.toLowerCase()));
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