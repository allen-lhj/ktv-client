/* * @Author: Allen-lhj  * @Date: 2020-05-03 10:25:39   * @Last Modified time: 2020-05-03 10:25:39  */
const express = require("express")

const app = express()

app.get("*", (req, res) => {
    res.send("hello world!")
})

const port = process.env.PORT || 8080;
app.listen(port,err => {
    if(err) throw err;
    console.log(`Server is running on port [${port}].`)
})