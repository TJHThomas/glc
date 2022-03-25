const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number,
})

const UserModel = mongoose.model('User', UserSchema)

const connect = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/course-mgr')

  mongoose.connection.on('open', () => {
    console.log('连接成功')

    const user = new UserModel({
      nickname: '小红',
      password: '123456',
      age: 12,
    })

    user.age = 99

    user.save()
  })
}

connect()