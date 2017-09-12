/*jshint esversion:6 */
let model = require('../bin/model');
let db = require('../data/metadata');
let assert = require('assert');

// initialize the test database
for (let i = 0; i < db.length; i++) {
  db.pop();
}
let first_item = {id:1, item:'First Test Item'};
let second_item = {id:2, item:'Second test item'};
let third_item = {id:3, item:'Third test item'};
db.push(first_item);
db.push(second_item);
db.push(third_item);

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

describe('model.js - readAllItems()', function() {
  it('should return the whole database', function(done) {
    let dump = [];
    dump = model.readAllItems(function(data) {
      done();
      return data;
    });
    console.log("length: " + dump.length);
    console.log("dump[1]: " + JSON.stringify(dump[1]));
    assert.equal(dump.length, 3);
    assert.equal(second_item, dump[1]);
  });
});

describe('model.js - readItem()', function() {
  it('should return a specific item', function(done) {
    let response = model.readItem(2, function(data) {
      done();
      return data;
    });
    assert.equal(response.item.item, second_item.item);
    assert.ok(response.success);
  });

  it('should respond gracefully to bad requests', function(done) {
    let response = model.readItem(-7, function(data) {
      done();
      return data;
    });
    assert.ok(!response.success);
  });
});

describe('model.js - createItem()', function() {
  it('should create a new item', function(done) {
    let new_item = {id:4, item: "Fourth test item"};
    response = model.createItem(new_item, function(data) {
      done();
      return data;
    });
    assert.equal(db.length, 4);
    assert.ok(response.success);
  });
});

describe('model.js - updateItem()', function() {
  it('should update an existing item', function(done) {
    let old_item = db[0],
        updated_item = "Test",
        response = model.updateItem(1, updated_item, function(data) {
          done();
          return data;
        }),
        new_item = db[0];
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
    let deleted_item = db[0];
    let response = model.deleteItem(1, function(data) {
      done();
      return data;
    });
    assert.notDeepEqual(db[0], deleted_item);
    assert.ok(response.success);
  });
});

    
