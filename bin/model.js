/*jshint esversion:6 */
(function() {

  'use strict';

  // let db = require('../data/metadata'),
  let db = require('../data/todos').todos,
      dbfunction = {};

  dbfunction.readItem = function (req, res) {
    let query = JSON.parse(req.params.query);
    let return_array = db.filter(function (todo) {
      for (let q in query) {
        if (query[q] !== todo[q]) {
          return false;
        }
      }
      return true;
    });
    res.send(return_array);
  };

  // todo: autopopulate the ID
  dbfunction.createItem = function (req, res) {
    let response = { success: false, message: '', item: req.body };
    if (db.push(req.body)) {
      response.success = true;
      response.message = 'New item ' + JSON.stringify(req.body) + ' has been added';
      res.send(response);
    }
    else {
      response.message = 'Error: Item not added!';
      res.send(response);
    }
  };

  dbfunction.updateItem = function (req, res) {
    let item_index = findIndex(req.params.id);
    let update_data = req.body;
    let response = { success: false, message: '', item: {} };
    if (item_index < 0) {
      response.message = 'Item not found';
      res.send(response);
    }
    // else if ( !updated_item || typeof updated_item !== 'string') {
    //   response.message = 'Error - incorrect format';
    //   callback(response);
    // }
    else {
      for (let key in update_data) {
        db[item_index][key] = update_data[key]
      }
      response.success = true;
      response.message = 'Success!';
      response.item = db[item_index];
      res.send(response);
    }
  };

  dbfunction.readAllItems = function (req, res) {
      if (db) {
        res.send(db);
      }
      else {
        res.send('File Not Found');
      }
  };

  dbfunction.deleteItem = function (req, res) {
    let item_index = findIndex(req.params.id);
    let response = { success: false, message: '', item: {} };
    if (item_index < 0) {
      response.message = 'Item not found';
      res.send(response);
    }
    else {
      db.splice(item_index, 1);
      response.item = db[item_index];
      response.success = true;
      response.message = 'Success!';
      res.send(response);
    }
  };

  dbfunction.deleteAllItems = function (req, res) {
    let response = { success: false, message: '', item: {} };
    db.splice(0);
    if (db.length === 0) {
      response.success = true;
      response.message = 'Success!';
      res.send(response);
    }
    else {
      response.message = 'Unable to truncate database!';
      res.send(response);
    }
  }

  function findIndex(item_id) {
    if ( item_id < 1) {
      return -1;
    }
    for (let i = 0; i < db.length; i++) {
      if (db[i].id == item_id) return i;
    }
    return -1;
  }

  module.exports = dbfunction;

}());
