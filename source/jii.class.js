/**
 * jii.class.js library
 *
 * Helper library that makes work with classes even better
 *
 * @version: 0.2.4 (last update: 12.01.2013)
 * @author: hamrammi@gmail.com
 */
// TODO: private methods and variables
// TODO: think about how to implement `instanceof` check when superClass is given
(function() {
  var root = this;

  root.Class = (function() {
    var create = function() {
      var obj = {};
      var superClass = null;

      // Create regular class (can be superclass)
      if (typeof arguments[0] !== 'function' && typeof arguments[0] === 'object') {
        obj = arguments[0];
      }

      // Create subclass
      if (typeof arguments[0] === 'function' && typeof arguments[1] === 'object') {
        superClass = arguments[0];
        obj = arguments[1];
      } else if (typeof arguments[0] === 'function' && !arguments[1]) { // var subClass = Class.create(Parent);
        superClass = arguments[0];
      }

      var Class = function() {
        // When class is called with `new` keyword `this` points to class instance
        Class.prototype.init.apply(this, arguments);
      };

      // Constructor function
      Class.prototype.init = function() {};

      // Reference to parent class
      Class.prototype.superclass = Class;

      if (superClass) {
        // Create an anonymous function
        var T = function() {};
        // Grab superClass prototype
        T.prototype = superClass.prototype;
        // and assign it to class
        Class.prototype = new T();

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
      // TODO: если класс входит в subclasses то запретить доступ к его свойствам и методам
      Class.prototype.super = function(superClass) {
        superClass = superClass || Class.prototype.superclass;
        return superClass.prototype;
      };

      // Finally, extend class with given `@param obj`
      Class.extend(obj);

      return Class;
    };

    return {
      create: create
    }
  })();
}).call(this);