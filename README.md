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

jii.hasChain(animal, 'bear.fly'); // I cannot fly - returns value if an object has given chain of keys.
// In future you can use this value like <b>true</b> in <b>if</b> constructions:
if (jii.hasChain(animal, 'bear.fly') { ... };  else { ... }
jii.hasChain(animal, 'bear.color.inWinter'); // false
```
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'fox.likes.hare'</span>); //
          Object { winter: "Hunting on hares", summer: "chickens are better" }</code>
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'fox.likes.hare.winter'</span>); //
            Hunting on hares</code>
        </p>
<pre>jii.hasChain(animal, <span class="red">'fox.likes.hare.summer'</span>, function(err, res) {
  if (err) {
    console.log('Something went wrong');
  } else {
    console.log('I think that ' + res + ' in summer');
  }
}); // I think that chickens are better in summer</pre>
        <pre>
jii.hasChain(animal, <span class="red">'fox.likes.hare.autumn'</span>, function(err, res) {
  if (err) {
    console.log('Something went wrong');
  } else {
    console.log('I think that ' + res + ' in summer');
  }
}); // Something went wrong</pre>
<h4>jii.startsWith(string, length|firstChars, caseInsensitive)</h4>
<p>Checks whether a string begins with given chars</p>
        <p>
          <span class="label label-info">Heads up!</span> Second param can be <code>number</code> or
          <code>string</code>. If <code>number</code> then first N characters will be returned. If <code>string</code>
          then two strings will be compared.
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>); // O</code> - returns first char
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="blue">4</span>); //
            Obli</code> - returns a given number of letters
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'4'</span>); //
          false</code> - returns <code>false</code> since second argument is string, not number
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'Obli'</span>); //
            true</code> - returns <code>true</code>
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'foo'</span>); //
            false</code> - returns <code>false</code>
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'obli'</span>); //
            false</code> - returns <code>false</code> because case sensitive on default
        </p>
        <p>
          <code class="dark">jii.startsWith(<span class="red">'Oblivion'</span>, <span class="red">'obli'</span>, true); //
            true</code> - returns <code>true</code> because we passed an optional "caseInsensitive" param
        </p>
        <hr>

        <a name="endsWith"></a>
        <h4>jii.endsWith(string, length|lastChars, caseInsensitive)</h4>
        <p>
          Checks whether a strings ends with given chars
        </p>
        <p>
          <span class="label label-info">Heads up!</span> Second params can be <code>number</code> or
          <code>string</code>. If <code>number</code> then returns last N characters. If <code>string</code>
          then compares two strings.
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>); // n</code> - returns last char
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="blue">4</span>); //
            vion</code> - returns a given number of end letters
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'4'</span>); //
            false</code> - returns <code>false</code> since second argument is string, not number
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'vion'</span>); //
            true</code> - returns <code>true</code>
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'foo'</span>); //
            false</code> - returns <code>false</code>
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'Vion'</span>); //
            false</code> - returns <code>false</code> because case sensitive on default
        </p>
        <p>
          <code class="dark">jii.endsWith(<span class="red">'Oblivion'</span>, <span class="red">'Vion'</span>, true); //
            true</code> - returns <code>true</code> because we passed an optional "caseInsensitive" param
        </p>
        <hr>

        <a name="map"></a>
        <h4>jii.map(array, iterator, context)</h4>
        <p>
          Maps each value of array with iterator function. If browser has native "map" method then calls it.
        </p>
        <p>
          <code class="dark">jii.map([<span class="blue">1</span>, <span class="blue">2</span>, <span class="blue">3</span>], function(x) { return x * x; }); // [1, 4, 9]</code>
        </p>
        <hr>
>
        <a name="capitalize"></a>
        <h4>jii.capitalize(string, number)</h4>
        <p>
          Capitalizes string. If param <code>number</code> is not given then only capitalizes first letter, otherwise
          capitalizes given number first letters.
        </p>
        <p>
          <code class="dark">jii.capitalize(<span class="red">'elementary'</span>); // Elementary</code>
        </p>
        <p>
          <code data-code="jii(<span class='red'>'elementary'</span>).capitalize(<span class='blue'>7</span>); // ELEMENTary" class="dark">jii.capitalize(<span class="red">'elementary'</span>, <span class="blue">7</span>); //
            ELEMENTary</code> - throws error if second param is not a number
        </p>
        <hr>

        <a name="prototype"></a>
        <h4>jii.prototype()</h4>
        <p>
          Prototype native JavaScript's objects with <b>jii</b> library. After calling this method you can:
        </p>
        <p>
          <code class="dark"><span class="red">'Slither'</span>.startsWith(<span class="red">'Slith'</span>); // true</code>
        </p>
        <p>
          <code class="dark"><span class="red">'wartooth'</span>.capitalize(); // Wartooth</code>
        </p>
        <hr>

        <a name="classes"></a>
        <h2><span class="blue">Classes</span></h2>
        <a name="class.create"></a>
        <h4>Class.create([optional] superClass, methods)</h4>
        <p>
          Creates a new class
        </p>
        <p>
          <pre>
var Animal = Class.create({
  'init': function(animal) {
    this.animal = animal;
  },
  'breath': function() {
    return this.animal + <span class="red">'is breathing'</span>;
  }
});</pre>
        </p>