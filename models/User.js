const mongoose = require('mongoose'); // mongoose를 가져온다.
const bcrypt = require('bcrypt'); // bcrypt를 가져온다.
const saltRounds = 10; // salt를 10자리로 만든다. 


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

userSchema.pre('save', function( next ) { // userSchema에 정보를 저장하기 전에 function을 실행한다.
    var user = this; // userSchema를 가리킨다.
    if(user.isModified('password')) { // 비밀번호가 변경될 때만 실행된다.
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) { // salt를 만든다.
            if(err) return next(err) // 에러가 나면 에러를 출력해준다.
            bcrypt.hash(user.password, salt, function(err, hash) { // hash를 만든다.
                if(err) return next(err) // 에러가 나면 에러를 출력해준다.
                user.password = hash // hash된 비밀번호를 user.password에 넣어준다.
                next() // 다음으로 넘어갈 수 있게 해준다.
            })
        })
    }
})


const User = mongoose.model('User', userSchema) // 스키마를 모델로 감싸준다.
module.exports = { User } // 다른 파일에서도 쓸 수 있게 export 해준다.

