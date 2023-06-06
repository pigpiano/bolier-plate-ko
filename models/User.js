const mongoose = require('mongoose'); // mongoose를 가져온다.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email : {
        type: String,
        trim: true, // space를 없애주는 역할 ex) "  hello" -> "hello"
        unique: 1 // 똑같은 이메일은 쓰지 못하게 해준다.
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50   
    },
    role: { // 관리자, 일반 유저 등등
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 관리
        type: String
    },
    tokenExp: { // 토큰의 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감싸준다.
module.exports = { User } // 다른 파일에서도 쓸 수 있게 export 해준다.

