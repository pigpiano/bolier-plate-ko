const { User } = require('../models/User'); // User.js에서 User를 가져온다.

let auth = (req, res, next) => { // auth라는 이름의 함수를 만들어준다.
    // 인증 처리를 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth; // 쿠키에서 x_auth라는 이름의 토큰을 가져온다.
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => { // findByToken은 User.js에서 만든 메소드이다.
        if(err) throw err; // 에러가 있으면 에러를 출력해준다.
        if(!user) return res.json({ isAuth: false, error: true }) // 유저가 없으면 json 형식으로 isAuth를 false로 error를 출력해준다.
        req.token = token; // req.token에 token을 넣어준다.
        req.user = user; // req.user에 user를 넣어준다.
        next(); // 다음으로 넘어갈 수 있게 next()를 해준다.
    })
    // 유저가 있으면 인증 Okay
    // 유저가 없으면 인증 No!

}

module.exports = { auth }; // 다른 파일에서도 쓸 수 있게 export 해준다.
