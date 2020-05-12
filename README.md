# Nodejs-VuejsKTV管理系统

##  20-5-5
- 安装express依赖搭建服务器
- 安装mongoose依赖，创建mongodbURI地址
- 创建mongodb.js，引入mongoose使用mongoose.connect连接数据库。
## 20-5-6
- 安装bcrypt加密依赖，建立数据模型
- admin adminlike music user
## 20-5-9
- 添加passport验证token是否合法，安装依赖passport;passport-jwt
- 添加格式化时间函数
- 采用协议跨域
- 封装删除没用的资源函数delNoUse
fs.readFileSync读取，fs.unlinkSync删除，使用绝对路径path.resolve
## 20-5-10
- 使用formidable封装上传图片和音乐接口
- 编写api
- 创建vue前台admin项目