/* * @Author: Allen-lhj  
* @Date: 2020-05-09 12:02:52   
* @Last Modified time: 2020-05-09 12:02:52  
*  判断用户是否过期
*/

const UserOrOrders = require("../dbModel/user");
module.exports = async params => {
    let flag = false;
    try {
        const account = params.account;
        const user = await UserOrOrders.findOne({account});
        if(user) {
            if(new Date().getTime() > new Date(user.endTime).getTime()){
                console.log("过期用户");
                return flag;
            } else {
                console.log("合法用户");
                return !flag
            }
        } else {
            console.log('不合法用户');
            return flag;
        }
    } catch (error) {
        console.error(error)
        return flag;
    }
}