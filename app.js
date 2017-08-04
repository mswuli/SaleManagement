//服务器端入口文件
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
app.use(express.static(__dirname));//定义静态资源库
console.log(__dirname);

//设置angular的ng-view页面
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
})


var server = app.listen(port, function() {
  console.log('Chat  is on portfff ' + port + '!')
});






