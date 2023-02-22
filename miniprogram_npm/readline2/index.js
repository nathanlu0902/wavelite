module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236391, function(require, module, exports) {
/**
 * Readline API façade to fix some issues
 * @Note: May look a bit like Monkey patching... if you know a better way let me know.
 */


var readline = require("readline");
var MuteStream = require("mute-stream");
var codePointAt = require("code-point-at");
var isFullwidthCodePoint = require("is-fullwidth-code-point");

var Interface = module.exports = {};


/**
 * Create a readline interface
 * @param  {Object} opt Readline option hash
 * @return {readline}   the new readline interface
 */

Interface.createInterface = function( opt ) {
  opt || (opt = {});
  var filteredOpt = opt;

  // Default `input` to stdin
  filteredOpt.input = opt.input || process.stdin;

  // Add mute capabilities to the output
  var ms = new MuteStream();
  ms.pipe( opt.output || process.stdout );
  filteredOpt.output = ms;

  // Create the readline
  var rl = readline.createInterface( filteredOpt );

  // Fix bug with refreshLine
  var _refreshLine = rl._refreshLine;
  rl._refreshLine = function() {
    _refreshLine.call(rl);

    var line = this._prompt + this.line;
    var cursorPos = this._getCursorPos();

    readline.moveCursor(this.output, -line.length, 0);
    readline.moveCursor(this.output, cursorPos.cols, 0);
  };

  // Returns current cursor's position and line
  rl._getCursorPos = function() {
    var columns = this.columns;
    var strBeforeCursor = this._prompt + this.line.substring(0, this.cursor);
    var dispPos = this._getDisplayPos(strBeforeCursor);
    var cols = dispPos.cols;
    var rows = dispPos.rows;
    // If the cursor is on a full-width character which steps over the line,
    // move the cursor to the beginning of the next line.
    if (cols + 1 === columns &&
        this.cursor < this.line.length &&
        isFullwidthCodePoint(codePointAt(this.line, this.cursor))) {
      rows++;
      cols = 0;
    }
    return {cols: cols, rows: rows};
  };

  // Returns the last character's display position of the given string
  rl._getDisplayPos = function(str) {
    var offset = 0;
    var col = this.columns;
    var row = 0;
    var code;
    str = stripVTControlCharacters(str);
    for (var i = 0, len = str.length; i < len; i++) {
      code = codePointAt(str, i);
      if (code >= 0x10000) { // surrogates
        i++;
      }
      if (code === 0x0a) { // new line \n
        offset = 0;
        row += 1;
        continue;
      }
      if (isFullwidthCodePoint(code)) {
        if ((offset + 1) % col === 0) {
          offset++;
        }
        offset += 2;
      } else {
        offset++;
      }
    }
    var cols = offset % col;
    var rows = row + (offset - cols) / col;
    return {cols: cols, rows: rows};
  };

  // Prevent arrows from breaking the question line
  var origWrite = rl._ttyWrite;
  rl._ttyWrite = function( s, key ) {
    key || (key = {});

    if ( key.name === "up" ) return;
    if ( key.name === "down" ) return;

    origWrite.apply( this, arguments );
  };

  return rl;
};

// Regexes used for ansi escape code splitting
var metaKeyCodeReAnywhere = /(?:\x1b)([a-zA-Z0-9])/;
var functionKeyCodeReAnywhere = new RegExp('(?:\x1b+)(O|N|\\[|\\[\\[)(?:' + [
  '(\\d+)(?:;(\\d+))?([~^$])',
  '(?:M([@ #!a`])(.)(.))', // mouse
  '(?:1;)?(\\d+)?([a-zA-Z])'
].join('|') + ')');

/**
 * Tries to remove all VT control characters. Use to estimate displayed
 * string width. May be buggy due to not running a real state machine
 */
function stripVTControlCharacters (str) {
  str = str.replace(new RegExp(functionKeyCodeReAnywhere.source, 'g'), '');
  return str.replace(new RegExp(metaKeyCodeReAnywhere.source, 'g'), '');
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236391);
})()
//miniprogram-npm-outsideDeps=["readline","mute-stream","code-point-at","is-fullwidth-code-point"]
//# sourceMappingURL=index.js.map