module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235723, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _leven = require("leven");

var _leven2 = _interopRequireDefault(_leven);

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;
  var messages = _ref.messages;

  return new Plugin("undeclared-variables-check", {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope) {
        var binding = scope.getBinding(node.name);
        if (binding && binding.kind === "type" && !this.parentPath.isFlow()) {
          throw this.errorWithNode(messages.get("undeclaredVariableType", node.name), ReferenceError);
        }

        if (scope.hasBinding(node.name)) return;

        // get the closest declaration to offer as a suggestion
        // the variable name may have just been mistyped

        var bindings = scope.getAllBindings();

        var closest;
        var shortest = -1;

        for (var name in bindings) {
          var distance = (0, _leven2["default"])(node.name, name);
          if (distance <= 0 || distance > 3) continue;
          if (distance <= shortest) continue;

          closest = name;
          shortest = distance;
        }

        var msg;
        if (closest) {
          msg = messages.get("undeclaredVariableSuggestion", node.name, closest);
        } else {
          msg = messages.get("undeclaredVariable", node.name);
        }

        //

        throw this.errorWithNode(msg, ReferenceError);
      }
    }
  });
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235723);
})()
//miniprogram-npm-outsideDeps=["leven"]
//# sourceMappingURL=index.js.map