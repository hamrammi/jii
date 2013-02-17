/**
 * jii.js library
 *
 * Helper library that makes work with javascript even better
 *
 * @version: 0.3.4 (last update: 17.02.2013)
 * @author: hamrammi@gmail.com
 */
(function() {
  'use strict';

  var VERSION = '0.3.4';
  var root = this;

  var
    arrayProto    = Array.prototype,
    unshift       = Array.prototype.unshift,
    toString      = Object.prototype.toString;

  // Local copy of `jii` for using below.
  var jii = function(obj) { return new W(obj); };

  jii.fn = jii.prototype;

  jii.VERSION = VERSION;

  // -------------------- HELPERS --------------------

  var
    objArray    = '[object Array]',
    objString   = '[object String]',
    objNumber   = '[object Number]',
    objObject   = '[object Object]',
    objFunction = '[object Function]',
    objBoolean  = '[object Boolean]';

  var isArray = jii.isArray = function(obj) {
    return typeof obj === 'object' && obj !== null && Array.isArray(obj);
  };
  var isNumber = jii.isNumber = function(obj) {
    return toString.call(obj) === objNumber;
  };
  var isString = jii.isString = function(obj) {
    return toString.call(obj) === objString;
  };
  var isObject = jii.isObject = function(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  };
  var isFunction = jii.isFunction = function(obj) {
    return toString.call(obj) === objFunction;
  };
  var isBoolean = jii.isBoolean = function(obj) {
    return toString.call(obj) === objBoolean;
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

  // Make sure an `obj` has `length` property
  // e.g.: string, array
  var isStringOrArray = function(func, obj) {
    var type = toString.call(obj);
    switch (type) {
      case objString: break;
      case objArray: break;
      default: validateType(func, obj, 'string or array');
    }
    return obj;
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

  // Find positions of the character in the string
  jii.positions = function(string, chr) {
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

  // Reverse string
  jii.reverse = function(string) {
    string = validateType('reverse', string, 'string');
    var reversed = '';
    for (var i = 0, l = string.length - 1; i <= l; i++) {
      reversed += string.charAt(l-i);
    }
    return reversed;
  };

  // Trim strings
  jii.trim = function(string, position) {
    string = validateType('trim', string, 'string');
    position = position ? validateType('trim', position, 'string') : 'both';
    switch (position) {
      case 'both':
        return string.replace(/^\s+|\s+$/g, ''); break;
      case 'left':
        return string.replace(/^\s+/, ''); break;
      case 'right':
        return string.replace(/\s+$/, ''); break;
      case 'full':
        return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); break;
      default: throw new Error('"jii.trim": unexpected param "' + position + '"');
    }
  };

  // -------------------- ARRAYS --------------------

  // Maps each value of `obj` with `iterator` function
  jii.map = function(obj, iterator, context) {
    context = context || root;
    var result = [];
    if (obj == null) return result;
    // Delegate to `ECMAScript 5` native `map` if available
    if (arrayProto.map) {
      return obj.map(iterator, context);
    }
    for (var i = 0, l = obj.length; i < l; i++) {
      result[i] = iterator.call(context, obj[i]);
    }
    return result;
  };

  // Check whether an object has chain of properties
  jii.hasChain = function(obj, chain, cb) {
    if (!isObject(obj)) typeError('object', typeof obj);
    chain = validateType('hasChain', chain, 'string');
    cb = cb || null;
    // Keys to be evaluated
    var keys = chain.split('.');
    // Result object or other typed data
    var result = obj;
    for (var i = 0, l = keys.length; i < l; i++) {
      result = result[keys[i]];
      if (typeof result === 'undefined') {
        if (cb && typeof cb === 'function') {
          return cb(true, null);
        } else {
          return false;
        }
      }
    }
    if (cb && typeof cb === 'function') {
      return cb(false, result);
    } else {
      return result;
    }
  };

  // ------------------ OBJECTS -------------------

  // Check whether `objA` includes `objB`
  jii.contains = function(objA, objB) {
    for (var key in objB) {
      if (objB.hasOwnProperty(key)) {
        if (!objA.hasOwnProperty(key)) return false;
        else if (objA[key] !== objB[key]) {
          if ((isObject(objA[key]) && isObject(objB[key]))
            || (isArray(objA[key]) && isArray(objB[key]))) {
            return jii.isEqual(objA[key], objB[key]);
          }
          return false;
        }
      }
    }
    return true;
  };

  // Returns the length (size) of an object
  jii.size = function(obj) {
    var length = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) length++;
    }
    return length;
  };

  // -------------------- MISC --------------------

  // Split obj into characters and count occurrence of each one
  jii.occurrences = function(obj, chr) {
    chr = chr || null;
    obj = isStringOrArray('occurrences', obj);
    var dict = {};
    for (var i = 0, l = obj.length; i < l; i++) {
      dict[obj[i]] = dict[obj[i]] ? dict[obj[i]] + 1 : 1;
    }
    if (chr) return dict[chr];
    return dict;
  };

  // Check whether an `obj` has `chr`
  jii.has = function(obj, chr) {
    switch (toString.call(obj)) {
      case objString:
        if (isString(chr)) return obj.indexOf(chr) !== -1;
        else return false; break;
      case objObject:
        if (isObject(chr)) return jii.contains(obj, chr);
        else return false; break;
      case objArray:
        if (isString(chr) || isNumber(chr) || isBoolean(chr))
          return obj.indexOf(chr) !== -1;
        var i, l = obj.length;
        if (isObject(chr))
          for (i = 0; i < l; i++) {
            if (isObject(obj[i])) return jii.isEqual(obj[i], chr);
          }
        if (isArray(chr))
          for (i = 0; i < l; i++) {
            if (isArray(obj[i])) return jii.isEqual(obj[i], chr);
          }
        return false; break;
      default: return validateType('has', obj, 'string or array or object');
    }
  };

  // `jii.has` with swapped arguments
  jii.in = function(chr, obj) { return jii.has(obj, chr); };

  // Compares two objects
  jii.isEqual = function(a, b) {
    if (toString.call(a) !== toString.call(b)) return false;
    if (isObject(a)) {
      return jii.size(a) === jii.size(b) ? jii.has(a, b) : false;
    } else if (isArray(a)) {
      if (a.length !== b.length) return false;
      for (var i = 0, l = a.length; i < l; i++) {
        if (!jii.isEqual(a[i], b[i])) return false;
      }
      return true;
    } else if (isFunction(a)) {
      return a.toString() === b.toString();
    }
    return a === b;
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
})();