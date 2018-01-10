var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var carouselRouter = require('./routers/carousel');
var cors = require('cors')
var app = express();

var whitelist = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:4200']

var PORT = 8081;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'shoppingList';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));

app.use(cors(
  { origin: '*' }
));
app.use('/api', carouselRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
