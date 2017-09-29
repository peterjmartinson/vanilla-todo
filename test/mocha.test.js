/*jshint esversion:6 */
let model = require('../bin/model');
let todos = require('../data/todos').todos;
let assert = require('assert');
let sinon = require('sinon');

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
  for (let i = 0; i < db.length; i++) {
    if (todos[i].id == item_id) return i;
  }
  return -1;
}

describe('model.js', function() {
  it('should have a Create method', function() {
    assert.equal(typeof model.createItem, 'function');
  });
  it('should have a Read method', function() {
    assert.equal(typeof model.readItem, 'function');
  });
  it('should have a Read All method', function() {
    assert.equal(typeof model.readAllItems, 'function');
  });
  it('should have a Update method', function() {
    assert.equal(typeof model.updateItem, 'function');
  });
  it('should have a Delete method', function() {
    assert.equal(typeof model.deleteItem, 'function');
  });
});

describe('model.js - createItem()', function() {
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
    model.createItem(req, res);
  });
});

describe('model.js - readItem()', function() {
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
    model.readItem(req, res);
  });

  // it('should respond gracefully to bad requests', function(done) {
    // let response = model.readItem(-7, function(data) {
    //   done();
    //   return data;
    // });
    // assert.ok(!response.success);
  // });
});

describe('model.js - readAllItems()', function() {
  it('should return the whole database', function() {
    let dump = [];
    let req = {};
    let res = {
      send: sinon.spy()
    };
    // console.log("length: " + dump.length);
    // console.log("dump[1]: " + JSON.stringify(dump[1]));
    dump = model.readAllItems(req, res);
    assert.equal(res.send.called, true);
    assert.equal(res.send.calledWith, 1);
    console.log('=======================  ' + dump);
    // assert.equal(data.length, 3);
  });
});

describe('model.js - updateItem()', function() {
  it('should update an existing item', function(done) {
    let old_item = todos[0],
        updated_item = "Test",
        response = model.updateItem(1, updated_item, function(data) {
          done();
          return data;
        }),
        new_item = todos[0];
    assert.notDeepEqual(old_item, new_item);
    assert.ok(response.success);
  });
  it('should respond gracefully to bad id', function(done) {
    let bad_id = 100,
        good_id = 1,
        bad_item = {},
        good_item = {id:1, item: "Another Test"},
        response_bad_id = model.updateItem(bad_id, good_item, function(data) {
          done();
          return data;
        });
    assert.equal(response_bad_id.success, false);
  });
  it('should respond gracefully to bad requests', function(done) {
    let bad_id = 100,
        good_id = 1,
        bad_item = {},
        good_item = {id:1, item: "Another Test"},
        response_bad_item = model.updateItem(good_id, bad_item, function(data) {
          done();
          return data;
        });
    assert.equal(response_bad_item.success, false);
  });
});

describe('model.js - deleteItem()', function() {
  it('should remove an item from the list', function(done) {
    let deleted_item = todos[0];
    let response = model.deleteItem(1, function(data) {
      done();
      return data;
    });
    assert.notDeepEqual(todos[0], deleted_item);
    assert.ok(response.success);
  });
});

    
