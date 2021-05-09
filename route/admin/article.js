const Article=require('../../model/article').Article

const pagination=require('mongoose-sex-page') //做分页功能的模块
module.exports=async (req,res)=>{
  //接收客户端传递过来的页码
  const page=req.query.page

 //标识 标识当前是文章管理页面
 req.app.locals.currentLink='article'

 //查询所有的文章
     let count=await Article.countDocuments({})//Article文章的总条数
     let num =Math.ceil(count/3)

     let temp=await  pagination(Article).find().page(page).size(3).display(num).populate('author').exec()
 //  let articles=await  Article.find().populate('author')

 // pagination（）里面传集合构造函数 表
 // page 指定当前页  就是显示哪一页
 // size 指定每页显示的数据条数
 // display 指定客户端要显示的页码数量
 // exec  向数据库发送查询请求

  let str = JSON.stringify(temp);
  let articles = JSON.parse(str);

 res.render('admin/article',{
  articles:articles,

 })

}