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
## 20-5-11
- 编写模板组件nav在所有页面中都会用到的导航，进行复用。
- 编写导航中需要使用的格式化日期date函数并引入。
- 在main.js中引入elementUi和iviewUI
- 编写index页面，将index和导航nav引入到home页面中
- 使用elementUI中的loading封装加载动画wsmLoading.js
- 配置axios在plugins文件夹中创建axios.js，创建请求和响应拦截，将后端获取token传入config