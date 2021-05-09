const joi=require('joi')

//定义对象的验证规则
const schame ={
  username:joi.string().min(2).max(6).required().error(new Error('username验证不符合规定'))//最后一个是自定义错误信息
}


//try catch 必须用异步函数 捕获
async  function run() {
 try{
   //实施验证  第一个参数要验证的对象的值    第二个参数规则
   await joi.validate({username:'yh'},schame)
 }catch (err){
   console.log(er);
   return;
 }

  console.log('验证通过');
}

run();

//试着去执行 try里面的  如果通过就返回try里面的     如果错误就来来到catch 这个函数的第一个形参 错误信息