const path = require('path');
class ServerCtl {
    users(ctx) {
        // 返回结果
     let users = [{id:1,name:'zhufeng1'},{id:2,name:'zhufeng2'},{id:3,name:'zhufeng3'},{id:4,name:'zhufeng6'}];
    ctx.response.status = 200;
    ctx.body = users;
    }
}
module.exports = new ServerCtl()