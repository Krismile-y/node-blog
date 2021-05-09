const bcrypt=require('bcrypt')

// bcrypt.genSalt() 返回值是promise对象 我们用await接收值

 async function run() {

 const salt=await bcrypt.genSalt() //生成随机字符串 数值越大越复杂 默认值是10

  //对密码进行加密
  //第一个参数是要进行加密的明文
  //第二个参数是 随机字符串
  //返回值是加密后的密码
 const result=await bcrypt.hash('123456',salt)
  console.log(salt);
  console.log(result);
}
run()