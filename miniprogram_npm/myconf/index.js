module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236289, function(require, module, exports) {


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _homeDir = require('home-dir');

var _homeDir2 = _interopRequireDefault(_homeDir);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

require('babel/polyfill');

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var dotFileRe = /^(\.[^\/]*)$/;

var Config = (function () {
  function Config(filename) {
    _classCallCheck(this, Config);

    var validFilename = dotFileRe.test(filename);
    if (!validFilename) {
      return console.error('the filename \'' + filename + '\' is not valid');
    }
    this.filename = filename;
    this.filepath = (0, _homeDir2['default'])(filename);
    this.fileparser = 'json';
  }

  _createClass(Config, [{
    key: 'path',
    value: function path() {
      var filepath = arguments.length <= 0 || arguments[0] === undefined ? (0, _homeDir2['default'])() : arguments[0];

      this.filepath = _path3['default'].resolve(filepath + ('/' + this.filename));
      return this;
    }
  }, {
    key: 'parser',
    value: function parser() {
      var _parser = arguments.length <= 0 || arguments[0] === undefined ? 'json' : arguments[0];

      this.fileparser = _parser;
      return this;
    }
  }, {
    key: 'get',
    value: function get(key) {
      var _this = this;

      return new Promise(function callee$2$0(resolve, reject) {
        var filedata;
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return regeneratorRuntime.awrap(_utils2['default'].readFile(this.filepath, this.fileparser));

            case 2:
              filedata = context$3$0.sent;

              if (!key) {
                context$3$0.next = 5;
                break;
              }

              return context$3$0.abrupt('return', resolve(filedata && filedata[key]));

            case 5:
              return context$3$0.abrupt('return', resolve(filedata));

            case 6:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this);
      });
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      var _this2 = this;

      return new Promise(function callee$2$0(resolve, reject) {
        var filedata, prop;
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return regeneratorRuntime.awrap(_utils2['default'].readFile(this.filepath, this.fileparser));

            case 2:
              filedata = context$3$0.sent;

              filedata = filedata ? filedata : {};
              if (typeof key === 'object') {
                for (prop in key) {
                  filedata[prop] = key[prop];
                }
              } else if (typeof key === 'string') {
                filedata[key] = value;
              }
              context$3$0.prev = 5;
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(_utils2['default'].saveFile(this.filepath, filedata, this.fileparser));

            case 8:
              resolve(filedata);
              context$3$0.next = 14;
              break;

            case 11:
              context$3$0.prev = 11;
              context$3$0.t0 = context$3$0['catch'](5);

              console.error(context$3$0.t0);

            case 14:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this2, [[5, 11]]);
      });
    }
  }, {
    key: 'save',
    value: function save(filedata) {
      var _this3 = this;

      return new Promise(function callee$2$0(resolve, reject) {
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.prev = 0;
              context$3$0.next = 3;
              return regeneratorRuntime.awrap(_utils2['default'].saveFile(this.filepath, filedata, this.fileparser));

            case 3:
              resolve(filedata);
              context$3$0.next = 9;
              break;

            case 6:
              context$3$0.prev = 6;
              context$3$0.t0 = context$3$0['catch'](0);

              console.error(context$3$0.t0);

            case 9:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this3, [[0, 6]]);
      });
    }
  }]);

  return Config;
})();

exports['default'] = Config;
module.exports = exports['default'];
}, function(modId) {var map = {"./utils":1676544236290}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236290, function(require, module, exports) {


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _homeDir = require('home-dir');

var _homeDir2 = _interopRequireDefault(_homeDir);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

exports['default'] = {
  readFile: function readFile(filepath, parser) {
    return regeneratorRuntime.async(function readFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          return context$1$0.abrupt('return', new Promise(function (resolve, reject) {
            (0, _pathExists2['default'])(filepath).then(function (exists) {
              if (exists) {
                var filedata = _fs2['default'].readFileSync(filepath, 'utf8');
                if (parser === 'json') {
                  filedata = JSON.parse(filedata);
                } else if (parser === 'yaml') {
                  filedata = _jsYaml2['default'].safeLoad(filedata);
                }
                return resolve(filedata);
              }
              return resolve(null);
            });
          }));

        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  },
  saveFile: function saveFile(filepath, data, parser) {
    return regeneratorRuntime.async(function saveFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          return context$1$0.abrupt('return', new Promise(function (resolve, reject) {
            if (parser === 'json') {
              data = JSON.stringify(data, null, 2);
            } else if (parser === 'yaml') {
              data = _jsYaml2['default'].safeDump(data);
            }
            filepath = _path2['default'].resolve(filepath);
            _fs2['default'].writeFile(filepath, data, 'utf8', function (err) {
              if (err) {
                return reject(err);
              }
              return resolve(null);
            });
          }));

        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
};
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236289);
})()
//miniprogram-npm-outsideDeps=["home-dir","babel/polyfill","path","fs","path-exists","js-yaml"]
//# sourceMappingURL=index.js.map