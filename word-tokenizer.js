const Transform = require('stream').Transform;

module.exports = class WordTokenizer extends Transform {
  
    constructor () {
        super();    
    }

    _transform (chunk, encoding, callback) {
        const token = chunk.toString();
        this.push(token);
        callback();
    }
}