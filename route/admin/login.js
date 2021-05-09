const User=require('../../model/user').User//导入用户集合的构造函数
const bcrypt=require('bcrypt')
const express=require('express')
const app=express()
const login =async(req,res)=>{
//  接收post的请求参数 req.body
//  下面是数组的解构
  const {email,password}=req.body
  if(email.trim().length==0||password.trim().length==0){//如果用户没有输入邮件地址
    res.status(400).render('admin/error.art',{
      msg:'输入的邮件或者密码错误'
    })
    // 默认状态码是200 400状态码是客户端的问题
    return;
  }
//---------------------------------------------------------下面是用户的邮箱的比对
//  根据邮箱地址查询用户信息  查询到是一个对象类型   没查到就是一个空
  let user= await  User.findOne({email:email})
  if(user){
    // 将客户端传递过来的密码 和数据库存储过来的密码进行比对
    //  使用bcrypt.compare 方法把加密后的密码和童虎传过来的密码进行比对  这个方法返回值是一个布尔类型
    //  第一个参数明文密码，第二个参数要比较的对象
    const isValue=  await  bcrypt.compare(password,user.password)
    if(email=== user.email && isValue){
      //  将用户名存储在请求对象中  请求路径的属性都是通用的   添加了session req才有此功能
      req.session.username=user
     //将用户名存储在session中
      req.session.role=user.role
      req.app.locals.userinfo=user  //这里的req.app  相当于 app.locals.userinfo=user  当然你要引入模块哦

      if(user.role=='admin'){
       res.redirect('/admin/user')
      }else {
        res.redirect('/home/')
      }

      // res.send('登陆成功')
      // express框架中的重定向    重定向到用户列表页面
      res.redirect('/admin/user')
    }else{//render()函数里面的位置填当前文件的  相对位置
      res.status(400).render('../views/admin/error',{msg:"邮箱或者密码错误"})
    }
  }
  else{
    res.status(400).render('../views/admin/error',{msg:"邮箱或者密码错误"})
  }
}

module.exports=login