/* * @Author: Allen-lhj  
* @Date: 2020-05-09 11:23:14   
* @Last Modified time: 2020-05-09 11:23:14  
* 封装删除没有用到的资源函数
*/

const fs = require('fs');
const path = require('path');
const Music = require("../dbModel/music");

module.exports = {
    deAll: ()=> {
        let musicFiles = fs.readFileSync(path.resolve(__dirname, "../static/music"));
        let posterFiles = fs.readFileSync(path.resolve(__dirname, "../static/poster"));
        Music.find()
          .then(allmusic => {
              //删除图片
              posterFiles.forEach(item => {
                var isexist =false;
                allmusic.forEach(p => {
                    if(p.poster == item){
                        isexist = true;
                    }
                })
                if(!isexist){
                    fs.unlinkSync(path.resolve(__dirname, "../static.poster/" + item));
                    console.log("删除闲置图片资源"+ item)
                }
            })
               // 删除歌曲
               musicFiles.forEach(item => {
                var isexist = false;
                allmusic.forEach(m => {
                    if(m.src == item){
                        isexist = true;
                    }
                })
                if(!isexist){
                    fs.unlinkSync(path.resolve(__dirname, "../static/music/" + item))
                    console.log("删除闲置歌曲资源:" + item);
                }
            })
          })
    }
}