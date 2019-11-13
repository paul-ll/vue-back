const koa = require('koa')
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
// const bodyparser = require('koa-bodyparser')

const error = require('koa-json-error')
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new koa();
const routing = require('./routers')
const {
	connectionStr
} = require('./config');

mongoose.connect(connectionStr, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => console.log('MongoDB 连接成功了！'));
mongoose.connection.on('error', console.error);
app.use(koaStatic(path.join(__dirname, 'public')));

// 跨域设置 
// app.use(convert(cors));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
 });
app.use(error({
	postFormat: (e, {
		stack,
		...rest
	}) => process.env.NODE_ENV === 'production' ? rest : {
		stack,
		...rest
	}
}))
app.use(koaBody({
	multipart: true,
	formidable: {
		uploadDir: path.join(__dirname, '/public/uploads'),
		keepExtensions: true,
	},
}));
//错误处理
// app.use(bodyparser())
app.use(parameter(app))
routing(app)


app.listen(3000, () => {
	console.log('3000duankou')
})