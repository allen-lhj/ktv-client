/* * @Author: Allen-lhj  
* @Date: 2020-05-06 16:20:44   
* @Last Modified time: 2020-05-06 16:20:44  
* 用户上机模型
*/

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    order_id:{
        require:true,
        type:String
    },
    startTime:{
        require:true,
        type:String
    },
    endTime:{
        require:true,
        type:String
    },
    money:{
        require:true,
        type:String
    },
    account:{
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
    publicpwd:{  // 明文, 防止忘记密码
        require:true,
        type:String
    }
})
module.exports = mongoose.model("user_and_orders", userModel);