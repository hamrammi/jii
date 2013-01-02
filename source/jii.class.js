/**
 * jii.class.js library
 *
 * Helper library that makes work with classes even better
 *
 * @version: 0.1.0 (last update: 27.12.2012)
 * @author: hamrammi@gmail.com
 */
(function() {
  this.Class = (function() {
    var create = function() {
      var obj = {};
      var superClass = null;

      // create regular class (can be superclass)
      if (typeof arguments[0] !== 'function' && typeof arguments[0] === 'object') {
        obj = arguments[0];
      }

      // create subclass
      if (typeof arguments[0] === 'function' && typeof arguments[1] === 'object') {
        superClass = arguments[0];
        obj = arguments[1];
      }

      var F = function() {

        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            F.prototype[i] = obj[i];
          }
        }

        // When class is called with "new" keyword "this" points to class instance
        F.prototype.init.apply(this, arguments);
      };

      if (superClass) {
        // create anonymous function
        var T = function() {};
        // grab superClass prototype
        T.prototype = superClass.prototype;
        // and assign it to class
        F.prototype = new T();

        F.prototype.superclass = superClass;

        // At the moment superClass can see only one level inheritance
        // so superClass's subclasses array will contain only those
        // classes which was extended primary by superClass
        // E.g.: var C1 = Class.create({ ... }); // superclass
        // var C2 = Class.create(C1, { ... }); var C3 = Class.create(C1, { ... });
        // var C4 = Class.create(C2, { ... }); var C5 = Class.create(C3, { ... });
        // so C1.subclasses array will contain only C2 and C3 subclasses
        superClass.subclasses.push(F);
      }

      // TODO: implement if needed
      F.addThis = function(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
          }
        }
      };

      // Prototype class with @param obj methods
      // so every instance of this class can use them
      F.extend = function(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            F.prototype[i] = obj[i];
          }
        }
      };

      // Subclasses array
      F.subclasses = [];

      // Prevent inheriting superclass "init" function
      F.prototype.init = function() {};
      F.prototype.superclass = F;
      F.prototype.constructor = F;

      return F;
    };

    return {
      create: create
    }
  })();
})();