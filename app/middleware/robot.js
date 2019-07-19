module.exports = (option, app)=>{
    return async function robotMiddleware(ctx, next){
        const source = ctx.get('user-agent')
        console.log(ctx.url);
        
        const isRobot = option.ua.some( ua => ua.test(source) )
        if (isRobot) {
            ctx.status = 403
            ctx.message = '{"meagess": "Go away, robot."}'
        } else {
            await next()
        }
    }
}