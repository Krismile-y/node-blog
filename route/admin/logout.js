module.exports=(req,res)=>{
    //删除session
      req.session.destroy(function () {
    //  删除cookies
      res.clearCookie('connect.sid')//填你的cookies名字

    //  重定向到用户登录页面
      res.redirect('/admin/login')
      //清除模板的用户信息
      req.app.locals.userinfo=null
  })

  //req.session.destroy删除完成会调用一个回调函数，在回调函数里我们再来删除cookies（在控制台Application去看名字）
}