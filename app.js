var express = require('express');
var routes = require('./routes/router');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

/* Connect to the DB  */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

/* handle mongo error */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    /* connection made  */
});

/* parse incoming requests */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* serve static files from /public  */
app.use(express.static(__dirname + '/template'));

/* include routes */
app.use('/', routes);

/* catch 404's */
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

/* Error handler */
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        message: err.message,
        error: {}
    });
});

/* Listen on port 3000 */
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
})
