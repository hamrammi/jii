<h1>jii - JavaScript's helpers library</h1>
<h2><span class="blue">Base Methods</span></h2>
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
jii.hasChain(animal, <span class="red">'fox.likes.hare.autumn'</span>, function(err, res) {
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
then two strings will be compared.
`jii.startsWith('Oblivion'); // O` => returns first char
`jii.startsWith('Oblivion', 4); // Obli` => returns a given number of letters
`jii.startsWith('Oblivion', '4'); // false` - returns <code>false</code> since second argument is string, not number
<code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'Obli'</span>); //
            true</code> - returns <code>true</code>
<code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'foo'</span>); //
            false</code> - returns <code>false</code>
<code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'obli'</span>); //
            false</code> - returns <code>false</code> because case sensitive on default
<code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'obli'</span>, true); //
            true</code> - returns <code>true</code> because we passed an optional "caseInsensitive" param

<h4>jii.endsWith(string, length|lastChars, caseInsensitive)</h4>
<p>Checks whether a strings ends with given chars</p>
`Heads up!` Second params can be `number` or
<code>string</code>. If <code>number</code> then returns last N characters. If <code>string</code>
          then compares two strings.
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>); // n</code> - returns last char
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="blue">4</span>); //
            vion</code> - returns a given number of end letters
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'4'</span>); //
            false</code> - returns <code>false</code> since second argument is string, not number
 <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'vion'</span>); //
            true</code> - returns <code>true</code>
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'foo'</span>); //
            false</code> - returns <code>false</code>
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'Vion'</span>); //
            false</code> - returns <code>false</code> because case sensitive on default
<code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'Vion'</span>, true); //
            true</code> - returns <code>true</code> because we passed an optional "caseInsensitive" param

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

<h4>jii.prototype()</h4>
Prototype native JavaScript's objects with <b>jii</b> library. After calling this method you can:
```javascript
'Slither'.startsWith('Slith'); // true
'wartooth'.capitalize(); // Wartooth
```
<h2><span class="blue">Classes</span></h2>
<h4>Class.create([optional] superClass, methods)</h4>
Creates a new class
```javascript
var Animal = Class.create({
  'init': function(animal) {
    this.animal = animal;
  },
  'breath': function() {
    return this.animal + <span class="red">'is breathing'</span>;
  }
});
```