  const joi=require('joi')
  const User=require('../../model/user').User
  const vilidateUser=require('../../model/user').vilidateUser
  const bcrypt=require('bcrypt')

//await 后面的返回值 你打不打印它都是存在的
module.exports=async(req,res,next)=>{


  try {
 await   vilidateUser(req.body)
  }catch (e) {
  //e.message

  //2. 如果验证没有通过  我们就重定向到用户添加页面
 // return   res.redirect('/admin/user-edit?message='+e.message)
 //   JSON.stringify() 将对象数据类型转换为 字符串数据类型

    return next(JSON.stringify({path:'/admin/user-edit',message:e.message}) )
  }

 // 3.根据邮箱地址 查询用户是否存在   表单提交的post请求 所以用body   用get请求 就用query
 const user=await User.findOne({email:req.body.email})

 //如果邮箱地址已有 就提示用户
 if(user){//重定向到（童虎添加页面） 该路径 并且给req添加了query
 // return  res.redirect('/admin/user-edit?message='+'邮箱已经被占用')
   return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}) )
 }

// 4.对密码进行加密
//4.1 生成随机字符串
 const salt= await bcrypt.genSalt(10)
 //bcrypt.hash(req.body.password,salt)只是一个操作   await获取操作后的结果
 const password=await bcrypt.hash(req.body.password,salt)
// 4.2替换密码
 req.body.password=password
 //4.3 将用户的数据添加到数据库中
await User.create({ //这里为什么要加await  在之前也有await  加了他会安顺序执行
  username:req.body.username,
  password:req.body.password,
  email:req.body.email,
  role:req.body.role,
  state:req.body.state
})

 // 4.4 重定向到用户列表页面 res.redirect()方法里    包含了res.send()方法
 res.redirect('/admin/user')
}