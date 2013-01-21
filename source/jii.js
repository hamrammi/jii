/**
 * jii.js library
 *
 * Helper library that makes work with javascript even better
 *
 * @version: 0.2.4 (last update: 20.01.2013)
 * @author: hamrammi@gmail.com
 */
(function() {
  var VERSION = '0.2.4';
  var root = this;

  var
    unshift       = Array.prototype.unshift,
    slice         = Array.prototype.slice,
    toString      = Object.prototype.toString;

  // Local copy of `jii` for using below.
  var jii = function(obj, func) {
    func = func || null;
    if (func) {
      console.log(func.apply(new W(obj)));
//      result(func.apply(new W(obj)), true);
//      return false;
    }
    return new W(obj);
  };

  jii.fn = jii.prototype;

  jii.VERSION = VERSION;

  // -------------------- HELPERS --------------------

  var isArray = jii.isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
  };
  var isNumber = jii.isNumber = function(obj) {
    return toString.call(obj) === '[object Number]';
  };
  var isString = jii.isString = function(obj) {
    return toString.call(obj) === '[object String]';
  };
  var isObject = jii.isObject = function(obj) {
    return toString.call(obj) === '[object Object]';
  };
  var isFunction = jii.isFunction = function(obj) {
    return toString.call(obj) === '[object Function]';
  };
  var isBoolean = jii.isBoolean = function(obj) {
    return toString.call(obj) === '[object Boolean]';
  };

  var typeError = function(expected, got) {
    throw new TypeError('Expected "' + expected + '", but got "' + got + '".');
  };

  var validateType = function(func, arg, expected) {
    var got = typeof arg;
    if (got !== expected) {
      var error = '"jii.' + func + '": expected "' + expected + '", got "' + got + '"';
      throw new TypeError(error);
    }
    return arg;
  };

  // -------------------- STRINGS --------------------

  // Capitalize string
  jii.capitalize = function(string, num) {
    string = validateType('capitalize', string, 'string');
    num = num || null;
    var transformed = [];
    if (!num) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      num = validateType('capitalize', num, 'number');
      for (var i = 0; i < num; i++) {
        transformed[i] = string.charAt(i).toUpperCase();
      }
      return transformed.join('') + string.slice(num);
    }
  };


  // Checks whether last character of string equals to lastChar
  jii.endsWith = function(string, length_or_lastChars, caseInsensitive) {
    string = validateType('endsWith', string, 'string');
    length_or_lastChars = length_or_lastChars || null;
    caseInsensitive = caseInsensitive || false;
    var length = string.length;

    if (!length_or_lastChars && !caseInsensitive) {
      return string.charAt(length - 1);
    } else if (length_or_lastChars && !caseInsensitive) {
      if (typeof length_or_lastChars === 'string') {
        length = length_or_lastChars.length;
        return string.slice(string.length - length) === length_or_lastChars;
      } else if (typeof length_or_lastChars === 'number') {
        return string.slice(string.length - length_or_lastChars);
      } else {
        typeError('string or number', typeof length_or_lastChars);
      }
    } else if (length_or_lastChars && caseInsensitive) {
      if (typeof length_or_lastChars === 'number') {
        typeError('string', 'number');
      } else if (typeof length_or_lastChars === 'string') {
        length = length_or_lastChars.length;
        return string.slice(string.length - length).toLowerCase() === length_or_lastChars.toLowerCase();
      } else {
        typeError('string', typeof length_or_lastChars);
      }
    }
  };

  // Check whether first letter of string equals to firstChar
  jii.startsWith = function(string, length_or_firstChars, caseInsensitive) {
    string = validateType('startsWith', string, 'string');
    length_or_firstChars = length_or_firstChars || null;
    caseInsensitive = caseInsensitive || false;
    var length = 0;

    if (!length_or_firstChars && !caseInsensitive) {
      return string.charAt(0);
    } else if (length_or_firstChars && !caseInsensitive) {
      if (typeof length_or_firstChars === 'string') {
        length = length_or_firstChars.length;
        return string.slice(0, length) === length_or_firstChars;
      } else if (typeof length_or_firstChars === 'number') {
        return string.slice(0, length_or_firstChars);
      } else {
        typeError('string or number', typeof length_or_firstChars);
      }
    } else if (length_or_firstChars && caseInsensitive) {
      if (typeof length_or_firstChars === 'number') {
        typeError('string', 'number');
      } else if (typeof length_or_firstChars === 'string') {
        length = length_or_firstChars.length;
        return string.slice(0, length).toLowerCase() === length_or_firstChars.toLowerCase();
      } else {
        typeError('string', typeof length_or_firstChars);
      }
    }
  };

  // Find position of character in string
  jii.position = function(string, chr) {
    string = validateType('position', string, 'string');
    chr = validateType('position', chr, 'string');
    var positions = [];
    for (var i = 0, l = string.length; i < l; i++) {
      if (string[i] === chr) {
        positions.push(i);
      }
    }
    return positions;
  };


  // -------------------- ARRAYS --------------------

  // Maps each value of `obj` with `iterator` function
  jii.map = function(obj, iterator, context) {
    context = context || root;
    var result = [];
    if (obj == null) return result;
    // Delegate to `ECMAScript 5` native `map` if available
    if (Array.prototype.map) {
      return obj.map(iterator, context);
    }
    for (var i = 0, l = obj.length; i < l; i++) {
      result[i] = iterator.call(context, obj[i]);
    }
    return result;
  };

  // Check whether an object has chain of properties
  jii.hasChain = function(obj, chain, cb) {
    // Check whether an 'obj' argument is type of 'object'
    if (!isObject(obj)) typeError('object', typeof obj);
    chain = validateType('hasChain', chain, 'string');
    cb = cb || null;
    // Keys to be evaluated
    var keys = chain.split('.');
    // Result object or other typed data
    var res = obj;
    for (var i = 0, l = keys.length; i < l; i++) {
      res = res[keys[i]];
      if (typeof res === 'undefined') {
        if (cb && typeof cb === 'function') {
          return cb(true, null);
        } else {
          return false;
        }
      }
    }
    if (cb && typeof cb === 'function') {
      return cb(false, res);
    } else {
      return res;
    }
  };

  // -------------------- MISC --------------------

  // Split obj into characters and count occurrence of each one
  jii.occurrences = function(obj, chr) {
    chr = chr || null;
    var type = toString.call(obj);
    switch (type) {
      case '[object String]': break;
      case '[object Number]':
        obj = '' + obj; break;
      case '[object Array]': break;
      default: typeError('string or number or array', typeof obj);
    }
    var dict = {};
    for (var i = 0, l = obj.length; i < l; i++) {
      dict[obj[i]] = dict[obj[i]] ? dict[obj[i]] + 1 : 1;
    }
    if (chr) return dict[chr];
    return dict;
  };

  // -------------------- SYSTEM --------------------

  jii.chain = function() {
    W._chain = true;
    return this;
  };

  // Extend `jii` with user methods
  jii.extend = function(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        jii[i] = obj[i];
        extendWrapperPrototype(i, obj[i]);
      }
    }
  };

  // A `wrapper` function
  var W = function(obj) { this._w = obj; };

  jii.prototype = W.prototype;

  // Helper function to continue chaining
  var result = function(obj, chain) {
    return chain ? jii(obj).chain() : obj;
  };

  // Helper function to extend `wrapper` prototype
  var extendWrapperPrototype = function(name, func) {
    W.prototype[name] = function() {
      // Add `this._w` as a first element to `arguments` array
      unshift.call(arguments, this._w);
      return result(func.apply(jii, arguments), this._chain);
    };
  };

  // Extend `wrapper` prototype with `jii` methods
  (function() {
    for (var i in jii) {
      if (jii.hasOwnProperty(i)) {
        extendWrapperPrototype(i, jii[i]);
      }
    }
  })();

  W.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  W.prototype.value = function() { return this._w; };

  // Expose `jii` as global variable
  root.jii = jii;
}).call(this);