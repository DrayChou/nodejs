var http = require('http');  
http.createServer(function (req, res) {  
      res.writeHeader(200, {"Content-Type": "text/plain"});  
      res.end("Hello oschina\n");  
}).listen(8000);  
console.log("httpd start @8000");

var net = require('net');
net.createServer(function (socket) {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
}).listen(8001);
console.log("net start @8001");