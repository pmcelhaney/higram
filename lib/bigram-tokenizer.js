const { Transform } = require('stream');

module.exports = class BigramTokenzizer extends Transform {
  _transform(chunk, encoding, callback) {
    const token = chunk.toString();
    if (this.lastToken) {
      this.push(`${this.lastToken} ${token}`);
    }
    this.lastToken = token;
    callback();
  }
};
