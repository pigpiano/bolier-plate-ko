const mongoose = require('mongoose'); // mongoose를 가져온다.
const bcrypt = require('bcrypt'); // bcrypt를 가져온다.
const saltRounds = 10; // salt를 10자리로 만든다. 
const jwt = require('jsonwebtoken'); // jsonwebtoken을 가져온다.

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
    } else {
        next() // 다음으로 넘어갈 수 있게 해준다.
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567 암호화된 비밀번호 $2b$10$yf8J3N5Q8PfJU4Y2t0v7xOzX3f0ZgE7s5Zc5XqY9H5s0K8KXZmY3i
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) { // plainPassword를 암호화해서 비교한다.
        if(err) return cb(err); // 에러가 나면 에러를 출력해준다.
        cb(null, isMatch); // 에러가 없으면 isMatch를 true로 보내준다.
    })
}

userSchema.methods.generateToken = function(cb) { 
    // jsonwebtoken을 이용해서 token을 생성하기
    var user = this; // userSchema를 가리킨다. es5 문법
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token // userSchema의 token에 token을 넣어준다.
    user.save()
    .then(savedUser => {
      cb(null, savedUser);
    })
    .catch(err => {
      cb(err);
    });
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this; // userSchema를 가리킨다. es5 문법
    // user._id + ''  = token // user._id를 string으로 바꿔준다.
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) { // token을 decode한다.
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
        user.findOne({"_id": decoded, "token": token}, function(err, user) { // userSchema를 찾는다.
            if(err) return cb(err); // 에러가 나면 에러를 출력해준다.
            cb(null, user) // 에러가 없으면 user를 보내준다.
        })
    })
}

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감싸준다.
module.exports = { User } // 다른 파일에서도 쓸 수 있게 export 해준다.

