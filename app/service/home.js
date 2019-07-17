const { Service } = require('egg')

class HomeService extends Service {
    async home(){
        let {data: {cityInfo, data}} = await this.ctx.curl(
            'http://t.weather.sojson.com/api/weather/city/101030100', 
            {
                dataType: 'json',
            }
        )
        return {cityInfo, data}
    }
}

module.exports = HomeService