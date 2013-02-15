/**
 * jii.class.js library
 *
 * Helper library that makes work with classes even better
 *
 * @version: 0.2.7 (last update: 15.02.2013)
 * @author: hamrammi@gmail.com
 */
// TODO: private methods and variables
(function() {
  'use strict';
  var root = this;

  root.Class = (function() {
    var create = function(superClass, obj) {
      obj = obj || {};

      // Create regular class (can be superclass)
      if (typeof superClass === 'object') {
        obj = superClass;
        superClass = null;
      } else if (typeof superClass !== 'function') {
        throw new TypeError('Must be a function');
      }

      var Class = function() {
        // When class is called with `new` keyword `this` points to class instance
        Class.prototype.init.apply(this, arguments);
      };

      // Constructor function
      Class.prototype.init = function() {};

      // Self-reference
      Class.prototype.superclass = Class;

      if (superClass) {
        // Create an anonymous function
        var T = function() {};
        // Grab superClass prototype
        T.prototype = superClass.prototype;
        // and assign it to class
        Class.prototype = new T();

        // Reference to parent class
        Class.prototype.superclass = superClass;

        // At the moment superClass can see only one level inheritance
        // so superClass's subclasses array will contain only those
        // classes which was extended primary by superClass
        // E.g.: var C1 = Class.create({ ... }); // superclass
        // var C2 = Class.create(C1, { ... }); var C3 = Class.create(C1, { ... });
        // var C4 = Class.create(C2, { ... }); var C5 = Class.create(C3, { ... });
        // so C1.subclasses array will contain only C2 and C3 subclasses
        superClass.subclasses.push(Class);
      }

      // TODO: implement if needed
      Class.addThis = function(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
          }
        }
      };

      // Prototype class with `@param obj` methods
      // so every instance of this class can use them
      Class.extend = function(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            Class.prototype[i] = obj[i];
          }
        }
      };

      // Subclasses array
      Class.subclasses = [];

      Class.prototype.constructor = Class;

      // TODO: Should this be rewritten?
      Class.prototype.accessor = function(targetClass) {
        targetClass = targetClass || Class.prototype.superclass;
        return targetClass.prototype;
      };

      // Finally, extend class with given `@param obj`
      Class.extend(obj);

      return Class;
    };

    return {
      create: create
    };
  })();
}).call(this);