const crypto = require('crypto')
const { update } = require('../model/user')

module.exports = function({
    str,
    type = 'sha256',
    secret
}) {
    if (!secret) {
        // 随机数用于“加盐”
        secret = crypto.randomBytes(26).toString('hex')
    }
    let encryptedData = ''
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
            console.log(secret)
            let cipher = crypto.createCipher(type, secret)
            let crypted = cipher.update(str, 'utf8', 'hex');
            encryptedData = crypted.final('hex')
            break
        default:
            break
           
    }
    return {
        secret,
        encryptedData
    }
    
}