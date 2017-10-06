# Thursday
# October 05, 2017
------------------

5 reasons why your man stopped calling you
==========================================

On the path to modifying the vanilla JS version of TodoMVC for use as
a note taking app, I needed to push data to a server.  Ultimately, all
notes will be stored in a database (either local or remote), so the
server is needed to, um, serve up the data!

## Add the server

First step is to simply create a server for the original app.  This
was done with Node.JS and Express.  When a user fires up the node
server and directs the browser to whatever serves as the root path,
`/`, the server loads the app's `index.html`.  From here, the app runs
as usual.

The `/` is what Express calls a *route*.  An actual string is passed
to Express's `.get()` method, which then fires off a callback method
called `.send()`.  `.send()` takes a file name that contains whatever
string you want to hit the browser.

In order for Express to be able to find `index.html`, you need to
explain where it is using the following string:

```JAVASCRIPT
  app.use(express.static(__dirname + '/public'));
```

At this point, the original TodoMVC is still unchanged.

## Get some data

The first route I tackled was simply getting all the ToDos from the
server.  This requires three things:

1. A `get` method in the application
2. A `get` route in the server
3. Data on the server

JQuery and all the frameworks contain methods that can handle HTML
requests, but we want to write our own!

TodoMVC includes a file called `helpers.js`, which contains functions
for handling events.  The base events are generally copies of jQuery's
events `$on`, `$delegate`, and `$parent`, along with query selectors
to grab HTML elements.  I thought this was a great place to put my
REST handlers.

With a view towards passing information across the internets, I
created four new methods here:  `$get`, `$post`, `$put`, and
`$delete`.  They all work like `$get`, seen here:

```JAVASCRIPT
    window.$get = function (route, handle) {
      let DONE = 4, OK = 200,
          request = new XMLHttpRequest();
      if (!request) {
        console.log('Unable to create request.  Giving up.');
        return false;
      }
      request.open('GET', route);
      request.send();
      request.onreadystatechange = function() {
        if (request.readyState === DONE) {
          if (request.status === OK) {
            let response = request.responseText;
            handle(response);
          }
          else {
            console.log('GET Error: ' + request.status);
          }
        }
      }
    };
```

The function takes two arguments, a `route` and a callbacks called `handle`.  The
route ultimately matches up with one of the Express routes in the server.
