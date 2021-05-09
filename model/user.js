const bcrypt=require('bcrypt')
const joi = require("joi");
// 创建用户集合
const mongoose=require('mongoose')


//规则
const Schema=  new mongoose.Schema({
   username:{
     type:String,
     maxlength:20,
     minlength:2,
     required:true
   },
  email:{
     type:String,
    //保证邮箱地址插入数据库时候不重复  unique:true,
    unique:true,
    required:true
  },
  password:{
   type:String,
    required:true
  },
  role:{//角色  admin 超级管理员     normal普通用户
     type:String,
    required:true
  },
  state:{//状态    0是启用状态   1是禁用状态
    //  type:Number,
    // default:0
  }
})

const User= new mongoose.model('User',Schema) //返回的是一个构造函数

async function createUser(){
  const salt=await bcrypt.genSalt(10)
  const pass=await bcrypt.hash('123456',salt)

  const user=await User.create({
    username:'锐雯',
    email:'2587216169@qq.com',
    password:pass,
    role:'admin',
    state:0
  })
}
// createUser();



//声明一个方法来验证用户信息
const vilidateUser=(user)=>{
  //定义规则
  const schema={
    username:joi.string().min(2).max(20).required().error(new Error('用户名不符合验证规则')),
    email:joi.string().email().required().error(new Error('邮箱不符合验证规则')),
    password:joi.string().required().error(new Error('密码不符合验证规则')),
    role:joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
    state:joi.number().valid(0,1).required().error(new Error('状态值值非法')),
    //valid() 里面的用户必须穿这里面的相应字段
  }
    //1.实施验证
  return   joi.validate(user,schema)
}





module.exports={
  User,
  vilidateUser
}


//动物                               ---  对象
// 一只狗    一只狗拥有动物的所有属性和方法    ---  实例