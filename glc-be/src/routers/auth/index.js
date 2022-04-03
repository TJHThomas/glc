const Router = require('@koa/router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { getBody } = require('../../helpers/utils')

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
  prefix: '/auth'
})

router.post('/register', async (ctx) => {
  const { account, password, inviteCode, } = getBody(ctx)

  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }

  const user = new User({
    account,
    password,
  })

  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec();
  if ((!findCode) || findCode.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data: null
    }
    return
  }

  const findUser = await User.findOne({
    account
  }).exec()
  if (findUser) {
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null
    }
    return
  }

  const res = await user.save()

  findCode.user = res._id
  findCode.meta.updateAt = new Date().getTime()
  await findCode.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }
})

router.post('/login', async (ctx) => {
  const { account, password } = getBody(ctx)

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }

  const one = await User.findOne({
    account,
  }).exec()

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null,
    }
    return
  }

  const user = {
    account: one.account,
    _id: one._id
  }

  if (one.password === password) {
    ctx.body = {
      code: 1,
      msg: '登入成功',
      data: {
        user,
        token: jwt.sign(user, 'course-mgr')
      },
    }
    return
  }
  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null,
  }
})

module.exports = router