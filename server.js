var express = require('express');
var path = require('path');
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Setup for public folder
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port'+port+' !');
})

/* GET home page. */
app.get("/", function(req, res, next){
  res.render("index", {});
})
