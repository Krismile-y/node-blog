//文章详情页面
const Article=require('../../model/article').Article
const comment=require('../../model/comment').comment
module.exports=async (req,res)=>{

 const id=req.query.id

//查询当前文章所对象的评论信息
 let comments=await comment.find({})

 let article=await Article.findOne({_id:id}).populate('author').lean()

 // res.send(populate)
 res.render('home/article',{
  article,
  comments
 })



}