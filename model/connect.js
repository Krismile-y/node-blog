const mongoose=require('mongoose')
// 连接一个数据库  里面可以有多个表

//导入config 模块
const config=require('config')
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser: true , useUnifiedTopology: true}).then(res=>{
  console.log('数据库连接成功');
}).catch(err=>{
  console.log('数据库连接失败');
})