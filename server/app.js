var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', require('./routes/productsRoute')); //anger grund-urlen
app.use('/users', require('./routes/usersRoute')); 
app.use('/cart', require('./routes/cartRoute'));

module.exports = app; 