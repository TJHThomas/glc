const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helpers')

const CourseEditLogSchema = new mongoose.Schema({
  user: String,
  course_id: String,

  meta: getMeta()
})

CourseEditLogSchema.pre('save', preSave)

mongoose.model('CourseEditLog', CourseEditLogSchema)