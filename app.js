
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , http = require('http')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  , io = require('socket.io');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/fuq', routes.fuq);
app.get('/:hashtag', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io = io.listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('msg', function(data) {
		console.log(data);
		io.sockets.emit('incoming', data);
	});
});
