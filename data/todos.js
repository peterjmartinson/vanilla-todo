(function() {

  'use strict';

  let data = { todos: [
    {'title': 'first todo from server', 'completed': false, 'id': 123458},
    {'title': 'second todo from server', 'completed': false, 'id': 123456},
    {'title': 'third todo from server', 'completed': true, 'id': 123463}
  ] };

  module.exports = data || {};

}());

