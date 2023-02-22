module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235719, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  function addDisplayName(id, call) {
    var props = call.arguments[0].properties;
    var safe = true;

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var key = t.toComputedKey(prop);
      if (t.isLiteral(key, { value: "displayName" })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(t.property("init", t.identifier("displayName"), t.literal(id)));
    }
  }

  var isCreateClassCallExpression = t.buildMatchMemberExpression("React.createClass");

  function isCreateClass(node) {
    if (!node || !t.isCallExpression(node)) return false;

    // not React.createClass call member object
    if (!isCreateClassCallExpression(node.callee)) return false;

    // no call arguments
    var args = node.arguments;
    if (args.length !== 1) return false;

    // first node arg is not an object
    var first = args[0];
    if (!t.isObjectExpression(first)) return false;

    return true;
  }

  return new Plugin("react-display-name", {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      ExportDefaultDeclaration: function ExportDefaultDeclaration(node, parent, scope, file) {
        if (isCreateClass(node.declaration)) {
          addDisplayName(file.opts.basename, node.declaration);
        }
      },

      "AssignmentExpression|Property|VariableDeclarator": function AssignmentExpressionPropertyVariableDeclarator(node) {
        var left, right;

        if (t.isAssignmentExpression(node)) {
          left = node.left;
          right = node.right;
        } else if (t.isProperty(node)) {
          left = node.key;
          right = node.value;
        } else if (t.isVariableDeclarator(node)) {
          left = node.id;
          right = node.init;
        }

        if (t.isMemberExpression(left)) {
          left = left.property;
        }

        if (t.isIdentifier(left) && isCreateClass(right)) {
          addDisplayName(left.name, right);
        }
      }
    }
  });
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235719);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map