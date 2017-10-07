/*jshint esversion:6 */
let controller = require('../bin/db.ctrl');
let todos = require('../data/todos').todos;
let assert = require('assert');
let sinon = require('sinon');

// Test API ============================

function createTestItem(new_item) {
  todos.push(new_item);
}

function removeTestItem(id) {
  let index = findIndex(id);
  if (index) {
    todos.splice(index, 1);
  }
  else {
    console.log("No item found!");
  }
}

function findIndex (item_id) {
  if ( item_id < 1) {
    return -1;
  }
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == item_id) return i;
  }
  return -1;
}

// Tests ===============================

describe('db.ctrl.js', function() {
  it('should have a Create method', function() {
    assert.equal(typeof controller.createItem, 'function');
  });
  it('should have a Read method', function() {
    assert.equal(typeof controller.readItem, 'function');
  });
  it('should have a Read All method', function() {
    assert.equal(typeof controller.readAllItems, 'function');
  });
  it('should have a Update method', function() {
    assert.equal(typeof controller.updateItem, 'function');
  });
  it('should have a Delete method', function() {
    assert.equal(typeof controller.deleteItem, 'function');
  });
});

describe('db.ctrl.js - createItem()', function() {
  it('should create a new item', function(done) {
    let req = {
      body : {"title":"Shiny new test item", "completed":false, "id":10004}
    };
    let res = {
      send : function(data) {
        assert.equal(todos[todos.length-1].id, 10004);
        done();
        return data;
      }
    };
    controller.createItem(req, res);
  });
});

describe('db.ctrl.js - readItem()', function() {
  it('should return a specific item', function(done) {
    let test_item = {"title":"readItem's test item", "completed":false, "id":10006};
    createTestItem(test_item);
    let req = {
      params : {
        query : JSON.stringify({ "id" : 10006 })
      }
    };
    let res = {
      send : function(data) {
        assert.equal(data[0].id, 10006);
        done();
        return data;
      }
    };
    controller.readItem(req, res);
  });

  it('should respond gracefully to bad requests', function(done) {
    let req = {
      params : {
        query : JSON.stringify({ "id" : 10007 })
      }
    };
    let res = {
      send : function(data) {
        assert.deepEqual(data, []);
        done();
        return data;
      }
    };
    controller.readItem(req, res);
  });
});

describe('db.ctrl.js - readAllItems()', function() {
  it('should return the whole database', function(done) {
    let size = todos.length;
    let req = {};
    let res = {
      send : function(data) {
        assert.equal(data.length, size);
        done();
        return data;
      }
    };
    controller.readAllItems(req, res);
  });
});

describe('db.ctrl.js - updateItem()', function() {
  it('should update an existing item', function(done) {
    let test_item = {"title":"updateItem's test item", "completed":false, "id":10009};
    createTestItem(test_item);
    let req = {
      params : { id: 10009 },
      body : {"title":"updateItem's test item", "completed":true, "id":10009}
    };
    let res = {
      send : function(data) {
        assert.equal(todos[todos.length-1].completed, true);
        done();
        return data;
      }
    };
    controller.updateItem(req, res);
  });
});

describe('db.ctrl.js - deleteItem()', function() {
  it('should remove an item from the list', function(done) {
    let test_item = {"title":"deleteItem's test item", "completed":false, "id":10013};
    createTestItem(test_item);
    let req = {
      params : { id: 10013}
    };
    let res = {
      send : function(data) {
        assert.equal(findIndex(10013), -1);
        done();
        return data;
      }
    };
    controller.deleteItem(req, res);
  });
});

describe('db.ctrl.js - deleteAllItems()', function() {
  it('should empty the collection', function(done) {
    let test_item = {"title":"deleteAllItem's test item", "completed":false, "id":10015};
    createTestItem(test_item);
    let req = {};
    let res = {
      send : function(data) {
        assert.equal(todos.length, 0);
        done();
        return data;
      }
    };
    controller.deleteAllItems(req, res);
  });
});

    
    
