/* * @Author: Allen-lhj  
* @Date: 2020-05-06 16:16:58   
* @Last Modified time: 2020-05-06 16:16:58  
* ktv推荐歌曲，管理员的操作
*/

const mongoose = require("mongoose");

const adminLikeModel = mongoose.Schema({
    s_id:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("adminLike", adminLikeModel)