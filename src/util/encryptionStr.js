const crypto = require('crypto')
const stringRandom = require('./stringRandom')

module.exports = function({
    str,
    type = 'sha256',
    secret
}) {
    if (!secret) {
        secret = stringRandom({
            leg: 10
        })    
    }
    let hmac = crypto.createHmac(type, secret)
    let conent = hmac.update(str)
    let encryptedData = conent.digest('hex')
    return {
        secret,
        encryptedData
    }
}