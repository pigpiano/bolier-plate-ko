const express = require('express') // import express
const app = express() // create express app
const port = 3000 

// application 과 database를 연결해주는 부분
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://qababa:wkehdck1!@boilerplate.j9s2rij.mongodb.net/?retryWrites=true&w=majority', {
    // 아래 내용을 써줘야 에러가 안난다.
    useNewUrlParser: true, useUnifiedTopology: true
}).then (() => console.log("MongoBD Connected...")) // mongoDB의 connection string을 넣어준다.
    .catch(err => console.log(err)) // 에러가 나면 에러를 출력해준다.c
 
app.get('/', (req, res) => {
  res.send('Hello World! 반가워요!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})