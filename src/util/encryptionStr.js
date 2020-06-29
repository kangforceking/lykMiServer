const crypto = require('crypto')
const { update } = require('../model/user')

module.exports = function({
    str,
    type = 'sha256',
    secret
}) {
    if (!secret) {
        // 随机数用于“加盐”
        secret = crypto.randomBytes(16).toString('hex')
    }
    let encryptedData = ''
    let result = {

    }
    switch (type) {
        // 不可逆加密
        case 'sha512':
            encryptedData = crypto
                                // 创建一个带秘钥的算法
                                .createHmac(type, secret)
                                // 加密并拼接
                                .update(str)
                                // 16进制的密文
                                .digest('hex')
            break
        // 不可逆加密
        case 'sha256':
            encryptedData = crypto
                            // 创建生成哈希摘要
                            .createHash(type, secret)
                            // 加密并拼接
                            .update(str)
                            // 16进制的密文
                            .digest('hex')
            break
        // 可逆的加密
        case 'aes192':
            // let cipher = crypto.createCipher(type, secret)
            // let crypted = cipher.update(str)
            // encryptedData = crypted.final('hex')
            {
                let key = crypto.randomBytes(192/8)
                let iv = crypto.randomBytes(128/8)
                let cipher = crypto.createCipheriv(type, key, iv)
                cipher.update(str)
                encryptedData = cipher.final('hex')
                result.iv = iv
                result.key = key
            }
            break
        default:
            break
           
    }
    result = {
        ...result,
        secret,
        encryptedData
    }
    return result
}