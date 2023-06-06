const express = require('express') // import express
const app = express() // create express app
const port = 3000 
const bodyParser = require('body-parser'); // body-parser를 가져온다.
const { User } = require("./models/User"); // User.js에서 export한 User를 가져온다.
const config = require('./config/key'); // key.js에서 export한 config를 가져온다.

// application/x-www-form-urlencoded 형식으로 된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); // application/json 형식으로 된 데이터를 분석해서 가져올 수 있게 해준다.

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

app.post('/register', (req, res) => { // '/register' 경로로 들어오면
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // port 3000에서 실행되고 있다.
})