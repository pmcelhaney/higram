const Transform = require('stream').Transform;

module.exports = class BigramTokenzizer extends Transform {
  
    constructor () {
        super();    
    }

    _transform (chunk, encoding, callback) {
        const token = chunk.toString();
        if (this.lastToken) {
            this.push(this.lastToken + ' ' + token);
        }
        this.lastToken = token;
        callback();
    }
}