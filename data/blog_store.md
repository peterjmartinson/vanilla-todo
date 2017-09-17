# Saturday
# September 16, 2017
--------------------

TodoMVC: 10 reasons why you need to know how store.js works
===========================================================

Everything here depends on `localStorage[name]`.  This acts as the database.  

How does it manifest?
    localStorage[name]
    JSON.parse(localStorage[name]) // the object itself, parsed
    JSON.parse(localStorage[this._dbName]).todos // the array
		var data = JSON.parse(localStorage[this._dbName]); // cache the object
		var todos = data.todos; // not localStorage, but it is!  the array
    localStorage[this._dbName] = JSON.stringify(data); // i.e. replace the DB completely
`JSON.parse()` and `JSON.stringify()` are used alternately while working with localStorage. 
`JSON.parse()` produces a real JavaScript object, where your *dot* notation will work as expected
`JSON.stringify()` turns an object into a plain old string, for easy transportation.

JSON.parse(localStorage[name]) -> data
JSON.stringify(data)           -> localStorage[name]

There are five methods in this thing.
`findAll`
`find`
`save`
`remove`
`drop`

## findAll
All this does is pass the array (localStorage[name].todos) to the callback.
wants:
    store.findAll(function(data) { do something with the whole array });

## find
Finds an element of the array that has specific object properties.
1. Caches the localStorage array
2. Runs the array through a filter
3. Passes to the callback anything that matches all properties of the `query` argument
wants:
    store.find({foo: 'bar', fur: 'baz'}, function(data) { do something });
returns:
    array of all items in `todos` that match the query
    
## save
Saves the new item, or updates an existing item.
1. Caches the localStorage array
2. If an ID was given
  - Finds the item with corresponding ID
  - Replaces all relevant properties in todo with updateData properties
  - Pumps the results back into localStorage
  - Returns the entire array
3. If no ID was given
  - Creates an ID (just a timestamp)
  - Pushs updateData onto the cached array
  - Pumps the results back into localStorage
  - Returns [updateData]
    Not sure why it's [].  This is just the new element!
wants:
    store.save({"title":"fourth todo","completed":false}, function(data) { do something with updateData }, someID?);
returns:
    The original first argument, with the new ID

## remove
Removes an item from the storage
1. Cache the localStorage array
2. Finds the todo with the matching ID and removes it via `.splice`
3. Pumps the results back into localStorage
4. Returns the resulting database array
wants:
    store.remove(ID, function(data) { do something with the whole array });
returns:
    The whole array, minus the removed element

## drop
Truncates the storage
1. Create a replacement object `{todos: []}`
3. Pumps the results back into localStorage
4. Returns the resulting (empty) database array

What needs to be changed to use data on a server?
-------------------------------------------------

Each time `localStorage` is called, we need instead an AJAX call to the server.o

## find
GET the entire storage array from the server
- or -
POST the query object to the server, who responds with the matched element(s) of the array

## findAll
GET the entire storage array from the server

## save
GET the entire storage array from the server, then
POST the entire modified storage array
- or -
POST the new/replacement object (and ID, if given).  Sever does the work, and responds with the entire modified array

## remove
GET the entire storage array from the server, then
POST the entire modified storage array
- or -
POST the relevant ID to remove.  Server does the work, and responds with the resultant array

## drop
POST request to the server that says "Drop!".  Server does the work.

Since all the requests will be made via XHR, you probably want to minimize the number of requests made per command.  So, maybe use everything after the or's.
The only iffy parts are `save` and `remove`, since they may already include calls to `findAll`, since someone (not the user) needs to know the ID of the element to modify.

