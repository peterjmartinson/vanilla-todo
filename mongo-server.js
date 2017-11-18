(function() {
  'use strict';

  const express    = require('express'),
        path       = require('path'),
        app        = express(),
        port       = 3000,
        bodyParser = require('body-parser'),
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert');

  let dummy_doc = {name: "hello", created_on: new Date()};

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/public'));

  app.use(logError);
  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.get('/', function(req, res) {
    res.send('index');
  });

  // Enter the Mongo ====================
  MongoClient.connect("mongodb://localhost:27017/nibDB", function(err, db) {
    
    if(err) throw err;

    console.log("Successfully connected to MongoDB.");

    db.collection("notes").insertOne(dummy_doc, function(err, res) {
      if(err) throw err;

      console.log("Inserted document with _id: " + res.insertedId + '\n');

    });

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log("Express server listening on port %s.", port);
    });

  });









}());
