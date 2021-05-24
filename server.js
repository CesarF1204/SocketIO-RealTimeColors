const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
//body parser
app.use(bodyParser.urlencoded({extended: true}));
//views
app.use(express.static(__dirname + "/views"));
//css
app.use(express.static(__dirname + "/css"));
//ejs
app.set('view engine', 'ejs');
//routes
app.get("/", function(request, response) {
    response.render("index");
});
//port
const server = app.listen(8000, function() {
	console.log("listening on port 8000");
})
//socket.io
let color = '';
const io = require('socket.io')(server);    // socket.io connection
io.sockets.on('connection', function(socket) {  // Establishing a connection with user
    // console.log(socket);
	console.log("Connected: "+ socket.connected);
    console.log("Socket ID: "+ socket.id);
    //red
	socket.on("green_clicked", function(data) {
        color = 'green';
        console.log('You emitted the following information to the server: ' + data.color);
		io.emit("updated_color", {color: color});
	});
    //green
    socket.on("blue_clicked", function(data) {
        color = 'blue';
        console.log('You emitted the following information to the server: ' + data.color);
		io.emit("updated_color", {color: color});
	});
    //blue
    socket.on("pink_clicked", function(data) {
        color = 'pink';
        console.log('You emitted the following information to the server: ' + data.color);
		io.emit("updated_color", {color: color});
	});
    io.emit("updated_color", {color: color});
});