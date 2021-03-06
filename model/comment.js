const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
   //文章id
   aid:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Article'
   },
  //用户ID
  uid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  time:{
     type:Date
  },
  content:{
     type:String
  }
 })

const comment= new mongoose.model('comment',commentSchema)

module.exports={
  comment
}