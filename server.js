
//require表示引包，引包就是引用自己的一个特殊功能
var http = require("http");
var url = require("url");
const test = require("./test");
var server = http.createServer();

server.on('request', async function (req, res) {
   //得到查询部分，由于写了true，那么就是一个对象
    var queryObj = url.parse(req.url,true).query;
    var game = queryObj.game;
    var input_time = queryObj.input_time;
    var i_times = queryObj.i_times;

    let result = await dealRequest(game,input_time,i_times);


    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    res.write("运行中");
    res.end(result);
});

async function dealRequest(game,input_time,i_times) {
    let result=await test.main(game,input_time,i_times);
    return result;
}


//运行服务器，监听3000端口（端口号可以任改）
server.listen(3000,"127.0.0.1");

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/')