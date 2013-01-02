/**
 * jii.js library
 *
 * Helper library that makes work with javascript even better
 *
 * @version: 0.1.0 (last update: 30.12.2012)
 * @author: hamrammi@gmail.com
 */
(function() {
  var VERSION = '0.1.0';
  var root = this;

  var
    unshift       = Array.prototype.unshift,
    slice         = Array.prototype.slice;

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

  var error = function(func, position, expected, got) {
    return 'Function "' + func + '", ' + position + ' argument: expected "'
      + expected + '", got "' + got + '". ';
  };

  // Capitalize string
  jii.capitalize = function(string) {
    var num = arguments[1] || null;
    var transformed = [];

    if (!num) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      if (typeof num !== 'number') {
        throw Error('Second argument must be a number');
      }
      for (var i = 0; i < num; i++) {
        transformed[i] = string.charAt(i).toUpperCase();
      }
      return transformed.join('') + string.slice(num);
    }
  };


  // Checks whether last character of string equals to lastChar
  jii.endsWith = function(string /*, length|lastChars, caseInsensitive*/) {
    var length_or_lastChars = arguments[1] || null;
    var caseInsensitive = arguments[2] || false;
    var length = string.length;

    if (typeof string !== 'string') {
      throw Error('First argument must be a string');
    }

    if (!length_or_lastChars && !caseInsensitive) {
      return string.charAt(length - 1);
    } else if (length_or_lastChars && !caseInsensitive) {
      if (typeof length_or_lastChars === 'string') {
        length = length_or_lastChars.length;
        return string.slice(string.length - length) === length_or_lastChars;
      } else if (typeof length_or_lastChars === 'number') {
        return string.slice(string.length - length_or_lastChars);
      } else {
        throw Error('Second argument must be a string or a number');
      }
    } else if (length_or_lastChars && caseInsensitive) {
      if (typeof length_or_lastChars === 'number') {
        throw Error('Second argument must be a string when using third argument');
      } else if (typeof length_or_lastChars === 'string') {
        length = length_or_lastChars.length;
        return string.slice(string.length - length).toLowerCase() === length_or_lastChars.toLowerCase();
      } else {
        throw Error('Second argument must be a string when using third argument');
      }
    }
  };

  // Check whether first letter of string equals to firstChar
  jii.startsWith = function(string /*, length|firstChars, caseInsensitive*/) {
    var length_or_firstChars = arguments[1] || null;
    var caseInsensitive = arguments[2] || false;
    var length = 0;

    if (typeof string !== 'string') {
      throw Error('First argument must be string');
    }

    if (!length_or_firstChars && !caseInsensitive) {
      return string.charAt(0);
    } else if (length_or_firstChars && !caseInsensitive) {
      if (typeof length_or_firstChars === 'string') {
        length = length_or_firstChars.length;
        return string.slice(0, length) === length_or_firstChars;
      } else if (typeof length_or_firstChars === 'number') {
        return string.slice(0, length_or_firstChars);
      } else {
        throw Error('Second arguments must be string or number');
      }
    } else if (length_or_firstChars && caseInsensitive) {
      if (typeof length_or_firstChars === 'number') {
        throw Error('Second argument must be string when using third argument');
      } else if (typeof length_or_firstChars === 'string') {
        length = length_or_firstChars.length;
        return string.slice(0, length).toLowerCase() === length_or_firstChars.toLowerCase();
      } else {
        throw Error('Second argument must be string when using third argument');
      }
    }
  };

  // Maps each value of `obj` with `iterator` function
  jii.map = function(obj, iterator, context) {
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

//  var sleep = jii.sleep = function(delay) {
//    var ts = new Date().getTime();
//    while (new Date().getTime() - ts < delay) {
//      sleep(delay);
//    }
//    return true;
//  };

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
  var W = function(obj) {
    this._w = obj;
  };

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

  W.prototype.value = function() { return this._w };

  // Expose `jii` as global variable
  root.jii = jii;
})();