module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235722, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _definitions = require("./definitions");

var _definitions2 = _interopRequireDefault(_definitions);

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  var RUNTIME_MODULE_NAME = "babel-runtime";

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  return new Plugin("runtime", {
    metadata: {
      group: "builtin-post-modules"
    },

    pre: function pre(file) {
      file.set("helperGenerator", function (name) {
        return file.addImport(RUNTIME_MODULE_NAME + "/helpers/" + name, name, "absoluteDefault");
      });

      file.setDynamic("regeneratorIdentifier", function () {
        return file.addImport(RUNTIME_MODULE_NAME + "/regenerator", "regeneratorRuntime", "absoluteDefault");
      });
    },

    visitor: {
      ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, file) {
        if (node.name === "regeneratorRuntime") {
          return file.get("regeneratorIdentifier");
        }

        if (t.isMemberExpression(parent)) return;
        if (!has(_definitions2["default"].builtins, node.name)) return;
        if (scope.getBindingIdentifier(node.name)) return;

        // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
        var modulePath = _definitions2["default"].builtins[node.name];
        return file.addImport(RUNTIME_MODULE_NAME + "/core-js/" + modulePath, node.name, "absoluteDefault");
      },

      CallExpression: function CallExpression(node, parent, scope, file) {
        // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

        if (node.arguments.length) return;

        var callee = node.callee;
        if (!t.isMemberExpression(callee)) return;
        if (!callee.computed) return;
        if (!this.get("callee.property").matchesPattern("Symbol.iterator")) return;

        return t.callExpression(file.addImport(RUNTIME_MODULE_NAME + "/core-js/get-iterator", "getIterator", "absoluteDefault"), [callee.object]);
      },

      BinaryExpression: function BinaryExpression(node, parent, scope, file) {
        // Symbol.iterator in arr -> core.$for.isIterable(arr)

        if (node.operator !== "in") return;
        if (!this.get("left").matchesPattern("Symbol.iterator")) return;

        return t.callExpression(file.addImport(RUNTIME_MODULE_NAME + "/core-js/is-iterable", "isIterable", "absoluteDefault"), [node.right]);
      },

      MemberExpression: {
        enter: function enter(node, parent, scope, file) {
          // Array.from -> _core.Array.from

          if (!this.isReferenced()) return;

          var obj = node.object;
          var prop = node.property;

          if (!t.isReferenced(obj, node)) return;

          if (node.computed) return;

          if (!has(_definitions2["default"].methods, obj.name)) return;

          var methods = _definitions2["default"].methods[obj.name];
          if (!has(methods, prop.name)) return;

          // doesn't reference the global
          if (scope.getBindingIdentifier(obj.name)) return;

          // special case Object.defineProperty to not use core-js when using string keys
          if (obj.name === "Object" && prop.name === "defineProperty" && this.parentPath.isCallExpression()) {
            var call = this.parentPath.node;
            if (call.arguments.length === 3 && t.isLiteral(call.arguments[1])) return;
          }

          var modulePath = methods[prop.name];
          return file.addImport(RUNTIME_MODULE_NAME + "/core-js/" + modulePath, obj.name + "$" + prop.name, "absoluteDefault");
        },

        exit: function exit(node, parent, scope, file) {
          if (!this.isReferenced()) return;

          var prop = node.property;
          var obj = node.object;

          if (!has(_definitions2["default"].builtins, obj.name)) return;
          if (scope.getBindingIdentifier(obj.name)) return;

          var modulePath = _definitions2["default"].builtins[obj.name];
          return t.memberExpression(file.addImport(RUNTIME_MODULE_NAME + "/core-js/" + modulePath, "" + obj.name, "absoluteDefault"), prop);
        }
      }
    }
  });
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235722);
})()
//miniprogram-npm-outsideDeps=["./definitions"]
//# sourceMappingURL=index.js.map