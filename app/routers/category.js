const Router = require('koa-router')
const router = new Router()
const { categoryList,articleList} = require('../controllers/category')

router.get('/category', categoryList);
router.get('/article', articleList);

module.exports = router