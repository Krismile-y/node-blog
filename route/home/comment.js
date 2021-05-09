
const common=require('../../model/comment').comment

module.exports=async (req,res)=>{
  const content=req.body.content
  const uid=req.body.uid
  const aid=req.body.uid

  //将评论信息存储到评论集合中
 await common.create({
    content:content,
    uid:uid,
    aid:aid,
    time:new Date()
  })


 res.redirect('/home/article?id=609524f422e4f040f077d46e')
}