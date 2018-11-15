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

// GET - list of boreholes
app.get('/listBoreholes', function (req, res) {
    db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
 })
 
 var server = api.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Borehole server listening at http://%s:%s", host, port);
 })

