#jii.js - JavaScript's library that adds some awesome sugar with Ruby and Python flavour
________________________________________________________________________________________

*Documentation is coming soon. (Site is under work now)*

##jii.js
Growing library that adds some helpful methods for you pleasure.

###Milestone:
- Add much more methods to make functional programming better
- Find and fix bugs
- Make stable release as soon as possible
>
Some examples:
```javascript
jii({ a: 'foo', b: { c: 'bar', d: 'baz' }, e: { f: { g: { h: true } } } }).has({ e: { f: { g: { h: true } } } }); // true
jii.isEqual({ a: 'foo', b: { c: [function() { return 'bar' }] } }, { a: 'foo', b: { c: [function() { return 'bar' }] } }); // true
jii.has([{ i: {} }, { a: 'foo', b: { c: [function() { return 'bar' }] } }, ['foo', 'bar', 'baz']], { a: 'foo', b: { c: [function() { return 'bar' }] } }); // true
jii('Gandalf').begin().endsWith(3).capitalize().end(); // Alf
```

##jii.class.js
Emulates "class system". Makes work with OOP in JavaScript much better.

###Milestone:
- Private members and variables (is it possible?)
- Correct constructor property
>
Examples:
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
>
To use it just `jii.highlighter(document.getElementsByTagName('pre'), {});`
You can also pass any CSS param as second arguments.
Example:
```javascript
jii.highlighter(document.getElementsByTagName('pre'), {
  'font-size': '13px',
  'background-color': '#ccc'
});
```
sets default font to 13px and background color to grey.