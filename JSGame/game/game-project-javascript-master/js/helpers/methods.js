Function.prototype.extend = function(parent) {
    this.prototype = Object.create(parent.prototype);
    this.constructor = this;
};