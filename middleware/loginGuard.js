const guard=(req,res,next)=>{
  // 1.判断用户访问的是不是登录页面
  // 2.判断用户的登录状态
  // 3.如果用户是登录的  name放行
  // 4.如果不是登录的 将请求重定向到登录页面
  if(req.url !='/login' && !req.session.username){//!req.session.username 不为真(不存在)
    res.redirect('/admin/login')
  }else{ //是登录状态的话

    if(req.session.role=='normal'){ //如果是登录状态 且还是一个普通用户的话 ，让他跳转到博客首页 并阻止程序向下执行

      return   res.redirect('/home/')
    }
    next(); //放行
  }
}

module.exports=guard



//1.解析 在登录了 并且匹配了邮箱和密码无误后添加了session
//2. 如果你没登录然后直接访问除了/login 以外的路由， （因为只有登陆了成功之后才有session） 你就会重定向到登录页面  并且放行