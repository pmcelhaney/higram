const Transform = require('stream').Transform;

module.exports = class WordTokenizer extends Transform {
  
    constructor () {
        super();
        this.word = [];    
    }

    _transform (chunk, encoding, callback) {
        const token = chunk.toString();
        for (let i = 0; i < chunk.length; i++) {
            const letter = String.fromCharCode(chunk[i]);
            if (letter != ' ') {
                this.word.push(letter);
            }
        }
        this.push(this.word.join(''));
        callback();
    }
}