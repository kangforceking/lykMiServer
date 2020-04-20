module.exports = function({
    leg = 10,
    numbers = true,
    letters = true,
    specials = false
}) {
    let _numbers = '0123456789'
    let _letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let _specials = '~!@#$%^*()_+-=[]{}|;:,./<>?'
    let chars = ''
    let result = ''
    numbers && (chars += _numbers)
    letters && (chars += _letters)
    specials && (chars += _specials)
    while (leg > 0) {
        leg --
        result += chars[ Math.floor(Math.random() * chars.length) ]
    }
    return result
}