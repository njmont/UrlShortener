"use strict";
var express = require('express');
var path = require('path');
var app = express();
const mongo = require('mongodb').MongoClient;
const DBHelper = require("./helpers/dbhelper.js").DBHelper;
const DBHost = process.env.DBHost ||"mongodb://localhost:27017/learnyoumongo";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup for public folder
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Example app listening on port ' + port + ' !');
})

/* GET home page. */
app.get("/", function(req, res, next) {
    res.render("index", {});
})

/* GET create new shortened url. */
app.get("/new/*", (req, res, next) => {
    let url = req.params[0],
        response = {};
    if (url.match(/^(http\:\/\/|https\:\/\/)(\w|.)+$/)) {
        mongo.connect(DBHost, (err, db) => {
            if (db, res) {
                DBHelper.insertOrFind(db, url, res);
            }
            if (err) {
                response.err = err;
                res.json(response);
            }
        })
    } else {
        response.error = "Please provide a valid URL";
        res.json(response);
    }
})

app.get("/shortened", (req, res, next) => {
  mongo.connect(DBHost, (err, db) => {
    let urls = db.collection('urls');
    urls.find({}, {
      original_url: 1,
      short_url: 1,
      _id: 0
    }).toArray((find_err, docs) => {
      if (find_err) throw find_err;
      if (docs && docs.length > 0) res.json(docs);
      if (docs) res.json({error: "There are no shortened urls right now"});
    })
  })
})

/* GET create new shortened url. */
app.get("/:url_id", (req, res, next) => {
    mongo.connect(DBHost, (err, db) => {
        let urls = db.collection('urls');
        urls.find({
            url_id: Number(req.params.url_id)
        }).toArray((find_err, docs) => {
            db.close();
            if (docs.length > 0) {
                res.redirect(docs[0].original_url);
            } else {
                res.json({error: "We couldn't find that URL."});
            }
        })
    })
})
