const mongoose = require('mongoose')

// 直接执行这个文件
require('./Schemas/User')
require('./Schemas/InviteCode')

const connect = () => {
  return new Promise((resolve) => {
    mongoose.connect('mongodb://127.0.0.1:27017/course-mgr')

    mongoose.connection.on('open', () => {
      console.log('连接成功')
      resolve()
    })
  })
}

module.exports = {
  connect
}