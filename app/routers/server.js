const Router = require('koa-router')
const router = new Router()

const { users} = require('../controllers/server')
router.get('/api/users', users);

module.exports = router