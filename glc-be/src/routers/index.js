const auth = require('./auth')
const inviteCode = require('./invite-code')
const course = require('./course')
const courseEditLog = require('./courseedit-log')
const user = require('./user')

module.exports = (app) => {
  app.use(auth.routes())
  app.use(inviteCode.routes())
  app.use(course.routes())
  app.use(courseEditLog.routes())
  app.use(user.routes())
}