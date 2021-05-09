 //我在node-blog 文件中安装的模块  整个文件夹中的所有文件只要引用了就可用可用   除了一些特有的导出方法 需要导入才能用
 const session=require('express-session') //这个返回一个方法
 const express=require('express')
 const app=express()
 const home=require('./route/home.js')
 const admin=require('./route/admin.js') //引入过来了就是一个文件了   但还是各自执行各自的
 const path =require('path')
 require('./model/connect')
 const bodyParser=require('body-parser') //获取post参数 要安装的包    返回一个模块对象    如果是返回函数就要括号了
 const dateformat=require('dateformat')
 const artTemplate=require('art-template')
 const morgan=require('morgan')
 const config=require('config')   //config模块管理操作配置文件。 他会自动对运行环境进行判断
//------------------------------------------------------------------------------------------------------

// 1.处理post请求参数
 app.use(bodyParser.urlencoded({extended:false}))

 //------------------------------------------------------------------------------------------------------
 //配置session  saveUninitialized: false 当用户没登录的时候，不能保存cookies
 app.use(session({secret:'secret key',
                         saveUninitialized: false,
                         cookie:{//默认是关闭了浏览器就会删除cookies,设置了这个 作用是cookie超过了这个时间才会自动删除 单位毫秒.
                         maxAge:24*60*60*1000
                         }
 }
 )
 )

 //------------------------------------------------------------------------------------------------------

// 使用哪种模板
  app.engine('art',require('express-art-template'))//引入了express模板  res.render才能使用
// 告诉express框架 模板所在的位置  views默认配置项
  app.set('views',path.join(__dirname,"views"))
// 告诉express框架 模板的默认后缀
  app.set('view engine','art')

//想末班内部导入dateformat变量
 artTemplate.defaults.imports.dateformat=dateformat

// -----------------------------------------------------------------------------------------------------

// 模板的路径 是相对于浏览器的请求路径  最后一个是文件，最后一个文件是相对路径
 // 配合这个 app.use(express.static( path.join(__dirname,'public')))路径  并模板里面的文件都填绝对路径/起手
// 静态资源的外联路径都填绝对路径（浏览器解析）   ！！！！模板引入的 模板文件用相对路径（模板引擎解析）
// Express 会在静态资源目录下查找文件
 app.use(express.static( path.join(__dirname,'public'))) //注意要放到 读取模板的后面
//------------------------------------------------------------------------------------------------------

 console.log(config.get('title'));
 //拦截请求  用session判断用户登录状态！！！！！
 app.use('/admin',require('./middleware/loginGuard'))


 //------------------------------------------------------------------------------------------------------
 // 获取系统环境变量 返回值是对象
 if(process.env.NODE_ENV=='development'){
  //在开发环境中 将客户端发送给服务器的请求信息打印到控制到中
  //morgan('dev') 固定写法
  app.use(morgan('dev'))
 }else {

 }




 //------------------------------------------------------------------------------------------------------

//   http://localhost/admin/login
//   稳妥起见我们这里默认加/  action=‘’ 也/起手
 app.use('/home',home)  //加载了 './route/home.js'文件  两边连在了一起  （基于那边的方法，这边我也可以用了，不要想复杂了）
 app.use('/admin',admin)


 //------------------------------------------------------------------------------------------------------

 //处理错误信息
 app.use((err,req,res,next)=>{
    //将字符串  转为对象 JSON.parse()
   const result=JSON.parse(err)

  let params=[]
  for(let attr in result){
  if(attr !=='path'){
    params.push(attr+'='+result[attr])
  }
  }
    res.redirect(`${result.path}?${params.join('&')}`)
 })



 // http://localhost:80/admin/login  80是默认端口所以浏览器不用写80也是可以的
 app.listen(80,()=>{
   console.log('服务器启动成功');
 })

 //获取系统环境变量 返回值是一个对象
 // console.log(process.env.NODE_ENV);

