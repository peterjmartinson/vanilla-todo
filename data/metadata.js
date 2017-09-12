(function() {

  'use strict';

  let database = [
    { id: 1, item: 'First Article', file_name:'test.md' },
    { id: 2, item: 'Second Article', file_name:'test2.md' },
    { id: 3, item: 'Second Article', file_name:'test3.md' }
  ];

  module.exports = database || [];

}());
