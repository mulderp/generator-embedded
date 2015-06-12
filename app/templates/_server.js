var fs = require('fs');
var http = require('http');
var finalhandler = require('finalhandler');
var morgan = require('morgan');

var Router = require('router');
var router = Router();

// add serial port
var firmata = require('firmata');
var modem = '/dev/cu.usbmodem14131';

var port = 3474;
console.log('Starting server at port: ' + port);

// logging
router.use(morgan('default'));

// basic static files
router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('static/index.html'));
});
router.get('/bundle.js', function(req,res) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(fs.readFileSync('static/bundle.js'));
});

// API to hardware
var api = Router();

api.get('/:pin/check', function(req, res) {
  board.digitalWrite(req.params.pin, 1);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({status: 'ok'}));
});
router.use('/api', api);

// board
var board = new firmata.Board(modem, function(err){
  if (!err) {
    console.log('connected: ' + modem);
  } else {
    console.log('problem with: ' + modem);
    console.log(err);
    process.exit()
  }



  http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res));
  }).listen(port);

});
