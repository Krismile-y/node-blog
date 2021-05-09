const formidable=require('formidable')
const path=require('path')
const Article=require('../../model/article').Article

 module.exports=(req,res)=>{
 //1.创建表单解析对象
 const form=new formidable.IncomingForm()

 //2.配置上传文件的存放位置 (客户端上传存放到服务端哪儿)
 form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

 //3. 保留上传文件的后缀   默认是不保留的
 form.keepExtensions=true

 //4.解析表单
 form.parse(req,(err,fields,files)=>{
  //1.err错误对象 如果表单解析失败 err里存错误信息，如果表单解析成功 err为空
  //2.fields 里面存储着普通表单的数据
  //3.files 里边存储这二进制表单的数据
  // console.log(files.cover.path.split('public')[1]);
  Article.create({
   title:fields.title,
   author:fields.author,
   publishDate:fields.publishDate,
   cover:files.cover.path.split('public')[1],
   content:fields.connect

  })

  res.redirect('/admin/article')
 })



}

