const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const CourseSchema = new mongoose.Schema({
  // 课程名称
  course_name: String,
  // 授课教师
  teacher_name: String,
  // 节数
  patch: String,
  // 地点
  place: String,
  // 学分
  credit: Number,
  // 人数
  people_number: Number,

  meta: getMeta()
})

CourseSchema.pre('save', preSave)

mongoose.model('Course', CourseSchema)