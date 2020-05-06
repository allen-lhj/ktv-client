/* * @Author: Allen-lhj  
* @Date: 2020-05-06 16:07:08   
* @Last Modified time: 2020-05-06 16:07:08  
* 管理员模型
*/

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const adminModel = mongoose.Schema({
    email:{
        require:true,
        type:String
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String,
        set(val){
            return bcrypt.hashSync(val, 10)
        }
    },
    identity:{
        // require:true,
        type:String
    },
    //创建时间
    date:{
        require:true,
        type:String
    }
})

module.exports = mongoose.model("Admin", adminModel)