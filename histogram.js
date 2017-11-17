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

}