var express = require('express');
var serveStatic = require('serve-static');
var open = require('open');
var fs = require('fs'),
JSONStream = require('JSONStream'),
es = require('event-stream');
var MongoClient = require('mongodb').MongoClient;
var mongourl = "mongodb://localhost:27017/";

var app = express();
app.use(express.static(__dirname));
app.listen(process.env.PORT || 8888);


app.get('/data', function(req, res, next) {
	var jsonData = './data/temp.json'
	var fs = require('fs');
	fs.readFile('./data/temp.json', 'utf8', function(err, contents) {
	    str = "["+contents.replace(/\n/g, ",")+"]";
		res.json(str);
	});
});