var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var mime = require('mime');

/*serial port stuff */
const comPort = '/dev/tty.usbmodem621';
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sp = new SerialPort(comPort, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\r\n") 
});

var server = http.createServer(function(req, res) {
  var data = "";
  var settings;
  if(req.url == '/set') {
    req.on("data", function(chunk) {
      data += chunk;
    });
    
    req.on("end", function() {
      settings = qs.parse(data);
      settings.color = parseInt(settings.color, 16);
      sp.write("#"+ settings.color.toString(16) +"\r\n");
    })
    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    
    res.end(JSON.stringify(["OK"]));
  } else {
    var file = '';

    if(req.url == '/') {
      file =  process.cwd() + '/public/index.html';
    } else {
      file = process.cwd() + '/public' + req.url;
    }
        
    fs.readFile( file , function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type':'text/plain'});
        res.end('internal error: ' + err);
      } else {
        res.writeHead(200, {'Content-Type': mime.lookup(file)});
        res.end(data, 'utf-8');
      }
    });
  }
});
server.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');