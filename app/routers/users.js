const jwt = require('koa-jwt');
const Router = require('koa-router')

const { secret } = require('../config');
const router = new Router({ prefix: '/users' })
const {find,create,findById,update,delete:del,login,checkOwner,listFollowing,listFollowers,checkUserExist,follow,unfollow,listFollowingTopics, followTopic,
     unfollowTopic,listQuestions} = require ('../controllers/users.js')
const { checkTopicExist } = require('../controllers/topics');
const auth = jwt({ secret });

// const auth =  async (ctx,next)=>{
//     const {authorization=''} = ctx.request.header;
//     const token = authorization.replace('Bearer','')
//     try{
//         const user = jsonwebtoken.verify(token,secret);
//         ctx.state.user = user;
//     }catch(err){
//         ctx.throw(401,err.message)
//     }
//     await next() 

// }

router.get('/',find)
router.post('/',create)
router.get('/:id',findById)
router.patch('/:id',auth,checkOwner, update);

router.delete('/:id',auth,checkOwner, del);
router.post('/login',login );
router.get('/:id/following', listFollowing);
router.get('/:id/followers', listFollowers);
router.put('/following/:id', auth, checkUserExist, follow);
router.delete('/following/:id', auth, checkUserExist, unfollow);
router.get('/:id/followingTopics', listFollowingTopics);
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic);
router.get('/:id/questions', listQuestions);
module.exports = router