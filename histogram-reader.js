const Readable = require('stream').Readable;

module.exports = class HistogramReader extends Readable {
    constructor(histogram) {
        super();
        const data = [];
        
        for (let name in histogram) {
            data.push({name, count: histogram[name] });
        }

        data.sort((a, b) => b.count - a.count);

        data.forEach(item => {
            this.push(`${item.count} ${item.name}\n`);
        })

        this.push(null);
    }

}