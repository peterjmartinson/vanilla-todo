/*jshint esversion:6, node:true */
(function() {
  'use strict';

  const express    = require('express'),
        path       = require('path'),
        app        = express(),
        port       = 3000,
        bodyParser = require('body-parser'),
        fs         = require('fs'),
        model      = require('./bin/model'),
        routes     = require('./bin/routes');

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

  // current ghetto way to grab the contents of a file.
  app.get('/file:file_name', function(req, res) {
    let file_name = __dirname + '/data/' + req.params.file_name;
    fs.readFile(file_name, 'utf8', function(err, data) {
      res.send(data);
    });
  });

  app.get('/query:id', function(req, res) {
    model.readItem(req.params.id, function(response) {
      if (response.success) {
        let file_name = path.join(__dirname, 'data', response.item.file_name);
        fs.readFile(file_name, 'utf8', function(err, data) {
          res.send(data);
        });
      }
      else {
        res.send('File Not Found');
      }
    });
  });

  // Return all todos
  app.get('/api/todo', model.readAllItems);

  // Create one new todo
  app.post('/api/todo', model.createItem);

  // Return one todo by ID
  app.get('/api/todo:id', model.readItem);
      
  // Update one todo by ID
  app.put('/api/todo:id', function() {});

  // Delete one todo by ID
  app.delete('/api/todo:id', function() {});

  app.listen(port, function (){
    console.log('Server is listening to %d port in %s mode',port,app.settings.env);
  });


}());
