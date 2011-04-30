var path   = require('path'),
    assert = require('assert'),
    sys    = require('sys');

JSCLASS_PATH = './build/js.class';
FARGO_PATH   = path.dirname(__filename) + '/build';
TEST_PATH    = path.dirname(__filename) + '/vendor/heist/test/scheme_tests';

require(JSCLASS_PATH + '/loader');
JS.require('JS.Test');
require(FARGO_PATH + '/fargo')

var runtime = new Fargo.Runtime(),
    test    = new JS.Singleton(JS.Test.Unit.Assertions);

runtime.define('assert', function(truthy) {
  test.assert(truthy);
  return true;
});

runtime.define('assert-equal', function(expected, actual) {
  test.assertEqual(expected, actual);
  return true;
});

runtime.syntax('assert-raise', function(scope, cells) {
  sys.debug('Not implemented: assert-raise ' + cells);
  return true;
});

// runtime.run(TEST_PATH + '/arithmetic.scm');
runtime.run(TEST_PATH + '/booleans.scm');
runtime.run(TEST_PATH + '/closures.scm');
runtime.run(TEST_PATH + '/conditionals.scm');
runtime.run(TEST_PATH + '/define_functions.scm');
// runtime.run(TEST_PATH + '/define_values.scm');
runtime.run(TEST_PATH + '/delay.scm');
// runtime.run(TEST_PATH + '/equivalence.scm');
// runtime.run(TEST_PATH + '/functional.scm');
// runtime.run(TEST_PATH + '/hygienic.scm');
// runtime.run(TEST_PATH + '/let.scm');
runtime.run(TEST_PATH + '/lists.scm');
// runtime.run(TEST_PATH + '/macros.scm');
// runtime.run(TEST_PATH + '/numbers.scm');
// runtime.run(TEST_PATH + '/protection.scm');
// runtime.run(TEST_PATH + '/strings.scm');
runtime.run(TEST_PATH + '/vectors.scm');
