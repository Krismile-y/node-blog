const express=require('express')

const admin=express.Router()



//渲染登录页面
admin.get('/login',require('./admin/loginPage'))

//---------------------------------------------------------------------------------------------------------------

//实现登录功能  注意期初解析login模板用的是get方法


// login.art 里的form表单的action=‘/index/login’ method=‘post’    action里面的地址起手是/
// 解析步骤1. 点击提交按钮 将用post方式 把浏览器的请求地址变为 /index/login  并跳转过去
//        2. app.use('/admin') 就会进入该路径的的post二级路由，又匹配到相应的请求路径  就会执行对应的方法
//app.use() 是先输入 在匹配 在执行 我们先敲了/admin/进来了/,然后浏览器/admin/后面又跟了'/login' 的请求路径，就会执行下面这个admin.post('/login')方法

// app.use接收的是post请求才会用下面这个
admin.post('/login',require('./admin/login'))


//---------------------------------------------------------------------------------------------------------------

//创建用户列表路由
admin.get('/user',require('./admin/userPage'))

//---------------------------------------------------------------------------------------------------------------

//实现退出功能
admin.get('/logout',require('./admin/logout'))

//---------------------------------------------------------------------------------------------------------------
//  const aaa=require('./admin/user-edit').aaa
//创建用户编辑页面路由  aaa()
admin.get('/user-edit', require('./admin/user-edit') )

//---------------------------------------------------------------------------------------------------------------
// 创建用户实现添加功能的路由  post请求
admin.post('/user-edit',require('./admin/user-edit-fn'))

//修改用户的路由
admin.post('/user-modify',require('./admin/user-modify'))


//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'))

//文章列表路由
admin.get('/article',require('./admin/article'))


//文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'))

//实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))







module.exports=admin