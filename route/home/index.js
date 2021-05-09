//前台首页文件
const Article=require('../../model/article').Article
const pagination=require('mongoose-sex-page')


module.exports=async(req,res)=>{
  const page=req.query.page
  const result= await pagination(Article).find().page(page).size(4).display(3).exec()


  res.render('home/default.art',{
    result
  })
}