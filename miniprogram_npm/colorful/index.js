module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235815, function(require, module, exports) {
exports = module.exports = require('./lib/ansi');

exports.paint = function(text) {
  return new exports.Color(text);
};

exports.colorful = function() {
  // don't overwrite
  if (String.prototype.to) return;
  Object.defineProperty(String.prototype, 'to', {
    get: function() {
      return new exports.Color(this.valueOf());
    }
  });
};

exports.toxic = function() {
  // poison the String prototype
  var colors = exports.color;
  Object.keys(colors).forEach(function(key) {
    var fn = colors[key];
    Object.defineProperty(String.prototype, key, {
      get: function() {
        return fn(this.valueOf());
      }
    });
  });
};

Object.defineProperty(exports, 'isSupported', {
  get: exports.isColorSupported
});

}, function(modId) {var map = {"./lib/ansi":1676544235816}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235816, function(require, module, exports) {

/* ANSI color support in terminal
 * @author: Hsiaoming Yang <lepture@me.com>
 *
 * http://en.wikipedia.org/wiki/ANSI_escape_code
 */


var util = require('util');
var tty = require('tty');

exports.disabled = false;
exports.isatty = false;

function isColorSupported() {
  if (exports.disabled) return false;

  // you can force to tty
  if (!exports.isatty && !tty.isatty()) return false;

  if ('COLORTERM' in process.env) return true;
  // windows will support color
  if (process.platform === 'win32') return true;

  var term = process.env.TERM;
  if (!term) return false;

  term = term.toLowerCase();
  if (term.indexOf('color') !== -1) return true;
  return term === 'xterm' || term === 'linux';
}


function is256ColorSupported() {
  if (!isColorSupported()) return false;

  var term = process.env.TERM;
  if (!term) return false;

  term = term.toLowerCase();
  return term.indexOf('256') !== -1;
}
exports.isColorSupported = isColorSupported;
exports.is256ColorSupported = is256ColorSupported;

var colors = [
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white'
];

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];

exports.color = {};

function Color(obj) {
  this.string = obj;

  this.styles = [];
  this.fgcolor = null;
  this.bgcolor = null;
}
util.inherits(Color, String);

for (var i = 0; i < colors.length; i++) {
  (function(i) {
    var name = colors[i];
    Object.defineProperty(Color.prototype, name, {
      get: function() {
        this.fgcolor = i;
        return this;
      }
    });
    Object.defineProperty(Color.prototype, name + '_bg', {
      get: function() {
        this.bgcolor = i;
        return this;
      }
    });
    exports.color[name] = exports[name] = function(text) {
      if (!isColorSupported()) return text;
      return '\x1b[' + (30 + i) + 'm' + text + '\x1b[0m';
    };
    exports.color[name + '_bg'] = exports[name + '_bg'] = function(text) {
      if (!isColorSupported()) return text;
      return '\x1b[' + (40 + i) + 'm' + text + '\x1b[0m';
    };
  })(i);
}
for (var i = 0; i < styles.length; i++) {
  (function(i) {
    var name = styles[i];
    Object.defineProperty(Color.prototype, name, {
      get: function() {
        if (this.styles.indexOf(i) === -1) {
          this.styles = this.styles.concat(i + 1);
        }
        return this;
      }
    });
    exports.color[name] = exports[name] = function(text) {
      if (!isColorSupported()) return text;
      return '\x1b[' + (i + 1) + 'm' + text + '\x1b[0m';
    };
  })(i);
}

exports.color.grey = exports.color.gray = exports.grey = exports.gray = function(text) {
  if (!isColorSupported()) return text;
  if (is256ColorSupported()) {
    return '\x1b[38;5;8m' + text + '\x1b[0m';
  }
  return '\x1b[30;1m' + text + '\x1b[0m';
};
Object.defineProperty(Color.prototype, 'gray', {
  get: function() {
    if (isColorSupported) {
      this.fgcolor = 8;
    } else {
      this.styles = this.styles.concat(1);
      this.fgcolor = 0;
    }
    return this;
  }
});
Object.defineProperty(Color.prototype, 'grey', {
  get: function() {
    if (isColorSupported) {
      this.fgcolor = 8;
    } else {
      this.styles = this.styles.concat(1);
      this.fgcolor = 0;
    }
    return this;
  }
});


Color.prototype.valueOf = function() {
  if (!isColorSupported()) return this.string;
  var is256 = is256ColorSupported();

  var text = this.string;
  var reset = '\x1b[0m';

  if (is256) {
    if (this.fgcolor !== null) {
      text = '\x1b[38;5;' + this.fgcolor + 'm' + text + reset;
    }
    if (this.bgcolor !== null) {
      text = '\x1b[48;5;' + this.bgcolor + 'm' + text + reset;
    }
  } else {
    if (this.fgcolor !== null && this.fgcolor < 8) {
      text = '\x1b[' + (30 + this.fgcolor) + 'm' + text + reset;
    }
    if (this.bgcolor !== null && this.bgcolor < 8) {
      text = '\x1b[' + (40 + this.bgcolor) + 'm' + text + reset;
    }
  }
  if (this.styles.length) {
    text = '\x1b[' + this.styles.join(';') + 'm' + text + reset;
  }
  return text;
};
Color.prototype.toString = function() {
  return this.valueOf();
};
Object.defineProperty(Color.prototype, 'color', {
  get: function() {
    return this.valueOf();
  }
});
Object.defineProperty(Color.prototype, 'style', {
  get: function() {
    return this.valueOf();
  }
});
Object.defineProperty(Color.prototype, 'length', {
  get: function() {
    return this.string.length;
  }
});

exports.Color = Color;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235815);
})()
//miniprogram-npm-outsideDeps=["util","tty"]
//# sourceMappingURL=index.js.map