module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235710, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  return new Plugin("constant-folding", {
    metadata: {
      group: "builtin-prepass",
      experimental: true
    },

    visitor: {
      AssignmentExpression: function AssignmentExpression() {
        var left = this.get("left");
        if (!left.isIdentifier()) return;

        var binding = this.scope.getBinding(left.node.name);
        if (!binding || binding.hasDeoptValue) return;

        var evaluated = this.get("right").evaluate();
        if (evaluated.confident) {
          binding.setValue(evaluated.value);
        } else {
          binding.deoptValue();
        }
      },

      IfStatement: function IfStatement() {
        var evaluated = this.get("test").evaluate();
        if (!evaluated.confident) {
          // todo: deopt binding values for constant violations inside
          return this.skip();
        }

        if (evaluated.value) {
          this.skipKey("alternate");
        } else {
          this.skipKey("consequent");
        }
      },

      Scopable: {
        enter: function enter() {
          var funcScope = this.scope.getFunctionParent();

          for (var name in this.scope.bindings) {
            var binding = this.scope.bindings[name];
            var deopt = false;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = binding.constantViolations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var path = _step.value;

                var funcViolationScope = path.scope.getFunctionParent();
                if (funcViolationScope !== funcScope) {
                  deopt = true;
                  break;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            if (deopt) binding.deoptValue();
          }
        },

        exit: function exit() {
          for (var name in this.scope.bindings) {
            var binding = this.scope.bindings[name];
            binding.clearValue();
          }
        }
      },

      Expression: {
        exit: function exit() {
          var res = this.evaluate();
          if (res.confident) return t.valueToNode(res.value);
        }
      }
    }
  });
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235710);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map