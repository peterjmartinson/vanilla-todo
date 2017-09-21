/*jshint esversion:6, node:true */
(function() {
  'use strict';

  let db = require('../data/todos').todos;

  let routes = {
    get    : function (item_id, callback) {
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
    },

    getAll : function (req, res) {
      if (db) {
        res.send(db);
      }
      else {
        res.send('File Not Found');
      }
    },

    post   : function (req, res) {
      console.log(req.body);
      // look at this - it is *not* complete!
      model.createItem(req.body, function(response) {
        if (response) {
            res.send(response);
        }
      });
    },

    put    : function (item_id, updated_item, callback) {
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
    },

    delete : function (item_id, callback) {
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
    },

    findIndex : function (item_id) {
      if ( item_id < 1) {
        return -1;
      }
      for (let i = 0; i < db.length; i++) {
        if (db[i].id == item_id) return i;
      }
      return -1;
    }
  };

  module.exports = routes;

}());
