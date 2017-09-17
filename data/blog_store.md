# Saturday
# September 16, 2017
--------------------

# TodoMVC: 10 reasons why you need to know how store.js works

Everything here depends on `localStorage[name]`.  This acts as the database.  

How does it manifest?
    localStorage[name]
    JSON.parse(localStorage[name]) // the object itself
    JSON.parse(localStorage[this._dbName]).todos // the array
		var data = JSON.parse(localStorage[this._dbName]); // cache the object
		var todos = data.todos; // not localStorage, but it is!  the array
    localStorage[this._dbName] = JSON.stringify(data); // i.e. replace the DB completely

There are five methods in this thing.

`findAll`
`find`
`save`
`remove`
`drop`

## findAll
All this does is pass the array (localStorage[name].todos) to the callback.

## find
1. cache the localStorage array
2. run the array through a filter
3. Pass anything that matches all properties of the `query` argument to the callback

## save






