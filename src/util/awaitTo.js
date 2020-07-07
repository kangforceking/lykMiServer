module.exports = function (promiseFun) {
    return promiseFun
        .then((data) => {
            return [null, data]
        })
        .catch((error) => {
            return [new Error(error), null]
        })
}
