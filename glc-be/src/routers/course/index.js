const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

const Course = mongoose.model('Course');
const CourseEditCode = mongoose.model('CourseEditLog');

const findCourseOne = async (id) => {
  const one = await Course.findOne({
    _id: id,
  }).exec();
  return one;
}

const router = new Router({
  prefix: '/course'
})

router.post('/add', async (ctx) => {
  const { course_name, teacher_name, patch, place,
    credit, people_number, } = getBody(ctx)

  const course = new Course({
    course_name, teacher_name, patch, place,
    credit, people_number,
  })

  const res = await course.save()

  ctx.body = {
    data: res,
    code: 1,
    msg: '新增成功'
  }
})

router.get('/list', async (ctx) => {
  const {
    page = 1,
    keyword = ''
  } = ctx.query

  let {
    size = 10,
  } = ctx.query

  size = Number(size)

  const query = {}
  if (keyword) {
    query.course_name = keyword
  }

  let list = {}
  if (query.course_name) {
    list = await Course.find(query).exec()
  } else {
    list = await Course.find(query).skip((page - 1) * size).limit(size).exec()
  }

  const total = await Course.countDocuments()

  ctx.body = {
    data: {
      total,
      list,
      page,
      size,
    },
    code: 1,
    msg: '获取列表成功'
  }
})

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  const delMsg = await Course.deleteOne({
    _id: id
  })
  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功'
  }
})

router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = getBody(ctx);

  const one = await findCourseOne(id)

  if (!one) {
    ctx.body = {
      msg: '没有找到该课程',
      code: 0,
    }
    return
  }

  const newQuery = {}
  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value
    }
  })
  Object.assign(one, newQuery)

  const res = await one.save()

  const log = new CourseEditCode({
    course_id: id
  })
  log.save()

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功'
  }
})

router.get('/detail/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;
  const one = await findCourseOne(id);
  if (!one) {
    ctx.body = {
      msg: '没有找到该课程',
      code: 0,
    }
    return
  }
  ctx.body = {
    msg: '查询成功',
    code: 1,
    data: one,
  }
})

module.exports = router