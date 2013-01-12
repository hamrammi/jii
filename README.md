jii
===

<html>
<head>
  <title>jii - JavaScript's Library Documentation</title>
  <link rel="stylesheet" href="assets/css/bootstrap.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-spy="scroll">
  <div class="container">
    <div class="page-header">
      <h1 style="text-align: center;">jii - JavaScript's helpers library <small>v.0.1.2</small></h1>
    </div>
    <div class="row">
      <div class="span3">
        <div class="well" style="padding: 8px 0;">
          <ul class="nav nav-list">
            <li class="nav-header">Base methods</li>
            <li><a href="#hasChain">hasChain</a></li>
            <li><a href="#startsWith">startsWith</a></li>
            <li><a href="#endsWith">endsWith</a></li>
            <li><a href="#map">map</a></li>
            <li><a href="#capitalize">capitalize</a></li>
            <li class="divider"></li>
            <li><a href="#prototype">prototype</a></li>
            <li class="divider"></li>
            <li class="nav-header">Classes</li>
            <li><a href="#class.create">Class.create</a></li>
          </ul>
        </div>
      </div>
      <div class="span9">
        <a name="baseMethods"></a>
        <h2><span class="blue">Base Methods</span></h2>
        <a name="hasChain"></a>
        <h4>jii.hasChain(object, chain, callback)</h4>
        <p>
          Check whether given object has a chain of keys.
        </p>
        <p>
          <pre>
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
};</pre>
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'bear.fly'</span>); // I cannot fly</code> -
          returns value if an object has given chain of keys.
          <p><span class="label label-info">Heads up!</span>
            In future you can use this value like <code>true</code> in <code>if</code> constructions:
            <code class="dark">if (jii.hasChain(animal, <span class="red">'bear.fly'</span>) { ... };
            else { ... }</code>
          </p>
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'bear.color.inWinter'</span>); // false</code>
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'fox.likes.hare'</span>); //
          Object { winter: "Hunting on hares", summer: "chickens are better" }</code>
        </p>
        <p>
          <code class="dark">jii.hasChain(animal, <span class="red">'fox.likes.hare.winter'</span>); //
            Hunting on hares</code>
        </p>
        <pre>
jii.hasChain(animal, <span class="red">'fox.likes.hare.summer'</span>, function(err, res) {
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
        <hr>

        <!-- startsWith -->
        <a name="startsWith"></a>
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

        <!-- endsWith -->
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

        <!-- map -->
        <a name="map"></a>
        <h4>jii.map(array, iterator, context)</h4>
        <p>
          Maps each value of array with iterator function. If browser has native "map" method then calls it.
        </p>
        <p>
          <code class="dark">jii.map([<span class="blue">1</span>, <span class="blue">2</span>, <span class="blue">3</span>], function(x) { return x * x; }); // [1, 4, 9]</code>
        </p>
        <hr>

        <!-- capitalize -->
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

        <!-- prototype -->
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

        <!-- jii.class -->
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
      </div>
    </div>
  </div>
  <footer style="background: #f4f4f8;">
    <hr>
    <div class="container-fluid" style="padding-bottom: 14px;">
      <div class="row-fluid">
        <div class="span12">
          <p style="text-align: center;">
            Made with TwitterBootstrap
          </p>
        </div>
      </div>
    </div>
  </footer>
<script type="text/javascript" src="assets/js/bootstrap.js"></script>
<script type="text/javascript">
  (function() {
    var alternateCode, el, arr;
    document.body.addEventListener('mouseover', function(e) {
      if (e.target.tagName === 'CODE' /*&& e.target.attributes['data-code']*/) {
//        el = e.target.innerHTML;
//        el = String.prototype.slice.call(el, 4);
//        arr = String.prototype.split.call(el, '(');
//        var
//          funcName = arr[0],
//          arr = arr[1];
//        arr = String.prototype.split.call(arr, ',');
//        console.log(arr)
//        alternateCode = e.target.attributes['data-code'].value;
//        e.target.attributes['data-code'].value = e.target.innerHTML;
//        e.target.innerHTML = alternateCode;
      } else if (e.target.tagName === 'SPAN' && e.target.parentNode.tagName === 'CODE'
          && e.target.parentNode.attributes['data-code']) {
//        alternateCode = e.target.parentNode.attributes['data-code'].value;
//        e.target.parentNode.attributes['data-code'].value = e.target.parentNode.innerHTML;
//        e.target.parentNode.innerHTML = alternateCode;
      }
    }, false);
  })();
</script>
</body>
</html>