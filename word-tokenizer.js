const Transform = require('stream').Transform;

module.exports = class WordTokenizer extends Transform {
  
    constructor () {
        super();
        this.word = [];    
    }

    _transform (chunk, encoding, callback) {
        const token = chunk.toString();
        for (let i = 0; i < chunk.length; i++) {
            const character = String.fromCharCode(chunk[i]);
            if (this.isNotDelimiter(character)) {
                this.word.push(character);
            }
        }
        this.push(this.word.join(''));
        callback();
    }

    isDelimiter(character) {
        return character === ' ';
    }

    isNotDelimiter(character) {
        return !this.isDelimiter(character)
    }
}