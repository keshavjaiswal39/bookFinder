const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')

//db
require('./db')

//call routing level middleware
const apiRoute = require('./routes/api.route')

//load third-party middleware
app.use(morgan('dev'))

//accept every incoming request
app.use(cors())

//inbuilt middleware for parsing incoming data
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json()) //(for json)
app.get('/', function (req, res) {
    res.json({
        msg:"Hello"
    })
  });
//load routing level middleware(mount)
app.use('/api', apiRoute)
app.use(function (req, res, next) { //for undefined request
    next({
        msg: 'NOT FOUND 404',
        status: 404
    })
})

//error handling middleware
app.use(function (err, req, res, next) {
    console.log('Error is >>', err)
    res
        .status(err.status || 400)
        .json({
            msg: err.msg || err,
            status: err.status || 400
        })
})

app.listen(7070, function (err, done) {
    if (err) {
        console.log('Server failed to connect');

    } else {
        console.log('Server connected to 7070');
    }
})