var http = require('http');

http.createServer(function(req, res){
  console.log("HIT ON THE Server Done!!");
  res.write("Hello Mihiroar :))");
  res.end();
}).listen(3000);