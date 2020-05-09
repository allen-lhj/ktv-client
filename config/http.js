/* * @Author: Allen-lhj  
* @Date: 2020-05-06 17:05:19   
* @Last Modified time: 2020-05-06 17:05:19  
* 配置请求
*/

module.exports = app => {
    app.all("*", (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if(req.method == 'OPTIONS') {
            res.sendStatus(200); // 让options请求快速返回
        }
        else{
            next();
        }
    })
}