/**
 * jii.highlighter.js library
 *
 * Helper library that highlights code
 *
 * @version: 0.1.0 (last update: 03.02.2013)
 * @author: hamrammi@gmail.com
 */
(function() {
  var root = this;

  /**
   * Root function to be exposed as global
   *
   * @param el Elements to be highlighted
   * @param params {Object} Contains user predefined params
   */
  var highlighter = function(el, params) {
    params = params || {};

    var expressions = {
      comments: [
        /(\/\/\s*.*|\/\*+.*\*\/|\/\*\*|\*\/|^\s*\*.*|\s*#.*)/gm,
        '[[comment]]$1[[span]]'
      ],
      keywords: [
        /(var|function|alert|return|class|this|def)/gm,
        '[[keyword]]$1[[span]]'
      ],
      reserved: [
        /(self|__init__)/gm,
        '[[reserved]]$1[[span]]'
      ],
      strings: [
        /('.*?(\\')+.*?'|".*?(\\").*?"|'[^']*?'|"[^"]*?")/gm,
//        /('[.(\\')]*?'|".*?(\\").*?"|'[^']*?'|"[^"]*?")/gm, // TODO: make first match universal 'flkd\'dkfdl\'df fd'
        '[[string]]$1[[span]]'
      ],
      numbers: [
        /(\d)+/gm,
        '[[number]]$1[[span]]'
      ]
    };

    // Split code into lines and apply regular expressions to each one
    var highlight = function(html) {
      var lines = html.split('\n');
      var result = [];
      for (var line = 0, l = lines.length; line < l; line++) {
        var newline = lines[line];
        for (var exp in expressions) {
          if (expressions.hasOwnProperty(exp)) {
            newline = newline.replace(expressions[exp][0], expressions[exp][1]);
          }
        }
        result.push(newline);
      }
      return result.join('\n');
    };

    // Finally, colorize the code
    var colorize = function(el, source) {
      source = source.replace(/\[\[span]]/g, '</span>');
      source = source.replace(/\[\[keyword]]/g, '<span class="jii-keyword">');
      source = source.replace(/\[\[string]]/g, '<span class="jii-string">');
      source = source.replace(/\[\[number]]/g, '<span class="jii-number">');
      source = source.replace(/\[\[comment]]/g, '<span class="jii-comment">');
      source = source.replace(/\[\[reserved]]/g, '<span class="jii-reserved">');
//      console.log(source);

      el.innerHTML = source;
      el.style.border = '1px solid #ccc';
      el.style.borderRadius = '4px';
      el.style.fontFamily = "Consolas, Monaco, Menlo, 'Courier New', monospace";
      el.style.fontSize = '14px';
      el.style.padding = '10px';

      // Beautify code with user defined CSS styles
      for (var cssProperty in params) {
        if (params.hasOwnProperty(cssProperty)) {
          el.style[cssProperty] = params[cssProperty];
        }
      }
    };

    // Add CSS styles to document
    (function() {
      var style = document.createElement('style');
      style.innerHTML = '' +
        '.jii-keyword { color: #9b5787; font-weight: bold; } ' +
        '.jii-comment, .jii-comment>span { color: grey; font-weight: 400; } ' +
        '.jii-number { color: royalblue; } ' +
        '.jii-string, .jii-string>span { color: #cc7733; } ' +
        '.jii-reserved { color: #9b5787; }';
      document.getElementsByTagName('head')[0].appendChild(style);
    })();

    // For each element replace original code with highlighted code
    for (var i = 0, l = el.length; i < l; i++) {
//      console.log(highlight(el[i].innerHTML));
      colorize(el[i], highlight(el[i].innerHTML));
    }
  };

  if (typeof root.jii === 'function') {
    jii.extend({
      highlighter: highlighter
    });
  } else {
    root.jii = function() {};

    // Extend `jii` with user methods
    jii.extend = function(obj) {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          jii[i] = obj[i];
        }
      }
    };

    jii.extend({
      highlighter: highlighter
    });
  }
})();