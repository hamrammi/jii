/**
 * jii.js library
 *
 * Helper library that makes work with javascript even better
 *
 * @author: hamrammi@gmail.com
 */
(function() {
  'use strict';

  var VERSION = '0.3.11';
  var root = this;

  var arrayProto = Array.prototype,
      unshift = Array.prototype.unshift,
      toString = Object.prototype.toString;

  // Local copy of `jii` for using below.
  var jii = function(obj) { return new Wrapper(obj); };

  jii.fn = jii.prototype;

  jii.VERSION = VERSION;

  // -------------------- HELPERS --------------------

  var objArray = '[object Array]',
      objString = '[object String]',
      objNumber = '[object Number]',
      objObject = '[object Object]',
      objFunction = '[object Function]',
      objBoolean = '[object Boolean]',
      objNull = '[object Null]';

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
  var isNull = jii.isNull = function(obj) {
    return toString.call(obj) === objNull;
  };

  var typeError = function(expected, got) {
    throw new TypeError('Expected "' + expected + '", but got "' + got + '".');
  };

  var validateType = function(func, arg, expected) {
    var got = typeof arg;
    if (got !== expected) {
      var error = '"jii.' + func + '": expected "' + expected +
        '", got "' + got + '"';
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

  // Make sure an `obj` is enumerable
  var isEnumerable = function(func, obj) {
    switch (toString.call(obj)) {
      case objString: break;
      case objArray: break;
      case objObject: break;
      default: validateType(func, obj, 'enumerable');
    }
    return obj;
  };

  // -------------------- STRINGS --------------------

  // Capitalize string
  jii.capitalize = function(string, num) {
    string = validateType('capitalize', string, 'string');
    num = num || null;
    if (!num) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      var transformed = [];
      num = validateType('capitalize', num, 'number');
      for (var i = 0; i < num; i++) {
        transformed[i] = string.charAt(i).toUpperCase();
      }
      return transformed.join('') + string.slice(num);
    }
  };

  jii.swapCase = function(string) {
    string = validateType('swapCase', string, 'string');
    var swapCase = function(chr) {
      return (jii.isUpperCased(chr)) ? chr.toLowerCase() : chr.toUpperCase();
    };
    return jii.walk(string, swapCase);
  };

  jii.isUpperCased = function(string) {
    for (var i = 0, l = string.length; i < l; i++) {
      if (!string[i].match(/[A-ZА-Я]+/)) return false;
    }
    return true;
  };

  jii.isLowerCased = function(string) {
    for (var i = 0, l = string.length; i < l; i++) {
      if (!string[i].match(/[a-zа-я]+/)) return false;
    }
    return true;
  };

  // Convert string to unicode
  jii.toUnicode = function(string) {
    var uniChar;
    return jii.walk(string, function(chr) {
      uniChar = chr.charCodeAt(0).toString(16);
      while (uniChar.length < 4) {
        uniChar = '0' + uniChar;
      }
      return '\\u' + uniChar;
    });
  };

  // Convert string to hex
  jii.toCharCode = function(string) {
    return jii.walk(string, function(chr) {
      return '\\x' + chr.charCodeAt(0).toString(16);
    });
  };

  // Checks whether last character of string equals to lastChar
  jii.endsWith = function(string, value, caseInsensitive) {
    string = validateType('endsWith', string, 'string');
    value = value || null;
    caseInsensitive = caseInsensitive || false;
    var length = string.length;
    if (value && !caseInsensitive) {
      if (typeof value === 'string') {
        length = value.length;
        return string.slice(string.length - length) === value;
      } else if (typeof value === 'number') {
        return string.slice(string.length - value);
      } else {
        typeError('string or number', typeof value);
      }
    } else if (value && caseInsensitive) {
      if (typeof value === 'number') {
        typeError('string', 'number');
      } else if (typeof value === 'string') {
        length = value.length;
        var lowerCased = string.slice(string.length - length).toLowerCase();
        return lowerCased === value.toLowerCase();
      } else {
        typeError('string', typeof value);
      }
    }
    return string.charAt(length - 1);
  };

  // Check whether first letter of string equals to firstChar
  jii.startsWith = function(string, value, caseInsensitive) {
    string = validateType('startsWith', string, 'string');
    value = value || null;
    caseInsensitive = caseInsensitive || false;
    var length = 0;
    if (value && !caseInsensitive) {
      if (typeof value === 'string') {
        length = value.length;
        return string.slice(0, length) === value;
      } else if (typeof value === 'number') {
        return string.slice(0, value);
      } else {
        typeError('string or number', typeof value);
      }
    } else if (value && caseInsensitive) {
      if (typeof value === 'number') {
        typeError('string', 'number');
      } else if (typeof value === 'string') {
        length = value.length;
        return string.slice(0, length).toLowerCase() === value.toLowerCase();
      } else {
        typeError('string', typeof value);
      }
    }
    return string.charAt(0);
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
      reversed += string.charAt(l - i);
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
        return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '')
          .replace(/\s+/g, ' '); break;
      default:
        throw new Error('"jii.trim": unexpected param "' + position + '"');
    }
  };

  // Capitalize each word in a string
  jii.title = function(string) {
    string = validateType('title', string, 'string');
    var _title = function(word) { return jii.capitalize(word); };
    return string.replace(/[^\s]+/gm, _title);
  };

  // -------------------- ARRAYS --------------------

  var value = function(obj, what) {
    var i, l, value, words;
    var _result = function(obj, what) {
      var value, i, l = obj.length, currentLength = obj[0].length;
      if (l === 1) return obj[0];
      for (i = 0; i < l; i++) {
        if (what === 'max')
          if (currentLength <= obj[i].length) {
            value = obj[i]; currentLength = obj[i].length;
          }
        if (what === 'min')
          if (currentLength >= obj[i].length) {
            value = obj[i]; currentLength = obj[i].length;
          }
      }
      return value;
    };
    switch (toString.call(obj)) {
      case objArray:
        value = obj[0]; l = obj.length;
        var type = toString.call(value);
        if (type === objNumber) {
          for (i = 0; i < l; i++) {
            if (typeof obj[i] !== 'number') typeError('number', typeof obj[i]);
            if (what === 'max') value = value > obj[i] ? value : obj[i];
            if (what === 'min') value = value < obj[i] ? value : obj[i];
          }
        }
        if (type === objString || type === objArray) return _result(obj, what);
        break;
      case objString:
        words = jii.trim(obj, 'full').split(' '); l = words.length;
        return _result(words, what); break;
      default: typeError('string or array', typeof obj);
    }
    return value;
  };

  // Compares similar arrays [1, 2, 3, 4] == [3, 4, 2, 1]
  jii.similar = function(a, b) {
    for (var i = 0, l = a.length; i < l; i++) {
      if (!jii.has(b, a[i])) return false;
    }
    return true;
  };

  // Max value of an array
  jii.max = function(array) { return value(array, 'max'); };

  // Min value of an array
  jii.min = function(array) { return value(array, 'min'); };

  jii.zip = function(a, b) {
    if (!isArray(a) || !isArray(b)) typeError('array', [typeof a, typeof b]);
    if (a.length !== b.length)
      throw new Error('jii.zip: arrays are not the same length');
    var result = [];
    for (var i = 0, l = a.length; i < l; i++) result.push([a[i], b[i]]);
    return result;
  };

  // Maps each value of `obj` with `iterator` function
  jii.map = function(obj, iterator, context) {
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

  // Select elements that meet the condition
  jii.select = function(array, selector) {
    if (!isArray(array)) typeError('array', typeof array);
    var result = [];
    jii.map(array, function(x) {
      if (selector(x) === true) result.push(x);
    });
    return result;
  };

  // Reject elements that meet the condition
  jii.reject = function(array, rejector) {
    if (!isArray(array)) typeError('array', typeof array);
    var result = [];
    jii.map(array, function(x) {
      if (rejector(x) === false) result.push(x);
    });
    return result;
  };

  // ------------------ OBJECTS -------------------

  // Check whether `a` includes `b`
  jii.contains = function(a, b) {
    for (var prop in b) {
      if (b.hasOwnProperty(prop)) {
        if (!a.hasOwnProperty(prop)) return false;
        else if (a[prop] !== b[prop]) {
          if ((isObject(a[prop]) && isObject(b[prop])) ||
            (isArray(a[prop]) && isArray(b[prop]))) {
            return jii.isEqual(a[prop], b[prop]);
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

  // Count occurrences of all regexp characters
  jii.count = function(obj, regexp) {
    // TODO: this should work with String, Array, Object objects

  };

  // Retrieve each `slice` elements from an `obj`
  jii.eachSlice = function(obj, slice) {
    // TODO: this should work with String, Array, Object objects
  };

  // Similar to jii.eachSlice() method but with some changes:
  // jii.eachCons([1, 2, 3, 4, 5]) => [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
  jii.eachCons = function(obj, slice) {};

  // Basic function to walk through arrays.
  // Iterator function takes 3 arguments (element, index, array)
  jii.each = jii.forEach = function(obj, iterator, context) {
    var _each = function() {
      for (var i = 0, l = obj.length; i < l; i++)
        iterator.call(context, obj[i], i, obj);
    };
    switch (toString.call(obj)) {
      case objArray:
        if (arrayProto.forEach) obj.forEach(iterator, context);
        else _each(); break;
      case objString: _each(); break;
      case objObject:
        for (var key in obj)
          if (obj.hasOwnProperty(key))
            iterator.call(context, obj[key], key, obj);
        break;
      default: validateType('each(forEach)', obj, 'string or array or object');
    }
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
    if (typeof a === 'undefined' || isNull(a)) return false;
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

  jii.walk = function(obj, mutator, context) {
    var result;
    switch (toString.call(obj)) {
      case objString:
        result = '';
        for (var i = 0, l = obj.length; i < l; i++)
          result += mutator.call(context, obj[i]);
        break;
      case objArray:
        result = jii.map(obj, mutator, context); break;
      default: typeError('string or array', typeof obj);
    }
    return result;
  };

  // Freeze script for a period of time
  // TODO: todo this todo
  jii.sleep = function(delay) {
    var ts = new Date().getTime();
    var sleep = (function() {
      while (new Date().getTime() - ts < delay) {
        setTimeout(function() { return sleep }, 100);
      }
    })();
    return sleep;
  };

  // -------------------- SYSTEM --------------------

  jii.begin = function() {
    Wrapper._chain = true;
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
  var Wrapper = function(obj) { this._wrapped = obj; };

  jii.prototype = Wrapper.prototype;

  // Helper function to continue chaining
  var result = function(obj, chain) {
    return chain ? jii(obj).begin() : obj;
  };

  // Helper function to extend `wrapper` prototype
  var extendWrapperPrototype = function(name, func) {
    Wrapper.prototype[name] = function() {
      // Add `this._wrapped` as a first element to `arguments` array
      unshift.call(arguments, this._wrapped);
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

  Wrapper.prototype.begin = function() {
    this._chain = true;
    return this;
  };

  Wrapper.prototype.end = function() { return this._wrapped; };

  // Expose `jii` as global variable
  root.jii = jii;
}).call(this);
