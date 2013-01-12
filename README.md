<h1>jii - JavaScript's helpers library</h1>
<h2>Base Methods</h2>
<h4>jii.hasChain(object, chain, callback)</h4>
<p>Check whether given object has a chain of keys.</p>
```javascript
// Let's say we have the following object
var animal = {
  bear: {
    color: 'brown',
    fly: 'I cannot fly'
  },
  fox: {
    color: 'red',
    likes: {
      'fish': 'Yummy fish',
      'hare': {
        'winter': 'Hunting on hares',
        'summer': 'chickens are better'
      }
    }
  }
};
```
```javascript
jii.hasChain(animal, 'bear.fly'); // I cannot fly => returns value if an object has given chain of keys.
// In future you can use this value like `true` in `if` constructions:
if (jii.hasChain(animal, 'bear.fly') { ... };  else { ... }
```
```javascript
jii.hasChain(animal, 'bear.color.inWinter'); // false
jii.hasChain(animal, 'fox.likes.hare'); // Object { winter: "Hunting on hares", summer: "chickens are better" }
jii.hasChain(animal, 'fox.likes.hare.winter'); // Hunting on hares
jii.hasChain(animal, 'fox.likes.hare.summer', function(err, res) {
  if (err) {
    console.log('Something went wrong');
  } else {
    console.log('I think that ' + res + ' in summer');
  }
}); // I think that chickens are better in summer
jii.hasChain(animal, 'fox.likes.hare.autumn', function(err, res) {
  if (err) {
    console.log('Something went wrong');
  } else {
    console.log('I think that ' + res + ' in summer');
  }
}); // Something went wrong
```
<h4>jii.startsWith(string, length|firstChars, caseInsensitive)</h4>
<p>Checks whether a string begins with given chars</p>
`Heads up!` Second param can be `number` or `string`. If `number` then first N characters will be returned. If `string`
then two strings will be compared.<br/>
`jii.startsWith('Oblivion'); // O` => returns first char<br/>
`jii.startsWith('Oblivion', 4); // Obli` => returns a given number of letters<br/>
`jii.startsWith('Oblivion', '4'); // false` - returns `false` since second argument is a string, not a number<br/>
`jii.startsWith('Oblivion', 'Obli'); // true` - returns `true`<br/>
`jii.startsWith'Oblivion', 'foo'); // false` - returns `false`<br/>
`jii.startsWith('Oblivion', 'obli'); // false` - returns `false` because case sensitive by default<br/>
`jii.startsWith('Oblivion', 'obli', true); // true` - returns `true` because we passed an optional "caseInsensitive" param<br/>

<h4>jii.endsWith(string, length|lastChars, caseInsensitive)</h4>
<p>Checks whether a strings ends with given chars</p>
`Heads up!` Second params can be `number` or `string`. If `number` then returns last N characters. If `string`
then compares two strings.<br/>
`jii.endsWith('Oblivion'); // n` - returns last char<br/>
`jii.endsWith('Oblivion', 4); // vion` - returns a given number of end letters<br/>
`jii.endsWith('Oblivion', '4'); // false` - returns `false` since second argument is string, not number<br/>
`jii.endsWith('Oblivion', 'vion'); // true` - returns `true`<br/>
`jii.endsWith('Oblivion', 'foo'); // false` - returns `false`<br/>
`jii.endsWith('Oblivion', 'Vion'); // false` - returns `false` because case sensitive on default<br/>
`jii.endsWith('Oblivion', 'Vion', true); // true` - returns `true` because we passed an optional "caseInsensitive" param<br/>

<h4>jii.map(array, iterator, context)</h4>
Maps each value of array with iterator function. If browser has native "map" method then calls it.
```javascript
jii.map([1, 2, 3], function(x) { return x * x; }); // [1, 4, 9]
```

<h4>jii.capitalize(string, number)</h4>
Capitalizes string. If param `number` is not given then only capitalizes first letter, otherwise capitalizes given number first letters.
```javascript
jii.capitalize('elementary'); // Elementary
jii.capitalize('elementary', 7); // ELEMENTary => throws error if second param is not a number
```
<h4>jii.prototype()</h4>
Prototype native JavaScript's objects with <b>jii</b> library. After calling this method you can:
```javascript
'Slither'.startsWith('Slith'); // true
'wartooth'.capitalize(); // Wartooth
```
<h2>Classes</h2>
<h4>Class.create([optional] superClass, methods)</h4>
Creates a new class
```javascript
var Animal = Class.create({
  'init': function(animal) {
    this.animal = animal;
  },
  'breath': function() {
    return this.animal + 'is breathing';
  }
});
```