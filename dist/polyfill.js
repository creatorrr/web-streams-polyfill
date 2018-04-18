(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.default = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = _dereq_('./spec/reference-implementation/lib/readable-stream');

var ReadableStream = _require.ReadableStream;

var _require2 = _dereq_('./spec/reference-implementation/lib/writable-stream');

var WritableStream = _require2.WritableStream;

var _require3 = _dereq_('./spec/reference-implementation/lib/byte-length-queuing-strategy');

var ByteLengthQueuingStrategy = _require3.ByteLengthQueuingStrategy;

var _require4 = _dereq_('./spec/reference-implementation/lib/count-queuing-strategy');

var CountQueuingStrategy = _require4.CountQueuingStrategy;

var _require5 = _dereq_('./spec/reference-implementation/lib/transform-stream');

var TransformStream = _require5.TransformStream;
exports.ReadableStream = ReadableStream;
exports.WritableStream = WritableStream;
exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
exports.CountQueuingStrategy = CountQueuingStrategy;
exports.TransformStream = TransformStream;


var interfaces = {
  ReadableStream: ReadableStream,
  WritableStream: WritableStream,
  ByteLengthQueuingStrategy: ByteLengthQueuingStrategy,
  CountQueuingStrategy: CountQueuingStrategy,
  TransformStream: TransformStream
};

// Export
exports.default = interfaces;


function getGlobals() {
  if (typeof self !== 'undefined') {
    return self;
  } else if (typeof window !== 'undefined') {
    return window;
  } else if (typeof global !== 'undefined') {
    return global;
  }
}

function assignInterfaces(globals, interfaces) {
  var _loop = function _loop(i) {
    // prefer native implementation if available
    if (typeof globals[i] === 'undefined') {
      globals[i] = interfaces[i];
    } else {
      var _forcePolyfill = function _forcePolyfill() {
        globals[i] = interfaces[i];
      };
      globals[i].forcePolyfill = _forcePolyfill;
      globals[i].prototype.forcePolyfill = _forcePolyfill;
    }
  };

  for (var i in interfaces) {
    _loop(i);
  }
}

var globals = getGlobals();
// Add classes to window
assignInterfaces(globals, interfaces);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./spec/reference-implementation/lib/byte-length-queuing-strategy":10,"./spec/reference-implementation/lib/count-queuing-strategy":11,"./spec/reference-implementation/lib/readable-stream":14,"./spec/reference-implementation/lib/transform-stream":15,"./spec/reference-implementation/lib/writable-stream":17}],2:[function(_dereq_,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = _dereq_('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"util/":9}],3:[function(_dereq_,module,exports){
(function (process){
/**
 * Module dependencies.
 */

var AssertionError = _dereq_('assert').AssertionError
  , callsite = _dereq_('callsite')
  , fs = _dereq_('fs')

/**
 * Expose `assert`.
 */

module.exports = process.env.NO_ASSERT
  ? function(){}
  : assert;

/**
 * Assert the given `expr`.
 */

function assert(expr) {
  if (expr) return;

  var stack = callsite();
  var call = stack[1];
  var file = call.getFileName();
  var lineno = call.getLineNumber();
  var src = fs.readFileSync(file, 'utf8');
  var line = src.split('\n')[lineno-1];
  var src = line.match(/assert\((.*)\)/)[1];

  var err = new AssertionError({
    message: src,
    stackStartFunction: stack[0].getFunction()
  });

  throw err;
}

}).call(this,_dereq_('_process'))

},{"_process":6,"assert":2,"callsite":5,"fs":4}],4:[function(_dereq_,module,exports){

},{}],5:[function(_dereq_,module,exports){

module.exports = function(){
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack){ return stack; };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
};

},{}],6:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],8:[function(_dereq_,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],9:[function(_dereq_,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = _dereq_('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = _dereq_('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,_dereq_('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":8,"_process":6,"inherits":7}],10:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = _dereq_('./helpers.js'),
    createDataProperty = _require.createDataProperty;

module.exports = function () {
  function ByteLengthQueuingStrategy(_ref) {
    var highWaterMark = _ref.highWaterMark;

    _classCallCheck(this, ByteLengthQueuingStrategy);

    createDataProperty(this, 'highWaterMark', highWaterMark);
  }

  _createClass(ByteLengthQueuingStrategy, [{
    key: 'size',
    value: function size(chunk) {
      return chunk.byteLength;
    }
  }]);

  return ByteLengthQueuingStrategy;
}();

},{"./helpers.js":12}],11:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = _dereq_('./helpers.js'),
    createDataProperty = _require.createDataProperty;

module.exports = function () {
  function CountQueuingStrategy(_ref) {
    var highWaterMark = _ref.highWaterMark;

    _classCallCheck(this, CountQueuingStrategy);

    createDataProperty(this, 'highWaterMark', highWaterMark);
  }

  _createClass(CountQueuingStrategy, [{
    key: 'size',
    value: function size() {
      return 1;
    }
  }]);

  return CountQueuingStrategy;
}();

},{"./helpers.js":12}],12:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = _dereq_('better-assert');

var isFakeDetached = Symbol('is "detached" for our purposes');

function IsPropertyKey(argument) {
  return typeof argument === 'string' || (typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) === 'symbol';
}

exports.typeIsObject = function (x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null || typeof x === 'function';
};

exports.createDataProperty = function (o, p, v) {
  assert(exports.typeIsObject(o));
  Object.defineProperty(o, p, { value: v, writable: true, enumerable: true, configurable: true });
};

exports.createArrayFromList = function (elements) {
  // We use arrays to represent lists, so this is basically a no-op.
  // Do a slice though just in case we happen to depend on the unique-ness.
  return elements.slice();
};

exports.ArrayBufferCopy = function (dest, destOffset, src, srcOffset, n) {
  new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
};

exports.CreateIterResultObject = function (value, done) {
  assert(typeof done === 'boolean');
  var obj = {};
  Object.defineProperty(obj, 'value', { value: value, enumerable: true, writable: true, configurable: true });
  Object.defineProperty(obj, 'done', { value: done, enumerable: true, writable: true, configurable: true });
  return obj;
};

exports.IsFiniteNonNegativeNumber = function (v) {
  if (exports.IsNonNegativeNumber(v) === false) {
    return false;
  }

  if (v === Infinity) {
    return false;
  }

  return true;
};

exports.IsNonNegativeNumber = function (v) {
  if (typeof v !== 'number') {
    return false;
  }

  if (Number.isNaN(v)) {
    return false;
  }

  if (v < 0) {
    return false;
  }

  return true;
};

function Call(F, V, args) {
  if (typeof F !== 'function') {
    throw new TypeError('Argument is not a function');
  }

  return Function.prototype.apply.call(F, V, args);
}

exports.Call = Call;

exports.CreateAlgorithmFromUnderlyingMethod = function (underlyingObject, methodName, algoArgCount, extraArgs) {
  assert(underlyingObject !== undefined);
  assert(IsPropertyKey(methodName));
  assert(algoArgCount === 0 || algoArgCount === 1);
  assert(Array.isArray(extraArgs));
  var method = underlyingObject[methodName];
  if (method !== undefined) {
    if (typeof method !== 'function') {
      throw new TypeError(method + ' is not a method');
    }
    switch (algoArgCount) {
      case 0:
        {
          return function () {
            return PromiseCall(method, underlyingObject, extraArgs);
          };
        }

      case 1:
        {
          return function (arg) {
            var fullArgs = [arg].concat(extraArgs);
            return PromiseCall(method, underlyingObject, fullArgs);
          };
        }
    }
  }
  return function () {
    return Promise.resolve();
  };
};

exports.InvokeOrNoop = function (O, P, args) {
  assert(O !== undefined);
  assert(IsPropertyKey(P));
  assert(Array.isArray(args));

  var method = O[P];
  if (method === undefined) {
    return undefined;
  }

  return Call(method, O, args);
};

function PromiseCall(F, V, args) {
  assert(typeof F === 'function');
  assert(V !== undefined);
  assert(Array.isArray(args));
  try {
    return Promise.resolve(Call(F, V, args));
  } catch (value) {
    return Promise.reject(value);
  }
}

exports.PromiseCall = PromiseCall;

// Not implemented correctly
exports.TransferArrayBuffer = function (O) {
  assert(!exports.IsDetachedBuffer(O));
  var transferredIshVersion = O.slice();

  // This is specifically to fool tests that test "is transferred" by taking a non-zero-length
  // ArrayBuffer and checking if its byteLength starts returning 0.
  Object.defineProperty(O, 'byteLength', {
    get: function get() {
      return 0;
    }
  });
  O[isFakeDetached] = true;

  return transferredIshVersion;
};

// Not implemented correctly
exports.IsDetachedBuffer = function (O) {
  return isFakeDetached in O;
};

exports.ValidateAndNormalizeHighWaterMark = function (highWaterMark) {
  highWaterMark = Number(highWaterMark);
  if (Number.isNaN(highWaterMark) || highWaterMark < 0) {
    throw new RangeError('highWaterMark property of a queuing strategy must be non-negative and non-NaN');
  }

  return highWaterMark;
};

exports.MakeSizeAlgorithmFromSizeFunction = function (size) {
  if (size === undefined) {
    return function () {
      return 1;
    };
  }
  if (typeof size !== 'function') {
    throw new TypeError('size property of a queuing strategy must be a function');
  }
  return function (chunk) {
    return size(chunk);
  };
};

},{"better-assert":3}],13:[function(_dereq_,module,exports){
'use strict';

var assert = _dereq_('better-assert');

var _require = _dereq_('./helpers.js'),
    IsFiniteNonNegativeNumber = _require.IsFiniteNonNegativeNumber;

exports.DequeueValue = function (container) {
  assert('_queue' in container && '_queueTotalSize' in container);
  assert(container._queue.length > 0);

  var pair = container._queue.shift();
  container._queueTotalSize -= pair.size;
  if (container._queueTotalSize < 0) {
    container._queueTotalSize = 0;
  }

  return pair.value;
};

exports.EnqueueValueWithSize = function (container, value, size) {
  assert('_queue' in container && '_queueTotalSize' in container);

  size = Number(size);
  if (!IsFiniteNonNegativeNumber(size)) {
    throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
  }

  container._queue.push({ value: value, size: size });
  container._queueTotalSize += size;
};

exports.PeekQueueValue = function (container) {
  assert('_queue' in container && '_queueTotalSize' in container);
  assert(container._queue.length > 0);

  var pair = container._queue[0];
  return pair.value;
};

exports.ResetQueue = function (container) {
  assert('_queue' in container && '_queueTotalSize' in container);

  container._queue = [];
  container._queueTotalSize = 0;
};

},{"./helpers.js":12,"better-assert":3}],14:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = _dereq_('better-assert');

var _require = _dereq_('./helpers.js'),
    ArrayBufferCopy = _require.ArrayBufferCopy,
    CreateAlgorithmFromUnderlyingMethod = _require.CreateAlgorithmFromUnderlyingMethod,
    CreateIterResultObject = _require.CreateIterResultObject,
    IsFiniteNonNegativeNumber = _require.IsFiniteNonNegativeNumber,
    InvokeOrNoop = _require.InvokeOrNoop,
    IsDetachedBuffer = _require.IsDetachedBuffer,
    TransferArrayBuffer = _require.TransferArrayBuffer,
    ValidateAndNormalizeHighWaterMark = _require.ValidateAndNormalizeHighWaterMark,
    IsNonNegativeNumber = _require.IsNonNegativeNumber,
    MakeSizeAlgorithmFromSizeFunction = _require.MakeSizeAlgorithmFromSizeFunction,
    createArrayFromList = _require.createArrayFromList,
    typeIsObject = _require.typeIsObject;

var _require2 = _dereq_('./utils.js'),
    rethrowAssertionErrorRejection = _require2.rethrowAssertionErrorRejection;

var _require3 = _dereq_('./queue-with-sizes.js'),
    DequeueValue = _require3.DequeueValue,
    EnqueueValueWithSize = _require3.EnqueueValueWithSize,
    ResetQueue = _require3.ResetQueue;

var _require4 = _dereq_('./writable-stream.js'),
    AcquireWritableStreamDefaultWriter = _require4.AcquireWritableStreamDefaultWriter,
    IsWritableStream = _require4.IsWritableStream,
    IsWritableStreamLocked = _require4.IsWritableStreamLocked,
    WritableStreamAbort = _require4.WritableStreamAbort,
    WritableStreamDefaultWriterCloseWithErrorPropagation = _require4.WritableStreamDefaultWriterCloseWithErrorPropagation,
    WritableStreamDefaultWriterRelease = _require4.WritableStreamDefaultWriterRelease,
    WritableStreamDefaultWriterWrite = _require4.WritableStreamDefaultWriterWrite,
    WritableStreamCloseQueuedOrInFlight = _require4.WritableStreamCloseQueuedOrInFlight;

var CancelSteps = Symbol('[[CancelSteps]]');
var PullSteps = Symbol('[[PullSteps]]');

var ReadableStream = function () {
  function ReadableStream() {
    var underlyingSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        size = _ref.size,
        highWaterMark = _ref.highWaterMark;

    _classCallCheck(this, ReadableStream);

    InitializeReadableStream(this);
    var type = underlyingSource.type;
    var typeString = String(type);
    if (typeString === 'bytes') {
      if (highWaterMark === undefined) {
        highWaterMark = 0;
      }
      highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);

      if (size !== undefined) {
        throw new RangeError('The strategy for a byte stream cannot have a size function');
      }

      SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
    } else if (type === undefined) {
      if (highWaterMark === undefined) {
        highWaterMark = 1;
      }
      highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);

      var sizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(size);

      SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
    } else {
      throw new RangeError('Invalid type is specified');
    }
  }

  _createClass(ReadableStream, [{
    key: 'cancel',
    value: function cancel(reason) {
      if (IsReadableStream(this) === false) {
        return Promise.reject(streamBrandCheckException('cancel'));
      }

      if (IsReadableStreamLocked(this) === true) {
        return Promise.reject(new TypeError('Cannot cancel a stream that already has a reader'));
      }

      return ReadableStreamCancel(this, reason);
    }
  }, {
    key: 'getReader',
    value: function getReader() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          mode = _ref2.mode;

      if (IsReadableStream(this) === false) {
        throw streamBrandCheckException('getReader');
      }

      if (mode === undefined) {
        return AcquireReadableStreamDefaultReader(this);
      }

      mode = String(mode);

      if (mode === 'byob') {
        return AcquireReadableStreamBYOBReader(this);
      }

      throw new RangeError('Invalid mode is specified');
    }
  }, {
    key: 'pipeThrough',
    value: function pipeThrough(_ref3, options) {
      var writable = _ref3.writable,
          readable = _ref3.readable;

      if (writable === undefined || readable === undefined) {
        throw new TypeError('readable and writable arguments must be defined');
      }

      var promise = this.pipeTo(writable, options);

      ifIsObjectAndHasAPromiseIsHandledInternalSlotSetPromiseIsHandledToTrue(promise);

      return readable;
    }
  }, {
    key: 'pipeTo',
    value: function pipeTo(dest) {
      var _this = this;

      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          preventClose = _ref4.preventClose,
          preventAbort = _ref4.preventAbort,
          preventCancel = _ref4.preventCancel;

      if (IsReadableStream(this) === false) {
        return Promise.reject(streamBrandCheckException('pipeTo'));
      }
      if (IsWritableStream(dest) === false) {
        return Promise.reject(new TypeError('ReadableStream.prototype.pipeTo\'s first argument must be a WritableStream'));
      }

      preventClose = Boolean(preventClose);
      preventAbort = Boolean(preventAbort);
      preventCancel = Boolean(preventCancel);

      if (IsReadableStreamLocked(this) === true) {
        return Promise.reject(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
      }
      if (IsWritableStreamLocked(dest) === true) {
        return Promise.reject(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
      }

      var reader = AcquireReadableStreamDefaultReader(this);
      var writer = AcquireWritableStreamDefaultWriter(dest);

      var shuttingDown = false;

      // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
      var currentWrite = Promise.resolve();

      return new Promise(function (resolve, reject) {
        // Using reader and writer, read all chunks from this and write them to dest
        // - Backpressure must be enforced
        // - Shutdown must stop all activity
        function pipeLoop() {
          if (shuttingDown === true) {
            return Promise.resolve();
          }

          return writer._readyPromise.then(function () {
            return ReadableStreamDefaultReaderRead(reader).then(function (_ref5) {
              var value = _ref5.value,
                  done = _ref5.done;

              if (done === true) {
                return;
              }

              currentWrite = WritableStreamDefaultWriterWrite(writer, value).catch(function () {});
            });
          }).then(pipeLoop);
        }

        // Errors must be propagated forward
        isOrBecomesErrored(_this, reader._closedPromise, function (storedError) {
          if (preventAbort === false) {
            shutdownWithAction(function () {
              return WritableStreamAbort(dest, storedError);
            }, true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });

        // Errors must be propagated backward
        isOrBecomesErrored(dest, writer._closedPromise, function (storedError) {
          if (preventCancel === false) {
            shutdownWithAction(function () {
              return ReadableStreamCancel(_this, storedError);
            }, true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });

        // Closing must be propagated forward
        isOrBecomesClosed(_this, reader._closedPromise, function () {
          if (preventClose === false) {
            shutdownWithAction(function () {
              return WritableStreamDefaultWriterCloseWithErrorPropagation(writer);
            });
          } else {
            shutdown();
          }
        });

        // Closing must be propagated backward
        if (WritableStreamCloseQueuedOrInFlight(dest) === true || dest._state === 'closed') {
          var destClosed = new TypeError('the destination writable stream closed before all data could be piped to it');

          if (preventCancel === false) {
            shutdownWithAction(function () {
              return ReadableStreamCancel(_this, destClosed);
            }, true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }

        pipeLoop().catch(function (err) {
          currentWrite = Promise.resolve();
          rethrowAssertionErrorRejection(err);
        });

        function waitForWritesToFinish() {
          // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
          // for that too.
          var oldCurrentWrite = currentWrite;
          return currentWrite.then(function () {
            return oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined;
          });
        }

        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === 'errored') {
            action(stream._storedError);
          } else {
            promise.catch(action).catch(rethrowAssertionErrorRejection);
          }
        }

        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === 'closed') {
            action();
          } else {
            promise.then(action).catch(rethrowAssertionErrorRejection);
          }
        }

        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown === true) {
            return;
          }
          shuttingDown = true;

          if (dest._state === 'writable' && WritableStreamCloseQueuedOrInFlight(dest) === false) {
            waitForWritesToFinish().then(doTheRest);
          } else {
            doTheRest();
          }

          function doTheRest() {
            action().then(function () {
              return finalize(originalIsError, originalError);
            }, function (newError) {
              return finalize(true, newError);
            }).catch(rethrowAssertionErrorRejection);
          }
        }

        function shutdown(isError, error) {
          if (shuttingDown === true) {
            return;
          }
          shuttingDown = true;

          if (dest._state === 'writable' && WritableStreamCloseQueuedOrInFlight(dest) === false) {
            waitForWritesToFinish().then(function () {
              return finalize(isError, error);
            }).catch(rethrowAssertionErrorRejection);
          } else {
            finalize(isError, error);
          }
        }

        function finalize(isError, error) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);

          if (isError) {
            reject(error);
          } else {
            resolve(undefined);
          }
        }
      });
    }
  }, {
    key: 'tee',
    value: function tee() {
      if (IsReadableStream(this) === false) {
        throw streamBrandCheckException('tee');
      }

      var branches = ReadableStreamTee(this, false);
      return createArrayFromList(branches);
    }
  }, {
    key: 'locked',
    get: function get() {
      if (IsReadableStream(this) === false) {
        throw streamBrandCheckException('locked');
      }

      return IsReadableStreamLocked(this);
    }
  }]);

  return ReadableStream;
}();

module.exports = {
  CreateReadableByteStream: CreateReadableByteStream,
  CreateReadableStream: CreateReadableStream,
  ReadableStream: ReadableStream,
  IsReadableStreamDisturbed: IsReadableStreamDisturbed,
  ReadableStreamDefaultControllerClose: ReadableStreamDefaultControllerClose,
  ReadableStreamDefaultControllerEnqueue: ReadableStreamDefaultControllerEnqueue,
  ReadableStreamDefaultControllerError: ReadableStreamDefaultControllerError,
  ReadableStreamDefaultControllerGetDesiredSize: ReadableStreamDefaultControllerGetDesiredSize,
  ReadableStreamDefaultControllerHasBackpressure: ReadableStreamDefaultControllerHasBackpressure,
  ReadableStreamDefaultControllerCanCloseOrEnqueue: ReadableStreamDefaultControllerCanCloseOrEnqueue
};

// Abstract operations for the ReadableStream.

function AcquireReadableStreamBYOBReader(stream) {
  return new ReadableStreamBYOBReader(stream);
}

function AcquireReadableStreamDefaultReader(stream) {
  return new ReadableStreamDefaultReader(stream);
}

// Throws if and only if startAlgorithm throws.
function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
  var highWaterMark = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var sizeAlgorithm = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
    return 1;
  };

  assert(IsNonNegativeNumber(highWaterMark) === true);

  var stream = Object.create(ReadableStream.prototype);
  InitializeReadableStream(stream);

  var controller = Object.create(ReadableStreamDefaultController.prototype);

  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);

  return stream;
}

// Throws if and only if startAlgorithm throws.
function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
  var highWaterMark = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var autoAllocateChunkSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

  assert(IsNonNegativeNumber(highWaterMark) === true);
  if (autoAllocateChunkSize !== undefined) {
    assert(Number.isInteger(autoAllocateChunkSize) === true);
    assert(autoAllocateChunkSize > 0);
  }

  var stream = Object.create(ReadableStream.prototype);
  InitializeReadableStream(stream);

  var controller = Object.create(ReadableByteStreamController.prototype);

  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);

  return stream;
}

function InitializeReadableStream(stream) {
  stream._state = 'readable';
  stream._reader = undefined;
  stream._storedError = undefined;
  stream._disturbed = false;
}

function IsReadableStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
    return false;
  }

  return true;
}

function IsReadableStreamDisturbed(stream) {
  assert(IsReadableStream(stream) === true);

  return stream._disturbed;
}

function IsReadableStreamLocked(stream) {
  assert(IsReadableStream(stream) === true);

  if (stream._reader === undefined) {
    return false;
  }

  return true;
}

function ReadableStreamTee(stream, cloneForBranch2) {
  assert(IsReadableStream(stream) === true);
  assert(typeof cloneForBranch2 === 'boolean');

  var reader = AcquireReadableStreamDefaultReader(stream);

  var closedOrErrored = false;
  var canceled1 = false;
  var canceled2 = false;
  var reason1 = void 0;
  var reason2 = void 0;
  var branch1 = void 0;
  var branch2 = void 0;

  var resolveCancelPromise = void 0;
  var cancelPromise = new Promise(function (resolve) {
    resolveCancelPromise = resolve;
  });

  function pullAlgorithm() {
    return ReadableStreamDefaultReaderRead(reader).then(function (result) {
      assert(typeIsObject(result));
      var value = result.value;
      var done = result.done;
      assert(typeof done === 'boolean');

      if (done === true && closedOrErrored === false) {
        if (canceled1 === false) {
          ReadableStreamDefaultControllerClose(branch1._readableStreamController);
        }
        if (canceled2 === false) {
          ReadableStreamDefaultControllerClose(branch2._readableStreamController);
        }
        closedOrErrored = true;
      }

      if (closedOrErrored === true) {
        return;
      }

      var value1 = value;
      var value2 = value;

      // There is no way to access the cloning code right now in the reference implementation.
      // If we add one then we'll need an implementation for serializable objects.
      // if (canceled2 === false && cloneForBranch2 === true) {
      //   value2 = StructuredDeserialize(StructuredSerialize(value2));
      // }

      if (canceled1 === false) {
        ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, value1);
      }

      if (canceled2 === false) {
        ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, value2);
      }
    });
  }

  function cancel1Algorithm(reason) {
    canceled1 = true;
    reason1 = reason;
    if (canceled2 === true) {
      var compositeReason = createArrayFromList([reason1, reason2]);
      var cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }

  function cancel2Algorithm(reason) {
    canceled2 = true;
    reason2 = reason;
    if (canceled1 === true) {
      var compositeReason = createArrayFromList([reason1, reason2]);
      var cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }
    return cancelPromise;
  }

  function startAlgorithm() {}

  branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
  branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);

  reader._closedPromise.catch(function (r) {
    if (closedOrErrored === true) {
      return;
    }

    ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
    ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
    closedOrErrored = true;
  });

  return [branch1, branch2];
}

// ReadableStream API exposed for controllers.

function ReadableStreamAddReadIntoRequest(stream) {
  assert(IsReadableStreamBYOBReader(stream._reader) === true);
  assert(stream._state === 'readable' || stream._state === 'closed');

  var promise = new Promise(function (resolve, reject) {
    var readIntoRequest = {
      _resolve: resolve,
      _reject: reject
    };

    stream._reader._readIntoRequests.push(readIntoRequest);
  });

  return promise;
}

function ReadableStreamAddReadRequest(stream) {
  assert(IsReadableStreamDefaultReader(stream._reader) === true);
  assert(stream._state === 'readable');

  var promise = new Promise(function (resolve, reject) {
    var readRequest = {
      _resolve: resolve,
      _reject: reject
    };

    stream._reader._readRequests.push(readRequest);
  });

  return promise;
}

function ReadableStreamCancel(stream, reason) {
  stream._disturbed = true;

  if (stream._state === 'closed') {
    return Promise.resolve(undefined);
  }
  if (stream._state === 'errored') {
    return Promise.reject(stream._storedError);
  }

  ReadableStreamClose(stream);

  var sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
  return sourceCancelPromise.then(function () {
    return undefined;
  });
}

function ReadableStreamClose(stream) {
  assert(stream._state === 'readable');

  stream._state = 'closed';

  var reader = stream._reader;

  if (reader === undefined) {
    return undefined;
  }

  if (IsReadableStreamDefaultReader(reader) === true) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = reader._readRequests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _resolve = _step.value._resolve;

        _resolve(CreateIterResultObject(undefined, true));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    reader._readRequests = [];
  }

  defaultReaderClosedPromiseResolve(reader);

  return undefined;
}

function ReadableStreamError(stream, e) {
  assert(IsReadableStream(stream) === true);
  assert(stream._state === 'readable');

  stream._state = 'errored';
  stream._storedError = e;

  var reader = stream._reader;

  if (reader === undefined) {
    return undefined;
  }

  if (IsReadableStreamDefaultReader(reader) === true) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = reader._readRequests[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var readRequest = _step2.value;

        readRequest._reject(e);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    reader._readRequests = [];
  } else {
    assert(IsReadableStreamBYOBReader(reader));

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = reader._readIntoRequests[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var readIntoRequest = _step3.value;

        readIntoRequest._reject(e);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    reader._readIntoRequests = [];
  }

  defaultReaderClosedPromiseReject(reader, e);
  reader._closedPromise.catch(function () {});
}

function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
  var reader = stream._reader;

  assert(reader._readIntoRequests.length > 0);

  var readIntoRequest = reader._readIntoRequests.shift();
  readIntoRequest._resolve(CreateIterResultObject(chunk, done));
}

function ReadableStreamFulfillReadRequest(stream, chunk, done) {
  var reader = stream._reader;

  assert(reader._readRequests.length > 0);

  var readRequest = reader._readRequests.shift();
  readRequest._resolve(CreateIterResultObject(chunk, done));
}

function ReadableStreamGetNumReadIntoRequests(stream) {
  return stream._reader._readIntoRequests.length;
}

function ReadableStreamGetNumReadRequests(stream) {
  return stream._reader._readRequests.length;
}

function ReadableStreamHasBYOBReader(stream) {
  var reader = stream._reader;

  if (reader === undefined) {
    return false;
  }

  if (IsReadableStreamBYOBReader(reader) === false) {
    return false;
  }

  return true;
}

function ReadableStreamHasDefaultReader(stream) {
  var reader = stream._reader;

  if (reader === undefined) {
    return false;
  }

  if (IsReadableStreamDefaultReader(reader) === false) {
    return false;
  }

  return true;
}

// Readers

var ReadableStreamDefaultReader = function () {
  function ReadableStreamDefaultReader(stream) {
    _classCallCheck(this, ReadableStreamDefaultReader);

    if (IsReadableStream(stream) === false) {
      throw new TypeError('ReadableStreamDefaultReader can only be constructed with a ReadableStream instance');
    }
    if (IsReadableStreamLocked(stream) === true) {
      throw new TypeError('This stream has already been locked for exclusive reading by another reader');
    }

    ReadableStreamReaderGenericInitialize(this, stream);

    this._readRequests = [];
  }

  _createClass(ReadableStreamDefaultReader, [{
    key: 'cancel',
    value: function cancel(reason) {
      if (IsReadableStreamDefaultReader(this) === false) {
        return Promise.reject(defaultReaderBrandCheckException('cancel'));
      }

      if (this._ownerReadableStream === undefined) {
        return Promise.reject(readerLockException('cancel'));
      }

      return ReadableStreamReaderGenericCancel(this, reason);
    }
  }, {
    key: 'read',
    value: function read() {
      if (IsReadableStreamDefaultReader(this) === false) {
        return Promise.reject(defaultReaderBrandCheckException('read'));
      }

      if (this._ownerReadableStream === undefined) {
        return Promise.reject(readerLockException('read from'));
      }

      return ReadableStreamDefaultReaderRead(this);
    }
  }, {
    key: 'releaseLock',
    value: function releaseLock() {
      if (IsReadableStreamDefaultReader(this) === false) {
        throw defaultReaderBrandCheckException('releaseLock');
      }

      if (this._ownerReadableStream === undefined) {
        return;
      }

      if (this._readRequests.length > 0) {
        throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
      }

      ReadableStreamReaderGenericRelease(this);
    }
  }, {
    key: 'closed',
    get: function get() {
      if (IsReadableStreamDefaultReader(this) === false) {
        return Promise.reject(defaultReaderBrandCheckException('closed'));
      }

      return this._closedPromise;
    }
  }]);

  return ReadableStreamDefaultReader;
}();

var ReadableStreamBYOBReader = function () {
  function ReadableStreamBYOBReader(stream) {
    _classCallCheck(this, ReadableStreamBYOBReader);

    if (!IsReadableStream(stream)) {
      throw new TypeError('ReadableStreamBYOBReader can only be constructed with a ReadableStream instance given a ' + 'byte source');
    }
    if (IsReadableByteStreamController(stream._readableStreamController) === false) {
      throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' + 'source');
    }
    if (IsReadableStreamLocked(stream)) {
      throw new TypeError('This stream has already been locked for exclusive reading by another reader');
    }

    ReadableStreamReaderGenericInitialize(this, stream);

    this._readIntoRequests = [];
  }

  _createClass(ReadableStreamBYOBReader, [{
    key: 'cancel',
    value: function cancel(reason) {
      if (!IsReadableStreamBYOBReader(this)) {
        return Promise.reject(byobReaderBrandCheckException('cancel'));
      }

      if (this._ownerReadableStream === undefined) {
        return Promise.reject(readerLockException('cancel'));
      }

      return ReadableStreamReaderGenericCancel(this, reason);
    }
  }, {
    key: 'read',
    value: function read(view) {
      if (!IsReadableStreamBYOBReader(this)) {
        return Promise.reject(byobReaderBrandCheckException('read'));
      }

      if (this._ownerReadableStream === undefined) {
        return Promise.reject(readerLockException('read from'));
      }

      if (!ArrayBuffer.isView(view)) {
        return Promise.reject(new TypeError('view must be an array buffer view'));
      }

      if (IsDetachedBuffer(view.buffer) === true) {
        return Promise.reject(new TypeError('Cannot read into a view onto a detached ArrayBuffer'));
      }

      if (view.byteLength === 0) {
        return Promise.reject(new TypeError('view must have non-zero byteLength'));
      }

      return ReadableStreamBYOBReaderRead(this, view);
    }
  }, {
    key: 'releaseLock',
    value: function releaseLock() {
      if (!IsReadableStreamBYOBReader(this)) {
        throw byobReaderBrandCheckException('releaseLock');
      }

      if (this._ownerReadableStream === undefined) {
        return;
      }

      if (this._readIntoRequests.length > 0) {
        throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
      }

      ReadableStreamReaderGenericRelease(this);
    }
  }, {
    key: 'closed',
    get: function get() {
      if (!IsReadableStreamBYOBReader(this)) {
        return Promise.reject(byobReaderBrandCheckException('closed'));
      }

      return this._closedPromise;
    }
  }]);

  return ReadableStreamBYOBReader;
}();

// Abstract operations for the readers.

function IsReadableStreamBYOBReader(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
    return false;
  }

  return true;
}

function IsReadableStreamDefaultReader(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
    return false;
  }

  return true;
}

function ReadableStreamReaderGenericInitialize(reader, stream) {
  reader._ownerReadableStream = stream;
  stream._reader = reader;

  if (stream._state === 'readable') {
    defaultReaderClosedPromiseInitialize(reader);
  } else if (stream._state === 'closed') {
    defaultReaderClosedPromiseInitializeAsResolved(reader);
  } else {
    assert(stream._state === 'errored');

    defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
    reader._closedPromise.catch(function () {});
  }
}

// A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
// check.

function ReadableStreamReaderGenericCancel(reader, reason) {
  var stream = reader._ownerReadableStream;
  assert(stream !== undefined);
  return ReadableStreamCancel(stream, reason);
}

function ReadableStreamReaderGenericRelease(reader) {
  assert(reader._ownerReadableStream !== undefined);
  assert(reader._ownerReadableStream._reader === reader);

  if (reader._ownerReadableStream._state === 'readable') {
    defaultReaderClosedPromiseReject(reader, new TypeError('Reader was released and can no longer be used to monitor the stream\'s closedness'));
  } else {
    defaultReaderClosedPromiseResetToRejected(reader, new TypeError('Reader was released and can no longer be used to monitor the stream\'s closedness'));
  }
  reader._closedPromise.catch(function () {});

  reader._ownerReadableStream._reader = undefined;
  reader._ownerReadableStream = undefined;
}

function ReadableStreamBYOBReaderRead(reader, view) {
  var stream = reader._ownerReadableStream;

  assert(stream !== undefined);

  stream._disturbed = true;

  if (stream._state === 'errored') {
    return Promise.reject(stream._storedError);
  }

  // Controllers must implement this.
  return ReadableByteStreamControllerPullInto(stream._readableStreamController, view);
}

function ReadableStreamDefaultReaderRead(reader) {
  var stream = reader._ownerReadableStream;

  assert(stream !== undefined);

  stream._disturbed = true;

  if (stream._state === 'closed') {
    return Promise.resolve(CreateIterResultObject(undefined, true));
  }

  if (stream._state === 'errored') {
    return Promise.reject(stream._storedError);
  }

  assert(stream._state === 'readable');

  return stream._readableStreamController[PullSteps]();
}

// Controllers

var ReadableStreamDefaultController = function () {
  function ReadableStreamDefaultController() {
    _classCallCheck(this, ReadableStreamDefaultController);

    throw new TypeError();
  }

  _createClass(ReadableStreamDefaultController, [{
    key: 'close',
    value: function close() {
      if (IsReadableStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('close');
      }

      if (ReadableStreamDefaultControllerCanCloseOrEnqueue(this) === false) {
        throw new TypeError('The stream is not in a state that permits close');
      }

      ReadableStreamDefaultControllerClose(this);
    }
  }, {
    key: 'enqueue',
    value: function enqueue(chunk) {
      if (IsReadableStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('enqueue');
      }

      if (ReadableStreamDefaultControllerCanCloseOrEnqueue(this) === false) {
        throw new TypeError('The stream is not in a state that permits enqueue');
      }

      return ReadableStreamDefaultControllerEnqueue(this, chunk);
    }
  }, {
    key: 'error',
    value: function error(e) {
      if (IsReadableStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('error');
      }

      ReadableStreamDefaultControllerError(this, e);
    }
  }, {
    key: CancelSteps,
    value: function value(reason) {
      ResetQueue(this);
      return this._cancelAlgorithm(reason);
    }
  }, {
    key: PullSteps,
    value: function value() {
      var stream = this._controlledReadableStream;

      if (this._queue.length > 0) {
        var chunk = DequeueValue(this);

        if (this._closeRequested === true && this._queue.length === 0) {
          ReadableStreamClose(stream);
        } else {
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }

        return Promise.resolve(CreateIterResultObject(chunk, false));
      }

      var pendingPromise = ReadableStreamAddReadRequest(stream);
      ReadableStreamDefaultControllerCallPullIfNeeded(this);
      return pendingPromise;
    }
  }, {
    key: 'desiredSize',
    get: function get() {
      if (IsReadableStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('desiredSize');
      }

      return ReadableStreamDefaultControllerGetDesiredSize(this);
    }
  }]);

  return ReadableStreamDefaultController;
}();

// Abstract operations for the ReadableStreamDefaultController.

function IsReadableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
    return false;
  }

  return true;
}

function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
  if (shouldPull === false) {
    return undefined;
  }

  if (controller._pulling === true) {
    controller._pullAgain = true;
    return undefined;
  }

  assert(controller._pullAgain === false);

  controller._pulling = true;

  var pullPromise = controller._pullAlgorithm();
  pullPromise.then(function () {
    controller._pulling = false;

    if (controller._pullAgain === true) {
      controller._pullAgain = false;
      return ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    return undefined;
  }, function (e) {
    ReadableStreamDefaultControllerError(controller, e);
  }).catch(rethrowAssertionErrorRejection);

  return undefined;
}

function ReadableStreamDefaultControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableStream;

  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) === false) {
    return false;
  }

  if (controller._started === false) {
    return false;
  }

  if (IsReadableStreamLocked(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }

  var desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
  if (desiredSize > 0) {
    return true;
  }

  return false;
}

// A client of ReadableStreamDefaultController may use these functions directly to bypass state check.

function ReadableStreamDefaultControllerClose(controller) {
  var stream = controller._controlledReadableStream;

  assert(ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) === true);

  controller._closeRequested = true;

  if (controller._queue.length === 0) {
    ReadableStreamClose(stream);
  }
}

function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
  var stream = controller._controlledReadableStream;

  assert(ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) === true);

  if (IsReadableStreamLocked(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
    ReadableStreamFulfillReadRequest(stream, chunk, false);
  } else {
    var chunkSize = void 0;
    try {
      chunkSize = controller._strategySizeAlgorithm(chunk);
    } catch (chunkSizeE) {
      ReadableStreamDefaultControllerError(controller, chunkSizeE);
      throw chunkSizeE;
    }

    try {
      EnqueueValueWithSize(controller, chunk, chunkSize);
    } catch (enqueueE) {
      ReadableStreamDefaultControllerError(controller, enqueueE);
      throw enqueueE;
    }
  }

  ReadableStreamDefaultControllerCallPullIfNeeded(controller);

  return undefined;
}

function ReadableStreamDefaultControllerError(controller, e) {
  var stream = controller._controlledReadableStream;

  if (stream._state !== 'readable') {
    return;
  }

  ResetQueue(controller);

  ReadableStreamError(stream, e);
}

function ReadableStreamDefaultControllerGetDesiredSize(controller) {
  var stream = controller._controlledReadableStream;
  var state = stream._state;

  if (state === 'errored') {
    return null;
  }
  if (state === 'closed') {
    return 0;
  }

  return controller._strategyHWM - controller._queueTotalSize;
}

// This is used in the implementation of TransformStream.
function ReadableStreamDefaultControllerHasBackpressure(controller) {
  if (ReadableStreamDefaultControllerShouldCallPull(controller) === true) {
    return false;
  }

  return true;
}

function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
  var state = controller._controlledReadableStream._state;

  if (controller._closeRequested === false && state === 'readable') {
    return true;
  }

  return false;
}

function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  assert(stream._readableStreamController === undefined);

  controller._controlledReadableStream = stream;

  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);

  controller._started = false;
  controller._closeRequested = false;
  controller._pullAgain = false;
  controller._pulling = false;

  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;

  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;

  stream._readableStreamController = controller;

  var startResult = startAlgorithm();
  Promise.resolve(startResult).then(function () {
    controller._started = true;

    assert(controller._pulling === false);
    assert(controller._pullAgain === false);

    ReadableStreamDefaultControllerCallPullIfNeeded(controller);
  }, function (r) {
    ReadableStreamDefaultControllerError(controller, r);
  }).catch(rethrowAssertionErrorRejection);
}

function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
  assert(underlyingSource !== undefined);

  var controller = Object.create(ReadableStreamDefaultController.prototype);

  function startAlgorithm() {
    return InvokeOrNoop(underlyingSource, 'start', [controller]);
  }

  var pullAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSource, 'pull', 0, [controller]);
  var cancelAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSource, 'cancel', 1, []);

  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
}

var ReadableStreamBYOBRequest = function () {
  function ReadableStreamBYOBRequest() {
    _classCallCheck(this, ReadableStreamBYOBRequest);

    throw new TypeError('ReadableStreamBYOBRequest cannot be used directly');
  }

  _createClass(ReadableStreamBYOBRequest, [{
    key: 'respond',
    value: function respond(bytesWritten) {
      if (IsReadableStreamBYOBRequest(this) === false) {
        throw byobRequestBrandCheckException('respond');
      }

      if (this._associatedReadableByteStreamController === undefined) {
        throw new TypeError('This BYOB request has been invalidated');
      }

      if (IsDetachedBuffer(this._view.buffer) === true) {
        throw new TypeError('The BYOB request\'s buffer has been detached and so cannot be used as a response');
      }

      ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
    }
  }, {
    key: 'respondWithNewView',
    value: function respondWithNewView(view) {
      if (IsReadableStreamBYOBRequest(this) === false) {
        throw byobRequestBrandCheckException('respond');
      }

      if (this._associatedReadableByteStreamController === undefined) {
        throw new TypeError('This BYOB request has been invalidated');
      }

      if (!ArrayBuffer.isView(view)) {
        throw new TypeError('You can only respond with array buffer views');
      }

      if (IsDetachedBuffer(view.buffer) === true) {
        throw new TypeError('The supplied view\'s buffer has been detached and so cannot be used as a response');
      }

      ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
    }
  }, {
    key: 'view',
    get: function get() {
      if (IsReadableStreamBYOBRequest(this) === false) {
        throw byobRequestBrandCheckException('view');
      }

      return this._view;
    }
  }]);

  return ReadableStreamBYOBRequest;
}();

var ReadableByteStreamController = function () {
  function ReadableByteStreamController() {
    _classCallCheck(this, ReadableByteStreamController);

    throw new TypeError('ReadableByteStreamController constructor cannot be used directly');
  }

  _createClass(ReadableByteStreamController, [{
    key: 'close',
    value: function close() {
      if (IsReadableByteStreamController(this) === false) {
        throw byteStreamControllerBrandCheckException('close');
      }

      if (this._closeRequested === true) {
        throw new TypeError('The stream has already been closed; do not close it again!');
      }

      var state = this._controlledReadableByteStream._state;
      if (state !== 'readable') {
        throw new TypeError('The stream (in ' + state + ' state) is not in the readable state and cannot be closed');
      }

      ReadableByteStreamControllerClose(this);
    }
  }, {
    key: 'enqueue',
    value: function enqueue(chunk) {
      if (IsReadableByteStreamController(this) === false) {
        throw byteStreamControllerBrandCheckException('enqueue');
      }

      if (this._closeRequested === true) {
        throw new TypeError('stream is closed or draining');
      }

      var state = this._controlledReadableByteStream._state;
      if (state !== 'readable') {
        throw new TypeError('The stream (in ' + state + ' state) is not in the readable state and cannot be enqueued to');
      }

      if (!ArrayBuffer.isView(chunk)) {
        throw new TypeError('You can only enqueue array buffer views when using a ReadableByteStreamController');
      }

      if (IsDetachedBuffer(chunk.buffer) === true) {
        throw new TypeError('Cannot enqueue a view onto a detached ArrayBuffer');
      }

      ReadableByteStreamControllerEnqueue(this, chunk);
    }
  }, {
    key: 'error',
    value: function error(e) {
      if (IsReadableByteStreamController(this) === false) {
        throw byteStreamControllerBrandCheckException('error');
      }

      ReadableByteStreamControllerError(this, e);
    }
  }, {
    key: CancelSteps,
    value: function value(reason) {
      if (this._pendingPullIntos.length > 0) {
        var firstDescriptor = this._pendingPullIntos[0];
        firstDescriptor.bytesFilled = 0;
      }

      ResetQueue(this);

      return this._cancelAlgorithm(reason);
    }
  }, {
    key: PullSteps,
    value: function value() {
      var stream = this._controlledReadableByteStream;
      assert(ReadableStreamHasDefaultReader(stream) === true);

      if (this._queueTotalSize > 0) {
        assert(ReadableStreamGetNumReadRequests(stream) === 0);

        var entry = this._queue.shift();
        this._queueTotalSize -= entry.byteLength;

        ReadableByteStreamControllerHandleQueueDrain(this);

        var view = void 0;
        try {
          view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
        } catch (viewE) {
          return Promise.reject(viewE);
        }

        return Promise.resolve(CreateIterResultObject(view, false));
      }

      var autoAllocateChunkSize = this._autoAllocateChunkSize;
      if (autoAllocateChunkSize !== undefined) {
        var buffer = void 0;
        try {
          buffer = new ArrayBuffer(autoAllocateChunkSize);
        } catch (bufferE) {
          return Promise.reject(bufferE);
        }

        var pullIntoDescriptor = {
          buffer: buffer,
          byteOffset: 0,
          byteLength: autoAllocateChunkSize,
          bytesFilled: 0,
          elementSize: 1,
          ctor: Uint8Array,
          readerType: 'default'
        };

        this._pendingPullIntos.push(pullIntoDescriptor);
      }

      var promise = ReadableStreamAddReadRequest(stream);

      ReadableByteStreamControllerCallPullIfNeeded(this);

      return promise;
    }
  }, {
    key: 'byobRequest',
    get: function get() {
      if (IsReadableByteStreamController(this) === false) {
        throw byteStreamControllerBrandCheckException('byobRequest');
      }

      if (this._byobRequest === undefined && this._pendingPullIntos.length > 0) {
        var firstDescriptor = this._pendingPullIntos[0];
        var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);

        var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, this, view);
        this._byobRequest = byobRequest;
      }

      return this._byobRequest;
    }
  }, {
    key: 'desiredSize',
    get: function get() {
      if (IsReadableByteStreamController(this) === false) {
        throw byteStreamControllerBrandCheckException('desiredSize');
      }

      return ReadableByteStreamControllerGetDesiredSize(this);
    }
  }]);

  return ReadableByteStreamController;
}();

// Abstract operations for the ReadableByteStreamController.

function IsReadableByteStreamController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
    return false;
  }

  return true;
}

function IsReadableStreamBYOBRequest(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
    return false;
  }

  return true;
}

function ReadableByteStreamControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
  if (shouldPull === false) {
    return undefined;
  }

  if (controller._pulling === true) {
    controller._pullAgain = true;
    return undefined;
  }

  assert(controller._pullAgain === false);

  controller._pulling = true;

  // TODO: Test controller argument
  var pullPromise = controller._pullAlgorithm();
  pullPromise.then(function () {
    controller._pulling = false;

    if (controller._pullAgain === true) {
      controller._pullAgain = false;
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
  }, function (e) {
    ReadableByteStreamControllerError(controller, e);
  }).catch(rethrowAssertionErrorRejection);

  return undefined;
}

function ReadableByteStreamControllerClearPendingPullIntos(controller) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  controller._pendingPullIntos = [];
}

function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
  assert(stream._state !== 'errored');

  var done = false;
  if (stream._state === 'closed') {
    assert(pullIntoDescriptor.bytesFilled === 0);
    done = true;
  }

  var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
  if (pullIntoDescriptor.readerType === 'default') {
    ReadableStreamFulfillReadRequest(stream, filledView, done);
  } else {
    assert(pullIntoDescriptor.readerType === 'byob');
    ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
  }
}

function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
  var bytesFilled = pullIntoDescriptor.bytesFilled;
  var elementSize = pullIntoDescriptor.elementSize;

  assert(bytesFilled <= pullIntoDescriptor.byteLength);
  assert(bytesFilled % elementSize === 0);

  return new pullIntoDescriptor.ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
}

function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
  controller._queue.push({ buffer: buffer, byteOffset: byteOffset, byteLength: byteLength });
  controller._queueTotalSize += byteLength;
}

function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
  var elementSize = pullIntoDescriptor.elementSize;

  var currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;

  var maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
  var maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
  var maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;

  var totalBytesToCopyRemaining = maxBytesToCopy;
  var ready = false;
  if (maxAlignedBytes > currentAlignedBytes) {
    totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
    ready = true;
  }

  var queue = controller._queue;

  while (totalBytesToCopyRemaining > 0) {
    var headOfQueue = queue[0];

    var bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);

    var destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    ArrayBufferCopy(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);

    if (headOfQueue.byteLength === bytesToCopy) {
      queue.shift();
    } else {
      headOfQueue.byteOffset += bytesToCopy;
      headOfQueue.byteLength -= bytesToCopy;
    }
    controller._queueTotalSize -= bytesToCopy;

    ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);

    totalBytesToCopyRemaining -= bytesToCopy;
  }

  if (ready === false) {
    assert(controller._queueTotalSize === 0);
    assert(pullIntoDescriptor.bytesFilled > 0);
    assert(pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize);
  }

  return ready;
}

function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
  assert(controller._pendingPullIntos.length === 0 || controller._pendingPullIntos[0] === pullIntoDescriptor);

  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  pullIntoDescriptor.bytesFilled += size;
}

function ReadableByteStreamControllerHandleQueueDrain(controller) {
  assert(controller._controlledReadableByteStream._state === 'readable');

  if (controller._queueTotalSize === 0 && controller._closeRequested === true) {
    ReadableStreamClose(controller._controlledReadableByteStream);
  } else {
    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }
}

function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
  if (controller._byobRequest === undefined) {
    return;
  }

  controller._byobRequest._associatedReadableByteStreamController = undefined;
  controller._byobRequest._view = undefined;
  controller._byobRequest = undefined;
}

function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
  assert(controller._closeRequested === false);

  while (controller._pendingPullIntos.length > 0) {
    if (controller._queueTotalSize === 0) {
      return;
    }

    var pullIntoDescriptor = controller._pendingPullIntos[0];

    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) === true) {
      ReadableByteStreamControllerShiftPendingPullInto(controller);

      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
    }
  }
}

function ReadableByteStreamControllerPullInto(controller, view) {
  var stream = controller._controlledReadableByteStream;

  var elementSize = 1;
  if (view.constructor !== DataView) {
    elementSize = view.constructor.BYTES_PER_ELEMENT;
  }

  var ctor = view.constructor;

  var buffer = TransferArrayBuffer(view.buffer);
  var pullIntoDescriptor = {
    buffer: buffer,
    byteOffset: view.byteOffset,
    byteLength: view.byteLength,
    bytesFilled: 0,
    elementSize: elementSize,
    ctor: ctor,
    readerType: 'byob'
  };

  if (controller._pendingPullIntos.length > 0) {
    controller._pendingPullIntos.push(pullIntoDescriptor);

    // No ReadableByteStreamControllerCallPullIfNeeded() call since:
    // - No change happens on desiredSize
    // - The source has already been notified of that there's at least 1 pending read(view)

    return ReadableStreamAddReadIntoRequest(stream);
  }

  if (stream._state === 'closed') {
    var emptyView = new view.constructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
    return Promise.resolve(CreateIterResultObject(emptyView, true));
  }

  if (controller._queueTotalSize > 0) {
    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) === true) {
      var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);

      ReadableByteStreamControllerHandleQueueDrain(controller);

      return Promise.resolve(CreateIterResultObject(filledView, false));
    }

    if (controller._closeRequested === true) {
      var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
      ReadableByteStreamControllerError(controller, e);

      return Promise.reject(e);
    }
  }

  controller._pendingPullIntos.push(pullIntoDescriptor);

  var promise = ReadableStreamAddReadIntoRequest(stream);

  ReadableByteStreamControllerCallPullIfNeeded(controller);

  return promise;
}

function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
  firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);

  assert(firstDescriptor.bytesFilled === 0);

  var stream = controller._controlledReadableByteStream;
  if (ReadableStreamHasBYOBReader(stream) === true) {
    while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
      var pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
      ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
    }
  }
}

function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
  if (pullIntoDescriptor.bytesFilled + bytesWritten > pullIntoDescriptor.byteLength) {
    throw new RangeError('bytesWritten out of range');
  }

  ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);

  if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
    // TODO: Figure out whether we should detach the buffer or not here.
    return;
  }

  ReadableByteStreamControllerShiftPendingPullInto(controller);

  var remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
  if (remainderSize > 0) {
    var end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    var remainder = pullIntoDescriptor.buffer.slice(end - remainderSize, end);
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
  }

  pullIntoDescriptor.buffer = TransferArrayBuffer(pullIntoDescriptor.buffer);
  pullIntoDescriptor.bytesFilled -= remainderSize;
  ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);

  ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
}

function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
  var firstDescriptor = controller._pendingPullIntos[0];

  var stream = controller._controlledReadableByteStream;

  if (stream._state === 'closed') {
    if (bytesWritten !== 0) {
      throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
    }

    ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
  } else {
    assert(stream._state === 'readable');

    ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
  }

  ReadableByteStreamControllerCallPullIfNeeded(controller);
}

function ReadableByteStreamControllerShiftPendingPullInto(controller) {
  var descriptor = controller._pendingPullIntos.shift();
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  return descriptor;
}

function ReadableByteStreamControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableByteStream;

  if (stream._state !== 'readable') {
    return false;
  }

  if (controller._closeRequested === true) {
    return false;
  }

  if (controller._started === false) {
    return false;
  }

  if (ReadableStreamHasDefaultReader(stream) === true && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }

  if (ReadableStreamHasBYOBReader(stream) === true && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
    return true;
  }

  if (ReadableByteStreamControllerGetDesiredSize(controller) > 0) {
    return true;
  }

  return false;
}

// A client of ReadableByteStreamController may use these functions directly to bypass state check.

function ReadableByteStreamControllerClose(controller) {
  var stream = controller._controlledReadableByteStream;

  assert(controller._closeRequested === false);
  assert(stream._state === 'readable');

  if (controller._queueTotalSize > 0) {
    controller._closeRequested = true;

    return;
  }

  if (controller._pendingPullIntos.length > 0) {
    var firstPendingPullInto = controller._pendingPullIntos[0];
    if (firstPendingPullInto.bytesFilled > 0) {
      var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
      ReadableByteStreamControllerError(controller, e);

      throw e;
    }
  }

  ReadableStreamClose(stream);
}

function ReadableByteStreamControllerEnqueue(controller, chunk) {
  var stream = controller._controlledReadableByteStream;

  assert(controller._closeRequested === false);
  assert(stream._state === 'readable');

  var buffer = chunk.buffer;
  var byteOffset = chunk.byteOffset;
  var byteLength = chunk.byteLength;
  var transferredBuffer = TransferArrayBuffer(buffer);

  if (ReadableStreamHasDefaultReader(stream) === true) {
    if (ReadableStreamGetNumReadRequests(stream) === 0) {
      ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    } else {
      assert(controller._queue.length === 0);

      var transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
      ReadableStreamFulfillReadRequest(stream, transferredView, false);
    }
  } else if (ReadableStreamHasBYOBReader(stream) === true) {
    // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
  } else {
    assert(IsReadableStreamLocked(stream) === false);
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
  }

  ReadableByteStreamControllerCallPullIfNeeded(controller);
}

function ReadableByteStreamControllerError(controller, e) {
  var stream = controller._controlledReadableByteStream;

  if (stream._state !== 'readable') {
    return;
  }

  ReadableByteStreamControllerClearPendingPullIntos(controller);

  ResetQueue(controller);
  ReadableStreamError(stream, e);
}

function ReadableByteStreamControllerGetDesiredSize(controller) {
  var stream = controller._controlledReadableByteStream;
  var state = stream._state;

  if (state === 'errored') {
    return null;
  }
  if (state === 'closed') {
    return 0;
  }

  return controller._strategyHWM - controller._queueTotalSize;
}

function ReadableByteStreamControllerRespond(controller, bytesWritten) {
  bytesWritten = Number(bytesWritten);
  if (IsFiniteNonNegativeNumber(bytesWritten) === false) {
    throw new RangeError('bytesWritten must be a finite');
  }

  assert(controller._pendingPullIntos.length > 0);

  ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
}

function ReadableByteStreamControllerRespondWithNewView(controller, view) {
  assert(controller._pendingPullIntos.length > 0);

  var firstDescriptor = controller._pendingPullIntos[0];

  if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
    throw new RangeError('The region specified by view does not match byobRequest');
  }
  if (firstDescriptor.byteLength !== view.byteLength) {
    throw new RangeError('The buffer of view has different capacity than byobRequest');
  }

  firstDescriptor.buffer = view.buffer;

  ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
}

function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
  assert(stream._readableStreamController === undefined);
  if (autoAllocateChunkSize !== undefined) {
    assert(Number.isInteger(autoAllocateChunkSize) === true);
    assert(autoAllocateChunkSize > 0);
  }

  controller._controlledReadableByteStream = stream;

  controller._pullAgain = false;
  controller._pulling = false;

  ReadableByteStreamControllerClearPendingPullIntos(controller);

  // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
  controller._queue = controller._queueTotalSize = undefined;
  ResetQueue(controller);

  controller._closeRequested = false;
  controller._started = false;

  controller._strategyHWM = ValidateAndNormalizeHighWaterMark(highWaterMark);

  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;

  controller._autoAllocateChunkSize = autoAllocateChunkSize;

  controller._pendingPullIntos = [];

  stream._readableStreamController = controller;

  var startResult = startAlgorithm();
  Promise.resolve(startResult).then(function () {
    controller._started = true;

    assert(controller._pulling === false);
    assert(controller._pullAgain === false);

    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }, function (r) {
    ReadableByteStreamControllerError(controller, r);
  }).catch(rethrowAssertionErrorRejection);
}

function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
  assert(underlyingByteSource !== undefined);

  var controller = Object.create(ReadableByteStreamController.prototype);

  function startAlgorithm() {
    return InvokeOrNoop(underlyingByteSource, 'start', [controller]);
  }

  var pullAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingByteSource, 'pull', 0, [controller]);
  var cancelAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingByteSource, 'cancel', 1, []);

  var autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
  if (autoAllocateChunkSize !== undefined) {
    if (Number.isInteger(autoAllocateChunkSize) === false || autoAllocateChunkSize <= 0) {
      throw new RangeError('autoAllocateChunkSize must be a positive integer');
    }
  }

  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
}

function SetUpReadableStreamBYOBRequest(request, controller, view) {
  assert(IsReadableByteStreamController(controller) === true);
  assert((typeof view === 'undefined' ? 'undefined' : _typeof(view)) === 'object');
  assert(ArrayBuffer.isView(view) === true);
  assert(IsDetachedBuffer(view.buffer) === false);
  request._associatedReadableByteStreamController = controller;
  request._view = view;
}

// Helper functions for the ReadableStream.

function streamBrandCheckException(name) {
  return new TypeError('ReadableStream.prototype.' + name + ' can only be used on a ReadableStream');
}

// Helper functions for the readers.

function readerLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released reader');
}

// Helper functions for the ReadableStreamDefaultReader.

function defaultReaderBrandCheckException(name) {
  return new TypeError('ReadableStreamDefaultReader.prototype.' + name + ' can only be used on a ReadableStreamDefaultReader');
}

function defaultReaderClosedPromiseInitialize(reader) {
  reader._closedPromise = new Promise(function (resolve, reject) {
    reader._closedPromise_resolve = resolve;
    reader._closedPromise_reject = reject;
  });
}

function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
  reader._closedPromise = Promise.reject(reason);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

function defaultReaderClosedPromiseInitializeAsResolved(reader) {
  reader._closedPromise = Promise.resolve(undefined);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

function defaultReaderClosedPromiseReject(reader, reason) {
  assert(reader._closedPromise_resolve !== undefined);
  assert(reader._closedPromise_reject !== undefined);

  reader._closedPromise_reject(reason);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

function defaultReaderClosedPromiseResetToRejected(reader, reason) {
  assert(reader._closedPromise_resolve === undefined);
  assert(reader._closedPromise_reject === undefined);

  reader._closedPromise = Promise.reject(reason);
}

function defaultReaderClosedPromiseResolve(reader) {
  assert(reader._closedPromise_resolve !== undefined);
  assert(reader._closedPromise_reject !== undefined);

  reader._closedPromise_resolve(undefined);
  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

// Helper functions for the ReadableStreamDefaultReader.

function byobReaderBrandCheckException(name) {
  return new TypeError('ReadableStreamBYOBReader.prototype.' + name + ' can only be used on a ReadableStreamBYOBReader');
}

// Helper functions for the ReadableStreamDefaultController.

function defaultControllerBrandCheckException(name) {
  return new TypeError('ReadableStreamDefaultController.prototype.' + name + ' can only be used on a ReadableStreamDefaultController');
}

// Helper functions for the ReadableStreamBYOBRequest.

function byobRequestBrandCheckException(name) {
  return new TypeError('ReadableStreamBYOBRequest.prototype.' + name + ' can only be used on a ReadableStreamBYOBRequest');
}

// Helper functions for the ReadableByteStreamController.

function byteStreamControllerBrandCheckException(name) {
  return new TypeError('ReadableByteStreamController.prototype.' + name + ' can only be used on a ReadableByteStreamController');
}

// Helper function for ReadableStream pipeThrough

function ifIsObjectAndHasAPromiseIsHandledInternalSlotSetPromiseIsHandledToTrue(promise) {
  try {
    // This relies on the brand-check that is enforced by Promise.prototype.then(). As with the rest of the reference
    // implementation, it doesn't attempt to do the right thing if someone has modified the global environment.
    Promise.prototype.then.call(promise, undefined, function () {});
  } catch (e) {
    // The brand check failed, therefore the internal slot is not present and there's nothing further to do.
  }
}

},{"./helpers.js":12,"./queue-with-sizes.js":13,"./utils.js":16,"./writable-stream.js":17,"better-assert":3}],15:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = _dereq_('better-assert');

// Calls to verbose() are purely for debugging the reference implementation and tests. They are not part of the standard
// and do not appear in the standard text.
var verbose = _dereq_('debug')('streams:transform-stream:verbose');

var _require = _dereq_('./helpers.js'),
    InvokeOrNoop = _require.InvokeOrNoop,
    CreateAlgorithmFromUnderlyingMethod = _require.CreateAlgorithmFromUnderlyingMethod,
    PromiseCall = _require.PromiseCall,
    typeIsObject = _require.typeIsObject,
    ValidateAndNormalizeHighWaterMark = _require.ValidateAndNormalizeHighWaterMark,
    IsNonNegativeNumber = _require.IsNonNegativeNumber,
    MakeSizeAlgorithmFromSizeFunction = _require.MakeSizeAlgorithmFromSizeFunction;

var _require2 = _dereq_('./readable-stream.js'),
    CreateReadableStream = _require2.CreateReadableStream,
    ReadableStreamDefaultControllerClose = _require2.ReadableStreamDefaultControllerClose,
    ReadableStreamDefaultControllerEnqueue = _require2.ReadableStreamDefaultControllerEnqueue,
    ReadableStreamDefaultControllerError = _require2.ReadableStreamDefaultControllerError,
    ReadableStreamDefaultControllerGetDesiredSize = _require2.ReadableStreamDefaultControllerGetDesiredSize,
    ReadableStreamDefaultControllerHasBackpressure = _require2.ReadableStreamDefaultControllerHasBackpressure,
    ReadableStreamDefaultControllerCanCloseOrEnqueue = _require2.ReadableStreamDefaultControllerCanCloseOrEnqueue;

var _require3 = _dereq_('./writable-stream.js'),
    CreateWritableStream = _require3.CreateWritableStream,
    WritableStreamDefaultControllerErrorIfNeeded = _require3.WritableStreamDefaultControllerErrorIfNeeded;

// Class TransformStream

var TransformStream = function () {
  function TransformStream() {
    var transformer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var writableStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var readableStrategy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, TransformStream);

    var readableType = transformer.readableType;

    if (readableType !== undefined) {
      throw new RangeError('Invalid readable type specified');
    }

    var writableType = transformer.writableType;

    if (writableType !== undefined) {
      throw new RangeError('Invalid writable type specified');
    }

    var writableSizeFunction = writableStrategy.size;
    var writableSizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(writableSizeFunction);
    var writableHighWaterMark = writableStrategy.highWaterMark;
    if (writableHighWaterMark === undefined) {
      writableHighWaterMark = 1;
    }
    writableHighWaterMark = ValidateAndNormalizeHighWaterMark(writableHighWaterMark);

    var readableSizeFunction = readableStrategy.size;
    var readableSizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(readableSizeFunction);
    var readableHighWaterMark = readableStrategy.highWaterMark;
    if (readableHighWaterMark === undefined) {
      readableHighWaterMark = 0;
    }
    readableHighWaterMark = ValidateAndNormalizeHighWaterMark(readableHighWaterMark);

    var startPromise_resolve = void 0;
    var startPromise = new Promise(function (resolve) {
      startPromise_resolve = resolve;
    });

    InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
    SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);

    var startResult = InvokeOrNoop(transformer, 'start', [this._transformStreamController]);
    startPromise_resolve(startResult);
  }

  _createClass(TransformStream, [{
    key: 'readable',
    get: function get() {
      if (IsTransformStream(this) === false) {
        throw streamBrandCheckException('readable');
      }

      return this._readable;
    }
  }, {
    key: 'writable',
    get: function get() {
      if (IsTransformStream(this) === false) {
        throw streamBrandCheckException('writable');
      }

      return this._writable;
    }
  }]);

  return TransformStream;
}();

// Transform Stream Abstract Operations

function CreateTransformStream(startAlgorithm, transformAlgorithm, flushAlgorithm) {
  var writableHighWaterMark = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var writableSizeAlgorithm = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
    return 1;
  };
  var readableHighWaterMark = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var readableSizeAlgorithm = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {
    return 1;
  };

  assert(IsNonNegativeNumber(writableHighWaterMark));
  assert(IsNonNegativeNumber(readableHighWaterMark));

  var stream = Object.create(TransformStream.prototype);

  var startPromise_resolve = void 0;
  var startPromise = new Promise(function (resolve) {
    startPromise_resolve = resolve;
  });

  InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);

  var controller = Object.create(TransformStreamDefaultController.prototype);

  SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);

  var startResult = startAlgorithm();
  startPromise_resolve(startResult);
  return stream;
}

function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
  function startAlgorithm() {
    return startPromise;
  }

  function writeAlgorithm(chunk) {
    return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
  }

  function abortAlgorithm(reason) {
    return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
  }

  function closeAlgorithm() {
    return TransformStreamDefaultSinkCloseAlgorithm(stream);
  }

  stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);

  function pullAlgorithm() {
    return TransformStreamDefaultSourcePullAlgorithm(stream);
  }

  function cancelAlgorithm(reason) {
    TransformStreamErrorWritableAndUnblockWrite(stream, reason);
    return Promise.resolve();
  }

  stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);

  // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
  stream._backpressure = undefined;
  stream._backpressureChangePromise = undefined;
  stream._backpressureChangePromise_resolve = undefined;
  TransformStreamSetBackpressure(stream, true);

  // Used by IsWritableStream() which is called by SetUpTransformStreamDefaultController().
  stream._transformStreamController = undefined;
}

function IsTransformStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
    return false;
  }

  return true;
}

// This is a no-op if both sides are already errored.
function TransformStreamError(stream, e) {
  verbose('TransformStreamError()');

  ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
  TransformStreamErrorWritableAndUnblockWrite(stream, e);
}

function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
  WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
  if (stream._backpressure === true) {
    // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
    // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
    // _backpressure is set.
    TransformStreamSetBackpressure(stream, false);
  }
}

function TransformStreamSetBackpressure(stream, backpressure) {
  verbose('TransformStreamSetBackpressure() [backpressure = ' + backpressure + ']');

  // Passes also when called during construction.
  assert(stream._backpressure !== backpressure);

  if (stream._backpressureChangePromise !== undefined) {
    stream._backpressureChangePromise_resolve();
  }

  stream._backpressureChangePromise = new Promise(function (resolve) {
    stream._backpressureChangePromise_resolve = resolve;
  });

  stream._backpressure = backpressure;
}

// Class TransformStreamDefaultController

var TransformStreamDefaultController = function () {
  function TransformStreamDefaultController() {
    _classCallCheck(this, TransformStreamDefaultController);

    throw new TypeError('TransformStreamDefaultController instances cannot be created directly');
  }

  _createClass(TransformStreamDefaultController, [{
    key: 'enqueue',
    value: function enqueue(chunk) {
      if (IsTransformStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('enqueue');
      }

      TransformStreamDefaultControllerEnqueue(this, chunk);
    }
  }, {
    key: 'error',
    value: function error(reason) {
      if (IsTransformStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('error');
      }

      TransformStreamDefaultControllerError(this, reason);
    }
  }, {
    key: 'terminate',
    value: function terminate() {
      if (IsTransformStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('terminate');
      }

      TransformStreamDefaultControllerTerminate(this);
    }
  }, {
    key: 'desiredSize',
    get: function get() {
      if (IsTransformStreamDefaultController(this) === false) {
        throw defaultControllerBrandCheckException('desiredSize');
      }

      var readableController = this._controlledTransformStream._readable._readableStreamController;
      return ReadableStreamDefaultControllerGetDesiredSize(readableController);
    }
  }]);

  return TransformStreamDefaultController;
}();

// Transform Stream Default Controller Abstract Operations

function IsTransformStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
    return false;
  }

  return true;
}

function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
  assert(IsTransformStream(stream) === true);
  assert(stream._transformStreamController === undefined);

  controller._controlledTransformStream = stream;
  stream._transformStreamController = controller;

  controller._transformAlgorithm = transformAlgorithm;
  controller._flushAlgorithm = flushAlgorithm;
}

function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
  assert(transformer !== undefined);

  var controller = Object.create(TransformStreamDefaultController.prototype);

  var transformAlgorithm = function transformAlgorithm(chunk) {
    try {
      TransformStreamDefaultControllerEnqueue(controller, chunk);
      return Promise.resolve();
    } catch (transformResultE) {
      return Promise.reject(transformResultE);
    }
  };
  var transformMethod = transformer.transform;
  if (transformMethod !== undefined) {
    if (typeof transformMethod !== 'function') {
      throw new TypeError('transform is not a method');
    }
    transformAlgorithm = function transformAlgorithm(chunk) {
      var transformPromise = PromiseCall(transformMethod, transformer, [chunk, controller]);
      return transformPromise.catch(function (e) {
        TransformStreamError(stream, e);
        throw e;
      });
    };
  }

  var flushAlgorithm = CreateAlgorithmFromUnderlyingMethod(transformer, 'flush', 0, [controller]);

  SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
}

function TransformStreamDefaultControllerEnqueue(controller, chunk) {
  verbose('TransformStreamDefaultControllerEnqueue()');

  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;
  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === false) {
    throw new TypeError('Readable side is not in a state that permits enqueue');
  }

  // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
  // accept TransformStreamDefaultControllerEnqueue() calls.

  try {
    ReadableStreamDefaultControllerEnqueue(readableController, chunk);
  } catch (e) {
    // This happens when readableStrategy.size() throws.
    TransformStreamErrorWritableAndUnblockWrite(stream, e);

    throw stream._readable._storedError;
  }

  var backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
  if (backpressure !== stream._backpressure) {
    assert(backpressure === true);
    TransformStreamSetBackpressure(stream, true);
  }
}

function TransformStreamDefaultControllerError(controller, e) {
  TransformStreamError(controller._controlledTransformStream, e);
}

function TransformStreamDefaultControllerTerminate(controller) {
  verbose('TransformStreamDefaultControllerTerminate()');

  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;

  if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === true) {
    ReadableStreamDefaultControllerClose(readableController);
  }

  var error = new TypeError('TransformStream terminated');
  TransformStreamErrorWritableAndUnblockWrite(stream, error);
}

// TransformStreamDefaultSink Algorithms

function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
  verbose('TransformStreamDefaultSinkWriteAlgorithm()');

  assert(stream._writable._state === 'writable');

  var controller = stream._transformStreamController;

  if (stream._backpressure === true) {
    var backpressureChangePromise = stream._backpressureChangePromise;
    assert(backpressureChangePromise !== undefined);
    return backpressureChangePromise.then(function () {
      var writable = stream._writable;
      var state = writable._state;
      if (state === 'erroring') {
        throw writable._storedError;
      }
      assert(state === 'writable');
      return controller._transformAlgorithm(chunk);
    });
  }

  return controller._transformAlgorithm(chunk);
}

function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
  // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
  // errored.
  TransformStreamError(stream, reason);
  return Promise.resolve();
}

function TransformStreamDefaultSinkCloseAlgorithm(stream) {
  verbose('TransformStreamDefaultSinkCloseAlgorithm()');

  // stream._readable cannot change after construction, so caching it across a call to user code is safe.
  var readable = stream._readable;

  var flushPromise = stream._transformStreamController._flushAlgorithm();
  // Return a promise that is fulfilled with undefined on success.
  return flushPromise.then(function () {
    if (readable._state === 'errored') {
      throw readable._storedError;
    }
    var readableController = readable._readableStreamController;
    if (ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController) === true) {
      ReadableStreamDefaultControllerClose(readableController);
    }
  }).catch(function (r) {
    TransformStreamError(stream, r);
    throw readable._storedError;
  });
}

// TransformStreamDefaultSource Algorithms

function TransformStreamDefaultSourcePullAlgorithm(stream) {
  verbose('TransformStreamDefaultSourcePullAlgorithm()');

  // Invariant. Enforced by the promises returned by start() and pull().
  assert(stream._backpressure === true);

  assert(stream._backpressureChangePromise !== undefined);

  TransformStreamSetBackpressure(stream, false);

  // Prevent the next pull() call until there is backpressure.
  return stream._backpressureChangePromise;
}

module.exports = { CreateTransformStream: CreateTransformStream, TransformStream: TransformStream };

// Helper functions for the TransformStreamDefaultController.

function defaultControllerBrandCheckException(name) {
  return new TypeError('TransformStreamDefaultController.prototype.' + name + ' can only be used on a TransformStreamDefaultController');
}

// Helper functions for the TransformStream.

function streamBrandCheckException(name) {
  return new TypeError('TransformStream.prototype.' + name + ' can only be used on a TransformStream');
}

},{"./helpers.js":12,"./readable-stream.js":14,"./writable-stream.js":17,"better-assert":3,"debug":18}],16:[function(_dereq_,module,exports){
'use strict';

var assert = _dereq_('assert');

exports.rethrowAssertionErrorRejection = function (e) {
  // Used throughout the reference implementation, as `.catch(rethrowAssertionErrorRejection)`, to ensure any errors
  // get shown. There are places in the spec where we do promise transformations and purposefully ignore or don't
  // expect any errors, but assertion errors are always problematic.
  if (e && e instanceof assert.AssertionError) {
    setTimeout(function () {
      throw e;
    }, 0);
  }
};

},{"assert":2}],17:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = _dereq_('better-assert');

// Calls to verbose() are purely for debugging the reference implementation and tests. They are not part of the standard
// and do not appear in the standard text.
var verbose = _dereq_('debug')('streams:writable-stream:verbose');

var _require = _dereq_('./helpers.js'),
    CreateAlgorithmFromUnderlyingMethod = _require.CreateAlgorithmFromUnderlyingMethod,
    InvokeOrNoop = _require.InvokeOrNoop,
    ValidateAndNormalizeHighWaterMark = _require.ValidateAndNormalizeHighWaterMark,
    IsNonNegativeNumber = _require.IsNonNegativeNumber,
    MakeSizeAlgorithmFromSizeFunction = _require.MakeSizeAlgorithmFromSizeFunction,
    typeIsObject = _require.typeIsObject;

var _require2 = _dereq_('./utils.js'),
    rethrowAssertionErrorRejection = _require2.rethrowAssertionErrorRejection;

var _require3 = _dereq_('./queue-with-sizes.js'),
    DequeueValue = _require3.DequeueValue,
    EnqueueValueWithSize = _require3.EnqueueValueWithSize,
    PeekQueueValue = _require3.PeekQueueValue,
    ResetQueue = _require3.ResetQueue;

var AbortSteps = Symbol('[[AbortSteps]]');
var ErrorSteps = Symbol('[[ErrorSteps]]');

var WritableStream = function () {
  function WritableStream() {
    var underlyingSink = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        size = _ref.size,
        _ref$highWaterMark = _ref.highWaterMark,
        highWaterMark = _ref$highWaterMark === undefined ? 1 : _ref$highWaterMark;

    _classCallCheck(this, WritableStream);

    InitializeWritableStream(this);

    var type = underlyingSink.type;

    if (type !== undefined) {
      throw new RangeError('Invalid type is specified');
    }

    var sizeAlgorithm = MakeSizeAlgorithmFromSizeFunction(size);
    highWaterMark = ValidateAndNormalizeHighWaterMark(highWaterMark);

    SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
  }

  _createClass(WritableStream, [{
    key: 'abort',
    value: function abort(reason) {
      if (IsWritableStream(this) === false) {
        return Promise.reject(streamBrandCheckException('abort'));
      }

      if (IsWritableStreamLocked(this) === true) {
        return Promise.reject(new TypeError('Cannot abort a stream that already has a writer'));
      }

      return WritableStreamAbort(this, reason);
    }
  }, {
    key: 'getWriter',
    value: function getWriter() {
      if (IsWritableStream(this) === false) {
        throw streamBrandCheckException('getWriter');
      }

      return AcquireWritableStreamDefaultWriter(this);
    }
  }, {
    key: 'locked',
    get: function get() {
      if (IsWritableStream(this) === false) {
        throw streamBrandCheckException('locked');
      }

      return IsWritableStreamLocked(this);
    }
  }]);

  return WritableStream;
}();

module.exports = {
  AcquireWritableStreamDefaultWriter: AcquireWritableStreamDefaultWriter,
  CreateWritableStream: CreateWritableStream,
  IsWritableStream: IsWritableStream,
  IsWritableStreamLocked: IsWritableStreamLocked,
  WritableStream: WritableStream,
  WritableStreamAbort: WritableStreamAbort,
  WritableStreamDefaultControllerErrorIfNeeded: WritableStreamDefaultControllerErrorIfNeeded,
  WritableStreamDefaultWriterCloseWithErrorPropagation: WritableStreamDefaultWriterCloseWithErrorPropagation,
  WritableStreamDefaultWriterRelease: WritableStreamDefaultWriterRelease,
  WritableStreamDefaultWriterWrite: WritableStreamDefaultWriterWrite,
  WritableStreamCloseQueuedOrInFlight: WritableStreamCloseQueuedOrInFlight
};

// Abstract operations for the WritableStream.

function AcquireWritableStreamDefaultWriter(stream) {
  return new WritableStreamDefaultWriter(stream);
}

// Throws if and only if startAlgorithm throws.
function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm) {
  var highWaterMark = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var sizeAlgorithm = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {
    return 1;
  };

  assert(IsNonNegativeNumber(highWaterMark) === true);

  var stream = Object.create(WritableStream.prototype);
  InitializeWritableStream(stream);

  var controller = Object.create(WritableStreamDefaultController.prototype);

  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
}

function InitializeWritableStream(stream) {
  stream._state = 'writable';

  // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
  // 'erroring' or 'errored'. May be set to an undefined value.
  stream._storedError = undefined;

  stream._writer = undefined;

  // Initialize to undefined first because the constructor of the controller checks this
  // variable to validate the caller.
  stream._writableStreamController = undefined;

  // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
  // producer without waiting for the queued writes to finish.
  stream._writeRequests = [];

  // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
  // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
  stream._inFlightWriteRequest = undefined;

  // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
  // has been detached.
  stream._closeRequest = undefined;

  // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
  // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
  stream._inFlightCloseRequest = undefined;

  // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
  stream._pendingAbortRequest = undefined;

  // The backpressure signal set by the controller.
  stream._backpressure = false;
}

function IsWritableStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
    return false;
  }

  return true;
}

function IsWritableStreamLocked(stream) {
  assert(IsWritableStream(stream) === true);

  if (stream._writer === undefined) {
    return false;
  }

  return true;
}

function WritableStreamAbort(stream, reason) {
  var state = stream._state;
  if (state === 'closed' || state === 'errored') {
    return Promise.resolve(undefined);
  }
  if (stream._pendingAbortRequest !== undefined) {
    return stream._pendingAbortRequest._promise;
  }

  assert(state === 'writable' || state === 'erroring');

  var wasAlreadyErroring = false;
  if (state === 'erroring') {
    wasAlreadyErroring = true;
    // reason will not be used, so don't keep a reference to it.
    reason = undefined;
  }

  var promise = new Promise(function (resolve, reject) {
    stream._pendingAbortRequest = {
      _resolve: resolve,
      _reject: reject,
      _reason: reason,
      _wasAlreadyErroring: wasAlreadyErroring
    };
  });
  stream._pendingAbortRequest._promise = promise;

  if (wasAlreadyErroring === false) {
    WritableStreamStartErroring(stream, reason);
  }

  return promise;
}

// WritableStream API exposed for controllers.

function WritableStreamAddWriteRequest(stream) {
  assert(IsWritableStreamLocked(stream) === true);
  assert(stream._state === 'writable');

  var promise = new Promise(function (resolve, reject) {
    var writeRequest = {
      _resolve: resolve,
      _reject: reject
    };

    stream._writeRequests.push(writeRequest);
  });

  return promise;
}

function WritableStreamDealWithRejection(stream, error) {
  verbose('WritableStreamDealWithRejection(stream, %o)', error);
  var state = stream._state;

  if (state === 'writable') {
    WritableStreamStartErroring(stream, error);
    return;
  }

  assert(state === 'erroring');
  WritableStreamFinishErroring(stream);
}

function WritableStreamStartErroring(stream, reason) {
  verbose('WritableStreamStartErroring(stream, %o)', reason);
  assert(stream._storedError === undefined);
  assert(stream._state === 'writable');

  var controller = stream._writableStreamController;
  assert(controller !== undefined);

  stream._state = 'erroring';
  stream._storedError = reason;
  var writer = stream._writer;
  if (writer !== undefined) {
    WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
  }

  if (WritableStreamHasOperationMarkedInFlight(stream) === false && controller._started === true) {
    WritableStreamFinishErroring(stream);
  }
}

function WritableStreamFinishErroring(stream) {
  verbose('WritableStreamFinishErroring()');
  assert(stream._state === 'erroring');
  assert(WritableStreamHasOperationMarkedInFlight(stream) === false);
  stream._state = 'errored';
  stream._writableStreamController[ErrorSteps]();

  var storedError = stream._storedError;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stream._writeRequests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var writeRequest = _step.value;

      writeRequest._reject(storedError);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  stream._writeRequests = [];

  if (stream._pendingAbortRequest === undefined) {
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }

  var abortRequest = stream._pendingAbortRequest;
  stream._pendingAbortRequest = undefined;

  if (abortRequest._wasAlreadyErroring === true) {
    abortRequest._reject(storedError);
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }

  var promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
  promise.then(function () {
    abortRequest._resolve();
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  }, function (reason) {
    abortRequest._reject(reason);
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  });
}

function WritableStreamFinishInFlightWrite(stream) {
  assert(stream._inFlightWriteRequest !== undefined);
  stream._inFlightWriteRequest._resolve(undefined);
  stream._inFlightWriteRequest = undefined;
}

function WritableStreamFinishInFlightWriteWithError(stream, error) {
  assert(stream._inFlightWriteRequest !== undefined);
  stream._inFlightWriteRequest._reject(error);
  stream._inFlightWriteRequest = undefined;

  assert(stream._state === 'writable' || stream._state === 'erroring');

  WritableStreamDealWithRejection(stream, error);
}

function WritableStreamFinishInFlightClose(stream) {
  assert(stream._inFlightCloseRequest !== undefined);
  stream._inFlightCloseRequest._resolve(undefined);
  stream._inFlightCloseRequest = undefined;

  var state = stream._state;

  assert(state === 'writable' || state === 'erroring');

  if (state === 'erroring') {
    // The error was too late to do anything, so it is ignored.
    stream._storedError = undefined;
    if (stream._pendingAbortRequest !== undefined) {
      stream._pendingAbortRequest._resolve();
      stream._pendingAbortRequest = undefined;
    }
  }

  stream._state = 'closed';

  var writer = stream._writer;
  if (writer !== undefined) {
    defaultWriterClosedPromiseResolve(writer);
  }

  assert(stream._pendingAbortRequest === undefined);
  assert(stream._storedError === undefined);
}

function WritableStreamFinishInFlightCloseWithError(stream, error) {
  assert(stream._inFlightCloseRequest !== undefined);
  stream._inFlightCloseRequest._reject(error);
  stream._inFlightCloseRequest = undefined;

  assert(stream._state === 'writable' || stream._state === 'erroring');

  // Never execute sink abort() after sink close().
  if (stream._pendingAbortRequest !== undefined) {
    stream._pendingAbortRequest._reject(error);
    stream._pendingAbortRequest = undefined;
  }
  WritableStreamDealWithRejection(stream, error);
}

// TODO(ricea): Fix alphabetical order.
function WritableStreamCloseQueuedOrInFlight(stream) {
  if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
    return false;
  }

  return true;
}

function WritableStreamHasOperationMarkedInFlight(stream) {
  if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
    verbose('WritableStreamHasOperationMarkedInFlight() is false');
    return false;
  }

  verbose('WritableStreamHasOperationMarkedInFlight() is true');
  return true;
}

function WritableStreamMarkCloseRequestInFlight(stream) {
  assert(stream._inFlightCloseRequest === undefined);
  assert(stream._closeRequest !== undefined);
  stream._inFlightCloseRequest = stream._closeRequest;
  stream._closeRequest = undefined;
}

function WritableStreamMarkFirstWriteRequestInFlight(stream) {
  assert(stream._inFlightWriteRequest === undefined);
  assert(stream._writeRequests.length !== 0);
  stream._inFlightWriteRequest = stream._writeRequests.shift();
}

function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
  verbose('WritableStreamRejectCloseAndClosedPromiseIfNeeded()');
  assert(stream._state === 'errored');
  if (stream._closeRequest !== undefined) {
    assert(stream._inFlightCloseRequest === undefined);

    stream._closeRequest._reject(stream._storedError);
    stream._closeRequest = undefined;
  }
  var writer = stream._writer;
  if (writer !== undefined) {
    defaultWriterClosedPromiseReject(writer, stream._storedError);
    writer._closedPromise.catch(function () {});
  }
}

function WritableStreamUpdateBackpressure(stream, backpressure) {
  assert(stream._state === 'writable');
  assert(WritableStreamCloseQueuedOrInFlight(stream) === false);

  var writer = stream._writer;
  if (writer !== undefined && backpressure !== stream._backpressure) {
    if (backpressure === true) {
      defaultWriterReadyPromiseReset(writer);
    } else {
      assert(backpressure === false);

      defaultWriterReadyPromiseResolve(writer);
    }
  }

  stream._backpressure = backpressure;
}

var WritableStreamDefaultWriter = function () {
  function WritableStreamDefaultWriter(stream) {
    _classCallCheck(this, WritableStreamDefaultWriter);

    if (IsWritableStream(stream) === false) {
      throw new TypeError('WritableStreamDefaultWriter can only be constructed with a WritableStream instance');
    }
    if (IsWritableStreamLocked(stream) === true) {
      throw new TypeError('This stream has already been locked for exclusive writing by another writer');
    }

    this._ownerWritableStream = stream;
    stream._writer = this;

    var state = stream._state;

    if (state === 'writable') {
      if (WritableStreamCloseQueuedOrInFlight(stream) === false && stream._backpressure === true) {
        defaultWriterReadyPromiseInitialize(this);
      } else {
        defaultWriterReadyPromiseInitializeAsResolved(this);
      }

      defaultWriterClosedPromiseInitialize(this);
    } else if (state === 'erroring') {
      defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
      this._readyPromise.catch(function () {});
      defaultWriterClosedPromiseInitialize(this);
    } else if (state === 'closed') {
      defaultWriterReadyPromiseInitializeAsResolved(this);
      defaultWriterClosedPromiseInitializeAsResolved(this);
    } else {
      assert(state === 'errored');

      var storedError = stream._storedError;
      defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
      this._readyPromise.catch(function () {});
      defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
      this._closedPromise.catch(function () {});
    }
  }

  _createClass(WritableStreamDefaultWriter, [{
    key: 'abort',
    value: function abort(reason) {
      if (IsWritableStreamDefaultWriter(this) === false) {
        return Promise.reject(defaultWriterBrandCheckException('abort'));
      }

      if (this._ownerWritableStream === undefined) {
        return Promise.reject(defaultWriterLockException('abort'));
      }

      return WritableStreamDefaultWriterAbort(this, reason);
    }
  }, {
    key: 'close',
    value: function close() {
      if (IsWritableStreamDefaultWriter(this) === false) {
        return Promise.reject(defaultWriterBrandCheckException('close'));
      }

      var stream = this._ownerWritableStream;

      if (stream === undefined) {
        return Promise.reject(defaultWriterLockException('close'));
      }

      if (WritableStreamCloseQueuedOrInFlight(stream) === true) {
        return Promise.reject(new TypeError('cannot close an already-closing stream'));
      }

      return WritableStreamDefaultWriterClose(this);
    }
  }, {
    key: 'releaseLock',
    value: function releaseLock() {
      if (IsWritableStreamDefaultWriter(this) === false) {
        throw defaultWriterBrandCheckException('releaseLock');
      }

      var stream = this._ownerWritableStream;

      if (stream === undefined) {
        return;
      }

      assert(stream._writer !== undefined);

      WritableStreamDefaultWriterRelease(this);
    }
  }, {
    key: 'write',
    value: function write(chunk) {
      if (IsWritableStreamDefaultWriter(this) === false) {
        return Promise.reject(defaultWriterBrandCheckException('write'));
      }

      if (this._ownerWritableStream === undefined) {
        return Promise.reject(defaultWriterLockException('write to'));
      }

      return WritableStreamDefaultWriterWrite(this, chunk);
    }
  }, {
    key: 'closed',
    get: function get() {
      if (IsWritableStreamDefaultWriter(this) === false) {
        return Promise.reject(defaultWriterBrandCheckException('closed'));
      }

      return this._closedPromise;
    }
  }, {
    key: 'desiredSize',
    get: function get() {
      if (IsWritableStreamDefaultWriter(this) === false) {
        throw defaultWriterBrandCheckException('desiredSize');
      }

      if (this._ownerWritableStream === undefined) {
        throw defaultWriterLockException('desiredSize');
      }

      return WritableStreamDefaultWriterGetDesiredSize(this);
    }
  }, {
    key: 'ready',
    get: function get() {
      if (IsWritableStreamDefaultWriter(this) === false) {
        return Promise.reject(defaultWriterBrandCheckException('ready'));
      }

      return this._readyPromise;
    }
  }]);

  return WritableStreamDefaultWriter;
}();

// Abstract operations for the WritableStreamDefaultWriter.

function IsWritableStreamDefaultWriter(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
    return false;
  }

  return true;
}

// A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.

function WritableStreamDefaultWriterAbort(writer, reason) {
  var stream = writer._ownerWritableStream;

  assert(stream !== undefined);

  return WritableStreamAbort(stream, reason);
}

function WritableStreamDefaultWriterClose(writer) {
  var stream = writer._ownerWritableStream;

  assert(stream !== undefined);

  var state = stream._state;
  if (state === 'closed' || state === 'errored') {
    return Promise.reject(new TypeError('The stream (in ' + state + ' state) is not in the writable state and cannot be closed'));
  }

  assert(state === 'writable' || state === 'erroring');
  assert(WritableStreamCloseQueuedOrInFlight(stream) === false);

  var promise = new Promise(function (resolve, reject) {
    var closeRequest = {
      _resolve: resolve,
      _reject: reject
    };

    stream._closeRequest = closeRequest;
  });

  if (stream._backpressure === true && state === 'writable') {
    defaultWriterReadyPromiseResolve(writer);
  }

  WritableStreamDefaultControllerClose(stream._writableStreamController);

  return promise;
}

function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
  var stream = writer._ownerWritableStream;

  assert(stream !== undefined);

  var state = stream._state;
  if (WritableStreamCloseQueuedOrInFlight(stream) === true || state === 'closed') {
    return Promise.resolve();
  }

  if (state === 'errored') {
    return Promise.reject(stream._storedError);
  }

  assert(state === 'writable' || state === 'erroring');

  return WritableStreamDefaultWriterClose(writer);
}

function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
  if (writer._closedPromiseState === 'pending') {
    defaultWriterClosedPromiseReject(writer, error);
  } else {
    defaultWriterClosedPromiseResetToRejected(writer, error);
  }
  writer._closedPromise.catch(function () {});
}

function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
  verbose('WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, %o)', error);
  if (writer._readyPromiseState === 'pending') {
    defaultWriterReadyPromiseReject(writer, error);
  } else {
    defaultWriterReadyPromiseResetToRejected(writer, error);
  }
  writer._readyPromise.catch(function () {});
}

function WritableStreamDefaultWriterGetDesiredSize(writer) {
  var stream = writer._ownerWritableStream;
  var state = stream._state;

  if (state === 'errored' || state === 'erroring') {
    return null;
  }

  if (state === 'closed') {
    return 0;
  }

  return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
}

function WritableStreamDefaultWriterRelease(writer) {
  var stream = writer._ownerWritableStream;
  assert(stream !== undefined);
  assert(stream._writer === writer);

  var releasedError = new TypeError('Writer was released and can no longer be used to monitor the stream\'s closedness');

  WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);

  // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
  // rejected until afterwards. This means that simply testing state will not work.
  WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);

  stream._writer = undefined;
  writer._ownerWritableStream = undefined;
}

function WritableStreamDefaultWriterWrite(writer, chunk) {
  var stream = writer._ownerWritableStream;

  assert(stream !== undefined);

  var controller = stream._writableStreamController;

  var chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);

  if (stream !== writer._ownerWritableStream) {
    return Promise.reject(defaultWriterLockException('write to'));
  }

  var state = stream._state;
  if (state === 'errored') {
    return Promise.reject(stream._storedError);
  }
  if (WritableStreamCloseQueuedOrInFlight(stream) === true || state === 'closed') {
    return Promise.reject(new TypeError('The stream is closing or closed and cannot be written to'));
  }
  if (state === 'erroring') {
    return Promise.reject(stream._storedError);
  }

  assert(state === 'writable');

  var promise = WritableStreamAddWriteRequest(stream);

  WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);

  return promise;
}

var WritableStreamDefaultController = function () {
  function WritableStreamDefaultController() {
    _classCallCheck(this, WritableStreamDefaultController);

    throw new TypeError('WritableStreamDefaultController cannot be constructed explicitly');
  }

  _createClass(WritableStreamDefaultController, [{
    key: 'error',
    value: function error(e) {
      if (IsWritableStreamDefaultController(this) === false) {
        throw new TypeError('WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController');
      }
      var state = this._controlledWritableStream._state;
      if (state !== 'writable') {
        // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
        // just treat it as a no-op.
        return;
      }

      WritableStreamDefaultControllerError(this, e);
    }
  }, {
    key: AbortSteps,
    value: function value(reason) {
      return this._abortAlgorithm(reason);
    }
  }, {
    key: ErrorSteps,
    value: function value() {
      ResetQueue(this);
    }
  }]);

  return WritableStreamDefaultController;
}();

// Abstract operations implementing interface required by the WritableStream.

function IsWritableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
    return false;
  }

  return true;
}

function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  assert(IsWritableStream(stream) === true);
  assert(stream._writableStreamController === undefined);

  controller._controlledWritableStream = stream;
  stream._writableStreamController = controller;

  // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);

  controller._started = false;

  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;

  controller._writeAlgorithm = writeAlgorithm;
  controller._closeAlgorithm = closeAlgorithm;
  controller._abortAlgorithm = abortAlgorithm;

  var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
  WritableStreamUpdateBackpressure(stream, backpressure);

  var startResult = startAlgorithm();
  var startPromise = Promise.resolve(startResult);
  startPromise.then(function () {
    assert(stream._state === 'writable' || stream._state === 'erroring');
    controller._started = true;
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (r) {
    assert(stream._state === 'writable' || stream._state === 'erroring');
    controller._started = true;
    WritableStreamDealWithRejection(stream, r);
  }).catch(rethrowAssertionErrorRejection);
}

function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
  assert(underlyingSink !== undefined);

  var controller = Object.create(WritableStreamDefaultController.prototype);

  function startAlgorithm() {
    return InvokeOrNoop(underlyingSink, 'start', [controller]);
  }

  var writeAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'write', 1, [controller]);
  var closeAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'close', 0, []);
  var abortAlgorithm = CreateAlgorithmFromUnderlyingMethod(underlyingSink, 'abort', 1, []);

  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
}

function WritableStreamDefaultControllerClose(controller) {
  EnqueueValueWithSize(controller, 'close', 0);
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}

function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
  try {
    return controller._strategySizeAlgorithm(chunk);
  } catch (chunkSizeE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
    return 1;
  }
}

function WritableStreamDefaultControllerGetDesiredSize(controller) {
  return controller._strategyHWM - controller._queueTotalSize;
}

function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
  var writeRecord = { chunk: chunk };

  try {
    EnqueueValueWithSize(controller, writeRecord, chunkSize);
  } catch (enqueueE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
    return;
  }

  var stream = controller._controlledWritableStream;
  if (WritableStreamCloseQueuedOrInFlight(stream) === false && stream._state === 'writable') {
    var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
    WritableStreamUpdateBackpressure(stream, backpressure);
  }

  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}

// Abstract operations for the WritableStreamDefaultController.

function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
  verbose('WritableStreamDefaultControllerAdvanceQueueIfNeeded()');
  var stream = controller._controlledWritableStream;

  if (controller._started === false) {
    return;
  }

  if (stream._inFlightWriteRequest !== undefined) {
    return;
  }

  var state = stream._state;
  if (state === 'closed' || state === 'errored') {
    return;
  }
  if (state === 'erroring') {
    WritableStreamFinishErroring(stream);
    return;
  }

  if (controller._queue.length === 0) {
    return;
  }

  var writeRecord = PeekQueueValue(controller);
  if (writeRecord === 'close') {
    WritableStreamDefaultControllerProcessClose(controller);
  } else {
    WritableStreamDefaultControllerProcessWrite(controller, writeRecord.chunk);
  }
}

function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
  if (controller._controlledWritableStream._state === 'writable') {
    WritableStreamDefaultControllerError(controller, error);
  }
}

function WritableStreamDefaultControllerProcessClose(controller) {
  var stream = controller._controlledWritableStream;

  WritableStreamMarkCloseRequestInFlight(stream);

  DequeueValue(controller);
  assert(controller._queue.length === 0);

  var sinkClosePromise = controller._closeAlgorithm();
  sinkClosePromise.then(function () {
    WritableStreamFinishInFlightClose(stream);
  }, function (reason) {
    WritableStreamFinishInFlightCloseWithError(stream, reason);
  }).catch(rethrowAssertionErrorRejection);
}

function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
  var stream = controller._controlledWritableStream;

  WritableStreamMarkFirstWriteRequestInFlight(stream);

  var sinkWritePromise = controller._writeAlgorithm(chunk);
  sinkWritePromise.then(function () {
    WritableStreamFinishInFlightWrite(stream);

    var state = stream._state;
    assert(state === 'writable' || state === 'erroring');

    DequeueValue(controller);

    if (WritableStreamCloseQueuedOrInFlight(stream) === false && state === 'writable') {
      var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
    }

    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (reason) {
    WritableStreamFinishInFlightWriteWithError(stream, reason);
  }).catch(rethrowAssertionErrorRejection);
}

function WritableStreamDefaultControllerGetBackpressure(controller) {
  var desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
  return desiredSize <= 0;
}

// A client of WritableStreamDefaultController may use these functions directly to bypass state check.

function WritableStreamDefaultControllerError(controller, error) {
  var stream = controller._controlledWritableStream;

  assert(stream._state === 'writable');

  WritableStreamStartErroring(stream, error);
}

// Helper functions for the WritableStream.

function streamBrandCheckException(name) {
  return new TypeError('WritableStream.prototype.' + name + ' can only be used on a WritableStream');
}

// Helper functions for the WritableStreamDefaultWriter.

function defaultWriterBrandCheckException(name) {
  return new TypeError('WritableStreamDefaultWriter.prototype.' + name + ' can only be used on a WritableStreamDefaultWriter');
}

function defaultWriterLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released writer');
}

function defaultWriterClosedPromiseInitialize(writer) {
  writer._closedPromise = new Promise(function (resolve, reject) {
    writer._closedPromise_resolve = resolve;
    writer._closedPromise_reject = reject;
    writer._closedPromiseState = 'pending';
  });
}

function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
  writer._closedPromise = Promise.reject(reason);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'rejected';
}

function defaultWriterClosedPromiseInitializeAsResolved(writer) {
  writer._closedPromise = Promise.resolve(undefined);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'resolved';
}

function defaultWriterClosedPromiseReject(writer, reason) {
  assert(writer._closedPromise_resolve !== undefined);
  assert(writer._closedPromise_reject !== undefined);
  assert(writer._closedPromiseState === 'pending');

  writer._closedPromise_reject(reason);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'rejected';
}

function defaultWriterClosedPromiseResetToRejected(writer, reason) {
  assert(writer._closedPromise_resolve === undefined);
  assert(writer._closedPromise_reject === undefined);
  assert(writer._closedPromiseState !== 'pending');

  writer._closedPromise = Promise.reject(reason);
  writer._closedPromiseState = 'rejected';
}

function defaultWriterClosedPromiseResolve(writer) {
  assert(writer._closedPromise_resolve !== undefined);
  assert(writer._closedPromise_reject !== undefined);
  assert(writer._closedPromiseState === 'pending');

  writer._closedPromise_resolve(undefined);
  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'resolved';
}

function defaultWriterReadyPromiseInitialize(writer) {
  verbose('defaultWriterReadyPromiseInitialize()');
  writer._readyPromise = new Promise(function (resolve, reject) {
    writer._readyPromise_resolve = resolve;
    writer._readyPromise_reject = reject;
  });
  writer._readyPromiseState = 'pending';
}

function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
  verbose('defaultWriterReadyPromiseInitializeAsRejected(writer, %o)', reason);
  writer._readyPromise = Promise.reject(reason);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'rejected';
}

function defaultWriterReadyPromiseInitializeAsResolved(writer) {
  verbose('defaultWriterReadyPromiseInitializeAsResolved()');
  writer._readyPromise = Promise.resolve(undefined);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'fulfilled';
}

function defaultWriterReadyPromiseReject(writer, reason) {
  verbose('defaultWriterReadyPromiseReject(writer, %o)', reason);
  assert(writer._readyPromise_resolve !== undefined);
  assert(writer._readyPromise_reject !== undefined);

  writer._readyPromise_reject(reason);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'rejected';
}

function defaultWriterReadyPromiseReset(writer) {
  verbose('defaultWriterReadyPromiseReset()');
  assert(writer._readyPromise_resolve === undefined);
  assert(writer._readyPromise_reject === undefined);

  writer._readyPromise = new Promise(function (resolve, reject) {
    writer._readyPromise_resolve = resolve;
    writer._readyPromise_reject = reject;
  });
  writer._readyPromiseState = 'pending';
}

function defaultWriterReadyPromiseResetToRejected(writer, reason) {
  verbose('defaultWriterReadyPromiseResetToRejected(writer, %o)', reason);
  assert(writer._readyPromise_resolve === undefined);
  assert(writer._readyPromise_reject === undefined);

  writer._readyPromise = Promise.reject(reason);
  writer._readyPromiseState = 'rejected';
}

function defaultWriterReadyPromiseResolve(writer) {
  verbose('defaultWriterReadyPromiseResolve()');
  assert(writer._readyPromise_resolve !== undefined);
  assert(writer._readyPromise_reject !== undefined);

  writer._readyPromise_resolve(undefined);
  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'fulfilled';
}

},{"./helpers.js":12,"./queue-with-sizes.js":13,"./utils.js":16,"better-assert":3,"debug":18}],18:[function(_dereq_,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,_dereq_('_process'))

},{"./debug":19,"_process":6}],19:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":20}],20:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=polyfill.js.map
