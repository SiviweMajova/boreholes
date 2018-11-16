// The node js server

var mysql = require('mysql'); // get the instance of the mysql nodejs driver
var express = require('express'); // the web server that will respond to REST calls

var api = express();

const PORT = 8001; // the server will listen to this port

const db = mysql.createConnection ({
    host: 'boreholeinstance.cjosoyjmv9t7.eu-west-2.rds.amazonaws.com',
    user: 'svij',
    password: 'borehole',
    database: 'boreholedb'
});

// connect to the instance
db.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log('Connected to mysql aws database...');
});

api.use(express.json());  // to read request body
api.use(function (req, res, next) {
    // Allow the front end to get resources
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8002');
    // Methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    //Headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

// GET - list of boreholes
api.get('/listBoreholes', function (req, res) {
    db.query('SELECT * from borehole', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
 });

 // POST - add borehole
 api.post('/addBorehole', function(req, res) {
    //not null checking, we assume all fields are provided
    db.query('insert into borehole (name, b_type, latitude, longitude, elevation) values("'
    +req.body.name+'", "'+req.body.b_type+'", '+req.body.latitude+', '+req.body.longitude+', '+req.body.elevation+');',
    function(err, results, fields) {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
 });

 // Patch - update existing borehole
 api.patch('/updateBorehole', function(req, res) {
    //not null checking, we assume all fields are provided
    db.query('update borehole set name="'
    +req.body.name+'", b_type="'+req.body.b_type+'", latitude='+req.body.latitude+', longitude='+req.body.longitude+', elevation='+req.body.elevation+');',
    function(err, results, fields) {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
 });

 // Delete - update existing borehole
 api.delete('/deleteBorehole/:id', function(req, res) {
    //not null checking, we assume all fields are provided
    db.query('delete from borehole where id='+req.params.id+';',
    function(err, results, fields) {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
 });

 var server = api.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Borehole server listening at http://%s:%s", host, port);
 });


 // Exit gracefully
 process.on('SIGTERM', function() {
    server.close(function() {
      console.log('Http server closed.');
      db.connection.close(false, function() {
        console.log('MySQL connection closed.');
        process.exit(0);
      });
    });
});

