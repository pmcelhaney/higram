module.exports = class Histogram {

    constructor () {
        this.counts = {}
    }

    add (item) {
        this.counts[item] = 1;
    }
    
    toObject() {
        return this.counts;
    }

}