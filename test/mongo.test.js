let assert = require('assert');
let MongoClient = require('mongodb').MongoClient;

let dummy_doc = {};

describe('Ghetto MongoDB test', function() {
  it('should have some documents', function(done) {
    MongoClient.connect("mongodb://localhost:27017/test-nibDB", function(err, db) {
      if(err) throw err;
      
      console.log("Successfully connected to MongoDB.");
      
      db.collection("notes").drop();

      db.collection("notes").insertOne(dummy_doc, function(err, res) {
        if(err) throw err;
        console.log("Inserted document with _id: " + res.insertedId + '\n');

        db.collection('notes').find().toArray(function(err, docs) {
          docs.forEach(function(doc) {
              console.log( doc.name + " is a " + doc.category_code + " company." );
          });
          db.close();

          // inside the .find() callback
          assert.equal(err, null);
          assert.notEqual(docs.length, 0);
          done();
        });
      });
          
    });
  });
});
