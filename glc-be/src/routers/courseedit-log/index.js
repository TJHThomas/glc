const Router = require('@koa/router')
const mongoose = require('mongoose')

const CourseEditCode = mongoose.model('CourseEditLog');

const router = new Router({
  prefix: '/courseedit-log'
})

router.get('/list', async (ctx) => {
  let {
    size,
    page,
  } = ctx.query;
  const {
    id: course_id,
  } = ctx.query;
  size = Number(size);
  page = Number(page);
  const list = await CourseEditCode
    .find({
      course_id,
    })
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()
  const total = await CourseEditCode.countDocuments().exec()
  ctx.body = {
    data: {
      total,
      list,
      size,
      page,
    },
    code: 1,
    msg: "获取列表成功"
  }
})

module.exports = router