module.exports = {
    keys: 'lykmiserver_abcde123456',
    security: {
        csrf: {
            headerName: 'x-csrf-token'
        }
    },
    middleware: [
        'robot'
    ],
    robot: {
        ua: [
            /Baiduspider/i
        ]
    },
    mongoose: {
        client: {
            url: 'mongodb://127.0.0.1:27017',
            options: {
                autoIndex: false,
                useNewUrlParser: true,
                dbName: 'lyk_im_db'
            }
        }
    }
}