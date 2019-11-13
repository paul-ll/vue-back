const Router = require('koa-router')
const router = new Router()
const { categoryList} = require('../controllers/category')

router.get('/category', categoryList);

module.exports = router