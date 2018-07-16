var express = require('express');
var router = express.Router();
const User = require('../model/schema');

/* GET */
router.get('/', function(req, res, next) {
    return res.send("working");
});

/* GET route after registration */
router.get('/profile', function(req,res,next) {
    return res.send('GET profile');
});


/* POST route for updating data  */
router.post('/', function(req, res, next) {
    const { email, username, password, passwordConf } = req.body;

    if(password !== passwordConf) {
        const err = new Error('Passwords do not match');
        err.status = 400;
        return next(err);
    }

    if (email && username && password && passwordConf) {

        const userData = { email, username, password };

        User.create(userData, function(err, user) {
            if(err) return next(err);
            return res.redirect('/profile');
        });
    } else {
        const err = new Error('Please fill out all fields');
        err.status = 400;
        return next(err);
    }
});

/* POST route after registering  */
router.post('/profile', function (req, res, next) {
    return res.send('POST profile');
});


module.exports = router;
