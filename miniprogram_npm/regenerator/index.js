module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236404, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var path = require("path");
var fs = require("fs");
var through = require("through");
var transform = require("./lib/visit").transform;
var utils = require("./lib/util");
var recast = require("recast");
var types = recast.types;
var genOrAsyncFunExp = /\bfunction\s*\*|\basync\b/;
var blockBindingExp = /\b(let|const)\s+/;

function exports(file, options) {
  var data = [];
  return through(write, end);

  function write(buf) {
    data.push(buf);
  }

  function end() {
    this.queue(compile(data.join(""), options).code);
    this.queue(null);
  }
}

// To get a writable stream for use as a browserify transform, call
// require("regenerator")().
module.exports = exports;

// To include the runtime globally in the current node process, call
// require("regenerator").runtime().
function runtime() {
  require("./runtime");
}
exports.runtime = runtime;
runtime.path = path.join(__dirname, "runtime.js");

function compile(source, options) {
  options = normalizeOptions(options);

  if (!genOrAsyncFunExp.test(source)) {
    return {
      // Shortcut: no generators or async functions to transform.
      code: (options.includeRuntime === true ? fs.readFileSync(
        path.join(__dirname, "runtime.js"), "utf-8"
      ) + "\n" : "") + source
    };
  }

  var recastOptions = getRecastOptions(options);
  var ast = recast.parse(source, recastOptions);
  var nodePath = new types.NodePath(ast);
  var programPath = nodePath.get("program");

  if (shouldVarify(source, options)) {
    // Transpile let/const into var declarations.
    varifyAst(programPath.node);
  }

  transform(programPath, options);

  return recast.print(nodePath, recastOptions);
}

function normalizeOptions(options) {
  options = utils.defaults(options || {}, {
    includeRuntime: false,
    supportBlockBinding: true
  });

  if (!options.esprima) {
    options.esprima = require("esprima-fb");
  }

  assert.ok(
    /harmony/.test(options.esprima.version),
    "Bad esprima version: " + options.esprima.version
  );

  return options;
}

function getRecastOptions(options) {
  var recastOptions = {
    range: true
  };

  function copy(name) {
    if (name in options) {
      recastOptions[name] = options[name];
    }
  }

  copy("esprima");
  copy("sourceFileName");
  copy("sourceMapName");
  copy("inputSourceMap");
  copy("sourceRoot");

  return recastOptions;
}

function shouldVarify(source, options) {
  var supportBlockBinding = !!options.supportBlockBinding;
  if (supportBlockBinding) {
    if (!blockBindingExp.test(source)) {
      supportBlockBinding = false;
    }
  }

  return supportBlockBinding;
}

function varify(source, options) {
  var recastOptions = getRecastOptions(normalizeOptions(options));
  var ast = recast.parse(source, recastOptions);
  varifyAst(ast.program);
  return recast.print(ast, recastOptions).code;
}

function varifyAst(ast) {
  types.namedTypes.Program.assert(ast);

  var defsResult = require("defs")(ast, {
    ast: true,
    disallowUnknownReferences: false,
    disallowDuplicated: false,
    disallowVars: false,
    loopClosures: "iife"
  });

  if (defsResult.errors) {
    throw new Error(defsResult.errors.join("\n"))
  }

  return ast;
}

// Convenience for just translating let/const to var declarations.
exports.varify = varify;

// Allow packages that depend on Regenerator to use the same copy of
// ast-types, in case multiple versions are installed by NPM.
exports.types = types;

// Transforms a string of source code, returning the { code, map? } result
// from recast.print.
exports.compile = compile;

// To modify an AST directly, call require("regenerator").transform(ast).
exports.transform = transform;

}, function(modId) {var map = {"./lib/visit":1676544236405,"./lib/util":1676544236409,"./runtime":1676544236411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236405, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var fs = require("fs");
var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;
var isArray = types.builtInTypes.array;
var isObject = types.builtInTypes.object;
var NodePath = types.NodePath;
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;
var util = require("./util");
var runtimeProperty = util.runtimeProperty;
var getMarkInfo = require("private").makeAccessor();

exports.transform = function transform(node, options) {
  options = options || {};

  var path = node instanceof NodePath ? node : new NodePath(node);
  visitor.visit(path, options);
  node = path.value;

  if (options.includeRuntime === true ||
      (options.includeRuntime === 'if used' && visitor.wasChangeReported())) {
    injectRuntime(n.File.check(node) ? node.program : node);
  }

  options.madeChanges = visitor.wasChangeReported();

  return node;
};

function injectRuntime(program) {
  n.Program.assert(program);

  // Include the runtime by modifying the AST rather than by concatenating
  // strings. This technique will allow for more accurate source mapping.
  var runtimePath = require("..").runtime.path;
  var runtime = fs.readFileSync(runtimePath, "utf8");
  var runtimeBody = recast.parse(runtime, {
    sourceFileName: runtimePath
  }).program.body;

  var body = program.body;
  body.unshift.apply(body, runtimeBody);
}

var visitor = types.PathVisitor.fromMethodsObject({
  reset: function(node, options) {
    this.options = options;
  },

  visitFunction: function(path) {
    // Calling this.traverse(path) first makes for a post-order traversal.
    this.traverse(path);

    var node = path.value;
    var shouldTransformAsync = node.async && !this.options.disableAsync;

    if (!node.generator && !shouldTransformAsync) {
      return;
    }

    this.reportChanged();

    if (node.expression) {
      // Transform expression lambdas into normal functions.
      node.expression = false;
      node.body = b.blockStatement([
        b.returnStatement(node.body)
      ]);
    }

    if (shouldTransformAsync) {
      awaitVisitor.visit(path.get("body"));
    }

    var outerBody = [];
    var innerBody = [];
    var bodyPath = path.get("body", "body");

    bodyPath.each(function(childPath) {
      var node = childPath.value;
      if (node && node._blockHoist != null) {
        outerBody.push(node);
      } else {
        innerBody.push(node);
      }
    });

    if (outerBody.length > 0) {
      // Only replace the inner body if we actually hoisted any statements
      // to the outer body.
      bodyPath.replace(innerBody);
    }

    var outerFnExpr = getOuterFnExpr(path);
    // Note that getOuterFnExpr has the side-effect of ensuring that the
    // function has a name (so node.id will always be an Identifier), even
    // if a temporary name has to be synthesized.
    n.Identifier.assert(node.id);
    var innerFnId = b.identifier(node.id.name + "$");
    var contextId = path.scope.declareTemporary("context$");
    var argsId = path.scope.declareTemporary("args$");

    // Turn all declarations into vars, and replace the original
    // declarations with equivalent assignment expressions.
    var vars = hoist(path);

    var didRenameArguments = renameArguments(path, argsId);
    if (didRenameArguments) {
      vars = vars || b.variableDeclaration("var", []);
      vars.declarations.push(b.variableDeclarator(
        argsId, b.identifier("arguments")
      ));
    }

    var emitter = new Emitter(contextId);
    emitter.explode(path.get("body"));

    if (vars && vars.declarations.length > 0) {
      outerBody.push(vars);
    }

    var wrapArgs = [
      emitter.getContextFunction(innerFnId),
      // Async functions that are not generators don't care about the
      // outer function because they don't need it to be marked and don't
      // inherit from its .prototype.
      node.generator ? outerFnExpr : b.literal(null),
      b.thisExpression()
    ];

    var tryLocsList = emitter.getTryLocsList();
    if (tryLocsList) {
      wrapArgs.push(tryLocsList);
    }

    var wrapCall = b.callExpression(
      runtimeProperty(shouldTransformAsync ? "async" : "wrap"),
      wrapArgs
    );

    outerBody.push(b.returnStatement(wrapCall));
    node.body = b.blockStatement(outerBody);

    var wasGeneratorFunction = node.generator;
    if (wasGeneratorFunction) {
      node.generator = false;
    }

    if (shouldTransformAsync) {
      node.async = false;
    }

    if (wasGeneratorFunction &&
        n.Expression.check(node)) {
      return b.callExpression(runtimeProperty("mark"), [node]);
    }
  },

  visitForOfStatement: function(path) {
    this.traverse(path);

    var node = path.value;
    var tempIterId = path.scope.declareTemporary("t$");
    var tempIterDecl = b.variableDeclarator(
      tempIterId,
      b.callExpression(
        runtimeProperty("values"),
        [node.right]
      )
    );

    var tempInfoId = path.scope.declareTemporary("t$");
    var tempInfoDecl = b.variableDeclarator(tempInfoId, null);

    var init = node.left;
    var loopId;
    if (n.VariableDeclaration.check(init)) {
      loopId = init.declarations[0].id;
      init.declarations.push(tempIterDecl, tempInfoDecl);
    } else {
      loopId = init;
      init = b.variableDeclaration("var", [
        tempIterDecl,
        tempInfoDecl
      ]);
    }
    n.Identifier.assert(loopId);

    var loopIdAssignExprStmt = b.expressionStatement(
      b.assignmentExpression(
        "=",
        loopId,
        b.memberExpression(
          tempInfoId,
          b.identifier("value"),
          false
        )
      )
    );

    if (n.BlockStatement.check(node.body)) {
      node.body.body.unshift(loopIdAssignExprStmt);
    } else {
      node.body = b.blockStatement([
        loopIdAssignExprStmt,
        node.body
      ]);
    }

    return b.forStatement(
      init,
      b.unaryExpression(
        "!",
        b.memberExpression(
          b.assignmentExpression(
            "=",
            tempInfoId,
            b.callExpression(
              b.memberExpression(
                tempIterId,
                b.identifier("next"),
                false
              ),
              []
            )
          ),
          b.identifier("done"),
          false
        )
      ),
      null,
      node.body
    );
  }
});

// Given a NodePath for a Function, return an Expression node that can be
// used to refer reliably to the function object from inside the function.
// This expression is essentially a replacement for arguments.callee, with
// the key advantage that it works in strict mode.
function getOuterFnExpr(funPath) {
  var node = funPath.value;
  n.Function.assert(node);

  if (node.generator && // Non-generator functions don't need to be marked.
      n.FunctionDeclaration.check(node)) {
    var pp = funPath.parent;

    while (pp && !(n.BlockStatement.check(pp.value) ||
                   n.Program.check(pp.value))) {
      pp = pp.parent;
    }

    if (!pp) {
      return node.id;
    }

    var markDecl = getRuntimeMarkDecl(pp);
    var markedArray = markDecl.declarations[0].id;
    var funDeclIdArray = markDecl.declarations[0].init.callee.object;
    n.ArrayExpression.assert(funDeclIdArray);

    var index = funDeclIdArray.elements.length;
    funDeclIdArray.elements.push(node.id);

    return b.memberExpression(
      markedArray,
      b.literal(index),
      true
    );
  }

  return node.id || (
    node.id = funPath.scope.parent.declareTemporary("callee$")
  );
}

function getRuntimeMarkDecl(blockPath) {
  assert.ok(blockPath instanceof NodePath);
  var block = blockPath.node;
  isArray.assert(block.body);

  var info = getMarkInfo(block);
  if (info.decl) {
    return info.decl;
  }

  info.decl = b.variableDeclaration("var", [
    b.variableDeclarator(
      blockPath.scope.declareTemporary("marked"),
      b.callExpression(
        b.memberExpression(
          b.arrayExpression([]),
          b.identifier("map"),
          false
        ),
        [runtimeProperty("mark")]
      )
    )
  ]);

  for (var i = 0; i < block.body.length; ++i) {
    if (!shouldNotHoistAbove(blockPath.get("body", i))) {
      break;
    }
  }

  blockPath.get("body").insertAt(i, info.decl);

  return info.decl;
}

function shouldNotHoistAbove(stmtPath) {
  var value = stmtPath.value;
  n.Statement.assert(value);

  // If the first statement is a "use strict" declaration, make sure to
  // insert hoisted declarations afterwards.
  return n.ExpressionStatement.check(value) &&
    n.Literal.check(value.expression) &&
    value.expression.value === "use strict";
}

function renameArguments(funcPath, argsId) {
  assert.ok(funcPath instanceof types.NodePath);
  var func = funcPath.value;
  var didRenameArguments = false;

  recast.visit(funcPath, {
    visitFunction: function(path) {
      if (path.value === func) {
        this.traverse(path);
      } else {
        return false;
      }
    },

    visitIdentifier: function(path) {
      if (path.value.name === "arguments" &&
          util.isReference(path)) {
        path.replace(argsId);
        didRenameArguments = true;
        return false;
      }

      this.traverse(path);
    }
  });

  // If the traversal replaced any arguments references, then we need to
  // alias the outer function's arguments binding (be it the implicit
  // arguments object or some other parameter or variable) to the variable
  // named by argsId.
  return didRenameArguments;
}

var awaitVisitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function(path) {
    return false; // Don't descend into nested function scopes.
  },

  visitAwaitExpression: function(path) {
    // Convert await and await* expressions to yield expressions.
    var argument = path.value.argument;

    // If the parser supports await* syntax using a boolean .all property
    // (#171), desugar that syntax to yield Promise.all(argument).
    if (path.value.all) {
      argument = b.callExpression(
        b.memberExpression(
          b.identifier("Promise"),
          b.identifier("all"),
          false
        ),
        [argument]
      );
    }

    // Transforming `await x` to `yield regeneratorRuntime.awrap(x)`
    // causes the argument to be wrapped in such a way that the runtime
    // can distinguish between awaited and merely yielded values.
    return b.yieldExpression(
      b.callExpression(
        runtimeProperty("awrap"),
        [argument]
      ),
      false
    );
  }
});

}, function(modId) { var map = {"./hoist":1676544236406,"./emit":1676544236407,"./util":1676544236409}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236406, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function(funPath) {
  assert.ok(funPath instanceof types.NodePath);
  n.Function.assert(funPath.value);

  var vars = {};

  function varDeclToExpr(vdec, includeIdentifiers) {
    n.VariableDeclaration.assert(vdec);
    var exprs = [];

    vdec.declarations.forEach(function(dec) {
      vars[dec.id.name] = dec.id;

      if (dec.init) {
        exprs.push(b.assignmentExpression(
          "=", dec.id, dec.init
        ));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0)
      return null;

    if (exprs.length === 1)
      return exprs[0];

    return b.sequenceExpression(exprs);
  }

  types.visit(funPath.get("body"), {
    visitVariableDeclaration: function(path) {
      var expr = varDeclToExpr(path.value, false);
      if (expr === null) {
        path.replace();
      } else {
        // We don't need to traverse this expression any further because
        // there can't be any new declarations inside an expression.
        return b.expressionStatement(expr);
      }

      // Since the original node has been either removed or replaced,
      // avoid traversing it any further.
      return false;
    },

    visitForStatement: function(path) {
      var init = path.value.init;
      if (n.VariableDeclaration.check(init)) {
        path.get("init").replace(varDeclToExpr(init, false));
      }
      this.traverse(path);
    },

    visitForInStatement: function(path) {
      var left = path.value.left;
      if (n.VariableDeclaration.check(left)) {
        path.get("left").replace(varDeclToExpr(left, true));
      }
      this.traverse(path);
    },

    visitFunctionDeclaration: function(path) {
      var node = path.value;
      vars[node.id.name] = node.id;

      var parentNode = path.parent.node;
      var assignment = b.expressionStatement(
        b.assignmentExpression(
          "=",
          node.id,
          b.functionExpression(
            node.id,
            node.params,
            node.body,
            node.generator,
            node.expression
          )
        )
      );

      if (n.BlockStatement.check(path.parent.node)) {
        // Insert the assignment form before the first statement in the
        // enclosing block.
        path.parent.get("body").unshift(assignment);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        path.replace();

      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        path.replace(assignment);
      }

      // Don't hoist variables out of inner functions.
      return false;
    },

    visitFunctionExpression: function(path) {
      // Don't descend into nested function expressions.
      return false;
    }
  });

  var paramNames = {};
  funPath.get("params").each(function(paramPath) {
    var param = paramPath.value;
    if (n.Identifier.check(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  var declarations = [];

  Object.keys(vars).forEach(function(name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(b.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return b.variableDeclaration("var", declarations);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236407, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var isArray = types.builtInTypes.array;
var b = types.builders;
var n = types.namedTypes;
var leap = require("./leap");
var meta = require("./meta");
var util = require("./util");
var runtimeProperty = util.runtimeProperty;
var hasOwn = Object.prototype.hasOwnProperty;

function Emitter(contextId) {
  assert.ok(this instanceof Emitter);
  n.Identifier.assert(contextId);

  // Used to generate unique temporary names.
  this.nextTempId = 0;

  Object.defineProperties(this, {
    // In order to make sure the context object does not collide with
    // anything in the local scope, we might have to rename it, so we
    // refer to it symbolically instead of just assuming that it will be
    // called "context".
    contextId: { value: contextId },

    // An append-only list of Statements that grows each time this.emit is
    // called.
    listing: { value: [] },

    // A sparse array whose keys correspond to locations in this.listing
    // that have been marked as branch/jump targets.
    marked: { value: [true] },

    // The last location will be marked when this.getDispatchLoop is
    // called.
    finalLoc: { value: loc() },

    // A list of all leap.TryEntry statements emitted.
    tryEntries: { value: [] }
  });

  // The .leapManager property needs to be defined by a separate
  // defineProperties call so that .finalLoc will be visible to the
  // leap.LeapManager constructor.
  Object.defineProperties(this, {
    // Each time we evaluate the body of a loop, we tell this.leapManager
    // to enter a nested loop context that determines the meaning of break
    // and continue statements therein.
    leapManager: { value: new leap.LeapManager(this) }
  });
}

var Ep = Emitter.prototype;
exports.Emitter = Emitter;

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.
function loc() {
  return b.literal(-1);
}

// Sets the exact value of the given location to the offset of the next
// Statement emitted.
Ep.mark = function(loc) {
  n.Literal.assert(loc);
  var index = this.listing.length;
  if (loc.value === -1) {
    loc.value = index;
  } else {
    // Locations can be marked redundantly, but their values cannot change
    // once set the first time.
    assert.strictEqual(loc.value, index);
  }
  this.marked[index] = true;
  return loc;
};

Ep.emit = function(node) {
  if (n.Expression.check(node))
    node = b.expressionStatement(node);
  n.Statement.assert(node);
  this.listing.push(node);
};

// Shorthand for emitting assignment statements. This will come in handy
// for assignments to temporary variables.
Ep.emitAssign = function(lhs, rhs) {
  this.emit(this.assign(lhs, rhs));
  return lhs;
};

// Shorthand for an assignment statement.
Ep.assign = function(lhs, rhs) {
  return b.expressionStatement(
    b.assignmentExpression("=", lhs, rhs));
};

// Convenience function for generating expressions like context.next,
// context.sent, and context.rval.
Ep.contextProperty = function(name, computed) {
  return b.memberExpression(
    this.contextId,
    computed ? b.literal(name) : b.identifier(name),
    !!computed
  );
};

// Shorthand for setting context.rval and jumping to `context.stop()`.
Ep.stop = function(rval) {
  if (rval) {
    this.setReturnValue(rval);
  }

  this.jump(this.finalLoc);
};

Ep.setReturnValue = function(valuePath) {
  n.Expression.assert(valuePath.value);

  this.emitAssign(
    this.contextProperty("rval"),
    this.explodeExpression(valuePath)
  );
};

Ep.clearPendingException = function(tryLoc, assignee) {
  n.Literal.assert(tryLoc);

  var catchCall = b.callExpression(
    this.contextProperty("catch", true),
    [tryLoc]
  );

  if (assignee) {
    this.emitAssign(assignee, catchCall);
  } else {
    this.emit(catchCall);
  }
};

// Emits code for an unconditional jump to the given location, even if the
// exact value of the location is not yet known.
Ep.jump = function(toLoc) {
  this.emitAssign(this.contextProperty("next"), toLoc);
  this.emit(b.breakStatement());
};

// Conditional jump.
Ep.jumpIf = function(test, toLoc) {
  n.Expression.assert(test);
  n.Literal.assert(toLoc);

  this.emit(b.ifStatement(
    test,
    b.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      b.breakStatement()
    ])
  ));
};

// Conditional jump, with the condition negated.
Ep.jumpIfNot = function(test, toLoc) {
  n.Expression.assert(test);
  n.Literal.assert(toLoc);

  var negatedTest;
  if (n.UnaryExpression.check(test) &&
      test.operator === "!") {
    // Avoid double negation.
    negatedTest = test.argument;
  } else {
    negatedTest = b.unaryExpression("!", test);
  }

  this.emit(b.ifStatement(
    negatedTest,
    b.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      b.breakStatement()
    ])
  ));
};

// Returns a unique MemberExpression that can be used to store and
// retrieve temporary values. Since the object of the member expression is
// the context object, which is presumed to coexist peacefully with all
// other local variables, and since we just increment `nextTempId`
// monotonically, uniqueness is assured.
Ep.makeTempVar = function() {
  return this.contextProperty("t" + this.nextTempId++);
};

Ep.getContextFunction = function(id) {
  return b.functionExpression(
    id || null/*Anonymous*/,
    [this.contextId],
    b.blockStatement([this.getDispatchLoop()]),
    false, // Not a generator anymore!
    false // Nor an expression.
  );
};

// Turns this.listing into a loop of the form
//
//   while (1) switch (context.next) {
//   case 0:
//   ...
//   case n:
//     return context.stop();
//   }
//
// Each marked location in this.listing will correspond to one generated
// case statement.
Ep.getDispatchLoop = function() {
  var self = this;
  var cases = [];
  var current;

  // If we encounter a break, continue, or return statement in a switch
  // case, we can skip the rest of the statements until the next case.
  var alreadyEnded = false;

  self.listing.forEach(function(stmt, i) {
    if (self.marked.hasOwnProperty(i)) {
      cases.push(b.switchCase(
        b.literal(i),
        current = []));
      alreadyEnded = false;
    }

    if (!alreadyEnded) {
      current.push(stmt);
      if (isSwitchCaseEnder(stmt))
        alreadyEnded = true;
    }
  });

  // Now that we know how many statements there will be in this.listing,
  // we can finally resolve this.finalLoc.value.
  this.finalLoc.value = this.listing.length;

  cases.push(
    b.switchCase(this.finalLoc, [
      // Intentionally fall through to the "end" case...
    ]),

    // So that the runtime can jump to the final location without having
    // to know its offset, we provide the "end" case as a synonym.
    b.switchCase(b.literal("end"), [
      // This will check/clear both context.thrown and context.rval.
      b.returnStatement(
        b.callExpression(this.contextProperty("stop"), [])
      )
    ])
  );

  return b.whileStatement(
    b.literal(1),
    b.switchStatement(
      b.assignmentExpression(
        "=",
        this.contextProperty("prev"),
        this.contextProperty("next")
      ),
      cases
    )
  );
};

// See comment above re: alreadyEnded.
function isSwitchCaseEnder(stmt) {
  return n.BreakStatement.check(stmt)
      || n.ContinueStatement.check(stmt)
      || n.ReturnStatement.check(stmt)
      || n.ThrowStatement.check(stmt);
}

Ep.getTryLocsList = function() {
  if (this.tryEntries.length === 0) {
    // To avoid adding a needless [] to the majority of runtime.wrap
    // argument lists, force the caller to handle this case specially.
    return null;
  }

  var lastLocValue = 0;

  return b.arrayExpression(
    this.tryEntries.map(function(tryEntry) {
      var thisLocValue = tryEntry.firstLoc.value;
      assert.ok(thisLocValue >= lastLocValue, "try entries out of order");
      lastLocValue = thisLocValue;

      var ce = tryEntry.catchEntry;
      var fe = tryEntry.finallyEntry;

      var locs = [
        tryEntry.firstLoc,
        // The null here makes a hole in the array.
        ce ? ce.firstLoc : null
      ];

      if (fe) {
        locs[2] = fe.firstLoc;
        locs[3] = fe.afterLoc;
      }

      return b.arrayExpression(locs);
    })
  );
};

// All side effects must be realized in order.

// If any subexpression harbors a leap, all subexpressions must be
// neutered of side effects.

// No destructive modification of AST nodes.

Ep.explode = function(path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var node = path.value;
  var self = this;

  n.Node.assert(node);

  if (n.Statement.check(node))
    return self.explodeStatement(path);

  if (n.Expression.check(node))
    return self.explodeExpression(path, ignoreResult);

  if (n.Declaration.check(node))
    throw getDeclError(node);

  switch (node.type) {
  case "Program":
    return path.get("body").map(
      self.explodeStatement,
      self
    );

  case "VariableDeclarator":
    throw getDeclError(node);

  // These node types should be handled by their parent nodes
  // (ObjectExpression, SwitchStatement, and TryStatement, respectively).
  case "Property":
  case "SwitchCase":
  case "CatchClause":
    throw new Error(
      node.type + " nodes should be handled by their parents");

  default:
    throw new Error(
      "unknown Node of type " +
        JSON.stringify(node.type));
  }
};

function getDeclError(node) {
  return new Error(
    "all declarations should have been transformed into " +
    "assignments before the Exploder began its work: " +
    JSON.stringify(node));
}

Ep.explodeStatement = function(path, labelId) {
  assert.ok(path instanceof types.NodePath);

  var stmt = path.value;
  var self = this;

  n.Statement.assert(stmt);

  if (labelId) {
    n.Identifier.assert(labelId);
  } else {
    labelId = null;
  }

  // Explode BlockStatement nodes even if they do not contain a yield,
  // because we don't want or need the curly braces.
  if (n.BlockStatement.check(stmt)) {
    return path.get("body").each(
      self.explodeStatement,
      self
    );
  }

  if (!meta.containsLeap(stmt)) {
    // Technically we should be able to avoid emitting the statement
    // altogether if !meta.hasSideEffects(stmt), but that leads to
    // confusing generated code (for instance, `while (true) {}` just
    // disappears) and is probably a more appropriate job for a dedicated
    // dead code elimination pass.
    self.emit(stmt);
    return;
  }

  switch (stmt.type) {
  case "ExpressionStatement":
    self.explodeExpression(path.get("expression"), true);
    break;

  case "LabeledStatement":
    var after = loc();

    // Did you know you can break from any labeled block statement or
    // control structure? Well, you can! Note: when a labeled loop is
    // encountered, the leap.LabeledEntry created here will immediately
    // enclose a leap.LoopEntry on the leap manager's stack, and both
    // entries will have the same label. Though this works just fine, it
    // may seem a bit redundant. In theory, we could check here to
    // determine if stmt knows how to handle its own label; for example,
    // stmt happens to be a WhileStatement and so we know it's going to
    // establish its own LoopEntry when we explode it (below). Then this
    // LabeledEntry would be unnecessary. Alternatively, we might be
    // tempted not to pass stmt.label down into self.explodeStatement,
    // because we've handled the label here, but that's a mistake because
    // labeled loops may contain labeled continue statements, which is not
    // something we can handle in this generic case. All in all, I think a
    // little redundancy greatly simplifies the logic of this case, since
    // it's clear that we handle all possible LabeledStatements correctly
    // here, regardless of whether they interact with the leap manager
    // themselves. Also remember that labels and break/continue-to-label
    // statements are rare, and all of this logic happens at transform
    // time, so it has no additional runtime cost.
    self.leapManager.withEntry(
      new leap.LabeledEntry(after, stmt.label),
      function() {
        self.explodeStatement(path.get("body"), stmt.label);
      }
    );

    self.mark(after);

    break;

  case "WhileStatement":
    var before = loc();
    var after = loc();

    self.mark(before);
    self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, before, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );
    self.jump(before);
    self.mark(after);

    break;

  case "DoWhileStatement":
    var first = loc();
    var test = loc();
    var after = loc();

    self.mark(first);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, test, labelId),
      function() { self.explode(path.get("body")); }
    );
    self.mark(test);
    self.jumpIf(self.explodeExpression(path.get("test")), first);
    self.mark(after);

    break;

  case "ForStatement":
    var head = loc();
    var update = loc();
    var after = loc();

    if (stmt.init) {
      // We pass true here to indicate that if stmt.init is an expression
      // then we do not care about its result.
      self.explode(path.get("init"), true);
    }

    self.mark(head);

    if (stmt.test) {
      self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    } else {
      // No test means continue unconditionally.
    }

    self.leapManager.withEntry(
      new leap.LoopEntry(after, update, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );

    self.mark(update);

    if (stmt.update) {
      // We pass true here to indicate that if stmt.update is an
      // expression then we do not care about its result.
      self.explode(path.get("update"), true);
    }

    self.jump(head);

    self.mark(after);

    break;

  case "ForInStatement":
    var head = loc();
    var after = loc();

    var keyIterNextFn = self.makeTempVar();
    self.emitAssign(
      keyIterNextFn,
      b.callExpression(
        runtimeProperty("keys"),
        [self.explodeExpression(path.get("right"))]
      )
    );

    self.mark(head);

    var keyInfoTmpVar = self.makeTempVar();
    self.jumpIf(
      b.memberExpression(
        b.assignmentExpression(
          "=",
          keyInfoTmpVar,
          b.callExpression(keyIterNextFn, [])
        ),
        b.identifier("done"),
        false
      ),
      after
    );

    self.emitAssign(
      stmt.left,
      b.memberExpression(
        keyInfoTmpVar,
        b.identifier("value"),
        false
      )
    );

    self.leapManager.withEntry(
      new leap.LoopEntry(after, head, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );

    self.jump(head);

    self.mark(after);

    break;

  case "BreakStatement":
    self.emitAbruptCompletion({
      type: "break",
      target: self.leapManager.getBreakLoc(stmt.label)
    });

    break;

  case "ContinueStatement":
    self.emitAbruptCompletion({
      type: "continue",
      target: self.leapManager.getContinueLoc(stmt.label)
    });

    break;

  case "SwitchStatement":
    // Always save the discriminant into a temporary variable in case the
    // test expressions overwrite values like context.sent.
    var disc = self.emitAssign(
      self.makeTempVar(),
      self.explodeExpression(path.get("discriminant"))
    );

    var after = loc();
    var defaultLoc = loc();
    var condition = defaultLoc;
    var caseLocs = [];

    // If there are no cases, .cases might be undefined.
    var cases = stmt.cases || [];

    for (var i = cases.length - 1; i >= 0; --i) {
      var c = cases[i];
      n.SwitchCase.assert(c);

      if (c.test) {
        condition = b.conditionalExpression(
          b.binaryExpression("===", disc, c.test),
          caseLocs[i] = loc(),
          condition
        );
      } else {
        caseLocs[i] = defaultLoc;
      }
    }

    self.jump(self.explodeExpression(
      new types.NodePath(condition, path, "discriminant")
    ));

    self.leapManager.withEntry(
      new leap.SwitchEntry(after),
      function() {
        path.get("cases").each(function(casePath) {
          var c = casePath.value;
          var i = casePath.name;

          self.mark(caseLocs[i]);

          casePath.get("consequent").each(
            self.explodeStatement,
            self
          );
        });
      }
    );

    self.mark(after);
    if (defaultLoc.value === -1) {
      self.mark(defaultLoc);
      assert.strictEqual(after.value, defaultLoc.value);
    }

    break;

  case "IfStatement":
    var elseLoc = stmt.alternate && loc();
    var after = loc();

    self.jumpIfNot(
      self.explodeExpression(path.get("test")),
      elseLoc || after
    );

    self.explodeStatement(path.get("consequent"));

    if (elseLoc) {
      self.jump(after);
      self.mark(elseLoc);
      self.explodeStatement(path.get("alternate"));
    }

    self.mark(after);

    break;

  case "ReturnStatement":
    self.emitAbruptCompletion({
      type: "return",
      value: self.explodeExpression(path.get("argument"))
    });

    break;

  case "WithStatement":
    throw new Error(
      node.type + " not supported in generator functions.");

  case "TryStatement":
    var after = loc();

    var handler = stmt.handler;
    if (!handler && stmt.handlers) {
      handler = stmt.handlers[0] || null;
    }

    var catchLoc = handler && loc();
    var catchEntry = catchLoc && new leap.CatchEntry(
      catchLoc,
      handler.param
    );

    var finallyLoc = stmt.finalizer && loc();
    var finallyEntry = finallyLoc &&
      new leap.FinallyEntry(finallyLoc, after);

    var tryEntry = new leap.TryEntry(
      self.getUnmarkedCurrentLoc(),
      catchEntry,
      finallyEntry
    );

    self.tryEntries.push(tryEntry);
    self.updateContextPrevLoc(tryEntry.firstLoc);

    self.leapManager.withEntry(tryEntry, function() {
      self.explodeStatement(path.get("block"));

      if (catchLoc) {
        if (finallyLoc) {
          // If we have both a catch block and a finally block, then
          // because we emit the catch block first, we need to jump over
          // it to the finally block.
          self.jump(finallyLoc);

        } else {
          // If there is no finally block, then we need to jump over the
          // catch block to the fall-through location.
          self.jump(after);
        }

        self.updateContextPrevLoc(self.mark(catchLoc));

        var bodyPath = path.get("handler", "body");
        var safeParam = self.makeTempVar();
        self.clearPendingException(tryEntry.firstLoc, safeParam);

        var catchScope = bodyPath.scope;
        var catchParamName = handler.param.name;
        n.CatchClause.assert(catchScope.node);
        assert.strictEqual(catchScope.lookup(catchParamName), catchScope);

        types.visit(bodyPath, {
          visitIdentifier: function(path) {
            if (util.isReference(path, catchParamName) &&
                path.scope.lookup(catchParamName) === catchScope) {
              return safeParam;
            }

            this.traverse(path);
          },

          visitFunction: function(path) {
            if (path.scope.declares(catchParamName)) {
              // Don't descend into nested scopes that shadow the catch
              // parameter with their own declarations. This isn't
              // logically necessary because of the path.scope.lookup we
              // do in visitIdentifier, but it saves time.
              return false;
            }

            this.traverse(path);
          }
        });

        self.leapManager.withEntry(catchEntry, function() {
          self.explodeStatement(bodyPath);
        });
      }

      if (finallyLoc) {
        self.updateContextPrevLoc(self.mark(finallyLoc));

        self.leapManager.withEntry(finallyEntry, function() {
          self.explodeStatement(path.get("finalizer"));
        });

        self.emit(b.returnStatement(b.callExpression(
          self.contextProperty("finish"),
          [finallyEntry.firstLoc]
        )));
      }
    });

    self.mark(after);

    break;

  case "ThrowStatement":
    self.emit(b.throwStatement(
      self.explodeExpression(path.get("argument"))
    ));

    break;

  default:
    throw new Error(
      "unknown Statement of type " +
        JSON.stringify(stmt.type));
  }
};

Ep.emitAbruptCompletion = function(record) {
  if (!isValidCompletion(record)) {
    assert.ok(
      false,
      "invalid completion record: " +
        JSON.stringify(record)
    );
  }

  assert.notStrictEqual(
    record.type, "normal",
    "normal completions are not abrupt"
  );

  var abruptArgs = [b.literal(record.type)];

  if (record.type === "break" ||
      record.type === "continue") {
    n.Literal.assert(record.target);
    abruptArgs[1] = record.target;
  } else if (record.type === "return" ||
             record.type === "throw") {
    if (record.value) {
      n.Expression.assert(record.value);
      abruptArgs[1] = record.value;
    }
  }

  this.emit(
    b.returnStatement(
      b.callExpression(
        this.contextProperty("abrupt"),
        abruptArgs
      )
    )
  );
};

function isValidCompletion(record) {
  var type = record.type;

  if (type === "normal") {
    return !hasOwn.call(record, "target");
  }

  if (type === "break" ||
      type === "continue") {
    return !hasOwn.call(record, "value")
        && n.Literal.check(record.target);
  }

  if (type === "return" ||
      type === "throw") {
    return hasOwn.call(record, "value")
        && !hasOwn.call(record, "target");
  }

  return false;
}


// Not all offsets into emitter.listing are potential jump targets. For
// example, execution typically falls into the beginning of a try block
// without jumping directly there. This method returns the current offset
// without marking it, so that a switch case will not necessarily be
// generated for this offset (I say "not necessarily" because the same
// location might end up being marked in the process of emitting other
// statements). There's no logical harm in marking such locations as jump
// targets, but minimizing the number of switch cases keeps the generated
// code shorter.
Ep.getUnmarkedCurrentLoc = function() {
  return b.literal(this.listing.length);
};

// The context.prev property takes the value of context.next whenever we
// evaluate the switch statement discriminant, which is generally good
// enough for tracking the last location we jumped to, but sometimes
// context.prev needs to be more precise, such as when we fall
// successfully out of a try block and into a finally block without
// jumping. This method exists to update context.prev to the freshest
// available location. If we were implementing a full interpreter, we
// would know the location of the current instruction with complete
// precision at all times, but we don't have that luxury here, as it would
// be costly and verbose to set context.prev before every statement.
Ep.updateContextPrevLoc = function(loc) {
  if (loc) {
    n.Literal.assert(loc);

    if (loc.value === -1) {
      // If an uninitialized location literal was passed in, set its value
      // to the current this.listing.length.
      loc.value = this.listing.length;
    } else {
      // Otherwise assert that the location matches the current offset.
      assert.strictEqual(loc.value, this.listing.length);
    }

  } else {
    loc = this.getUnmarkedCurrentLoc();
  }

  // Make sure context.prev is up to date in case we fell into this try
  // statement without jumping to it. TODO Consider avoiding this
  // assignment when we know control must have jumped here.
  this.emitAssign(this.contextProperty("prev"), loc);
};

Ep.explodeExpression = function(path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var expr = path.value;
  if (expr) {
    n.Expression.assert(expr);
  } else {
    return expr;
  }

  var self = this;
  var result; // Used optionally by several cases below.

  function finish(expr) {
    n.Expression.assert(expr);
    if (ignoreResult) {
      self.emit(expr);
    } else {
      return expr;
    }
  }

  // If the expression does not contain a leap, then we either emit the
  // expression as a standalone statement or return it whole.
  if (!meta.containsLeap(expr)) {
    return finish(expr);
  }

  // If any child contains a leap (such as a yield or labeled continue or
  // break statement), then any sibling subexpressions will almost
  // certainly have to be exploded in order to maintain the order of their
  // side effects relative to the leaping child(ren).
  var hasLeapingChildren = meta.containsLeap.onlyChildren(expr);

  // In order to save the rest of explodeExpression from a combinatorial
  // trainwreck of special cases, explodeViaTempVar is responsible for
  // deciding when a subexpression needs to be "exploded," which is my
  // very technical term for emitting the subexpression as an assignment
  // to a temporary variable and the substituting the temporary variable
  // for the original subexpression. Think of exploded view diagrams, not
  // Michael Bay movies. The point of exploding subexpressions is to
  // control the precise order in which the generated code realizes the
  // side effects of those subexpressions.
  function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
    assert.ok(childPath instanceof types.NodePath);

    assert.ok(
      !ignoreChildResult || !tempVar,
      "Ignoring the result of a child expression but forcing it to " +
        "be assigned to a temporary variable?"
    );

    var result = self.explodeExpression(childPath, ignoreChildResult);

    if (ignoreChildResult) {
      // Side effects already emitted above.

    } else if (tempVar || (hasLeapingChildren &&
                           !n.Literal.check(result))) {
      // If tempVar was provided, then the result will always be assigned
      // to it, even if the result does not otherwise need to be assigned
      // to a temporary variable.  When no tempVar is provided, we have
      // the flexibility to decide whether a temporary variable is really
      // necessary.  Unfortunately, in general, a temporary variable is
      // required whenever any child contains a yield expression, since it
      // is difficult to prove (at all, let alone efficiently) whether
      // this result would evaluate to the same value before and after the
      // yield (see #206).  One narrow case where we can prove it doesn't
      // matter (and thus we do not need a temporary variable) is when the
      // result in question is a Literal value.
      result = self.emitAssign(
        tempVar || self.makeTempVar(),
        result
      );
    }
    return result;
  }

  // If ignoreResult is true, then we must take full responsibility for
  // emitting the expression with all its side effects, and we should not
  // return a result.

  switch (expr.type) {
  case "MemberExpression":
    return finish(b.memberExpression(
      self.explodeExpression(path.get("object")),
      expr.computed
        ? explodeViaTempVar(null, path.get("property"))
        : expr.property,
      expr.computed
    ));

  case "CallExpression":
    var calleePath = path.get("callee");
    var argsPath = path.get("arguments");

    var newCallee;
    var newArgs = [];

    var hasLeapingArgs = false;
    argsPath.each(function(argPath) {
      hasLeapingArgs = hasLeapingArgs ||
        meta.containsLeap(argPath.value);
    });

    if (n.MemberExpression.check(calleePath.value)) {
      if (hasLeapingArgs) {
        // If the arguments of the CallExpression contained any yield
        // expressions, then we need to be sure to evaluate the callee
        // before evaluating the arguments, but if the callee was a member
        // expression, then we must be careful that the object of the
        // member expression still gets bound to `this` for the call.

        var newObject = explodeViaTempVar(
          // Assign the exploded callee.object expression to a temporary
          // variable so that we can use it twice without reevaluating it.
          self.makeTempVar(),
          calleePath.get("object")
        );

        var newProperty = calleePath.value.computed
          ? explodeViaTempVar(null, calleePath.get("property"))
          : calleePath.value.property;

        newArgs.unshift(newObject);

        newCallee = b.memberExpression(
          b.memberExpression(
            newObject,
            newProperty,
            calleePath.value.computed
          ),
          b.identifier("call"),
          false
        );

      } else {
        newCallee = self.explodeExpression(calleePath);
      }

    } else {
      newCallee = self.explodeExpression(calleePath);

      if (n.MemberExpression.check(newCallee)) {
        // If the callee was not previously a MemberExpression, then the
        // CallExpression was "unqualified," meaning its `this` object
        // should be the global object. If the exploded expression has
        // become a MemberExpression (e.g. a context property, probably a
        // temporary variable), then we need to force it to be unqualified
        // by using the (0, object.property)(...) trick; otherwise, it
        // will receive the object of the MemberExpression as its `this`
        // object.
        newCallee = b.sequenceExpression([
          b.literal(0),
          newCallee
        ]);
      }
    }

    argsPath.each(function(argPath) {
      newArgs.push(explodeViaTempVar(null, argPath));
    });

    return finish(b.callExpression(
      newCallee,
      newArgs
    ));

  case "NewExpression":
    return finish(b.newExpression(
      explodeViaTempVar(null, path.get("callee")),
      path.get("arguments").map(function(argPath) {
        return explodeViaTempVar(null, argPath);
      })
    ));

  case "ObjectExpression":
    return finish(b.objectExpression(
      path.get("properties").map(function(propPath) {
        return b.property(
          propPath.value.kind,
          propPath.value.key,
          explodeViaTempVar(null, propPath.get("value"))
        );
      })
    ));

  case "ArrayExpression":
    return finish(b.arrayExpression(
      path.get("elements").map(function(elemPath) {
        return explodeViaTempVar(null, elemPath);
      })
    ));

  case "SequenceExpression":
    var lastIndex = expr.expressions.length - 1;

    path.get("expressions").each(function(exprPath) {
      if (exprPath.name === lastIndex) {
        result = self.explodeExpression(exprPath, ignoreResult);
      } else {
        self.explodeExpression(exprPath, true);
      }
    });

    return result;

  case "LogicalExpression":
    var after = loc();

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    var left = explodeViaTempVar(result, path.get("left"));

    if (expr.operator === "&&") {
      self.jumpIfNot(left, after);
    } else {
      assert.strictEqual(expr.operator, "||");
      self.jumpIf(left, after);
    }

    explodeViaTempVar(result, path.get("right"), ignoreResult);

    self.mark(after);

    return result;

  case "ConditionalExpression":
    var elseLoc = loc();
    var after = loc();
    var test = self.explodeExpression(path.get("test"));

    self.jumpIfNot(test, elseLoc);

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    explodeViaTempVar(result, path.get("consequent"), ignoreResult);
    self.jump(after);

    self.mark(elseLoc);
    explodeViaTempVar(result, path.get("alternate"), ignoreResult);

    self.mark(after);

    return result;

  case "UnaryExpression":
    return finish(b.unaryExpression(
      expr.operator,
      // Can't (and don't need to) break up the syntax of the argument.
      // Think about delete a[b].
      self.explodeExpression(path.get("argument")),
      !!expr.prefix
    ));

  case "BinaryExpression":
    return finish(b.binaryExpression(
      expr.operator,
      explodeViaTempVar(null, path.get("left")),
      explodeViaTempVar(null, path.get("right"))
    ));

  case "AssignmentExpression":
    return finish(b.assignmentExpression(
      expr.operator,
      self.explodeExpression(path.get("left")),
      self.explodeExpression(path.get("right"))
    ));

  case "UpdateExpression":
    return finish(b.updateExpression(
      expr.operator,
      self.explodeExpression(path.get("argument")),
      expr.prefix
    ));

  case "YieldExpression":
    var after = loc();
    var arg = expr.argument && self.explodeExpression(path.get("argument"));

    if (arg && expr.delegate) {
      var result = self.makeTempVar();

      self.emit(b.returnStatement(b.callExpression(
        self.contextProperty("delegateYield"), [
          arg,
          b.literal(result.property.name),
          after
        ]
      )));

      self.mark(after);

      return result;
    }

    self.emitAssign(self.contextProperty("next"), after);
    self.emit(b.returnStatement(arg || null));
    self.mark(after);

    return self.contextProperty("sent");

  default:
    throw new Error(
      "unknown Expression of type " +
        JSON.stringify(expr.type));
  }
};

}, function(modId) { var map = {"./leap":1676544236408,"./meta":1676544236410,"./util":1676544236409}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236408, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var inherits = require("util").inherits;
var hasOwn = Object.prototype.hasOwnProperty;

function Entry() {
  assert.ok(this instanceof Entry);
}

function FunctionEntry(returnLoc) {
  Entry.call(this);
  n.Literal.assert(returnLoc);
  this.returnLoc = returnLoc;
}

inherits(FunctionEntry, Entry);
exports.FunctionEntry = FunctionEntry;

function LoopEntry(breakLoc, continueLoc, label) {
  Entry.call(this);

  n.Literal.assert(breakLoc);
  n.Literal.assert(continueLoc);

  if (label) {
    n.Identifier.assert(label);
  } else {
    label = null;
  }

  this.breakLoc = breakLoc;
  this.continueLoc = continueLoc;
  this.label = label;
}

inherits(LoopEntry, Entry);
exports.LoopEntry = LoopEntry;

function SwitchEntry(breakLoc) {
  Entry.call(this);
  n.Literal.assert(breakLoc);
  this.breakLoc = breakLoc;
}

inherits(SwitchEntry, Entry);
exports.SwitchEntry = SwitchEntry;

function TryEntry(firstLoc, catchEntry, finallyEntry) {
  Entry.call(this);

  n.Literal.assert(firstLoc);

  if (catchEntry) {
    assert.ok(catchEntry instanceof CatchEntry);
  } else {
    catchEntry = null;
  }

  if (finallyEntry) {
    assert.ok(finallyEntry instanceof FinallyEntry);
  } else {
    finallyEntry = null;
  }

  // Have to have one or the other (or both).
  assert.ok(catchEntry || finallyEntry);

  this.firstLoc = firstLoc;
  this.catchEntry = catchEntry;
  this.finallyEntry = finallyEntry;
}

inherits(TryEntry, Entry);
exports.TryEntry = TryEntry;

function CatchEntry(firstLoc, paramId) {
  Entry.call(this);

  n.Literal.assert(firstLoc);
  n.Identifier.assert(paramId);

  this.firstLoc = firstLoc;
  this.paramId = paramId;
}

inherits(CatchEntry, Entry);
exports.CatchEntry = CatchEntry;

function FinallyEntry(firstLoc, afterLoc) {
  Entry.call(this);
  n.Literal.assert(firstLoc);
  n.Literal.assert(afterLoc);
  this.firstLoc = firstLoc;
  this.afterLoc = afterLoc;
}

inherits(FinallyEntry, Entry);
exports.FinallyEntry = FinallyEntry;

function LabeledEntry(breakLoc, label) {
  Entry.call(this);

  n.Literal.assert(breakLoc);
  n.Identifier.assert(label);

  this.breakLoc = breakLoc;
  this.label = label;
}

inherits(LabeledEntry, Entry);
exports.LabeledEntry = LabeledEntry;

function LeapManager(emitter) {
  assert.ok(this instanceof LeapManager);

  var Emitter = require("./emit").Emitter;
  assert.ok(emitter instanceof Emitter);

  this.emitter = emitter;
  this.entryStack = [new FunctionEntry(emitter.finalLoc)];
}

var LMp = LeapManager.prototype;
exports.LeapManager = LeapManager;

LMp.withEntry = function(entry, callback) {
  assert.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    var popped = this.entryStack.pop();
    assert.strictEqual(popped, entry);
  }
};

LMp._findLeapLocation = function(property, label) {
  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    var entry = this.entryStack[i];
    var loc = entry[property];
    if (loc) {
      if (label) {
        if (entry.label &&
            entry.label.name === label.name) {
          return loc;
        }
      } else if (entry instanceof LabeledEntry) {
        // Ignore LabeledEntry entries unless we are actually breaking to
        // a label.
      } else {
        return loc;
      }
    }
  }

  return null;
};

LMp.getBreakLoc = function(label) {
  return this._findLeapLocation("breakLoc", label);
};

LMp.getContinueLoc = function(label) {
  return this._findLeapLocation("continueLoc", label);
};

}, function(modId) { var map = {"util":1676544236409,"./emit":1676544236407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236409, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;

exports.defaults = function(obj) {
  var len = arguments.length;
  var extension;

  for (var i = 1; i < len; ++i) {
    if ((extension = arguments[i])) {
      for (var key in extension) {
        if (hasOwn.call(extension, key) && !hasOwn.call(obj, key)) {
          obj[key] = extension[key];
        }
      }
    }
  }

  return obj;
};

exports.runtimeProperty = function(name) {
  return b.memberExpression(
    b.identifier("regeneratorRuntime"),
    b.identifier(name),
    false
  );
};

// Inspired by the isReference function from ast-util:
// https://github.com/eventualbuddha/ast-util/blob/9bf91c5ce8/lib/index.js#L466-L506
exports.isReference = function(path, name) {
  var node = path.value;

  if (!n.Identifier.check(node)) {
    return false;
  }

  if (name && node.name !== name) {
    return false;
  }

  var parent = path.parent.value;

  switch (parent.type) {
  case "VariableDeclarator":
    return path.name === "init";

  case "MemberExpression":
    return path.name === "object" || (
      parent.computed && path.name === "property"
    );

  case "FunctionExpression":
  case "FunctionDeclaration":
  case "ArrowFunctionExpression":
    if (path.name === "id") {
      return false;
    }

    if (path.parentPath.name === "params" &&
        parent.params === path.parentPath.value &&
        parent.params[path.name] === node) {
      return false;
    }

    return true;

  case "ClassDeclaration":
  case "ClassExpression":
    return path.name !== "id";

  case "CatchClause":
    return path.name !== "param";

  case "Property":
  case "MethodDefinition":
    return path.name !== "key";

  case "ImportSpecifier":
  case "ImportDefaultSpecifier":
  case "ImportNamespaceSpecifier":
  case "LabeledStatement":
    return false;

  default:
    return true;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236410, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var m = require("private").makeAccessor();
var types = require("recast").types;
var isArray = types.builtInTypes.array;
var n = types.namedTypes;
var hasOwn = Object.prototype.hasOwnProperty;

function makePredicate(propertyName, knownTypes) {
  function onlyChildren(node) {
    n.Node.assert(node);

    // Assume no side effects until we find out otherwise.
    var result = false;

    function check(child) {
      if (result) {
        // Do nothing.
      } else if (isArray.check(child)) {
        child.some(check);
      } else if (n.Node.check(child)) {
        assert.strictEqual(result, false);
        result = predicate(child);
      }
      return result;
    }

    types.eachField(node, function(name, child) {
      check(child);
    });

    return result;
  }

  function predicate(node) {
    n.Node.assert(node);

    var meta = m(node);
    if (hasOwn.call(meta, propertyName))
      return meta[propertyName];

    // Certain types are "opaque," which means they have no side
    // effects or leaps and we don't care about their subexpressions.
    if (hasOwn.call(opaqueTypes, node.type))
      return meta[propertyName] = false;

    if (hasOwn.call(knownTypes, node.type))
      return meta[propertyName] = true;

    return meta[propertyName] = onlyChildren(node);
  }

  predicate.onlyChildren = onlyChildren;

  return predicate;
}

var opaqueTypes = {
  FunctionExpression: true
};

// These types potentially have side effects regardless of what side
// effects their subexpressions have.
var sideEffectTypes = {
  CallExpression: true, // Anything could happen!
  ForInStatement: true, // Modifies the key variable.
  UnaryExpression: true, // Think delete.
  BinaryExpression: true, // Might invoke .toString() or .valueOf().
  AssignmentExpression: true, // Side-effecting by definition.
  UpdateExpression: true, // Updates are essentially assignments.
  NewExpression: true // Similar to CallExpression.
};

// These types are the direct cause of all leaps in control flow.
var leapTypes = {
  YieldExpression: true,
  BreakStatement: true,
  ContinueStatement: true,
  ReturnStatement: true,
  ThrowStatement: true
};

// All leap types are also side effect types.
for (var type in leapTypes) {
  if (hasOwn.call(leapTypes, type)) {
    sideEffectTypes[type] = leapTypes[type];
  }
}

exports.hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes);
exports.containsLeap = makePredicate("containsLeap", leapTypes);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236411, function(require, module, exports) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236404);
})()
//miniprogram-npm-outsideDeps=["assert","path","fs","through","recast","esprima-fb","defs","private",".."]
//# sourceMappingURL=index.js.map