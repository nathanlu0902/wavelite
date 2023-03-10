module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235711, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  function toStatements(node) {
    if (t.isBlockStatement(node)) {
      var hasBlockScoped = false;

      for (var i = 0; i < node.body.length; i++) {
        var bodyNode = node.body[i];
        if (t.isBlockScoped(bodyNode)) hasBlockScoped = true;
      }

      if (!hasBlockScoped) {
        return node.body;
      }
    }

    return node;
  }

  var visitor = {
    ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope) {
      var binding = scope.getBinding(node.name);
      if (!binding || binding.references > 1 || !binding.constant) return;
      if (binding.kind === "param" || binding.kind === "module") return;

      var replacement = binding.path.node;
      if (t.isVariableDeclarator(replacement)) {
        replacement = replacement.init;
      }
      if (!replacement) return;

      // ensure it's a "pure" type
      if (!scope.isPure(replacement, true)) return;

      if (t.isClass(replacement) || t.isFunction(replacement)) {
        // don't change this if it's in a different scope, this can be bad
        // for performance since it may be inside a loop or deeply nested in
        // hot code
        if (binding.path.scope.parent !== scope) return;
      }

      if (this.findParent(function (path) {
        return path.node === replacement;
      })) {
        return;
      }

      t.toExpression(replacement);
      scope.removeBinding(node.name);
      binding.path.dangerouslyRemove();
      return replacement;
    },

    "ClassDeclaration|FunctionDeclaration": function ClassDeclarationFunctionDeclaration(node, parent, scope) {
      var binding = scope.getBinding(node.id.name);
      if (binding && !binding.referenced) {
        this.dangerouslyRemove();
      }
    },

    VariableDeclarator: function VariableDeclarator(node, parent, scope) {
      if (!t.isIdentifier(node.id) || !scope.isPure(node.init, true)) return;
      visitor["ClassDeclaration|FunctionDeclaration"].apply(this, arguments);
    },

    ConditionalExpression: function ConditionalExpression(node) {
      var evaluateTest = this.get("test").evaluateTruthy();
      if (evaluateTest === true) {
        return node.consequent;
      } else if (evaluateTest === false) {
        return node.alternate;
      }
    },

    BlockStatement: function BlockStatement() {
      var paths = this.get("body");

      var purge = false;

      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];

        if (!purge && path.isCompletionStatement()) {
          purge = true;
          continue;
        }

        if (purge && !path.isFunctionDeclaration()) {
          path.dangerouslyRemove();
        }
      }
    },

    IfStatement: {
      exit: function exit(node) {
        var consequent = node.consequent;
        var alternate = node.alternate;
        var test = node.test;

        var evaluateTest = this.get("test").evaluateTruthy();

        // we can check if a test will be truthy 100% and if so then we can inline
        // the consequent and completely ignore the alternate
        //
        //   if (true) { foo; } -> { foo; }
        //   if ("foo") { foo; } -> { foo; }
        //

        if (evaluateTest === true) {
          return toStatements(consequent);
        }

        // we can check if a test will be falsy 100% and if so we can inline the
        // alternate if there is one and completely remove the consequent
        //
        //   if ("") { bar; } else { foo; } -> { foo; }
        //   if ("") { bar; } ->
        //

        if (evaluateTest === false) {
          if (alternate) {
            return toStatements(alternate);
          } else {
            return this.dangerouslyRemove();
          }
        }

        // remove alternate blocks that are empty
        //
        //   if (foo) { foo; } else {} -> if (foo) { foo; }
        //

        if (t.isBlockStatement(alternate) && !alternate.body.length) {
          alternate = node.alternate = null;
        }

        // if the consequent block is empty turn alternate blocks into a consequent
        // and flip the test
        //
        //   if (foo) {} else { bar; } -> if (!foo) { bar; }
        //

        if (t.isBlockStatement(consequent) && !consequent.body.length && t.isBlockStatement(alternate) && alternate.body.length) {
          node.consequent = node.alternate;
          node.alternate = null;
          node.test = t.unaryExpression("!", test, true);
        }
      }
    }
  };

  return new Plugin("dead-code-elimination", {
    metadata: {
      group: "builtin-pre",
      experimental: true
    },

    visitor: visitor
  });
};

module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235711);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map