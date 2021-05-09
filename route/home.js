const express=require('express')

//创建博客展示的路由
const home=express.Router()

//博客前台首页的展示页面
home.get('/',require('./home/index'))
//-------------------------------------------------------------------------------------------------------------------

//博客文章前台显示页面
home.get('/article',require('./home/article'))


//文章评论功能
home.post('/comment',require('./home/comment'))






module.exports=home