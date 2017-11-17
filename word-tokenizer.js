const Transform = require('stream').Transform;

const CHAR_CODES = {
    a: 'a'.charCodeAt(0),
    z: 'z'.charCodeAt(0),
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
    '-': '-'.charCodeAt(0)
}

module.exports = class WordTokenizer extends Transform {
  
    constructor () {
        super();
        this.word = [];
   
    }

    _transform (chunk, encoding, callback) {
        const token = chunk.toString();
        for (let i = 0; i < chunk.length; i++) {
            const charCode = chunk[i];
            if (this.isDelimiter(charCode)) {
                this.pushWord();
            } else {
                this.word.push(String.fromCharCode(charCode).toLowerCase());
            }
        }
 
        callback();
    }

    _final (callback) {
        this.pushWord();
        callback();
    }

    pushWord() {
        this.push(this.word.join(''));
        this.word = []; 
    }

    isDelimiter(charCode) {
        if (charCode >= CHAR_CODES.a && charCode <= CHAR_CODES.z) {
            return false;
        }
        if (charCode >= CHAR_CODES.A && charCode <= CHAR_CODES.Z) {
            return false;
        }
        if (charCode === CHAR_CODES['-']) {
            return false;
        }
        return true;
    }

}