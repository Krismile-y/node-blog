const User=require('../../model/user.js').User


// // 因为我们配置了模板的根目录   所以后面改写相对路径   不以/起手   以/起手是绝对路径
module.exports=async (req,res)=>{
  //标识 标识当前是用户管理页面
  req.app.locals.currentLink='user'

//因为 面板修改按钮(模板中每个用户对应一个修改按钮，在那里传过来一个用户id)
 const message =req.query.message
 //1.获取到地址栏的id参数
 const id=req.query.id

 //2.如果当前传递了id参数 说明是修改操作 否则就是添加操作
 if(id){// 修改操作
   let user= await User.findOne({_id:id})
   res.render('admin/user-edit',{//渲染用户编辑页面
   message,
   user,
   link:'/admin/user-modify?id='+id,
   button:'修改'
  })
 }else {// 添加操作
  res.render('admin/user-edit',{
   message,
   link:'/admin/user-edit',
   button:'添加'
  })
 }


}


//常规的导出函数是这样写的
// const aaa=function () {
//  return (req,res)=>{
//   const message =req.query.message
//   return res.render('admin/user-edit',{
//    message
//   })
//  }
// }
// module.exports={
//  aaa
// }


