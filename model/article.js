const mongoose=require('mongoose')

const articleSchema= new mongoose.Schema({
  title:{
    type:String,
    required:[true,'请填写文章标题'],
    maxlength:20,
    minlength:2
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',//填要关联的集合(表)  这儿显示的是User 表的用户id

  },
  publishDate:{
    type:Date,
    default:Date.now
  },
  cover:{
    type:String,
    default:null
  },
  content:{
    type:String
  }
})

 const Article=new mongoose.model('Article',articleSchema)

 module.exports={
  Article
 }