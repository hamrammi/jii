#jii.js - JavaScript's library that adds some awesome sugar with Ruby and Python flavour
________________________________________________________________________________________

*Documentation is coming soon. (Site is under work now)*

##jii.js
Growing library that adds some helpful methods for your pleasure.

###Milestone:
- Add much more methods to make functional programming better
- Find and fix bugs
- Make stable release as soon as possible

####Some examples:
```javascript
var a = { a: 'foo', b: { c: 'bar', d: 'baz' }, e: { f: { g: { h: true } } } };
jii(a).has({ e: { f: { g: { h: true } } } }); // true
var b = { a: 'foo', b: { c: [function() { return 'bar' }] } };
jii.isEqual(b, { a: 'foo', b: { c: [function() { return 'bar' }] } }); // true
var c = [{ i: {} }, { a: 'foo', b: { c: [function() { return 'bar' }] } }, ['foo', 'bar', 'baz']];
jii.has(c, { a: 'foo', b: { c: [function() { return 'bar' }] } }); // true
jii.has(c, { a: 'foo', b: { c: [function() { return 'bara' }] } }); // false
jii('Gandalf').begin().endsWith(3).capitalize().end(); // Alf
jii.flatten([-1, [2, [[3, 2, 1, [['a', [[function() {}, ['c', 4, [[false, [['c', ['r', 'd']]], 'b', ]]], 3]]], 2], 34], 'e'], 3], true])
```

##jii.class.js
Emulates "class system". Makes work with OOP in JavaScript much better.

###Milestone:
- Private members and variables (is it possible?)
- Correct constructor property

####Examples:
```javascript
var Parent = Class.create({
  init: function(name) {
    this.name = name;
  },
  sayHello: function() {
    return this.name + ' says hello';
  }
});
var Child = Class.create(Parent, {
  sayGoodbye: function() {
    return this.name + ' says goodbye';
  }
});
var homer = new Parent('Homer Simpson');
var bart = new Child('Bart Simpson');
homer.sayHello(); // Homer Simpson says hello
bart.sayGoodBye(); // Bart Simpson says goodbye
homer.sayHello(); // throws an error
```

##jii.highlighter.js
Simple tool to highlight code snippets

###Milestone:
- Extend syntax
- Correct comment tags (make work this: "'flkd\'dkfdl\'df fd'")
- Search for bugs and fix them
- Add some themes

To use it just `jii.highlighter(document.getElementsByTagName('pre'), {});`
You can also pass any CSS param as second argument.

####Example:
```javascript
jii.highlighter(document.getElementsByTagName('pre'), {
  'font-size': '13px',
  'background-color': '#ccc'
});
```
sets default font to 13px and background color to grey.