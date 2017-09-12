/*jshint esversion:6 */
(function() {

  'use strict';

  let db = require('../data/metadata'),
      dbfunction = {};

  // todo: autopopulate the ID
  dbfunction.createItem = function (new_item, callback) {
    let response = { success: false, message: '', item: new_item };
    if (db.push(new_item)) {
      response.success = true;
      response.message = 'New item ' + JSON.stringify(new_item) + ' has been added';
      callback(response);
    }
    else {
      response.message = 'Error: Item not added!';
      callback(response);
    }
  };

  dbfunction.updateItem = function (item_id, updated_item, callback) {
    let item_index = findIndex(item_id);
    let response = { success: false, message: '', item: updated_item };
    if (item_index < 0) {
      response.message = 'Item not found';
      callback(response);
    }
    else if ( !updated_item || typeof updated_item !== 'string') {
      response.message = 'Error - incorrect format';
      callback(response);
    }
    else {
      db[item_index] = { id: item_id, item: updated_item };
      response.success = true;
      response.message = 'Success!';
      callback(response);
    }
  };

  dbfunction.readAllItems = function (callback) {
    callback(db);
  };

  dbfunction.readItem = function (item_id, callback) {
    let item_index = findIndex(item_id);
    let response = { success: false, message: '', item: db[item_index] || {} };
    if (item_index < 0) {
      response.message = 'Item not found';
      callback(response);
    }
    else {
      response.success = true;
      response.message = 'Item successfully found';
      response.item = db[item_index];
      callback(response);
    }
  };

  dbfunction.deleteItem = function (item_id, callback) {
    let item_index = findIndex(item_id);
    let response = { success: false, message: '', item: {} };
    if (item_index < 0) {
      response.message = 'Item not found';
      callback(response);
    }
    else {
      db.splice(item_index, 1);
      response.item = db[item_index];
      response.success = true;
      response.message = 'Success!';
      callback(response);
    }
  };

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
