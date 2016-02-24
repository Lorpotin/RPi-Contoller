var express	= require('express');
var app		= express();
var bodyParser = require('body-parser');
var util = require('util');
var exec = require('child_process').exec;
var fs = require('fs');
var child1;
var child2;
var port = process.env.PORT || 8000;

app.use(bodyParser.json({type: 'application/json'}));

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/hex", function(req, res) {
	 if (!req.body) return res.sendStatus(400);
     console.log(req.body.hex);

     res.end();

});

app.get("/temp", function(req, res) {
    var object = {
        date: "",
        gputemp: "",
        cputemp: ""
    }
    child1 = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {

            object.date = new Date().getTime();
            object.cputemp = parseFloat(stdout)/1000;
        }
 
    });

    child2 = exec("/opt/vc/bin/vcgencmd measure_temp", function(error, stdout, stderr) {
        if(error !== null) {
            console.log('exec errooor: ' + error);
        } else {
            object.gputemp = stdout;
            res.send(object);
            res.end();
        }

    });

    
});

app.get("/files", function(req, res) {
    var array = [];
    
    fs.readdir("videos", function(err, items) {
        for (var i=0; i < items.length; i++) {
            var object = {
                data: ""
            }
            console.log(object.data);
            object.data = String(items[i]);
            array.push(object);
        }
        res.send(array);
        res.end();
    });


});

app.get("/video/:name", function(req, res) {
    var name = req.params.name;
    var path = 'videos/'+name;
    var stat = fs.statSync(path);
    var total = stat.size;
    if (req.headers['range']) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total-1;
        var chunksize = (end-start)+1;
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

        var file = fs.createReadStream(path, {start: start, end: end});
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
        file.pipe(res);
    } 
    else {
        console.log('ALL: ' + total);
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(path).pipe(res);
    }
});


var server = app.listen(port, process.env.IP, function () {
    var host = "192.168.0.193";
    var port = server.address().port;
    console.log("App running at http://%s:%s", host, port);
});