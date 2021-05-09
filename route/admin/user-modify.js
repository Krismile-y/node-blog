const User=require('../../model/user').User
const bcrypt=require('bcrypt')

module.exports=async (req,res,next)=>{
  //1.表单的提交是post请求过来的
   const body=req.body

  //2.即将要修改的用户id 这里的id是get请求过来的
  const id= req.query.id

  let user=await User.findOne({_id:id})

  //3.密码比对  由于数据库的密码都是都是加密的 所以要引入bcrypt模块 用compare讲明文密码 和暗文密码进行比对  返回一个布尔值
  //3.1 compare的第一个参数 是明文密码 第二个参数是暗文密码
let isValid= await bcrypt.compare(body.password,user.password)

  if(isValid){//密码比对成功
    //将用户修改的信息更新到数据库中
    //updateOne方法 第一个参数查询到具体哪个要修改的对象  第二个参数要修改的值这里面的第一个是数据库里的内容，第二个是要修改的值
   await User.updateOne({_id:id},{
      username:body.username,
      email:body.email,
      role:body.role,
      state:body.state
    })
    //页面的重定向到用户列表页面
    res.redirect('/admin/user')
  }else{//密码比对失败
    let obj={path:'/admin/user-edit',message:'密码比对不成功,不能进行用户的修改',id:id}
    next(JSON.stringify(obj))
  }
}