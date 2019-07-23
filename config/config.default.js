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
    // mongoose: {
    //     url: 'mongodb://127.0.0.1:27017',
    //     options: {}
    // }
}