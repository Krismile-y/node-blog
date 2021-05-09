const User=require('../../model/user').User

module.exports=async (req,res)=>{
 //获取要删除的用户id
  const id=req.query.id

//  根据id删除用户  如果不使用await阻塞 的特性 他就会 先执行同步函数 下面那个 ，然后已经重定向到其他页面也就删除不到了  执行顺序很重要
  await User.findOneAndDelete({_id:id})//异步

  res.redirect('/admin/user') //同步
}