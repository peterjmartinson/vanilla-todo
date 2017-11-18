/*jshint esversion:6 */
(function() {

  'use strict';

  let db = require('../data/notes').notes;

  let model = {

    readItem : function (req, res) {
      let query = JSON.parse(req.params.query);
      let return_array = db.filter(function (note) {
        for (let q in query) {
          if (query[q] !== note[q]) {
            return false;
          }
        }
        return true;
      });
      res.send(return_array);
    },

    readAllItems : function (req, res) {
        if (db) {
          res.send(db);
        }
        else {
          res.send('File Not Found');
        }
    },

    // note: autopopulate the ID
    createItem : function (req, res) {
      let response = { success: false, message: '', item: {} },
          new_item = req.body,
          old_length, new_length;
      new_item.creation_date = new_item.modified_date = new Date();
      old_length = db.length;
      new_length = db.push(new_item);
      if ( new_length > old_length ) {
        response.item = JSON.stringify(db[db.length-1]);
        response.success = true;
        response.message = 'New item ' + response.item + ' has been added';
      }
      else {
        response.message = 'Error: Item not added!';
      }
      res.send(response);
    },

    updateItem : function (req, res) {
      let response = { success: false, message: '', item: {} },
          item_index = findIndex(req.params.id),
          update_data = req.body;
      update_data.modified_date = new Date();
      if (item_index < 0) {
        response.message = 'Item not found';
      }
      else {
        for (let key in update_data) {
          db[item_index][key] = update_data[key];
        }
        response.success = true;
        response.message = 'Success!';
        response.item = db[item_index];
      }
      res.send(response);
    },

    deleteItem : function (req, res) {
      let item_index = findIndex(req.params.id),
          response = { success: false, message: '', item: {} };
      if (item_index < 0) {
        response.message = 'Item not found';
      }
      else {
        db.splice(item_index, 1);
        response.item = db[item_index];
        response.success = true;
        response.message = 'Success!';
      }
      res.send(response);
    },

    deleteAllItems : function (req, res) {
      let response = { success: false, message: '', item: {} };
      db.splice(0);
      if (db.length === 0) {
        response.success = true;
        response.message = 'Success!';
      }
      else {
        response.message = 'Unable to truncate database!';
      }
      res.send(response);
    }
  };

  function findIndex (item_id) {
    if ( item_id > 0) {
      for (let i = 0; i < db.length; i++) {
        if (db[i].id == item_id) return i;
      }
    }
    return -1;
  }

  module.exports = model;

}());
