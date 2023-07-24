if(process.env.NODE_ENV === 'production'){ // production 환경이면
    module.exports = require('./prod') // production 환경이면 prod.js에서 가져온다.
} else {
    module.exports = require('./dev') // development 환경이면 dev.js에서 가져온다.
}
