/*jshint esversion:6, node:true */
(function() {
  'use strict';

  const express    = require('express'),
        path       = require('path'),
        app        = express(),
        port       = 3000,
        bodyParser = require('body-parser'),
        fs         = require('fs'),
        controller = require('./bin/db.ctrl');

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

  // Return all todos
  app.get('/api/todo', controller.readAllItems);

  // Create one new todo
  app.post('/api/todo', controller.createItem);

  // Return one todo by ID
  app.get('/api/todo:query', controller.readItem);
      
  // Update one todo by ID
  app.put('/api/todo:id', controller.updateItem);

  // Delete one todo by ID
  app.delete('/api/todo:id', controller.deleteItem);

  // Delete all todos
  app.delete('/api/todo/truncate', controller.deleteAllItems);

  app.listen(port, function (){
    console.log('Server is listening to %d port in %s mode',port,app.settings.env);
  });

}());
