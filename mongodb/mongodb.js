/* * @Author: Allen-lhj  
* @Date: 2020-05-03 10:31:04   
* @Last Modified time: 2020-05-03 10:31:04  
* 数据库搭建
*/


const mongoose = require("mongoose");
const mongodbURI = require("../secret/mongodbURI").mongodbURI;

mongoose.connect(mongodbURI, {
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongodb is Connected. Please have a great code!`)
})