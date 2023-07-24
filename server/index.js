const express = require('express') // import express
const app = express() // create express app
const port = 4000 
const cookieParser = require('cookie-parser'); // cookie-parser를 가져온다.
const bodyParser = require('body-parser'); // body-parser를 가져온다.
const { User } = require("./models/User"); // User.js에서 export한 User를 가져온다.
const config = require('./config/key'); // key.js에서 export한 config를 가져온다.
const { auth } = require('./middleware/auth'); // auth.js에서 export한 auth를 가져온다.

// application/x-www-form-urlencoded 형식으로 된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); // application/json 형식으로 된 데이터를 분석해서 가져올 수 있게 해준다.

app.use(cookieParser()); // cookie-parser를 사용할 수 있게 해준다.

// application 과 database를 연결해주는 부분
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // 아래 내용을 써줘야 에러가 안난다.
    useNewUrlParser: true, useUnifiedTopology: true
}).then (() => console.log("MongoBD Connected...")) // mongoDB의 connection string을 넣어준다.
    .catch(err => console.log(err)) // 에러가 나면 에러를 출력해준다.
 

app.get('/', (req, res) => { // '/' 경로로 들어오면
  res.send('Hello World! 반가워요! 감사해요!') // Hello World! 반가워요!를 출력해준다.
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~")
})

app.post('/api/users/register', (req, res) => { // '/register' 경로로 들어오면
    //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body) // req.body에는 json 형식으로 정보가 들어있다.
    user.save()
    .then(userInfo => {
      console.log('사용자가 저장되었습니다.', userInfo);
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      console.error('사용자 저장 실패:', err);
      return res.json({ success: false, err });
    });
})

app.post('/api/users/login', (req, res) => { // '/login' 경로로 들어오면
    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }) // 데이터베이스에서 이메일로 사용자 찾기
        .then(user => { // user가 있으면
            if (!user) { // user가 없으면
                return res.json({ // json 형식으로
                    loginSuccess: false, // loginSuccess를 false로
                    message: "제공된 이메일에 해당하는 유저가 없습니다." // message를 출력해준다.
                })
            }
        

        // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => { // comparePassword는 User.js에서 만든 메소드이다.
            if (!isMatch) // 비밀번호가 맞지 않으면
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." }) // json 형식으로 loginSuccess를 false로 message를 출력해준다.
            // 3. 비밀번호가 맞다면 토큰을 생성한다.
            user.generateToken((err, user) => { // generateToken은 User.js에서 만든 메소드이다.
                if(err) return res.status(400).send(err); // 에러가 있으면 에러를 출력해준다.
                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등 여러군데에 저장할 수 있다. 여기서는 쿠키에저장
                res.cookie("x_auth", user.token) // cookie-parser를 사용할 수 있게 해준다.
                .status(200) // status를 200으로
                .json({ loginSuccess: true, userId: user._id }) // json 형식으로 loginSuccess를 true로 userId를 출력해준다.
            })
        })
    })
})
// role 1 어드민, role 2 특정 부서 어드민
// role 0 -> 일반유저, role 0이 아니면 관리자
     app.get('/api/users/auth', auth, (req, res) => { // '/auth' 경로로 들어오면'
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말이다.
    res.status(200).json({ // json 형식으로 status를 200으로 출력해준다.
        _id: req.user._id, // req.user._id를 출력해준다.
        isAdmin: req.user.role === 0 ? false : true, // role이 0이면 false, 아니면 true를 출력해준다.
        isAuth: true, // isAuth를 true로 출력해준다.
        email: req.user.email, // req.user.email를 출력해준다.
        name: req.user.name, // req.user.name를 출력해준다.
        lastname: req.user.lastname, // req.user.lastname를 출력해준다.
        role: req.user.role, // req.user.role를 출력해준다.
        image: req.user.image // req.user.image를 출력해준다.

})
})

app.get('/api/users/logout', auth, (req, res) => { // '/logout' 경로로 들어오면
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(logout => {
      return res.status(200).send({ success: true });
    })
    .catch(err => {
      return res.json({ success: false, err });
    });
    })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // port 5000에서 실행되고 있다.
})




