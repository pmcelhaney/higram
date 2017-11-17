const Readable = require('stream').Readable;

module.exports = class Histogram {

    constructor () {
        this.counts = {}
    }

    add (item) {
        this.counts[item] = (this.counts[item] || 0) + 1;
    }
    
    toObject() {
        return this.counts;
    }

    toStream() {
        const stream = new Readable();
        const data = [];

        for (let name in this.counts) {
            data.push({name, count: this.counts[name] });
        }

        data.sort((a, b) => b.count - a.count);

        data.forEach(item => {
            stream.push(`${item.count} ${item.name}\n`);
        })

        stream.push(null);
        return stream;

    }
}