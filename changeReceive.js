const fs = require('fs');
const readLine = require('readline');
const querystring=require('querystring');
const util=require('util');
var filename = './receive.txt';
/*const app = require('express')
const server = require('http').Server(app)
const io = require('socket.io')(server)
server.listen(8080)*/
var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
//var io = require('socket.io').listen(server);

//server.listen(5000);
let postData

let logsArr = new Array();
let everyItem=[];
let itemObj=[];
let item={};


app.all('*', function(req, res, next) {       
    //设置跨域访问
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("X-Powered-By",' 3.2.1');
res.header("Content-Type", "application/json;charset=utf-8");
next();
});
var server = app.listen(8082,function(){
    var host = server.address().address;
    var port = server.address().port;
    
});
//设置跨域访问

//取相应文件
/*app.get('/',(req,res) =>{
    res.sendFile(__dirname+'./src/components/outCommand.vue');
});*/
// 先处理已有的数据
var name;
//init();
app.post('/api/receiveFile',function(req,res){
    var post='' 
    var address='C:/Users/ASUS/Desktop/key-smile-data/'
   // res.send('POST发送成功了')
   req.on('data', function(chunk){    
    post += chunk;
   name=chunk.toString('utf-8')//文件名
   if(name){
   let localName=address+name;
       filename=localName;
   }
   init()
    console.log(name)
    console.log(filename)
});
req.on('end', function(){    
    post = querystring.parse(post);
    res.end(util.inspect(post));
});

});
function init() {
    fetchHistoryLogs(filename, listenLogs);
}

function fetchHistoryLogs(filename, listenLogs) {
    let rl = readLine.createInterface({
        input: fs.createReadStream(filename, {
            enconding: 'utf8'
        }),
        output: null,
        terminal: false  //这个参数很重要
    });

    rl.on('line', function (line) {
        if (line) {
            logsArr.push(line.toString());
        }
    }).on('close', function () {
                var bd={}
            bd.build=logsArr[0]
            itemObj.unshift(bd)//创建文件行传入数组
        for (var i = 1; i < logsArr.length; i++) {
           //历史数据 console.log(logsArr[i]);
            //generateLog(logsArr[i])
            let history=logsArr[i]
           dataToJson(history)//历史数据转为json
        }
        listenLogs(filename);
    });
}

function generateLog(str) {
    var regExp = /(\[.+?\])/g;//(\\[.+?\\])
    var res = str.match(regExp);
    console.log(res);
    for (i = 0; i < res.length; i++) {
        res[i] = res[i].replace('[', '').replace(']', ''); //发送历史日志
    }
}

function listenLogs (filePath) {
    console.log('日志监听中...');
    var fileOPFlag = "r";
    fs.open(filePath, fileOPFlag, function (error, fd) {
        var buffer;
        fs.watchFile(filePath, {
            persistent: true,
            interval: 1000
        }, function (curr, prev) {
            // console.log(curr);
            if (curr.mtime > prev.mtime) {
                //文件内容有变化，那么通知相应的进程可以执行相关操作。例如读物文件写入数据库等
                buffer = new Buffer(curr.size - prev.size);
                fs.read(fd, buffer, 0, (curr.size - prev.size), prev.size, function (err, bytesRead, buffer) {
                    generateTxt(buffer.toString())
                });
            } else {
                console.log('文件读取错误');
            }
        });

        function generateTxt(str) { // 处理新增内容的地方
            var temp = str.split('\r\n');
            
            for (var s in temp) {
               // console.log(temp[s]);
                let newData=temp[s];
                dataToJson(newData);//更新数据转为json
            }
        }
    });
};

function getNewLog(path) {
    console.log('做一些解析操作');
}
var dataToJson=function (arr){
        let obj={}
        everyItem=arr.split("  ")//二维数组
        everyItem=everyItem.filter(n=> n)

        obj.time=everyItem[0]
        obj.command=everyItem[1]
        obj.message=everyItem[2]
        obj.id=everyItem[3]
        if(obj.time){
            
        console.log(obj)
       
        //实时发送信息
        postData=obj
        itemObj.push(obj)
        
        item.items=itemObj
        app.get('/api/receive',function(req,res){           //配置接口api
            res.status(200),
            res.json(item)
        })
        let itemJson=JSON.stringify(item)
        //socketInput(itemJson)//通过socket.io把json数据传给前端
       // socket.broadcast.emit('sendData', data)
        fs.writeFileSync("./receive.json", itemJson)
        }
   
    
}


//init();
/*io.sockets.on('connection', ()=>{
    console.log('用户链接成功')
    oSockets.push(socket)
    console.log('接收到了')
    socket.broadcast.emit('sendData', postData)
    console.log(postData)
    console.log("传入前端")
})*/


