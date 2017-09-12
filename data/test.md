# Wednesday
# September 06, 2017
--------------------

This is a test.

1. `request.js` makes a call to, and gets a response from, `server.js`
2. `request.js` retrieves an external file (this one) from `server.js`
   via an XMLHttpRequest.
3. `request.js` gets a file from `server.js` using variable
   filenames.
4. Now, a few questions.  Where do you format the response?
  - In the external file
  - In the server (before sending response)
  - In the client (after response is received)
5. Next step, create all the CRUD operations against a basic JSON
   object.

   note - keep the colon in `server.js`, not the calling function
  Calling function:   $get('/file' + test_file, render);
  Receiving function: app.get('/file:file_name', function(req, res) {
