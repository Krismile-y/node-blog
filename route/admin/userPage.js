//这个页面时用户列表 页面
const User=require('../../model/user').User

module.exports=async (req,res)=>{
  //标识 标识当前是用户管理页面
  req.app.locals.currentLink='user'
  //接收客户端传过来的 当前页参数
  let page=req.query.page ||1;
  // //每一页显示的数据条数
  let pagesize=10
  //查询用户 数据的总数 countDocuments()这个方法
  let count=await User.countDocuments({})
 // 总页数   Math.ceil向上取整  打个比方3.8就取4    4.1也是取4
  let total=Math.ceil(count/pagesize)

  //limit 只显示多少条数据 skip 跳过多少条数据 起手0和索引一样
  const start =(page-1)*pagesize

  //将用户信息从数据库查询出来
  let users=await User.find({}).limit(pagesize).skip(start)

  res.render('admin/user.art',{ //这个是基于你配置的模板的根目录  写的相对路径
    users:users,
    page:page,
    total:total
  })

  // res.render('../../views/admin/user.art',{//这个是基于你当前所在的js文件  写的相对路径
  //   users:users,
  //   page:page,
  //   total:total
  // })
}