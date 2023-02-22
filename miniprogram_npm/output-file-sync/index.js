module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236321, function(require, module, exports) {
/*!
 * output-file-sync | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/output-file-sync
*/


var dirname = require('path').dirname;
var writeFileSync = require('graceful-fs').writeFileSync;
var inspect = require('util').inspect;

var objectAssign = require('object-assign');
var mkdirpSync = require('mkdirp').sync;

module.exports = function outputFileSync(filePath, data, options) {
  if (typeof filePath !== 'string') {
    throw new TypeError(
      inspect(filePath) +
      ' is not a string. Expected a file path to write a file.'
    );
  }

  if (filePath === '') {
    throw new Error('Expected a file path to write a file, but received an empty string instead.');
  }

  options = options || {};

  var mkdirpOptions;
  if (typeof options === 'string') {
    mkdirpOptions = null;
  } else if (options.dirMode) {
    mkdirpOptions = objectAssign({}, options, {mode: options.dirMode});
  } else {
    mkdirpOptions = options;
  }

  var writeFileOptions;
  if (options.fileMode) {
    writeFileOptions = objectAssign({}, options, {mode: options.fileMode});
  } else {
    writeFileOptions = options;
  }

  var createdDirPath = mkdirpSync(dirname(filePath), mkdirpOptions);
  writeFileSync(filePath, data, writeFileOptions);
  return createdDirPath;
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236321);
})()
//miniprogram-npm-outsideDeps=["path","graceful-fs","util","object-assign","mkdirp"]
//# sourceMappingURL=index.js.map