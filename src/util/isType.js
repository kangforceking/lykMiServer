module.exports = function ({
    obj,
    type
}) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
}
