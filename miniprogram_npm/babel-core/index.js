module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235542, function(require, module, exports) {
module.exports = require("./lib/api/node.js");

}, function(modId) {var map = {"./lib/api/node.js":1676544235543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235543, function(require, module, exports) {


exports.__esModule = true;
exports.register = register;
exports.polyfill = polyfill;
exports.transformFile = transformFile;
exports.transformFileSync = transformFileSync;
exports.parse = parse;
// istanbul ignore next

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _transformation = require("../transformation");

var _transformation2 = _interopRequireDefault(_transformation);

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _util = require("../util");

var util = _interopRequireWildcard(_util);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

exports.util = util;
exports.acorn = babylon;
exports.transform = _transformation2["default"];
exports.pipeline = _transformation.pipeline;
exports.canCompile = _util.canCompile;

var _transformationFile = require("../transformation/file");

exports.File = _interopRequire(_transformationFile);

var _transformationFileOptionsConfig = require("../transformation/file/options/config");

exports.options = _interopRequire(_transformationFileOptionsConfig);

var _transformationPlugin = require("../transformation/plugin");

exports.Plugin = _interopRequire(_transformationPlugin);

var _transformationTransformer = require("../transformation/transformer");

exports.Transformer = _interopRequire(_transformationTransformer);

var _transformationPipeline = require("../transformation/pipeline");

exports.Pipeline = _interopRequire(_transformationPipeline);

var _traversal = require("../traversal");

exports.traverse = _interopRequire(_traversal);

var _toolsBuildExternalHelpers = require("../tools/build-external-helpers");

exports.buildExternalHelpers = _interopRequire(_toolsBuildExternalHelpers);

var _package = require("../../package");

exports.version = _package.version;
exports.types = t;

/**
 * Register Babel and polyfill globally.
 */

function register(opts) {
  var callback = require("./register/node-polyfill");
  if (opts != null) callback(opts);
  return callback;
}

/**
 * Register polyfill globally.
 */

function polyfill() {
  require("../polyfill");
}

/**
 * Asynchronously transform `filename` with optional `opts`, calls `callback` when complete.
 */

function transformFile(filename, opts, callback) {
  if (_lodashLangIsFunction2["default"](opts)) {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  _fs2["default"].readFile(filename, function (err, code) {
    if (err) return callback(err);

    var result;

    try {
      result = _transformation2["default"](code, opts);
    } catch (err) {
      return callback(err);
    }

    callback(null, result);
  });
}

/**
 * Synchronous form of `transformFile`.
 */

function transformFileSync(filename) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  opts.filename = filename;
  return _transformation2["default"](_fs2["default"].readFileSync(filename, "utf8"), opts);
}

/**
 * Parse script with Babel's parser.
 */

function parse(code) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  opts.allowHashBang = true;
  opts.sourceType = "module";
  opts.ecmaVersion = Infinity;
  opts.plugins = {
    jsx: true,
    flow: true
  };
  opts.features = {};

  for (var key in _transformation2["default"].pipeline.transformers) {
    opts.features[key] = true;
  }

  var ast = babylon.parse(code, opts);

  if (opts.onToken) {
    // istanbul ignore next

    var _opts$onToken;

    (_opts$onToken = opts.onToken).push.apply(_opts$onToken, ast.tokens);
  }

  if (opts.onComment) {
    // istanbul ignore next

    var _opts$onComment;

    (_opts$onComment = opts.onComment).push.apply(_opts$onComment, ast.comments);
  }

  return ast.program;
}
}, function(modId) { var map = {"../transformation":1676544235544,"../util":1676544235570,"../types":1676544235555,"../transformation/file":1676544235592,"../transformation/plugin":1676544235548,"../transformation/transformer":1676544235547,"../transformation/pipeline":1676544235545,"../traversal":1676544235550,"../tools/build-external-helpers":1676544235705,"./register/node-polyfill":1676544235706,"../polyfill":1676544235707}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235544, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _pipeline = require("./pipeline");

var _pipeline2 = _interopRequireDefault(_pipeline);

/**
 * [Please add a description.]
 */

/**
 * [Please add a description.]
 */

var _transformers = require("./transformers");

var _transformers2 = _interopRequireDefault(_transformers);

/**
 * [Please add a description.]
 */

var _transformersDeprecated = require("./transformers/deprecated");

var _transformersDeprecated2 = _interopRequireDefault(_transformersDeprecated);

/**
 * [Please add a description.]
 */

var _transformersAliases = require("./transformers/aliases");

var _transformersAliases2 = _interopRequireDefault(_transformersAliases);

/**
 * [Please add a description.]
 */

var _transformersFilters = require("./transformers/filters");

var filters = _interopRequireWildcard(_transformersFilters);

var pipeline = new _pipeline2["default"]();

for (var key in _transformers2["default"]) {
  var transformer = _transformers2["default"][key];

  if (typeof transformer === "object") {
    var metadata = transformer.metadata = transformer.metadata || {};
    metadata.group = metadata.group || "builtin-basic";
  }
}

pipeline.addTransformers(_transformers2["default"]);
pipeline.addDeprecated(_transformersDeprecated2["default"]);
pipeline.addAliases(_transformersAliases2["default"]);
pipeline.addFilter(filters.internal);
pipeline.addFilter(filters.blacklist);
pipeline.addFilter(filters.whitelist);
pipeline.addFilter(filters.stage);
pipeline.addFilter(filters.optional);

/**
 * [Please add a description.]
 */

var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.pipeline = pipeline;
exports["default"] = transform;
module.exports = exports["default"];
}, function(modId) { var map = {"./pipeline":1676544235545,"./transformers":1676544235633,"./transformers/filters":1676544235704}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235545, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _filePluginManager = require("./file/plugin-manager");

var _filePluginManager2 = _interopRequireDefault(_filePluginManager);

var _helpersNormalizeAst = require("../helpers/normalize-ast");

var _helpersNormalizeAst2 = _interopRequireDefault(_helpersNormalizeAst);

var _plugin = require("./plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _helpersObject = require("../helpers/object");

var _helpersObject2 = _interopRequireDefault(_helpersObject);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

/**
 * [Please add a description.]
 */

var Pipeline = (function () {
  function Pipeline() {
    _classCallCheck(this, Pipeline);

    this.transformers = _helpersObject2["default"]();
    this.namespaces = _helpersObject2["default"]();
    this.deprecated = _helpersObject2["default"]();
    this.aliases = _helpersObject2["default"]();
    this.filters = [];
  }

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.addTransformers = function addTransformers(transformers) {
    for (var key in transformers) {
      this.addTransformer(key, transformers[key]);
    }
    return this;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.addTransformer = function addTransformer(key, plugin) {
    if (this.transformers[key]) throw new Error(); // todo: error

    var namespace = key.split(".")[0];
    this.namespaces[namespace] = this.namespaces[namespace] || [];
    this.namespaces[namespace].push(key);
    this.namespaces[key] = namespace;

    if (typeof plugin === "function") {
      plugin = _filePluginManager2["default"].memoisePluginContainer(plugin);
      plugin.key = key;
      plugin.metadata.optional = true;

      if (key === "react.displayName") {
        plugin.metadata.optional = false;
      }
    } else {
      plugin = new _plugin2["default"](key, plugin);
    }

    this.transformers[key] = plugin;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.addAliases = function addAliases(names) {
    _lodashObjectAssign2["default"](this.aliases, names);
    return this;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.addDeprecated = function addDeprecated(names) {
    _lodashObjectAssign2["default"](this.deprecated, names);
    return this;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.addFilter = function addFilter(filter) {
    this.filters.push(filter);
    return this;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.canTransform = function canTransform(plugin, fileOpts) {
    if (plugin.metadata.plugin) {
      return true;
    }

    var _arr = this.filters;
    for (var _i = 0; _i < _arr.length; _i++) {
      var filter = _arr[_i];
      var result = filter(plugin, fileOpts);
      if (result != null) return result;
    }

    return true;
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.analyze = function analyze(code) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    opts.code = false;
    return this.transform(code, opts);
  };

  /**
   * Build dependency graph by recursing `metadata.modules`. WIP.
   */

  Pipeline.prototype.pretransform = function pretransform(code, opts) {
    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.transform = function transform(code, opts) {
    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype.transformFromAst = function transformFromAst(ast, code, opts) {
    ast = _helpersNormalizeAst2["default"](ast);

    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  };

  /**
   * [Please add a description.]
   */

  Pipeline.prototype._ensureTransformerNames = function _ensureTransformerNames(type, rawKeys) {
    var keys = [];

    for (var i = 0; i < rawKeys.length; i++) {
      var key = rawKeys[i];
      var deprecatedKey = this.deprecated[key];
      var aliasKey = this.aliases[key];
      if (aliasKey) {
        keys.push(aliasKey);
      } else if (deprecatedKey) {
        // deprecated key, remap it to the new one
        console.error("[BABEL] The transformer " + key + " has been renamed to " + deprecatedKey);
        rawKeys.push(deprecatedKey);
      } else if (this.transformers[key]) {
        // valid key
        keys.push(key);
      } else if (this.namespaces[key]) {
        // namespace, append all transformers within this namespace
        keys = keys.concat(this.namespaces[key]);
      } else {
        // invalid key
        throw new ReferenceError("Unknown transformer " + key + " specified in " + type);
      }
    }

    return keys;
  };

  return Pipeline;
})();

exports["default"] = Pipeline;
module.exports = exports["default"];
}, function(modId) { var map = {"./file/plugin-manager":1676544235546,"../helpers/normalize-ast":1676544235632,"./plugin":1676544235548,"../helpers/object":1676544235574,"./file":1676544235592}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235546, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _transformer = require("../transformer");

var _transformer2 = _interopRequireDefault(_transformer);

var _plugin = require("../plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _types = require("../../types");

var types = _interopRequireWildcard(_types);

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _tryResolve = require("try-resolve");

var _tryResolve2 = _interopRequireDefault(_tryResolve);

var _traversal = require("../../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _helpersParse = require("../../helpers/parse");

var _helpersParse2 = _interopRequireDefault(_helpersParse);

/**
 * [Please add a description.]
 */

var context = {
  messages: messages,
  Transformer: _transformer2["default"],
  Plugin: _plugin2["default"],
  types: types,
  parse: _helpersParse2["default"],
  traverse: _traversal2["default"]
};

/**
 * [Please add a description.]
 */

var PluginManager = (function () {

  /**
   * [Please add a description.]
   */

  PluginManager.memoisePluginContainer = function memoisePluginContainer(fn) {
    for (var i = 0; i < PluginManager.memoisedPlugins.length; i++) {
      var plugin = PluginManager.memoisedPlugins[i];
      if (plugin.container === fn) return plugin.transformer;
    }

    var transformer = fn(context);
    PluginManager.memoisedPlugins.push({
      container: fn,
      transformer: transformer
    });
    return transformer;
  };

  /**
   * [Please add a description.]
   */

  _createClass(PluginManager, null, [{
    key: "memoisedPlugins",

    /**
     * [Please add a description.]
     */

    value: [],
    enumerable: true
  }, {
    key: "positions",
    value: ["before", "after"],

    /**
     * [Please add a description.]
     */

    enumerable: true
  }]);

  function PluginManager() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? { transformers: {}, before: [], after: [] } : arguments[0];

    var file = _ref.file;
    var transformers = _ref.transformers;
    var before = _ref.before;
    var after = _ref.after;

    _classCallCheck(this, PluginManager);

    this.transformers = transformers;
    this.file = file;
    this.before = before;
    this.after = after;
  }

  /**
   * [Please add a description.]
   */

  PluginManager.prototype.subnormaliseString = function subnormaliseString(name, position) {
    // this is a plugin in the form of "foobar" or "foobar:after"
    // where the optional colon is the delimiter for plugin position in the transformer stack

    var match = name.match(/^(.*?):(after|before)$/);
    if (match) {
      ;

      name = match[1];
      position = match[2];
    }var loc = _tryResolve2["default"].relative("babel-plugin-" + name) || _tryResolve2["default"].relative(name);
    if (loc) {
      var plugin = require(loc);
      return {
        position: position,
        plugin: plugin["default"] || plugin
      };
    } else {
      throw new ReferenceError(messages.get("pluginUnknown", name));
    }
  };

  /**
   * [Please add a description.]
   */

  PluginManager.prototype.validate = function validate(name, plugin) {
    // validate transformer key
    var key = plugin.key;
    if (this.transformers[key]) {
      throw new ReferenceError(messages.get("pluginKeyCollision", key));
    }

    // validate Transformer instance
    if (!plugin.buildPass || plugin.constructor.name !== "Plugin") {
      throw new TypeError(messages.get("pluginNotTransformer", name));
    }

    // register as a plugin
    plugin.metadata.plugin = true;
  };

  /**
   * [Please add a description.]
   */

  PluginManager.prototype.add = function add(name) {
    var position;
    var plugin;

    if (name) {
      if (typeof name === "object" && name.transformer) {
        plugin = name.transformer;
        position = name.position;
      } else if (typeof name !== "string") {
        // not a string so we'll just assume that it's a direct Transformer instance, if not then
        // the checks later on will complain
        plugin = name;
      }

      if (typeof name === "string") {
        var _subnormaliseString = this.subnormaliseString(name, position);

        plugin = _subnormaliseString.plugin;
        position = _subnormaliseString.position;
      }
    } else {
      throw new TypeError(messages.get("pluginIllegalKind", typeof name, name));
    }

    // default position
    position = position || "before";

    // validate position
    if (PluginManager.positions.indexOf(position) < 0) {
      throw new TypeError(messages.get("pluginIllegalPosition", position, name));
    }

    // allow plugin containers to be specified so they don't have to manually require
    if (typeof plugin === "function") {
      plugin = PluginManager.memoisePluginContainer(plugin);
    }

    //
    this.validate(name, plugin);

    // build!
    var pass = this.transformers[plugin.key] = plugin.buildPass(this.file);
    if (pass.canTransform()) {
      var stack = position === "before" ? this.before : this.after;
      stack.push(pass);
    }
  };

  return PluginManager;
})();

exports["default"] = PluginManager;
module.exports = exports["default"];
}, function(modId) { var map = {"../transformer":1676544235547,"../plugin":1676544235548,"../../types":1676544235555,"../../messages":1676544235569,"../../traversal":1676544235550,"../../helpers/parse":1676544235571}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235547, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _plugin = require("./plugin");

var _plugin2 = _interopRequireDefault(_plugin);

/**
 * [Please add a description.]
 */

var Transformer = function Transformer(key, obj) {
  _classCallCheck(this, Transformer);

  var plugin = {};

  plugin.metadata = obj.metadata;
  delete obj.metadata;

  plugin.visitor = obj;

  return new _plugin2["default"](key, plugin);
};

exports["default"] = Transformer;
module.exports = exports["default"];
}, function(modId) { var map = {"./plugin":1676544235548}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235548, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _pluginPass = require("./plugin-pass");

var _pluginPass2 = _interopRequireDefault(_pluginPass);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _traversal = require("../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

var VALID_PLUGIN_PROPERTIES = ["visitor", "metadata", "manipulateOptions", "post", "pre"];

var VALID_METADATA_PROPERTIES = ["dependencies", "optional", "stage", "group", "experimental", "secondPass"];

/**
 * [Please add a description.]
 */

var Plugin = (function () {
  function Plugin(key, plugin) {
    _classCallCheck(this, Plugin);

    Plugin.validate(key, plugin);

    plugin = _lodashObjectAssign2["default"]({}, plugin);

    var take = function take(key) {
      var val = plugin[key];
      delete plugin[key];
      return val;
    };

    this.manipulateOptions = take("manipulateOptions");
    this.metadata = take("metadata") || {};
    this.dependencies = this.metadata.dependencies || [];
    this.post = take("post");
    this.pre = take("pre");

    //

    if (this.metadata.stage != null) {
      this.metadata.optional = true;
    }

    //

    this.visitor = this.normalize(_lodashLangClone2["default"](take("visitor")) || {});
    this.key = key;
  }

  /**
   * [Please add a description.]
   */

  Plugin.validate = function validate(name, plugin) {
    for (var key in plugin) {
      if (key[0] === "_") continue;
      if (VALID_PLUGIN_PROPERTIES.indexOf(key) >= 0) continue;

      var msgType = "pluginInvalidProperty";
      if (t.TYPES.indexOf(key) >= 0) msgType = "pluginInvalidPropertyVisitor";
      throw new Error(messages.get(msgType, name, key));
    }

    for (var key in plugin.metadata) {
      if (VALID_METADATA_PROPERTIES.indexOf(key) >= 0) continue;

      throw new Error(messages.get("pluginInvalidProperty", name, "metadata." + key));
    }
  };

  /**
   * [Please add a description.]
   */

  Plugin.prototype.normalize = function normalize(visitor) {
    _traversal2["default"].explode(visitor);
    return visitor;
  };

  /**
   * [Please add a description.]
   */

  Plugin.prototype.buildPass = function buildPass(file) {
    // validate Transformer instance
    if (!(file instanceof _file2["default"])) {
      throw new TypeError(messages.get("pluginNotFile", this.key));
    }

    return new _pluginPass2["default"](file, this);
  };

  return Plugin;
})();

exports["default"] = Plugin;
module.exports = exports["default"];
}, function(modId) { var map = {"./plugin-pass":1676544235549,"../messages":1676544235569,"../traversal":1676544235550,"./file":1676544235592,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235549, function(require, module, exports) {


/**
 * This class is responsible for traversing over the provided `File`s
 * AST and running it's parent transformers handlers over it.
 */



exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _traversal = require("../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var PluginPass = (function () {
  function PluginPass(file, plugin) {
    _classCallCheck(this, PluginPass);

    this.plugin = plugin;
    this.file = file;
    this.key = plugin.key;

    if (this.canTransform() && plugin.metadata.experimental && !file.opts.experimental) {
      file.log.warn("THE TRANSFORMER " + this.key + " HAS BEEN MARKED AS EXPERIMENTAL AND IS WIP. USE AT YOUR OWN RISK. " + "THIS WILL HIGHLY LIKELY BREAK YOUR CODE SO USE WITH **EXTREME** CAUTION. ENABLE THE " + "`experimental` OPTION TO IGNORE THIS WARNING.");
    }
  }

  /**
  * [Please add a description.]
  */

  PluginPass.prototype.canTransform = function canTransform() {
    return this.file.transformerDependencies[this.key] || this.file.pipeline.canTransform(this.plugin, this.file.opts);
  };

  /**
   * [Please add a description.]
   */

  PluginPass.prototype.transform = function transform() {
    var file = this.file;
    file.log.debug("Start transformer " + this.key);
    _traversal2["default"](file.ast, this.plugin.visitor, file.scope, file);
    file.log.debug("Finish transformer " + this.key);
  };

  return PluginPass;
})();

exports["default"] = PluginPass;
module.exports = exports["default"];
}, function(modId) { var map = {"../traversal":1676544235550}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235550, function(require, module, exports) {


exports.__esModule = true;
exports["default"] = traverse;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _context = require("./context");

var _context2 = _interopRequireDefault(_context);

var _visitors = require("./visitors");

var visitors = _interopRequireWildcard(_visitors);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function traverse(parent, opts, scope, state, parentPath) {
  if (!parent) return;
  if (!opts) opts = {};

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(messages.get("traverseNeedsParent", parent.type));
    }
  }

  visitors.explode(opts);

  // array of nodes
  if (Array.isArray(parent)) {
    for (var i = 0; i < parent.length; i++) {
      traverse.node(parent[i], opts, scope, state, parentPath);
    }
  } else {
    traverse.node(parent, opts, scope, state, parentPath);
  }
}

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

/**
 * [Please add a description.]
 */

traverse.node = function (node, opts, scope, state, parentPath, skipKeys) {
  var keys = t.VISITOR_KEYS[node.type];
  if (!keys) return;

  var context = new _context2["default"](scope, opts, state, parentPath);
  var _arr = keys;
  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

/**
 * [Please add a description.]
 */

var CLEAR_KEYS = t.COMMENT_KEYS.concat(["_scopeInfo", "_paths", "tokens", "comments", "start", "end", "loc", "raw", "rawValue"]);

/**
 * [Please add a description.]
 */

traverse.clearNode = function (node) {
  for (var i = 0; i < CLEAR_KEYS.length; i++) {
    var key = CLEAR_KEYS[i];
    if (node[key] != null) node[key] = undefined;
  }
};

/**
 * [Please add a description.]
 */

var clearVisitor = {
  noScope: true,
  exit: traverse.clearNode
};

/**
 * [Please add a description.]
 */

traverse.removeProperties = function (tree) {
  traverse(tree, clearVisitor);
  traverse.clearNode(tree);

  return tree;
};

/**
 * [Please add a description.]
 */

function hasBlacklistedType(node, parent, scope, state) {
  if (node.type === state.type) {
    state.has = true;
    this.skip();
  }
}

/**
 * [Please add a description.]
 */

traverse.hasType = function (tree, scope, type, blacklistTypes) {
  // the node we're searching in is blacklisted
  if (_lodashCollectionIncludes2["default"](blacklistTypes, tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  var state = {
    has: false,
    type: type
  };

  traverse(tree, {
    blacklist: blacklistTypes,
    enter: hasBlacklistedType
  }, scope, state);

  return state.has;
};
module.exports = exports["default"];
}, function(modId) { var map = {"./context":1676544235551,"./visitors":1676544235591,"../messages":1676544235569,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235551, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _path = require("./path");

var _path2 = _interopRequireDefault(_path);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var TraversalContext = (function () {
  function TraversalContext(scope, opts, state, parentPath) {
    _classCallCheck(this, TraversalContext);

    this.queue = null;

    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }

  /**
   * [Please add a description.]
   */

  TraversalContext.prototype.shouldVisit = function shouldVisit(node) {
    var opts = this.opts;
    if (opts.enter || opts.exit) return true;

    if (opts[node.type]) return true;

    var keys = t.VISITOR_KEYS[node.type];
    if (!keys || !keys.length) return false;

    var _arr = keys;
    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      if (node[key]) return true;
    }

    return false;
  };

  /**
   * [Please add a description.]
   */

  TraversalContext.prototype.create = function create(node, obj, key, listKey) {
    var path = _path2["default"].get({
      parentPath: this.parentPath,
      parent: node,
      container: obj,
      key: key,
      listKey: listKey
    });
    path.unshiftContext(this);
    return path;
  };

  /**
   * [Please add a description.]
   */

  TraversalContext.prototype.visitMultiple = function visitMultiple(container, parent, listKey) {
    // nothing to traverse!
    if (container.length === 0) return false;

    var visited = [];

    var queue = this.queue = [];
    var stop = false;

    // build up initial queue
    for (var key = 0; key < container.length; key++) {
      var self = container[key];
      if (self && this.shouldVisit(self)) {
        queue.push(this.create(parent, container, key, listKey));
      }
    }

    // visit the queue
    var _arr2 = queue;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var path = _arr2[_i2];
      path.resync();

      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      if (path.visit()) {
        stop = true;
        break;
      }
    }

    var _arr3 = queue;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var path = _arr3[_i3];
      path.shiftContext();
    }

    this.queue = null;

    return stop;
  };

  /**
   * [Please add a description.]
   */

  TraversalContext.prototype.visitSingle = function visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      var path = this.create(node, node, key);
      path.visit();
      path.shiftContext();
    }
  };

  /**
   * [Please add a description.]
   */

  TraversalContext.prototype.visit = function visit(node, key) {
    var nodes = node[key];
    if (!nodes) return;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  };

  return TraversalContext;
})();

exports["default"] = TraversalContext;
module.exports = exports["default"];
}, function(modId) { var map = {"./path":1676544235552,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235552, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _libVirtualTypes = require("./lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_libVirtualTypes);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _scope = require("../scope");

var _scope2 = _interopRequireDefault(_scope);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var NodePath = (function () {

  /**
   * [Please add a description.]
   */

  function NodePath(hub, parent) {
    _classCallCheck(this, NodePath);

    this.contexts = [];
    this.parent = parent;
    this.data = {};
    this.hub = hub;

    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.parentPath = null;
    this.context = null;
    this.container = null;
    this.listKey = null;
    this.inList = false;
    this.parentKey = null;
    this.key = null;
    this.node = null;
    this.scope = null;
    this.type = null;
    this.typeAnnotation = null;
  }

  /**
   * [Please add a description.]
   */

  /**
   * [Please add a description.]
   */

  NodePath.get = function get(_ref) {
    var hub = _ref.hub;
    var parentPath = _ref.parentPath;
    var parent = _ref.parent;
    var container = _ref.container;
    var listKey = _ref.listKey;
    var key = _ref.key;

    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    var targetNode = container[key];
    var paths = parent._paths = parent._paths || [];
    var path;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  };

  /**
   * [Please add a description.]
   */

  NodePath.prototype.getScope = function getScope(scope) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (this.isScope()) {
      ourScope = new _scope2["default"](this, scope);
    }

    return ourScope;
  };

  /**
   * [Please add a description.]
   */

  NodePath.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  /**
   * [Please add a description.]
   */

  NodePath.prototype.getData = function getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  };

  /**
   * [Please add a description.]
   */

  NodePath.prototype.errorWithNode = function errorWithNode(msg) {
    var Error = arguments.length <= 1 || arguments[1] === undefined ? SyntaxError : arguments[1];

    return this.hub.file.errorWithNode(this.node, msg, Error);
  };

  /**
   * [Please add a description.]
   */

  NodePath.prototype.traverse = function traverse(visitor, state) {
    _index2["default"](this.node, visitor, this.scope, state, this);
  };

  return NodePath;
})();

exports["default"] = NodePath;
_lodashObjectAssign2["default"](NodePath.prototype, require("./ancestry"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./inference"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./replacement"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./evaluation"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./conversion"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./introspection"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./context"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./removal"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./modification"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./family"));
_lodashObjectAssign2["default"](NodePath.prototype, require("./comments"));

var _arr = t.TYPES;

var _loop = function () {
  var type = _arr[_i];
  var typeKey = "is" + type;
  NodePath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };
};

for (var _i = 0; _i < _arr.length; _i++) {
  _loop();
}

var _loop2 = function (type) {
  if (type[0] === "_") return "continue";
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  NodePath.prototype["is" + type] = function (opts) {
    return virtualTypes[type].checkPath(this, opts);
  };
};

for (var type in virtualTypes) {
  var _ret2 = _loop2(type);

  // istanbul ignore next
  if (_ret2 === "continue") continue;
}
module.exports = exports["default"];
}, function(modId) { var map = {"./lib/virtual-types":1676544235553,"../index":1676544235550,"../scope":1676544235568,"../../types":1676544235555,"./ancestry":1676544235575,"./inference":1676544235576,"./replacement":1676544235579,"./evaluation":1676544235581,"./conversion":1676544235582,"./introspection":1676544235583,"./context":1676544235584,"./removal":1676544235585,"./modification":1676544235587,"./family":1676544235589,"./comments":1676544235590}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235553, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _transformationHelpersReact = require("../../../transformation/helpers/react");

var react = _interopRequireWildcard(_transformationHelpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],
  checkPath: function checkPath(_ref, opts) {
    var node = _ref.node;
    var parent = _ref.parent;

    if (!t.isIdentifier(node, opts)) {
      if (t.isJSXIdentifier(node, opts)) {
        if (react.isCompatTag(node.name)) return false;
      } else {
        // not a JSXIdentifier or an Identifier
        return false;
      }
    }

    // check if node is referenced
    return t.isReferenced(node, parent);
  }
};

exports.ReferencedIdentifier = ReferencedIdentifier;
/**
 * [Please add a description.]
 */

var BindingIdentifier = {
  types: ["Identifier"],
  checkPath: function checkPath(_ref2) {
    var node = _ref2.node;
    var parent = _ref2.parent;

    return t.isBinding(node, parent);
  }
};

exports.BindingIdentifier = BindingIdentifier;
/**
 * [Please add a description.]
 */

var Statement = {
  types: ["Statement"],
  checkPath: function checkPath(_ref3) {
    var node = _ref3.node;
    var parent = _ref3.parent;

    if (t.isStatement(node)) {
      if (t.isVariableDeclaration(node)) {
        if (t.isForXStatement(parent, { left: node })) return false;
        if (t.isForStatement(parent, { init: node })) return false;
      }

      return true;
    } else {
      return false;
    }
  }
};

exports.Statement = Statement;
/**
 * [Please add a description.]
 */

var Expression = {
  types: ["Expression"],
  checkPath: function checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return t.isExpression(path.node);
    }
  }
};

exports.Expression = Expression;
/**
 * [Please add a description.]
 */

var Scope = {
  types: ["Scopable"],
  checkPath: function checkPath(path) {
    return t.isScope(path.node, path.parent);
  }
};

exports.Scope = Scope;
/**
 * [Please add a description.]
 */

var Referenced = {
  checkPath: function checkPath(path) {
    return t.isReferenced(path.node, path.parent);
  }
};

exports.Referenced = Referenced;
/**
 * [Please add a description.]
 */

var BlockScoped = {
  checkPath: function checkPath(path) {
    return t.isBlockScoped(path.node);
  }
};

exports.BlockScoped = BlockScoped;
/**
 * [Please add a description.]
 */

var Var = {
  types: ["VariableDeclaration"],
  checkPath: function checkPath(path) {
    return t.isVar(path.node);
  }
};

exports.Var = Var;
/**
 * [Please add a description.]
 */

var DirectiveLiteral = {
  types: ["Literal"],
  checkPath: function checkPath(path) {
    return path.isLiteral() && path.parentPath.isExpressionStatement();
  }
};

exports.DirectiveLiteral = DirectiveLiteral;
/**
 * [Please add a description.]
 */

var Directive = {
  types: ["ExpressionStatement"],
  checkPath: function checkPath(path) {
    return path.get("expression").isLiteral();
  }
};

exports.Directive = Directive;
/**
 * [Please add a description.]
 */

var User = {
  checkPath: function checkPath(path) {
    return path.node && !!path.node.loc;
  }
};

exports.User = User;
/**
 * [Please add a description.]
 */

var Generated = {
  checkPath: function checkPath(path) {
    return !path.isUser();
  }
};

exports.Generated = Generated;
/**
 * [Please add a description.]
 */

var Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration"],
  checkPath: function checkPath(_ref4) {
    var node = _ref4.node;

    if (t.isFlow(node)) {
      return true;
    } else if (t.isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (t.isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else {
      return false;
    }
  }
};
exports.Flow = Flow;
}, function(modId) { var map = {"../../../transformation/helpers/react":1676544235554,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235554, function(require, module, exports) {


exports.__esModule = true;
exports.isCompatTag = isCompatTag;
exports.buildChildren = buildChildren;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

var isReactComponent = t.buildMatchMemberExpression("React.Component");

exports.isReactComponent = isReactComponent;
/**
 * [Please add a description.]
 */

function isCompatTag(tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
}

/**
 * [Please add a description.]
 */

function cleanJSXElementLiteralChild(child, args) {
  var lines = child.value.split(/\r\n|\n|\r/);

  var lastNonEmptyLine = 0;

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
    }
  }

  var str = "";

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    var isFirstLine = i === 0;
    var isLastLine = i === lines.length - 1;
    var isLastNonEmptyLine = i === lastNonEmptyLine;

    // replace rendered whitespace tabs with spaces
    var trimmedLine = line.replace(/\t/g, " ");

    // trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    }

    // trim whitespace touching an endline
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }

      str += trimmedLine;
    }
  }

  if (str) args.push(t.literal(str));
}

/**
 * [Please add a description.]
 */

function buildChildren(node) {
  var elems = [];

  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];

    if (t.isLiteral(child) && typeof child.value === "string") {
      cleanJSXElementLiteralChild(child, elems);
      continue;
    }

    if (t.isJSXExpressionContainer(child)) child = child.expression;
    if (t.isJSXEmptyExpression(child)) continue;

    elems.push(child);
  }

  return elems;
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235555, function(require, module, exports) {


exports.__esModule = true;
exports.is = is;
exports.isType = isType;
exports.shallowEqual = shallowEqual;
exports.appendToMemberExpression = appendToMemberExpression;
exports.prependToMemberExpression = prependToMemberExpression;
exports.ensureBlock = ensureBlock;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.buildMatchMemberExpression = buildMatchMemberExpression;
exports.removeComments = removeComments;
exports.inheritsComments = inheritsComments;
exports.inheritTrailingComments = inheritTrailingComments;
exports.inheritLeadingComments = inheritLeadingComments;
exports.inheritInnerComments = inheritInnerComments;
exports.inherits = inherits;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _toFastProperties = require("to-fast-properties");

var _toFastProperties2 = _interopRequireDefault(_toFastProperties);

var _lodashArrayCompact = require("lodash/array/compact");

var _lodashArrayCompact2 = _interopRequireDefault(_lodashArrayCompact);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashArrayUniq = require("lodash/array/uniq");

var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);

require("./definitions/init");

var _definitions = require("./definitions");

var t = exports;

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type, skipAliasCheck) {
  var is = t["is" + type] = function (node, opts) {
    return t.is(type, node, opts, skipAliasCheck);
  };

  t["assert" + type] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
    }
  };
}

/**
 * Constants.
 */

var STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
exports.STATEMENT_OR_BLOCK_KEYS = STATEMENT_OR_BLOCK_KEYS;
var FLATTENABLE_KEYS = ["body", "expressions"];
exports.FLATTENABLE_KEYS = FLATTENABLE_KEYS;
var FOR_INIT_KEYS = ["left", "init"];
exports.FOR_INIT_KEYS = FOR_INIT_KEYS;
var COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];

exports.COMMENT_KEYS = COMMENT_KEYS;
var INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["_scopeInfo", "_paths", "start", "loc", "end"]
};

exports.INHERIT_KEYS = INHERIT_KEYS;
var BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
exports.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
var EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
exports.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
var COMPARISON_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS.concat(["in", "instanceof"]);
exports.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
var BOOLEAN_BINARY_OPERATORS = [].concat(COMPARISON_BINARY_OPERATORS, BOOLEAN_NUMBER_BINARY_OPERATORS);
exports.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
var NUMBER_BINARY_OPERATORS = ["-", "/", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];

exports.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
var BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
exports.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
var NUMBER_UNARY_OPERATORS = ["+", "-", "++", "--", "~"];
exports.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
var STRING_UNARY_OPERATORS = ["typeof"];

exports.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
exports.VISITOR_KEYS = _definitions.VISITOR_KEYS;
exports.BUILDER_KEYS = _definitions.BUILDER_KEYS;
exports.ALIAS_KEYS = _definitions.ALIAS_KEYS;

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

_lodashCollectionEach2["default"](t.VISITOR_KEYS, function (keys, type) {
  registerType(type, true);
});

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

t.FLIPPED_ALIAS_KEYS = {};

_lodashCollectionEach2["default"](t.ALIAS_KEYS, function (aliases, type) {
  _lodashCollectionEach2["default"](aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

/**
 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
 */

_lodashCollectionEach2["default"](t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type, false);
});

var TYPES = Object.keys(t.VISITOR_KEYS).concat(Object.keys(t.FLIPPED_ALIAS_KEYS));

exports.TYPES = TYPES;
/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

// @TODO should `skipAliasCheck` be removed?
/*eslint-disable no-unused-vars */

function is(type, node, opts, skipAliasCheck) {
  if (!node) return false;

  var matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

/*eslint-enable no-unused-vars */

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

function isType(nodeType, targetType) {
  if (nodeType === targetType) return true;

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;

    var _arr = aliases;
    for (var _i = 0; _i < _arr.length; _i++) {
      var alias = _arr[_i];
      if (nodeType === alias) return true;
    }
  }

  return false;
}

/**
 * [Please add a description.]
 */

_lodashCollectionEach2["default"](t.VISITOR_KEYS, function (keys, type) {
  if (t.BUILDER_KEYS[type]) return;

  var defs = {};
  _lodashCollectionEach2["default"](keys, function (key) {
    defs[key] = null;
  });
  t.BUILDER_KEYS[type] = defs;
});

/**
 * [Please add a description.]
 */

_lodashCollectionEach2["default"](t.BUILDER_KEYS, function (keys, type) {
  var builder = function builder() {
    var node = {};
    node.type = type;

    var i = 0;

    for (var key in keys) {
      var arg = arguments[i++];
      if (arg === undefined) arg = keys[key];
      node[key] = arg;
    }

    return node;
  };

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

/**
 * Test if an object is shallowly equal.
 */

function shallowEqual(actual, expected) {
  var keys = Object.keys(expected);

  var _arr2 = keys;
  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var key = _arr2[_i2];
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Append a node to a member expression.
 */

function appendToMemberExpression(member, append, computed) {
  member.object = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

/**
 * Prepend a node to a member expression.
 */

function prependToMemberExpression(member, prepend) {
  member.object = t.memberExpression(prepend, member.object);
  return member;
}

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 */

function ensureBlock(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? "body" : arguments[1];

  return node[key] = t.toBlock(node[key], node);
}

/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */

function clone(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * exluding `_private` properties.
 */

function cloneDeep(node) {
  var newNode = {};

  for (var key in node) {
    if (key[0] === "_") continue;

    var val = node[key];

    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }

    newNode[key] = val;
  }

  return newNode;
}

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

function buildMatchMemberExpression(match, allowPartial) {
  var parts = match.split(".");

  return function (member) {
    // not a member expression
    if (!t.isMemberExpression(member)) return false;

    var search = [member];
    var i = 0;

    while (search.length) {
      var node = search.shift();

      if (allowPartial && i === parts.length) {
        return true;
      }

      if (t.isIdentifier(node)) {
        // this part doesn't match
        if (parts[i] !== node.name) return false;
      } else if (t.isLiteral(node)) {
        // this part doesn't match
        if (parts[i] !== node.value) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isLiteral(node.property)) {
          // we can't deal with this
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        // we can't deal with this
        return false;
      }

      // too many parts
      if (++i > parts.length) {
        return false;
      }
    }

    return true;
  };
}

/**
 * Remove comment properties from a node.
 */

function removeComments(node) {
  var _arr3 = COMMENT_KEYS;

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var key = _arr3[_i3];
    delete node[key];
  }
  return node;
}

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */

function inheritsComments(child, parent) {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);
  return child;
}

function inheritTrailingComments(child, parent) {
  _inheritComments("trailingComments", child, parent);
}

function inheritLeadingComments(child, parent) {
  _inheritComments("leadingComments", child, parent);
}

function inheritInnerComments(child, parent) {
  _inheritComments("innerComments", child, parent);
}

function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = _lodashArrayUniq2["default"](_lodashArrayCompact2["default"]([].concat(child[key], parent[key])));
  }
}

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */

function inherits(child, parent) {
  if (!child || !parent) return child;

  var _arr4 = t.INHERIT_KEYS.optional;
  for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
    var key = _arr4[_i4];
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  var _arr5 = t.INHERIT_KEYS.force;
  for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
    var key = _arr5[_i5];
    child[key] = parent[key];
  }

  t.inheritsComments(child, parent);

  return child;
}

// Optimize property access.
_toFastProperties2["default"](t);
_toFastProperties2["default"](t.VISITOR_KEYS);

// Export all type checkers from other files.
_lodashObjectAssign2["default"](t, require("./retrievers"));
_lodashObjectAssign2["default"](t, require("./validators"));
_lodashObjectAssign2["default"](t, require("./converters"));
_lodashObjectAssign2["default"](t, require("./flow"));
}, function(modId) { var map = {"./definitions/init":1676544235556,"./definitions":1676544235557,"./retrievers":1676544235564,"./validators":1676544235565,"./converters":1676544235566,"./flow":1676544235567}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235556, function(require, module, exports) {


require("./index");

require("./core");

require("./es2015");

require("./flow");

require("./jsx");

require("./misc");

require("./experimental");
}, function(modId) { var map = {"./index":1676544235557,"./core":1676544235558,"./es2015":1676544235559,"./flow":1676544235560,"./jsx":1676544235561,"./misc":1676544235562,"./experimental":1676544235563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235557, function(require, module, exports) {


exports.__esModule = true;
exports["default"] = defineType;
var VISITOR_KEYS = {};
exports.VISITOR_KEYS = VISITOR_KEYS;
var ALIAS_KEYS = {};
exports.ALIAS_KEYS = ALIAS_KEYS;
var BUILDER_KEYS = {};

exports.BUILDER_KEYS = BUILDER_KEYS;
function builderFromArray(arr) {
  var builder = {};
  var _arr = arr;
  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];builder[key] = null;
  }return builder;
}

function defineType(type) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  opts.visitor = opts.visitor || [];
  opts.aliases = opts.aliases || [];

  if (!opts.builder) opts.builder = builderFromArray(opts.visitor);
  if (Array.isArray(opts.builder)) opts.builder = builderFromArray(opts.builder);

  VISITOR_KEYS[type] = opts.visitor;
  ALIAS_KEYS[type] = opts.aliases;
  BUILDER_KEYS[type] = opts.builder;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235558, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("ArrayExpression", {
  visitor: ["elements"],
  aliases: ["Expression"]
});

_index2["default"]("AssignmentExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});

_index2["default"]("BinaryExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

_index2["default"]("BlockStatement", {
  visitor: ["body"],
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});

_index2["default"]("BreakStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index2["default"]("CallExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

_index2["default"]("CatchClause", {
  visitor: ["param", "body"],
  aliases: ["Scopable"]
});

_index2["default"]("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Expression"]
});

_index2["default"]("ContinueStatement", {
  visitor: ["label"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index2["default"]("DebuggerStatement", {
  aliases: ["Statement"]
});

_index2["default"]("DoWhileStatement", {
  visitor: ["body", "test"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

_index2["default"]("EmptyStatement", {
  aliases: ["Statement"]
});

_index2["default"]("ExpressionStatement", {
  visitor: ["expression"],
  aliases: ["Statement"]
});

_index2["default"]("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"]
});

_index2["default"]("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

_index2["default"]("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"]
});

_index2["default"]("FunctionDeclaration", {
  builder: {
    id: null,
    params: null,
    body: null,
    generator: false,
    async: false
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Statement", "Pure", "Declaration"]
});

_index2["default"]("FunctionExpression", {
  builder: {
    id: null,
    params: null,
    body: null,
    generator: false,
    async: false
  },
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

_index2["default"]("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation"],
  aliases: ["Expression"]
});

_index2["default"]("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement"]
});

_index2["default"]("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"]
});

_index2["default"]("Literal", {
  builder: ["value"],
  aliases: ["Expression", "Pure"]
});

_index2["default"]("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});

_index2["default"]("MemberExpression", {
  builder: {
    object: null,
    property: null,
    computed: false
  },
  visitor: ["object", "property"],
  aliases: ["Expression"]
});

_index2["default"]("NewExpression", {
  visitor: ["callee", "arguments"],
  aliases: ["Expression"]
});

_index2["default"]("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"]
});

_index2["default"]("Program", {
  visitor: ["body"],
  aliases: ["Scopable", "BlockParent", "Block", "FunctionParent"]
});

_index2["default"]("Property", {
  builder: {
    kind: "init",
    key: null,
    value: null,
    computed: false
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable"]
});

_index2["default"]("RestElement", {
  visitor: ["argument", "typeAnnotation"]
});

_index2["default"]("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index2["default"]("SequenceExpression", {
  visitor: ["expressions"],
  aliases: ["Expression"]
});

_index2["default"]("SwitchCase", {
  visitor: ["test", "consequent"]
});

_index2["default"]("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"]
});

_index2["default"]("ThisExpression", {
  aliases: ["Expression"]
});

_index2["default"]("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});

_index2["default"]("TryStatement", {
  builder: ["block", "handler", "finalizer"],
  visitor: ["block", "handlers", "handler", "guardedHandlers", "finalizer"],
  aliases: ["Statement"]
});

_index2["default"]("UnaryExpression", {
  builder: {
    operator: null,
    argument: null,
    prefix: false
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});

_index2["default"]("UpdateExpression", {
  builder: {
    operator: null,
    argument: null,
    prefix: false
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});

_index2["default"]("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"]
});

_index2["default"]("VariableDeclarator", {
  visitor: ["id", "init"]
});

_index2["default"]("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});

_index2["default"]("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235559, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("AssignmentPattern", {
  visitor: ["left", "right"],
  aliases: ["Pattern"]
});

_index2["default"]("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  aliases: ["Pattern"]
});

_index2["default"]("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType"],
  aliases: ["Scopable", "Function", "Func", "BlockParent", "FunctionParent", "Expression", "Pure"]
});

_index2["default"]("ClassBody", {
  visitor: ["body"]
});

_index2["default"]("ClassDeclaration", {
  visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Statement", "Declaration"]
});

_index2["default"]("ClassExpression", {
  visitor: ["id", "body", "superClass", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"]
});

_index2["default"]("ExportAllDeclaration", {
  visitor: ["source", "exported"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

_index2["default"]("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

_index2["default"]("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"]
});

_index2["default"]("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("ForOfStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"]
});

_index2["default"]("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"]
});

_index2["default"]("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"]
});

_index2["default"]("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"]
});

_index2["default"]("MethodDefinition", {
  builder: {
    key: null,
    value: null,
    kind: "method",
    computed: false,
    "static": false
  },
  visitor: ["key", "value", "decorators"]
});

_index2["default"]("ObjectPattern", {
  visitor: ["properties", "typeAnnotation"],
  aliases: ["Pattern"]
});

_index2["default"]("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});

_index2["default"]("Super", {
  aliases: ["Expression"]
});

_index2["default"]("TaggedTemplateExpression", {
  visitor: ["tag", "quasi"],
  aliases: ["Expression"]
});

_index2["default"]("TemplateElement");

_index2["default"]("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression"]
});

_index2["default"]("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235560, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow"]
});

_index2["default"]("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("BooleanLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

_index2["default"]("ClassImplements", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

_index2["default"]("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  aliases: ["Flow"]
});

_index2["default"]("DeclareClass", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("DeclareInterface", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("DeclareModule", {
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["Flow"]
});

_index2["default"]("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  aliases: ["Flow"]
});

_index2["default"]("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

_index2["default"]("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  aliases: ["Flow"]
});

_index2["default"]("InterfaceDeclaration", {
  visitor: ["id", "typeParameters", "extends", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

_index2["default"]("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

_index2["default"]("NullLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

_index2["default"]("NumberLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

_index2["default"]("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("StringLiteralTypeAnnotation", {
  aliases: ["Flow"]
});

_index2["default"]("StringTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});

_index2["default"]("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

_index2["default"]("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow"]
});

_index2["default"]("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"]
});

_index2["default"]("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow"]
});

_index2["default"]("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow"]
});

_index2["default"]("TypeParameterDeclaration", {
  visitor: ["params"],
  aliases: ["Flow"]
});

_index2["default"]("TypeParameterInstantiation", {
  visitor: ["params"],
  aliases: ["Flow"]
});

_index2["default"]("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties"],
  aliases: ["Flow"]
});

_index2["default"]("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"]
});

_index2["default"]("ObjectTypeIndexer", {
  visitor: ["id", "key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

_index2["default"]("ObjectTypeProperty", {
  visitor: ["key", "value"],
  aliases: ["Flow", "UserWhitespacable"]
});

_index2["default"]("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"]
});

_index2["default"]("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow"]
});

_index2["default"]("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowBaseAnnotation"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235561, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["JSX", "Immutable"]
});

_index2["default"]("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["JSX", "Immutable"]
});

_index2["default"]("JSXElement", {
  visitor: ["openingElement", "closingElement", "children"],
  aliases: ["JSX", "Immutable", "Expression"]
});

_index2["default"]("JSXEmptyExpression", {
  aliases: ["JSX", "Expression"]
});

_index2["default"]("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["JSX", "Immutable"]
});

_index2["default"]("JSXIdentifier", {
  aliases: ["JSX", "Expression"]
});

_index2["default"]("JSXMemberExpression", {
  visitor: ["object", "property"],
  aliases: ["JSX", "Expression"]
});

_index2["default"]("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  aliases: ["JSX"]
});

_index2["default"]("JSXOpeningElement", {
  visitor: ["name", "attributes"],
  aliases: ["JSX", "Immutable"]
});

_index2["default"]("JSXSpreadAttribute", {
  visitor: ["argument"],
  aliases: ["JSX"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235562, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("Noop", {
  visitor: []
});

_index2["default"]("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235563, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

_index2["default"]("AwaitExpression", {
  builder: ["argument", "all"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"]
});

_index2["default"]("BindExpression", {
  visitor: ["object", "callee"]
});

_index2["default"]("ComprehensionBlock", {
  visitor: ["left", "right"]
});

_index2["default"]("ComprehensionExpression", {
  visitor: ["filter", "blocks", "body"],
  aliases: ["Expression", "Scopable"]
});

_index2["default"]("Decorator", {
  visitor: ["expression"]
});

_index2["default"]("DoExpression", {
  visitor: ["body"],
  aliases: ["Expression"]
});

_index2["default"]("SpreadProperty", {
  visitor: ["argument"],
  aliases: ["UnaryLike"]
});
}, function(modId) { var map = {"./index":1676544235557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235564, function(require, module, exports) {


exports.__esModule = true;
exports.getBindingIdentifiers = getBindingIdentifiers;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _index = require("./index");

var t = _interopRequireWildcard(_index);

/**
 * Return a list of binding identifiers associated with the input `node`.
 */

function getBindingIdentifiers(node, duplicates) {
  var search = [].concat(node);
  var ids = Object.create(null);

  while (search.length) {
    var id = search.shift();
    if (!id) continue;

    var keys = t.getBindingIdentifiers.keys[id.type];

    if (t.isIdentifier(id)) {
      if (duplicates) {
        var _ids = ids[id.name] = ids[id.name] || [];
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
    } else if (t.isExportDeclaration(id)) {
      if (t.isDeclaration(node.declaration)) {
        search.push(node.declaration);
      }
    } else if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (id[key]) {
          search = search.concat(id[key]);
        }
      }
    }
  }

  return ids;
}

/**
 * Mapping of types to their identifier keys.
 */

getBindingIdentifiers.keys = {
  DeclareClass: ["id"],
  DeclareFunction: ["id"],
  DeclareModule: ["id"],
  DeclareVariable: ["id"],
  InterfaceDeclaration: ["id"],
  TypeAlias: ["id"],

  ComprehensionExpression: ["blocks"],
  ComprehensionBlock: ["left"],

  CatchClause: ["param"],
  LabeledStatement: ["label"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],

  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  ImportDeclaration: ["specifiers"],

  FunctionDeclaration: ["id", "params"],
  FunctionExpression: ["id", "params"],

  ClassDeclaration: ["id"],
  ClassExpression: ["id"],

  RestElement: ["argument"],
  UpdateExpression: ["argument"],

  SpreadProperty: ["argument"],
  Property: ["value"],

  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],

  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"]
};
}, function(modId) { var map = {"./index":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235565, function(require, module, exports) {


exports.__esModule = true;
exports.isBinding = isBinding;
exports.isReferenced = isReferenced;
exports.isValidIdentifier = isValidIdentifier;
exports.isLet = isLet;
exports.isBlockScoped = isBlockScoped;
exports.isVar = isVar;
exports.isSpecifierDefault = isSpecifierDefault;
exports.isScope = isScope;
exports.isImmutable = isImmutable;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _retrievers = require("./retrievers");

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

var _index = require("./index");

var t = _interopRequireWildcard(_index);

/**
 * Check if the input `node` is a binding identifier.
 */

function isBinding(node, parent) {
  var keys = _retrievers.getBindingIdentifiers.keys[parent.type];
  if (keys) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return true;
      } else {
        if (val === node) return true;
      }
    }
  }

  return false;
}

/**
 * Check if the input `node` is a reference to a bound variable.
 */

function isReferenced(node, parent) {
  switch (parent.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "JSXMemberExpression":
      if (parent.property === node && parent.computed) {
        return true;
      } else if (parent.object === node) {
        return true;
      } else {
        return false;
      }

    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;

    // yes: { [NODE]: "" }
    // yes: { NODE }
    // no: { NODE: "" }
    case "Property":
      if (parent.key === node) {
        return parent.computed;
      }

    // no: var NODE = init;
    // yes: var id = NODE;
    case "VariableDeclarator":
      return parent.id !== node;

    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "ArrowFunctionExpression":
    case "FunctionDeclaration":
    case "FunctionExpression":
      var _arr = parent.params;

      for (var _i = 0; _i < _arr.length; _i++) {
        var param = _arr[_i];
        if (param === node) return false;
      }

      return parent.id !== node;

    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      if (parent.source) {
        return false;
      } else {
        return parent.local === node;
      }

    // no: <div NODE="foo" />
    case "JSXAttribute":
      return parent.name !== node;

    // no: class { NODE = value; }
    // yes: class { key = NODE; }
    case "ClassProperty":
      return parent.value === node;

    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;

    // no: class NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.id !== node;

    // yes: class { [NODE](){} }
    case "MethodDefinition":
      return parent.key === node && parent.computed;

    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;

    // no: try {} catch (NODE) {}
    case "CatchClause":
      return parent.param !== node;

    // no: function foo(...NODE) {}
    case "RestElement":
      return false;

    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return parent.right === node;

    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return parent.right === node;

    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
  }

  return true;
}

/**
 * Check if the input `name` is a valid identifier name
 * and isn't a reserved word.
 */

function isValidIdentifier(name) {
  if (typeof name !== "string" || _esutils2["default"].keyword.isReservedWordES6(name, true)) {
    return false;
  } else {
    return _esutils2["default"].keyword.isIdentifierNameES6(name);
  }
}

/**
 * Check if the input `node` is a `let` variable declaration.
 */

function isLet(node) {
  return t.isVariableDeclaration(node) && (node.kind !== "var" || node._let);
}

/**
 * Check if the input `node` is block scoped.
 */

function isBlockScoped(node) {
  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
}

/**
 * Check if the input `node` is a variable declaration.
 */

function isVar(node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !node._let;
}

/**
 * Check if the input `specifier` is a `default` import or export.
 */

function isSpecifierDefault(specifier) {
  return t.isImportDefaultSpecifier(specifier) || t.isIdentifier(specifier.imported || specifier.exported, { name: "default" });
}

/**
 * Check if the input `node` is a scope.
 */

function isScope(node, parent) {
  if (t.isBlockStatement(node) && t.isFunction(parent, { body: node })) {
    return false;
  }

  return t.isScopable(node);
}

/**
 * Check if the input `node` is definitely immutable.
 */

function isImmutable(node) {
  if (t.isType(node.type, "Immutable")) return true;

  if (t.isLiteral(node)) {
    if (node.regex) {
      // regexs are mutable
      return false;
    } else {
      // immutable!
      return true;
    }
  } else if (t.isIdentifier(node)) {
    if (node.name === "undefined") {
      // immutable!
      return true;
    } else {
      // no idea...
      return false;
    }
  }

  return false;
}
}, function(modId) { var map = {"./retrievers":1676544235564,"./index":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235566, function(require, module, exports) {


exports.__esModule = true;
exports.toComputedKey = toComputedKey;
exports.toSequenceExpression = toSequenceExpression;
exports.toKeyAlias = toKeyAlias;
exports.toIdentifier = toIdentifier;
exports.toBindingIdentifierName = toBindingIdentifierName;
exports.toStatement = toStatement;
exports.toExpression = toExpression;
exports.toBlock = toBlock;
exports.valueToNode = valueToNode;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangIsPlainObject = require("lodash/lang/isPlainObject");

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

var _lodashLangIsNumber = require("lodash/lang/isNumber");

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

var _lodashLangIsRegExp = require("lodash/lang/isRegExp");

var _lodashLangIsRegExp2 = _interopRequireDefault(_lodashLangIsRegExp);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _traversal = require("../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _index = require("./index");

var t = _interopRequireWildcard(_index);

/**
 * [Please add a description.]
 */

function toComputedKey(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? node.key || node.property : arguments[1];
  return (function () {
    if (!node.computed) {
      if (t.isIdentifier(key)) key = t.literal(key.name);
    }
    return key;
  })();
}

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their expression.
 */

function toSequenceExpression(nodes, scope) {
  var declars = [];
  var bailed = false;

  var result = convert(nodes);
  if (bailed) return;

  for (var i = 0; i < declars.length; i++) {
    scope.push(declars[i]);
  }

  return result;

  function convert(nodes) {
    var ensureLastUndefined = false;
    var exprs = [];

    var _arr = nodes;
    for (var _i = 0; _i < _arr.length; _i++) {
      var node = _arr[_i];
      if (t.isExpression(node)) {
        exprs.push(node);
      } else if (t.isExpressionStatement(node)) {
        exprs.push(node.expression);
      } else if (t.isVariableDeclaration(node)) {
        if (node.kind !== "var") return bailed = true; // bailed

        var _arr2 = node.declarations;
        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var declar = _arr2[_i2];
          var bindings = t.getBindingIdentifiers(declar);
          for (var key in bindings) {
            declars.push({
              kind: node.kind,
              id: bindings[key]
            });
          }

          if (declar.init) {
            exprs.push(t.assignmentExpression("=", declar.id, declar.init));
          }
        }

        ensureLastUndefined = true;
        continue;
      } else if (t.isIfStatement(node)) {
        var consequent = node.consequent ? convert([node.consequent]) : t.identifier("undefined");
        var alternate = node.alternate ? convert([node.alternate]) : t.identifier("undefined");
        if (!consequent || !alternate) return bailed = true;

        exprs.push(t.conditionalExpression(node.test, consequent, alternate));
      } else if (t.isBlockStatement(node)) {
        exprs.push(convert(node.body));
      } else if (t.isEmptyStatement(node)) {
        // empty statement so ensure the last item is undefined if we're last
        ensureLastUndefined = true;
        continue;
      } else {
        // bailed, we can't turn this statement into an expression
        return bailed = true;
      }

      ensureLastUndefined = false;
    }

    if (ensureLastUndefined) {
      exprs.push(t.identifier("undefined"));
    }

    //

    if (exprs.length === 1) {
      return exprs[0];
    } else {
      return t.sequenceExpression(exprs);
    }
  }
}

/**
 * [Please add a description.]
 */

function toKeyAlias(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? node.key : arguments[1];
  return (function () {
    var alias;

    if (node.kind === "method") {
      return toKeyAlias.uid++;
    } else if (t.isIdentifier(key)) {
      alias = key.name;
    } else if (t.isLiteral(key)) {
      alias = JSON.stringify(key.value);
    } else {
      alias = JSON.stringify(_traversal2["default"].removeProperties(t.cloneDeep(key)));
    }

    if (node.computed) {
      alias = "[" + alias + "]";
    }

    return alias;
  })();
}

toKeyAlias.uid = 0;

/**
 * [Please add a description.]
 */

function toIdentifier(name) {
  if (t.isIdentifier(name)) return name.name;

  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!t.isValidIdentifier(name)) {
    name = "_" + name;
  }

  return name || "_";
}

/**
 * [Please add a description.]
 */

function toBindingIdentifierName(name) {
  name = toIdentifier(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}

/**
 * [Please add a description.]
 * @returns {Object|Boolean}
 */

function toStatement(node, ignore) {
  if (t.isStatement(node)) {
    return node;
  }

  var mustHaveId = false;
  var newType;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (t.isAssignmentExpression(node)) {
    return t.expressionStatement(node);
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error("cannot turn " + node.type + " to a statement");
    }
  }

  node.type = newType;

  return node;
}

/**
 * [Please add a description.]
 */

function toExpression(node) {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (t.isClass(node)) {
    node.type = "ClassExpression";
  } else if (t.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  if (t.isExpression(node)) {
    return node;
  } else {
    throw new Error("cannot turn " + node.type + " to an expression");
  }
}

/**
 * [Please add a description.]
 */

function toBlock(node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (t.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!t.isStatement(node)) {
      if (t.isFunction(parent)) {
        node = t.returnStatement(node);
      } else {
        node = t.expressionStatement(node);
      }
    }

    node = [node];
  }

  return t.blockStatement(node);
}

/**
 * [Please add a description.]
 */

function valueToNode(value) {
  // undefined
  if (value === undefined) {
    return t.identifier("undefined");
  }

  // null, booleans, strings, numbers, regexs
  if (value === true || value === false || value === null || _lodashLangIsString2["default"](value) || _lodashLangIsNumber2["default"](value) || _lodashLangIsRegExp2["default"](value)) {
    return t.literal(value);
  }

  // array
  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(t.valueToNode));
  }

  // object
  if (_lodashLangIsPlainObject2["default"](value)) {
    var props = [];
    for (var key in value) {
      var nodeKey;
      if (t.isValidIdentifier(key)) {
        nodeKey = t.identifier(key);
      } else {
        nodeKey = t.literal(key);
      }
      props.push(t.property("init", nodeKey, t.valueToNode(value[key])));
    }
    return t.objectExpression(props);
  }

  throw new Error("don't know how to turn this value into a node");
}
}, function(modId) { var map = {"../traversal":1676544235550,"./index":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235567, function(require, module, exports) {


exports.__esModule = true;
exports.createUnionTypeAnnotation = createUnionTypeAnnotation;
exports.removeTypeDuplicates = removeTypeDuplicates;
exports.createTypeAnnotationBasedOnTypeof = createTypeAnnotationBasedOnTypeof;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _index = require("./index");

var t = _interopRequireWildcard(_index);

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 */

function createUnionTypeAnnotation(types) {
  var flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return t.unionTypeAnnotation(flattened);
  }
}

/**
 * Dedupe type annotations.
 */

function removeTypeDuplicates(nodes) {
  var generics = {};
  var bases = {};

  // store union type groups to circular references
  var typeGroups = [];

  var types = [];

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) continue;

    // detect duplicates
    if (types.indexOf(node) >= 0) {
      continue;
    }

    // this type matches anything
    if (t.isAnyTypeAnnotation(node)) {
      return [node];
    }

    //
    if (t.isFlowBaseAnnotation(node)) {
      bases[node.type] = node;
      continue;
    }

    //
    if (t.isUnionTypeAnnotation(node)) {
      if (typeGroups.indexOf(node.types) < 0) {
        nodes = nodes.concat(node.types);
        typeGroups.push(node.types);
      }
      continue;
    }

    // find a matching generic type and merge and deduplicate the type parameters
    if (t.isGenericTypeAnnotation(node)) {
      var _name = node.id.name;

      if (generics[_name]) {
        var existing = generics[_name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics[_name] = node;
      }

      continue;
    }

    types.push(node);
  }

  // add back in bases
  for (var type in bases) {
    types.push(bases[type]);
  }

  // add back in generics
  for (var _name2 in generics) {
    types.push(generics[_name2]);
  }

  return types;
}

/**
 * Create a type anotation based on typeof expression.
 */

function createTypeAnnotationBasedOnTypeof(type) {
  if (type === "string") {
    return t.stringTypeAnnotation();
  } else if (type === "number") {
    return t.numberTypeAnnotation();
  } else if (type === "undefined") {
    return t.voidTypeAnnotation();
  } else if (type === "boolean") {
    return t.booleanTypeAnnotation();
  } else if (type === "function") {
    return t.genericTypeAnnotation(t.identifier("Function"));
  } else if (type === "object") {
    return t.genericTypeAnnotation(t.identifier("Object"));
  } else if (type === "symbol") {
    return t.genericTypeAnnotation(t.identifier("Symbol"));
  } else {
    throw new Error("Invalid typeof value");
  }
}
}, function(modId) { var map = {"./index":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235568, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _lodashObjectDefaults = require("lodash/object/defaults");

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _binding = require("./binding");

var _binding2 = _interopRequireDefault(_binding);

var _globals = require("globals");

var _globals2 = _interopRequireDefault(_globals);

var _lodashArrayFlatten = require("lodash/array/flatten");

var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _helpersObject = require("../../helpers/object");

var _helpersObject2 = _interopRequireDefault(_helpersObject);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

var collectorVisitor = {
  For: function For() {
    var _arr = t.FOR_INIT_KEYS;

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      var declar = this.get(key);
      if (declar.isVar()) this.scope.getFunctionParent().registerBinding("var", declar);
    }
  },

  Declaration: function Declaration() {
    // delegate block scope handling to the `blockVariableVisitor`
    if (this.isBlockScoped()) return;

    // this will be hit again once we traverse into it after this iteration
    if (this.isExportDeclaration() && this.get("declaration").isDeclaration()) return;

    // we've ran into a declaration!
    this.scope.getFunctionParent().registerDeclaration(this);
  },

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    state.references.push(this);
  },

  ForXStatement: function ForXStatement(node, parent, scope, state) {
    var left = this.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      state.constantViolations.push(left);
    }
  },

  ExportDeclaration: {
    exit: function exit(node, parent, scope) {
      var declar = node.declaration;
      if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
        var binding = scope.getBinding(declar.id.name);
        if (binding) binding.reference();
      } else if (t.isVariableDeclaration(declar)) {
        var _arr2 = declar.declarations;

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var decl = _arr2[_i2];
          var ids = t.getBindingIdentifiers(decl);
          for (var _name in ids) {
            var binding = scope.getBinding(_name);
            if (binding) binding.reference();
          }
        }
      }
    }
  },

  LabeledStatement: function LabeledStatement() {
    this.scope.getProgramParent().addGlobal(this.node);
    this.scope.getBlockParent().registerDeclaration(this);
  },

  AssignmentExpression: function AssignmentExpression(node, parent, scope, state) {
    state.assignments.push(this);
  },

  UpdateExpression: function UpdateExpression(node, parent, scope, state) {
    state.constantViolations.push(this.get("argument"));
  },

  UnaryExpression: function UnaryExpression(node, parent, scope, state) {
    if (this.node.operator === "delete") {
      state.constantViolations.push(this.get("argument"));
    }
  },

  BlockScoped: function BlockScoped() {
    var scope = this.scope;
    if (scope.path === this) scope = scope.parent;
    scope.getBlockParent().registerDeclaration(this);
  },

  ClassDeclaration: function ClassDeclaration() {
    var name = this.node.id.name;
    this.scope.bindings[name] = this.scope.getBinding(name);
  },

  Block: function Block() {
    var paths = this.get("body");
    var _arr3 = paths;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var bodyPath = _arr3[_i3];
      if (bodyPath.isFunctionDeclaration()) {
        this.scope.getBlockParent().registerDeclaration(bodyPath);
      }
    }
  }
};

/**
 * [Please add a description.]
 */

var renameVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },

  /**
   * [Please add a description.]
   */

  Scope: function Scope(node, parent, scope, state) {
    if (!scope.bindingIdentifierEquals(state.oldName, state.binding)) {
      this.skip();
    }
  },

  "AssignmentExpression|Declaration": function AssignmentExpressionDeclaration(node, parent, scope, state) {
    var ids = this.getBindingIdentifiers();

    for (var name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  }
};

/**
 * [Please add a description.]
 */

var Scope = (function () {

  /**
   * This searches the current "scope" and collects all references/bindings
   * within.
   */

  function Scope(path, parent) {
    _classCallCheck(this, Scope);

    if (parent && parent.block === path.node) {
      return parent;
    }

    var cached = path.getData("scope");
    if (cached && cached.parent === parent && cached.block === path.node) {
      return cached;
    } else {
      path.setData("scope", this);
    }

    this.parent = parent;
    this.hub = path.hub;

    this.parentBlock = path.parent;
    this.block = path.node;
    this.path = path;
  }

  /**
   * Globals.
   */

  /**
   * Traverse node with current scope and path.
   */

  Scope.prototype.traverse = function traverse(node, opts, state) {
    _index2["default"](node, opts, this, state, this.path);
  };

  /**
   * Generate a unique identifier and add it to the current scope.
   */

  Scope.prototype.generateDeclaredUidIdentifier = function generateDeclaredUidIdentifier() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "temp" : arguments[0];

    var id = this.generateUidIdentifier(name);
    this.push({ id: id });
    return id;
  };

  /**
   * Generate a unique identifier.
   */

  Scope.prototype.generateUidIdentifier = function generateUidIdentifier(name) {
    return t.identifier(this.generateUid(name));
  };

  /**
   * Generate a unique `_id1` binding.
   */

  Scope.prototype.generateUid = function generateUid(name) {
    name = t.toIdentifier(name).replace(/^_+/, "");

    var uid;
    var i = 0;
    do {
      uid = this._generateUid(name, i);
      i++;
    } while (this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));

    var program = this.getProgramParent();
    program.references[uid] = true;
    program.uids[uid] = true;

    return uid;
  };

  /**
   * Generate an `_id1`.
   */

  Scope.prototype._generateUid = function _generateUid(name, i) {
    var id = name;
    if (i > 1) id += i;
    return "_" + id;
  };

  /**
   * Generate a unique identifier based on a node.
   */

  Scope.prototype.generateUidIdentifierBasedOnNode = function generateUidIdentifierBasedOnNode(parent, defaultName) {
    var node = parent;

    if (t.isAssignmentExpression(parent)) {
      node = parent.left;
    } else if (t.isVariableDeclarator(parent)) {
      node = parent.id;
    } else if (t.isProperty(node)) {
      node = node.key;
    }

    var parts = [];

    var add = function add(node) {
      if (t.isModuleDeclaration(node)) {
        if (node.source) {
          add(node.source);
        } else if (node.specifiers && node.specifiers.length) {
          var _arr4 = node.specifiers;

          for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
            var specifier = _arr4[_i4];
            add(specifier);
          }
        } else if (node.declaration) {
          add(node.declaration);
        }
      } else if (t.isModuleSpecifier(node)) {
        add(node.local);
      } else if (t.isMemberExpression(node)) {
        add(node.object);
        add(node.property);
      } else if (t.isIdentifier(node)) {
        parts.push(node.name);
      } else if (t.isLiteral(node)) {
        parts.push(node.value);
      } else if (t.isCallExpression(node)) {
        add(node.callee);
      } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
        var _arr5 = node.properties;

        for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
          var prop = _arr5[_i5];
          add(prop.key || prop.argument);
        }
      }
    };

    add(node);

    var id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";

    return this.generateUidIdentifier(id);
  };

  /**
   * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
   * evaluating it wont result in potentially arbitrary code from being ran. The following are
   * whitelisted and determined not to cause side effects:
   *
   *  - `this` expressions
   *  - `super` expressions
   *  - Bound identifiers
   */

  Scope.prototype.isStatic = function isStatic(node) {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return true;
    }

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding) {
        return binding.constant;
      } else {
        return this.hasBinding(node.name);
      }
    }

    return false;
  };

  /**
   * Possibly generate a memoised identifier if it is not static and has consequences.
   */

  Scope.prototype.maybeGenerateMemoised = function maybeGenerateMemoised(node, dontPush) {
    if (this.isStatic(node)) {
      return null;
    } else {
      var id = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush) this.push({ id: id });
      return id;
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.checkBlockScopedCollisions = function checkBlockScopedCollisions(local, kind, name, id) {
    // ignore parameters
    if (kind === "param") return;

    // ignore hoisted functions if there's also a local let
    if (kind === "hoisted" && local.kind === "let") return;

    var duplicate = false;

    // don't allow duplicate bindings to exist alongside
    if (!duplicate) duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module";

    // don't allow a local of param with a kind of let
    if (!duplicate) duplicate = local.kind === "param" && (kind === "let" || kind === "const");

    if (duplicate) {
      throw this.hub.file.errorWithNode(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.rename = function rename(oldName, newName, block) {
    newName = newName || this.generateUidIdentifier(oldName).name;

    var info = this.getBinding(oldName);
    if (!info) return;

    var state = {
      newName: newName,
      oldName: oldName,
      binding: info.identifier,
      info: info
    };

    var scope = info.scope;
    scope.traverse(block || scope.block, renameVisitor, state);

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = info;
      state.binding.name = newName;
    }

    var file = this.hub.file;
    if (file) {
      this._renameFromMap(file.moduleFormatter.localImports, oldName, newName, state.binding);
      //this._renameFromMap(file.moduleFormatter.localExports, oldName, newName);
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype._renameFromMap = function _renameFromMap(map, oldName, newName, value) {
    if (map[oldName]) {
      map[newName] = value;
      map[oldName] = null;
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.dump = function dump() {
    var sep = _repeating2["default"]("-", 60);
    console.log(sep);
    var scope = this;
    do {
      console.log("#", scope.block.type);
      for (var name in scope.bindings) {
        var binding = scope.bindings[name];
        console.log(" -", name, {
          constant: binding.constant,
          references: binding.references,
          kind: binding.kind
        });
      }
    } while (scope = scope.parent);
    console.log(sep);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.toArray = function toArray(node, i) {
    var file = this.hub.file;

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.constant && binding.path.isGenericType("Array")) return node;
    }

    if (t.isArrayExpression(node)) {
      return node;
    }

    if (t.isIdentifier(node, { name: "arguments" })) {
      return t.callExpression(t.memberExpression(file.addHelper("slice"), t.identifier("call")), [node]);
    }

    var helperName = "to-array";
    var args = [node];
    if (i === true) {
      helperName = "to-consumable-array";
    } else if (i) {
      args.push(t.literal(i));
      helperName = "sliced-to-array";
      if (this.hub.file.isLoose("es6.forOf")) helperName += "-loose";
    }
    return t.callExpression(file.addHelper(helperName), args);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.registerDeclaration = function registerDeclaration(path) {
    if (path.isLabeledStatement()) {
      this.registerBinding("label", path);
    } else if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path.get("id"), path);
    } else if (path.isVariableDeclaration()) {
      var declarations = path.get("declarations");
      var _arr6 = declarations;
      for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
        var declar = _arr6[_i6];
        this.registerBinding(path.node.kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration()) {
      var specifiers = path.get("specifiers");
      var _arr7 = specifiers;
      for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
        var specifier = _arr7[_i7];
        this.registerBinding("module", specifier);
      }
    } else if (path.isExportDeclaration()) {
      var declar = path.get("declaration");
      if (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) {
        this.registerDeclaration(declar);
      }
    } else {
      this.registerBinding("unknown", path);
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.registerConstantViolation = function registerConstantViolation(path) {
    var ids = path.getBindingIdentifiers();
    for (var _name2 in ids) {
      var binding = this.getBinding(_name2);
      if (binding) binding.reassign(path);
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.registerBinding = function registerBinding(kind, path) {
    var bindingPath = arguments.length <= 2 || arguments[2] === undefined ? path : arguments[2];
    return (function () {
      if (!kind) throw new ReferenceError("no `kind`");

      if (path.isVariableDeclaration()) {
        var declarators = path.get("declarations");
        var _arr8 = declarators;
        for (var _i8 = 0; _i8 < _arr8.length; _i8++) {
          var declar = _arr8[_i8];
          this.registerBinding(kind, declar);
        }
        return;
      }

      var parent = this.getProgramParent();
      var ids = path.getBindingIdentifiers(true);

      for (var name in ids) {
        var _arr9 = ids[name];

        for (var _i9 = 0; _i9 < _arr9.length; _i9++) {
          var id = _arr9[_i9];
          var local = this.getOwnBinding(name);
          if (local) {
            // same identifier so continue safely as we're likely trying to register it
            // multiple times
            if (local.identifier === id) continue;

            this.checkBlockScopedCollisions(local, kind, name, id);
          }

          parent.references[name] = true;

          this.bindings[name] = new _binding2["default"]({
            identifier: id,
            existing: local,
            scope: this,
            path: bindingPath,
            kind: kind
          });
        }
      }
    }).apply(this, arguments);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.addGlobal = function addGlobal(node) {
    this.globals[node.name] = node;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.hasUid = function hasUid(name) {
    var scope = this;

    do {
      if (scope.uids[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.hasGlobal = function hasGlobal(name) {
    var scope = this;

    do {
      if (scope.globals[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.hasReference = function hasReference(name) {
    var scope = this;

    do {
      if (scope.references[name]) return true;
    } while (scope = scope.parent);

    return false;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.isPure = function isPure(node, constantsOnly) {
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (!binding) return false;
      if (constantsOnly) return binding.constant;
      return true;
    } else if (t.isClass(node)) {
      return !node.superClass || this.isPure(node.superClass, constantsOnly);
    } else if (t.isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (t.isArrayExpression(node)) {
      var _arr10 = node.elements;

      for (var _i10 = 0; _i10 < _arr10.length; _i10++) {
        var elem = _arr10[_i10];
        if (!this.isPure(elem, constantsOnly)) return false;
      }
      return true;
    } else if (t.isObjectExpression(node)) {
      var _arr11 = node.properties;

      for (var _i11 = 0; _i11 < _arr11.length; _i11++) {
        var prop = _arr11[_i11];
        if (!this.isPure(prop, constantsOnly)) return false;
      }
      return true;
    } else if (t.isProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      return this.isPure(node.value, constantsOnly);
    } else {
      return t.isPure(node);
    }
  };

  /**
   * Set some arbitrary data on the current scope.
   */

  Scope.prototype.setData = function setData(key, val) {
    return this.data[key] = val;
  };

  /**
   * Recursively walk up scope tree looking for the data `key`.
   */

  Scope.prototype.getData = function getData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) return data;
    } while (scope = scope.parent);
  };

  /**
   * Recursively walk up scope tree looking for the data `key` and if it exists,
   * remove it.
   */

  Scope.prototype.removeData = function removeData(key) {
    var scope = this;
    do {
      var data = scope.data[key];
      if (data != null) scope.data[key] = null;
    } while (scope = scope.parent);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.init = function init() {
    if (!this.references) this.crawl();
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.crawl = function crawl() {
    var path = this.path;

    //

    var info = this.block._scopeInfo;
    if (info) return _lodashObjectExtend2["default"](this, info);

    info = this.block._scopeInfo = {
      references: _helpersObject2["default"](),
      bindings: _helpersObject2["default"](),
      globals: _helpersObject2["default"](),
      uids: _helpersObject2["default"](),
      data: _helpersObject2["default"]()
    };

    _lodashObjectExtend2["default"](this, info);

    // ForStatement - left, init

    if (path.isLoop()) {
      var _arr12 = t.FOR_INIT_KEYS;

      for (var _i12 = 0; _i12 < _arr12.length; _i12++) {
        var key = _arr12[_i12];
        var node = path.get(key);
        if (node.isBlockScoped()) this.registerBinding(node.node.kind, node);
      }
    }

    // FunctionExpression - id

    if (path.isFunctionExpression() && path.has("id")) {
      this.registerBinding("local", path.get("id"), path);
    }

    // Class

    if (path.isClassExpression() && path.has("id")) {
      this.registerBinding("local", path);
    }

    // Function - params, rest

    if (path.isFunction()) {
      var params = path.get("params");
      var _arr13 = params;
      for (var _i13 = 0; _i13 < _arr13.length; _i13++) {
        var param = _arr13[_i13];
        this.registerBinding("param", param);
      }
    }

    // CatchClause - param

    if (path.isCatchClause()) {
      this.registerBinding("let", path);
    }

    // ComprehensionExpression - blocks

    if (path.isComprehensionExpression()) {
      this.registerBinding("let", path);
    }

    // Program

    var parent = this.getProgramParent();
    if (parent.crawling) return;

    var state = {
      references: [],
      constantViolations: [],
      assignments: []
    };

    this.crawling = true;
    path.traverse(collectorVisitor, state);
    this.crawling = false;

    // register assignments
    for (var _iterator = state.assignments, _isArray = Array.isArray(_iterator), _i14 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i14 >= _iterator.length) break;
        _ref = _iterator[_i14++];
      } else {
        _i14 = _iterator.next();
        if (_i14.done) break;
        _ref = _i14.value;
      }

      var _path = _ref;

      // register undeclared bindings as globals
      var ids = _path.getBindingIdentifiers();
      var programParent = undefined;
      for (var _name3 in ids) {
        if (_path.scope.getBinding(_name3)) continue;

        programParent = programParent || _path.scope.getProgramParent();
        programParent.addGlobal(ids[_name3]);
      }

      // register as constant violation
      _path.scope.registerConstantViolation(_path);
    }

    // register references
    for (var _iterator2 = state.references, _isArray2 = Array.isArray(_iterator2), _i15 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i15 >= _iterator2.length) break;
        _ref2 = _iterator2[_i15++];
      } else {
        _i15 = _iterator2.next();
        if (_i15.done) break;
        _ref2 = _i15.value;
      }

      var ref = _ref2;

      var binding = ref.scope.getBinding(ref.node.name);
      if (binding) {
        binding.reference(ref);
      } else {
        ref.scope.getProgramParent().addGlobal(ref.node);
      }
    }

    // register constant violations
    for (var _iterator3 = state.constantViolations, _isArray3 = Array.isArray(_iterator3), _i16 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i16 >= _iterator3.length) break;
        _ref3 = _iterator3[_i16++];
      } else {
        _i16 = _iterator3.next();
        if (_i16.done) break;
        _ref3 = _i16.value;
      }

      var _path2 = _ref3;

      _path2.scope.registerConstantViolation(_path2);
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.push = function push(opts) {
    var path = this.path;

    if (path.isSwitchStatement()) {
      path = this.getFunctionParent().path;
    }

    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      t.ensureBlock(path.node);
      path = path.get("body");
    }

    if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }

    var unique = opts.unique;
    var kind = opts.kind || "var";
    var blockHoist = opts._blockHoist == null ? 2 : opts._blockHoist;

    var dataKey = "declaration:" + kind + ":" + blockHoist;
    var declarPath = !unique && path.getData(dataKey);

    if (!declarPath) {
      var declar = t.variableDeclaration(kind, []);
      declar._generated = true;
      declar._blockHoist = blockHoist;

      this.hub.file.attachAuxiliaryComment(declar);

      var _path$unshiftContainer = path.unshiftContainer("body", [declar]);

      declarPath = _path$unshiftContainer[0];

      if (!unique) path.setData(dataKey, declarPath);
    }

    var declarator = t.variableDeclarator(opts.id, opts.init);
    declarPath.node.declarations.push(declarator);
    this.registerBinding(kind, declarPath.get("declarations").pop());
  };

  /**
   * Walk up to the top of the scope tree and get the `Program`.
   */

  Scope.prototype.getProgramParent = function getProgramParent() {
    var scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  /**
   * Walk up the scope tree until we hit either a Function or reach the
   * very top and hit Program.
   */

  Scope.prototype.getFunctionParent = function getFunctionParent() {
    var scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  };

  /**
   * Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
   * very top and hit Program.
   */

  Scope.prototype.getBlockParent = function getBlockParent() {
    var scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  };

  /**
   * Walks the scope tree and gathers **all** bindings.
   */

  Scope.prototype.getAllBindings = function getAllBindings() {
    var ids = _helpersObject2["default"]();

    var scope = this;
    do {
      _lodashObjectDefaults2["default"](ids, scope.bindings);
      scope = scope.parent;
    } while (scope);

    return ids;
  };

  /**
   * Walks the scope tree and gathers all declarations of `kind`.
   */

  Scope.prototype.getAllBindingsOfKind = function getAllBindingsOfKind() {
    var ids = _helpersObject2["default"]();

    var _arr14 = arguments;
    for (var _i17 = 0; _i17 < _arr14.length; _i17++) {
      var kind = _arr14[_i17];
      var scope = this;
      do {
        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind === kind) ids[name] = binding;
        }
        scope = scope.parent;
      } while (scope);
    }

    return ids;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.bindingIdentifierEquals = function bindingIdentifierEquals(name, node) {
    return this.getBindingIdentifier(name) === node;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.getBinding = function getBinding(name) {
    var scope = this;

    do {
      var binding = scope.getOwnBinding(name);
      if (binding) return binding;
    } while (scope = scope.parent);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.getOwnBinding = function getOwnBinding(name) {
    return this.bindings[name];
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.getBindingIdentifier = function getBindingIdentifier(name) {
    var info = this.getBinding(name);
    return info && info.identifier;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.getOwnBindingIdentifier = function getOwnBindingIdentifier(name) {
    var binding = this.bindings[name];
    return binding && binding.identifier;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.hasOwnBinding = function hasOwnBinding(name) {
    return !!this.getOwnBinding(name);
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.hasBinding = function hasBinding(name, noGlobals) {
    if (!name) return false;
    if (this.hasOwnBinding(name)) return true;
    if (this.parentHasBinding(name, noGlobals)) return true;
    if (this.hasUid(name)) return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.globals, name)) return true;
    if (!noGlobals && _lodashCollectionIncludes2["default"](Scope.contextVariables, name)) return true;
    return false;
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.parentHasBinding = function parentHasBinding(name, noGlobals) {
    return this.parent && this.parent.hasBinding(name, noGlobals);
  };

  /**
   * Move a binding of `name` to another `scope`.
   */

  Scope.prototype.moveBindingTo = function moveBindingTo(name, scope) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.removeOwnBinding = function removeOwnBinding(name) {
    delete this.bindings[name];
  };

  /**
   * [Please add a description.]
   */

  Scope.prototype.removeBinding = function removeBinding(name) {
    // clear literal binding
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
    }

    // clear uids with this name - https://github.com/babel/babel/issues/2101
    var scope = this;
    do {
      if (scope.uids[name]) {
        scope.uids[name] = false;
      }
    } while (scope = scope.parent);
  };

  _createClass(Scope, null, [{
    key: "globals",
    value: _lodashArrayFlatten2["default"]([_globals2["default"].builtin, _globals2["default"].browser, _globals2["default"].node].map(Object.keys)),

    /**
     * Variables available in current context.
     */

    enumerable: true
  }, {
    key: "contextVariables",
    value: ["arguments", "undefined", "Infinity", "NaN"],
    enumerable: true
  }]);

  return Scope;
})();

exports["default"] = Scope;
module.exports = exports["default"];
}, function(modId) { var map = {"../index":1676544235550,"../../messages":1676544235569,"./binding":1676544235573,"../../helpers/object":1676544235574,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235569, function(require, module, exports) {


exports.__esModule = true;
exports.get = get;
exports.parseArgs = parseArgs;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _util = require("util");

var util = _interopRequireWildcard(_util);

/**
 * Mapping of messages to be used in Babel.
 * Messages can include $0-style placeholders.
 */

var MESSAGES = {
  tailCallReassignmentDeopt: "Function reference has been reassigned, so it will probably be dereferenced, therefore we can't optimise this with confidence",
  JSXNamespacedTags: "Namespace tags are not supported. ReactJSX is not XML.",
  classesIllegalBareSuper: "Illegal use of bare super",
  classesIllegalSuperCall: "Direct super call is illegal in non-constructor, use super.$1() instead",
  scopeDuplicateDeclaration: "Duplicate declaration $1",
  settersNoRest: "Setters aren't allowed to have a rest",
  noAssignmentsInForHead: "No assignments allowed in for-in/of head",
  expectedMemberExpressionOrIdentifier: "Expected type MemberExpression or Identifier",
  invalidParentForThisNode: "We don't know how to handle this node within the current parent - please open an issue",
  readOnly: "$1 is read-only",
  unknownForHead: "Unknown node type $1 in ForStatement",
  didYouMean: "Did you mean $1?",
  codeGeneratorDeopt: "Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",
  missingTemplatesDirectory: "no templates directory - this is most likely the result of a broken `npm publish`. Please report to https://github.com/babel/babel/issues",
  unsupportedOutputType: "Unsupported output type $1",
  illegalMethodName: "Illegal method name $1",
  lostTrackNodePath: "We lost track of this node's position, likely because the AST was directly manipulated",

  modulesIllegalExportName: "Illegal export $1",
  modulesDuplicateDeclarations: "Duplicate module declarations with the same source but in different scopes",

  undeclaredVariable: "Reference to undeclared variable $1",
  undeclaredVariableType: "Referencing a type alias outside of a type annotation",
  undeclaredVariableSuggestion: "Reference to undeclared variable $1 - did you mean $2?",

  traverseNeedsParent: "You must pass a scope and parentPath unless traversing a Program/File got a $1 node",
  traverseVerifyRootFunction: "You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?",
  traverseVerifyVisitorProperty: "You passed `traverse()` a visitor object with the property $1 that has the invalid property $2",
  traverseVerifyNodeType: "You gave us a visitor for the node type $1 but it's not a valid type",

  pluginIllegalKind: "Illegal kind $1 for plugin $2",
  pluginIllegalPosition: "Illegal position $1 for plugin $2",
  pluginKeyCollision: "The plugin $1 collides with another of the same name",
  pluginNotTransformer: "The plugin $1 didn't export a Plugin instance",
  pluginUnknown: "Unknown plugin $1",

  pluginNotFile: "Plugin $1 is resolving to a different Babel version than what is performing the transformation.",

  pluginInvalidProperty: "Plugin $1 provided an invalid property of $2.",
  pluginInvalidPropertyVisitor: "Define your visitor methods inside a `visitor` property like so:\n\n  new Plugin(\"foobar\", {\n    visitor: {\n      // define your visitor methods here!\n    }\n  });\n"
};

exports.MESSAGES = MESSAGES;
/**
 * Get a message with $0 placeholders replaced by arguments.
 */

function get(key) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var msg = MESSAGES[key];
  if (!msg) throw new ReferenceError("Unknown message " + JSON.stringify(key));

  // stringify args
  args = parseArgs(args);

  // replace $0 placeholders with args
  return msg.replace(/\$(\d+)/g, function (str, i) {
    return args[--i];
  });
}

/**
 * Stingify arguments to be used inside messages.
 */

function parseArgs(args) {
  return args.map(function (val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        return JSON.stringify(val) || val + "";
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}
}, function(modId) { var map = {"util":1676544235570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235570, function(require, module, exports) {


exports.__esModule = true;
exports.canCompile = canCompile;
exports.list = list;
exports.regexify = regexify;
exports.arrayify = arrayify;
exports.booleanify = booleanify;
exports.shouldIgnore = shouldIgnore;
exports.template = template;
exports.parseTemplate = parseTemplate;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashStringEscapeRegExp = require("lodash/string/escapeRegExp");

var _lodashStringEscapeRegExp2 = _interopRequireDefault(_lodashStringEscapeRegExp);

var _lodashStringStartsWith = require("lodash/string/startsWith");

var _lodashStringStartsWith2 = _interopRequireDefault(_lodashStringStartsWith);

var _lodashLangCloneDeep = require("lodash/lang/cloneDeep");

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var _lodashLangIsBoolean = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _messages = require("./messages");

var messages = _interopRequireWildcard(_messages);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

var _lodashCollectionContains = require("lodash/collection/contains");

var _lodashCollectionContains2 = _interopRequireDefault(_lodashCollectionContains);

var _traversal = require("./traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _lodashLangIsRegExp = require("lodash/lang/isRegExp");

var _lodashLangIsRegExp2 = _interopRequireDefault(_lodashLangIsRegExp);

var _lodashLangIsEmpty = require("lodash/lang/isEmpty");

var _lodashLangIsEmpty2 = _interopRequireDefault(_lodashLangIsEmpty);

var _helpersParse = require("./helpers/parse");

var _helpersParse2 = _interopRequireDefault(_helpersParse);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lodashObjectHas = require("lodash/object/has");

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _types = require("./types");

var t = _interopRequireWildcard(_types);

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var _util = require("util");

exports.inherits = _util.inherits;
exports.inspect = _util.inspect;

/**
 * Test if a filename ends with a compilable extension.
 */

function canCompile(filename, altExts) {
  var exts = altExts || canCompile.EXTENSIONS;
  var ext = _path2["default"].extname(filename);
  return _lodashCollectionContains2["default"](exts, ext);
}

/**
 * Default set of compilable extensions.
 */

canCompile.EXTENSIONS = [".js", ".jsx", ".es6", ".es"];

/**
 * Create an array from any value, splitting strings by ",".
 */

function list(val) {
  if (!val) {
    return [];
  } else if (Array.isArray(val)) {
    return val;
  } else if (typeof val === "string") {
    return val.split(",");
  } else {
    return [val];
  }
}

/**
 * Create a RegExp from a string, array, or regexp.
 */

function regexify(val) {
  if (!val) return new RegExp(/.^/);

  if (Array.isArray(val)) val = new RegExp(val.map(_lodashStringEscapeRegExp2["default"]).join("|"), "i");

  if (_lodashLangIsString2["default"](val)) {
    // normalise path separators
    val = _slash2["default"](val);

    // remove starting wildcards or relative separator if present
    if (_lodashStringStartsWith2["default"](val, "./") || _lodashStringStartsWith2["default"](val, "*/")) val = val.slice(2);
    if (_lodashStringStartsWith2["default"](val, "**/")) val = val.slice(3);

    var regex = _minimatch2["default"].makeRe(val, { nocase: true });
    return new RegExp(regex.source.slice(1, -1), "i");
  }

  if (_lodashLangIsRegExp2["default"](val)) return val;

  throw new TypeError("illegal type for regexify");
}

/**
 * Create an array from a boolean, string, or array, mapped by and optional function.
 */

function arrayify(val, mapFn) {
  if (!val) return [];
  if (_lodashLangIsBoolean2["default"](val)) return arrayify([val], mapFn);
  if (_lodashLangIsString2["default"](val)) return arrayify(list(val), mapFn);

  if (Array.isArray(val)) {
    if (mapFn) val = val.map(mapFn);
    return val;
  }

  return [val];
}

/**
 * Makes boolean-like strings into booleans.
 */

function booleanify(val) {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}

/**
 * Tests if a filename should be ignored based on "ignore" and "only" options.
 */

function shouldIgnore(filename, ignore, only) {
  filename = _slash2["default"](filename);

  if (only) {
    var _arr = only;

    for (var _i = 0; _i < _arr.length; _i++) {
      var pattern = _arr[_i];
      if (_shouldIgnore(pattern, filename)) return false;
    }
    return true;
  } else if (ignore.length) {
    var _arr2 = ignore;

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var pattern = _arr2[_i2];
      if (_shouldIgnore(pattern, filename)) return true;
    }
  }

  return false;
}

/**
 * Returns result of calling function with filename if pattern is a function.
 * Otherwise returns result of matching pattern Regex with filename.
 */

function _shouldIgnore(pattern, filename) {
  if (typeof pattern === "function") {
    return pattern(filename);
  } else {
    return pattern.test(filename);
  }
}

/**
 * A visitor for Babel templates, replaces placeholder references.
 */

var templateVisitor = {

  /**
   * 360 NoScope PWNd
   */
  noScope: true,

  enter: function enter(node, parent, scope, nodes) {
    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    if (t.isIdentifier(node) && _lodashObjectHas2["default"](nodes, node.name)) {
      this.skip();
      this.replaceInline(nodes[node.name]);
    }
  },

  exit: function exit(node) {
    _traversal2["default"].clearNode(node);
  }
};

/**
 * Create an instance of a template to use in a transformer.
 */

function template(name, nodes, keepExpression) {
  var ast = exports.templates[name];
  if (!ast) throw new ReferenceError("unknown template " + name);

  if (nodes === true) {
    keepExpression = true;
    nodes = null;
  }

  ast = _lodashLangCloneDeep2["default"](ast);

  if (!_lodashLangIsEmpty2["default"](nodes)) {
    _traversal2["default"](ast, templateVisitor, null, nodes);
  }

  if (ast.body.length > 1) return ast.body;

  var node = ast.body[0];

  if (!keepExpression && t.isExpressionStatement(node)) {
    return node.expression;
  } else {
    return node;
  }
}

/**
 * Parse a template.
 */

function parseTemplate(loc, code) {
  var ast = _helpersParse2["default"](code, { filename: loc, looseModules: true }).program;
  ast = _traversal2["default"].removeProperties(ast);
  return ast;
}

/**
 * Load templates from transformation/templates directory.
 */

function loadTemplates() {
  var templates = {};

  var templatesLoc = _path2["default"].join(__dirname, "transformation/templates");
  if (!_pathExists2["default"].sync(templatesLoc)) {
    throw new ReferenceError(messages.get("missingTemplatesDirectory"));
  }

  var _arr3 = _fs2["default"].readdirSync(templatesLoc);

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var name = _arr3[_i3];
    if (name[0] === ".") return;

    var key = _path2["default"].basename(name, _path2["default"].extname(name));
    var loc = _path2["default"].join(templatesLoc, name);
    var code = _fs2["default"].readFileSync(loc, "utf8");

    templates[key] = parseTemplate(loc, code);
  }

  return templates;
}

try {
  exports.templates = require("../templates.json");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") throw err;
  exports.templates = loadTemplates();
}
}, function(modId) { var map = {"./messages":1676544235569,"./traversal":1676544235550,"./helpers/parse":1676544235571,"./types":1676544235555,"util":1676544235570,"../templates.json":1676544235572}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235571, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

/**
 * Parse `code` with normalized options, collecting tokens and comments.
 */

exports["default"] = function (code) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var parseOpts = {
    allowImportExportEverywhere: opts.looseModules,
    allowReturnOutsideFunction: opts.looseModules,
    allowHashBang: true,
    ecmaVersion: 6,
    strictMode: opts.strictMode,
    sourceType: opts.sourceType,
    locations: true,
    features: opts.features || {},
    plugins: opts.plugins || {}
  };

  if (opts.nonStandard) {
    parseOpts.plugins.jsx = true;
    parseOpts.plugins.flow = true;
  }

  return babylon.parse(code, parseOpts);
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235572, function(require, module, exports) {
module.exports = {"abstract-expression-call":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"PROPERTY"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"referenceGet"},"computed":false},"computed":true},"arguments":[{"type":"Identifier","name":"OBJECT"}]},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"OBJECT"}]}}]},"abstract-expression-delete":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"PROPERTY"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"referenceDelete"},"computed":false},"computed":true},"arguments":[{"type":"Identifier","name":"OBJECT"}]}}]},"abstract-expression-get":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"PROPERTY"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"referenceGet"},"computed":false},"computed":true},"arguments":[{"type":"Identifier","name":"OBJECT"}]}}]},"abstract-expression-set":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"PROPERTY"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"referenceSet"},"computed":false},"computed":true},"arguments":[{"type":"Identifier","name":"OBJECT"},{"type":"Identifier","name":"VALUE"}]}}]},"array-comprehension-container":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"KEY"},"init":{"type":"ArrayExpression","elements":[]}}],"kind":"var"},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"KEY"}}]},"parenthesizedExpression":true},"arguments":[]}}]},"array-from":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"from"},"computed":false},"arguments":[{"type":"Identifier","name":"VALUE"}]}}]},"array-push":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"KEY"},"property":{"type":"Identifier","name":"push"},"computed":false},"arguments":[{"type":"Identifier","name":"STATEMENT"}]}}]},"call":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"OBJECT"},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"CONTEXT"}]}}]},"class-decorator":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"CLASS_REF"},"right":{"type":"LogicalExpression","left":{"type":"CallExpression","callee":{"type":"Identifier","name":"DECORATOR"},"arguments":[{"type":"Identifier","name":"CLASS_REF"}]},"operator":"||","right":{"type":"Identifier","name":"CLASS_REF"}}}}]},"class-derived-default-constructor":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Super"},"arguments":[{"type":"SpreadElement","argument":{"type":"Identifier","name":"arguments"}}]}}]},"parenthesizedExpression":true}}]},"default-parameter-assign":{"type":"Program","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"VARIABLE_NAME"},"operator":"===","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"VARIABLE_NAME"},"right":{"type":"Identifier","name":"DEFAULT_VALUE"}}},"alternate":null}]},"default-parameter":{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"VARIABLE_NAME"},"init":{"type":"ConditionalExpression","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARGUMENTS"},"property":{"type":"Identifier","name":"length"},"computed":false},"operator":"<=","right":{"type":"Identifier","name":"ARGUMENT_KEY"}},"operator":"||","right":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARGUMENTS"},"property":{"type":"Identifier","name":"ARGUMENT_KEY"},"computed":true},"operator":"===","right":{"type":"Identifier","name":"undefined"}}},"consequent":{"type":"Identifier","name":"DEFAULT_VALUE"},"alternate":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARGUMENTS"},"property":{"type":"Identifier","name":"ARGUMENT_KEY"},"computed":true}}}],"kind":"let"}]},"exports-assign":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"exports"},"property":{"type":"Identifier","name":"KEY"},"computed":false},"right":{"type":"Identifier","name":"VALUE"}}}]},"exports-default-assign":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"module"},"property":{"type":"Identifier","name":"exports"},"computed":false},"right":{"type":"Identifier","name":"VALUE"}}}]},"exports-from-assign":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"exports"},{"type":"Identifier","name":"ID"},{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"enumerable"},"value":{"type":"Literal","value":true},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"get"},"value":{"type":"FunctionExpression","id":{"type":"Identifier","name":"get"},"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"INIT"}}]}},"kind":"init"}]}]}}]},"exports-module-declaration-loose":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"exports"},"property":{"type":"Identifier","name":"__esModule"},"computed":false},"right":{"type":"Literal","value":true}}}]},"exports-module-declaration":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"exports"},{"type":"Literal","value":"__esModule"},{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"value"},"value":{"type":"Literal","value":true},"kind":"init"}]}]}}]},"for-of-array":{"type":"Program","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"KEY"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"KEY"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARR"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"KEY"}},"body":{"type":"ExpressionStatement","expression":{"type":"Identifier","name":"BODY"}}}]},"for-of-loose":{"type":"Program","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"LOOP_OBJECT"},"init":{"type":"Identifier","name":"OBJECT"}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"IS_ARRAY"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"isArray"},"computed":false},"arguments":[{"type":"Identifier","name":"LOOP_OBJECT"}]}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"INDEX"},"init":{"type":"Literal","value":0}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"LOOP_OBJECT"},"init":{"type":"ConditionalExpression","test":{"type":"Identifier","name":"IS_ARRAY"},"consequent":{"type":"Identifier","name":"LOOP_OBJECT"},"alternate":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"LOOP_OBJECT"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"computed":true},"arguments":[]}}}],"kind":"var"},"test":null,"update":null,"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ID"},"init":null}],"kind":"var"},{"type":"IfStatement","test":{"type":"Identifier","name":"IS_ARRAY"},"consequent":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"INDEX"},"operator":">=","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"LOOP_OBJECT"},"property":{"type":"Identifier","name":"length"},"computed":false}},"consequent":{"type":"BreakStatement","label":null},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ID"},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"LOOP_OBJECT"},"property":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"INDEX"}},"computed":true}}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"INDEX"},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"LOOP_OBJECT"},"property":{"type":"Identifier","name":"next"},"computed":false},"arguments":[]}}},{"type":"IfStatement","test":{"type":"MemberExpression","object":{"type":"Identifier","name":"INDEX"},"property":{"type":"Identifier","name":"done"},"computed":false},"consequent":{"type":"BreakStatement","label":null},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ID"},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"INDEX"},"property":{"type":"Identifier","name":"value"},"computed":false}}}]}}]}}]},"for-of":{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ITERATOR_COMPLETION"},"init":{"type":"Literal","value":true}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ITERATOR_HAD_ERROR_KEY"},"init":{"type":"Literal","value":false}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ITERATOR_ERROR_KEY"},"init":{"type":"Identifier","name":"undefined"}}],"kind":"var"},{"type":"TryStatement","block":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ITERATOR_KEY"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"OBJECT"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"computed":true},"arguments":[]}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"STEP_KEY"},"init":null}],"kind":"var"},"test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ITERATOR_COMPLETION"},"right":{"type":"MemberExpression","object":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"STEP_KEY"},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"ITERATOR_KEY"},"property":{"type":"Identifier","name":"next"},"computed":false},"arguments":[]},"parenthesizedExpression":true},"property":{"type":"Identifier","name":"done"},"computed":false},"parenthesizedExpression":true}},"update":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ITERATOR_COMPLETION"},"right":{"type":"Literal","value":true}},"body":{"type":"BlockStatement","body":[]}}]},"handler":{"type":"CatchClause","param":{"type":"Identifier","name":"err"},"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ITERATOR_HAD_ERROR_KEY"},"right":{"type":"Literal","value":true}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"ITERATOR_ERROR_KEY"},"right":{"type":"Identifier","name":"err"}}}]}},"guardedHandlers":[],"finalizer":{"type":"BlockStatement","body":[{"type":"TryStatement","block":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"Identifier","name":"ITERATOR_COMPLETION"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"ITERATOR_KEY"},"property":{"type":"Literal","value":"return"},"computed":true}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"ITERATOR_KEY"},"property":{"type":"Literal","value":"return"},"computed":true},"arguments":[]}}]},"alternate":null}]},"handler":null,"guardedHandlers":[],"finalizer":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"Identifier","name":"ITERATOR_HAD_ERROR_KEY"},"consequent":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"Identifier","name":"ITERATOR_ERROR_KEY"}}]},"alternate":null}]}}]}}]},"helper-async-to-generator":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"fn"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"gen"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"fn"},"property":{"type":"Identifier","name":"apply"},"computed":false},"arguments":[{"type":"ThisExpression"},{"type":"Identifier","name":"arguments"}]}}],"kind":"var"},{"type":"ReturnStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"Promise"},"arguments":[{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"resolve"},{"type":"Identifier","name":"reject"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"callNext"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"step"},"property":{"type":"Identifier","name":"bind"},"computed":false},"arguments":[{"type":"Literal","value":null,"rawValue":null},{"type":"Literal","value":"next"}]}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"callThrow"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"step"},"property":{"type":"Identifier","name":"bind"},"computed":false},"arguments":[{"type":"Literal","value":null,"rawValue":null},{"type":"Literal","value":"throw"}]}}],"kind":"var"},{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"step"},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"key"},{"type":"Identifier","name":"arg"}],"body":{"type":"BlockStatement","body":[{"type":"TryStatement","block":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"info"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"gen"},"property":{"type":"Identifier","name":"key"},"computed":true},"arguments":[{"type":"Identifier","name":"arg"}]}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"value"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"info"},"property":{"type":"Identifier","name":"value"},"computed":false}}],"kind":"var"}]},"handler":{"type":"CatchClause","param":{"type":"Identifier","name":"error"},"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"reject"},"arguments":[{"type":"Identifier","name":"error"}]}},{"type":"ReturnStatement","argument":null}]}},"guardedHandlers":[],"finalizer":null},{"type":"IfStatement","test":{"type":"MemberExpression","object":{"type":"Identifier","name":"info"},"property":{"type":"Identifier","name":"done"},"computed":false},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"resolve"},"arguments":[{"type":"Identifier","name":"value"}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Promise"},"property":{"type":"Identifier","name":"resolve"},"computed":false},"arguments":[{"type":"Identifier","name":"value"}]},"property":{"type":"Identifier","name":"then"},"computed":false},"arguments":[{"type":"Identifier","name":"callNext"},{"type":"Identifier","name":"callThrow"}]}}]}}]}},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"callNext"},"arguments":[]}}]}}]}}]}}}]},"parenthesizedExpression":true}}]},"helper-bind":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Function"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"bind"},"computed":false}}]},"helper-class-call-check":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"instance"},{"type":"Identifier","name":"Constructor"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"BinaryExpression","left":{"type":"Identifier","name":"instance"},"operator":"instanceof","right":{"type":"Identifier","name":"Constructor"},"parenthesizedExpression":true}},"consequent":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"Literal","value":"Cannot call a class as a function"}]}}]},"alternate":null}]},"parenthesizedExpression":true}}]},"helper-create-class":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"defineProperties"},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"props"}],"body":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"props"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"descriptor"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"props"},"property":{"type":"Identifier","name":"i"},"computed":true}}],"kind":"var"},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"enumerable"},"computed":false},"right":{"type":"LogicalExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"enumerable"},"computed":false},"operator":"||","right":{"type":"Literal","value":false}}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"configurable"},"computed":false},"right":{"type":"Literal","value":true}}},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Literal","value":"value"},"operator":"in","right":{"type":"Identifier","name":"descriptor"}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"writable"},"computed":false},"right":{"type":"Literal","value":true}}},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"target"},{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"key"},"computed":false},{"type":"Identifier","name":"descriptor"}]}}]}}]}},{"type":"ReturnStatement","argument":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"Constructor"},{"type":"Identifier","name":"protoProps"},{"type":"Identifier","name":"staticProps"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"Identifier","name":"protoProps"},"consequent":{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"defineProperties"},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"Constructor"},"property":{"type":"Identifier","name":"prototype"},"computed":false},{"type":"Identifier","name":"protoProps"}]}},"alternate":null},{"type":"IfStatement","test":{"type":"Identifier","name":"staticProps"},"consequent":{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"defineProperties"},"arguments":[{"type":"Identifier","name":"Constructor"},{"type":"Identifier","name":"staticProps"}]}},"alternate":null},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"Constructor"}}]}}}]},"parenthesizedExpression":true},"arguments":[]}}]},"helper-create-decorated-class":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"defineProperties"},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"descriptors"},{"type":"Identifier","name":"initializers"}],"body":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptors"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"descriptor"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptors"},"property":{"type":"Identifier","name":"i"},"computed":true}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"decorators"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"decorators"},"computed":false}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"key"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"key"},"computed":false}}],"kind":"var"},{"type":"ExpressionStatement","expression":{"type":"UnaryExpression","operator":"delete","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor","leadingComments":null},"property":{"type":"Identifier","name":"key"},"computed":false,"leadingComments":null},"leadingComments":null}},{"type":"ExpressionStatement","expression":{"type":"UnaryExpression","operator":"delete","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"decorators"},"computed":false}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"enumerable"},"computed":false},"right":{"type":"LogicalExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"enumerable"},"computed":false},"operator":"||","right":{"type":"Literal","value":false}}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"configurable"},"computed":false},"right":{"type":"Literal","value":true}}},{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"Literal","value":"value"},"operator":"in","right":{"type":"Identifier","name":"descriptor"}},"operator":"||","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"writable"},"computed":false},"right":{"type":"Literal","value":true}}},"alternate":null},{"type":"IfStatement","test":{"type":"Identifier","name":"decorators"},"consequent":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"f"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"f"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"decorators"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"f"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"decorator"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"decorators"},"property":{"type":"Identifier","name":"f"},"computed":true}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"decorator"}},"operator":"===","right":{"type":"Literal","value":"function"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"descriptor"},"right":{"type":"LogicalExpression","left":{"type":"CallExpression","callee":{"type":"Identifier","name":"decorator"},"arguments":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptor"}]},"operator":"||","right":{"type":"Identifier","name":"descriptor"}}}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"BinaryExpression","left":{"type":"BinaryExpression","left":{"type":"BinaryExpression","left":{"type":"Literal","value":"The decorator for method "},"operator":"+","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"key"},"computed":false}},"operator":"+","right":{"type":"Literal","value":" is of the invalid type "}},"operator":"+","right":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"decorator"}}}]}}]}}]}},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false},"operator":"!==","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"initializers"},"property":{"type":"Identifier","name":"key"},"computed":true},"right":{"type":"Identifier","name":"descriptor"}}},{"type":"ContinueStatement","label":null}]},"alternate":null}]},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptor"}]}}]}}]}},{"type":"ReturnStatement","argument":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"Constructor"},{"type":"Identifier","name":"protoProps"},{"type":"Identifier","name":"staticProps"},{"type":"Identifier","name":"protoInitializers"},{"type":"Identifier","name":"staticInitializers"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"Identifier","name":"protoProps"},"consequent":{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"defineProperties"},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"Constructor"},"property":{"type":"Identifier","name":"prototype"},"computed":false},{"type":"Identifier","name":"protoProps"},{"type":"Identifier","name":"protoInitializers"}]}},"alternate":null},{"type":"IfStatement","test":{"type":"Identifier","name":"staticProps"},"consequent":{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"defineProperties"},"arguments":[{"type":"Identifier","name":"Constructor"},{"type":"Identifier","name":"staticProps"},{"type":"Identifier","name":"staticInitializers"}]}},"alternate":null},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"Constructor"}}]}}}]},"parenthesizedExpression":true},"arguments":[]}}]},"helper-create-decorated-object":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"descriptors"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"target"},"init":{"type":"ObjectExpression","properties":[]}}],"kind":"var"},{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptors"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"descriptor"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptors"},"property":{"type":"Identifier","name":"i"},"computed":true}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"decorators"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"decorators"},"computed":false}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"key"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"key"},"computed":false}}],"kind":"var"},{"type":"ExpressionStatement","expression":{"type":"UnaryExpression","operator":"delete","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor","leadingComments":null},"property":{"type":"Identifier","name":"key"},"computed":false,"leadingComments":null},"leadingComments":null}},{"type":"ExpressionStatement","expression":{"type":"UnaryExpression","operator":"delete","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"decorators"},"computed":false}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"enumerable"},"computed":false},"right":{"type":"Literal","value":true}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"configurable"},"computed":false},"right":{"type":"Literal","value":true}}},{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"Literal","value":"value"},"operator":"in","right":{"type":"Identifier","name":"descriptor"}},"operator":"||","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"writable"},"computed":false},"right":{"type":"Literal","value":true}}},"alternate":null},{"type":"IfStatement","test":{"type":"Identifier","name":"decorators"},"consequent":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"f"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"f"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"decorators"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"f"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"decorator"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"decorators"},"property":{"type":"Identifier","name":"f"},"computed":true}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"decorator"}},"operator":"===","right":{"type":"Literal","value":"function"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"descriptor"},"right":{"type":"LogicalExpression","left":{"type":"CallExpression","callee":{"type":"Identifier","name":"decorator"},"arguments":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptor"}]},"operator":"||","right":{"type":"Identifier","name":"descriptor"}}}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"BinaryExpression","left":{"type":"BinaryExpression","left":{"type":"BinaryExpression","left":{"type":"Literal","value":"The decorator for method "},"operator":"+","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"key"},"computed":false}},"operator":"+","right":{"type":"Literal","value":" is of the invalid type "}},"operator":"+","right":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"decorator"}}}]}}]}}]}}]},"alternate":null},{"type":"IfStatement","test":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"value"},"computed":false},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"target"}]}}}]},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptor"}]}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"target"}}]},"parenthesizedExpression":true}}]},"helper-default-props":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"defaultProps"},{"type":"Identifier","name":"props"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"Identifier","name":"defaultProps"},"consequent":{"type":"BlockStatement","body":[{"type":"ForInStatement","left":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"propName"},"init":null}],"kind":"var"},"right":{"type":"Identifier","name":"defaultProps"},"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"props"},"property":{"type":"Identifier","name":"propName"},"computed":true}},"operator":"===","right":{"type":"Literal","value":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"props"},"property":{"type":"Identifier","name":"propName"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"defaultProps"},"property":{"type":"Identifier","name":"propName"},"computed":true}}}]},"alternate":null}]}}]},"alternate":null},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"props"}}]},"parenthesizedExpression":true}}]},"helper-defaults":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"defaults"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"keys"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getOwnPropertyNames"},"computed":false},"arguments":[{"type":"Identifier","name":"defaults"}]}}],"kind":"var"},{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":0}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"keys"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"key"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"keys"},"property":{"type":"Identifier","name":"i"},"computed":true}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"value"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getOwnPropertyDescriptor"},"computed":false},"arguments":[{"type":"Identifier","name":"defaults"},{"type":"Identifier","name":"key"}]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"LogicalExpression","left":{"type":"Identifier","name":"value"},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"value"},"property":{"type":"Identifier","name":"configurable"},"computed":false}},"operator":"&&","right":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"key"},"computed":true},"operator":"===","right":{"type":"Identifier","name":"undefined"}}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"value"}]}}]},"alternate":null}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"obj"}}]},"parenthesizedExpression":true}}]},"helper-define-decorated-property-descriptor":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptors"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_descriptor"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptors"},"property":{"type":"Identifier","name":"key"},"computed":true}}],"kind":"var"},{"type":"IfStatement","test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"Identifier","name":"_descriptor"}},"consequent":{"type":"ReturnStatement","argument":null,"leadingComments":null,"trailingComments":null},"alternate":null},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"descriptor","leadingComments":null},"init":{"type":"ObjectExpression","properties":[]},"leadingComments":null}],"kind":"var"},{"type":"ForInStatement","left":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_key"},"init":null}],"kind":"var"},"right":{"type":"Identifier","name":"_descriptor"},"body":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"_key"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"_descriptor"},"property":{"type":"Identifier","name":"_key"},"computed":true}},"trailingComments":null}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor","leadingComments":null},"property":{"type":"Identifier","name":"value"},"computed":false,"leadingComments":null},"right":{"type":"ConditionalExpression","test":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false},"consequent":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"descriptor"},"property":{"type":"Identifier","name":"initializer"},"computed":false},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"target"}]},"alternate":{"type":"Identifier","name":"undefined"}},"leadingComments":null}},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"target"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"descriptor"}]}}]},"parenthesizedExpression":true}}]},"helper-define-property":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"key"},{"type":"Identifier","name":"value"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"key","leadingComments":null},"operator":"in","right":{"type":"Identifier","name":"obj"},"leadingComments":null},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"},"computed":false},"arguments":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"key"},{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"value"},"value":{"type":"Identifier","name":"value"},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"enumerable"},"value":{"type":"Literal","value":true},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"configurable"},"value":{"type":"Literal","value":true},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"writable"},"value":{"type":"Literal","value":true},"kind":"init"}]}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"key"},"computed":true},"right":{"type":"Identifier","name":"value"}}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"obj"}}]},"parenthesizedExpression":true}}]},"helper-extends":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"LogicalExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"assign"},"computed":false},"operator":"||","right":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"target"}],"body":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":1}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"arguments"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"source"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"arguments"},"property":{"type":"Identifier","name":"i"},"computed":true}}],"kind":"var"},{"type":"ForInStatement","left":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"key"},"init":null}],"kind":"var"},"right":{"type":"Identifier","name":"source"},"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"hasOwnProperty"},"computed":false},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"source"},{"type":"Identifier","name":"key"}]},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"target"},"property":{"type":"Identifier","name":"key"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"source"},"property":{"type":"Identifier","name":"key"},"computed":true}}}]},"alternate":null}]}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"target"}}]}}}}]},"helper-get":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":{"type":"Identifier","name":"get"},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"object"},{"type":"Identifier","name":"property"},{"type":"Identifier","name":"receiver"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"object"},"operator":"===","right":{"type":"Literal","value":null,"rawValue":null}},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"object"},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"Function"},"property":{"type":"Identifier","name":"prototype"},"computed":false}}},"alternate":null},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"desc"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getOwnPropertyDescriptor"},"computed":false},"arguments":[{"type":"Identifier","name":"object"},{"type":"Identifier","name":"property"}]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"desc"},"operator":"===","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"parent"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getPrototypeOf"},"computed":false},"arguments":[{"type":"Identifier","name":"object"}]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"parent"},"operator":"===","right":{"type":"Literal","value":null,"rawValue":null}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"undefined"}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"Identifier","name":"get"},"arguments":[{"type":"Identifier","name":"parent"},{"type":"Identifier","name":"property"},{"type":"Identifier","name":"receiver"}]}}]}}]},"alternate":{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Literal","value":"value"},"operator":"in","right":{"type":"Identifier","name":"desc"}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"desc"},"property":{"type":"Identifier","name":"value"},"computed":false}}]},"alternate":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"getter"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"desc"},"property":{"type":"Identifier","name":"get"},"computed":false}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"getter"},"operator":"===","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"undefined"}}]},"alternate":null},{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"getter"},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"receiver"}]}}]}}}]},"parenthesizedExpression":true}}]},"helper-has-own":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"hasOwnProperty"},"computed":false}}]},"helper-inherits":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"subClass"},{"type":"Identifier","name":"superClass"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"superClass"}},"operator":"!==","right":{"type":"Literal","value":"function"}},"operator":"&&","right":{"type":"BinaryExpression","left":{"type":"Identifier","name":"superClass"},"operator":"!==","right":{"type":"Literal","value":null,"rawValue":null}}},"consequent":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"BinaryExpression","left":{"type":"Literal","value":"Super expression must either be null or a function, not "},"operator":"+","right":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"superClass"}}}]}}]},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"subClass"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"create"},"computed":false},"arguments":[{"type":"LogicalExpression","left":{"type":"Identifier","name":"superClass"},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"superClass"},"property":{"type":"Identifier","name":"prototype"},"computed":false}},{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"constructor"},"value":{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"value"},"value":{"type":"Identifier","name":"subClass"},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"enumerable"},"value":{"type":"Literal","value":false},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"writable"},"value":{"type":"Literal","value":true},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"configurable"},"value":{"type":"Literal","value":true},"kind":"init"}]},"kind":"init"}]}]}}},{"type":"IfStatement","test":{"type":"Identifier","name":"superClass"},"consequent":{"type":"ExpressionStatement","expression":{"type":"ConditionalExpression","test":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"setPrototypeOf"},"computed":false},"consequent":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"setPrototypeOf"},"computed":false},"arguments":[{"type":"Identifier","name":"subClass"},{"type":"Identifier","name":"superClass"}]},"alternate":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"subClass"},"property":{"type":"Identifier","name":"__proto__"},"computed":false},"right":{"type":"Identifier","name":"superClass"}}}},"alternate":null}]},"parenthesizedExpression":true}}]},"helper-instanceof":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"left"},{"type":"Identifier","name":"right"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"Identifier","name":"right"},"operator":"!=","right":{"type":"Literal","value":null,"rawValue":null}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"right"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"hasInstance"},"computed":false},"computed":true}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"right"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"hasInstance"},"computed":false},"computed":true},"arguments":[{"type":"Identifier","name":"left"}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"BinaryExpression","left":{"type":"Identifier","name":"left"},"operator":"instanceof","right":{"type":"Identifier","name":"right"}}}]}}]},"parenthesizedExpression":true}}]},"helper-interop-export-wildcard":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"defaults"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"newObj"},"init":{"type":"CallExpression","callee":{"type":"Identifier","name":"defaults"},"arguments":[{"type":"ObjectExpression","properties":[]},{"type":"Identifier","name":"obj"}]}}],"kind":"var"},{"type":"ExpressionStatement","expression":{"type":"UnaryExpression","operator":"delete","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"newObj"},"property":{"type":"Literal","value":"default"},"computed":true}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"newObj"}}]},"parenthesizedExpression":true}}]},"helper-interop-require-default":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"ConditionalExpression","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"obj"},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"__esModule"},"computed":false}},"consequent":{"type":"Identifier","name":"obj"},"alternate":{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Literal","value":"default"},"value":{"type":"Identifier","name":"obj"},"kind":"init"}]}}}]},"parenthesizedExpression":true}}]},"helper-interop-require-wildcard":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"obj"},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"__esModule"},"computed":false}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"obj"}}]},"alternate":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"newObj"},"init":{"type":"ObjectExpression","properties":[]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"obj"},"operator":"!=","right":{"type":"Literal","value":null,"rawValue":null}},"consequent":{"type":"BlockStatement","body":[{"type":"ForInStatement","left":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"key"},"init":null}],"kind":"var"},"right":{"type":"Identifier","name":"obj"},"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"hasOwnProperty"},"computed":false},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"key"}]},"consequent":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"newObj"},"property":{"type":"Identifier","name":"key"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"key"},"computed":true}}},"alternate":null}]}}]},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"newObj"},"property":{"type":"Literal","value":"default"},"computed":true},"right":{"type":"Identifier","name":"obj"}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"newObj"}}]}}]},"parenthesizedExpression":true}}]},"helper-interop-require":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"ConditionalExpression","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"obj"},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"__esModule"},"computed":false}},"consequent":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Literal","value":"default"},"computed":true},"alternate":{"type":"Identifier","name":"obj"}}}]},"parenthesizedExpression":true}}]},"helper-new-arrow-check":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"innerThis"},{"type":"Identifier","name":"boundThis"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"innerThis"},"operator":"!==","right":{"type":"Identifier","name":"boundThis"}},"consequent":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"Literal","value":"Cannot instantiate an arrow function"}]}}]},"alternate":null}]},"parenthesizedExpression":true}}]},"helper-object-destructuring-empty":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"obj"},"operator":"==","right":{"type":"Literal","value":null,"rawValue":null}},"consequent":{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"Literal","value":"Cannot destructure undefined"}]}},"alternate":null}]},"parenthesizedExpression":true}}]},"helper-object-without-properties":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"keys"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"target"},"init":{"type":"ObjectExpression","properties":[]}}],"kind":"var"},{"type":"ForInStatement","left":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":null}],"kind":"var"},"right":{"type":"Identifier","name":"obj"},"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"keys"},"property":{"type":"Identifier","name":"indexOf"},"computed":false},"arguments":[{"type":"Identifier","name":"i"}]},"operator":">=","right":{"type":"Literal","value":0}},"consequent":{"type":"ContinueStatement","label":null},"alternate":null},{"type":"IfStatement","test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"hasOwnProperty"},"computed":false},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"obj"},{"type":"Identifier","name":"i"}]}},"consequent":{"type":"ContinueStatement","label":null},"alternate":null},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"target"},"property":{"type":"Identifier","name":"i"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"i"},"computed":true}}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"target"}}]},"parenthesizedExpression":true}}]},"helper-self-global":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"ConditionalExpression","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"global"}},"operator":"===","right":{"type":"Literal","value":"undefined"}},"consequent":{"type":"Identifier","name":"self"},"alternate":{"type":"Identifier","name":"global"}}}]},"helper-set":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":{"type":"Identifier","name":"set"},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"object"},{"type":"Identifier","name":"property"},{"type":"Identifier","name":"value"},{"type":"Identifier","name":"receiver"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"desc"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getOwnPropertyDescriptor"},"computed":false},"arguments":[{"type":"Identifier","name":"object"},{"type":"Identifier","name":"property"}]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"desc"},"operator":"===","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"parent"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"getPrototypeOf"},"computed":false},"arguments":[{"type":"Identifier","name":"object"}]}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"parent"},"operator":"!==","right":{"type":"Literal","value":null,"rawValue":null}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"set"},"arguments":[{"type":"Identifier","name":"parent"},{"type":"Identifier","name":"property"},{"type":"Identifier","name":"value"},{"type":"Identifier","name":"receiver"}]}}]},"alternate":null}]},"alternate":{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"Literal","value":"value"},"operator":"in","right":{"type":"Identifier","name":"desc"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"desc"},"property":{"type":"Identifier","name":"writable"},"computed":false}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"desc"},"property":{"type":"Identifier","name":"value"},"computed":false},"right":{"type":"Identifier","name":"value"}}}]},"alternate":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"setter"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"desc"},"property":{"type":"Identifier","name":"set"},"computed":false}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"setter"},"operator":"!==","right":{"type":"Identifier","name":"undefined"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"setter"},"property":{"type":"Identifier","name":"call"},"computed":false},"arguments":[{"type":"Identifier","name":"receiver"},{"type":"Identifier","name":"value"}]}}]},"alternate":null}]}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"value"}}]},"parenthesizedExpression":true}}]},"helper-slice":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"prototype"},"computed":false},"property":{"type":"Identifier","name":"slice"},"computed":false}}]},"helper-sliced-to-array-loose":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"arr"},{"type":"Identifier","name":"i"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"isArray"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"arr"}}]},"alternate":{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"operator":"in","right":{"type":"CallExpression","callee":{"type":"Identifier","name":"Object"},"arguments":[{"type":"Identifier","name":"arr"}]}},"consequent":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_arr"},"init":{"type":"ArrayExpression","elements":[]}}],"kind":"var"},{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_iterator"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"arr"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"computed":true},"arguments":[]}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_step"},"init":null}],"kind":"var"},"test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"MemberExpression","object":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_step"},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"_iterator"},"property":{"type":"Identifier","name":"next"},"computed":false},"arguments":[]},"parenthesizedExpression":true},"property":{"type":"Identifier","name":"done"},"computed":false}},"update":null,"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"_arr"},"property":{"type":"Identifier","name":"push"},"computed":false},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"_step"},"property":{"type":"Identifier","name":"value"},"computed":false}]}},{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"i"},"operator":"&&","right":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"_arr"},"property":{"type":"Identifier","name":"length"},"computed":false},"operator":"===","right":{"type":"Identifier","name":"i"}}},"consequent":{"type":"BreakStatement","label":null},"alternate":null}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"_arr"}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"Literal","value":"Invalid attempt to destructure non-iterable instance"}]}}]}}}]},"parenthesizedExpression":true}}]},"helper-sliced-to-array":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"sliceIterator","leadingComments":null},"generator":false,"expression":false,"params":[{"type":"Identifier","name":"arr"},{"type":"Identifier","name":"i"}],"body":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_arr","leadingComments":null},"init":{"type":"ArrayExpression","elements":[]},"leadingComments":null}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_n"},"init":{"type":"Literal","value":true}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_d"},"init":{"type":"Literal","value":false}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_e"},"init":{"type":"Identifier","name":"undefined"}}],"kind":"var"},{"type":"TryStatement","block":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_i"},"init":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"arr"},"property":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"computed":true},"arguments":[]}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"_s"},"init":null}],"kind":"var"},"test":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_n"},"right":{"type":"MemberExpression","object":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_s"},"right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"_i"},"property":{"type":"Identifier","name":"next"},"computed":false},"arguments":[]},"parenthesizedExpression":true},"property":{"type":"Identifier","name":"done"},"computed":false},"parenthesizedExpression":true}},"update":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_n"},"right":{"type":"Literal","value":true}},"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"_arr"},"property":{"type":"Identifier","name":"push"},"computed":false},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"_s"},"property":{"type":"Identifier","name":"value"},"computed":false}]}},{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"i"},"operator":"&&","right":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"_arr"},"property":{"type":"Identifier","name":"length"},"computed":false},"operator":"===","right":{"type":"Identifier","name":"i"}}},"consequent":{"type":"BreakStatement","label":null},"alternate":null}]}}]},"handler":{"type":"CatchClause","param":{"type":"Identifier","name":"err"},"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_d"},"right":{"type":"Literal","value":true}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"_e"},"right":{"type":"Identifier","name":"err"}}}]}},"guardedHandlers":[],"finalizer":{"type":"BlockStatement","body":[{"type":"TryStatement","block":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"UnaryExpression","operator":"!","prefix":true,"argument":{"type":"Identifier","name":"_n"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"_i"},"property":{"type":"Literal","value":"return"},"computed":true}},"consequent":{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"_i"},"property":{"type":"Literal","value":"return"},"computed":true},"arguments":[]}},"alternate":null}]},"handler":null,"guardedHandlers":[],"finalizer":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"Identifier","name":"_d"},"consequent":{"type":"ThrowStatement","argument":{"type":"Identifier","name":"_e"}},"alternate":null}]}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"_arr"}}]}},{"type":"ReturnStatement","argument":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"arr"},{"type":"Identifier","name":"i"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"isArray"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"arr"}}]},"alternate":{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Identifier","name":"iterator"},"computed":false},"operator":"in","right":{"type":"CallExpression","callee":{"type":"Identifier","name":"Object"},"arguments":[{"type":"Identifier","name":"arr"}]}},"consequent":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"Identifier","name":"sliceIterator"},"arguments":[{"type":"Identifier","name":"arr"},{"type":"Identifier","name":"i"}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"TypeError"},"arguments":[{"type":"Literal","value":"Invalid attempt to destructure non-iterable instance"}]}}]}}}]}}}]},"parenthesizedExpression":true},"arguments":[]}}]},"helper-tagged-template-literal-loose":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"strings"},{"type":"Identifier","name":"raw"}],"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"strings"},"property":{"type":"Identifier","name":"raw"},"computed":false},"right":{"type":"Identifier","name":"raw"}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"strings"}}]},"parenthesizedExpression":true}}]},"helper-tagged-template-literal":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"strings"},{"type":"Identifier","name":"raw"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"freeze"},"computed":false},"arguments":[{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperties"},"computed":false},"arguments":[{"type":"Identifier","name":"strings"},{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"raw"},"value":{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"value"},"value":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"freeze"},"computed":false},"arguments":[{"type":"Identifier","name":"raw"}]},"kind":"init"}]},"kind":"init"}]}]}]}}]},"parenthesizedExpression":true}}]},"helper-temporal-assert-defined":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"val"},{"type":"Identifier","name":"name"},{"type":"Identifier","name":"undef"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"val"},"operator":"===","right":{"type":"Identifier","name":"undef"}},"consequent":{"type":"BlockStatement","body":[{"type":"ThrowStatement","argument":{"type":"NewExpression","callee":{"type":"Identifier","name":"ReferenceError"},"arguments":[{"type":"BinaryExpression","left":{"type":"Identifier","name":"name"},"operator":"+","right":{"type":"Literal","value":" is not defined - temporal dead zone"}}]}}]},"alternate":null},{"type":"ReturnStatement","argument":{"type":"Literal","value":true}}]},"parenthesizedExpression":true}}]},"helper-temporal-undefined":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"ObjectExpression","properties":[],"parenthesizedExpression":true}}]},"helper-to-array":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"arr"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"ConditionalExpression","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"isArray"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]},"consequent":{"type":"Identifier","name":"arr"},"alternate":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"from"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]}}}]},"parenthesizedExpression":true}}]},"helper-to-consumable-array":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"arr"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"isArray"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]},"consequent":{"type":"BlockStatement","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"i"},"init":{"type":"Literal","value":0}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"arr2"},"init":{"type":"CallExpression","callee":{"type":"Identifier","name":"Array"},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"arr"},"property":{"type":"Identifier","name":"length"},"computed":false}]}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"i"},"operator":"<","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"arr"},"property":{"type":"Identifier","name":"length"},"computed":false}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"i"}},"body":{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"arr2"},"property":{"type":"Identifier","name":"i"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"arr"},"property":{"type":"Identifier","name":"i"},"computed":true}}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"arr2"}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Array"},"property":{"type":"Identifier","name":"from"},"computed":false},"arguments":[{"type":"Identifier","name":"arr"}]}}]}}]},"parenthesizedExpression":true}}]},"helper-typeof-react-element":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"LogicalExpression","left":{"type":"LogicalExpression","left":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"Symbol"}},"operator":"===","right":{"type":"Literal","value":"function"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Literal","value":"for"},"computed":true}},"operator":"&&","right":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"Symbol"},"property":{"type":"Literal","value":"for"},"computed":true},"arguments":[{"type":"Literal","value":"react.element"}]}},"operator":"||","right":{"type":"Literal","value":60103}}}]},"helper-typeof":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"obj"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"ConditionalExpression","test":{"type":"LogicalExpression","left":{"type":"Identifier","name":"obj"},"operator":"&&","right":{"type":"BinaryExpression","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj"},"property":{"type":"Identifier","name":"constructor"},"computed":false},"operator":"===","right":{"type":"Identifier","name":"Symbol"}}},"consequent":{"type":"Literal","value":"symbol"},"alternate":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"obj"}}}}]},"parenthesizedExpression":true}}]},"let-scoping-return":{"type":"Program","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"RETURN"}},"operator":"===","right":{"type":"Literal","value":"object"}},"consequent":{"type":"ReturnStatement","argument":{"type":"MemberExpression","object":{"type":"Identifier","name":"RETURN"},"property":{"type":"Identifier","name":"v"},"computed":false}},"alternate":null}]},"named-function":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"GET_OUTER_ID"},"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"Identifier","name":"FUNCTION_ID"}}]}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"FUNCTION"}}]},"parenthesizedExpression":true},"arguments":[]}}]},"property-method-assignment-wrapper-generator":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"FUNCTION_KEY"}],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"FUNCTION_ID"},"generator":true,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"YieldExpression","delegate":true,"argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_KEY"},"property":{"type":"Identifier","name":"apply"},"computed":false},"arguments":[{"type":"ThisExpression"},{"type":"Identifier","name":"arguments"}]}}}]}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_ID"},"property":{"type":"Identifier","name":"toString"},"computed":false},"right":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_KEY"},"property":{"type":"Identifier","name":"toString"},"computed":false},"arguments":[]}}]}}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"FUNCTION_ID"}}]},"parenthesizedExpression":true},"arguments":[{"type":"Identifier","name":"FUNCTION"}]}}]},"property-method-assignment-wrapper":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"FUNCTION_KEY"}],"body":{"type":"BlockStatement","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"FUNCTION_ID"},"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_KEY"},"property":{"type":"Identifier","name":"apply"},"computed":false},"arguments":[{"type":"ThisExpression"},{"type":"Identifier","name":"arguments"}]}}]}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_ID"},"property":{"type":"Identifier","name":"toString"},"computed":false},"right":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"FUNCTION_KEY"},"property":{"type":"Identifier","name":"toString"},"computed":false},"arguments":[]}}]}}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"FUNCTION_ID"}}]},"parenthesizedExpression":true},"arguments":[{"type":"Identifier","name":"FUNCTION"}]}}]},"prototype-identifier":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"MemberExpression","object":{"type":"Identifier","name":"CLASS_NAME"},"property":{"type":"Identifier","name":"prototype"},"computed":false}}]},"require-assign-key":{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"VARIABLE_NAME"},"init":{"type":"MemberExpression","object":{"type":"CallExpression","callee":{"type":"Identifier","name":"require"},"arguments":[{"type":"Identifier","name":"MODULE_NAME"}]},"property":{"type":"Identifier","name":"KEY"},"computed":false}}],"kind":"var"}]},"require":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"require"},"arguments":[{"type":"Identifier","name":"MODULE_NAME"}]}}]},"rest":{"type":"Program","body":[{"type":"ForStatement","init":{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"LEN"},"init":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARGUMENTS"},"property":{"type":"Identifier","name":"length"},"computed":false}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"ARRAY"},"init":{"type":"CallExpression","callee":{"type":"Identifier","name":"Array"},"arguments":[{"type":"Identifier","name":"ARRAY_LEN"}]}},{"type":"VariableDeclarator","id":{"type":"Identifier","name":"KEY"},"init":{"type":"Identifier","name":"START"}}],"kind":"var"},"test":{"type":"BinaryExpression","left":{"type":"Identifier","name":"KEY"},"operator":"<","right":{"type":"Identifier","name":"LEN"}},"update":{"type":"UpdateExpression","operator":"++","prefix":false,"argument":{"type":"Identifier","name":"KEY"}},"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARRAY"},"property":{"type":"Identifier","name":"ARRAY_KEY"},"computed":true},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"ARGUMENTS"},"property":{"type":"Identifier","name":"KEY"},"computed":true}}}]}}]},"self-contained-helpers-head":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"exports"},"property":{"type":"Literal","value":"default"},"computed":true},"right":{"type":"Identifier","name":"HELPER"}}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"exports"},"property":{"type":"Identifier","name":"__esModule"},"computed":false},"right":{"type":"Literal","value":true}}}]},"system":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","object":{"type":"Identifier","name":"System"},"property":{"type":"Identifier","name":"register"},"computed":false},"arguments":[{"type":"Identifier","name":"MODULE_NAME"},{"type":"Identifier","name":"MODULE_DEPENDENCIES"},{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"EXPORT_IDENTIFIER"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"setters"},"value":{"type":"Identifier","name":"SETTERS"},"kind":"init"},{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"execute"},"value":{"type":"Identifier","name":"EXECUTE"},"kind":"init"}]}}]}}]}}]},"tail-call-body":{"type":"Program","body":[{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"AGAIN_ID"},"init":{"type":"Literal","value":true}}],"kind":"var"},{"type":"LabeledStatement","body":{"type":"WhileStatement","test":{"type":"Identifier","name":"AGAIN_ID"},"body":{"type":"ExpressionStatement","expression":{"type":"Identifier","name":"BLOCK"}}},"label":{"type":"Identifier","name":"FUNCTION_ID"}}]}]},"test-exports":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"exports"}},"operator":"!==","right":{"type":"Literal","value":"undefined"}}}]},"test-module":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"module"}},"operator":"!==","right":{"type":"Literal","value":"undefined"}}}]},"umd-commonjs-strict":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"root"},{"type":"Identifier","name":"factory"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"define"}},"operator":"===","right":{"type":"Literal","value":"function"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"define"},"property":{"type":"Identifier","name":"amd"},"computed":false}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"define"},"arguments":[{"type":"Identifier","name":"AMD_ARGUMENTS"},{"type":"Identifier","name":"factory"}]}}]},"alternate":{"type":"IfStatement","test":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"exports"}},"operator":"===","right":{"type":"Literal","value":"object"}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"factory"},"arguments":[{"type":"Identifier","name":"COMMON_ARGUMENTS"}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"factory"},"arguments":[{"type":"Identifier","name":"BROWSER_ARGUMENTS"}]}}]}}}]},"parenthesizedExpression":true},"arguments":[{"type":"Identifier","name":"UMD_ROOT"},{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"FACTORY_PARAMETERS"}],"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"Identifier","name":"FACTORY_BODY"}}]}}]}}]},"umd-runner-body":{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"generator":false,"expression":false,"params":[{"type":"Identifier","name":"global"},{"type":"Identifier","name":"factory"}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"LogicalExpression","left":{"type":"BinaryExpression","left":{"type":"UnaryExpression","operator":"typeof","prefix":true,"argument":{"type":"Identifier","name":"define"}},"operator":"===","right":{"type":"Literal","value":"function"}},"operator":"&&","right":{"type":"MemberExpression","object":{"type":"Identifier","name":"define"},"property":{"type":"Identifier","name":"amd"},"computed":false}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"define"},"arguments":[{"type":"Identifier","name":"AMD_ARGUMENTS"},{"type":"Identifier","name":"factory"}]}}]},"alternate":{"type":"IfStatement","test":{"type":"Identifier","name":"COMMON_TEST"},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"factory"},"arguments":[{"type":"Identifier","name":"COMMON_ARGUMENTS"}]}}]},"alternate":{"type":"BlockStatement","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"mod"},"init":{"type":"ObjectExpression","properties":[{"type":"Property","method":false,"shorthand":false,"computed":false,"key":{"type":"Identifier","name":"exports"},"value":{"type":"ObjectExpression","properties":[]},"kind":"init"}]}}],"kind":"var"},{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"factory"},"arguments":[{"type":"MemberExpression","object":{"type":"Identifier","name":"mod"},"property":{"type":"Identifier","name":"exports"},"computed":false},{"type":"Identifier","name":"BROWSER_ARGUMENTS"}]}},{"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"global"},"property":{"type":"Identifier","name":"GLOBAL_ARG"},"computed":false},"right":{"type":"MemberExpression","object":{"type":"Identifier","name":"mod"},"property":{"type":"Identifier","name":"exports"},"computed":false}}}]}}}]},"parenthesizedExpression":true}}]}}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235573, function(require, module, exports) {
/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
 */



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binding = (function () {
  function Binding(_ref) {
    var existing = _ref.existing;
    var identifier = _ref.identifier;
    var scope = _ref.scope;
    var path = _ref.path;
    var kind = _ref.kind;

    _classCallCheck(this, Binding);

    this.constantViolations = [];
    this.constant = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

    this.scope = scope;
    this.path = path;
    this.kind = kind;

    this.hasValue = false;
    this.hasDeoptedValue = false;
    this.value = null;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(existing.path, existing.constantViolations, this.constantViolations);
    }
  }

  /**
   * [Please add a description.]
   */

  Binding.prototype.deoptValue = function deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.setValue = function setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.clearValue = function clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  };

  /**
   * Register a constant violation with the provided `path`.
   */

  Binding.prototype.reassign = function reassign(path) {
    this.constant = false;
    this.constantViolations.push(path);
  };

  /**
   * Increment the amount of references to this binding.
   */

  Binding.prototype.reference = function reference() {
    this.referenced = true;
    this.references++;
  };

  /**
   * Decrement the amount of references to this binding.
   */

  Binding.prototype.dereference = function dereference() {
    this.references--;
    this.referenced = !!this.references;
  };

  return Binding;
})();

exports["default"] = Binding;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235574, function(require, module, exports) {
/**
 * Create an object with a `null` prototype.
 */



exports.__esModule = true;

exports["default"] = function () {
  return Object.create(null);
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235575, function(require, module, exports) {


exports.__esModule = true;
exports.findParent = findParent;
exports.getFunctionParent = getFunctionParent;
exports.getStatementParent = getStatementParent;
exports.getEarliestCommonAncestorFrom = getEarliestCommonAncestorFrom;
exports.getDeepestCommonAncestorFrom = getDeepestCommonAncestorFrom;
exports.getAncestry = getAncestry;
exports.inType = inType;
exports.inShadow = inShadow;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

/**
 * Call the provided `callback` with the `NodePath`s of all the parents.
 * When the `callback` returns a truthy value, we return that node path.
 */

function findParent(callback) {
  var path = this;
  while (path = path.parentPath) {
    if (callback(path)) return path;
  }
  return null;
}

/**
 * Get the parent function of the current path.
 */

function getFunctionParent() {
  return this.findParent(function (path) {
    return path.isFunction() || path.isProgram();
  });
}

/**
 * Walk up the tree until we hit a parent node path in a list.
 */

function getStatementParent() {
  var path = this;
  do {
    if (Array.isArray(path.container)) {
      return path;
    }
  } while (path = path.parentPath);
}

/**
 * Get the deepest common ancestor and then from it, get the earliest relationship path
 * to that ancestor.
 *
 * Earliest is defined as being "before" all the other nodes in terms of list container
 * position and visiting key.
 */

function getEarliestCommonAncestorFrom(paths) {
  return this.getDeepestCommonAncestorFrom(paths, function (deepest, i, ancestries) {
    var earliest;
    var keys = t.VISITOR_KEYS[deepest.type];

    var _arr = ancestries;
    for (var _i = 0; _i < _arr.length; _i++) {
      var ancestry = _arr[_i];
      var path = ancestry[i + 1];

      // first path
      if (!earliest) {
        earliest = path;
        continue;
      }

      // handle containers
      if (path.listKey && earliest.listKey === path.listKey) {
        // we're in the same container so check if we're earlier
        if (path.key < earliest.key) {
          earliest = path;
          continue;
        }
      }

      // handle keys
      var earliestKeyIndex = keys.indexOf(earliest.parentKey);
      var currentKeyIndex = keys.indexOf(path.parentKey);
      if (earliestKeyIndex > currentKeyIndex) {
        // key appears before so it's earlier
        earliest = path;
      }
    }

    return earliest;
  });
}

/**
 * Get the earliest path in the tree where the provided `paths` intersect.
 *
 * TODO: Possible optimisation target.
 */

function getDeepestCommonAncestorFrom(paths, filter) {
  // istanbul ignore next

  var _this = this;

  if (!paths.length) {
    return this;
  }

  if (paths.length === 1) {
    return paths[0];
  }

  // minimum depth of the tree so we know the highest node
  var minDepth = Infinity;

  // last common ancestor
  var lastCommonIndex, lastCommon;

  // get the ancestors of the path, breaking when the parent exceeds ourselves
  var ancestries = paths.map(function (path) {
    var ancestry = [];

    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== _this);

    // save min depth to avoid going too far in
    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }

    return ancestry;
  });

  // get the first ancestry so we have a seed to assess all other ancestries with
  var first = ancestries[0];

  // check ancestor equality
  depthLoop: for (var i = 0; i < minDepth; i++) {
    var shouldMatch = first[i];

    var _arr2 = ancestries;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var ancestry = _arr2[_i2];
      if (ancestry[i] !== shouldMatch) {
        // we've hit a snag
        break depthLoop;
      }
    }

    // next iteration may break so store these so they can be returned
    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }

  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}

/**
 * Build an array of node paths containing the entire ancestry of the current node path.
 *
 * NOTE: The current node path is included in this.
 */

function getAncestry() {
  var path = this;
  var paths = [];
  do {
    paths.push(path);
  } while (path = path.parentPath);
  return paths;
}

/**
 * [Please add a description.]
 */

function inType() {
  var path = this;
  while (path) {
    var _arr3 = arguments;

    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var type = _arr3[_i3];
      if (path.node.type === type) return true;
    }
    path = path.parentPath;
  }

  return false;
}

/**
 * Check if we're inside a shadowed function.
 */

function inShadow(key) {
  var path = this;
  do {
    if (path.isFunction()) {
      var shadow = path.node.shadow;
      if (shadow) {
        // this is because sometimes we may have a `shadow` value of:
        //
        //   { this: false }
        //
        // we need to catch this case if `inShadow` has been passed a `key`
        if (!key || shadow[key] !== false) {
          return path;
        }
      } else if (path.isArrowFunctionExpression()) {
        return path;
      }

      // normal function, we've found our function context
      return null;
    }
  } while (path = path.parentPath);
  return null;
}
}, function(modId) { var map = {"../../types":1676544235555,"./index":1676544235552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235576, function(require, module, exports) {


exports.__esModule = true;
exports.getTypeAnnotation = getTypeAnnotation;
exports._getTypeAnnotation = _getTypeAnnotation;
exports.isBaseType = isBaseType;
exports.couldBeBaseType = couldBeBaseType;
exports.baseTypeStrictlyMatches = baseTypeStrictlyMatches;
exports.isGenericType = isGenericType;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _inferers = require("./inferers");

var inferers = _interopRequireWildcard(_inferers);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * Infer the type of the current `NodePath`.
 */

function getTypeAnnotation() {
  if (this.typeAnnotation) return this.typeAnnotation;

  var type = this._getTypeAnnotation() || t.anyTypeAnnotation();
  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

/**
 * todo: split up this method
 */

function _getTypeAnnotation() {
  var node = this.node;

  if (!node) {
    // handle initializerless variables, add in checks for loop initializers too
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      var declar = this.parentPath.parentPath;
      var declarParent = declar.parentPath;

      // for (var NODE in bar) {}
      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t.stringTypeAnnotation();
      }

      // for (var NODE of bar) {}
      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t.anyTypeAnnotation();
      }

      return t.voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  var inferer = inferers[node.type];
  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];
  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

/**
 * [Please add a description.]
 */

function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

/**
 * [Please add a description.]
 */

function _isBaseType(baseName, type, soft) {
  if (baseName === "string") {
    return t.isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return t.isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return t.isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return t.isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return t.isMixedTypeAnnotation(type);
  } else if (baseName === "void") {
    return t.isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error("Unknown base type " + baseName);
    }
  }
}

/**
 * [Please add a description.]
 */

function couldBeBaseType(name) {
  var type = this.getTypeAnnotation();
  if (t.isAnyTypeAnnotation(type)) return true;

  if (t.isUnionTypeAnnotation(type)) {
    var _arr = type.types;

    for (var _i = 0; _i < _arr.length; _i++) {
      var type2 = _arr[_i];
      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }
    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

/**
 * [Please add a description.]
 */

function baseTypeStrictlyMatches(right) {
  var left = this.getTypeAnnotation();
  right = right.getTypeAnnotation();

  if (!t.isAnyTypeAnnotation() && t.isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
}

/**
 * [Please add a description.]
 */

function isGenericType(genericName) {
  var type = this.getTypeAnnotation();
  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
}
}, function(modId) { var map = {"./inferers":1676544235577,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235577, function(require, module, exports) {


exports.__esModule = true;
exports.VariableDeclarator = VariableDeclarator;
exports.TypeCastExpression = TypeCastExpression;
exports.NewExpression = NewExpression;
exports.TemplateLiteral = TemplateLiteral;
exports.UnaryExpression = UnaryExpression;
exports.BinaryExpression = BinaryExpression;
exports.LogicalExpression = LogicalExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.SequenceExpression = SequenceExpression;
exports.AssignmentExpression = AssignmentExpression;
exports.UpdateExpression = UpdateExpression;
exports.Literal = Literal;
exports.ObjectExpression = ObjectExpression;
exports.ArrayExpression = ArrayExpression;
exports.RestElement = RestElement;
exports.CallExpression = CallExpression;
exports.TaggedTemplateExpression = TaggedTemplateExpression;
// istanbul ignore next

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var _infererReference = require("./inferer-reference");

exports.Identifier = _interopRequire(_infererReference);

/**
 * [Please add a description.]
 */

function VariableDeclarator() {
  var id = this.get("id");

  if (id.isIdentifier()) {
    return this.get("init").getTypeAnnotation();
  } else {
    return;
  }
}

/**
 * [Please add a description.]
 */

function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

/**
 * [Please add a description.]
 */

function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return t.genericTypeAnnotation(node.callee);
  }
}

/**
 * [Please add a description.]
 */

function TemplateLiteral() {
  return t.stringTypeAnnotation();
}

/**
 * [Please add a description.]
 */

function UnaryExpression(node) {
  var operator = node.operator;

  if (operator === "void") {
    return t.voidTypeAnnotation();
  } else if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.stringTypeAnnotation();
  } else if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  }
}

/**
 * [Please add a description.]
 */

function BinaryExpression(node) {
  var operator = node.operator;

  if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  } else if (operator === "+") {
    var right = this.get("right");
    var left = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      // both numbers so this will be a number
      return t.numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      // one is a string so the result will be a string
      return t.stringTypeAnnotation();
    }

    // unsure if left and right are strings or numbers so stay on the safe side
    return t.unionTypeAnnotation([t.stringTypeAnnotation(), t.numberTypeAnnotation()]);
  }
}

/**
 * [Please add a description.]
 */

function LogicalExpression() {
  return t.createUnionTypeAnnotation([this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()]);
}

/**
 * [Please add a description.]
 */

function ConditionalExpression() {
  return t.createUnionTypeAnnotation([this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation()]);
}

/**
 * [Please add a description.]
 */

function SequenceExpression() {
  return this.get("expressions").pop().getTypeAnnotation();
}

/**
 * [Please add a description.]
 */

function AssignmentExpression() {
  return this.get("right").getTypeAnnotation();
}

/**
 * [Please add a description.]
 */

function UpdateExpression(node) {
  var operator = node.operator;
  if (operator === "++" || operator === "--") {
    return t.numberTypeAnnotation();
  }
}

/**
 * [Please add a description.]
 */

function Literal(node) {
  var value = node.value;
  if (typeof value === "string") return t.stringTypeAnnotation();
  if (typeof value === "number") return t.numberTypeAnnotation();
  if (typeof value === "boolean") return t.booleanTypeAnnotation();
  if (value === null) return t.voidTypeAnnotation();
  if (node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
}

/**
 * [Please add a description.]
 */

function ObjectExpression() {
  return t.genericTypeAnnotation(t.identifier("Object"));
}

/**
 * [Please add a description.]
 */

function ArrayExpression() {
  return t.genericTypeAnnotation(t.identifier("Array"));
}

/**
 * [Please add a description.]
 */

function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

/**
 * [Please add a description.]
 */

function Func() {
  return t.genericTypeAnnotation(t.identifier("Function"));
}

exports.Function = Func;
exports.Class = Func;

/**
 * [Please add a description.]
 */

function CallExpression() {
  return resolveCall(this.get("callee"));
}

/**
 * [Please add a description.]
 */

function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

/**
 * [Please add a description.]
 */

function resolveCall(callee) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    if (callee.is("async")) {
      if (callee.is("generator")) {
        return t.genericTypeAnnotation(t.identifier("AsyncIterator"));
      } else {
        return t.genericTypeAnnotation(t.identifier("Promise"));
      }
    } else {
      if (callee.node.returnType) {
        return callee.node.returnType;
      } else {
        // todo: get union type of all return arguments
      }
    }
  }
}
}, function(modId) { var map = {"../../../types":1676544235555,"./inferer-reference":1676544235578}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235578, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

exports["default"] = function (node) {
  if (!this.isReferenced()) return;

  // check if a binding exists of this value and if so then return a union type of all
  // possible types that the binding could be
  var binding = this.scope.getBinding(node.name);
  if (binding) {
    if (binding.identifier.typeAnnotation) {
      return binding.identifier.typeAnnotation;
    } else {
      return getTypeAnnotationBindingConstantViolations(this, node.name);
    }
  }

  // built-in values
  if (node.name === "undefined") {
    return t.voidTypeAnnotation();
  } else if (node.name === "NaN" || node.name === "Infinity") {
    return t.numberTypeAnnotation();
  } else if (node.name === "arguments") {
    // todo
  }
};

/**
 * [Please add a description.]
 */

function getTypeAnnotationBindingConstantViolations(path, name) {
  var binding = path.scope.getBinding(name);

  var types = [];
  path.typeAnnotation = t.unionTypeAnnotation(types);

  var functionConstantViolations = [];
  var constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);

  var testType = getConditionalAnnotation(path, name);
  if (testType) {
    var testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);

    // remove constant violations observed before the IfStatement
    constantViolations = constantViolations.filter(function (path) {
      return testConstantViolations.indexOf(path) < 0;
    });

    // clear current types and add in observed test type
    types.push(testType.typeAnnotation);
  }

  if (constantViolations.length) {
    // pick one constant from each scope which will represent the last possible
    // control flow path that it could've taken/been
    var rawConstantViolations = constantViolations.reverse();
    var visitedScopes = [];
    constantViolations = [];
    var _arr = rawConstantViolations;
    for (var _i = 0; _i < _arr.length; _i++) {
      var violation = _arr[_i];
      var violationScope = violation.scope;
      if (visitedScopes.indexOf(violationScope) >= 0) continue;

      visitedScopes.push(violationScope);
      constantViolations.push(violation);

      if (violationScope === path.scope) {
        constantViolations = [violation];
        break;
      }
    }

    // add back on function constant violations since we can't track calls
    constantViolations = constantViolations.concat(functionConstantViolations);

    // push on inferred types of violated paths
    var _arr2 = constantViolations;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var violation = _arr2[_i2];
      types.push(violation.getTypeAnnotation());
    }
  }

  if (types.length) {
    return t.createUnionTypeAnnotation(types);
  }
}

/**
 * [Please add a description.]
 */

function getConstantViolationsBefore(binding, path, functions) {
  var violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter(function (violation) {
    violation = violation.resolve();
    var status = violation._guessExecutionStatusRelativeTo(path);
    if (functions && status === "function") functions.push(violation);
    return status === "before";
  });
}

/**
 * [Please add a description.]
 */

function inferAnnotationFromBinaryExpression(name, path) {
  var operator = path.node.operator;

  var right = path.get("right").resolve();
  var left = path.get("left").resolve();

  var target;
  if (left.isIdentifier({ name: name })) {
    target = right;
  } else if (right.isIdentifier({ name: name })) {
    target = left;
  }
  if (target) {
    if (operator === "===") {
      return target.getTypeAnnotation();
    } else if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else {
      return;
    }
  } else {
    if (operator !== "===") return;
  }

  //
  var typeofPath;
  var typePath;
  if (left.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = left;
    typePath = right;
  } else if (right.isUnaryExpression({ operator: "typeof" })) {
    typeofPath = right;
    typePath = left;
  }
  if (!typePath && !typeofPath) return;

  // ensure that the type path is a Literal
  typePath = typePath.resolve();
  if (!typePath.isLiteral()) return;

  // and that it's a string so we can infer it
  var typeValue = typePath.node.value;
  if (typeof typeValue !== "string") return;

  // and that the argument of the typeof path references us!
  if (!typeofPath.get("argument").isIdentifier({ name: name })) return;

  // turn type value into a type annotation
  return t.createTypeAnnotationBasedOnTypeof(typePath.node.value);
}

/**
 * [Please add a description.]
 */

function getParentConditionalPath(path) {
  var parentPath;
  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      } else {
        return parentPath;
      }
    } else {
      path = parentPath;
    }
  }
}

/**
 * [Please add a description.]
 */

function getConditionalAnnotation(path, name) {
  var ifStatement = getParentConditionalPath(path);
  if (!ifStatement) return;

  var test = ifStatement.get("test");
  var paths = [test];
  var types = [];

  do {
    var _path = paths.shift().resolve();

    if (_path.isLogicalExpression()) {
      paths.push(_path.get("left"));
      paths.push(_path.get("right"));
    }

    if (_path.isBinaryExpression()) {
      var type = inferAnnotationFromBinaryExpression(name, _path);
      if (type) types.push(type);
    }
  } while (paths.length);

  if (types.length) {
    return {
      typeAnnotation: t.createUnionTypeAnnotation(types),
      ifStatement: ifStatement
    };
  } else {
    return getConditionalAnnotation(ifStatement, name);
  }
}
module.exports = exports["default"];
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235579, function(require, module, exports) {


exports.__esModule = true;
exports.replaceWithMultiple = replaceWithMultiple;
exports.replaceWithSourceString = replaceWithSourceString;
exports.replaceWith = replaceWith;
exports.replaceExpressionWithStatements = replaceExpressionWithStatements;
exports.replaceInline = replaceInline;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersCodeFrame = require("../../helpers/code-frame");

var _helpersCodeFrame2 = _interopRequireDefault(_helpersCodeFrame);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./index");

var _index4 = _interopRequireDefault(_index3);

var _helpersParse = require("../../helpers/parse");

var _helpersParse2 = _interopRequireDefault(_helpersParse);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var hoistVariablesVisitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  VariableDeclaration: function VariableDeclaration(node, parent, scope) {
    if (node.kind !== "var") return;

    var bindings = this.getBindingIdentifiers();
    for (var key in bindings) {
      scope.push({ id: bindings[key] });
    }

    var exprs = [];

    var _arr = node.declarations;
    for (var _i = 0; _i < _arr.length; _i++) {
      var declar = _arr[_i];
      if (declar.init) {
        exprs.push(t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init)));
      }
    }

    return exprs;
  }
};

/**
 * Replace a node with an array of multiple. This method performs the following steps:
 *
 *  - Inherit the comments of first provided node with that of the current node.
 *  - Insert the provided nodes after the current node.
 *  - Remove the current node.
 */

function replaceWithMultiple(nodes) {
  this.resync();

  nodes = this._verifyNodeList(nodes);
  t.inheritLeadingComments(nodes[0], this.node);
  t.inheritTrailingComments(nodes[nodes.length - 1], this.node);
  this.node = this.container[this.key] = null;
  this.insertAfter(nodes);
  if (!this.node) this.dangerouslyRemove();
}

/**
 * Parse a string as an expression and replace the current node with the result.
 *
 * NOTE: This is typically not a good idea to use. Building source strings when
 * transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
 * easier to use, your transforms will be extremely brittle.
 */

function replaceWithSourceString(replacement) {
  this.resync();

  try {
    replacement = "(" + replacement + ")";
    replacement = _helpersParse2["default"](replacement);
  } catch (err) {
    var loc = err.loc;
    if (loc) {
      err.message += " - make sure this is an expression.";
      err.message += "\n" + _helpersCodeFrame2["default"](replacement, loc.line, loc.column + 1);
    }
    throw err;
  }

  replacement = replacement.program.body[0].expression;
  _index2["default"].removeProperties(replacement);
  return this.replaceWith(replacement);
}

/**
 * Replace the current node with another.
 */

function replaceWith(replacement, whateverAllowed) {
  this.resync();

  if (this.removed) {
    throw new Error("You can't replace this node, we've already removed it");
  }

  if (replacement instanceof _index4["default"]) {
    replacement = replacement.node;
  }

  if (!replacement) {
    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.dangerouslyRemove()` instead");
  }

  if (this.node === replacement) {
    return;
  }

  if (this.isProgram() && !t.isProgram(replacement)) {
    throw new Error("You can only replace a Program root node with another Program node");
  }

  // normalise inserting an entire AST
  if (t.isProgram(replacement) && !this.isProgram()) {
    replacement = replacement.body;
    whateverAllowed = true;
  }

  if (Array.isArray(replacement)) {
    if (whateverAllowed) {
      return this.replaceWithMultiple(replacement);
    } else {
      throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
    }
  }

  if (typeof replacement === "string") {
    // triggers an error
    return this.replaceWithSourceString();
  }

  if (this.isNodeType("Statement") && t.isExpression(replacement)) {
    if (!this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) {
      // replacing a statement with an expression so wrap it in an expression statement
      replacement = t.expressionStatement(replacement);
    }
  }

  if (this.isNodeType("Expression") && t.isStatement(replacement)) {
    if (!this.canSwapBetweenExpressionAndStatement(replacement)) {
      // replacing an expression with a statement so let's explode it
      return this.replaceExpressionWithStatements([replacement]);
    }
  }

  var oldNode = this.node;
  if (oldNode) t.inheritsComments(replacement, oldNode);

  // replace the node
  this.node = this.container[this.key] = replacement;
  this.type = replacement.type;

  // potentially create new scope
  this.setScope();
}

/**
 * This method takes an array of statements nodes and then explodes it
 * into expressions. This method retains completion records which is
 * extremely important to retain original semantics.
 */

function replaceExpressionWithStatements(nodes) {
  this.resync();

  var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

  if (toSequenceExpression) {
    return this.replaceWith(toSequenceExpression);
  } else {
    var container = t.functionExpression(null, [], t.blockStatement(nodes));
    container.shadow = true;

    this.replaceWith(t.callExpression(container, []));
    this.traverse(hoistVariablesVisitor);

    // add implicit returns to all ending expression statements
    var last = this.get("callee").getCompletionRecords();
    var _arr2 = last;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var lastNode = _arr2[_i2];
      if (!lastNode.isExpressionStatement()) continue;

      var loop = lastNode.findParent(function (path) {
        return path.isLoop();
      });
      if (loop) {
        var uid = this.get("callee").scope.generateDeclaredUidIdentifier("ret");
        this.get("callee.body").pushContainer("body", t.returnStatement(uid));
        lastNode.get("expression").replaceWith(t.assignmentExpression("=", uid, lastNode.node.expression));
      } else {
        lastNode.replaceWith(t.returnStatement(lastNode.node.expression));
      }
    }

    return this.node;
  }
}

/**
 * [Please add a description.]
 */

function replaceInline(nodes) {
  this.resync();

  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = this._verifyNodeList(nodes);
      this._containerInsertAfter(nodes);
      return this.dangerouslyRemove();
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}
}, function(modId) { var map = {"../../helpers/code-frame":1676544235580,"../index":1676544235550,"./index":1676544235552,"../../helpers/parse":1676544235571,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235580, function(require, module, exports) {
//import lineNumbers from "line-numbers";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _jsTokens = require("js-tokens");

var _jsTokens2 = _interopRequireDefault(_jsTokens);

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function lineNumbers(lines) {
  return lines;
}

/**
 * Chalk styles for token types.
 */

var defs = {
  string: _chalk2["default"].red,
  punctuator: _chalk2["default"].bold,
  curly: _chalk2["default"].green,
  parens: _chalk2["default"].blue.bold,
  square: _chalk2["default"].yellow,
  keyword: _chalk2["default"].cyan,
  number: _chalk2["default"].magenta,
  regex: _chalk2["default"].magenta,
  comment: _chalk2["default"].grey,
  invalid: _chalk2["default"].inverse
};

/**
 * RegExp to test for newlines in terminal.
 */

var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * Get the type of token, specifying punctuator type.
 */

function getTokenType(match) {
  var token = _jsTokens2["default"].matchToToken(match);
  if (token.type === "name" && _esutils2["default"].keyword.isReservedWordES6(token.value)) {
    return "keyword";
  }

  if (token.type === "punctuator") {
    switch (token.value) {
      case "{":
      case "}":
        return "curly";
      case "(":
      case ")":
        return "parens";
      case "[":
      case "]":
        return "square";
    }
  }

  return token.type;
}

/**
 * Highlight `text`.
 */

function highlight(text) {
  return text.replace(_jsTokens2["default"], function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var type = getTokenType(args);
    var colorize = defs[type];
    if (colorize) {
      return args[0].split(NEWLINE).map(function (str) {
        return colorize(str);
      }).join("\n");
    } else {
      return args[0];
    }
  });
}

/**
 * Create a code frame, adding line numbers, code highlighting, and pointing to a given position.
 */

exports["default"] = function (lines, lineNumber, colNumber) {
  var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  colNumber = Math.max(colNumber, 0);

  var highlighted = opts.highlightCode && _chalk2["default"].supportsColor;
  if (highlighted) lines = highlight(lines);

  lines = lines.split(NEWLINE);

  var start = Math.max(lineNumber - 3, 0);
  var end = Math.min(lines.length, lineNumber + 3);

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

  var frame = lineNumbers(lines.slice(start, end), {
    start: start + 1,
    before: "  ",
    after: " | ",
    transform: function transform(params) {
      if (params.number !== lineNumber) {
        return;
      }

      if (colNumber) {
        params.line += "\n" + params.before + _repeating2["default"](" ", params.width) + params.after + _repeating2["default"](" ", colNumber - 1) + "^";
      }

      params.before = params.before.replace(/^./, ">");
    }
  }).join("\n");

  if (highlighted) {
    return _chalk2["default"].reset(frame);
  } else {
    return frame;
  }
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235581, function(require, module, exports) {
/* eslint eqeqeq: 0 */



exports.__esModule = true;
exports.evaluateTruthy = evaluateTruthy;
exports.evaluate = evaluate;
var VALID_CALLEES = ["String", "Number", "Math"];

/**
 * Walk the input `node` and statically evaluate if it's truthy.
 *
 * Returning `true` when we're sure that the expression will evaluate to a
 * truthy value, `false` if we're sure that it will evaluate to a falsy
 * value and `undefined` if we aren't sure. Because of this please do not
 * rely on coercion when using this method and check with === if it's false.
 *
 * For example do:
 *
 *   if (t.evaluateTruthy(node) === false) falsyLogic();
 *
 * **AND NOT**
 *
 *   if (!t.evaluateTruthy(node)) falsyLogic();
 *
 */

function evaluateTruthy() {
  var res = this.evaluate();
  if (res.confident) return !!res.value;
}

/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an object in the form `{ confident, value }`. `confident` indicates
 * whether or not we had to drop out of evaluating the expression because of
 * hitting an unknown node that we couldn't confidently find the value of.
 *
 * Example:
 *
 *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
 *   t.evaluate(parse("!true")) // { confident: true, value: false }
 *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined }
 *
 */

function evaluate() {
  var confident = true;

  var value = evaluate(this);
  if (!confident) value = undefined;
  return {
    confident: confident,
    value: value
  };

  function evaluate(path) {
    if (!confident) return;

    var node = path.node;

    if (path.isSequenceExpression()) {
      var exprs = path.get("expressions");
      return evaluate(exprs[exprs.length - 1]);
    }

    if (path.isLiteral()) {
      if (node.regex) {
        // we have a regex and we can't represent it natively
      } else {
          return node.value;
        }
    }

    if (path.isConditionalExpression()) {
      if (evaluate(path.get("test"))) {
        return evaluate(path.get("consequent"));
      } else {
        return evaluate(path.get("alternate"));
      }
    }

    if (path.isTypeCastExpression()) {
      return evaluate(path.get("expression"));
    }

    if (path.isIdentifier() && !path.scope.hasBinding(node.name, true)) {
      if (node.name === "undefined") {
        return undefined;
      } else if (node.name === "Infinity") {
        return Infinity;
      } else if (node.name === "NaN") {
        return NaN;
      }
    }

    // "foo".length
    if (path.isMemberExpression() && !path.parentPath.isCallExpression({ callee: node })) {
      var _property = path.get("property");
      var object = path.get("object");

      if (object.isLiteral() && _property.isIdentifier()) {
        var _value = object.node.value;
        var type = typeof _value;
        if (type === "number" || type === "string") {
          return _value[_property.node.name];
        }
      }
    }

    if (path.isReferencedIdentifier()) {
      var binding = path.scope.getBinding(node.name);
      if (binding && binding.hasValue) {
        return binding.value;
      } else {
        var resolved = path.resolve();
        if (resolved === path) {
          return confident = false;
        } else {
          return evaluate(resolved);
        }
      }
    }

    if (path.isUnaryExpression({ prefix: true })) {
      var argument = path.get("argument");
      var arg = evaluate(argument);
      switch (node.operator) {
        case "void":
          return undefined;
        case "!":
          return !arg;
        case "+":
          return +arg;
        case "-":
          return -arg;
        case "~":
          return ~arg;
        case "typeof":
          if (argument.isFunction()) {
            return "function";
          } else {
            return typeof arg;
          }
      }
    }

    if (path.isArrayExpression() || path.isObjectExpression()) {
      // we could evaluate these but it's probably impractical and not very useful
    }

    if (path.isLogicalExpression()) {
      // If we are confident that one side of an && is false, or one side of
      // an || is true, we can be confident about the entire expression
      var wasConfident = confident;
      var left = evaluate(path.get("left"));
      var leftConfident = confident;
      confident = wasConfident;
      var right = evaluate(path.get("right"));
      var rightConfident = confident;
      var uncertain = leftConfident !== rightConfident;
      confident = leftConfident && rightConfident;

      switch (node.operator) {
        case "||":
          if ((left || right) && uncertain) {
            confident = true;
          }
          return left || right;
        case "&&":
          if (!left && leftConfident || !right && rightConfident) {
            confident = true;
          }
          return left && right;
      }
    }

    if (path.isBinaryExpression()) {
      var left = evaluate(path.get("left"));
      var right = evaluate(path.get("right"));

      switch (node.operator) {
        case "-":
          return left - right;
        case "+":
          return left + right;
        case "/":
          return left / right;
        case "*":
          return left * right;
        case "%":
          return left % right;
        case "**":
          return Math.pow(left, right);
        case "<":
          return left < right;
        case ">":
          return left > right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case "===":
          return left === right;
        case "!==":
          return left !== right;
        case "|":
          return left | right;
        case "&":
          return left & right;
        case "^":
          return left ^ right;
        case "<<":
          return left << right;
        case ">>":
          return left >> right;
        case ">>>":
          return left >>> right;
      }
    }

    if (path.isCallExpression()) {
      var callee = path.get("callee");
      var context;
      var func;

      // Number(1);
      if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name, true) && VALID_CALLEES.indexOf(callee.node.name) >= 0) {
        func = global[node.callee.name];
      }

      if (callee.isMemberExpression()) {
        var object = callee.get("object");
        var property = callee.get("property");

        // Math.min(1, 2)
        if (object.isIdentifier() && property.isIdentifier() && VALID_CALLEES.indexOf(object.node.name) >= 0) {
          context = global[object.node.name];
          func = context[property.node.name];
        }

        // "abc".charCodeAt(4)
        if (object.isLiteral() && property.isIdentifier()) {
          var type = typeof object.node.value;
          if (type === "string" || type === "number") {
            context = object.node.value;
            func = context[property.node.name];
          }
        }
      }

      if (func) {
        var args = path.get("arguments").map(evaluate);
        if (!confident) return;

        return func.apply(context, args);
      }
    }

    confident = false;
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235582, function(require, module, exports) {


exports.__esModule = true;
exports.toComputedKey = toComputedKey;
exports.ensureBlock = ensureBlock;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function toComputedKey() {
  var node = this.node;

  var key;
  if (this.isMemberExpression()) {
    key = node.property;
  } else if (this.isProperty()) {
    key = node.key;
  } else {
    throw new ReferenceError("todo");
  }

  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.literal(key.name);
  }

  return key;
}

/**
 * [Please add a description.]
 */

function ensureBlock() {
  return t.ensureBlock(this.node);
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235583, function(require, module, exports) {


exports.__esModule = true;
exports.matchesPattern = matchesPattern;
exports.has = has;
exports.isnt = isnt;
exports.equals = equals;
exports.isNodeType = isNodeType;
exports.canHaveVariableDeclarationOrExpression = canHaveVariableDeclarationOrExpression;
exports.canSwapBetweenExpressionAndStatement = canSwapBetweenExpressionAndStatement;
exports.isCompletionRecord = isCompletionRecord;
exports.isStatementOrBlock = isStatementOrBlock;
exports.referencesImport = referencesImport;
exports.getSource = getSource;
exports.willIMaybeExecuteBefore = willIMaybeExecuteBefore;
exports._guessExecutionStatusRelativeTo = _guessExecutionStatusRelativeTo;
exports.resolve = resolve;
exports._resolve = _resolve;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Match the current node if it matches the provided `pattern`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

function matchesPattern(pattern, allowPartial) {
  // not a member expression
  if (!this.isMemberExpression()) return false;

  var parts = pattern.split(".");
  var search = [this.node];
  var i = 0;

  function matches(name) {
    var part = parts[i];
    return part === "*" || name === part;
  }

  while (search.length) {
    var node = search.shift();

    if (allowPartial && i === parts.length) {
      return true;
    }

    if (t.isIdentifier(node)) {
      // this part doesn't match
      if (!matches(node.name)) return false;
    } else if (t.isLiteral(node)) {
      // this part doesn't match
      if (!matches(node.value)) return false;
    } else if (t.isMemberExpression(node)) {
      if (node.computed && !t.isLiteral(node.property)) {
        // we can't deal with this
        return false;
      } else {
        search.unshift(node.property);
        search.unshift(node.object);
        continue;
      }
    } else if (t.isThisExpression(node)) {
      if (!matches("this")) return false;
    } else {
      // we can't deal with this
      return false;
    }

    // too many parts
    if (++i > parts.length) {
      return false;
    }
  }

  return i === parts.length;
}

/**
 * Check whether we have the input `key`. If the `key` references an array then we check
 * if the array has any items, otherwise we just check if it's falsy.
 */

function has(key) {
  var val = this.node[key];
  if (val && Array.isArray(val)) {
    return !!val.length;
  } else {
    return !!val;
  }
}

/**
 * Alias of `has`.
 */

var is = has;

exports.is = is;
/**
 * Opposite of `has`.
 */

function isnt(key) {
  return !this.has(key);
}

/**
 * Check whether the path node `key` strict equals `value`.
 */

function equals(key, value) {
  return this.node[key] === value;
}

/**
 * Check the type against our stored internal type of the node. This is handy when a node has
 * been removed yet we still internally know the type and need it to calculate node replacement.
 */

function isNodeType(type) {
  return t.isType(this.type, type);
}

/**
 * This checks whether or not we're in one of the following positions:
 *
 *   for (KEY in right);
 *   for (KEY;;);
 *
 * This is because these spots allow VariableDeclarations AND normal expressions so we need
 * to tell the path replacement that it's ok to replace this with an expression.
 */

function canHaveVariableDeclarationOrExpression() {
  return (this.key === "init" || this.key === "left") && this.parentPath.isFor();
}

/**
 * This checks whether we are swapping an arrow function's body between an
 * expression and a block statement (or vice versa).
 *
 * This is because arrow functions may implicitly return an expression, which
 * is the same as containing a block statement.
 */

function canSwapBetweenExpressionAndStatement(replacement) {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }

  if (this.isExpression()) {
    return t.isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return t.isExpression(replacement);
  }

  return false;
}

/**
 * Check whether the current path references a completion record
 */

function isCompletionRecord(allowInsideFunction) {
  var path = this;
  var first = true;

  do {
    var container = path.container;

    // we're in a function so can't be a completion record
    if (path.isFunction() && !first) {
      return !!allowInsideFunction;
    }

    first = false;

    // check to see if we're the last item in the container and if we are
    // we're a completion record!
    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram());

  return true;
}

/**
 * Check whether or not the current `key` allows either a single statement or block statement
 * so we can explode it if necessary.
 */

function isStatementOrBlock() {
  if (this.parentPath.isLabeledStatement() || t.isBlockStatement(this.container)) {
    return false;
  } else {
    return _lodashCollectionIncludes2["default"](t.STATEMENT_OR_BLOCK_KEYS, this.key);
  }
}

/**
 * Check if the currently assigned path references the `importName` of `moduleSource`.
 */

function referencesImport(moduleSource, importName) {
  if (!this.isReferencedIdentifier()) return false;

  var binding = this.scope.getBinding(this.node.name);
  if (!binding || binding.kind !== "module") return false;

  var path = binding.path;
  var parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;

  // check moduleSource
  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }

  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }

  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }

  if (path.isImportSpecifier() && path.node.imported.name === importName) {
    return true;
  }

  return false;
}

/**
 * Get the source code associated with this node.
 */

function getSource() {
  var node = this.node;
  if (node.end) {
    return this.hub.file.code.slice(node.start, node.end);
  } else {
    return "";
  }
}

/**
 * [Please add a description.]
 */

function willIMaybeExecuteBefore(target) {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}

/**
 * Given a `target` check the execution status of it relative to the current path.
 *
 * "Execution status" simply refers to where or not we **think** this will execuete
 * before or after the input `target` element.
 */

function _guessExecutionStatusRelativeTo(target) {
  // check if the two paths are in different functions, we can't track execution of these
  var targetFuncParent = target.scope.getFunctionParent();
  var selfFuncParent = this.scope.getFunctionParent();
  if (targetFuncParent !== selfFuncParent) {
    return "function";
  }

  var targetPaths = target.getAncestry();
  //if (targetPaths.indexOf(this) >= 0) return "after";

  var selfPaths = this.getAncestry();

  // get ancestor where the branches intersect
  var commonPath;
  var targetIndex;
  var selfIndex;
  for (selfIndex = 0; selfIndex < selfPaths.length; selfIndex++) {
    var selfPath = selfPaths[selfIndex];
    targetIndex = targetPaths.indexOf(selfPath);
    if (targetIndex >= 0) {
      commonPath = selfPath;
      break;
    }
  }
  if (!commonPath) {
    return "before";
  }

  // get the relationship paths that associate these nodes to their common ancestor
  var targetRelationship = targetPaths[targetIndex - 1];
  var selfRelationship = selfPaths[selfIndex - 1];
  if (!targetRelationship || !selfRelationship) {
    return "before";
  }

  // container list so let's see which one is after the other
  if (targetRelationship.listKey && targetRelationship.container === selfRelationship.container) {
    return targetRelationship.key > selfRelationship.key ? "before" : "after";
  }

  // otherwise we're associated by a parent node, check which key comes before the other
  var targetKeyPosition = t.VISITOR_KEYS[targetRelationship.type].indexOf(targetRelationship.key);
  var selfKeyPosition = t.VISITOR_KEYS[selfRelationship.type].indexOf(selfRelationship.key);
  return targetKeyPosition > selfKeyPosition ? "before" : "after";
}

/**
 * Resolve a "pointer" `NodePath` to it's absolute path.
 */

function resolve(dangerous, resolved) {
  return this._resolve(dangerous, resolved) || this;
}

/**
 * [Please add a description.]
 */

function _resolve(dangerous, resolved) {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved && resolved.indexOf(this) >= 0) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
    } else {
      // otherwise it's a request for a pattern and that's a bit more tricky
    }
  } else if (this.isReferencedIdentifier()) {
      var binding = this.scope.getBinding(this.node.name);
      if (!binding) return;

      // reassigned so we can't really resolve it
      if (!binding.constant) return;

      // todo - lookup module in dependency graph
      if (binding.kind === "module") return;

      if (binding.path !== this) {
        return binding.path.resolve(dangerous, resolved);
      }
    } else if (this.isTypeCastExpression()) {
      return this.get("expression").resolve(dangerous, resolved);
    } else if (dangerous && this.isMemberExpression()) {
      // this is dangerous, as non-direct target assignments will mutate it's state
      // making this resolution inaccurate

      var targetKey = this.toComputedKey();
      if (!t.isLiteral(targetKey)) return;

      var targetName = targetKey.value;

      var target = this.get("object").resolve(dangerous, resolved);

      if (target.isObjectExpression()) {
        var props = target.get("properties");
        var _arr = props;
        for (var _i = 0; _i < _arr.length; _i++) {
          var prop = _arr[_i];
          if (!prop.isProperty()) continue;

          var key = prop.get("key");

          // { foo: obj }
          var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

          // { "foo": "obj" } or { ["foo"]: "obj" }
          match = match || key.isLiteral({ value: targetName });

          if (match) return prop.get("value").resolve(dangerous, resolved);
        }
      } else if (target.isArrayExpression() && !isNaN(+targetName)) {
        var elems = target.get("elements");
        var elem = elems[targetName];
        if (elem) return elem.resolve(dangerous, resolved);
      }
    }
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235584, function(require, module, exports) {


exports.__esModule = true;
exports.call = call;
exports.isBlacklisted = isBlacklisted;
exports.visit = visit;
exports.skip = skip;
exports.skipKey = skipKey;
exports.stop = stop;
exports.setScope = setScope;
exports.setContext = setContext;
exports.resync = resync;
exports._resyncParent = _resyncParent;
exports._resyncKey = _resyncKey;
exports._resyncList = _resyncList;
exports._resyncRemoved = _resyncRemoved;
exports.shiftContext = shiftContext;
exports.unshiftContext = unshiftContext;
exports.setup = setup;
exports.setKey = setKey;
exports.queueNode = queueNode;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

/**
 * [Please add a description.]
 */

function call(key) {
  var node = this.node;
  if (!node) return;

  var opts = this.opts;

  var _arr = [opts[key], opts[node.type] && opts[node.type][key]];
  for (var _i = 0; _i < _arr.length; _i++) {
    var fns = _arr[_i];
    if (!fns) continue;

    var _arr2 = fns;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var fn = _arr2[_i2];
      if (!fn) continue;

      var _node = this.node;
      if (!_node) return;

      var previousType = this.type;

      // call the function with the params (node, parent, scope, state)
      var replacement = fn.call(this, _node, this.parent, this.scope, this.state);

      if (replacement) {
        this.replaceWith(replacement, true);
      }

      if (this.shouldStop || this.shouldSkip || this.removed) return;

      if (previousType !== this.type) {
        this.queueNode(this);
        return;
      }
    }
  }
}

/**
 * [Please add a description.]
 */

function isBlacklisted() {
  var blacklist = this.opts.blacklist;
  return blacklist && blacklist.indexOf(this.node.type) > -1;
}

/**
 * Visits a node and calls appropriate enter and exit callbacks
 * as required.
 */

function visit() {
  if (this.isBlacklisted()) return false;
  if (this.opts.shouldSkip && this.opts.shouldSkip(this)) return false;

  this.call("enter");

  if (this.shouldSkip) {
    return this.shouldStop;
  }

  var node = this.node;
  var opts = this.opts;

  if (node) {
    if (Array.isArray(node)) {
      // traverse over these replacement nodes we purposely don't call exitNode
      // as the original node has been destroyed
      for (var i = 0; i < node.length; i++) {
        _index2["default"].node(node[i], opts, this.scope, this.state, this, this.skipKeys);
      }
    } else {
      _index2["default"].node(node, opts, this.scope, this.state, this, this.skipKeys);
      this.call("exit");
    }
  }

  return this.shouldStop;
}

/**
 * Sets shouldSkip flag true so that this node will be skipped while visiting.
 */

function skip() {
  this.shouldSkip = true;
}

/**
 * Adds given key to the list of keys to be skipped.
 */

function skipKey(key) {
  this.skipKeys[key] = true;
}

/**
 * [Please add a description.]
 */

function stop() {
  this.shouldStop = true;
  this.shouldSkip = true;
}

/**
 * [Please add a description.]
 */

function setScope() {
  if (this.opts && this.opts.noScope) return;

  var target = this.context || this.parentPath;
  this.scope = this.getScope(target && target.scope);
  if (this.scope) this.scope.init();
}

/**
 * [Please add a description.]
 */

function setContext(context) {
  this.shouldSkip = false;
  this.shouldStop = false;
  this.removed = false;
  this.skipKeys = {};

  if (context) {
    this.context = context;
    this.state = context.state;
    this.opts = context.opts;
  }

  this.setScope();

  return this;
}

/**
 * Here we resync the node paths `key` and `container`. If they've changed according
 * to what we have stored internally then we attempt to resync by crawling and looking
 * for the new values.
 */

function resync() {
  if (this.removed) return;

  this._resyncParent();
  this._resyncList();
  this._resyncKey();
  //this._resyncRemoved();
}

/**
 * [Please add a description.]
 */

function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}

/**
 * [Please add a description.]
 */

function _resyncKey() {
  if (!this.container) return;

  if (this.node === this.container[this.key]) return;

  // grrr, path key is out of sync. this is likely due to a modification to the AST
  // not done through our path APIs

  if (Array.isArray(this.container)) {
    for (var i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        return this.setKey(i);
      }
    }
  } else {
    for (var key in this.container) {
      if (this.container[key] === this.node) {
        return this.setKey(key);
      }
    }
  }

  this.key = null;
}

/**
 * [Please add a description.]
 */

function _resyncList() {
  var listKey = this.listKey;
  var parentPath = this.parentPath;
  if (!listKey || !parentPath) return;

  var newContainer = parentPath.node[listKey];
  if (this.container === newContainer) return;

  // container is out of sync. this is likely the result of it being reassigned

  if (newContainer) {
    this.container = newContainer;
  } else {
    this.container = null;
  }
}

/**
 * [Please add a description.]
 */

function _resyncRemoved() {
  if (this.key == null || !this.container || this.container[this.key] !== this.node) {
    this._markRemoved();
  }
}

/**
 * [Please add a description.]
 */

function shiftContext() {
  this.contexts.shift();
  this.setContext(this.contexts[0]);
}

/**
 * [Please add a description.]
 */

function unshiftContext(context) {
  this.contexts.unshift(context);
  this.setContext(context);
}

/**
 * [Please add a description.]
 */

function setup(parentPath, container, listKey, key) {
  this.inList = !!listKey;
  this.listKey = listKey;
  this.parentKey = listKey || key;
  this.container = container;

  this.parentPath = parentPath || this.parentPath;
  this.setKey(key);
}

/**
 * [Please add a description.]
 */

function setKey(key) {
  this.key = key;
  this.node = this.container[this.key];
  this.type = this.node && this.node.type;
}

/**
 * [Please add a description.]
 */

function queueNode(path) {
  var _arr3 = this.contexts;

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var context = _arr3[_i3];
    if (context.queue) {
      context.queue.push(path);
    }
  }
}
}, function(modId) { var map = {"../index":1676544235550}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235585, function(require, module, exports) {


exports.__esModule = true;
exports.remove = remove;
exports.dangerouslyRemove = dangerouslyRemove;
exports._callRemovalHooks = _callRemovalHooks;
exports._remove = _remove;
exports._markRemoved = _markRemoved;
exports._assertUnremoved = _assertUnremoved;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _libRemovalHooks = require("./lib/removal-hooks");

var removalHooks = _interopRequireWildcard(_libRemovalHooks);

/**
 * Deprecated in favor of `dangerouslyRemove` as it's far more scary and more accurately portrays
 * the risk.
 */

function remove() {
  console.trace("Path#remove has been renamed to Path#dangerouslyRemove, removing a node is extremely dangerous so please refrain using it.");
  return this.dangerouslyRemove();
}

/**
 * Dangerously remove the current node. This may sometimes result in a tainted
 * invalid AST so use with caution.
 */

function dangerouslyRemove() {
  this._assertUnremoved();

  this.resync();

  if (this._callRemovalHooks("pre")) {
    this._markRemoved();
    return;
  }

  this.shareCommentsWithSiblings();
  this._remove();
  this._markRemoved();

  this._callRemovalHooks("post");
}

/**
 * [Please add a description.]
 */

function _callRemovalHooks(position) {
  var _arr = removalHooks[position];

  for (var _i = 0; _i < _arr.length; _i++) {
    var fn = _arr[_i];
    if (fn(this, this.parentPath)) return true;
  }
}

/**
 * [Please add a description.]
 */

function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this.container[this.key] = null;
  }
}

/**
 * [Please add a description.]
 */

function _markRemoved() {
  this.shouldSkip = true;
  this.removed = true;
  this.node = null;
}

/**
 * [Please add a description.]
 */

function _assertUnremoved() {
  if (this.removed) {
    throw this.errorWithNode("NodePath has been removed so is read-only.");
  }
}
}, function(modId) { var map = {"./lib/removal-hooks":1676544235586}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235586, function(require, module, exports) {
// this file contains hooks that handle ancestry cleanup of parent nodes when removing children



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * Pre hooks should be used for either rejecting removal or delegating removal
 */

var pre = [

/**
 * [Please add a description.]
 */

function (self) {
  if (self.key === "body" && (self.isBlockStatement() || self.isClassBody())) {
    // function () NODE
    // class NODE
    // attempting to remove a block statement that's someones body so let's just clear all the inner
    // statements instead
    self.node.body = [];
    return true;
  }
},

/**
 * [Please add a description.]
 */

function (self, parent) {
  var replace = false;

  // () => NODE;
  // removing the body of an arrow function
  replace = replace || self.key === "body" && parent.isArrowFunctionExpression();

  // throw NODE;
  // removing a throw statement argument
  replace = replace || self.key === "argument" && parent.isThrowStatement();

  if (replace) {
    self.replaceWith(t.identifier("undefined"));
    return true;
  }
}];

exports.pre = pre;
/**
 * Post hooks should be used for cleaning up parents
 */

var post = [

/**
 * [Please add a description.]
 */

function (self, parent) {
  var removeParent = false;

  // while (NODE);
  // removing the test of a while/switch, we can either just remove it entirely *or* turn the `test` into `true`
  // unlikely that the latter will ever be what's wanted so we just remove the loop to avoid infinite recursion
  removeParent = removeParent || self.key === "test" && (parent.isWhile() || parent.isSwitchCase());

  // export NODE;
  // just remove a declaration for an export as this is no longer valid
  removeParent = removeParent || self.key === "declaration" && parent.isExportDeclaration();

  // label: NODE
  // stray labeled statement with no body
  removeParent = removeParent || self.key === "body" && parent.isLabeledStatement();

  // var NODE;
  // remove an entire declaration if there are no declarators left
  removeParent = removeParent || self.listKey === "declarations" && parent.isVariableDeclaration() && parent.node.declarations.length === 0;

  // NODE;
  // remove the entire expression statement if there's no expression
  removeParent = removeParent || self.key === "expression" && parent.isExpressionStatement();

  // if (NODE);
  // remove the entire if since the consequent is never going to be hit, if there's an alternate then it's already been
  // handled with the `pre` hook
  removeParent = removeParent || self.key === "test" && parent.isIfStatement();

  if (removeParent) {
    parent.dangerouslyRemove();
    return true;
  }
},

/**
 * [Please add a description.]
 */

function (self, parent) {
  if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
    // (node, NODE);
    // we've just removed the second element of a sequence expression so let's turn that sequence
    // expression into a regular expression
    parent.replaceWith(parent.node.expressions[0]);
    return true;
  }
},

/**
 * [Please add a description.]
 */

function (self, parent) {
  if (parent.isBinary()) {
    // left + NODE;
    // NODE + right;
    // we're in a binary expression, better remove it and replace it with the last expression
    if (self.key === "left") {
      parent.replaceWith(parent.node.right);
    } else {
      // key === "right"
      parent.replaceWith(parent.node.left);
    }
    return true;
  }
}];
exports.post = post;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235587, function(require, module, exports) {


exports.__esModule = true;
exports.insertBefore = insertBefore;
exports._containerInsert = _containerInsert;
exports._containerInsertBefore = _containerInsertBefore;
exports._containerInsertAfter = _containerInsertAfter;
exports._maybePopFromStatements = _maybePopFromStatements;
exports.insertAfter = insertAfter;
exports.updateSiblingKeys = updateSiblingKeys;
exports._verifyNodeList = _verifyNodeList;
exports.unshiftContainer = unshiftContainer;
exports.pushContainer = pushContainer;
exports.hoist = hoist;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libHoister = require("./lib/hoister");

var _libHoister2 = _interopRequireDefault(_libHoister);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Insert the provided nodes before the current one.
 */

function insertBefore(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertBefore(nodes);
  } else if (this.isNodeType("Expression") || this.parentPath.isForStatement() && this.key === "init") {
    if (this.node) nodes.push(this.node);
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertBefore(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.push(this.node);
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * [Please add a description.]
 */

function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  var paths = [];

  for (var i = 0; i < nodes.length; i++) {
    var to = from + i;
    var node = nodes[i];
    this.container.splice(to, 0, node);

    if (this.context) {
      var path = this.context.create(this.parent, this.container, to, this.listKey);
      paths.push(path);
      this.queueNode(path);
    } else {
      paths.push(_index2["default"].get({
        parentPath: this,
        parent: node,
        container: this.container,
        listKey: this.listKey,
        key: to
      }));
    }
  }

  return paths;
}

/**
 * [Please add a description.]
 */

function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

/**
 * [Please add a description.]
 */

function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

/**
 * [Please add a description.]
 */

function _maybePopFromStatements(nodes) {
  var last = nodes[nodes.length - 1];
  if (t.isExpressionStatement(last) && t.isIdentifier(last.expression) && !this.isCompletionRecord()) {
    nodes.pop();
  }
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */

function insertAfter(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertAfter(nodes);
  } else if (this.isNodeType("Expression") || this.parentPath.isForStatement() && this.key === "init") {
    if (this.node) {
      var temp = this.scope.generateDeclaredUidIdentifier();
      nodes.unshift(t.expressionStatement(t.assignmentExpression("=", temp, this.node)));
      nodes.push(t.expressionStatement(temp));
    }
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertAfter(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.unshift(this.node);
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * Update all sibling node paths after `fromIndex` by `incrementBy`.
 */

function updateSiblingKeys(fromIndex, incrementBy) {
  var paths = this.parent._paths;
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

/**
 * [Please add a description.]
 */

function _verifyNodeList(nodes) {
  if (nodes.constructor !== Array) {
    nodes = [nodes];
  }

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) {
      throw new Error("Node list has falsy node with the index of " + i);
    } else if (typeof node !== "object") {
      throw new Error("Node list contains a non-object node with the index of " + i);
    } else if (!node.type) {
      throw new Error("Node list contains a node without a type with the index of " + i);
    } else if (node instanceof _index2["default"]) {
      nodes[i] = node.node;
    }
  }

  return nodes;
}

/**
 * [Please add a description.]
 */

function unshiftContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway

  var container = this.node[listKey];
  var path = _index2["default"].get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey: listKey,
    key: 0
  });

  return path.insertBefore(nodes);
}

/**
 * [Please add a description.]
 */

function pushContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  var container = this.node[listKey];
  var i = container.length;
  var path = _index2["default"].get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey: listKey,
    key: i
  });

  return path.replaceWith(nodes, true);
}

/**
 * Hoist the current node to the highest scope possible and return a UID
 * referencing it.
 */

function hoist() {
  var scope = arguments.length <= 0 || arguments[0] === undefined ? this.scope : arguments[0];

  var hoister = new _libHoister2["default"](this, scope);
  return hoister.run();
}
}, function(modId) { var map = {"./lib/hoister":1676544235588,"./index":1676544235552,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235588, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _transformationHelpersReact = require("../../../transformation/helpers/react");

var react = _interopRequireWildcard(_transformationHelpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var referenceVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (this.isJSXIdentifier() && react.isCompatTag(node.name)) {
      return;
    }

    // direct references that we need to track to hoist this to the highest scope we can
    var binding = scope.getBinding(node.name);
    if (!binding) return;

    // this binding isn't accessible from the parent scope so we can safely ignore it
    // eg. it's in a closure etc
    if (binding !== state.scope.getBinding(node.name)) return;

    if (binding.constant) {
      state.bindings[node.name] = binding;
    } else {
      var _arr = binding.constantViolations;

      for (var _i = 0; _i < _arr.length; _i++) {
        var violationPath = _arr[_i];
        state.breakOnScopePaths = state.breakOnScopePaths.concat(violationPath.getAncestry());
      }
    }
  }
};

/**
 * [Please add a description.]
 */

var PathHoister = (function () {
  function PathHoister(path, scope) {
    _classCallCheck(this, PathHoister);

    this.breakOnScopePaths = [];
    this.bindings = {};
    this.scopes = [];
    this.scope = scope;
    this.path = path;
  }

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.isCompatibleScope = function isCompatibleScope(scope) {
    for (var key in this.bindings) {
      var binding = this.bindings[key];
      if (!scope.bindingIdentifierEquals(key, binding.identifier)) {
        return false;
      }
    }

    return true;
  };

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.getCompatibleScopes = function getCompatibleScopes() {
    var scope = this.path.scope;
    do {
      if (this.isCompatibleScope(scope)) {
        this.scopes.push(scope);
      } else {
        break;
      }

      if (this.breakOnScopePaths.indexOf(scope.path) >= 0) {
        break;
      }
    } while (scope = scope.parent);
  };

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.getAttachmentPath = function getAttachmentPath() {
    var scopes = this.scopes;

    var scope = scopes.pop();
    if (!scope) return;

    if (scope.path.isFunction()) {
      if (this.hasOwnParamBindings(scope)) {
        // should ignore this scope since it's ourselves
        if (this.scope === scope) return;

        // needs to be attached to the body
        return scope.path.get("body").get("body")[0];
      } else {
        // doesn't need to be be attached to this scope
        return this.getNextScopeStatementParent();
      }
    } else if (scope.path.isProgram()) {
      return this.getNextScopeStatementParent();
    }
  };

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.getNextScopeStatementParent = function getNextScopeStatementParent() {
    var scope = this.scopes.pop();
    if (scope) return scope.path.getStatementParent();
  };

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.hasOwnParamBindings = function hasOwnParamBindings(scope) {
    for (var name in this.bindings) {
      if (!scope.hasOwnBinding(name)) continue;

      var binding = this.bindings[name];
      if (binding.kind === "param") return true;
    }
    return false;
  };

  /**
   * [Please add a description.]
   */

  PathHoister.prototype.run = function run() {
    var node = this.path.node;
    if (node._hoisted) return;
    node._hoisted = true;

    this.path.traverse(referenceVisitor, this);

    this.getCompatibleScopes();

    var attachTo = this.getAttachmentPath();
    if (!attachTo) return;

    // don't bother hoisting to the same function as this will cause multiple branches to be evaluated more than once leading to a bad optimisation
    if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;

    var uid = attachTo.scope.generateUidIdentifier("ref");

    attachTo.insertBefore([t.variableDeclaration("var", [t.variableDeclarator(uid, this.path.node)])]);

    var parent = this.path.parentPath;

    if (parent.isJSXElement() && this.path.container === parent.node.children) {
      // turning the `span` in `<div><span /></div>` to an expression so we need to wrap it with
      // an expression container
      uid = t.JSXExpressionContainer(uid);
    }

    this.path.replaceWith(uid);
  };

  return PathHoister;
})();

exports["default"] = PathHoister;
module.exports = exports["default"];
}, function(modId) { var map = {"../../../transformation/helpers/react":1676544235554,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235589, function(require, module, exports) {


exports.__esModule = true;
exports.getStatementParent = getStatementParent;
exports.getOpposite = getOpposite;
exports.getCompletionRecords = getCompletionRecords;
exports.getSibling = getSibling;
exports.get = get;
exports._getKey = _getKey;
exports._getPattern = _getPattern;
exports.getBindingIdentifiers = getBindingIdentifiers;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function getStatementParent() {
  var path = this;

  do {
    if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);

  if (path && (path.isProgram() || path.isFile())) {
    throw new Error("File/Program node, we can't possibly find a statement parent to this");
  }

  return path;
}

/**
 * [Please add a description.]
 */

function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

/**
 * [Please add a description.]
 */

function getCompletionRecords() {
  var paths = [];

  var add = function add(path) {
    if (path) paths = paths.concat(path.getCompletionRecords());
  };

  if (this.isIfStatement()) {
    add(this.get("consequent"));
    add(this.get("alternate"));
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    add(this.get("body"));
  } else if (this.isProgram() || this.isBlockStatement()) {
    add(this.get("body").pop());
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    add(this.get("block"));
    add(this.get("handler"));
    add(this.get("finalizer"));
  } else {
    paths.push(this);
  }

  return paths;
}

/**
 * [Please add a description.]
 */

function getSibling(key) {
  return _index2["default"].get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}

/**
 * [Please add a description.]
 */

function get(key, context) {
  if (context === true) context = this.context;
  var parts = key.split(".");
  if (parts.length === 1) {
    // "foo"
    return this._getKey(key, context);
  } else {
    // "foo.bar"
    return this._getPattern(parts, context);
  }
}

/**
 * [Please add a description.]
 */

function _getKey(key, context) {
  // istanbul ignore next

  var _this = this;

  var node = this.node;
  var container = node[key];

  if (Array.isArray(container)) {
    // requested a container so give them all the paths
    return container.map(function (_, i) {
      return _index2["default"].get({
        listKey: key,
        parentPath: _this,
        parent: node,
        container: container,
        key: i
      }).setContext(context);
    });
  } else {
    return _index2["default"].get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }
}

/**
 * [Please add a description.]
 */

function _getPattern(parts, context) {
  var path = this;
  var _arr = parts;
  for (var _i = 0; _i < _arr.length; _i++) {
    var part = _arr[_i];
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}

/**
 * [Please add a description.]
 */

function getBindingIdentifiers(duplicates) {
  return t.getBindingIdentifiers(this.node, duplicates);
}
}, function(modId) { var map = {"./index":1676544235552,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235590, function(require, module, exports) {
/**
 * Share comments amongst siblings.
 */



exports.__esModule = true;
exports.shareCommentsWithSiblings = shareCommentsWithSiblings;
exports.addComment = addComment;
exports.addComments = addComments;

function shareCommentsWithSiblings() {
  var node = this.node;
  if (!node) return;

  var trailing = node.trailingComments;
  var leading = node.leadingComments;
  if (!trailing && !leading) return;

  var prev = this.getSibling(this.key - 1);
  var next = this.getSibling(this.key + 1);

  if (!prev.node) prev = next;
  if (!next.node) next = prev;

  prev.addComments("trailing", leading);
  next.addComments("leading", trailing);
}

/**
 * [Please add a description.]
 */

function addComment(type, content, line) {
  this.addComments(type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}

/**
 * Give node `comments` of the specified `type`.
 */

function addComments(type, comments) {
  if (!comments) return;

  var node = this.node;
  if (!node) return;

  var key = type + "Comments";

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235591, function(require, module, exports) {


exports.__esModule = true;
exports.explode = explode;
exports.verify = verify;
exports.merge = merge;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _pathLibVirtualTypes = require("./path/lib/virtual-types");

var virtualTypes = _interopRequireWildcard(_pathLibVirtualTypes);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

/**
 * [Please add a description.]
 */

function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  // normalise pipes
  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var parts = nodeType.split("|");
    if (parts.length === 1) continue;

    var fns = visitor[nodeType];
    delete visitor[nodeType];

    var _arr = parts;
    for (var _i = 0; _i < _arr.length; _i++) {
      var part = _arr[_i];
      visitor[part] = fns;
    }
  }

  // verify data structure
  verify(visitor);

  // make sure there's no __esModule type since this is because we're using loose mode
  // and it sets __esModule to be enumerable on all modules :(
  delete visitor.__esModule;

  // ensure visitors are objects
  ensureEntranceObjects(visitor);

  // ensure enter/exit callbacks are arrays
  ensureCallbackArrays(visitor);

  // add type wrappers

  var _arr2 = Object.keys(visitor);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var nodeType = _arr2[_i2];
    if (shouldIgnoreKey(nodeType)) continue;

    var wrapper = virtualTypes[nodeType];
    if (!wrapper) continue;

    // wrap all the functions
    var fns = visitor[nodeType];
    for (var type in fns) {
      fns[type] = wrapCheck(wrapper, fns[type]);
    }

    // clear it from the visitor
    delete visitor[nodeType];

    if (wrapper.types) {
      var _arr4 = wrapper.types;

      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var type = _arr4[_i4];
        // merge the visitor if necessary or just put it back in
        if (visitor[type]) {
          mergePair(visitor[type], fns);
        } else {
          visitor[type] = fns;
        }
      }
    } else {
      mergePair(visitor, fns);
    }
  }

  // add aliases
  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var fns = visitor[nodeType];

    var aliases = t.FLIPPED_ALIAS_KEYS[nodeType];
    if (!aliases) continue;

    // clear it from the visitor
    delete visitor[nodeType];

    var _arr3 = aliases;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var alias = _arr3[_i3];
      var existing = visitor[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        visitor[alias] = _lodashLangClone2["default"](fns);
      }
    }
  }

  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    ensureCallbackArrays(visitor[nodeType]);
  }

  return visitor;
}

/**
 * [Please add a description.]
 */

function verify(visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(messages.get("traverseVerifyRootFunction"));
  }

  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    if (t.TYPES.indexOf(nodeType) < 0) {
      throw new Error(messages.get("traverseVerifyNodeType", nodeType));
    }

    var visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (var visitorKey in visitors) {
        if (visitorKey === "enter" || visitorKey === "exit") continue;
        throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
      }
    }
  }

  visitor._verified = true;
}

/**
 * [Please add a description.]
 */

function merge(visitors) {
  var rootVisitor = {};

  var _arr5 = visitors;
  for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
    var visitor = _arr5[_i5];
    explode(visitor);

    for (var type in visitor) {
      var nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};
      mergePair(nodeVisitor, visitor[type]);
    }
  }

  return rootVisitor;
}

/**
 * [Please add a description.]
 */

function ensureEntranceObjects(obj) {
  for (var key in obj) {
    if (shouldIgnoreKey(key)) continue;

    var fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = { enter: fns };
    }
  }
}

/**
 * Makes sure that enter and exit callbacks are arrays.
 */

function ensureCallbackArrays(obj) {
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}

/**
 * [Please add a description.]
 */

function wrapCheck(wrapper, fn) {
  return function () {
    if (wrapper.checkPath(this)) {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * [Please add a description.]
 */

function shouldIgnoreKey(key) {
  // internal/hidden key
  if (key[0] === "_") return true;

  // ignore function keys
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  // ignore other options
  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  return false;
}

/**
 * [Please add a description.]
 */

function mergePair(dest, src) {
  for (var key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
}, function(modId) { var map = {"./path/lib/virtual-types":1676544235553,"../messages":1676544235569,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235592, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _convertSourceMap = require("convert-source-map");

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

var _modules = require("../modules");

var _modules2 = _interopRequireDefault(_modules);

var _optionsOptionManager = require("./options/option-manager");

var _optionsOptionManager2 = _interopRequireDefault(_optionsOptionManager);

var _pluginManager = require("./plugin-manager");

var _pluginManager2 = _interopRequireDefault(_pluginManager);

var _shebangRegex = require("shebang-regex");

var _shebangRegex2 = _interopRequireDefault(_shebangRegex);

var _traversalPath = require("../../traversal/path");

var _traversalPath2 = _interopRequireDefault(_traversalPath);

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _generation = require("../../generation");

var _generation2 = _interopRequireDefault(_generation);

var _helpersCodeFrame = require("../../helpers/code-frame");

var _helpersCodeFrame2 = _interopRequireDefault(_helpersCodeFrame);

var _lodashObjectDefaults = require("lodash/object/defaults");

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _traversal = require("../../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _tryResolve = require("try-resolve");

var _tryResolve2 = _interopRequireDefault(_tryResolve);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _plugin = require("../plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _helpersParse = require("../../helpers/parse");

var _helpersParse2 = _interopRequireDefault(_helpersParse);

var _traversalHub = require("../../traversal/hub");

var _traversalHub2 = _interopRequireDefault(_traversalHub);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var File = (function () {
  function File(opts, pipeline) {
    if (opts === undefined) opts = {};

    _classCallCheck(this, File);

    this.transformerDependencies = {};
    this.dynamicImportTypes = {};
    this.dynamicImportIds = {};
    this.dynamicImports = [];
    this.declarations = {};
    this.usedHelpers = {};
    this.dynamicData = {};
    this.data = {};
    this.ast = {};
    this.metadata = {
      modules: {
        imports: [],
        exports: {
          exported: [],
          specifiers: []
        }
      }
    };
    this.hub = new _traversalHub2["default"](this);

    this.pipeline = pipeline;

    this.log = new _logger2["default"](this, opts.filename || "unknown");
    this.opts = this.initOptions(opts);

    this.buildTransformers();
  }

  /**
   * [Please add a description.]
   */

  File.prototype.initOptions = function initOptions(opts) {
    opts = new _optionsOptionManager2["default"](this.log, this.pipeline).init(opts);

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    opts.basename = _path2["default"].basename(opts.filename, _path2["default"].extname(opts.filename));

    opts.ignore = util.arrayify(opts.ignore, util.regexify);

    if (opts.only) opts.only = util.arrayify(opts.only, util.regexify);

    _lodashObjectDefaults2["default"](opts, {
      moduleRoot: opts.sourceRoot
    });

    _lodashObjectDefaults2["default"](opts, {
      sourceRoot: opts.moduleRoot
    });

    _lodashObjectDefaults2["default"](opts, {
      filenameRelative: opts.filename
    });

    _lodashObjectDefaults2["default"](opts, {
      sourceFileName: opts.filenameRelative,
      sourceMapTarget: opts.filenameRelative
    });

    //

    if (opts.externalHelpers) {
      this.set("helpersNamespace", t.identifier("babelHelpers"));
    }

    return opts;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.isLoose = function isLoose(key) {
    return _lodashCollectionIncludes2["default"](this.opts.loose, key);
  };

  /**
   * [Please add a description.]
   */

  File.prototype.buildTransformers = function buildTransformers() {
    var file = this;

    var transformers = this.transformers = {};

    var secondaryStack = [];
    var stack = [];

    // build internal transformers
    for (var key in this.pipeline.transformers) {
      var transformer = this.pipeline.transformers[key];
      var pass = transformers[key] = transformer.buildPass(file);

      if (pass.canTransform()) {
        stack.push(pass);

        if (transformer.metadata.secondPass) {
          secondaryStack.push(pass);
        }

        if (transformer.manipulateOptions) {
          transformer.manipulateOptions(file.opts, file);
        }
      }
    }

    // init plugins!
    var beforePlugins = [];
    var afterPlugins = [];
    var pluginManager = new _pluginManager2["default"]({
      file: this,
      transformers: this.transformers,
      before: beforePlugins,
      after: afterPlugins
    });
    for (var i = 0; i < file.opts.plugins.length; i++) {
      pluginManager.add(file.opts.plugins[i]);
    }
    stack = beforePlugins.concat(stack, afterPlugins);

    // build transformer stack
    this.uncollapsedTransformerStack = stack = stack.concat(secondaryStack);

    // build dependency graph
    var _arr = stack;
    for (var _i = 0; _i < _arr.length; _i++) {
      var pass = _arr[_i];var _arr2 = pass.plugin.dependencies;

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var dep = _arr2[_i2];
        this.transformerDependencies[dep] = pass.key;
      }
    }

    // collapse stack categories
    this.transformerStack = this.collapseStack(stack);
  };

  /**
   * [Please add a description.]
   */

  File.prototype.collapseStack = function collapseStack(_stack) {
    var stack = [];
    var ignore = [];

    var _arr3 = _stack;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var pass = _arr3[_i3];
      // been merged
      if (ignore.indexOf(pass) >= 0) continue;

      var group = pass.plugin.metadata.group;

      // can't merge
      if (!pass.canTransform() || !group) {
        stack.push(pass);
        continue;
      }

      var mergeStack = [];
      var _arr4 = _stack;
      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var _pass = _arr4[_i4];
        if (_pass.plugin.metadata.group === group) {
          mergeStack.push(_pass);
          ignore.push(_pass);
        }
      }

      var visitors = [];
      var _arr5 = mergeStack;
      for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
        var _pass2 = _arr5[_i5];
        visitors.push(_pass2.plugin.visitor);
      }
      var visitor = _traversal2["default"].visitors.merge(visitors);
      var mergePlugin = new _plugin2["default"](group, { visitor: visitor });
      stack.push(mergePlugin.buildPass(this));
    }

    return stack;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.set = function set(key, val) {
    return this.data[key] = val;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.setDynamic = function setDynamic(key, fn) {
    this.dynamicData[key] = fn;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.get = function get(key) {
    var data = this.data[key];
    if (data) {
      return data;
    } else {
      var dynamic = this.dynamicData[key];
      if (dynamic) {
        return this.set(key, dynamic());
      }
    }
  };

  /**
   * [Please add a description.]
   */

  File.prototype.resolveModuleSource = function resolveModuleSource(source) {
    var resolveModuleSource = this.opts.resolveModuleSource;
    if (resolveModuleSource) source = resolveModuleSource(source, this.opts.filename);
    return source;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.addImport = function addImport(source, name, type) {
    name = name || source;
    var id = this.dynamicImportIds[name];

    if (!id) {
      source = this.resolveModuleSource(source);
      id = this.dynamicImportIds[name] = this.scope.generateUidIdentifier(name);

      var specifiers = [t.importDefaultSpecifier(id)];
      var declar = t.importDeclaration(specifiers, t.literal(source));
      declar._blockHoist = 3;

      if (type) {
        var modules = this.dynamicImportTypes[type] = this.dynamicImportTypes[type] || [];
        modules.push(declar);
      }

      if (this.transformers["es6.modules"].canTransform()) {
        this.moduleFormatter.importSpecifier(specifiers[0], declar, this.dynamicImports, this.scope);
        this.moduleFormatter.hasLocalImports = true;
      } else {
        this.dynamicImports.push(declar);
      }
    }

    return id;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.attachAuxiliaryComment = function attachAuxiliaryComment(node) {
    var beforeComment = this.opts.auxiliaryCommentBefore;
    if (beforeComment) {
      node.leadingComments = node.leadingComments || [];
      node.leadingComments.push({
        type: "CommentLine",
        value: " " + beforeComment
      });
    }

    var afterComment = this.opts.auxiliaryCommentAfter;
    if (afterComment) {
      node.trailingComments = node.trailingComments || [];
      node.trailingComments.push({
        type: "CommentLine",
        value: " " + afterComment
      });
    }

    return node;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.addHelper = function addHelper(name) {
    var isSolo = _lodashCollectionIncludes2["default"](File.soloHelpers, name);

    if (!isSolo && !_lodashCollectionIncludes2["default"](File.helpers, name)) {
      throw new ReferenceError("Unknown helper " + name);
    }

    var declar = this.declarations[name];
    if (declar) return declar;

    this.usedHelpers[name] = true;

    if (!isSolo) {
      var generator = this.get("helperGenerator");
      var runtime = this.get("helpersNamespace");
      if (generator) {
        return generator(name);
      } else if (runtime) {
        var id = t.identifier(t.toIdentifier(name));
        return t.memberExpression(runtime, id);
      }
    }

    var ref = util.template("helper-" + name);

    var uid = this.declarations[name] = this.scope.generateUidIdentifier(name);

    if (t.isFunctionExpression(ref) && !ref.id) {
      ref.body._compact = true;
      ref._generated = true;
      ref.id = uid;
      ref.type = "FunctionDeclaration";
      this.attachAuxiliaryComment(ref);
      this.path.unshiftContainer("body", ref);
    } else {
      ref._compact = true;
      this.scope.push({
        id: uid,
        init: ref,
        unique: true
      });
    }

    return uid;
  };

  File.prototype.addTemplateObject = function addTemplateObject(helperName, strings, raw) {
    // Generate a unique name based on the string literals so we dedupe
    // identical strings used in the program.
    var stringIds = raw.elements.map(function (string) {
      return string.value;
    });
    var name = helperName + "_" + raw.elements.length + "_" + stringIds.join(",");

    var declar = this.declarations[name];
    if (declar) return declar;

    var uid = this.declarations[name] = this.scope.generateUidIdentifier("templateObject");

    var helperId = this.addHelper(helperName);
    var init = t.callExpression(helperId, [strings, raw]);
    init._compact = true;
    this.scope.push({
      id: uid,
      init: init,
      _blockHoist: 1.9 // This ensures that we don't fail if not using function expression helpers
    });
    return uid;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.errorWithNode = function errorWithNode(node, msg) {
    var Error = arguments.length <= 2 || arguments[2] === undefined ? SyntaxError : arguments[2];

    var err;
    var loc = node && (node.loc || node._loc);
    if (loc) {
      err = new Error("Line " + loc.start.line + ": " + msg);
      err.loc = loc.start;
    } else {
      // todo: find errors with nodes inside to at least point to something
      err = new Error("There's been an error on a dynamic node. This is almost certainly an internal error. Please report it.");
    }
    return err;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.mergeSourceMap = function mergeSourceMap(map) {
    var opts = this.opts;

    var inputMap = opts.inputSourceMap;

    if (inputMap) {
      map.sources[0] = inputMap.file;

      var inputMapConsumer = new _sourceMap2["default"].SourceMapConsumer(inputMap);
      var outputMapConsumer = new _sourceMap2["default"].SourceMapConsumer(map);
      var outputMapGenerator = _sourceMap2["default"].SourceMapGenerator.fromSourceMap(outputMapConsumer);
      outputMapGenerator.applySourceMap(inputMapConsumer);

      var mergedMap = outputMapGenerator.toJSON();
      mergedMap.sources = inputMap.sources;
      mergedMap.file = inputMap.file;
      return mergedMap;
    }

    return map;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.getModuleFormatter = function getModuleFormatter(type) {
    if (_lodashLangIsFunction2["default"](type) || !_modules2["default"][type]) {
      this.log.deprecate("Custom module formatters are deprecated and will be removed in the next major. Please use Babel plugins instead.");
    }

    var ModuleFormatter = _lodashLangIsFunction2["default"](type) ? type : _modules2["default"][type];

    if (!ModuleFormatter) {
      var loc = _tryResolve2["default"].relative(type);
      if (loc) ModuleFormatter = require(loc);
    }

    if (!ModuleFormatter) {
      throw new ReferenceError("Unknown module formatter type " + JSON.stringify(type));
    }

    return new ModuleFormatter(this);
  };

  /**
   * [Please add a description.]
   */

  File.prototype.parse = function parse(code) {
    var opts = this.opts;

    //

    var parseOpts = {
      highlightCode: opts.highlightCode,
      nonStandard: opts.nonStandard,
      sourceType: opts.sourceType,
      filename: opts.filename,
      plugins: {}
    };

    var features = parseOpts.features = {};
    for (var key in this.transformers) {
      var transformer = this.transformers[key];
      features[key] = transformer.canTransform();
    }

    parseOpts.looseModules = this.isLoose("es6.modules");
    parseOpts.strictMode = features.strict;

    this.log.debug("Parse start");
    var ast = _helpersParse2["default"](code, parseOpts);
    this.log.debug("Parse stop");
    return ast;
  };

  /**
   * [Please add a description.]
   */

  File.prototype._addAst = function _addAst(ast) {
    this.path = _traversalPath2["default"].get({
      hub: this.hub,
      parentPath: null,
      parent: ast,
      container: ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
    this.ast = ast;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.addAst = function addAst(ast) {
    this.log.debug("Start set AST");
    this._addAst(ast);
    this.log.debug("End set AST");

    this.log.debug("Start module formatter init");
    var modFormatter = this.moduleFormatter = this.getModuleFormatter(this.opts.modules);
    if (modFormatter.init && this.transformers["es6.modules"].canTransform()) {
      modFormatter.init();
    }
    this.log.debug("End module formatter init");
  };

  /**
   * [Please add a description.]
   */

  File.prototype.transform = function transform() {
    this.call("pre");
    var _arr6 = this.transformerStack;
    for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
      var pass = _arr6[_i6];
      pass.transform();
    }
    this.call("post");

    return this.generate();
  };

  /**
   * [Please add a description.]
   */

  File.prototype.wrap = function wrap(code, callback) {
    code = code + "";

    try {
      if (this.shouldIgnore()) {
        return this.makeResult({ code: code, ignored: true });
      } else {
        return callback();
      }
    } catch (err) {
      if (err._babel) {
        throw err;
      } else {
        err._babel = true;
      }

      var message = err.message = this.opts.filename + ": " + err.message;

      var loc = err.loc;
      if (loc) {
        err.codeFrame = _helpersCodeFrame2["default"](code, loc.line, loc.column + 1, this.opts);
        message += "\n" + err.codeFrame;
      }

      if (process.browser) {
        // chrome has it's own pretty stringifier which doesn't use the stack property
        // https://github.com/babel/babel/issues/2175
        err.message = message;
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        try {
          err.stack = newStack;
        } catch (e) {
          // `err.stack` may be a readonly property in some environments
        }
      }

      throw err;
    }
  };

  /**
   * [Please add a description.]
   */

  File.prototype.addCode = function addCode(code) {
    code = (code || "") + "";
    code = this.parseInputSourceMap(code);
    this.code = code;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.parseCode = function parseCode() {
    this.parseShebang();
    var ast = this.parse(this.code);
    this.addAst(ast);
  };

  /**
   * [Please add a description.]
   */

  File.prototype.shouldIgnore = function shouldIgnore() {
    var opts = this.opts;
    return util.shouldIgnore(opts.filename, opts.ignore, opts.only);
  };

  /**
   * [Please add a description.]
   */

  File.prototype.call = function call(key) {
    var _arr7 = this.uncollapsedTransformerStack;

    for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
      var pass = _arr7[_i7];
      var fn = pass.plugin[key];
      if (fn) fn(this);
    }
  };

  /**
   * [Please add a description.]
   */

  File.prototype.parseInputSourceMap = function parseInputSourceMap(code) {
    var opts = this.opts;

    if (opts.inputSourceMap !== false) {
      var inputMap = _convertSourceMap2["default"].fromSource(code);
      if (inputMap) {
        opts.inputSourceMap = inputMap.toObject();
        code = _convertSourceMap2["default"].removeComments(code);
      }
    }

    return code;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.parseShebang = function parseShebang() {
    var shebangMatch = _shebangRegex2["default"].exec(this.code);
    if (shebangMatch) {
      this.shebang = shebangMatch[0];
      this.code = this.code.replace(_shebangRegex2["default"], "");
    }
  };

  /**
   * [Please add a description.]
   */

  File.prototype.makeResult = function makeResult(_ref) {
    var code = _ref.code;
    var _ref$map = _ref.map;
    var map = _ref$map === undefined ? null : _ref$map;
    var ast = _ref.ast;
    var ignored = _ref.ignored;

    var result = {
      metadata: null,
      ignored: !!ignored,
      code: null,
      ast: null,
      map: map
    };

    if (this.opts.code) {
      result.code = code;
    }

    if (this.opts.ast) {
      result.ast = ast;
    }

    if (this.opts.metadata) {
      result.metadata = this.metadata;
      result.metadata.usedHelpers = Object.keys(this.usedHelpers);
    }

    return result;
  };

  /**
   * [Please add a description.]
   */

  File.prototype.generate = function generate() {
    var opts = this.opts;
    var ast = this.ast;

    var result = { ast: ast };
    if (!opts.code) return this.makeResult(result);

    this.log.debug("Generation start");

    var _result = _generation2["default"](ast, opts, this.code);
    result.code = _result.code;
    result.map = _result.map;

    this.log.debug("Generation end");

    if (this.shebang) {
      // add back shebang
      result.code = this.shebang + "\n" + result.code;
    }

    if (result.map) {
      result.map = this.mergeSourceMap(result.map);
    }

    if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
      result.code += "\n" + _convertSourceMap2["default"].fromObject(result.map).toComment();
    }

    if (opts.sourceMaps === "inline") {
      result.map = null;
    }

    return this.makeResult(result);
  };

  _createClass(File, null, [{
    key: "helpers",

    /**
     * [Please add a description.]
     */

    value: ["inherits", "defaults", "create-class", "create-decorated-class", "create-decorated-object", "define-decorated-property-descriptor", "tagged-template-literal", "tagged-template-literal-loose", "to-array", "to-consumable-array", "sliced-to-array", "sliced-to-array-loose", "object-without-properties", "has-own", "slice", "bind", "define-property", "async-to-generator", "interop-export-wildcard", "interop-require-wildcard", "interop-require-default", "typeof", "extends", "get", "set", "new-arrow-check", "class-call-check", "object-destructuring-empty", "temporal-undefined", "temporal-assert-defined", "self-global", "typeof-react-element", "default-props", "instanceof",

    // legacy
    "interop-require"],

    /**
     * [Please add a description.]
     */

    enumerable: true
  }, {
    key: "soloHelpers",
    value: [],
    enumerable: true
  }]);

  return File;
})();

exports["default"] = File;
module.exports = exports["default"];
}, function(modId) { var map = {"../modules":1676544235593,"./options/option-manager":1676544235606,"./plugin-manager":1676544235546,"../../traversal/path":1676544235552,"../../generation":1676544235610,"../../helpers/code-frame":1676544235580,"../../traversal":1676544235550,"./logger":1676544235630,"../plugin":1676544235548,"../../helpers/parse":1676544235571,"../../traversal/hub":1676544235631,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235593, function(require, module, exports) {
/**
 * [Please add a description.]
 */



exports.__esModule = true;
exports["default"] = {
  commonStrict: require("./common-strict"),
  amdStrict: require("./amd-strict"),
  umdStrict: require("./umd-strict"),
  common: require("./common"),
  system: require("./system"),
  ignore: require("./ignore"),
  amd: require("./amd"),
  umd: require("./umd")
};
module.exports = exports["default"];
}, function(modId) { var map = {"./common-strict":1676544235594,"./amd-strict":1676544235600,"./umd-strict":1676544235602,"./common":1676544235595,"./system":1676544235604,"./ignore":1676544235605,"./amd":1676544235601,"./umd":1676544235603}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235594, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _common = require("./common");

var _common2 = _interopRequireDefault(_common);

var _strict = require("./_strict");

var _strict2 = _interopRequireDefault(_strict);

/**
 * [Please add a description.]
 */

exports["default"] = _strict2["default"](_common2["default"]);
module.exports = exports["default"];
}, function(modId) { var map = {"./common":1676544235595,"./_strict":1676544235599}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235595, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var CommonJSFormatter = (function (_DefaultFormatter) {
  _inherits(CommonJSFormatter, _DefaultFormatter);

  function CommonJSFormatter() {
    _classCallCheck(this, CommonJSFormatter);

    _DefaultFormatter.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.setup = function setup() {
    this._setup(this.hasLocalExports);
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype._setup = function _setup(conditional) {
    var file = this.file;
    var scope = file.scope;

    scope.rename("module");
    scope.rename("exports");

    if (!this.noInteropRequireImport && conditional) {
      var templateName = "exports-module-declaration";
      if (this.file.isLoose("es6.modules")) templateName += "-loose";
      var declar = util.template(templateName, true);
      declar._blockHoist = 3;
      file.path.unshiftContainer("body", [declar]);
    }
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.transform = function transform(program) {
    _default2["default"].prototype.transform.apply(this, arguments);

    if (this.hasDefaultOnlyExport) {
      program.body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.identifier("module"), t.identifier("exports")), t.memberExpression(t.identifier("exports"), t.identifier("default")))));
    }
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.importSpecifier = function importSpecifier(specifier, node, nodes, scope) {
    var variableName = specifier.local;

    var ref = this.getExternalReference(node, nodes);

    // import foo from "foo";
    if (t.isSpecifierDefault(specifier)) {
      if (this.isModuleType(node, "absolute")) {
        // absolute module reference
      } else if (this.isModuleType(node, "absoluteDefault")) {
          this.remaps.add(scope, variableName.name, ref);
        } else if (this.noInteropRequireImport) {
          this.remaps.add(scope, variableName.name, t.memberExpression(ref, t.identifier("default")));
        } else {
          var uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");

          nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, t.callExpression(this.file.addHelper("interop-require-default"), [ref]))]));

          this.remaps.add(scope, variableName.name, t.memberExpression(uid, t.identifier("default")));
        }
    } else {
      if (t.isImportNamespaceSpecifier(specifier)) {
        if (!this.noInteropRequireImport) {
          ref = t.callExpression(this.file.addHelper("interop-require-wildcard"), [ref]);
        }

        // import * as bar from "foo";
        nodes.push(t.variableDeclaration("var", [t.variableDeclarator(variableName, ref)]));
      } else {
        // import { foo } from "foo";
        this.remaps.add(scope, variableName.name, t.memberExpression(ref, t.identifier(specifier.imported.name)));
      }
    }
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.importDeclaration = function importDeclaration(node, nodes) {
    // import "foo";
    nodes.push(util.template("require", {
      MODULE_NAME: node.source
    }, true));
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.exportSpecifier = function exportSpecifier(specifier) {
    if (this.doDefaultExportInterop(specifier)) {
      this.hasDefaultOnlyExport = true;
    }

    _default2["default"].prototype.exportSpecifier.apply(this, arguments);
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype.exportDeclaration = function exportDeclaration(node) {
    if (this.doDefaultExportInterop(node)) {
      this.hasDefaultOnlyExport = true;
    }

    _default2["default"].prototype.exportDeclaration.apply(this, arguments);
  };

  /**
   * [Please add a description.]
   */

  CommonJSFormatter.prototype._getExternalReference = function _getExternalReference(node, nodes) {
    var call = t.callExpression(t.identifier("require"), [node.source]);
    var uid;

    if (this.isModuleType(node, "absolute")) {
      // absolute module reference
    } else if (this.isModuleType(node, "absoluteDefault")) {
        call = t.memberExpression(call, t.identifier("default"));
      } else {
        uid = this.scope.generateUidIdentifierBasedOnNode(node, "import");
      }

    uid = uid || node.specifiers[0].local;

    var declar = t.variableDeclaration("var", [t.variableDeclarator(uid, call)]);
    nodes.push(declar);
    return uid;
  };

  return CommonJSFormatter;
})(_default2["default"]);

exports["default"] = CommonJSFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./_default":1676544235596,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235596, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _libMetadata = require("./lib/metadata");

var metadataVisitor = _interopRequireWildcard(_libMetadata);

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _libRemaps = require("./lib/remaps");

var _libRemaps2 = _interopRequireDefault(_libRemaps);

var _helpersObject = require("../../helpers/object");

var _helpersObject2 = _interopRequireDefault(_helpersObject);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var DefaultFormatter = (function () {
  function DefaultFormatter(file) {
    _classCallCheck(this, DefaultFormatter);

    // object containg all module sources with the scope that they're contained in
    this.sourceScopes = _helpersObject2["default"]();

    // ids for use in module ids
    this.defaultIds = _helpersObject2["default"]();
    this.ids = _helpersObject2["default"]();

    // contains reference aliases for live bindings
    this.remaps = new _libRemaps2["default"](file, this);

    this.scope = file.scope;
    this.file = file;

    this.hasNonDefaultExports = false;

    this.hasLocalExports = false;
    this.hasLocalImports = false;

    this.localExports = _helpersObject2["default"]();
    this.localImports = _helpersObject2["default"]();

    this.metadata = file.metadata.modules;
    this.getMetadata();
  }

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.addScope = function addScope(path) {
    var source = path.node.source && path.node.source.value;
    if (!source) return;

    var existingScope = this.sourceScopes[source];
    if (existingScope && existingScope !== path.scope) {
      throw path.errorWithNode(messages.get("modulesDuplicateDeclarations"));
    }

    this.sourceScopes[source] = path.scope;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.isModuleType = function isModuleType(node, type) {
    var modules = this.file.dynamicImportTypes[type];
    return modules && modules.indexOf(node) >= 0;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.transform = function transform() {
    this.remapAssignments();
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.doDefaultExportInterop = function doDefaultExportInterop(node) {
    return (t.isExportDefaultDeclaration(node) || t.isSpecifierDefault(node)) && !this.noInteropRequireExport && !this.hasNonDefaultExports;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getMetadata = function getMetadata() {
    var has = false;
    var _arr = this.file.ast.program.body;
    for (var _i = 0; _i < _arr.length; _i++) {
      var node = _arr[_i];
      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has || this.isLoose()) {
      this.file.path.traverse(metadataVisitor, this);
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.remapAssignments = function remapAssignments() {
    if (this.hasLocalExports || this.hasLocalImports) {
      this.remaps.run();
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.remapExportAssignment = function remapExportAssignment(node, exported) {
    var assign = node;

    for (var i = 0; i < exported.length; i++) {
      assign = t.assignmentExpression("=", t.memberExpression(t.identifier("exports"), exported[i]), assign);
    }

    return assign;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._addExport = function _addExport(name, exported) {
    var info = this.localExports[name] = this.localExports[name] || {
      binding: this.scope.getBindingIdentifier(name),
      exported: []
    };
    info.exported.push(exported);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getExport = function getExport(node, scope) {
    if (!t.isIdentifier(node)) return;

    var local = this.localExports[node.name];
    if (local && local.binding === scope.getBindingIdentifier(node.name)) {
      return local.exported;
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getModuleName = function getModuleName() {
    var opts = this.file.opts;
    // moduleId is n/a if a `getModuleId()` is provided
    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    var filenameRelative = opts.filenameRelative;
    var moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      // remove sourceRoot from filename
      var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    if (!opts.keepModuleIdExtensions) {
      // remove extension
      filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");
    }

    moduleName += filenameRelative;

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      // If return is falsy, assume they want us to use our generated default name
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._pushStatement = function _pushStatement(ref, nodes) {
    if (t.isClass(ref) || t.isFunction(ref)) {
      if (ref.id) {
        nodes.push(t.toStatement(ref));
        ref = ref.id;
      }
    }

    return ref;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype._hoistExport = function _hoistExport(declar, assign, priority) {
    if (t.isFunctionDeclaration(declar)) {
      assign._blockHoist = priority || 2;
    }

    return assign;
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.getExternalReference = function getExternalReference(node, nodes) {
    var ids = this.ids;
    var id = node.source.value;

    if (ids[id]) {
      return ids[id];
    } else {
      return this.ids[id] = this._getExternalReference(node, nodes);
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.checkExportIdentifier = function checkExportIdentifier(node) {
    if (t.isIdentifier(node, { name: "__esModule" })) {
      throw this.file.errorWithNode(node, messages.get("modulesIllegalExportName", node.name));
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportAllDeclaration = function exportAllDeclaration(node, nodes) {
    var ref = this.getExternalReference(node, nodes);
    nodes.push(this.buildExportsWildcard(ref, node));
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.isLoose = function isLoose() {
    return this.file.isLoose("es6.modules");
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportSpecifier = function exportSpecifier(specifier, node, nodes) {
    if (node.source) {
      var ref = this.getExternalReference(node, nodes);

      if (specifier.local.name === "default" && !this.noInteropRequireExport) {
        // importing a default so we need to normalize it
        ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
      } else {
        ref = t.memberExpression(ref, specifier.local);

        if (!this.isLoose()) {
          nodes.push(this.buildExportsFromAssignment(specifier.exported, ref, node));
          return;
        }
      }

      // export { foo } from "test";
      nodes.push(this.buildExportsAssignment(specifier.exported, ref, node));
    } else {
      // export { foo };
      nodes.push(this.buildExportsAssignment(specifier.exported, specifier.local, node));
    }
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsWildcard = function buildExportsWildcard(objectIdentifier) {
    return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [t.identifier("exports"), t.callExpression(this.file.addHelper("interop-export-wildcard"), [objectIdentifier, this.file.addHelper("defaults")])]));
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsFromAssignment = function buildExportsFromAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-from-assign", {
      INIT: init,
      ID: t.literal(id.name)
    }, true);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.buildExportsAssignment = function buildExportsAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-assign", {
      VALUE: init,
      KEY: id
    }, true);
  };

  /**
   * [Please add a description.]
   */

  DefaultFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    var declar = node.declaration;

    var id = declar.id;

    if (t.isExportDefaultDeclaration(node)) {
      id = t.identifier("default");
    }

    var assign;

    if (t.isVariableDeclaration(declar)) {
      for (var i = 0; i < declar.declarations.length; i++) {
        var decl = declar.declarations[i];

        decl.init = this.buildExportsAssignment(decl.id, decl.init, node).expression;

        var newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === 0) t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      var ref = declar;

      if (t.isFunctionDeclaration(declar) || t.isClassDeclaration(declar)) {
        ref = declar.id;
        nodes.push(declar);
      }

      assign = this.buildExportsAssignment(id, ref, node);

      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  };

  return DefaultFormatter;
})();

exports["default"] = DefaultFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./lib/metadata":1676544235597,"../../messages":1676544235569,"./lib/remaps":1676544235598,"../../helpers/object":1676544235574,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235597, function(require, module, exports) {


exports.__esModule = true;
exports.ExportDeclaration = ExportDeclaration;
exports.Scope = Scope;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var ModuleDeclaration = {
  enter: function enter(node, parent, scope, formatter) {
    if (node.source) {
      node.source.value = formatter.file.resolveModuleSource(node.source.value);
      formatter.addScope(this);
    }
  }
};

exports.ModuleDeclaration = ModuleDeclaration;
/**
 * [Please add a description.]
 */

var ImportDeclaration = {
  exit: function exit(node, parent, scope, formatter) {
    formatter.hasLocalImports = true;

    var specifiers = [];
    var imported = [];
    formatter.metadata.imports.push({
      source: node.source.value,
      imported: imported,
      specifiers: specifiers
    });

    var _arr = this.get("specifiers");

    for (var _i = 0; _i < _arr.length; _i++) {
      var specifier = _arr[_i];
      var ids = specifier.getBindingIdentifiers();
      _lodashObjectExtend2["default"](formatter.localImports, ids);

      var local = specifier.node.local.name;

      if (specifier.isImportDefaultSpecifier()) {
        imported.push("default");
        specifiers.push({
          kind: "named",
          imported: "default",
          local: local
        });
      }

      if (specifier.isImportSpecifier()) {
        var importedName = specifier.node.imported.name;
        imported.push(importedName);
        specifiers.push({
          kind: "named",
          imported: importedName,
          local: local
        });
      }

      if (specifier.isImportNamespaceSpecifier()) {
        imported.push("*");
        specifiers.push({
          kind: "namespace",
          local: local
        });
      }
    }
  }
};

exports.ImportDeclaration = ImportDeclaration;
/**
 * [Please add a description.]
 */

function ExportDeclaration(node, parent, scope, formatter) {
  formatter.hasLocalExports = true;

  var source = node.source ? node.source.value : null;
  var exports = formatter.metadata.exports;

  // export function foo() {}
  // export var foo = "bar";
  var declar = this.get("declaration");
  if (declar.isStatement()) {
    var bindings = declar.getBindingIdentifiers();

    for (var name in bindings) {
      var binding = bindings[name];
      formatter._addExport(name, binding);

      exports.exported.push(name);
      exports.specifiers.push({
        kind: "local",
        local: name,
        exported: this.isExportDefaultDeclaration() ? "default" : name
      });
    }
  }

  if (this.isExportNamedDeclaration() && node.specifiers) {
    var _arr2 = node.specifiers;

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var specifier = _arr2[_i2];
      var exported = specifier.exported.name;
      exports.exported.push(exported);

      // export foo from "bar";
      if (t.isExportDefaultSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external",
          local: exported,
          exported: exported,
          source: source
        });
      }

      // export * as foo from "bar";
      if (t.isExportNamespaceSpecifier(specifier)) {
        exports.specifiers.push({
          kind: "external-namespace",
          exported: exported,
          source: source
        });
      }

      var local = specifier.local;
      if (!local) continue;

      formatter._addExport(local.name, specifier.exported);

      // export { foo } from "bar";
      // export { foo as bar } from "bar";
      if (source) {
        exports.specifiers.push({
          kind: "external",
          local: local.name,
          exported: exported,
          source: source
        });
      }

      // export { foo };
      // export { foo as bar };
      if (!source) {
        exports.specifiers.push({
          kind: "local",
          local: local.name,
          exported: exported
        });
      }
    }
  }

  // export * from "bar";
  if (this.isExportAllDeclaration()) {
    exports.specifiers.push({
      kind: "external-all",
      source: source
    });
  }

  if (!t.isExportDefaultDeclaration(node) && !declar.isTypeAlias()) {
    var onlyDefault = node.specifiers && node.specifiers.length === 1 && t.isSpecifierDefault(node.specifiers[0]);
    if (!onlyDefault) {
      formatter.hasNonDefaultExports = true;
    }
  }
}

/**
 * [Please add a description.]
 */

function Scope(node, parent, scope, formatter) {
  if (!formatter.isLoose()) {
    this.skip();
  }
}
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235598, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var remapVisitor = {

  /**
   * [Please add a description.]
   */

  enter: function enter(node) {
    if (node._skipModulesRemap) {
      return this.skip();
    }
  },

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, remaps) {
    var formatter = remaps.formatter;

    var remap = remaps.get(scope, node.name);
    if (!remap || node === remap) return;

    if (!scope.hasBinding(node.name) || scope.bindingIdentifierEquals(node.name, formatter.localImports[node.name])) {
      if (!formatter.isLoose() && this.key === "callee" && this.parentPath.isCallExpression()) {
        return t.sequenceExpression([t.literal(0), remap]);
      } else {
        return remap;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  AssignmentExpression: {
    exit: function exit(node, parent, scope, _ref) {
      var formatter = _ref.formatter;

      if (!node._ignoreModulesRemap) {
        var exported = formatter.getExport(node.left, scope);
        if (exported) {
          return formatter.remapExportAssignment(node, exported);
        }
      }
    }
  },

  /**
   * [Please add a description.]
   */

  UpdateExpression: function UpdateExpression(node, parent, scope, _ref2) {
    var formatter = _ref2.formatter;

    var exported = formatter.getExport(node.argument, scope);
    if (!exported) return;

    this.skip();

    // expand to long file assignment expression
    var assign = t.assignmentExpression(node.operator[0] + "=", node.argument, t.literal(1));

    // remap this assignment expression
    var remapped = formatter.remapExportAssignment(assign, exported);

    // we don't need to change the result
    if (t.isExpressionStatement(parent) || node.prefix) {
      return remapped;
    }

    var nodes = [];
    nodes.push(remapped);

    var operator;
    if (node.operator === "--") {
      operator = "+";
    } else {
      // "++"
      operator = "-";
    }
    nodes.push(t.binaryExpression(operator, node.argument, t.literal(1)));

    return t.sequenceExpression(nodes);
  }
};

/**
 * [Please add a description.]
 */

var Remaps = (function () {
  function Remaps(file, formatter) {
    _classCallCheck(this, Remaps);

    this.formatter = formatter;
    this.file = file;
  }

  /**
   * [Please add a description.]
   */

  Remaps.prototype.run = function run() {
    this.file.path.traverse(remapVisitor, this);
  };

  /**
   * [Please add a description.]
   */

  Remaps.prototype._getKey = function _getKey(name) {
    return name + ":moduleRemap";
  };

  /**
   * [Please add a description.]
   */

  Remaps.prototype.get = function get(scope, name) {
    return scope.getData(this._getKey(name));
  };

  /**
   * [Please add a description.]
   */

  Remaps.prototype.add = function add(scope, name, val) {
    if (this.all) {
      this.all.push({
        name: name,
        scope: scope,
        node: val
      });
    }

    return scope.setData(this._getKey(name), val);
  };

  /**
   * [Please add a description.]
   */

  Remaps.prototype.remove = function remove(scope, name) {
    return scope.removeData(this._getKey(name));
  };

  /**
   * These methods are used by the system module formatter who needs access to all the remaps
   * so it can process them into it's specific setter method. We don't do this by default since
   * no other module formatters need access to this.
   */

  Remaps.prototype.getAll = function getAll() {
    return this.all;
  };

  /**
   * [Please add a description.]
   */

  Remaps.prototype.clearAll = function clearAll() {
    if (this.all) {
      var _arr = this.all;

      for (var _i = 0; _i < _arr.length; _i++) {
        var remap = _arr[_i];
        remap.scope.removeData(this._getKey(remap.name));
      }
    }

    this.all = [];
  };

  return Remaps;
})();

exports["default"] = Remaps;
module.exports = exports["default"];
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235599, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

/**
 * [Please add a description.]
 */

exports["default"] = function (Parent) {
  var Constructor = function Constructor() {
    this.noInteropRequireImport = true;
    this.noInteropRequireExport = true;
    Parent.apply(this, arguments);
  };

  util.inherits(Constructor, Parent);

  return Constructor;
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../util":1676544235570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235600, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _amd = require("./amd");

var _amd2 = _interopRequireDefault(_amd);

var _strict = require("./_strict");

var _strict2 = _interopRequireDefault(_strict);

/**
 * [Please add a description.]
 */

exports["default"] = _strict2["default"](_amd2["default"]);
module.exports = exports["default"];
}, function(modId) { var map = {"./amd":1676544235601,"./_strict":1676544235599}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235601, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _common = require("./common");

var _common2 = _interopRequireDefault(_common);

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _lodashObjectValues = require("lodash/object/values");

var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var AMDFormatter = (function (_DefaultFormatter) {
  _inherits(AMDFormatter, _DefaultFormatter);

  function AMDFormatter() {
    _classCallCheck(this, AMDFormatter);

    _DefaultFormatter.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.setup = function setup() {
    _common2["default"].prototype._setup.call(this, this.hasNonDefaultExports);
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.buildDependencyLiterals = function buildDependencyLiterals() {
    var names = [];
    for (var name in this.ids) {
      names.push(t.literal(name));
    }
    return names;
  };

  /**
   * Wrap the entire body in a `define` wrapper.
   */

  AMDFormatter.prototype.transform = function transform(program) {
    _common2["default"].prototype.transform.apply(this, arguments);

    var body = program.body;

    // build an array of module names

    var names = [t.literal("exports")];
    if (this.passModuleArg) names.push(t.literal("module"));
    names = names.concat(this.buildDependencyLiterals());
    names = t.arrayExpression(names);

    // build up define container

    var params = _lodashObjectValues2["default"](this.ids);
    if (this.passModuleArg) params.unshift(t.identifier("module"));
    params.unshift(t.identifier("exports"));

    var container = t.functionExpression(null, params, t.blockStatement(body));

    var defineArgs = [names, container];
    var moduleName = this.getModuleName();
    if (moduleName) defineArgs.unshift(t.literal(moduleName));

    var call = t.callExpression(t.identifier("define"), defineArgs);

    program.body = [t.expressionStatement(call)];
  };

  /**
   * Get the AMD module name that we'll prepend to the wrapper
   * to define this module
   */

  AMDFormatter.prototype.getModuleName = function getModuleName() {
    if (this.file.opts.moduleIds) {
      return _default2["default"].prototype.getModuleName.apply(this, arguments);
    } else {
      return null;
    }
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype._getExternalReference = function _getExternalReference(node) {
    return this.scope.generateUidIdentifier(node.source.value);
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.importDeclaration = function importDeclaration(node) {
    this.getExternalReference(node);
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.importSpecifier = function importSpecifier(specifier, node, nodes, scope) {
    var key = node.source.value;
    var ref = this.getExternalReference(node);

    if (t.isImportNamespaceSpecifier(specifier) || t.isImportDefaultSpecifier(specifier)) {
      this.defaultIds[key] = specifier.local;
    }

    if (this.isModuleType(node, "absolute")) {
      // absolute module reference
    } else if (this.isModuleType(node, "absoluteDefault")) {
        // prevent unnecessary renaming of dynamic imports
        this.ids[node.source.value] = ref;
        ref = t.memberExpression(ref, t.identifier("default"));
      } else if (t.isImportNamespaceSpecifier(specifier)) {
        // import * as bar from "foo";
      } else if (!_lodashCollectionIncludes2["default"](this.file.dynamicImported, node) && t.isSpecifierDefault(specifier) && !this.noInteropRequireImport) {
          // import foo from "foo";
          var uid = scope.generateUidIdentifier(specifier.local.name);
          nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, t.callExpression(this.file.addHelper("interop-require-default"), [ref]))]));
          ref = t.memberExpression(uid, t.identifier("default"));
        } else {
          // import { foo } from "foo";
          var imported = specifier.imported;
          if (t.isSpecifierDefault(specifier)) imported = t.identifier("default");
          ref = t.memberExpression(ref, imported);
        }

    this.remaps.add(scope, specifier.local.name, ref);
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.exportSpecifier = function exportSpecifier(specifier, node, nodes) {
    if (this.doDefaultExportInterop(specifier)) {
      this.passModuleArg = true;

      if (specifier.exported !== specifier.local && !node.source) {
        nodes.push(util.template("exports-default-assign", {
          VALUE: specifier.local
        }, true));
        return;
      }
    }

    _common2["default"].prototype.exportSpecifier.apply(this, arguments);
  };

  /**
   * [Please add a description.]
   */

  AMDFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    if (this.doDefaultExportInterop(node)) {
      this.passModuleArg = true;

      var declar = node.declaration;
      var assign = util.template("exports-default-assign", {
        VALUE: this._pushStatement(declar, nodes)
      }, true);

      if (t.isFunctionDeclaration(declar)) {
        // we can hoist this assignment to the top of the file
        assign._blockHoist = 3;
      }

      nodes.push(assign);
      return;
    }

    _default2["default"].prototype.exportDeclaration.apply(this, arguments);
  };

  return AMDFormatter;
})(_default2["default"]);

exports["default"] = AMDFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./_default":1676544235596,"./common":1676544235595,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235602, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _umd = require("./umd");

var _umd2 = _interopRequireDefault(_umd);

var _strict = require("./_strict");

var _strict2 = _interopRequireDefault(_strict);

/**
 * [Please add a description.]
 */

exports["default"] = _strict2["default"](_umd2["default"]);
module.exports = exports["default"];
}, function(modId) { var map = {"./umd":1676544235603,"./_strict":1676544235599}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235603, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _amd = require("./amd");

var _amd2 = _interopRequireDefault(_amd);

var _lodashObjectValues = require("lodash/object/values");

var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var UMDFormatter = (function (_AMDFormatter) {
  _inherits(UMDFormatter, _AMDFormatter);

  function UMDFormatter() {
    _classCallCheck(this, UMDFormatter);

    _AMDFormatter.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  UMDFormatter.prototype.transform = function transform(program) {
    _default2["default"].prototype.transform.apply(this, arguments);

    var body = program.body;

    // build an array of module names

    var names = [];
    for (var _name in this.ids) {
      names.push(t.literal(_name));
    }

    // factory

    var ids = _lodashObjectValues2["default"](this.ids);
    var args = [t.identifier("exports")];
    if (this.passModuleArg) args.push(t.identifier("module"));
    args = args.concat(ids);

    var factory = t.functionExpression(null, args, t.blockStatement(body));

    // amd

    var defineArgs = [t.literal("exports")];
    if (this.passModuleArg) defineArgs.push(t.literal("module"));
    defineArgs = defineArgs.concat(names);
    defineArgs = [t.arrayExpression(defineArgs)];

    // common

    var testExports = util.template("test-exports");
    var testModule = util.template("test-module");
    var commonTests = this.passModuleArg ? t.logicalExpression("&&", testExports, testModule) : testExports;

    var commonArgs = [t.identifier("exports")];
    if (this.passModuleArg) commonArgs.push(t.identifier("module"));
    commonArgs = commonArgs.concat(names.map(function (name) {
      return t.callExpression(t.identifier("require"), [name]);
    }));

    // globals

    var browserArgs = [];
    if (this.passModuleArg) browserArgs.push(t.identifier("mod"));

    for (var _name2 in this.ids) {
      var id = this.defaultIds[_name2] || t.identifier(t.toIdentifier(_path2["default"].basename(_name2, _path2["default"].extname(_name2))));
      browserArgs.push(t.memberExpression(t.identifier("global"), id));
    }

    //

    var moduleName = this.getModuleName();
    if (moduleName) defineArgs.unshift(t.literal(moduleName));

    //
    var globalArg = this.file.opts.basename;
    if (moduleName) globalArg = moduleName;
    globalArg = t.identifier(t.toIdentifier(globalArg));

    var runner = util.template("umd-runner-body", {
      AMD_ARGUMENTS: defineArgs,
      COMMON_TEST: commonTests,
      COMMON_ARGUMENTS: commonArgs,
      BROWSER_ARGUMENTS: browserArgs,
      GLOBAL_ARG: globalArg
    });

    //

    program.body = [t.expressionStatement(t.callExpression(runner, [t.thisExpression(), factory]))];
  };

  return UMDFormatter;
})(_amd2["default"]);

exports["default"] = UMDFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./_default":1676544235596,"./amd":1676544235601,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235604, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _amd = require("./amd");

var _amd2 = _interopRequireDefault(_amd);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _lodashArrayLast = require("lodash/array/last");

var _lodashArrayLast2 = _interopRequireDefault(_lodashArrayLast);

var _lodashCollectionMap = require("lodash/collection/map");

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var hoistVariablesVisitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    // nothing inside is accessible
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  VariableDeclaration: function VariableDeclaration(node, parent, scope, state) {
    if (node.kind !== "var" && !t.isProgram(parent)) {
      // let, const
      // can't be accessed
      return;
    }

    // ignore block hoisted nodes as these can be left in
    if (state.formatter._canHoist(node)) return;

    var nodes = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      state.hoistDeclarators.push(t.variableDeclarator(declar.id));
      if (declar.init) {
        // no initializer so we can just hoist it as-is
        var assign = t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init));
        nodes.push(assign);
      }
    }

    // for (var i in test)
    if (t.isFor(parent) && parent.left === node) {
      return node.declarations[0].id;
    }

    return nodes;
  }
};

/**
 * [Please add a description.]
 */

var hoistFunctionsVisitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent, scope, state) {
    if (t.isFunctionDeclaration(node) || state.formatter._canHoist(node)) {
      state.handlerBody.push(node);
      this.dangerouslyRemove();
    }
  }
};

/**
 * [Please add a description.]
 */

var runnerSettersVisitor = {

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent, scope, state) {
    if (node._importSource === state.source) {
      if (t.isVariableDeclaration(node)) {
        var _arr = node.declarations;

        for (var _i = 0; _i < _arr.length; _i++) {
          var declar = _arr[_i];
          state.hoistDeclarators.push(t.variableDeclarator(declar.id));
          state.nodes.push(t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init)));
        }
      } else {
        state.nodes.push(node);
      }

      this.dangerouslyRemove();
    }
  }
};

/**
 * [Please add a description.]
 */

var SystemFormatter = (function (_AMDFormatter) {
  _inherits(SystemFormatter, _AMDFormatter);

  function SystemFormatter(file) {
    _classCallCheck(this, SystemFormatter);

    _AMDFormatter.call(this, file);

    this._setters = null;
    this.exportIdentifier = file.scope.generateUidIdentifier("export");
    this.noInteropRequireExport = true;
    this.noInteropRequireImport = true;

    this.remaps.clearAll();
  }

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype._addImportSource = function _addImportSource(node, exportNode) {
    if (node) node._importSource = exportNode.source && exportNode.source.value;
    return node;
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.buildExportsWildcard = function buildExportsWildcard(objectIdentifier, node) {
    var leftIdentifier = this.scope.generateUidIdentifier("key");
    var valIdentifier = t.memberExpression(objectIdentifier, leftIdentifier, true);

    var left = t.variableDeclaration("var", [t.variableDeclarator(leftIdentifier)]);

    var right = objectIdentifier;

    var block = t.blockStatement([t.ifStatement(t.binaryExpression("!==", leftIdentifier, t.literal("default")), t.expressionStatement(this._buildExportCall(leftIdentifier, valIdentifier)))]);

    return this._addImportSource(t.forInStatement(left, right, block), node);
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.buildExportsAssignment = function buildExportsAssignment(id, init, node) {
    var call = this._buildExportCall(t.literal(id.name), init, true);
    return this._addImportSource(call, node);
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.buildExportsFromAssignment = function buildExportsFromAssignment() {
    return this.buildExportsAssignment.apply(this, arguments);
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.remapExportAssignment = function remapExportAssignment(node, exported) {
    var assign = node;

    for (var i = 0; i < exported.length; i++) {
      assign = this._buildExportCall(t.literal(exported[i].name), assign);
    }

    return assign;
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype._buildExportCall = function _buildExportCall(id, init, isStatement) {
    var call = t.callExpression(this.exportIdentifier, [id, init]);
    if (isStatement) {
      return t.expressionStatement(call);
    } else {
      return call;
    }
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.importSpecifier = function importSpecifier(specifier, node, nodes) {
    _amd2["default"].prototype.importSpecifier.apply(this, arguments);

    var _arr2 = this.remaps.getAll();

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var remap = _arr2[_i2];
      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(t.identifier(remap.name), remap.node)]));
    }

    this.remaps.clearAll();

    this._addImportSource(_lodashArrayLast2["default"](nodes), node);
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype._buildRunnerSetters = function _buildRunnerSetters(block, hoistDeclarators) {
    var scope = this.file.scope;

    return t.arrayExpression(_lodashCollectionMap2["default"](this.ids, function (uid, source) {
      var state = {
        hoistDeclarators: hoistDeclarators,
        source: source,
        nodes: []
      };

      scope.traverse(block, runnerSettersVisitor, state);

      return t.functionExpression(null, [uid], t.blockStatement(state.nodes));
    }));
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype._canHoist = function _canHoist(node) {
    return node._blockHoist && !this.file.dynamicImports.length;
  };

  /**
   * [Please add a description.]
   */

  SystemFormatter.prototype.transform = function transform(program) {
    _default2["default"].prototype.transform.apply(this, arguments);

    var hoistDeclarators = [];
    var moduleName = this.getModuleName();
    var moduleNameLiteral = t.literal(moduleName);

    var block = t.blockStatement(program.body);

    var setterListNode = this._buildRunnerSetters(block, hoistDeclarators);
    this._setters = setterListNode;

    var runner = util.template("system", {
      MODULE_DEPENDENCIES: t.arrayExpression(this.buildDependencyLiterals()),
      EXPORT_IDENTIFIER: this.exportIdentifier,
      MODULE_NAME: moduleNameLiteral,
      SETTERS: setterListNode,
      EXECUTE: t.functionExpression(null, [], block)
    }, true);

    var handlerBody = runner.expression.arguments[2].body.body;
    if (!moduleName) runner.expression.arguments.shift();

    var returnStatement = handlerBody.pop();

    // hoist up all variable declarations
    this.file.scope.traverse(block, hoistVariablesVisitor, {
      formatter: this,
      hoistDeclarators: hoistDeclarators
    });

    if (hoistDeclarators.length) {
      var hoistDeclar = t.variableDeclaration("var", hoistDeclarators);
      hoistDeclar._blockHoist = true;
      handlerBody.unshift(hoistDeclar);
    }

    // hoist up function declarations for circular references
    this.file.scope.traverse(block, hoistFunctionsVisitor, {
      formatter: this,
      handlerBody: handlerBody
    });

    handlerBody.push(returnStatement);

    program.body = [runner];
  };

  return SystemFormatter;
})(_amd2["default"]);

exports["default"] = SystemFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./_default":1676544235596,"./amd":1676544235601,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235605, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var IgnoreFormatter = (function (_DefaultFormatter) {
  _inherits(IgnoreFormatter, _DefaultFormatter);

  function IgnoreFormatter() {
    _classCallCheck(this, IgnoreFormatter);

    _DefaultFormatter.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  IgnoreFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    var declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  };

  /**
   * [Please add a description.]
   */

  IgnoreFormatter.prototype.exportAllDeclaration = function exportAllDeclaration() {};

  IgnoreFormatter.prototype.importDeclaration = function importDeclaration() {};

  IgnoreFormatter.prototype.importSpecifier = function importSpecifier() {};

  IgnoreFormatter.prototype.exportSpecifier = function exportSpecifier() {};

  IgnoreFormatter.prototype.transform = function transform() {};

  return IgnoreFormatter;
})(_default2["default"]);

exports["default"] = IgnoreFormatter;
module.exports = exports["default"];
}, function(modId) { var map = {"./_default":1676544235596,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235606, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _index = require("./index");

var _json5 = require("json5");

var _json52 = _interopRequireDefault(_json5);

var _pathIsAbsolute = require("path-is-absolute");

var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _helpersMerge = require("../../../helpers/merge");

var _helpersMerge2 = _interopRequireDefault(_helpersMerge);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var existsCache = {};
var jsonCache = {};

var BABELIGNORE_FILENAME = ".babelignore";
var BABELRC_FILENAME = ".babelrc";
var PACKAGE_FILENAME = "package.json";

function exists(filename) {
  var cached = existsCache[filename];
  if (cached != null) {
    return cached;
  } else {
    return existsCache[filename] = _pathExists2["default"].sync(filename);
  }
}

var OptionManager = (function () {
  function OptionManager(log, pipeline) {
    _classCallCheck(this, OptionManager);

    this.resolvedConfigs = [];
    this.options = OptionManager.createBareOptions();
    this.pipeline = pipeline;
    this.log = log;
  }

  /**
   * [Please add a description.]
   */

  OptionManager.createBareOptions = function createBareOptions() {
    var opts = {};

    for (var key in _config2["default"]) {
      var opt = _config2["default"][key];
      opts[key] = _lodashLangClone2["default"](opt["default"]);
    }

    return opts;
  };

  /**
   * [Please add a description.]
   */

  OptionManager.prototype.addConfig = function addConfig(loc, key) {
    var json = arguments.length <= 2 || arguments[2] === undefined ? _json52["default"] : arguments[2];

    if (this.resolvedConfigs.indexOf(loc) >= 0) return;

    var content = _fs2["default"].readFileSync(loc, "utf8");
    var opts;

    try {
      opts = jsonCache[content] = jsonCache[content] || json.parse(content);
      if (key) opts = opts[key];
    } catch (err) {
      err.message = loc + ": Error while parsing JSON - " + err.message;
      throw err;
    }

    this.mergeOptions(opts, loc);
    this.resolvedConfigs.push(loc);
  };

  /**
   * [Please add a description.]
   */

  OptionManager.prototype.mergeOptions = function mergeOptions(opts) {
    var alias = arguments.length <= 1 || arguments[1] === undefined ? "foreign" : arguments[1];

    if (!opts) return;

    for (var key in opts) {
      if (key[0] === "_") continue;

      var option = _config2["default"][key];

      // check for an unknown option
      if (!option) this.log.error("Unknown option: " + alias + "." + key, ReferenceError);
    }

    // normalise options
    _index.normaliseOptions(opts);

    // merge them into this current files options
    _helpersMerge2["default"](this.options, opts);
  };

  /**
   * [Please add a description.]
   */

  OptionManager.prototype.addIgnoreConfig = function addIgnoreConfig(loc) {
    var file = _fs2["default"].readFileSync(loc, "utf8");
    var lines = file.split("\n");

    lines = lines.map(function (line) {
      return line.replace(/#(.*?)$/, "").trim();
    }).filter(function (line) {
      return !!line;
    });

    this.mergeOptions({ ignore: lines }, loc);
  };

  /**
   * Description
   */

  OptionManager.prototype.findConfigs = function findConfigs(loc) {
    if (!loc) return;

    if (!_pathIsAbsolute2["default"](loc)) {
      loc = _path2["default"].join(process.cwd(), loc);
    }

    while (loc !== (loc = _path2["default"].dirname(loc))) {
      if (this.options.breakConfig) return;

      var configLoc = _path2["default"].join(loc, BABELRC_FILENAME);
      if (exists(configLoc)) this.addConfig(configLoc);

      var pkgLoc = _path2["default"].join(loc, PACKAGE_FILENAME);
      if (exists(pkgLoc)) this.addConfig(pkgLoc, "babel", JSON);

      var ignoreLoc = _path2["default"].join(loc, BABELIGNORE_FILENAME);
      if (exists(ignoreLoc)) this.addIgnoreConfig(ignoreLoc);
    }
  };

  /**
   * [Please add a description.]
   */

  OptionManager.prototype.normaliseOptions = function normaliseOptions() {
    var opts = this.options;

    for (var key in _config2["default"]) {
      var option = _config2["default"][key];
      var val = opts[key];

      // optional
      if (!val && option.optional) continue;

      // deprecated
      if (this.log && val && option.deprecated) {
        this.log.deprecate("Deprecated option " + key + ": " + option.deprecated);
      }

      // validate
      if (this.pipeline && val) {
        val = _index.validateOption(key, val, this.pipeline);
      }

      // aaliases
      if (option.alias) {
        opts[option.alias] = opts[option.alias] || val;
      } else {
        opts[key] = val;
      }
    }
  };

  /**
   * [Please add a description.]
   */

  OptionManager.prototype.init = function init(opts) {
    this.mergeOptions(opts, "direct");

    // babelrc option
    if (opts.babelrc) {
      var _arr = opts.babelrc;

      for (var _i = 0; _i < _arr.length; _i++) {
        var loc = _arr[_i];this.addConfig(loc);
      }
    }

    // resolve all .babelrc files
    if (opts.babelrc !== false) {
      this.findConfigs(opts.filename);
    }

    // merge in env
    var envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (this.options.env) {
      this.mergeOptions(this.options.env[envKey], "direct.env." + envKey);
    }

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  };

  return OptionManager;
})();

exports["default"] = OptionManager;
module.exports = exports["default"];
}, function(modId) { var map = {"./index":1676544235607,"../../../helpers/merge":1676544235609}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235607, function(require, module, exports) {


exports.__esModule = true;
exports.validateOption = validateOption;
exports.normaliseOptions = normaliseOptions;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _parsers = require("./parsers");

var parsers = _interopRequireWildcard(_parsers);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

exports.config = _config2["default"];

/**
 * Validate an option.
 */

function validateOption(key, val, pipeline) {
  var opt = _config2["default"][key];
  var parser = opt && parsers[opt.type];
  if (parser && parser.validate) {
    return parser.validate(key, val, pipeline);
  } else {
    return val;
  }
}

/**
 * Normalize all options.
 */

function normaliseOptions() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  for (var key in options) {
    var val = options[key];
    if (val == null) continue;

    var opt = _config2["default"][key];
    if (!opt) continue;

    var parser = parsers[opt.type];
    if (parser) val = parser(val);

    options[key] = val;
  }

  return options;
}
}, function(modId) { var map = {"./parsers":1676544235608}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235608, function(require, module, exports) {


exports.__esModule = true;
exports.transformerList = transformerList;
exports.number = number;
exports.boolean = boolean;
exports.booleanString = booleanString;
exports.list = list;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _slash = require("slash");

var _slash2 = _interopRequireDefault(_slash);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

/**
 * Get a transformer list from a value.
 */

function transformerList(val) {
  return util.arrayify(val);
}

/**
 * Validate transformer list. Maps "all" to all transformer names.
 */

transformerList.validate = function (key, val, pipeline) {
  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(pipeline.transformers);
  }

  return pipeline._ensureTransformerNames(key, val);
};

/**
 * Cast a value to a number.
 */

function number(val) {
  return +val;
}

/**
 * Cast a value to a boolean.
 */

var filename = _slash2["default"];

exports.filename = filename;
/**
 * [Please add a description.]
 */

function boolean(val) {
  return !!val;
}

/**
 * Cast a boolean-like string to a boolean.
 */

function booleanString(val) {
  return util.booleanify(val);
}

/**
 * Cast a value to an array, splitting strings by ",".
 */

function list(val) {
  return util.list(val);
}
}, function(modId) { var map = {"../../../util":1676544235570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235609, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashObjectMerge = require("lodash/object/merge");

var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);

/**
 * Merge options.
 */

exports["default"] = function (dest, src) {
  if (!dest || !src) return;

  return _lodashObjectMerge2["default"](dest, src, function (a, b) {
    if (b && Array.isArray(a)) {
      var c = a.slice(0);
      for (var _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var v = _ref;

        if (a.indexOf(v) < 0) {
          c.push(v);
        }
      }
      return c;
    }
  });
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235610, function(require, module, exports) {


// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _detectIndent = require("detect-indent");

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _whitespace = require("./whitespace");

var _whitespace2 = _interopRequireDefault(_whitespace);

var _nodePrinter = require("./node/printer");

var _nodePrinter2 = _interopRequireDefault(_nodePrinter);

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _sourceMap = require("./source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _position = require("./position");

var _position2 = _interopRequireDefault(_position);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _buffer = require("./buffer");

var _buffer2 = _interopRequireDefault(_buffer);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _node2 = require("./node");

var _node3 = _interopRequireDefault(_node2);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

var CodeGenerator = (function () {
  function CodeGenerator(ast, opts, code) {
    _classCallCheck(this, CodeGenerator);

    opts = opts || {};

    this.comments = ast.comments || [];
    this.tokens = ast.tokens || [];
    this.format = CodeGenerator.normalizeOptions(code, opts, this.tokens);
    this.opts = opts;
    this.ast = ast;

    this.whitespace = new _whitespace2["default"](this.tokens);
    this.position = new _position2["default"]();
    this.map = new _sourceMap2["default"](this.position, opts, code);
    this.buffer = new _buffer2["default"](this.position, this.format);
  }

  /**
   * [Please add a description.]
   */

  /**
   * Normalize generator options, setting defaults.
   *
   * - Detects code indentation.
   * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
   */

  CodeGenerator.normalizeOptions = function normalizeOptions(code, opts, tokens) {
    var style = "  ";
    if (code) {
      var indent = _detectIndent2["default"](code).indent;
      if (indent && indent !== " ") style = indent;
    }

    var format = {
      shouldPrintComment: opts.shouldPrintComment,
      retainLines: opts.retainLines,
      comments: opts.comments == null || opts.comments,
      compact: opts.compact,
      quotes: CodeGenerator.findCommonStringDelimiter(code, tokens),
      indent: {
        adjustMultilineComment: true,
        style: style,
        base: 0
      }
    };

    if (format.compact === "auto") {
      format.compact = code.length > 100000; // 100KB

      if (format.compact) {
        console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "100KB"));
      }
    }

    if (format.compact) {
      format.indent.adjustMultilineComment = false;
    }

    return format;
  };

  /**
   * Determine if input code uses more single or double quotes.
   */

  CodeGenerator.findCommonStringDelimiter = function findCommonStringDelimiter(code, tokens) {
    var occurences = {
      single: 0,
      double: 0
    };

    var checked = 0;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.type.label !== "string") continue;

      var raw = code.slice(token.start, token.end);
      if (raw[0] === "'") {
        occurences.single++;
      } else {
        occurences.double++;
      }

      checked++;
      if (checked >= 3) break;
    }
    if (occurences.single > occurences.double) {
      return "single";
    } else {
      return "double";
    }
  };

  /**
   * All node generators.
   */

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  CodeGenerator.prototype.generate = function generate() {
    var ast = this.ast;

    this.print(ast);

    if (ast.comments) {
      var comments = [];
      var _arr = ast.comments;
      for (var _i = 0; _i < _arr.length; _i++) {
        var comment = _arr[_i];
        if (!comment._displayed) comments.push(comment);
      }
      this._printComments(comments);
    }

    return {
      map: this.map.get(),
      code: this.buffer.get()
    };
  };

  /**
   * Build NodePrinter.
   */

  CodeGenerator.prototype.buildPrint = function buildPrint(parent) {
    return new _nodePrinter2["default"](this, parent);
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.catchUp = function catchUp(node) {
    // catch up to this nodes newline if we're behind
    if (node.loc && this.format.retainLines && this.buffer.buf) {
      while (this.position.line < node.loc.start.line) {
        this._push("\n");
      }
    }
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype._printNewline = function _printNewline(leading, node, parent, opts) {
    if (!opts.statement && !_node3["default"].isUserWhitespacable(node, parent)) {
      return;
    }

    var lines = 0;

    if (node.start != null && !node._ignoreUserWhitespace) {
      // user node
      if (leading) {
        lines = this.whitespace.getNewlinesBefore(node);
      } else {
        lines = this.whitespace.getNewlinesAfter(node);
      }
    } else {
      // generated node
      if (!leading) lines++; // always include at least a single line after
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      var needs = _node3["default"].needsWhitespaceAfter;
      if (leading) needs = _node3["default"].needsWhitespaceBefore;
      if (needs(node, parent)) lines++;

      // generated nodes can't add starting file whitespace
      if (!this.buffer.buf) lines = 0;
    }

    this.newline(lines);
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.print = function print(node, parent) {
    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (!node) return;

    if (parent && parent._compact) {
      node._compact = true;
    }

    var oldConcise = this.format.concise;
    if (node._compact) {
      this.format.concise = true;
    }

    if (!this[node.type]) {
      throw new ReferenceError("unknown node of type " + JSON.stringify(node.type) + " with constructor " + JSON.stringify(node && node.constructor.name));
    }

    var needsParens = _node3["default"].needsParens(node, parent);
    if (needsParens) this.push("(");

    this.printLeadingComments(node, parent);

    this.catchUp(node);

    this._printNewline(true, node, parent, opts);

    if (opts.before) opts.before();
    this.map.mark(node, "start");

    this[node.type](node, this.buildPrint(node), parent);

    if (needsParens) this.push(")");

    this.map.mark(node, "end");
    if (opts.after) opts.after();

    this.format.concise = oldConcise;

    this._printNewline(false, node, parent, opts);

    this.printTrailingComments(node, parent);
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.printJoin = function printJoin(print, nodes) {
    // istanbul ignore next

    var _this = this;

    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (!nodes || !nodes.length) return;

    var len = nodes.length;

    if (opts.indent) this.indent();

    var printOpts = {
      statement: opts.statement,
      addNewlines: opts.addNewlines,
      after: function after() {
        if (opts.iterator) {
          opts.iterator(node, i);
        }

        if (opts.separator && i < len - 1) {
          _this.push(opts.separator);
        }
      }
    };

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      print.plain(node, printOpts);
    }

    if (opts.indent) this.dedent();
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.printAndIndentOnComments = function printAndIndentOnComments(print, node) {
    var indent = !!node.leadingComments;
    if (indent) this.indent();
    print.plain(node);
    if (indent) this.dedent();
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.printBlock = function printBlock(print, node) {
    if (t.isEmptyStatement(node)) {
      this.semicolon();
    } else {
      this.push(" ");
      print.plain(node);
    }
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.generateComment = function generateComment(comment) {
    var val = comment.value;
    if (comment.type === "CommentLine") {
      val = "//" + val;
    } else {
      val = "/*" + val + "*/";
    }
    return val;
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.printTrailingComments = function printTrailingComments(node, parent) {
    this._printComments(this.getComments("trailingComments", node, parent));
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.printLeadingComments = function printLeadingComments(node, parent) {
    this._printComments(this.getComments("leadingComments", node, parent));
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.getComments = function getComments(key, node, parent) {
    if (t.isExpressionStatement(parent)) {
      return [];
    }

    var comments = [];
    var nodes = [node];

    if (t.isExpressionStatement(node)) {
      nodes.push(node.argument);
    }

    var _arr2 = nodes;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var _node = _arr2[_i2];
      comments = comments.concat(this._getComments(key, _node));
    }

    return comments;
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype._getComments = function _getComments(key, node) {
    return node && node[key] || [];
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype.shouldPrintComment = function shouldPrintComment(comment) {
    if (this.format.shouldPrintComment) {
      return this.format.shouldPrintComment(comment.value);
    } else {
      if (comment.value.indexOf("@license") >= 0 || comment.value.indexOf("@preserve") >= 0) {
        return true;
      } else {
        return this.format.comments;
      }
    }
  };

  /**
   * [Please add a description.]
   */

  CodeGenerator.prototype._printComments = function _printComments(comments) {
    if (!comments || !comments.length) return;

    var _arr3 = comments;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var comment = _arr3[_i3];
      if (!this.shouldPrintComment(comment)) continue;
      if (comment._displayed) continue;
      comment._displayed = true;

      this.catchUp(comment);

      // whitespace before
      this.newline(this.whitespace.getNewlinesBefore(comment));

      var column = this.position.column;
      var val = this.generateComment(comment);

      if (column && !this.isLast(["\n", " ", "[", "{"])) {
        this._push(" ");
        column++;
      }

      //
      if (comment.type === "CommentBlock" && this.format.indent.adjustMultilineComment) {
        var offset = comment.loc && comment.loc.start.column;
        if (offset) {
          var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }

        var indent = Math.max(this.indentSize(), column);
        val = val.replace(/\n/g, "\n" + _repeating2["default"](" ", indent));
      }

      if (column === 0) {
        val = this.getIndent() + val;
      }

      // force a newline for line comments when retainLines is set in case the next printed node
      // doesn't catch up
      if ((this.format.compact || this.format.retainLines) && comment.type === "CommentLine") {
        val += "\n";
      }

      //
      this._push(val);

      // whitespace after
      this.newline(this.whitespace.getNewlinesAfter(comment));
    }
  };

  _createClass(CodeGenerator, null, [{
    key: "generators",
    value: {
      templateLiterals: require("./generators/template-literals"),
      comprehensions: require("./generators/comprehensions"),
      expressions: require("./generators/expressions"),
      statements: require("./generators/statements"),
      classes: require("./generators/classes"),
      methods: require("./generators/methods"),
      modules: require("./generators/modules"),
      types: require("./generators/types"),
      flow: require("./generators/flow"),
      base: require("./generators/base"),
      jsx: require("./generators/jsx")
    },
    enumerable: true
  }]);

  return CodeGenerator;
})();

_lodashCollectionEach2["default"](_buffer2["default"].prototype, function (fn, key) {
  CodeGenerator.prototype[key] = function () {
    return fn.apply(this.buffer, arguments);
  };
});

/**
 * [Please add a description.]
 */

_lodashCollectionEach2["default"](CodeGenerator.generators, function (generator) {
  _lodashObjectExtend2["default"](CodeGenerator.prototype, generator);
});

/**
 * [Please add a description.]
 */

module.exports = function (ast, opts, code) {
  var gen = new CodeGenerator(ast, opts, code);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;
}, function(modId) { var map = {"./whitespace":1676544235611,"./node/printer":1676544235612,"./source-map":1676544235613,"./position":1676544235614,"../messages":1676544235569,"./buffer":1676544235615,"./node":1676544235616,"../types":1676544235555,"./generators/template-literals":1676544235619,"./generators/comprehensions":1676544235620,"./generators/expressions":1676544235621,"./generators/statements":1676544235622,"./generators/classes":1676544235623,"./generators/methods":1676544235624,"./generators/modules":1676544235625,"./generators/types":1676544235626,"./generators/flow":1676544235627,"./generators/base":1676544235628,"./generators/jsx":1676544235629}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235611, function(require, module, exports) {
/**
 * Returns `i`th number from `base`, continuing from 0 when `max` is reached.
 * Useful for shifting `for` loop by a fixed number but going over all items.
 *
 * @param {Number} i Current index in the loop
 * @param {Number} base Start index for which to return 0
 * @param {Number} max Array length
 * @returns {Number} shiftedIndex
 */



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getLookupIndex(i, base, max) {
  i += base;

  if (i >= max) {
    i -= max;
  }

  return i;
}

/**
 * Get whitespace around tokens.
 */

var Whitespace = (function () {
  function Whitespace(tokens) {
    _classCallCheck(this, Whitespace);

    this.tokens = tokens;
    this.used = {};

    // Profiling this code shows that while generator passes over it, indexes
    // returned by `getNewlinesBefore` and `getNewlinesAfter` are always increasing.

    // We use this implementation detail for an optimization: instead of always
    // starting to look from `this.tokens[0]`, we will start `for` loops from the
    // previous successful match. We will enumerate all tokens???but the common
    // case will be much faster.

    this._lastFoundIndex = 0;
  }

  /**
   * Count all the newlines before a node.
   */

  Whitespace.prototype.getNewlinesBefore = function getNewlinesBefore(node) {
    var startToken;
    var endToken;
    var tokens = this.tokens;

    for (var j = 0; j < tokens.length; j++) {
      // optimize for forward traversal by shifting for loop index
      var i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
      var token = tokens[i];

      // this is the token this node starts with
      if (node.start === token.start) {
        startToken = tokens[i - 1];
        endToken = token;

        this._lastFoundIndex = i;
        break;
      }
    }

    return this.getNewlinesBetween(startToken, endToken);
  };

  /**
   * Count all the newlines after a node.
   */

  Whitespace.prototype.getNewlinesAfter = function getNewlinesAfter(node) {
    var startToken;
    var endToken;
    var tokens = this.tokens;

    for (var j = 0; j < tokens.length; j++) {
      // optimize for forward traversal by shifting for loop index
      var i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
      var token = tokens[i];

      // this is the token this node ends with
      if (node.end === token.end) {
        startToken = token;
        endToken = tokens[i + 1];
        if (endToken.type.label === ",") endToken = tokens[i + 2];

        this._lastFoundIndex = i;
        break;
      }
    }

    if (endToken && endToken.type.label === "eof") {
      return 1;
    } else {
      var lines = this.getNewlinesBetween(startToken, endToken);
      if (node.type === "CommentLine" && !lines) {
        // line comment
        return 1;
      } else {
        return lines;
      }
    }
  };

  /**
   * Count all the newlines between two tokens.
   */

  Whitespace.prototype.getNewlinesBetween = function getNewlinesBetween(startToken, endToken) {
    if (!endToken || !endToken.loc) return 0;

    var start = startToken ? startToken.loc.end.line : 1;
    var end = endToken.loc.start.line;
    var lines = 0;

    for (var line = start; line < end; line++) {
      if (typeof this.used[line] === "undefined") {
        this.used[line] = true;
        lines++;
      }
    }

    return lines;
  };

  return Whitespace;
})();

exports["default"] = Whitespace;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235612, function(require, module, exports) {
/**
 * Printer for nodes, needs a `generator` and a `parent`.
 */



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodePrinter = (function () {
  function NodePrinter(generator, parent) {
    _classCallCheck(this, NodePrinter);

    this.generator = generator;
    this.parent = parent;
  }

  /**
   * Description
   */

  NodePrinter.prototype.printInnerComments = function printInnerComments() {
    if (!this.parent.innerComments) return;
    var gen = this.generator;
    gen.indent();
    gen._printComments(this.parent.innerComments);
    gen.dedent();
  };

  /**
   * Print a plain node.
   */

  NodePrinter.prototype.plain = function plain(node, opts) {
    return this.generator.print(node, this.parent, opts);
  };

  /**
   * Print a sequence of nodes as statements.
   */

  NodePrinter.prototype.sequence = function sequence(nodes) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    opts.statement = true;
    return this.generator.printJoin(this, nodes, opts);
  };

  /**
   * Print a sequence of nodes as expressions.
   */

  NodePrinter.prototype.join = function join(nodes, opts) {
    return this.generator.printJoin(this, nodes, opts);
  };

  /**
   * Print a list of nodes, with a customizable separator (defaults to ",").
   */

  NodePrinter.prototype.list = function list(items) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (opts.separator == null) {
      opts.separator = ",";
      if (!this.generator.format.compact) opts.separator += " ";
    }

    return this.join(items, opts);
  };

  /**
   * Print a block-like node.
   */

  NodePrinter.prototype.block = function block(node) {
    return this.generator.printBlock(this, node);
  };

  /**
   * Print node and indent comments.
   */

  NodePrinter.prototype.indentOnComments = function indentOnComments(node) {
    return this.generator.printAndIndentOnComments(this, node);
  };

  return NodePrinter;
})();

exports["default"] = NodePrinter;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235613, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _sourceMap = require("source-map");

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * Build a sourcemap.
 */

var SourceMap = (function () {
  function SourceMap(position, opts, code) {
    _classCallCheck(this, SourceMap);

    this.position = position;
    this.opts = opts;

    if (opts.sourceMaps) {
      this.map = new _sourceMap2["default"].SourceMapGenerator({
        file: opts.sourceMapTarget,
        sourceRoot: opts.sourceRoot
      });

      this.map.setSourceContent(opts.sourceFileName, code);
    } else {
      this.map = null;
    }
  }

  /**
   * Get the sourcemap.
   */

  SourceMap.prototype.get = function get() {
    var map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  };

  /**
   * Mark a node's generated position, and add it to the sourcemap.
   */

  SourceMap.prototype.mark = function mark(node, type) {
    var loc = node.loc;
    if (!loc) return; // no location info

    var map = this.map;
    if (!map) return; // no source map

    if (t.isProgram(node) || t.isFile(node)) return; // illegal mapping nodes

    var position = this.position;

    var generated = {
      line: position.line,
      column: position.column
    };

    var original = loc[type];

    map.addMapping({
      source: this.opts.sourceFileName,
      generated: generated,
      original: original
    });
  };

  return SourceMap;
})();

exports["default"] = SourceMap;
module.exports = exports["default"];
}, function(modId) { var map = {"source-map":1676544235613,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235614, function(require, module, exports) {
/**
 * Track current position in code generation.
 */



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = (function () {
  function Position() {
    _classCallCheck(this, Position);

    this.line = 1;
    this.column = 0;
  }

  /**
   * Push a string to the current position, mantaining the current line and column.
   */

  Position.prototype.push = function push(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }
    }
  };

  /**
   * Unshift a string from the current position, mantaining the current line and column.
   */

  Position.prototype.unshift = function unshift(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this.line--;
      } else {
        this.column--;
      }
    }
  };

  return Position;
})();

exports["default"] = Position;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235615, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _trimRight = require("trim-right");

var _trimRight2 = _interopRequireDefault(_trimRight);

var _lodashLangIsBoolean = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _lodashLangIsNumber = require("lodash/lang/isNumber");

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

/**
 * Buffer for collecting generated output.
 */

var Buffer = (function () {
  function Buffer(position, format) {
    _classCallCheck(this, Buffer);

    this.parenPushNewlineState = null;

    this.position = position;
    this._indent = format.indent.base;
    this.format = format;
    this.buf = "";
  }

  /**
   * Get the current trimmed buffer.
   */

  Buffer.prototype.get = function get() {
    return _trimRight2["default"](this.buf);
  };

  /**
   * Get the current indent.
   */

  Buffer.prototype.getIndent = function getIndent() {
    if (this.format.compact || this.format.concise) {
      return "";
    } else {
      return _repeating2["default"](this.format.indent.style, this._indent);
    }
  };

  /**
   * Get the current indent size.
   */

  Buffer.prototype.indentSize = function indentSize() {
    return this.getIndent().length;
  };

  /**
   * Increment indent size.
   */

  Buffer.prototype.indent = function indent() {
    this._indent++;
  };

  /**
   * Decrement indent size.
   */

  Buffer.prototype.dedent = function dedent() {
    this._indent--;
  };

  /**
   * Add a semicolon to the buffer.
   */

  Buffer.prototype.semicolon = function semicolon() {
    this.push(";");
  };

  /**
   * Ensure last character is a semicolon.
   */

  Buffer.prototype.ensureSemicolon = function ensureSemicolon() {
    if (!this.isLast(";")) this.semicolon();
  };

  /**
   * Add a right brace to the buffer.
   */

  Buffer.prototype.rightBrace = function rightBrace() {
    this.newline(true);
    //if (this.format.compact) this._removeLast(";");
    this.push("}");
  };

  /**
   * Add a keyword to the buffer.
   */

  Buffer.prototype.keyword = function keyword(name) {
    this.push(name);
    this.space();
  };

  /**
   * Add a space to the buffer unless it is compact (override with force).
   */

  Buffer.prototype.space = function space(force) {
    if (!force && this.format.compact) return;

    if (force || this.buf && !this.isLast(" ") && !this.isLast("\n")) {
      this.push(" ");
    }
  };

  /**
   * Remove the last character.
   */

  Buffer.prototype.removeLast = function removeLast(cha) {
    if (this.format.compact) return;
    return this._removeLast(cha);
  };

  Buffer.prototype._removeLast = function _removeLast(cha) {
    if (!this._isLast(cha)) return;
    this.buf = this.buf.substr(0, this.buf.length - 1);
    this.position.unshift(cha);
  };

  /**
   * Set some state that will be modified if a newline has been inserted before any
   * non-space characters.
   *
   * This is to prevent breaking semantics for terminatorless separator nodes. eg:
   *
   *    return foo;
   *
   * returns `foo`. But if we do:
   *
   *   return
   *   foo;
   *
   *  `undefined` will be returned and not `foo` due to the terminator.
   */

  Buffer.prototype.startTerminatorless = function startTerminatorless() {
    return this.parenPushNewlineState = {
      printed: false
    };
  };

  /**
   * Print an ending parentheses if a starting one has been printed.
   */

  Buffer.prototype.endTerminatorless = function endTerminatorless(state) {
    if (state.printed) {
      this.dedent();
      this.newline();
      this.push(")");
    }
  };

  /**
   * Add a newline (or many newlines), maintaining formatting.
   * Strips multiple newlines if removeLast is true.
   */

  Buffer.prototype.newline = function newline(i, removeLast) {
    if (this.format.compact || this.format.retainLines) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    removeLast = removeLast || false;

    if (_lodashLangIsNumber2["default"](i)) {
      i = Math.min(2, i);

      if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
      if (i <= 0) return;

      while (i > 0) {
        this._newline(removeLast);
        i--;
      }
      return;
    }

    if (_lodashLangIsBoolean2["default"](i)) {
      removeLast = i;
    }

    this._newline(removeLast);
  };

  /**
   * Adds a newline unless there is already two previous newlines.
   */

  Buffer.prototype._newline = function _newline(removeLast) {
    // never allow more than two lines
    if (this.endsWith("\n\n")) return;

    // remove the last newline
    if (removeLast && this.isLast("\n")) this.removeLast("\n");

    this.removeLast(" ");
    this._removeSpacesAfterLastNewline();
    this._push("\n");
  };

  /**
   * If buffer ends with a newline and some spaces after it, trim those spaces.
   */

  Buffer.prototype._removeSpacesAfterLastNewline = function _removeSpacesAfterLastNewline() {
    var lastNewlineIndex = this.buf.lastIndexOf("\n");
    if (lastNewlineIndex === -1) {
      return;
    }

    var index = this.buf.length - 1;
    while (index > lastNewlineIndex) {
      if (this.buf[index] !== " ") {
        break;
      }

      index--;
    }

    if (index === lastNewlineIndex) {
      this.buf = this.buf.substring(0, index + 1);
    }
  };

  /**
   * Push a string to the buffer, maintaining indentation and newlines.
   */

  Buffer.prototype.push = function push(str, noIndent) {
    if (!this.format.compact && this._indent && !noIndent && str !== "\n") {
      // we have an indent level and we aren't pushing a newline
      var indent = this.getIndent();

      // replace all newlines with newlines with the indentation
      str = str.replace(/\n/g, "\n" + indent);

      // we've got a newline before us so prepend on the indentation
      if (this.isLast("\n")) this._push(indent);
    }

    this._push(str);
  };

  /**
   * Push a string to the buffer.
   */

  Buffer.prototype._push = function _push(str) {
    // see startTerminatorless() instance method
    var parenPushNewlineState = this.parenPushNewlineState;
    if (parenPushNewlineState) {
      for (var i = 0; i < str.length; i++) {
        var cha = str[i];

        // we can ignore spaces since they wont interupt a terminatorless separator
        if (cha === " ") continue;

        this.parenPushNewlineState = null;

        if (cha === "\n" || cha === "/") {
          // we're going to break this terminator expression so we need to add a parentheses
          this._push("(");
          this.indent();
          parenPushNewlineState.printed = true;
        }

        break;
      }
    }

    //
    this.position.push(str);
    this.buf += str;
  };

  /**
   * Test if the buffer ends with a string.
   */

  Buffer.prototype.endsWith = function endsWith(str) {
    var buf = arguments.length <= 1 || arguments[1] === undefined ? this.buf : arguments[1];

    if (str.length === 1) {
      return buf[buf.length - 1] === str;
    } else {
      return buf.slice(-str.length) === str;
    }
  };

  /**
   * Test if a character is last in the buffer.
   */

  Buffer.prototype.isLast = function isLast(cha) {
    if (this.format.compact) return false;
    return this._isLast(cha);
  };

  Buffer.prototype._isLast = function _isLast(cha) {
    var buf = this.buf;
    var last = buf[buf.length - 1];

    if (Array.isArray(cha)) {
      return _lodashCollectionIncludes2["default"](cha, last);
    } else {
      return cha === last;
    }
  };

  return Buffer;
})();

exports["default"] = Buffer;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235616, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _whitespace = require("./whitespace");

var _whitespace2 = _interopRequireDefault(_whitespace);

var _parentheses = require("./parentheses");

var parens = _interopRequireWildcard(_parentheses);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashCollectionSome = require("lodash/collection/some");

var _lodashCollectionSome2 = _interopRequireDefault(_lodashCollectionSome);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Test if node matches a set of type-matcher pairs.
 * @example
 * find({
 *   VariableDeclaration(node, parent) {
 *     return true;
 *   }
 * }, node, parent);
 */

var find = function find(obj, node, parent) {
  if (!obj) return;
  var result;

  var types = Object.keys(obj);
  for (var i = 0; i < types.length; i++) {
    var type = types[i];

    if (t.is(type, node)) {
      var fn = obj[type];
      result = fn(node, parent);
      if (result != null) break;
    }
  }

  return result;
};

/**
 * Whitespace and Parenthesis related methods for nodes.
 */

var Node = (function () {
  function Node(node, parent) {
    _classCallCheck(this, Node);

    this.parent = parent;
    this.node = node;
  }

  /**
   * Add all static methods from `Node` to `Node.prototype`.
   */

  /**
   * Test if `node` can have whitespace set by the user.
   */

  Node.isUserWhitespacable = function isUserWhitespacable(node) {
    return t.isUserWhitespacable(node);
  };

  /**
   * Test if a `node` requires whitespace.
   */

  Node.needsWhitespace = function needsWhitespace(node, parent, type) {
    if (!node) return 0;

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    var linesInfo = find(_whitespace2["default"].nodes, node, parent);

    if (!linesInfo) {
      var items = find(_whitespace2["default"].list, node, parent);
      if (items) {
        for (var i = 0; i < items.length; i++) {
          linesInfo = Node.needsWhitespace(items[i], node, type);
          if (linesInfo) break;
        }
      }
    }

    return linesInfo && linesInfo[type] || 0;
  };

  /**
   * Test if a `node` requires whitespace before it.
   */

  Node.needsWhitespaceBefore = function needsWhitespaceBefore(node, parent) {
    return Node.needsWhitespace(node, parent, "before");
  };

  /**
   * Test if a `note` requires whitespace after it.
   */

  Node.needsWhitespaceAfter = function needsWhitespaceAfter(node, parent) {
    return Node.needsWhitespace(node, parent, "after");
  };

  /**
   * Test if a `node` needs parentheses around it.
   */

  Node.needsParens = function needsParens(node, parent) {
    if (!parent) return false;

    if (t.isNewExpression(parent) && parent.callee === node) {
      if (t.isCallExpression(node)) return true;

      var hasCall = _lodashCollectionSome2["default"](node, function (val) {
        return t.isCallExpression(val);
      });
      if (hasCall) return true;
    }

    return find(parens, node, parent);
  };

  return Node;
})();

exports["default"] = Node;
_lodashCollectionEach2["default"](Node, function (fn, key) {
  Node.prototype[key] = function () {
    // Avoid leaking arguments to prevent deoptimization
    var args = new Array(arguments.length + 2);

    args[0] = this.node;
    args[1] = this.parent;

    for (var i = 0; i < args.length; i++) {
      args[i + 2] = arguments[i];
    }

    return Node[key].apply(null, args);
  };
});
module.exports = exports["default"];
}, function(modId) { var map = {"./whitespace":1676544235617,"./parentheses":1676544235618,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235617, function(require, module, exports) {


// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangIsBoolean = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashCollectionMap = require("lodash/collection/map");

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Crawl a node to test if it contains a CallExpression, a Function, or a Helper.
 *
 * @example
 * crawl(node)
 * // { hasCall: false, hasFunction: true, hasHelper: false }
 */

function crawl(node) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (t.isMemberExpression(node)) {
    crawl(node.object, state);
    if (node.computed) crawl(node.property, state);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    crawl(node.left, state);
    crawl(node.right, state);
  } else if (t.isCallExpression(node)) {
    state.hasCall = true;
    crawl(node.callee, state);
  } else if (t.isFunction(node)) {
    state.hasFunction = true;
  } else if (t.isIdentifier(node)) {
    state.hasHelper = state.hasHelper || isHelper(node.callee);
  }

  return state;
}

/**
 * Test if a node is or has a helper.
 */

function isHelper(node) {
  if (t.isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (t.isIdentifier(node)) {
    return node.name === "require" || node.name[0] === "_";
  } else if (t.isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    return t.isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right);
  } else {
    return false;
  }
}

/**
 * [Please add a description.]
 */

function isType(node) {
  return t.isLiteral(node) || t.isObjectExpression(node) || t.isArrayExpression(node) || t.isIdentifier(node) || t.isMemberExpression(node);
}

/**
 * Tests for node types that need whitespace.
 */

exports.nodes = {

  /**
   * Test if AssignmentExpression needs whitespace.
   */

  AssignmentExpression: function AssignmentExpression(node) {
    var state = crawl(node.right);
    if (state.hasCall && state.hasHelper || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true
      };
    }
  },

  /**
   * Test if SwitchCase needs whitespace.
   */

  SwitchCase: function SwitchCase(node, parent) {
    return {
      before: node.consequent.length || parent.cases[0] === node
    };
  },

  /**
   * Test if LogicalExpression needs whitespace.
   */

  LogicalExpression: function LogicalExpression(node) {
    if (t.isFunction(node.left) || t.isFunction(node.right)) {
      return {
        after: true
      };
    }
  },

  /**
   * Test if Literal needs whitespace.
   */

  Literal: function Literal(node) {
    if (node.value === "use strict") {
      return {
        after: true
      };
    }
  },

  /**
   * Test if CallExpression needs whitespace.
   */

  CallExpression: function CallExpression(node) {
    if (t.isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true
      };
    }
  },

  /**
   * Test if VariableDeclaration needs whitespace.
   */

  VariableDeclaration: function VariableDeclaration(node) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];

      var enabled = isHelper(declar.id) && !isType(declar.init);
      if (!enabled) {
        var state = crawl(declar.init);
        enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
      }

      if (enabled) {
        return {
          before: true,
          after: true
        };
      }
    }
  },

  /**
   * Test if IfStatement needs whitespace.
   */

  IfStatement: function IfStatement(node) {
    if (t.isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true
      };
    }
  }
};

/**
 * Test if Property or SpreadProperty needs whitespace.
 */

exports.nodes.Property = exports.nodes.SpreadProperty = function (node, parent) {
  if (parent.properties[0] === node) {
    return {
      before: true
    };
  }
};

/**
 * Returns lists from node types that need whitespace.
 */

exports.list = {

  /**
   * Return VariableDeclaration declarations init properties.
   */

  VariableDeclaration: function VariableDeclaration(node) {
    return _lodashCollectionMap2["default"](node.declarations, "init");
  },

  /**
   * Return VariableDeclaration elements.
   */

  ArrayExpression: function ArrayExpression(node) {
    return node.elements;
  },

  /**
   * Return VariableDeclaration properties.
   */

  ObjectExpression: function ObjectExpression(node) {
    return node.properties;
  }
};

/**
 * Add whitespace tests for nodes and their aliases.
 */

_lodashCollectionEach2["default"]({
  Function: true,
  Class: true,
  Loop: true,
  LabeledStatement: true,
  SwitchStatement: true,
  TryStatement: true
}, function (amounts, type) {
  if (_lodashLangIsBoolean2["default"](amounts)) {
    amounts = { after: amounts, before: amounts };
  }

  _lodashCollectionEach2["default"]([type].concat(t.FLIPPED_ALIAS_KEYS[type] || []), function (type) {
    exports.nodes[type] = function () {
      return amounts;
    };
  });
});
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235618, function(require, module, exports) {


exports.__esModule = true;
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.UpdateExpression = UpdateExpression;
exports.ObjectExpression = ObjectExpression;
exports.Binary = Binary;
exports.BinaryExpression = BinaryExpression;
exports.SequenceExpression = SequenceExpression;
exports.YieldExpression = YieldExpression;
exports.ClassExpression = ClassExpression;
exports.UnaryLike = UnaryLike;
exports.FunctionExpression = FunctionExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.AssignmentExpression = AssignmentExpression;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Create a mapping of operators to precendence.
 *
 * @example
 * { "==": 6, "+": 9 }
 */
var PRECEDENCE = {};

_lodashCollectionEach2["default"]([["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]], function (tier, i) {
  _lodashCollectionEach2["default"](tier, function (op) {
    PRECEDENCE[op] = i;
  });
});

/**
 * Test if NullableTypeAnnotation needs parentheses.
 */

function NullableTypeAnnotation(node, parent) {
  return t.isArrayTypeAnnotation(parent);
}

/**
 * Alias NullableTypeAnnotation test as FunctionTypeAnnotation.
 */

exports.FunctionTypeAnnotation = NullableTypeAnnotation;

/**
 * Test if UpdateExpression needs parentheses.
 */

function UpdateExpression(node, parent) {
  if (t.isMemberExpression(parent) && parent.object === node) {
    // (foo++).test()
    return true;
  }
}

/**
 * Test if ObjectExpression needs parentheses.
 */

function ObjectExpression(node, parent) {
  if (t.isExpressionStatement(parent)) {
    // ({ foo: "bar" });
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    // ({ foo: "bar" }).foo
    return true;
  }

  return false;
}

/**
 * Test if Binary needs parentheses.
 */

function Binary(node, parent) {
  if ((t.isCallExpression(parent) || t.isNewExpression(parent)) && parent.callee === node) {
    return true;
  }

  if (t.isUnaryLike(parent)) {
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  if (t.isBinary(parent)) {
    var parentOp = parent.operator;
    var parentPos = PRECEDENCE[parentOp];

    var nodeOp = node.operator;
    var nodePos = PRECEDENCE[nodeOp];

    if (parentPos > nodePos) {
      return true;
    }

    // Logical expressions with the same precedence don't need parens.
    if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent)) {
      return true;
    }
  }
}

/**
 * Test if BinaryExpression needs parentheses.
 */

function BinaryExpression(node, parent) {
  if (node.operator === "in") {
    // var i = (1 in []);
    if (t.isVariableDeclarator(parent)) {
      return true;
    }

    // for ((1 in []);;);
    if (t.isFor(parent)) {
      return true;
    }
  }
}

/**
 * Test if SequenceExpression needs parentheses.
 */

function SequenceExpression(node, parent) {
  if (t.isForStatement(parent)) {
    // Although parentheses wouldn't hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    return false;
  }

  if (t.isExpressionStatement(parent) && parent.expression === node) {
    return false;
  }

  if (t.isReturnStatement(parent)) {
    return false;
  }

  // Otherwise err on the side of overparenthesization, adding
  // explicit exceptions above if this proves overzealous.
  return true;
}

/**
 * Test if YieldExpression needs parentheses.
 */

function YieldExpression(node, parent) {
  return t.isBinary(parent) || t.isUnaryLike(parent) || t.isCallExpression(parent) || t.isMemberExpression(parent) || t.isNewExpression(parent) || t.isConditionalExpression(parent) || t.isYieldExpression(parent);
}

/**
 * Test if ClassExpression needs parentheses.
 */

function ClassExpression(node, parent) {
  return t.isExpressionStatement(parent);
}

/**
 * Test if UnaryLike needs parentheses.
 */

function UnaryLike(node, parent) {
  return t.isMemberExpression(parent) && parent.object === node;
}

/**
 * Test if FunctionExpression needs parentheses.
 */

function FunctionExpression(node, parent) {
  // function () {};
  if (t.isExpressionStatement(parent)) {
    return true;
  }

  // (function test() {}).name;
  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  // (function () {})();
  if (t.isCallExpression(parent) && parent.callee === node) {
    return true;
  }
}

/**
 * Test if ConditionalExpression needs parentheses.
 */

function ConditionalExpression(node, parent) {
  if (t.isUnaryLike(parent)) {
    return true;
  }

  if (t.isBinary(parent)) {
    return true;
  }

  if (t.isCallExpression(parent) || t.isNewExpression(parent)) {
    if (parent.callee === node) {
      return true;
    }
  }

  if (t.isConditionalExpression(parent) && parent.test === node) {
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  return false;
}

/**
 * Test if AssignmentExpression needs parentheses.
 */

function AssignmentExpression(node) {
  if (t.isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression.apply(undefined, arguments);
  }
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235619, function(require, module, exports) {
/**
 * Prints TaggedTemplateExpression, prints tag and quasi.
 */



exports.__esModule = true;
exports.TaggedTemplateExpression = TaggedTemplateExpression;
exports.TemplateElement = TemplateElement;
exports.TemplateLiteral = TemplateLiteral;

function TaggedTemplateExpression(node, print) {
  print.plain(node.tag);
  print.plain(node.quasi);
}

/**
 * Prints TemplateElement, prints value.
 */

function TemplateElement(node) {
  this._push(node.value.raw);
}

/**
 * Prints TemplateLiteral, prints quasis, and expressions.
 */

function TemplateLiteral(node, print) {
  this.push("`");

  var quasis = node.quasis;
  var len = quasis.length;

  for (var i = 0; i < len; i++) {
    print.plain(quasis[i]);

    if (i + 1 < len) {
      this.push("${ ");
      print.plain(node.expressions[i]);
      this.push(" }");
    }
  }

  this._push("`");
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235620, function(require, module, exports) {
/**
 * Prints ComprehensionBlock, prints left and right.
 */



exports.__esModule = true;
exports.ComprehensionBlock = ComprehensionBlock;
exports.ComprehensionExpression = ComprehensionExpression;

function ComprehensionBlock(node, print) {
  this.keyword("for");
  this.push("(");
  print.plain(node.left);
  this.push(" of ");
  print.plain(node.right);
  this.push(")");
}

/**
 * Prints ComprehensionExpression, prints blocks, filter, and body. Handles generators.
 */

function ComprehensionExpression(node, print) {
  this.push(node.generator ? "(" : "[");

  print.join(node.blocks, { separator: " " });
  this.space();

  if (node.filter) {
    this.keyword("if");
    this.push("(");
    print.plain(node.filter);
    this.push(")");
    this.space();
  }

  print.plain(node.body);

  this.push(node.generator ? ")" : "]");
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235621, function(require, module, exports) {


exports.__esModule = true;
exports.UnaryExpression = UnaryExpression;
exports.DoExpression = DoExpression;
exports.ParenthesizedExpression = ParenthesizedExpression;
exports.UpdateExpression = UpdateExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.NewExpression = NewExpression;
exports.SequenceExpression = SequenceExpression;
exports.ThisExpression = ThisExpression;
exports.Super = Super;
exports.Decorator = Decorator;
exports.CallExpression = CallExpression;
exports.EmptyStatement = EmptyStatement;
exports.ExpressionStatement = ExpressionStatement;
exports.AssignmentPattern = AssignmentPattern;
exports.AssignmentExpression = AssignmentExpression;
exports.BindExpression = BindExpression;
exports.MemberExpression = MemberExpression;
exports.MetaProperty = MetaProperty;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _isInteger = require("is-integer");

var _isInteger2 = _interopRequireDefault(_isInteger);

var _lodashLangIsNumber = require("lodash/lang/isNumber");

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

var _node = require("../node");

var _node2 = _interopRequireDefault(_node);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * RegExp for testing scientific notation in literals.
 */

var SCIENTIFIC_NOTATION = /e/i;
var ZERO_DECIMAL_INTEGER = /\.0+$/;

/**
 * RegExp for testing if a numeric literal is
 * a BinaryIntegerLiteral, OctalIntegerLiteral or HexIntegerLiteral.
 */

var NON_DECIMAL_NUMERIC_LITERAL = /^0(b|o|x)/i;

/**
 * Prints UnaryExpression, prints operator and argument.
 */

function UnaryExpression(node, print) {
  var needsSpace = /[a-z]$/.test(node.operator);
  var arg = node.argument;

  if (t.isUpdateExpression(arg) || t.isUnaryExpression(arg)) {
    needsSpace = true;
  }

  if (t.isUnaryExpression(arg) && arg.operator === "!") {
    needsSpace = false;
  }

  this.push(node.operator);
  if (needsSpace) this.push(" ");
  print.plain(node.argument);
}

/**
 * Prints DoExpression, prints body.
 */

function DoExpression(node, print) {
  this.push("do");
  this.space();
  print.plain(node.body);
}

/**
 * Prints ParenthesizedExpression, prints expression.
 */

function ParenthesizedExpression(node, print) {
  this.push("(");
  print.plain(node.expression);
  this.push(")");
}

/**
 * Prints UpdateExpression, prints operator and argument.
 */

function UpdateExpression(node, print) {
  if (node.prefix) {
    this.push(node.operator);
    print.plain(node.argument);
  } else {
    print.plain(node.argument);
    this.push(node.operator);
  }
}

/**
 * Prints ConditionalExpression, prints test, consequent, and alternate.
 */

function ConditionalExpression(node, print) {
  print.plain(node.test);
  this.space();
  this.push("?");
  this.space();
  print.plain(node.consequent);
  this.space();
  this.push(":");
  this.space();
  print.plain(node.alternate);
}

/**
 * Prints NewExpression, prints callee and arguments.
 */

function NewExpression(node, print) {
  this.push("new ");
  print.plain(node.callee);
  this.push("(");
  print.list(node.arguments);
  this.push(")");
}

/**
 * Prints SequenceExpression.expressions.
 */

function SequenceExpression(node, print) {
  print.list(node.expressions);
}

/**
 * Prints ThisExpression.
 */

function ThisExpression() {
  this.push("this");
}

/**
 * Prints Super.
 */

function Super() {
  this.push("super");
}

/**
 * Prints Decorator, prints expression.
 */

function Decorator(node, print) {
  this.push("@");
  print.plain(node.expression);
  this.newline();
}

/**
 * Prints CallExpression, prints callee and arguments.
 */

function CallExpression(node, print) {
  print.plain(node.callee);

  this.push("(");

  var isPrettyCall = node._prettyCall && !this.format.retainLines && !this.format.compact;

  var separator;
  if (isPrettyCall) {
    separator = ",\n";
    this.newline();
    this.indent();
  }

  print.list(node.arguments, { separator: separator });

  if (isPrettyCall) {
    this.newline();
    this.dedent();
  }

  this.push(")");
}

/**
 * Builds yield or await expression printer.
 * Prints delegate, all, and argument.
 */

var buildYieldAwait = function buildYieldAwait(keyword) {
  return function (node, print) {
    this.push(keyword);

    if (node.delegate || node.all) {
      this.push("*");
    }

    if (node.argument) {
      this.push(" ");
      var terminatorState = this.startTerminatorless();
      print.plain(node.argument);
      this.endTerminatorless(terminatorState);
    }
  };
};

/**
 * Create YieldExpression and AwaitExpression printers.
 */

var YieldExpression = buildYieldAwait("yield");
exports.YieldExpression = YieldExpression;
var AwaitExpression = buildYieldAwait("await");

exports.AwaitExpression = AwaitExpression;
/**
 * Prints EmptyStatement.
 */

function EmptyStatement() {
  this.semicolon();
}

/**
 * Prints ExpressionStatement, prints expression.
 */

function ExpressionStatement(node, print) {
  print.plain(node.expression);
  this.semicolon();
}

/**
 * Prints AssignmentPattern, prints left and right.
 */

function AssignmentPattern(node, print) {
  print.plain(node.left);
  this.push(" = ");
  print.plain(node.right);
}

/**
 * Prints AssignmentExpression, prints left, operator, and right.
 */

function AssignmentExpression(node, print, parent) {
  // Somewhere inside a for statement `init` node but doesn't usually
  // needs a paren except for `in` expressions: `for (a in b ? a : b;;)`
  var parens = this._inForStatementInit && node.operator === "in" && !_node2["default"].needsParens(node, parent);

  if (parens) {
    this.push("(");
  }

  // todo: add cases where the spaces can be dropped when in compact mode
  print.plain(node.left);

  var spaces = node.operator === "in" || node.operator === "instanceof";
  spaces = true; // todo: https://github.com/babel/babel/issues/1835
  this.space(spaces);

  this.push(node.operator);

  if (!spaces) {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
    spaces = node.operator === "<" && t.isUnaryExpression(node.right, { prefix: true, operator: "!" }) && t.isUnaryExpression(node.right.argument, { prefix: true, operator: "--" });
  }

  this.space(spaces);

  print.plain(node.right);

  if (parens) {
    this.push(")");
  }
}

/**
 * Prints BindExpression, prints object and callee.
 */

function BindExpression(node, print) {
  print.plain(node.object);
  this.push("::");
  print.plain(node.callee);
}

/**
 * Alias ClassDeclaration printer as ClassExpression,
 * and AssignmentExpression printer as LogicalExpression.
 */

exports.BinaryExpression = AssignmentExpression;
exports.LogicalExpression = AssignmentExpression;

/**
 * Print MemberExpression, prints object, property, and value. Handles computed.
 */

function MemberExpression(node, print) {
  var obj = node.object;
  print.plain(obj);

  if (!node.computed && t.isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  var computed = node.computed;
  if (t.isLiteral(node.property) && _lodashLangIsNumber2["default"](node.property.value)) {
    computed = true;
  }

  if (computed) {
    this.push("[");
    print.plain(node.property);
    this.push("]");
  } else {
    if (t.isLiteral(node.object)) {
      var val = this._Literal(node.object);
      if (_isInteger2["default"](+val) && !ZERO_DECIMAL_INTEGER.test(val) && !SCIENTIFIC_NOTATION.test(val) && !this.endsWith(".") && !NON_DECIMAL_NUMERIC_LITERAL.test(val)) {
        this.push(".");
      }
    }

    this.push(".");
    print.plain(node.property);
  }
}

/**
 * Print MetaProperty, prints meta and property.
 */

function MetaProperty(node, print) {
  print.plain(node.meta);
  this.push(".");
  print.plain(node.property);
}
}, function(modId) { var map = {"../node":1676544235616,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235622, function(require, module, exports) {


exports.__esModule = true;
exports.WithStatement = WithStatement;
exports.IfStatement = IfStatement;
exports.ForStatement = ForStatement;
exports.WhileStatement = WhileStatement;
exports.DoWhileStatement = DoWhileStatement;
exports.LabeledStatement = LabeledStatement;
exports.TryStatement = TryStatement;
exports.CatchClause = CatchClause;
exports.SwitchStatement = SwitchStatement;
exports.SwitchCase = SwitchCase;
exports.DebuggerStatement = DebuggerStatement;
exports.VariableDeclaration = VariableDeclaration;
exports.VariableDeclarator = VariableDeclarator;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _repeating = require("repeating");

var _repeating2 = _interopRequireDefault(_repeating);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints WithStatement, prints object and body.
 */

function WithStatement(node, print) {
  this.keyword("with");
  this.push("(");
  print.plain(node.object);
  this.push(")");
  print.block(node.body);
}

/**
 * Prints IfStatement, prints test, consequent, and alternate.
 */

function IfStatement(node, print) {
  this.keyword("if");
  this.push("(");
  print.plain(node.test);
  this.push(")");
  this.space();

  print.indentOnComments(node.consequent);

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.push("else ");
    print.indentOnComments(node.alternate);
  }
}

/**
 * Prints ForStatement, prints init, test, update, and body.
 */

function ForStatement(node, print) {
  this.keyword("for");
  this.push("(");

  this._inForStatementInit = true;
  print.plain(node.init);
  this._inForStatementInit = false;
  this.push(";");

  if (node.test) {
    this.space();
    print.plain(node.test);
  }
  this.push(";");

  if (node.update) {
    this.space();
    print.plain(node.update);
  }

  this.push(")");
  print.block(node.body);
}

/**
 * Prints WhileStatement, prints test and body.
 */

function WhileStatement(node, print) {
  this.keyword("while");
  this.push("(");
  print.plain(node.test);
  this.push(")");
  print.block(node.body);
}

/**
 * Builds ForIn or ForOf statement printers.
 * Prints left, right, and body.
 */

var buildForXStatement = function buildForXStatement(op) {
  return function (node, print) {
    this.keyword("for");
    this.push("(");
    print.plain(node.left);
    this.push(" " + op + " ");
    print.plain(node.right);
    this.push(")");
    print.block(node.body);
  };
};

/**
 * Create ForInStatement and ForOfStatement printers.
 */

var ForInStatement = buildForXStatement("in");
exports.ForInStatement = ForInStatement;
var ForOfStatement = buildForXStatement("of");

exports.ForOfStatement = ForOfStatement;
/**
 * Prints DoWhileStatement, prints body and test.
 */

function DoWhileStatement(node, print) {
  this.push("do ");
  print.plain(node.body);
  this.space();
  this.keyword("while");
  this.push("(");
  print.plain(node.test);
  this.push(");");
}

/**
 * Builds continue, return, or break statement printers.
 * Prints label (or key).
 */

var buildLabelStatement = function buildLabelStatement(prefix) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? "label" : arguments[1];

  return function (node, print) {
    this.push(prefix);

    var label = node[key];
    if (label) {
      this.push(" ");
      var terminatorState = this.startTerminatorless();
      print.plain(label);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
};

/**
 * Create ContinueStatement, ReturnStatement, and BreakStatement printers.
 */

var ContinueStatement = buildLabelStatement("continue");
exports.ContinueStatement = ContinueStatement;
var ReturnStatement = buildLabelStatement("return", "argument");
exports.ReturnStatement = ReturnStatement;
var BreakStatement = buildLabelStatement("break");
exports.BreakStatement = BreakStatement;
var ThrowStatement = buildLabelStatement("throw", "argument");

exports.ThrowStatement = ThrowStatement;
/**
 * Prints LabeledStatement, prints label and body.
 */

function LabeledStatement(node, print) {
  print.plain(node.label);
  this.push(": ");
  print.plain(node.body);
}

/**
 * Prints TryStatement, prints block, handlers, and finalizer.
 */

function TryStatement(node, print) {
  this.keyword("try");
  print.plain(node.block);
  this.space();

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  if (node.handlers) {
    print.plain(node.handlers[0]);
  } else {
    print.plain(node.handler);
  }

  if (node.finalizer) {
    this.space();
    this.push("finally ");
    print.plain(node.finalizer);
  }
}

/**
 * Prints CatchClause, prints param and body.
 */

function CatchClause(node, print) {
  this.keyword("catch");
  this.push("(");
  print.plain(node.param);
  this.push(") ");
  print.plain(node.body);
}

/**
 * Prints SwitchStatement, prints discriminant and cases.
 */

function SwitchStatement(node, print) {
  this.keyword("switch");
  this.push("(");
  print.plain(node.discriminant);
  this.push(")");
  this.space();
  this.push("{");

  print.sequence(node.cases, {
    indent: true,
    addNewlines: function addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    }
  });

  this.push("}");
}

/**
 * Prints SwitchCase, prints test and consequent.
 */

function SwitchCase(node, print) {
  if (node.test) {
    this.push("case ");
    print.plain(node.test);
    this.push(":");
  } else {
    this.push("default:");
  }

  if (node.consequent.length) {
    this.newline();
    print.sequence(node.consequent, { indent: true });
  }
}

/**
 * Prints DebuggerStatement.
 */

function DebuggerStatement() {
  this.push("debugger;");
}

/**
 * Prints VariableDeclaration, prints declarations, handles kind and format.
 */

function VariableDeclaration(node, print, parent) {
  this.push(node.kind + " ");

  var hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    var _arr = node.declarations;

    for (var _i = 0; _i < _arr.length; _i++) {
      var declar = _arr[_i];
      if (declar.init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
      }
    }
  }

  //
  // use a pretty separator when we aren't in compact mode, have initializers and don't have retainLines on
  // this will format declarations like:
  //
  //   var foo = "bar", bar = "foo";
  //
  // into
  //
  //   var foo = "bar",
  //       bar = "foo";
  //

  var sep;
  if (!this.format.compact && !this.format.concise && hasInits && !this.format.retainLines) {
    sep = ",\n" + _repeating2["default"](" ", node.kind.length + 1);
  }

  //

  print.list(node.declarations, { separator: sep });

  if (t.isFor(parent)) {
    // don't give semicolons to these nodes since they'll be inserted in the parent generator
    if (parent.left === node || parent.init === node) return;
  }

  this.semicolon();
}

/**
 * Prints VariableDeclarator, handles id, id.typeAnnotation, and init.
 */

function VariableDeclarator(node, print) {
  print.plain(node.id);
  print.plain(node.id.typeAnnotation);
  if (node.init) {
    this.space();
    this.push("=");
    this.space();
    print.plain(node.init);
  }
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235623, function(require, module, exports) {
/**
 * Print ClassDeclaration, prints decorators, typeParameters, extends, implements, and body.
 */



exports.__esModule = true;
exports.ClassDeclaration = ClassDeclaration;
exports.ClassBody = ClassBody;
exports.ClassProperty = ClassProperty;
exports.MethodDefinition = MethodDefinition;

function ClassDeclaration(node, print) {
  print.list(node.decorators, { separator: "" });
  this.push("class");

  if (node.id) {
    this.push(" ");
    print.plain(node.id);
  }

  print.plain(node.typeParameters);

  if (node.superClass) {
    this.push(" extends ");
    print.plain(node.superClass);
    print.plain(node.superTypeParameters);
  }

  if (node["implements"]) {
    this.push(" implements ");
    print.join(node["implements"], { separator: ", " });
  }

  this.space();
  print.plain(node.body);
}

/**
 * Alias ClassDeclaration printer as ClassExpression.
 */

exports.ClassExpression = ClassDeclaration;

/**
 * Print ClassBody, collapses empty blocks, prints body.
 */

function ClassBody(node, print) {
  this.push("{");
  if (node.body.length === 0) {
    print.printInnerComments();
    this.push("}");
  } else {
    this.newline();

    this.indent();
    print.sequence(node.body);
    this.dedent();

    this.rightBrace();
  }
}

/**
 * Print ClassProperty, prints decorators, static, key, typeAnnotation, and value.
 * Also: semicolons, deal with it.
 */

function ClassProperty(node, print) {
  print.list(node.decorators, { separator: "" });

  if (node["static"]) this.push("static ");
  print.plain(node.key);
  print.plain(node.typeAnnotation);
  if (node.value) {
    this.space();
    this.push("=");
    this.space();
    print.plain(node.value);
  }
  this.semicolon();
}

/**
 * Print MethodDefinition, prints decorations, static, and method.
 */

function MethodDefinition(node, print) {
  print.list(node.decorators, { separator: "" });

  if (node["static"]) {
    this.push("static ");
  }

  this._method(node, print);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235624, function(require, module, exports) {


exports.__esModule = true;
exports._params = _params;
exports._method = _method;
exports.FunctionExpression = FunctionExpression;
exports.ArrowFunctionExpression = ArrowFunctionExpression;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints nodes with params, prints typeParameters, params, and returnType, handles optional params.
 */

function _params(node, print) {
  // istanbul ignore next

  var _this = this;

  print.plain(node.typeParameters);
  this.push("(");
  print.list(node.params, {
    iterator: function iterator(node) {
      if (node.optional) _this.push("?");
      print.plain(node.typeAnnotation);
    }
  });
  this.push(")");

  if (node.returnType) {
    print.plain(node.returnType);
  }
}

/**
 * Prints method-like nodes, prints key, value, and body, handles async, generator, computed, and get or set.
 */

function _method(node, print) {
  var value = node.value;
  var kind = node.kind;
  var key = node.key;

  if (kind === "method" || kind === "init") {
    if (value.generator) {
      this.push("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.push(kind + " ");
  }

  if (value.async) this.push("async ");

  if (node.computed) {
    this.push("[");
    print.plain(key);
    this.push("]");
  } else {
    print.plain(key);
  }

  this._params(value, print);
  this.space();
  print.plain(value.body);
}

/**
 * Prints FunctionExpression, prints id and body, handles async and generator.
 */

function FunctionExpression(node, print) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    print.plain(node.id);
  } else {
    this.space();
  }

  this._params(node, print);
  this.space();
  print.plain(node.body);
}

/**
 * Alias FunctionExpression printer as FunctionDeclaration.
 */

exports.FunctionDeclaration = FunctionExpression;

/**
 * Prints ArrowFunctionExpression, prints params and body, handles async.
 * Leaves out parentheses when single param.
 */

function ArrowFunctionExpression(node, print) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    print.plain(node.params[0]);
  } else {
    this._params(node, print);
  }

  this.push(" => ");

  var bodyNeedsParens = t.isObjectExpression(node.body);

  if (bodyNeedsParens) {
    this.push("(");
  }

  print.plain(node.body);

  if (bodyNeedsParens) {
    this.push(")");
  }
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235625, function(require, module, exports) {


exports.__esModule = true;
exports.ImportSpecifier = ImportSpecifier;
exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
exports.ExportDefaultSpecifier = ExportDefaultSpecifier;
exports.ExportSpecifier = ExportSpecifier;
exports.ExportNamespaceSpecifier = ExportNamespaceSpecifier;
exports.ExportAllDeclaration = ExportAllDeclaration;
exports.ExportNamedDeclaration = ExportNamedDeclaration;
exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
exports.ImportDeclaration = ImportDeclaration;
exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints ImportSpecifier, prints imported and local.
 */

function ImportSpecifier(node, print) {
  print.plain(node.imported);
  if (node.local && node.local.name !== node.imported.name) {
    this.push(" as ");
    print.plain(node.local);
  }
}

/**
 * Prints ImportDefaultSpecifier, prints local.
 */

function ImportDefaultSpecifier(node, print) {
  print.plain(node.local);
}

/**
 * Prints ExportDefaultSpecifier, prints exported.
 */

function ExportDefaultSpecifier(node, print) {
  print.plain(node.exported);
}

/**
 * Prints ExportSpecifier, prints local and exported.
 */

function ExportSpecifier(node, print) {
  print.plain(node.local);
  if (node.exported && node.local.name !== node.exported.name) {
    this.push(" as ");
    print.plain(node.exported);
  }
}

/**
 * Prints ExportNamespaceSpecifier, prints exported.
 */

function ExportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.exported);
}

/**
 * Prints ExportAllDeclaration, prints exported and source.
 */

function ExportAllDeclaration(node, print) {
  this.push("export *");
  if (node.exported) {
    this.push(" as ");
    print.plain(node.exported);
  }
  this.push(" from ");
  print.plain(node.source);
  this.semicolon();
}

/**
 * Prints ExportNamedDeclaration, delegates to ExportDeclaration.
 */

function ExportNamedDeclaration(node, print) {
  this.push("export ");
  ExportDeclaration.call(this, node, print);
}

/**
 * Prints ExportDefaultDeclaration, delegates to ExportDeclaration.
 */

function ExportDefaultDeclaration(node, print) {
  this.push("export default ");
  ExportDeclaration.call(this, node, print);
}

/**
 * Prints ExportDeclaration, prints specifiers, declration, and source.
 */

function ExportDeclaration(node, print) {
  var specifiers = node.specifiers;

  if (node.declaration) {
    var declar = node.declaration;
    print.plain(declar);
    if (t.isStatement(declar) || t.isFunction(declar) || t.isClass(declar)) return;
  } else {
    if (node.exportKind === "type") {
      this.push("type ");
    }

    var first = specifiers[0];
    var hasSpecial = false;
    if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
      hasSpecial = true;
      print.plain(specifiers.shift());
      if (specifiers.length) {
        this.push(", ");
      }
    }

    if (specifiers.length || !specifiers.length && !hasSpecial) {
      this.push("{");
      if (specifiers.length) {
        this.space();
        print.join(specifiers, { separator: ", " });
        this.space();
      }
      this.push("}");
    }

    if (node.source) {
      this.push(" from ");
      print.plain(node.source);
    }
  }

  this.ensureSemicolon();
}

/**
 * Prints ImportDeclaration, prints specifiers and source, handles isType.
 */

function ImportDeclaration(node, print) {
  this.push("import ");

  if (node.importKind === "type" || node.importKind === "typeof") {
    this.push(node.importKind + " ");
  }

  var specfiers = node.specifiers;
  if (specfiers && specfiers.length) {
    var first = node.specifiers[0];
    if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
      print.plain(node.specifiers.shift());
      if (node.specifiers.length) {
        this.push(", ");
      }
    }

    if (node.specifiers.length) {
      this.push("{");
      this.space();
      print.join(node.specifiers, { separator: ", " });
      this.space();
      this.push("}");
    }

    this.push(" from ");
  }

  print.plain(node.source);
  this.semicolon();
}

/**
 * Prints ImportNamespaceSpecifier, prints local.
 */

function ImportNamespaceSpecifier(node, print) {
  this.push("* as ");
  print.plain(node.local);
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235626, function(require, module, exports) {
/* eslint quotes: 0 */



exports.__esModule = true;
exports.Identifier = Identifier;
exports.RestElement = RestElement;
exports.ObjectExpression = ObjectExpression;
exports.Property = Property;
exports.ArrayExpression = ArrayExpression;
exports.Literal = Literal;
exports._Literal = _Literal;
exports._stringLiteral = _stringLiteral;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints Identifier, prints name.
 */

function Identifier(node) {
  this.push(node.name);
}

/**
 * Prints RestElement, prints argument.
 */

function RestElement(node, print) {
  this.push("...");
  print.plain(node.argument);
}

/**
 * Alias RestElement printer as SpreadElement,
 * and RestElement printer as SpreadProperty.
 */

exports.SpreadElement = RestElement;
exports.SpreadProperty = RestElement;

/**
 * Prints ObjectExpression, prints properties.
 */

function ObjectExpression(node, print) {
  var props = node.properties;

  this.push("{");
  print.printInnerComments();

  if (props.length) {
    this.space();
    print.list(props, { indent: true });
    this.space();
  }

  this.push("}");
}

/**
 * Alias ObjectExpression printer as ObjectPattern.
 */

exports.ObjectPattern = ObjectExpression;

/**
 * Prints Property, prints decorators, key, and value, handles kind, computed, and shorthand.
 */

function Property(node, print) {
  print.list(node.decorators, { separator: "" });

  if (node.method || node.kind === "get" || node.kind === "set") {
    this._method(node, print);
  } else {
    if (node.computed) {
      this.push("[");
      print.plain(node.key);
      this.push("]");
    } else {
      // print `({ foo: foo = 5 } = {})` as `({ foo = 5 } = {});`
      if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) {
        print.plain(node.value);
        return;
      }

      print.plain(node.key);

      // shorthand!
      if (node.shorthand && t.isIdentifier(node.key) && t.isIdentifier(node.value) && node.key.name === node.value.name) {
        return;
      }
    }

    this.push(":");
    this.space();
    print.plain(node.value);
  }
}

/**
 * Prints ArrayExpression, prints elements.
 */

function ArrayExpression(node, print) {
  var elems = node.elements;
  var len = elems.length;

  this.push("[");
  print.printInnerComments();

  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      print.plain(elem);
      if (i < len - 1) this.push(",");
    } else {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.push(",");
    }
  }

  this.push("]");
}

/**
 * Alias ArrayExpression printer as ArrayPattern.
 */

exports.ArrayPattern = ArrayExpression;

/**
 * Prints Literal, prints value, regex, raw, handles val type.
 */

function Literal(node) {
  this.push(""); // hack: catch up indentation
  this._push(this._Literal(node));
}

function _Literal(node) {
  var val = node.value;

  if (node.regex) {
    return "/" + node.regex.pattern + "/" + node.regex.flags;
  }

  // just use the raw property if our current value is equivalent to the one we got
  // when we populated raw
  if (node.raw != null && node.rawValue != null && val === node.rawValue) {
    return node.raw;
  }

  switch (typeof val) {
    case "string":
      return this._stringLiteral(val);

    case "number":
      return val + "";

    case "boolean":
      return val ? "true" : "false";

    default:
      if (val === null) {
        return "null";
      } else {
        throw new Error("Invalid Literal type");
      }
  }
}

/**
 * Prints string literals, handles format.
 */

function _stringLiteral(val) {
  val = JSON.stringify(val);

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  if (this.format.quotes === "single") {
    // remove double quotes
    val = val.slice(1, -1);

    // unescape double quotes
    val = val.replace(/\\"/g, '"');

    // escape single quotes
    val = val.replace(/'/g, "\\'");

    // add single quotes
    val = "'" + val + "'";
  }

  return val;
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235627, function(require, module, exports) {


exports.__esModule = true;
exports.AnyTypeAnnotation = AnyTypeAnnotation;
exports.ArrayTypeAnnotation = ArrayTypeAnnotation;
exports.BooleanTypeAnnotation = BooleanTypeAnnotation;
exports.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
exports.DeclareClass = DeclareClass;
exports.DeclareFunction = DeclareFunction;
exports.DeclareInterface = DeclareInterface;
exports.DeclareModule = DeclareModule;
exports.DeclareTypeAlias = DeclareTypeAlias;
exports.DeclareVariable = DeclareVariable;
exports.FunctionTypeAnnotation = FunctionTypeAnnotation;
exports.FunctionTypeParam = FunctionTypeParam;
exports.InterfaceExtends = InterfaceExtends;
exports._interfaceish = _interfaceish;
exports.InterfaceDeclaration = InterfaceDeclaration;
exports.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
exports.MixedTypeAnnotation = MixedTypeAnnotation;
exports.NullableTypeAnnotation = NullableTypeAnnotation;
exports.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
exports.NumberTypeAnnotation = NumberTypeAnnotation;
exports.StringLiteralTypeAnnotation = StringLiteralTypeAnnotation;
exports.StringTypeAnnotation = StringTypeAnnotation;
exports.ThisTypeAnnotation = ThisTypeAnnotation;
exports.TupleTypeAnnotation = TupleTypeAnnotation;
exports.TypeofTypeAnnotation = TypeofTypeAnnotation;
exports.TypeAlias = TypeAlias;
exports.TypeAnnotation = TypeAnnotation;
exports.TypeParameterInstantiation = TypeParameterInstantiation;
exports.ObjectTypeAnnotation = ObjectTypeAnnotation;
exports.ObjectTypeCallProperty = ObjectTypeCallProperty;
exports.ObjectTypeIndexer = ObjectTypeIndexer;
exports.ObjectTypeProperty = ObjectTypeProperty;
exports.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
exports.UnionTypeAnnotation = UnionTypeAnnotation;
exports.TypeCastExpression = TypeCastExpression;
exports.VoidTypeAnnotation = VoidTypeAnnotation;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints AnyTypeAnnotation.
 */

function AnyTypeAnnotation() {
  this.push("any");
}

/**
 * Prints ArrayTypeAnnotation, prints elementType.
 */

function ArrayTypeAnnotation(node, print) {
  print.plain(node.elementType);
  this.push("[");
  this.push("]");
}

/**
 * Prints BooleanTypeAnnotation.
 */

function BooleanTypeAnnotation() {
  this.push("bool");
}

/**
 * Prints BooleanLiteralTypeAnnotation.
 */

function BooleanLiteralTypeAnnotation(node) {
  this.push(node.value ? "true" : "false");
}

/**
 * Prints DeclareClass, prints node.
 */

function DeclareClass(node, print) {
  this.push("declare class ");
  this._interfaceish(node, print);
}

/**
 * Prints DeclareFunction, prints id and id.typeAnnotation.
 */

function DeclareFunction(node, print) {
  this.push("declare function ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation.typeAnnotation);
  this.semicolon();
}

/**
 * Prints DeclareInterface.
 */

function DeclareInterface(node, print) {
  this.push("declare ");
  this.InterfaceDeclaration(node, print);
}

/**
 * Prints DeclareModule, prints id and body.
 */

function DeclareModule(node, print) {
  this.push("declare module ");
  print.plain(node.id);
  this.space();
  print.plain(node.body);
}

/**
 * Prints DeclareTypeAlias.
 */

function DeclareTypeAlias(node, print) {
  this.push("declare ");
  this.TypeAlias(node, print);
}

/**
 * Prints DeclareVariable, prints id and id.typeAnnotation.
 */

function DeclareVariable(node, print) {
  this.push("declare var ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation);
  this.semicolon();
}

/**
 * Prints FunctionTypeAnnotation, prints typeParameters, params, and rest.
 */

function FunctionTypeAnnotation(node, print, parent) {
  print.plain(node.typeParameters);
  this.push("(");
  print.list(node.params);

  if (node.rest) {
    if (node.params.length) {
      this.push(",");
      this.space();
    }
    this.push("...");
    print.plain(node.rest);
  }

  this.push(")");

  // this node type is overloaded, not sure why but it makes it EXTREMELY annoying
  if (parent.type === "ObjectTypeProperty" || parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction") {
    this.push(":");
  } else {
    this.space();
    this.push("=>");
  }

  this.space();
  print.plain(node.returnType);
}

/**
 * Prints FunctionTypeParam, prints name and typeAnnotation, handles optional.
 */

function FunctionTypeParam(node, print) {
  print.plain(node.name);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  print.plain(node.typeAnnotation);
}

/**
 * Prints InterfaceExtends, prints id and typeParameters.
 */

function InterfaceExtends(node, print) {
  print.plain(node.id);
  print.plain(node.typeParameters);
}

/**
 * Alias InterfaceExtends printer as ClassImplements,
 * and InterfaceExtends printer as GenericTypeAnnotation.
 */

exports.ClassImplements = InterfaceExtends;
exports.GenericTypeAnnotation = InterfaceExtends;

/**
 * Prints interface-like node, prints id, typeParameters, extends, and body.
 */

function _interfaceish(node, print) {
  print.plain(node.id);
  print.plain(node.typeParameters);
  if (node["extends"].length) {
    this.push(" extends ");
    print.join(node["extends"], { separator: ", " });
  }
  if (node.mixins && node.mixins.length) {
    this.push(" mixins ");
    print.join(node.mixins, { separator: ", " });
  }
  this.space();
  print.plain(node.body);
}

/**
 * Prints InterfaceDeclaration, prints node.
 */

function InterfaceDeclaration(node, print) {
  this.push("interface ");
  this._interfaceish(node, print);
}

/**
 * Prints IntersectionTypeAnnotation, prints types.
 */

function IntersectionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " & " });
}

/**
 * Prints MixedTypeAnnotation.
 */

function MixedTypeAnnotation() {
  this.push("mixed");
}

/**
 * Prints NullableTypeAnnotation, prints typeAnnotation.
 */

function NullableTypeAnnotation(node, print) {
  this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * Prints NullLiteralTypeAnnotation, prints value.
 */

function NullLiteralTypeAnnotation() {
  this.push("null");
}

/**
 * Prints NumberLiteralTypeAnnotation, prints value.
 */

var _types2 = require("./types");

exports.NumberLiteralTypeAnnotation = _types2.Literal;

/**
 * Prints NumberTypeAnnotation.
 */

function NumberTypeAnnotation() {
  this.push("number");
}

/**
 * Prints StringLiteralTypeAnnotation, prints value.
 */

function StringLiteralTypeAnnotation(node) {
  this.push(this._stringLiteral(node.value));
}

/**
 * Prints StringTypeAnnotation.
 */

function StringTypeAnnotation() {
  this.push("string");
}

/**
 * Prints ThisTypeAnnotation, prints this.
 */

function ThisTypeAnnotation() {
  this.push("this");
}

/**
 * Prints TupleTypeAnnotation, prints types.
 */

function TupleTypeAnnotation(node, print) {
  this.push("[");
  print.join(node.types, { separator: ", " });
  this.push("]");
}

/**
 * Prints TypeofTypeAnnotation, prints argument.
 */

function TypeofTypeAnnotation(node, print) {
  this.push("typeof ");
  print.plain(node.argument);
}

/**
 * Prints TypeAlias, prints id, typeParameters, and right.
 */

function TypeAlias(node, print) {
  this.push("type ");
  print.plain(node.id);
  print.plain(node.typeParameters);
  this.space();
  this.push("=");
  this.space();
  print.plain(node.right);
  this.semicolon();
}

/**
 * Prints TypeAnnotation, prints typeAnnotation, handles optional.
 */

function TypeAnnotation(node, print) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * Prints TypeParameterInstantiation, prints params.
 */

function TypeParameterInstantiation(node, print) {
  this.push("<");
  print.join(node.params, {
    separator: ", ",
    iterator: function iterator(node) {
      print.plain(node.typeAnnotation);
    }
  });
  this.push(">");
}

/**
 * Alias TypeParameterInstantiation printer as TypeParameterDeclaration
 */

exports.TypeParameterDeclaration = TypeParameterInstantiation;

/**
 * Prints ObjectTypeAnnotation, prints properties, callProperties, and indexers.
 */

function ObjectTypeAnnotation(node, print) {
  // istanbul ignore next

  var _this = this;

  this.push("{");
  var props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    print.list(props, {
      separator: false,
      indent: true,
      iterator: function iterator() {
        if (props.length !== 1) {
          _this.semicolon();
          _this.space();
        }
      }
    });

    this.space();
  }

  this.push("}");
}

/**
 * Prints ObjectTypeCallProperty, prints value, handles static.
 */

function ObjectTypeCallProperty(node, print) {
  if (node["static"]) this.push("static ");
  print.plain(node.value);
}

/**
 * Prints ObjectTypeIndexer, prints id, key, and value, handles static.
 */

function ObjectTypeIndexer(node, print) {
  if (node["static"]) this.push("static ");
  this.push("[");
  print.plain(node.id);
  this.push(":");
  this.space();
  print.plain(node.key);
  this.push("]");
  this.push(":");
  this.space();
  print.plain(node.value);
}

/**
 * Prints ObjectTypeProperty, prints static, key, and value.
 */

function ObjectTypeProperty(node, print) {
  if (node["static"]) this.push("static ");
  print.plain(node.key);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  print.plain(node.value);
}

/**
 * Prints QualifiedTypeIdentifier, prints qualification and id.
 */

function QualifiedTypeIdentifier(node, print) {
  print.plain(node.qualification);
  this.push(".");
  print.plain(node.id);
}

/**
 * Prints UnionTypeAnnotation, prints types.
 */

function UnionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " | " });
}

/**
 * Prints TypeCastExpression, prints expression and typeAnnotation.
 */

function TypeCastExpression(node, print) {
  this.push("(");
  print.plain(node.expression);
  print.plain(node.typeAnnotation);
  this.push(")");
}

/**
 * Prints VoidTypeAnnotation.
 */

function VoidTypeAnnotation() {
  this.push("void");
}
}, function(modId) { var map = {"../../types":1676544235555,"./types":1676544235626}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235628, function(require, module, exports) {
/**
 * Print File.program
 */



exports.__esModule = true;
exports.File = File;
exports.Program = Program;
exports.BlockStatement = BlockStatement;
exports.Noop = Noop;

function File(node, print) {
  print.plain(node.program);
}

/**
 * Print all nodes in a Program.body.
 */

function Program(node, print) {
  print.sequence(node.body);
}

/**
 * Print BlockStatement, collapses empty blocks, prints body.
 */

function BlockStatement(node, print) {
  this.push("{");
  if (node.body.length) {
    this.newline();
    print.sequence(node.body, { indent: true });
    if (!this.format.retainLines) this.removeLast("\n");
    this.rightBrace();
  } else {
    print.printInnerComments();
    this.push("}");
  }
}

/**
 * What is my purpose?
 * Why am I here?
 * Why are any of us here?
 * Does any of this really matter?
 */

function Noop() {}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235629, function(require, module, exports) {


exports.__esModule = true;
exports.JSXAttribute = JSXAttribute;
exports.JSXIdentifier = JSXIdentifier;
exports.JSXNamespacedName = JSXNamespacedName;
exports.JSXMemberExpression = JSXMemberExpression;
exports.JSXSpreadAttribute = JSXSpreadAttribute;
exports.JSXExpressionContainer = JSXExpressionContainer;
exports.JSXElement = JSXElement;
exports.JSXOpeningElement = JSXOpeningElement;
exports.JSXClosingElement = JSXClosingElement;
exports.JSXEmptyExpression = JSXEmptyExpression;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * Prints JSXAttribute, prints name and value.
 */

function JSXAttribute(node, print) {
  print.plain(node.name);
  if (node.value) {
    this.push("=");
    print.plain(node.value);
  }
}

/**
 * Prints JSXIdentifier, prints name.
 */

function JSXIdentifier(node) {
  this.push(node.name);
}

/**
 * Prints JSXNamespacedName, prints namespace and name.
 */

function JSXNamespacedName(node, print) {
  print.plain(node.namespace);
  this.push(":");
  print.plain(node.name);
}

/**
 * Prints JSXMemberExpression, prints object and property.
 */

function JSXMemberExpression(node, print) {
  print.plain(node.object);
  this.push(".");
  print.plain(node.property);
}

/**
 * Prints JSXSpreadAttribute, prints argument.
 */

function JSXSpreadAttribute(node, print) {
  this.push("{...");
  print.plain(node.argument);
  this.push("}");
}

/**
 * Prints JSXExpressionContainer, prints expression.
 */

function JSXExpressionContainer(node, print) {
  this.push("{");
  print.plain(node.expression);
  this.push("}");
}

/**
 * Prints JSXElement, prints openingElement, children, and closingElement.
 */

function JSXElement(node, print) {
  var open = node.openingElement;
  print.plain(open);
  if (open.selfClosing) return;

  this.indent();
  var _arr = node.children;
  for (var _i = 0; _i < _arr.length; _i++) {
    var child = _arr[_i];
    if (t.isLiteral(child)) {
      this.push(child.value, true);
    } else {
      print.plain(child);
    }
  }
  this.dedent();

  print.plain(node.closingElement);
}

/**
 * Prints JSXOpeningElement, prints name and attributes, handles selfClosing.
 */

function JSXOpeningElement(node, print) {
  this.push("<");
  print.plain(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

/**
 * Prints JSXClosingElement, prints name.
 */

function JSXClosingElement(node, print) {
  this.push("</");
  print.plain(node.name);
  this.push(">");
}

/**
 * Prints JSXEmptyExpression.
 */

function JSXEmptyExpression() {}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235630, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _debugNode = require("debug/node");

var _debugNode2 = _interopRequireDefault(_debugNode);

var verboseDebug = _debugNode2["default"]("babel:verbose");
var generalDebug = _debugNode2["default"]("babel");

var seenDeprecatedMessages = [];

/**
 * [Please add a description.]
 */

var Logger = (function () {
  function Logger(file, filename) {
    _classCallCheck(this, Logger);

    this.filename = filename;
    this.file = file;
  }

  /**
   * [Please add a description.]
   */

  Logger.prototype._buildMessage = function _buildMessage(msg) {
    var parts = "[BABEL] " + this.filename;
    if (msg) parts += ": " + msg;
    return parts;
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.warn = function warn(msg) {
    console.warn(this._buildMessage(msg));
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.error = function error(msg) {
    var Constructor = arguments.length <= 1 || arguments[1] === undefined ? Error : arguments[1];

    throw new Constructor(this._buildMessage(msg));
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.deprecate = function deprecate(msg) {
    if (this.file.opts && this.file.opts.suppressDeprecationMessages) return;

    msg = this._buildMessage(msg);

    // already seen this message
    if (seenDeprecatedMessages.indexOf(msg) >= 0) return;

    // make sure we don't see it again
    seenDeprecatedMessages.push(msg);

    console.error(msg);
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.verbose = function verbose(msg) {
    if (verboseDebug.enabled) verboseDebug(this._buildMessage(msg));
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.debug = function debug(msg) {
    if (generalDebug.enabled) generalDebug(this._buildMessage(msg));
  };

  /**
   * [Please add a description.]
   */

  Logger.prototype.deopt = function deopt(node, msg) {
    this.debug(msg);
  };

  return Logger;
})();

exports["default"] = Logger;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235631, function(require, module, exports) {
/**
 * [Please add a description.]
 */



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hub = function Hub(file) {
  _classCallCheck(this, Hub);

  this.file = file;
};

exports["default"] = Hub;
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235632, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * Normalize an AST.
 *
 * - Wrap `Program` node with a `File` node.
 */

exports["default"] = function (ast, comments, tokens) {
  if (ast && ast.type === "Program") {
    return t.file(ast, comments || [], tokens || []);
  } else {
    throw new Error("Not a valid ast?");
  }
};

module.exports = exports["default"];
}, function(modId) { var map = {"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235633, function(require, module, exports) {


exports.__esModule = true;
exports["default"] = {
  //- builtin-prepass
  "minification.constantFolding": require("babel-plugin-constant-folding"),

  //- builtin-pre
  strict: require("./other/strict"),
  eval: require("babel-plugin-eval"),
  _validation: require("./internal/validation"),
  _hoistDirectives: require("./internal/hoist-directives"),
  "minification.removeDebugger": require("babel-plugin-remove-debugger"),
  "minification.removeConsole": require("babel-plugin-remove-console"),
  "utility.inlineEnvironmentVariables": require("babel-plugin-inline-environment-variables"),
  "minification.deadCodeElimination": require("babel-plugin-dead-code-elimination"),
  _modules: require("./internal/modules"),
  "react.displayName": require("babel-plugin-react-display-name"),
  "es6.spec.modules": require("./es6/spec.modules"),
  "es6.spec.arrowFunctions": require("./es6/spec.arrow-functions"),
  "es6.spec.templateLiterals": require("./es6/spec.template-literals"),
  "es6.templateLiterals": require("./es6/template-literals"),
  "es6.literals": require("./es6/literals"),
  "validation.undeclaredVariableCheck": require("babel-plugin-undeclared-variables-check"),

  //- builtin-basic
  // this is where the bulk of the ES6 transformations take place, none of them require traversal state
  // so they can all be concatenated together for performance
  "spec.functionName": require("./spec/function-name"),
  "es7.classProperties": require("./es7/class-properties"),
  "es7.trailingFunctionCommas": require("./es7/trailing-function-commas"),
  "es7.asyncFunctions": require("./es7/async-functions"),
  "es7.decorators": require("./es7/decorators"),
  "validation.react": require("./validation/react"),
  "es6.arrowFunctions": require("./es6/arrow-functions"),
  "spec.blockScopedFunctions": require("./spec/block-scoped-functions"),
  "optimisation.react.constantElements": require("babel-plugin-react-constant-elements"),
  "optimisation.react.inlineElements": require("./optimisation/react.inline-elements"),
  "es7.comprehensions": require("./es7/comprehensions"),
  "es6.classes": require("./es6/classes"),
  asyncToGenerator: require("./other/async-to-generator"),
  bluebirdCoroutines: require("./other/bluebird-coroutines"),
  "es6.objectSuper": require("./es6/object-super"),
  "es7.objectRestSpread": require("./es7/object-rest-spread"),
  "es7.exponentiationOperator": require("./es7/exponentiation-operator"),
  "es5.properties.mutators": require("./es5/properties.mutators"),
  "es6.properties.shorthand": require("./es6/properties.shorthand"),
  "es6.properties.computed": require("./es6/properties.computed"),
  "optimisation.flow.forOf": require("./optimisation/flow.for-of"),
  "es6.forOf": require("./es6/for-of"),
  "es6.regex.sticky": require("./es6/regex.sticky"),
  "es6.regex.unicode": require("./es6/regex.unicode"),
  "es6.constants": require("./es6/constants"),
  "es7.exportExtensions": require("./es7/export-extensions"),
  "spec.protoToAssign": require("babel-plugin-proto-to-assign"),
  "es7.doExpressions": require("./es7/do-expressions"),
  "es6.spec.symbols": require("./es6/spec.symbols"),
  "es7.functionBind": require("./es7/function-bind"),
  "spec.undefinedToVoid": require("babel-plugin-undefined-to-void"),

  //- builtin-advanced
  "es6.spread": require("./es6/spread"),
  "es6.parameters": require("./es6/parameters"),
  "es6.destructuring": require("./es6/destructuring"),
  "es6.blockScoping": require("./es6/block-scoping"),
  "es6.spec.blockScoping": require("./es6/spec.block-scoping"),
  reactCompat: require("./other/react-compat"),
  react: require("./other/react"),
  regenerator: require("./other/regenerator"),

  // es6 syntax transformation is **forbidden** past this point since regenerator will chuck a massive
  // hissy fit

  //- builtin-modules
  runtime: require("babel-plugin-runtime"),
  "es6.modules": require("./es6/modules"),
  _moduleFormatter: require("./internal/module-formatter"),

  //- builtin-trailing
  // these clean up the output and do finishing up transformations, it's important to note that by this
  // stage you can't import any new modules or insert new ES6 as all those transformers have already
  // been ran
  "es6.tailCall": require("./es6/tail-call"),
  _shadowFunctions: require("./internal/shadow-functions"),
  "es3.propertyLiterals": require("./es3/property-literals"),
  "es3.memberExpressionLiterals": require("./es3/member-expression-literals"),
  "minification.memberExpressionLiterals": require("babel-plugin-member-expression-literals"),
  "minification.propertyLiterals": require("babel-plugin-property-literals"),
  _blockHoist: require("./internal/block-hoist"),
  jscript: require("babel-plugin-jscript"),
  flow: require("./other/flow"),
  "optimisation.modules.system": require("./optimisation/modules.system")
};
module.exports = exports["default"];
}, function(modId) { var map = {"./other/strict":1676544235634,"./internal/validation":1676544235635,"./internal/hoist-directives":1676544235636,"./internal/modules":1676544235637,"./es6/spec.modules":1676544235638,"./es6/spec.arrow-functions":1676544235639,"./es6/spec.template-literals":1676544235640,"./es6/template-literals":1676544235641,"./es6/literals":1676544235642,"./spec/function-name":1676544235643,"./es7/class-properties":1676544235646,"./es7/trailing-function-commas":1676544235647,"./es7/async-functions":1676544235648,"./es7/decorators":1676544235649,"./validation/react":1676544235652,"./es6/arrow-functions":1676544235653,"./spec/block-scoped-functions":1676544235654,"./optimisation/react.inline-elements":1676544235655,"./es7/comprehensions":1676544235656,"./es6/classes":1676544235658,"./other/async-to-generator":1676544235662,"./other/bluebird-coroutines":1676544235664,"./es6/object-super":1676544235665,"./es7/object-rest-spread":1676544235666,"./es7/exponentiation-operator":1676544235667,"./es5/properties.mutators":1676544235670,"./es6/properties.shorthand":1676544235671,"./es6/properties.computed":1676544235672,"./optimisation/flow.for-of":1676544235673,"./es6/for-of":1676544235674,"./es6/regex.sticky":1676544235675,"./es6/regex.unicode":1676544235677,"./es6/constants":1676544235678,"./es7/export-extensions":1676544235679,"./es7/do-expressions":1676544235680,"./es6/spec.symbols":1676544235681,"./es7/function-bind":1676544235682,"./es6/spread":1676544235683,"./es6/parameters":1676544235684,"./es6/destructuring":1676544235688,"./es6/block-scoping":1676544235689,"./es6/spec.block-scoping":1676544235690,"./other/react-compat":1676544235691,"./other/react":1676544235693,"./other/regenerator":1676544235694,"./es6/modules":1676544235695,"./internal/module-formatter":1676544235696,"./es6/tail-call":1676544235697,"./internal/shadow-functions":1676544235698,"./es3/property-literals":1676544235699,"./es3/member-expression-literals":1676544235700,"./internal/block-hoist":1676544235701,"./other/flow":1676544235702,"./optimisation/modules.system":1676544235703}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235634, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
var THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty"];

function isUseStrict(node) {
  if (!t.isLiteral(node)) return false;

  if (node.raw && node.rawValue === node.value) {
    return node.rawValue === "use strict";
  } else {
    return node.value === "use strict";
  }
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Program: {
    enter: function enter(program) {
      var first = program.body[0];

      var directive;
      if (t.isExpressionStatement(first) && isUseStrict(first.expression)) {
        directive = first;
      } else {
        directive = t.expressionStatement(t.literal("use strict"));
        this.unshiftContainer("body", directive);
        if (first) {
          directive.leadingComments = first.leadingComments;
          first.leadingComments = [];
        }
      }
      directive._blockHoist = Infinity;
    }
  },

  /**
   * [Please add a description.]
   */

  ThisExpression: function ThisExpression() {
    if (!this.findParent(function (path) {
      return !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0;
    })) {
      return t.identifier("undefined");
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235635, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ForXStatement: function ForXStatement(node, parent, scope, file) {
    var left = node.left;
    if (t.isVariableDeclaration(left)) {
      var declar = left.declarations[0];
      if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
    }
  },

  /**
   * [Please add a description.]
   */

  Property: function Property(node, parent, scope, file) {
    if (node.kind === "set") {
      var first = node.value.params[0];
      if (t.isRestElement(first)) {
        throw file.errorWithNode(first, messages.get("settersNoRest"));
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../messages":1676544235569,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235636, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Block: {
    exit: function exit(node) {
      for (var i = 0; i < node.body.length; i++) {
        var bodyNode = node.body[i];
        if (t.isExpressionStatement(bodyNode) && t.isLiteral(bodyNode.expression)) {
          bodyNode._blockHoist = Infinity;
        } else {
          return;
        }
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235637, function(require, module, exports) {
// in this transformer we have to split up classes and function declarations
// from their exports. why? because sometimes we need to replace classes with
// nodes that aren't allowed in the same contexts. also, if you're exporting
// a generator function as a default then regenerator will destroy the export
// declaration and leave a variable declaration in it's place... yeah, handy.



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function getDeclar(node) {
  var declar = node.declaration;
  t.inheritsComments(declar, node);
  t.removeComments(node);
  declar._ignoreUserWhitespace = true;
  return declar;
}

/**
 * [Please add a description.]
 */

function buildExportSpecifier(id) {
  return t.exportSpecifier(cloneIdentifier(id), cloneIdentifier(id));
}

function cloneIdentifier(_ref) {
  var name = _ref.name;
  var loc = _ref.loc;

  var id = t.identifier(name);
  id._loc = loc;
  return id;
}

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ExportDefaultDeclaration: function ExportDefaultDeclaration(node, parent, scope) {
    var declar = node.declaration;

    if (t.isClassDeclaration(declar)) {
      // export default class Foo {};
      var nodes = [getDeclar(node), node];
      node.declaration = declar.id;
      return nodes;
    } else if (t.isClassExpression(declar)) {
      // export default class {};
      var temp = scope.generateUidIdentifier("default");
      node.declaration = t.variableDeclaration("var", [t.variableDeclarator(temp, declar)]);

      var nodes = [getDeclar(node), node];
      node.declaration = temp;
      return nodes;
    } else if (t.isFunctionDeclaration(declar)) {
      // export default function Foo() {}
      node._blockHoist = 2;

      var nodes = [getDeclar(node), node];
      node.declaration = declar.id;
      return nodes;
    }
  },

  /**
   * [Please add a description.]
   */

  ExportNamedDeclaration: function ExportNamedDeclaration(node) {
    var declar = node.declaration;

    if (t.isClassDeclaration(declar)) {
      // export class Foo {}
      node.specifiers = [buildExportSpecifier(declar.id)];

      var nodes = [getDeclar(node), node];
      node.declaration = null;
      return nodes;
    } else if (t.isFunctionDeclaration(declar)) {
      // export function Foo() {}
      var newExport = t.exportNamedDeclaration(null, [buildExportSpecifier(declar.id)]);
      newExport._blockHoist = 2;
      return [getDeclar(node), newExport];
    } else if (t.isVariableDeclaration(declar)) {
      // export var foo = "bar";
      var specifiers = [];
      var bindings = this.get("declaration").getBindingIdentifiers();
      for (var key in bindings) {
        specifiers.push(buildExportSpecifier(bindings[key]));
      }
      return [declar, t.exportNamedDeclaration(null, specifiers)];
    }
  },

  /**
   * [Please add a description.]
   */

  Program: {
    enter: function enter(node) {
      var imports = [];
      var rest = [];

      for (var i = 0; i < node.body.length; i++) {
        var bodyNode = node.body[i];
        if (t.isImportDeclaration(bodyNode)) {
          imports.push(bodyNode);
        } else {
          rest.push(bodyNode);
        }
      }

      node.body = imports.concat(rest);
    },

    exit: function exit(node, parent, scope, file) {
      if (!file.transformers["es6.modules"].canTransform()) return;

      if (file.moduleFormatter.setup) {
        file.moduleFormatter.setup();
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235638, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre",
  optional: true
};

exports.metadata = metadata;
var visitor = {
  Program: function Program() {
    var id = this.scope.generateUidIdentifier("null");
    this.unshiftContainer("body", [t.variableDeclaration("var", [t.variableDeclarator(id, t.literal(null))]), t.exportNamedDeclaration(null, [t.exportSpecifier(id, t.identifier("__proto__"))])]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235639, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre",
  optional: true
};

exports.metadata = metadata;
var visitor = {
  ArrowFunctionExpression: function ArrowFunctionExpression(node, parent, scope, file) {
    if (node.shadow) return;
    node.shadow = { "this": false };

    var boundThis = t.thisExpression();
    boundThis._forceShadow = this;

    // make sure that arrow function won't be instantiated
    t.ensureBlock(node);
    this.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(file.addHelper("new-arrow-check"), [t.thisExpression(), boundThis])));

    return t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235640, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true,
  group: "builtin-pre"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  TemplateLiteral: function TemplateLiteral(node, parent) {
    if (t.isTaggedTemplateExpression(parent)) return;

    for (var i = 0; i < node.expressions.length; i++) {
      node.expressions[i] = t.callExpression(t.identifier("String"), [node.expressions[i]]);
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235641, function(require, module, exports) {
/* eslint no-unused-vars: 0 */



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

function isString(node) {
  return t.isLiteral(node) && typeof node.value === "string";
}

/**
 * [Please add a description.]
 */

function buildBinaryExpression(left, right) {
  var node = t.binaryExpression("+", left, right);
  node._templateLiteralProduced = true;
  return node;
}

/**
 * [Please add a description.]
 */

function crawl(path) {
  if (path.is("_templateLiteralProduced")) {
    crawl(path.get("left"));
    crawl(path.get("right"));
  } else if (!path.isBaseType("string") && !path.isBaseType("number")) {
    path.replaceWith(t.callExpression(t.identifier("String"), [path.node]));
  }
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  TaggedTemplateExpression: function TaggedTemplateExpression(node, parent, scope, file) {
    var quasi = node.quasi;
    var args = [];

    var strings = [];
    var raw = [];

    var _arr = quasi.quasis;
    for (var _i = 0; _i < _arr.length; _i++) {
      var elem = _arr[_i];
      strings.push(t.literal(elem.value.cooked));
      raw.push(t.literal(elem.value.raw));
    }

    strings = t.arrayExpression(strings);
    raw = t.arrayExpression(raw);

    var templateName = "tagged-template-literal";
    if (file.isLoose("es6.templateLiterals")) templateName += "-loose";

    var templateObject = file.addTemplateObject(templateName, strings, raw);
    args.push(templateObject);

    args = args.concat(quasi.expressions);

    return t.callExpression(node.tag, args);
  },

  /**
   * [Please add a description.]
   */

  TemplateLiteral: function TemplateLiteral(node, parent, scope, file) {
    var nodes = [];

    var _arr2 = node.quasis;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var elem = _arr2[_i2];
      nodes.push(t.literal(elem.value.cooked));

      var expr = node.expressions.shift();
      if (expr) nodes.push(expr);
    }

    // filter out empty string literals
    nodes = nodes.filter(function (n) {
      return !t.isLiteral(n, { value: "" });
    });

    // since `+` is left-to-right associative
    // ensure the first node is a string if first/second isn't
    if (!isString(nodes[0]) && !isString(nodes[1])) {
      nodes.unshift(t.literal(""));
    }

    if (nodes.length > 1) {
      var root = buildBinaryExpression(nodes.shift(), nodes.shift());

      var _arr3 = nodes;
      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var _node = _arr3[_i3];
        root = buildBinaryExpression(root, _node);
      }

      this.replaceWith(root);
      //crawl(this);
    } else {
        return nodes[0];
      }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235642, function(require, module, exports) {


exports.__esModule = true;
var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
var visitor = {
  Literal: function Literal(node) {
    // number octal like 0b10 or 0o70
    if (typeof node.value === "number" && /^0[ob]/i.test(node.raw)) {
      node.raw = undefined;
    }

    // unicode escape
    if (typeof node.value === "string" && /\\[u]/gi.test(node.raw)) {
      node.raw = undefined;
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235643, function(require, module, exports) {


exports.__esModule = true;

var _helpersNameMethod = require("../../helpers/name-method");

var metadata = {
  group: "builtin-basic"
};

exports.metadata = metadata;
// visit Property functions first - https://github.com/babel/babel/issues/1860

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  "ArrowFunctionExpression|FunctionExpression": {
    exit: function exit() {
      if (!this.parentPath.isProperty()) {
        return _helpersNameMethod.bare.apply(this, arguments);
      }
    }
  },

  /**
   * [Please add a description.]
   */

  ObjectExpression: function ObjectExpression() {
    var props = this.get("properties");
    var _arr = props;
    for (var _i = 0; _i < _arr.length; _i++) {
      var prop = _arr[_i];
      var value = prop.get("value");
      if (value.isFunction()) {
        var newNode = _helpersNameMethod.bare(value.node, prop.node, value.scope);
        if (newNode) value.replaceWith(newNode);
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/name-method":1676544235644}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235644, function(require, module, exports) {


exports.__esModule = true;
exports.custom = custom;
exports.property = property;
exports.bare = bare;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _getFunctionArity = require("./get-function-arity");

var _getFunctionArity2 = _interopRequireDefault(_getFunctionArity);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function visitIdentifier(context, node, scope, state) {
  // check if this node matches our function id
  if (node.name !== state.name) return;

  // check that we don't have a local variable declared as that removes the need
  // for the wrapper
  var localDeclar = scope.getBindingIdentifier(state.name);
  if (localDeclar !== state.outerDeclar) return;

  state.selfReference = true;
  context.stop();
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    visitIdentifier(this, node, scope, state);
  },

  /**
   * [Please add a description.]
   */

  BindingIdentifier: function BindingIdentifier(node, parent, scope, state) {
    visitIdentifier(this, node, scope, state);
  }
};

/**
 * [Please add a description.]
 */

var wrap = function wrap(state, method, id, scope) {
  if (state.selfReference) {
    if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
      // we can just munge the local binding
      scope.rename(id.name);
    } else {
      // need to add a wrapper since we can't change the references
      var templateName = "property-method-assignment-wrapper";
      if (method.generator) templateName += "-generator";
      var template = util.template(templateName, {
        FUNCTION: method,
        FUNCTION_ID: id,
        FUNCTION_KEY: scope.generateUidIdentifier(id.name)
      });
      template.callee._skipModulesRemap = true;

      // shim in dummy params to retain function arity, if you try to read the
      // source then you'll get the original since it's proxied so it's all good
      var params = template.callee.body.body[0].params;
      for (var i = 0, len = _getFunctionArity2["default"](method); i < len; i++) {
        params.push(scope.generateUidIdentifier("x"));
      }

      return template;
    }
  }

  method.id = id;
  scope.getProgramParent().references[id.name] = true;
};

/**
 * [Please add a description.]
 */

var visit = function visit(node, name, scope) {
  var state = {
    selfAssignment: false,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
    references: [],
    name: name
  };

  // check to see if we have a local binding of the id we're setting inside of
  // the function, this is important as there are caveats associated

  var binding = scope.getOwnBinding(name);

  if (binding) {
    if (binding.kind === "param") {
      // safari will blow up in strict mode with code like:
      //
      //   var t = function t(t) {};
      //
      // with the error:
      //
      //   Cannot declare a parameter named 't' as it shadows the name of a
      //   strict mode function.
      //
      // this isn't to the spec and they've invented this behaviour which is
      // **extremely** annoying so we avoid setting the name if it has a param
      // with the same id
      state.selfReference = true;
    } else {
      // otherwise it's defined somewhere in scope like:
      //
      //   var t = function () {
      //     var t = 2;
      //   };
      //
      // so we can safely just set the id and move along as it shadows the
      // bound function id
    }
  } else if (state.outerDeclar || scope.hasGlobal(name)) {
      scope.traverse(node, visitor, state);
    }

  return state;
};

/**
 * [Please add a description.]
 */

function custom(node, id, scope) {
  var state = visit(node, id.name, scope);
  return wrap(state, node, id, scope);
}

/**
 * [Please add a description.]
 */

function property(node, file, scope) {
  var key = t.toComputedKey(node, node.key);
  if (!t.isLiteral(key)) return; // we can't set a function id with this

  var name = t.toBindingIdentifierName(key.value);
  var id = t.identifier(name);

  var method = node.value;
  var state = visit(method, name, scope);
  node.value = wrap(state, method, id, scope) || method;
}

/**
 * [Please add a description.]
 */

function bare(node, parent, scope) {
  // has an `id` so we don't need to infer one
  if (node.id) return;

  var id;
  if (t.isProperty(parent) && parent.kind === "init" && (!parent.computed || t.isLiteral(parent.key))) {
    // { foo() {} };
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    // var foo = function () {};
    id = parent.id;

    if (t.isIdentifier(id)) {
      var binding = scope.parent.getBinding(id.name);
      if (binding && binding.constant && scope.getBinding(id.name) === binding) {
        // always going to reference this method
        node.id = id;
        return;
      }
    }
  } else {
    return;
  }

  var name;
  if (t.isLiteral(id)) {
    name = id.value;
  } else if (t.isIdentifier(id)) {
    name = id.name;
  } else {
    return;
  }

  name = t.toBindingIdentifierName(name);
  id = t.identifier(name);

  var state = visit(node, name, scope);
  return wrap(state, node, id, scope);
}
}, function(modId) { var map = {"./get-function-arity":1676544235645,"../../util":1676544235570,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235645, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

exports["default"] = function (node) {
  var lastNonDefault = 0;
  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];
    if (!t.isAssignmentPattern(param) && !t.isRestElement(param)) {
      lastNonDefault = i + 1;
    }
  }
  return lastNonDefault;
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235646, function(require, module, exports) {


exports.__esModule = true;
var metadata = {
  stage: 1,
  dependencies: ["es6.classes"]
};
exports.metadata = metadata;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235647, function(require, module, exports) {


exports.__esModule = true;
var metadata = {
  stage: 2
};
exports.metadata = metadata;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235648, function(require, module, exports) {


exports.__esModule = true;
var metadata = {
  stage: 3
};
exports.metadata = metadata;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235649, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersMemoiseDecorators = require("../../helpers/memoise-decorators");

var _helpersMemoiseDecorators2 = _interopRequireDefault(_helpersMemoiseDecorators);

var _helpersDefineMap = require("../../helpers/define-map");

var defineMap = _interopRequireWildcard(_helpersDefineMap);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  dependencies: ["es6.classes"],
  optional: true,
  stage: 1
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ObjectExpression: function ObjectExpression(node, parent, scope, file) {
    var hasDecorators = false;
    for (var i = 0; i < node.properties.length; i++) {
      var prop = node.properties[i];
      if (prop.decorators) {
        hasDecorators = true;
        break;
      }
    }
    if (!hasDecorators) return;

    var mutatorMap = {};

    for (var i = 0; i < node.properties.length; i++) {
      var prop = node.properties[i];
      if (prop.decorators) _helpersMemoiseDecorators2["default"](prop.decorators, scope);

      if (prop.kind === "init" && !prop.method) {
        prop.kind = "";
        prop.value = t.functionExpression(null, [], t.blockStatement([t.returnStatement(prop.value)]));
      }

      defineMap.push(mutatorMap, prop, "initializer", file);
    }

    var obj = defineMap.toClassObject(mutatorMap);
    obj = defineMap.toComputedObjectFromClass(obj);
    return t.callExpression(file.addHelper("create-decorated-object"), [obj]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/memoise-decorators":1676544235650,"../../helpers/define-map":1676544235651,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235650, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

exports["default"] = function (decorators, scope) {
  for (var i = 0; i < decorators.length; i++) {
    var decorator = decorators[i];
    var expression = decorator.expression;
    if (!t.isMemberExpression(expression)) continue;

    var temp = scope.maybeGenerateMemoised(expression.object);
    var ref;

    var nodes = [];

    if (temp) {
      ref = temp;
      nodes.push(t.assignmentExpression("=", temp, expression.object));
    } else {
      ref = expression.object;
    }

    nodes.push(t.callExpression(t.memberExpression(t.memberExpression(ref, expression.property, expression.computed), t.identifier("bind")), [ref]));

    if (nodes.length === 1) {
      decorator.expression = nodes[0];
    } else {
      decorator.expression = t.sequenceExpression(nodes);
    }
  }

  return decorators;
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235651, function(require, module, exports) {


exports.__esModule = true;
exports.push = push;
exports.hasComputed = hasComputed;
exports.toComputedObjectFromClass = toComputedObjectFromClass;
exports.toClassObject = toClassObject;
exports.toDefineObject = toDefineObject;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashObjectHas = require("lodash/object/has");

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function push(mutatorMap, node, kind, file) {
  var alias = t.toKeyAlias(node);

  //

  var map = {};
  if (_lodashObjectHas2["default"](mutatorMap, alias)) map = mutatorMap[alias];
  mutatorMap[alias] = map;

  //

  map._inherits = map._inherits || [];
  map._inherits.push(node);

  map._key = node.key;

  if (node.computed) {
    map._computed = true;
  }

  if (node.decorators) {
    var decorators = map.decorators = map.decorators || t.arrayExpression([]);
    decorators.elements = decorators.elements.concat(node.decorators.map(function (dec) {
      return dec.expression;
    }).reverse());
  }

  if (map.value || map.initializer) {
    throw file.errorWithNode(node, "Key conflict with sibling node");
  }

  if (node.value) {
    if (node.kind === "init") kind = "value";
    if (node.kind === "get") kind = "get";
    if (node.kind === "set") kind = "set";

    t.inheritsComments(node.value, node);
    map[kind] = node.value;
  }

  return map;
}

/**
 * [Please add a description.]
 */

function hasComputed(mutatorMap) {
  for (var key in mutatorMap) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

/**
 * [Please add a description.]
 */

function toComputedObjectFromClass(obj) {
  var objExpr = t.arrayExpression([]);

  for (var i = 0; i < obj.properties.length; i++) {
    var prop = obj.properties[i];
    var val = prop.value;
    val.properties.unshift(t.property("init", t.identifier("key"), t.toComputedKey(prop)));
    objExpr.elements.push(val);
  }

  return objExpr;
}

/**
 * [Please add a description.]
 */

function toClassObject(mutatorMap) {
  var objExpr = t.objectExpression([]);

  _lodashCollectionEach2["default"](mutatorMap, function (map) {
    var mapNode = t.objectExpression([]);

    var propNode = t.property("init", map._key, mapNode, map._computed);

    _lodashCollectionEach2["default"](map, function (node, key) {
      if (key[0] === "_") return;

      var inheritNode = node;
      if (t.isMethodDefinition(node) || t.isClassProperty(node)) node = node.value;

      var prop = t.property("init", t.identifier(key), node);
      t.inheritsComments(prop, inheritNode);
      t.removeComments(inheritNode);

      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}

/**
 * [Please add a description.]
 */

function toDefineObject(mutatorMap) {
  _lodashCollectionEach2["default"](mutatorMap, function (map) {
    if (map.value) map.writable = t.literal(true);
    map.configurable = t.literal(true);
    map.enumerable = t.literal(true);
  });

  return toClassObject(mutatorMap);
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235652, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

// check if the input Literal `source` is an alternate casing of "react"
function check(source, file) {
  if (t.isLiteral(source)) {
    var name = source.value;
    var lower = name.toLowerCase();

    if (lower === "react" && name !== lower) {
      throw file.errorWithNode(source, messages.get("didYouMean", "react"));
    }
  }
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  CallExpression: function CallExpression(node, parent, scope, file) {
    if (this.get("callee").isIdentifier({ name: "require" }) && node.arguments.length === 1) {
      check(node.arguments[0], file);
    }
  },

  /**
   * [Please add a description.]
   */

  ModuleDeclaration: function ModuleDeclaration(node, parent, scope, file) {
    check(node.source, file);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../messages":1676544235569,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235653, function(require, module, exports) {
/**
 * Turn arrow functions into normal functions.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * arr.map(x => x * x);
 * ```
 *
 * **Out**
 *
 * ```javascript
 * arr.map(function (x) {
 *   return x * x;
 * });
 */



exports.__esModule = true;
var visitor = {

  /**
   * Look for arrow functions and mark them as "shadow functions".
   * @see /transformation/transformers/internal/shadow-functions.js
   */

  ArrowFunctionExpression: function ArrowFunctionExpression(node) {
    this.ensureBlock();
    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = node.shadow || true;
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235654, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function statementList(key, path) {
  var paths = path.get(key);

  for (var i = 0; i < paths.length; i++) {
    var _path = paths[i];

    var func = _path.node;
    if (!t.isFunctionDeclaration(func)) continue;

    var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);

    // hoist it up above everything else
    declar._blockHoist = 2;

    // todo: name this
    func.id = null;

    _path.replaceWith(declar);
  }
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  BlockStatement: function BlockStatement(node, parent) {
    if (t.isFunction(parent) && parent.body === node || t.isExportDeclaration(parent)) {
      return;
    }

    statementList("body", this);
  },

  /**
   * [Please add a description.]
   */

  SwitchCase: function SwitchCase() {
    statementList("consequent", this);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235655, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersReact = require("../../helpers/react");

var react = _interopRequireWildcard(_helpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

function hasRefOrSpread(attrs) {
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (t.isJSXSpreadAttribute(attr)) return true;
    if (isJSXAttributeOfName(attr, "ref")) return true;
  }
  return false;
}

/**
 * [Please add a description.]
 */

function isJSXAttributeOfName(attr, name) {
  return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
}

/**
 * [Please add a description.]
 */
var visitor = {

  /**
   * [Please add a description.]
   */

  JSXElement: function JSXElement(node, parent, scope, file) {
    // filter
    var open = node.openingElement;
    if (hasRefOrSpread(open.attributes)) return;

    // init
    var isComponent = true;
    var props = t.objectExpression([]);
    var obj = t.objectExpression([]);
    var key = t.literal(null);
    var type = open.name;

    if (t.isJSXIdentifier(type) && react.isCompatTag(type.name)) {
      type = t.literal(type.name);
      isComponent = false;
    }

    function pushElemProp(key, value) {
      pushProp(obj.properties, t.identifier(key), value);
    }

    function pushProp(objProps, key, value) {
      objProps.push(t.property("init", key, value));
    }

    if (node.children.length) {
      var children = react.buildChildren(node);
      children = children.length === 1 ? children[0] : t.arrayExpression(children);
      pushProp(props.properties, t.identifier("children"), children);
    }

    // props
    for (var i = 0; i < open.attributes.length; i++) {
      var attr = open.attributes[i];
      if (isJSXAttributeOfName(attr, "key")) {
        key = attr.value;
      } else {
        pushProp(props.properties, attr.name, attr.value || t.identifier("true"));
      }
    }

    if (isComponent) {
      props = t.callExpression(file.addHelper("default-props"), [t.memberExpression(type, t.identifier("defaultProps")), props]);
    }

    // metadata
    pushElemProp("$$typeof", file.addHelper("typeof-react-element"));
    pushElemProp("type", type);
    pushElemProp("key", key);
    pushElemProp("ref", t.literal(null));

    pushElemProp("props", props);
    pushElemProp("_owner", t.literal(null));

    return obj;
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/react":1676544235554,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235656, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersBuildComprehension = require("../../helpers/build-comprehension");

var _helpersBuildComprehension2 = _interopRequireDefault(_helpersBuildComprehension);

var _traversal = require("../../../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  stage: 0
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ComprehensionExpression: function ComprehensionExpression(node, parent, scope) {
    var callback = array;
    if (node.generator) callback = generator;
    return callback(node, parent, scope);
  }
};

exports.visitor = visitor;
/**
 * [Please add a description.]
 */

function generator(node) {
  var body = [];
  var container = t.functionExpression(null, [], t.blockStatement(body), true);
  container.shadow = true;

  body.push(_helpersBuildComprehension2["default"](node, function () {
    return t.expressionStatement(t.yieldExpression(node.body));
  }));

  return t.callExpression(container, []);
}

/**
 * [Please add a description.]
 */

function array(node, parent, scope) {
  var uid = scope.generateUidIdentifierBasedOnNode(parent);

  var container = util.template("array-comprehension-container", {
    KEY: uid
  });
  container.callee.shadow = true;

  var block = container.callee.body;
  var body = block.body;

  if (_traversal2["default"].hasType(node, scope, "YieldExpression", t.FUNCTION_TYPES)) {
    container.callee.generator = true;
    container = t.yieldExpression(container, true);
  }

  var returnStatement = body.pop();

  body.push(_helpersBuildComprehension2["default"](node, function () {
    return util.template("array-push", {
      STATEMENT: node.body,
      KEY: uid
    }, true);
  }));
  body.push(returnStatement);

  return container;
}
}, function(modId) { var map = {"../../helpers/build-comprehension":1676544235657,"../../../traversal":1676544235550,"../../../util":1676544235570,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235657, function(require, module, exports) {


exports.__esModule = true;
exports["default"] = build;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function build(node, buildBody) {
  var self = node.blocks.shift();
  if (!self) return;

  var child = build(node, buildBody);
  if (!child) {
    // last item
    child = buildBody();

    // add a filter as this is our final stop
    if (node.filter) {
      child = t.ifStatement(node.filter, t.blockStatement([child]));
    }
  }

  return t.forOfStatement(t.variableDeclaration("let", [t.variableDeclarator(self.left)]), self.right, t.blockStatement([child]));
}

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235658, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loose = require("./loose");

var _loose2 = _interopRequireDefault(_loose);

var _vanilla = require("./vanilla");

var _vanilla2 = _interopRequireDefault(_vanilla);

var _types = require("../../../../types");

var t = _interopRequireWildcard(_types);

var _helpersNameMethod = require("../../../helpers/name-method");

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ClassDeclaration: function ClassDeclaration(node) {
    return t.variableDeclaration("let", [t.variableDeclarator(node.id, t.toExpression(node))]);
  },

  /**
   * [Please add a description.]
   */

  ClassExpression: function ClassExpression(node, parent, scope, file) {
    var inferred = _helpersNameMethod.bare(node, parent, scope);
    if (inferred) return inferred;

    if (file.isLoose("es6.classes")) {
      return new _loose2["default"](this, file).run();
    } else {
      return new _vanilla2["default"](this, file).run();
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"./loose":1676544235659,"./vanilla":1676544235660,"../../../../types":1676544235555,"../../../helpers/name-method":1676544235644}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235659, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _vanilla = require("./vanilla");

var _vanilla2 = _interopRequireDefault(_vanilla);

var _types = require("../../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var LooseClassTransformer = (function (_VanillaTransformer) {
  _inherits(LooseClassTransformer, _VanillaTransformer);

  function LooseClassTransformer() {
    _classCallCheck(this, LooseClassTransformer);

    _VanillaTransformer.apply(this, arguments);
    this.isLoose = true;
  }

  /**
   * [Please add a description.]
   */

  LooseClassTransformer.prototype._processMethod = function _processMethod(node) {
    if (!node.decorators) {
      // use assignments instead of define properties for loose classes

      var classRef = this.classRef;
      if (!node["static"]) classRef = t.memberExpression(classRef, t.identifier("prototype"));
      var methodName = t.memberExpression(classRef, node.key, node.computed || t.isLiteral(node.key));

      var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
      t.inheritsComments(expr, node);
      this.body.push(expr);
      return true;
    }
  };

  return LooseClassTransformer;
})(_vanilla2["default"]);

exports["default"] = LooseClassTransformer;
module.exports = exports["default"];
}, function(modId) { var map = {"./vanilla":1676544235660,"../../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235660, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpersMemoiseDecorators = require("../../../helpers/memoise-decorators");

var _helpersMemoiseDecorators2 = _interopRequireDefault(_helpersMemoiseDecorators);

var _helpersReplaceSupers = require("../../../helpers/replace-supers");

var _helpersReplaceSupers2 = _interopRequireDefault(_helpersReplaceSupers);

var _helpersNameMethod = require("../../../helpers/name-method");

var nameMethod = _interopRequireWildcard(_helpersNameMethod);

var _helpersDefineMap = require("../../../helpers/define-map");

var defineMap = _interopRequireWildcard(_helpersDefineMap);

var _messages = require("../../../../messages");

var messages = _interopRequireWildcard(_messages);

var _util = require("../../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../../types");

var t = _interopRequireWildcard(_types);

var PROPERTY_COLLISION_METHOD_NAME = "__initializeProperties";

/**
 * [Please add a description.]
 */

var collectPropertyReferencesVisitor = {

  /**
   * [Please add a description.]
   */

  Identifier: {
    enter: function enter(node, parent, scope, state) {
      if (this.parentPath.isClassProperty({ key: node })) {
        return;
      }

      if (this.isReferenced() && scope.getBinding(node.name) === state.scope.getBinding(node.name)) {
        state.references[node.name] = true;
      }
    }
  }
};

/**
 * [Please add a description.]
 */

var verifyConstructorVisitor = {

  /**
   * [Please add a description.]
   */

  MethodDefinition: function MethodDefinition() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  Property: function Property(node) {
    if (node.method) this.skip();
  },

  /**
   * [Please add a description.]
   */

  CallExpression: {
    exit: function exit(node, parent, scope, state) {
      if (this.get("callee").isSuper()) {
        state.hasBareSuper = true;
        state.bareSuper = this;

        if (!state.isDerived) {
          throw this.errorWithNode("super call is only allowed in derived constructor");
        }
      }
    }
  },

  /**
   * [Please add a description.]
   */

  "FunctionDeclaration|FunctionExpression": function FunctionDeclarationFunctionExpression() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  ThisExpression: function ThisExpression(node, parent, scope, state) {
    if (state.isDerived && !state.hasBareSuper) {
      if (this.inShadow()) {
        // https://github.com/babel/babel/issues/1920
        var thisAlias = state.constructorPath.getData("this");

        if (!thisAlias) {
          thisAlias = state.constructorPath.setData("this", state.constructorPath.scope.generateUidIdentifier("this"));
        }

        return thisAlias;
      } else {
        throw this.errorWithNode("'this' is not allowed before super()");
      }
    }
  },

  /**
   * [Please add a description.]
   */

  Super: function Super(node, parent, scope, state) {
    if (state.isDerived && !state.hasBareSuper && !this.parentPath.isCallExpression({ callee: node })) {
      throw this.errorWithNode("'super.*' is not allowed before super()");
    }
  }
};

/**
 * [Please add a description.]
 */

var ClassTransformer = (function () {
  function ClassTransformer(path, file) {
    _classCallCheck(this, ClassTransformer);

    this.parent = path.parent;
    this.scope = path.scope;
    this.node = path.node;
    this.path = path;
    this.file = file;

    this.clearDescriptors();

    this.instancePropBody = [];
    this.instancePropRefs = {};
    this.staticPropBody = [];
    this.body = [];

    this.pushedConstructor = false;
    this.pushedInherits = false;
    this.hasDecorators = false;
    this.isLoose = false;

    // class id
    this.classId = this.node.id;

    // this is the name of the binding that will **always** reference the class we've constructed
    this.classRef = this.node.id || this.scope.generateUidIdentifier("class");

    // this is a direct reference to the class we're building, class decorators can shadow the classRef
    this.directRef = null;

    this.superName = this.node.superClass || t.identifier("Function");
    this.isDerived = !!this.node.superClass;
  }

  /**
   * [Please add a description.]
   * @returns {Array}
   */

  ClassTransformer.prototype.run = function run() {
    var superName = this.superName;
    var file = this.file;

    //

    var body = this.body;

    //

    var constructorBody = this.constructorBody = t.blockStatement([]);
    this.constructor = this.buildConstructor();

    //

    var closureParams = [];
    var closureArgs = [];

    //
    if (this.isDerived) {
      closureArgs.push(superName);

      superName = this.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(superName);

      this.superName = superName;
    }

    //
    var decorators = this.node.decorators;
    if (decorators) {
      // this is so super calls and the decorators have access to the raw function
      this.directRef = this.scope.generateUidIdentifier(this.classRef);
    } else {
      this.directRef = this.classRef;
    }

    //
    this.buildBody();

    // make sure this class isn't directly called
    constructorBody.body.unshift(t.expressionStatement(t.callExpression(file.addHelper("class-call-check"), [t.thisExpression(), this.directRef])));

    //
    this.pushDecorators();

    body = body.concat(this.staticPropBody);

    if (this.classId) {
      // named class with only a constructor
      if (body.length === 1) return t.toExpression(body[0]);
    }

    //
    body.push(t.returnStatement(this.classRef));

    var container = t.functionExpression(null, closureParams, t.blockStatement(body));
    container.shadow = true;
    return t.callExpression(container, closureArgs);
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.buildConstructor = function buildConstructor() {
    var func = t.functionDeclaration(this.classRef, [], this.constructorBody);
    t.inherits(func, this.node);
    return func;
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.pushToMap = function pushToMap(node, enumerable) {
    var kind = arguments.length <= 2 || arguments[2] === undefined ? "value" : arguments[2];

    var mutatorMap;
    if (node["static"]) {
      this.hasStaticDescriptors = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceDescriptors = true;
      mutatorMap = this.instanceMutatorMap;
    }

    var map = defineMap.push(mutatorMap, node, kind, this.file);

    if (enumerable) {
      map.enumerable = t.literal(true);
    }

    if (map.decorators) {
      this.hasDecorators = true;
    }
  };

  /**
   * [Please add a description.]
   * https://www.youtube.com/watch?v=fWNaR-rxAic
   */

  ClassTransformer.prototype.constructorMeMaybe = function constructorMeMaybe() {
    var hasConstructor = false;
    var paths = this.path.get("body.body");
    var _arr = paths;
    for (var _i = 0; _i < _arr.length; _i++) {
      var path = _arr[_i];
      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }
    if (hasConstructor) return;

    var constructor;
    if (this.isDerived) {
      constructor = util.template("class-derived-default-constructor");
    } else {
      constructor = t.functionExpression(null, [], t.blockStatement([]));
    }

    this.path.get("body").unshiftContainer("body", t.methodDefinition(t.identifier("constructor"), constructor, "constructor"));
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.buildBody = function buildBody() {
    this.constructorMeMaybe();
    this.pushBody();
    this.placePropertyInitializers();

    if (this.userConstructor) {
      var constructorBody = this.constructorBody;
      constructorBody.body = constructorBody.body.concat(this.userConstructor.body.body);
      t.inherits(this.constructor, this.userConstructor);
      t.inherits(constructorBody, this.userConstructor.body);
    }

    this.pushDescriptors();
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.pushBody = function pushBody() {
    var classBodyPaths = this.path.get("body.body");

    var _arr2 = classBodyPaths;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var path = _arr2[_i2];
      var node = path.node;

      if (node.decorators) {
        _helpersMemoiseDecorators2["default"](node.decorators, this.scope);
      }

      if (t.isMethodDefinition(node)) {
        var isConstructor = node.kind === "constructor";
        if (isConstructor) this.verifyConstructor(path);

        var replaceSupers = new _helpersReplaceSupers2["default"]({
          methodPath: path,
          methodNode: node,
          objectRef: this.directRef,
          superRef: this.superName,
          isStatic: node["static"],
          isLoose: this.isLoose,
          scope: this.scope,
          file: this.file
        }, true);

        replaceSupers.replace();

        if (isConstructor) {
          this.pushConstructor(node, path);
        } else {
          this.pushMethod(node, path);
        }
      } else if (t.isClassProperty(node)) {
        this.pushProperty(node, path);
      }
    }
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.clearDescriptors = function clearDescriptors() {
    this.hasInstanceDescriptors = false;
    this.hasStaticDescriptors = false;

    this.instanceMutatorMap = {};
    this.staticMutatorMap = {};
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.pushDescriptors = function pushDescriptors() {
    this.pushInherits();

    var body = this.body;

    var instanceProps;
    var staticProps;
    var classHelper = "create-class";
    if (this.hasDecorators) classHelper = "create-decorated-class";

    if (this.hasInstanceDescriptors) {
      instanceProps = defineMap.toClassObject(this.instanceMutatorMap);
    }

    if (this.hasStaticDescriptors) {
      staticProps = defineMap.toClassObject(this.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      if (instanceProps) instanceProps = defineMap.toComputedObjectFromClass(instanceProps);
      if (staticProps) staticProps = defineMap.toComputedObjectFromClass(staticProps);

      var nullNode = t.literal(null);

      // (Constructor, instanceDescriptors, staticDescriptors, instanceInitializers, staticInitializers)
      var args = [this.classRef, nullNode, nullNode, nullNode, nullNode];

      if (instanceProps) args[1] = instanceProps;
      if (staticProps) args[2] = staticProps;

      if (this.instanceInitializersId) {
        args[3] = this.instanceInitializersId;
        body.unshift(this.buildObjectAssignment(this.instanceInitializersId));
      }

      if (this.staticInitializersId) {
        args[4] = this.staticInitializersId;
        body.unshift(this.buildObjectAssignment(this.staticInitializersId));
      }

      var lastNonNullIndex = 0;
      for (var i = 0; i < args.length; i++) {
        if (args[i] !== nullNode) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);

      body.push(t.expressionStatement(t.callExpression(this.file.addHelper(classHelper), args)));
    }

    this.clearDescriptors();
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.buildObjectAssignment = function buildObjectAssignment(id) {
    return t.variableDeclaration("var", [t.variableDeclarator(id, t.objectExpression([]))]);
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.placePropertyInitializers = function placePropertyInitializers() {
    var body = this.instancePropBody;
    if (!body.length) return;

    if (this.hasPropertyCollision()) {
      var call = t.expressionStatement(t.callExpression(t.memberExpression(t.thisExpression(), t.identifier(PROPERTY_COLLISION_METHOD_NAME)), []));

      this.pushMethod(t.methodDefinition(t.identifier(PROPERTY_COLLISION_METHOD_NAME), t.functionExpression(null, [], t.blockStatement(body))), null, true);

      if (this.isDerived) {
        this.bareSuper.insertAfter(call);
      } else {
        this.constructorBody.body.unshift(call);
      }
    } else {
      if (this.isDerived) {
        this.bareSuper.insertAfter(body);
      } else {
        this.constructorBody.body = body.concat(this.constructorBody.body);
      }
    }
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.hasPropertyCollision = function hasPropertyCollision() {
    if (this.userConstructorPath) {
      for (var name in this.instancePropRefs) {
        if (this.userConstructorPath.scope.hasOwnBinding(name)) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.verifyConstructor = function verifyConstructor(path) {
    var state = {
      constructorPath: path.get("value"),
      hasBareSuper: false,
      bareSuper: null,
      isDerived: this.isDerived,
      file: this.file
    };

    state.constructorPath.traverse(verifyConstructorVisitor, state);

    var thisAlias = state.constructorPath.getData("this");
    if (thisAlias && state.bareSuper) {
      state.bareSuper.insertAfter(t.variableDeclaration("var", [t.variableDeclarator(thisAlias, t.thisExpression())]));
    }

    this.bareSuper = state.bareSuper;

    if (!state.hasBareSuper && this.isDerived) {
      throw path.errorWithNode("Derived constructor must call super()");
    }
  };

  /**
   * Push a method to its respective mutatorMap.
   */

  ClassTransformer.prototype.pushMethod = function pushMethod(node, path, allowedIllegal) {
    if (!allowedIllegal && t.isLiteral(t.toComputedKey(node), { value: PROPERTY_COLLISION_METHOD_NAME })) {
      throw this.file.errorWithNode(node, messages.get("illegalMethodName", PROPERTY_COLLISION_METHOD_NAME));
    }

    if (node.kind === "method") {
      nameMethod.property(node, this.file, path ? path.get("value").scope : this.scope);
      if (this._processMethod(node)) return;
    }

    this.pushToMap(node);
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype._processMethod = function _processMethod() {
    return false;
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype.pushProperty = function pushProperty(node, path) {
    path.traverse(collectPropertyReferencesVisitor, {
      references: this.instancePropRefs,
      scope: this.scope
    });

    if (node.decorators) {
      var body = [];
      if (node.value) {
        body.push(t.returnStatement(node.value));
        node.value = t.functionExpression(null, [], t.blockStatement(body));
      } else {
        node.value = t.literal(null);
      }
      this.pushToMap(node, true, "initializer");

      var initializers;
      var target;
      if (node["static"]) {
        initializers = this.staticInitializersId = this.staticInitializersId || this.scope.generateUidIdentifier("staticInitializers");
        body = this.staticPropBody;
        target = this.classRef;
      } else {
        initializers = this.instanceInitializersId = this.instanceInitializersId || this.scope.generateUidIdentifier("instanceInitializers");
        body = this.instancePropBody;
        target = t.thisExpression();
      }

      body.push(t.expressionStatement(t.callExpression(this.file.addHelper("define-decorated-property-descriptor"), [target, t.literal(node.key.name), initializers])));
    } else {
      if (!node.value && !node.decorators) return;

      if (node["static"]) {
        // can just be added to the static map
        this.pushToMap(node, true);
      } else if (node.value) {
        // add this to the instancePropBody which will be added after the super call in a derived constructor
        // or at the start of a constructor for a non-derived constructor
        this.instancePropBody.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.thisExpression(), node.key), node.value)));
      }
    }
  };

  /**
   * Replace the constructor body of our class.
   */

  ClassTransformer.prototype.pushConstructor = function pushConstructor(method, path) {
    // https://github.com/babel/babel/issues/1077
    var fnPath = path.get("value");
    if (fnPath.scope.hasOwnBinding(this.classRef.name)) {
      fnPath.scope.rename(this.classRef.name);
    }

    var construct = this.constructor;
    var fn = method.value;

    this.userConstructorPath = fnPath;
    this.userConstructor = fn;
    this.hasConstructor = true;

    t.inheritsComments(construct, method);

    construct._ignoreUserWhitespace = true;
    construct.params = fn.params;

    t.inherits(construct.body, fn.body);

    // push constructor to body
    this._pushConstructor();
  };

  /**
   * [Please add a description.]
   */

  ClassTransformer.prototype._pushConstructor = function _pushConstructor() {
    if (this.pushedConstructor) return;
    this.pushedConstructor = true;

    // we haven't pushed any descriptors yet
    if (this.hasInstanceDescriptors || this.hasStaticDescriptors) {
      this.pushDescriptors();
    }

    this.body.push(this.constructor);

    this.pushInherits();
  };

  /**
   * Push inherits helper to body.
   */

  ClassTransformer.prototype.pushInherits = function pushInherits() {
    if (!this.isDerived || this.pushedInherits) return;

    // Unshift to ensure that the constructor inheritance is set up before
    // any properties can be assigned to the prototype.
    this.pushedInherits = true;
    this.body.unshift(t.expressionStatement(t.callExpression(this.file.addHelper("inherits"), [this.classRef, this.superName])));
  };

  /**
   * Push decorators to body.
   */

  ClassTransformer.prototype.pushDecorators = function pushDecorators() {
    var decorators = this.node.decorators;
    if (!decorators) return;

    this.body.push(t.variableDeclaration("var", [t.variableDeclarator(this.directRef, this.classRef)]));

    // reverse the decorators so we execute them in the right order
    decorators = decorators.reverse();

    var _arr3 = decorators;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var decorator = _arr3[_i3];
      var decoratorNode = util.template("class-decorator", {
        DECORATOR: decorator.expression,
        CLASS_REF: this.classRef
      }, true);
      decoratorNode.expression._ignoreModulesRemap = true;
      this.body.push(decoratorNode);
    }
  };

  return ClassTransformer;
})();

exports["default"] = ClassTransformer;
module.exports = exports["default"];
}, function(modId) { var map = {"../../../helpers/memoise-decorators":1676544235650,"../../../helpers/replace-supers":1676544235661,"../../../helpers/name-method":1676544235644,"../../../helpers/define-map":1676544235651,"../../../../messages":1676544235569,"../../../../util":1676544235570,"../../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235661, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function isIllegalBareSuper(node, parent) {
  if (!t.isSuper(node)) return false;
  if (t.isMemberExpression(parent, { computed: false })) return false;
  if (t.isCallExpression(parent, { callee: node })) return false;
  return true;
}

/**
 * [Please add a description.]
 */

function isMemberExpressionSuper(node) {
  return t.isMemberExpression(node) && t.isSuper(node.object);
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent, scope, state) {
    var topLevel = state.topLevel;
    var self = state.self;

    if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
      // we need to call traverseLevel again so we're context aware
      self.traverseLevel(this, false);
      return this.skip();
    }

    if (t.isProperty(node, { method: true }) || t.isMethodDefinition(node)) {
      // break on object methods
      return this.skip();
    }

    var getThisReference = topLevel ?
    // top level so `this` is the instance
    t.thisExpression :
    // not in the top level so we need to create a reference
    self.getThisReference.bind(self);

    var callback = self.specHandle;
    if (self.isLoose) callback = self.looseHandle;
    var result = callback.call(self, this, getThisReference);
    if (result) this.hasSuper = true;
    if (result === true) return;
    return result;
  }
};

/**
 * [Please add a description.]
 */

var ReplaceSupers = (function () {
  function ReplaceSupers(opts) {
    var inClass = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, ReplaceSupers);

    this.topLevelThisReference = opts.topLevelThisReference;
    this.methodPath = opts.methodPath;
    this.methodNode = opts.methodNode;
    this.superRef = opts.superRef;
    this.isStatic = opts.isStatic;
    this.hasSuper = false;
    this.inClass = inClass;
    this.isLoose = opts.isLoose;
    this.scope = opts.scope;
    this.file = opts.file;
    this.opts = opts;
  }

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.getObjectRef = function getObjectRef() {
    return this.opts.objectRef || this.opts.getObjectRef();
  };

  /**
   * Sets a super class value of the named property.
   *
   * @example
   *
   *   _set(Object.getPrototypeOf(CLASS.prototype), "METHOD", "VALUE", this)
   *
   */

  ReplaceSupers.prototype.setSuperProperty = function setSuperProperty(property, value, isComputed, thisExpression) {
    return t.callExpression(this.file.addHelper("set"), [t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))]), isComputed ? property : t.literal(property.name), value, thisExpression]);
  };

  /**
   * Gets a node representing the super class value of the named property.
   *
   * @example
   *
   *   _get(Object.getPrototypeOf(CLASS.prototype), "METHOD", this)
   *
   */

  ReplaceSupers.prototype.getSuperProperty = function getSuperProperty(property, isComputed, thisExpression) {
    return t.callExpression(this.file.addHelper("get"), [t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))]), isComputed ? property : t.literal(property.name), thisExpression]);
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.replace = function replace() {
    this.traverseLevel(this.methodPath.get("value"), true);
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.traverseLevel = function traverseLevel(path, topLevel) {
    var state = { self: this, topLevel: topLevel };
    path.traverse(visitor, state);
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.getThisReference = function getThisReference() {
    if (this.topLevelThisReference) {
      return this.topLevelThisReference;
    } else {
      var ref = this.topLevelThisReference = this.scope.generateUidIdentifier("this");
      this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(this.topLevelThisReference, t.thisExpression())]));
      return ref;
    }
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.getLooseSuperProperty = function getLooseSuperProperty(id, parent) {
    var methodNode = this.methodNode;
    var methodName = methodNode.key;
    var superRef = this.superRef || t.identifier("Function");

    if (parent.property === id) {
      return;
    } else if (t.isCallExpression(parent, { callee: id })) {
      // super(); -> objectRef.prototype.MethodName.call(this);
      parent.arguments.unshift(t.thisExpression());

      if (methodName.name === "constructor") {
        // constructor() { super(); }
        if (parent.arguments.length === 2 && t.isSpreadElement(parent.arguments[1]) && t.isIdentifier(parent.arguments[1].argument, { name: "arguments" })) {
          // special case single arguments spread
          parent.arguments[1] = parent.arguments[1].argument;
          return t.memberExpression(superRef, t.identifier("apply"));
        } else {
          return t.memberExpression(superRef, t.identifier("call"));
        }
      } else {
        id = superRef;

        // foo() { super(); }
        if (!methodNode["static"]) {
          id = t.memberExpression(id, t.identifier("prototype"));
        }

        id = t.memberExpression(id, methodName, methodNode.computed);
        return t.memberExpression(id, t.identifier("call"));
      }
    } else if (t.isMemberExpression(parent) && !methodNode["static"]) {
      // super.test -> objectRef.prototype.test
      return t.memberExpression(superRef, t.identifier("prototype"));
    } else {
      return superRef;
    }
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.looseHandle = function looseHandle(path, getThisReference) {
    var node = path.node;
    if (path.isSuper()) {
      return this.getLooseSuperProperty(node, path.parent);
    } else if (path.isCallExpression()) {
      var callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!t.isSuper(callee.object)) return;

      // super.test(); -> objectRef.prototype.MethodName.call(this);
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(getThisReference());
      return true;
    }
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.specHandleAssignmentExpression = function specHandleAssignmentExpression(ref, path, node, getThisReference) {
    if (node.operator === "=") {
      // super.name = "val"; -> _set(Object.getPrototypeOf(objectRef.prototype), "name", this);
      return this.setSuperProperty(node.left.property, node.right, node.left.computed, getThisReference());
    } else {
      // super.age += 2; -> var _ref = super.age; super.age = _ref + 2;
      ref = ref || path.scope.generateUidIdentifier("ref");
      return [t.variableDeclaration("var", [t.variableDeclarator(ref, node.left)]), t.expressionStatement(t.assignmentExpression("=", node.left, t.binaryExpression(node.operator[0], ref, node.right)))];
    }
  };

  /**
   * [Please add a description.]
   */

  ReplaceSupers.prototype.specHandle = function specHandle(path, getThisReference) {
    var methodNode = this.methodNode;
    var property;
    var computed;
    var args;
    var thisReference;

    var parent = path.parent;
    var node = path.node;

    if (isIllegalBareSuper(node, parent)) {
      throw path.errorWithNode(messages.get("classesIllegalBareSuper"));
    }

    if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (t.isSuper(callee)) {
        // super(); -> _get(Object.getPrototypeOf(objectRef), "MethodName", this).call(this);
        property = methodNode.key;
        computed = methodNode.computed;
        args = node.arguments;

        // bare `super` call is illegal inside non-constructors
        //  - https://esdiscuss.org/topic/super-call-in-methods
        //  - https://twitter.com/wycats/status/544553184396836864
        if (methodNode.key.name !== "constructor" || !this.inClass) {
          var methodName = methodNode.key.name || "METHOD_NAME";
          throw this.file.errorWithNode(node, messages.get("classesIllegalSuperCall", methodName));
        }
      } else if (isMemberExpressionSuper(callee)) {
        // super.test(); -> _get(Object.getPrototypeOf(objectRef.prototype), "test", this).call(this);
        property = callee.property;
        computed = callee.computed;
        args = node.arguments;
      }
    } else if (t.isMemberExpression(node) && t.isSuper(node.object)) {
      // super.name; -> _get(Object.getPrototypeOf(objectRef.prototype), "name", this);
      property = node.property;
      computed = node.computed;
    } else if (t.isUpdateExpression(node) && isMemberExpressionSuper(node.argument)) {
      var binary = t.binaryExpression(node.operator[0], node.argument, t.literal(1));
      if (node.prefix) {
        // ++super.foo; -> super.foo += 1;
        return this.specHandleAssignmentExpression(null, path, binary, getThisReference);
      } else {
        // super.foo++; -> var _ref = super.foo; super.foo = _ref + 1;
        var ref = path.scope.generateUidIdentifier("ref");
        return this.specHandleAssignmentExpression(ref, path, binary, getThisReference).concat(t.expressionStatement(ref));
      }
    } else if (t.isAssignmentExpression(node) && isMemberExpressionSuper(node.left)) {
      return this.specHandleAssignmentExpression(null, path, node, getThisReference);
    }

    if (!property) return;

    thisReference = getThisReference();
    var superProperty = this.getSuperProperty(property, computed, thisReference);
    if (args) {
      if (args.length === 1 && t.isSpreadElement(args[0])) {
        // super(...arguments);
        return t.callExpression(t.memberExpression(superProperty, t.identifier("apply")), [thisReference, args[0].argument]);
      } else {
        return t.callExpression(t.memberExpression(superProperty, t.identifier("call")), [thisReference].concat(args));
      }
    } else {
      return superProperty;
    }
  };

  return ReplaceSupers;
})();

exports["default"] = ReplaceSupers;
module.exports = exports["default"];
}, function(modId) { var map = {"../../messages":1676544235569,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235662, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersRemapAsyncToGenerator = require("../../helpers/remap-async-to-generator");

var _helpersRemapAsyncToGenerator2 = _interopRequireDefault(_helpersRemapAsyncToGenerator);

var _bluebirdCoroutines = require("./bluebird-coroutines");

exports.manipulateOptions = _bluebirdCoroutines.manipulateOptions;
var metadata = {
  optional: true,
  dependencies: ["es7.asyncFunctions", "es6.classes"]
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, file) {
    if (!node.async || node.generator) return;

    return _helpersRemapAsyncToGenerator2["default"](this, file.addHelper("async-to-generator"));
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/remap-async-to-generator":1676544235663,"./bluebird-coroutines":1676544235664}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235663, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var awaitVisitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  AwaitExpression: function AwaitExpression(node) {
    node.type = "YieldExpression";

    if (node.all) {
      // await* foo; -> yield Promise.all(foo);
      node.all = false;
      node.argument = t.callExpression(t.memberExpression(t.identifier("Promise"), t.identifier("all")), [node.argument]);
    }
  }
};

/**
 * [Please add a description.]
 */

var referenceVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    var name = state.id.name;
    if (node.name === name && scope.bindingIdentifierEquals(name, state.id)) {
      return state.ref = state.ref || scope.generateUidIdentifier(name);
    }
  }
};

/**
 * [Please add a description.]
 */

exports["default"] = function (path, callId) {
  var node = path.node;

  node.async = false;
  node.generator = true;

  path.traverse(awaitVisitor, state);

  var call = t.callExpression(callId, [node]);

  var id = node.id;
  node.id = null;

  if (t.isFunctionDeclaration(node)) {
    var declar = t.variableDeclaration("let", [t.variableDeclarator(id, call)]);
    declar._blockHoist = true;
    return declar;
  } else {
    if (id) {
      var state = { id: id };
      path.traverse(referenceVisitor, state);

      if (state.ref) {
        path.scope.parent.push({ id: state.ref });
        return t.assignmentExpression("=", state.ref, call);
      }
    }

    return call;
  }
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235664, function(require, module, exports) {


exports.__esModule = true;
exports.manipulateOptions = manipulateOptions;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersRemapAsyncToGenerator = require("../../helpers/remap-async-to-generator");

var _helpersRemapAsyncToGenerator2 = _interopRequireDefault(_helpersRemapAsyncToGenerator);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function manipulateOptions(opts) {
  opts.blacklist.push("regenerator");
}

var metadata = {
  optional: true,
  dependencies: ["es7.asyncFunctions", "es6.classes"]
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, file) {
    if (!node.async || node.generator) return;

    return _helpersRemapAsyncToGenerator2["default"](this, t.memberExpression(file.addImport("bluebird", null, "absolute"), t.identifier("coroutine")));
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/remap-async-to-generator":1676544235663,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235665, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersReplaceSupers = require("../../helpers/replace-supers");

var _helpersReplaceSupers2 = _interopRequireDefault(_helpersReplaceSupers);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function Property(path, node, scope, getObjectRef, file) {
  if (!node.method && node.kind === "init") return;
  if (!t.isFunction(node.value)) return;

  var replaceSupers = new _helpersReplaceSupers2["default"]({
    getObjectRef: getObjectRef,
    methodNode: node,
    methodPath: path,
    isStatic: true,
    scope: scope,
    file: file
  });

  replaceSupers.replace();
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ObjectExpression: function ObjectExpression(node, parent, scope, file) {
    var objectRef;
    var getObjectRef = function getObjectRef() {
      return objectRef = objectRef || scope.generateUidIdentifier("obj");
    };

    var propPaths = this.get("properties");
    for (var i = 0; i < node.properties.length; i++) {
      Property(propPaths[i], node.properties[i], scope, getObjectRef, file);
    }

    if (objectRef) {
      scope.push({ id: objectRef });
      return t.assignmentExpression("=", objectRef, node);
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/replace-supers":1676544235661,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235666, function(require, module, exports) {
// https://github.com/sebmarkbage/ecmascript-rest-spread



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  stage: 2,
  dependencies: ["es6.destructuring"]
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var hasSpread = function hasSpread(node) {
  for (var i = 0; i < node.properties.length; i++) {
    if (t.isSpreadProperty(node.properties[i])) {
      return true;
    }
  }
  return false;
};

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ObjectExpression: function ObjectExpression(node, parent, scope, file) {
    if (!hasSpread(node)) return;

    var args = [];
    var props = [];

    var push = function push() {
      if (!props.length) return;
      args.push(t.objectExpression(props));
      props = [];
    };

    for (var i = 0; i < node.properties.length; i++) {
      var prop = node.properties[i];
      if (t.isSpreadProperty(prop)) {
        push();
        args.push(prop.argument);
      } else {
        props.push(prop);
      }
    }

    push();

    if (!t.isObjectExpression(args[0])) {
      args.unshift(t.objectExpression([]));
    }

    return t.callExpression(file.addHelper("extends"), args);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235667, function(require, module, exports) {
// https://github.com/rwaldron/exponentiation-operator



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersBuildBinaryAssignmentOperatorTransformer = require("../../helpers/build-binary-assignment-operator-transformer");

var _helpersBuildBinaryAssignmentOperatorTransformer2 = _interopRequireDefault(_helpersBuildBinaryAssignmentOperatorTransformer);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  stage: 3
};

exports.metadata = metadata;
var MATH_POW = t.memberExpression(t.identifier("Math"), t.identifier("pow"));

/**
 * [Please add a description.]
 */

var visitor = _helpersBuildBinaryAssignmentOperatorTransformer2["default"]({
  operator: "**",

  /**
   * [Please add a description.]
   */

  build: function build(left, right) {
    return t.callExpression(MATH_POW, [left, right]);
  }
});
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/build-binary-assignment-operator-transformer":1676544235668,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235668, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _explodeAssignableExpression = require("./explode-assignable-expression");

var _explodeAssignableExpression2 = _interopRequireDefault(_explodeAssignableExpression);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

exports["default"] = function (opts) {
  var exports = {};

  /**
   * [Please add a description.]
   */

  var isAssignment = function isAssignment(node) {
    return node.operator === opts.operator + "=";
  };

  /**
   * [Please add a description.]
   */

  var buildAssignment = function buildAssignment(left, right) {
    return t.assignmentExpression("=", left, right);
  };

  /**
   * [Please add a description.]
   */

  exports.ExpressionStatement = function (node, parent, scope, file) {
    // hit the `AssignmentExpression` one below
    if (this.isCompletionRecord()) return;

    var expr = node.expression;
    if (!isAssignment(expr)) return;

    var nodes = [];
    var exploded = _explodeAssignableExpression2["default"](expr.left, nodes, file, scope, true);

    nodes.push(t.expressionStatement(buildAssignment(exploded.ref, opts.build(exploded.uid, expr.right))));

    return nodes;
  };

  /**
   * [Please add a description.]
   */

  exports.AssignmentExpression = function (node, parent, scope, file) {
    if (!isAssignment(node)) return;

    var nodes = [];
    var exploded = _explodeAssignableExpression2["default"](node.left, nodes, file, scope);
    nodes.push(buildAssignment(exploded.ref, opts.build(exploded.uid, node.right)));
    return nodes;
  };

  /**
   * [Please add a description.]
   */

  exports.BinaryExpression = function (node) {
    if (node.operator !== opts.operator) return;
    return opts.build(node.left, node.right);
  };

  return exports;
};

module.exports = exports["default"];
}, function(modId) { var map = {"./explode-assignable-expression":1676544235669,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235669, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var getObjRef = function getObjRef(node, nodes, file, scope) {
  var ref;
  if (t.isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      // this variable is declared in scope so we can be 100% sure
      // that evaluating it multiple times wont trigger a getter
      // or something else
      return node;
    } else {
      // could possibly trigger a getter so we need to only evaluate
      // it once
      ref = node;
    }
  } else if (t.isMemberExpression(node)) {
    ref = node.object;

    if (t.isIdentifier(ref) && scope.hasGlobal(ref.name)) {
      // the object reference that we need to save is locally declared
      // so as per the previous comment we can be 100% sure evaluating
      // it multiple times will be safe
      return ref;
    }
  } else {
    throw new Error("We can't explode this node type " + node.type);
  }

  var temp = scope.generateUidIdentifierBasedOnNode(ref);
  nodes.push(t.variableDeclaration("var", [t.variableDeclarator(temp, ref)]));
  return temp;
};

/**
 * [Please add a description.]
 */

var getPropRef = function getPropRef(node, nodes, file, scope) {
  var prop = node.property;
  var key = t.toComputedKey(node, prop);
  if (t.isLiteral(key)) return key;

  var temp = scope.generateUidIdentifierBasedOnNode(prop);
  nodes.push(t.variableDeclaration("var", [t.variableDeclarator(temp, prop)]));
  return temp;
};

/**
 * [Please add a description.]
 */

exports["default"] = function (node, nodes, file, scope, allowedSingleIdent) {
  var obj;
  if (t.isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, file, scope);
  }

  var ref, uid;

  if (t.isIdentifier(node)) {
    ref = node;
    uid = obj;
  } else {
    var prop = getPropRef(node, nodes, file, scope);
    var computed = node.computed || t.isLiteral(prop);
    uid = ref = t.memberExpression(obj, prop, computed);
  }

  return {
    uid: uid,
    ref: ref
  };
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235670, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersDefineMap = require("../../helpers/define-map");

var defineMap = _interopRequireWildcard(_helpersDefineMap);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * Turn [object initializer mutators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Method_definitions)
 * into `Object.defineProperties`.
 *
 * **In**
 *
 * ```javascript
 * var foo = {
 *   get bar() {
 *     return "bar";
 *   }
 * };
 * ```
 *
 * **Out**
 *
 * ```javascript
 * var foo = Object.defineProperties({}, {
 *   bar: {
 *     get: function () {
 *       return "bar";
 *     },
 *     enumerable: true,
 *     configurable: true
 *   }
 * });
 * ```
 */

var visitor = {

  /**
   * Look for getters and setters on an object.
   * Filter them out and wrap the object with an `Object.defineProperties` that
   * defines the getters and setters.
   */

  ObjectExpression: function ObjectExpression(node, parent, scope, file) {
    var hasAny = false;
    var _arr = node.properties;
    for (var _i = 0; _i < _arr.length; _i++) {
      var prop = _arr[_i];
      if (prop.kind === "get" || prop.kind === "set") {
        hasAny = true;
        break;
      }
    }
    if (!hasAny) return;

    var mutatorMap = {};

    node.properties = node.properties.filter(function (prop) {
      if (prop.kind === "get" || prop.kind === "set") {
        defineMap.push(mutatorMap, prop, prop.kind, file);
        return false;
      } else {
        return true;
      }
    });

    return t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")), [node, defineMap.toDefineObject(mutatorMap)]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/define-map":1676544235651,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235671, function(require, module, exports) {
/**
 * [Please add a description.]
 */



exports.__esModule = true;
var visitor = {

  /**
   * [Please add a description.]
   */

  Property: function Property(node) {
    if (node.method) {
      node.method = false;
    }

    if (node.shorthand) {
      node.shorthand = false;
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235672, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function loose(node, body, objId) {
  var _arr = node.properties;

  for (var _i = 0; _i < _arr.length; _i++) {
    var prop = _arr[_i];
    body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)), prop.value)));
  }
}

/**
 * [Please add a description.]
 */

function spec(node, body, objId, initProps, file) {
  // add a simple assignment for all Symbol member expressions due to symbol polyfill limitations
  // otherwise use Object.defineProperty

  var _arr2 = node.properties;
  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var prop = _arr2[_i2];
    // this wont work with Object.defineProperty
    if (t.isLiteral(t.toComputedKey(prop), { value: "__proto__" })) {
      initProps.push(prop);
      continue;
    }

    var key = prop.key;
    if (t.isIdentifier(key) && !prop.computed) {
      key = t.literal(key.name);
    }

    var bodyNode = t.callExpression(file.addHelper("define-property"), [objId, key, prop.value]);

    body.push(t.expressionStatement(bodyNode));
  }

  // only one node and it's a Object.defineProperty that returns the object

  if (body.length === 1) {
    var first = body[0].expression;

    if (t.isCallExpression(first)) {
      first.arguments[0] = t.objectExpression(initProps);
      return first;
    }
  }
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ObjectExpression: {
    exit: function exit(node, parent, scope, file) {
      var hasComputed = false;

      var _arr3 = node.properties;
      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var prop = _arr3[_i3];
        hasComputed = t.isProperty(prop, { computed: true, kind: "init" });
        if (hasComputed) break;
      }

      if (!hasComputed) return;

      // put all getters/setters into the first object expression as well as all initialisers up
      // to the first computed property

      var initProps = [];
      var stopInits = false;

      node.properties = node.properties.filter(function (prop) {
        if (prop.computed) {
          stopInits = true;
        }

        if (prop.kind !== "init" || !stopInits) {
          initProps.push(prop);
          return false;
        } else {
          return true;
        }
      });

      //

      var objId = scope.generateUidIdentifierBasedOnNode(parent);

      //

      var body = [];

      //

      var callback = spec;
      if (file.isLoose("es6.properties.computed")) callback = loose;

      var result = callback(node, body, objId, initProps, file);
      if (result) return result;

      //

      body.unshift(t.variableDeclaration("var", [t.variableDeclarator(objId, t.objectExpression(initProps))]));

      body.push(t.expressionStatement(objId));

      return body;
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235673, function(require, module, exports) {


exports.__esModule = true;

var _es6ForOf = require("../es6/for-of");

var metadata = {
  optional: true
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ForOfStatement: function ForOfStatement(node, parent, scope, file) {
    if (this.get("right").isGenericType("Array")) {
      return _es6ForOf._ForOfStatementArray.call(this, node, scope, file);
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../es6/for-of":1676544235674}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235674, function(require, module, exports) {


exports.__esModule = true;
exports._ForOfStatementArray = _ForOfStatementArray;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ForOfStatement: function ForOfStatement(node, parent, scope, file) {
    if (this.get("right").isArrayExpression()) {
      return _ForOfStatementArray.call(this, node, scope, file);
    }

    var callback = spec;
    if (file.isLoose("es6.forOf")) callback = loose;

    var build = callback(node, parent, scope, file);
    var declar = build.declar;
    var loop = build.loop;
    var block = loop.body;

    // ensure that it's a block so we can take all its statements
    this.ensureBlock();

    // add the value declaration to the new loop body
    if (declar) {
      block.body.push(declar);
    }

    // push the rest of the original loop body onto our new body
    block.body = block.body.concat(node.body.body);

    t.inherits(loop, node);
    t.inherits(loop.body, node.body);

    if (build.replaceParent) {
      this.parentPath.replaceWithMultiple(build.node);
      this.dangerouslyRemove();
    } else {
      return build.node;
    }
  }
};

exports.visitor = visitor;
/**
 * [Please add a description.]
 */

function _ForOfStatementArray(node, scope) {
  var nodes = [];
  var right = node.right;

  if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
    var uid = scope.generateUidIdentifier("arr");
    nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, right)]));
    right = uid;
  }

  var iterationKey = scope.generateUidIdentifier("i");

  var loop = util.template("for-of-array", {
    BODY: node.body,
    KEY: iterationKey,
    ARR: right
  });

  t.inherits(loop, node);
  t.ensureBlock(loop);

  var iterationValue = t.memberExpression(right, iterationKey, true);

  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    left.declarations[0].init = iterationValue;
    loop.body.body.unshift(left);
  } else {
    loop.body.body.unshift(t.expressionStatement(t.assignmentExpression("=", left, iterationValue)));
  }

  if (this.parentPath.isLabeledStatement()) {
    loop = t.labeledStatement(this.parentPath.node.label, loop);
  }

  nodes.push(loop);

  return nodes;
}

/**
 * [Please add a description.]
 */

var loose = function loose(node, parent, scope, file) {
  var left = node.left;
  var declar, id;

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for (i of test), for ({ i } of test)
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    id = scope.generateUidIdentifier("ref");
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, id)]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  var iteratorKey = scope.generateUidIdentifier("iterator");
  var isArrayKey = scope.generateUidIdentifier("isArray");

  var loop = util.template("for-of-loose", {
    LOOP_OBJECT: iteratorKey,
    IS_ARRAY: isArrayKey,
    OBJECT: node.right,
    INDEX: scope.generateUidIdentifier("i"),
    ID: id
  });

  if (!declar) {
    // no declaration so we need to remove the variable declaration at the top of
    // the for-of-loose template
    loop.body.body.shift();
  }

  //

  return {
    declar: declar,
    node: loop,
    loop: loop
  };
};

/**
 * [Please add a description.]
 */

var spec = function spec(node, parent, scope, file) {
  var left = node.left;
  var declar;

  var stepKey = scope.generateUidIdentifier("step");
  var stepValue = t.memberExpression(stepKey, t.identifier("value"));

  if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
    // for (i of test), for ({ i } of test)
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, stepValue)]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  //

  var iteratorKey = scope.generateUidIdentifier("iterator");

  var template = util.template("for-of", {
    ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
    ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
    ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
    ITERATOR_KEY: iteratorKey,
    STEP_KEY: stepKey,
    OBJECT: node.right,
    BODY: null
  });

  var isLabeledParent = t.isLabeledStatement(parent);

  var tryBody = template[3].block.body;
  var loop = tryBody[0];

  if (isLabeledParent) {
    tryBody[0] = t.labeledStatement(parent.label, loop);
  }

  //

  return {
    replaceParent: isLabeledParent,
    declar: declar,
    loop: loop,
    node: template
  };
};
}, function(modId) { var map = {"../../../messages":1676544235569,"../../../util":1676544235570,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235675, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersRegex = require("../../helpers/regex");

var regex = _interopRequireWildcard(_helpersRegex);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Literal: function Literal(node) {
    if (!regex.is(node, "y")) return;
    return t.newExpression(t.identifier("RegExp"), [t.literal(node.regex.pattern), t.literal(node.regex.flags)]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/regex":1676544235676,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235676, function(require, module, exports) {


exports.__esModule = true;
exports.is = is;
exports.pullFlag = pullFlag;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashArrayPull = require("lodash/array/pull");

var _lodashArrayPull2 = _interopRequireDefault(_lodashArrayPull);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function is(node, flag) {
  return t.isLiteral(node) && node.regex && node.regex.flags.indexOf(flag) >= 0;
}

/**
 * [Please add a description.]
 */

function pullFlag(node, flag) {
  var flags = node.regex.flags.split("");
  if (node.regex.flags.indexOf(flag) < 0) return;
  _lodashArrayPull2["default"](flags, flag);
  node.regex.flags = flags.join("");
}
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235677, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _regexpuRewritePattern = require("regexpu/rewrite-pattern");

var _regexpuRewritePattern2 = _interopRequireDefault(_regexpuRewritePattern);

var _helpersRegex = require("../../helpers/regex");

var regex = _interopRequireWildcard(_helpersRegex);

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Literal: function Literal(node) {
    if (!regex.is(node, "u")) return;
    node.regex.pattern = _regexpuRewritePattern2["default"](node.regex.pattern, node.regex.flags);
    regex.pullFlag(node, "u");
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/regex":1676544235676}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235678, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

/**
 * Turn constants into variables.
 * Ensure there are no constant violations in any scope.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * const MULTIPLIER = 5;
 * ```
 *
 * **Out**
 *
 * ```javascript
 * var MULTIPLIER = 5;
 * ```
 */

var visitor = {

  /**
   * Look for any constants (or modules) in scope.
   * If they have any `constantViolations` throw an error.
   */

  Scope: function Scope(node, parent, scope) {
    for (var name in scope.bindings) {
      var binding = scope.bindings[name];

      // not a constant
      if (binding.kind !== "const" && binding.kind !== "module") continue;

      var _arr = binding.constantViolations;
      for (var _i = 0; _i < _arr.length; _i++) {
        var violation = _arr[_i];
        throw violation.errorWithNode(messages.get("readOnly", name));
      }
    }
  },

  /**
   * Look for constants.
   * Turn them into `let` variables.
   */

  VariableDeclaration: function VariableDeclaration(node) {
    if (node.kind === "const") node.kind = "let";
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../messages":1676544235569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235679, function(require, module, exports) {
// https://github.com/leebyron/ecmascript-more-export-from



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  stage: 1
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

function build(node, nodes, scope) {
  var first = node.specifiers[0];
  if (!t.isExportNamespaceSpecifier(first) && !t.isExportDefaultSpecifier(first)) return;

  var specifier = node.specifiers.shift();
  var uid = scope.generateUidIdentifier(specifier.exported.name);

  var newSpecifier;
  if (t.isExportNamespaceSpecifier(specifier)) {
    newSpecifier = t.importNamespaceSpecifier(uid);
  } else {
    newSpecifier = t.importDefaultSpecifier(uid);
  }

  nodes.push(t.importDeclaration([newSpecifier], node.source));
  nodes.push(t.exportNamedDeclaration(null, [t.exportSpecifier(uid, specifier.exported)]));

  build(node, nodes, scope);
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ExportNamedDeclaration: function ExportNamedDeclaration(node, parent, scope) {
    var nodes = [];
    build(node, nodes, scope);
    if (!nodes.length) return;

    if (node.specifiers.length >= 1) {
      nodes.push(node);
    }

    return nodes;
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235680, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true,
  stage: 0
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  DoExpression: function DoExpression(node) {
    var body = node.body.body;
    if (body.length) {
      return body;
    } else {
      return t.identifier("undefined");
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235681, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  UnaryExpression: function UnaryExpression(node, parent, scope, file) {
    if (node._ignoreSpecSymbols) return;

    if (this.parentPath.isBinaryExpression() && t.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
      // optimise `typeof foo === "string"` since we can determine that they'll never need to handle symbols
      var opposite = this.getOpposite();
      if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") return;
    }

    if (node.operator === "typeof") {
      var call = t.callExpression(file.addHelper("typeof"), [node.argument]);
      if (this.get("argument").isIdentifier()) {
        var undefLiteral = t.literal("undefined");
        var unary = t.unaryExpression("typeof", node.argument);
        unary._ignoreSpecSymbols = true;
        return t.conditionalExpression(t.binaryExpression("===", unary, undefLiteral), undefLiteral, call);
      } else {
        return call;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  BinaryExpression: function BinaryExpression(node, parent, scope, file) {
    if (node.operator === "instanceof") {
      return t.callExpression(file.addHelper("instanceof"), [node.left, node.right]);
    }
  },

  /**
   * [Please add a description.]
   */

  "VariableDeclaration|FunctionDeclaration": function VariableDeclarationFunctionDeclaration(node) {
    if (node._generated) this.skip();
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235682, function(require, module, exports) {
// https://github.com/zenparsing/es-function-bind



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true,
  stage: 0
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

function getTempId(scope) {
  var id = scope.path.getData("functionBind");
  if (id) return id;

  id = scope.generateDeclaredUidIdentifier("context");
  return scope.path.setData("functionBind", id);
}

/**
 * [Please add a description.]
 */

function getStaticContext(bind, scope) {
  var object = bind.object || bind.callee.object;
  return scope.isStatic(object) && object;
}

/**
 * [Please add a description.]
 */

function inferBindContext(bind, scope) {
  var staticContext = getStaticContext(bind, scope);
  if (staticContext) return staticContext;

  var tempId = getTempId(scope);
  if (bind.object) {
    bind.callee = t.sequenceExpression([t.assignmentExpression("=", tempId, bind.object), bind.callee]);
  } else {
    bind.callee.object = t.assignmentExpression("=", tempId, bind.callee.object);
  }
  return tempId;
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  CallExpression: function CallExpression(node, parent, scope) {
    var bind = node.callee;
    if (!t.isBindExpression(bind)) return;

    var context = inferBindContext(bind, scope);
    node.callee = t.memberExpression(bind.callee, t.identifier("call"));
    node.arguments.unshift(context);
  },

  /**
   * [Please add a description.]
   */

  BindExpression: function BindExpression(node, parent, scope) {
    var context = inferBindContext(node, scope);
    return t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [context]);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235683, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function getSpreadLiteral(spread, scope) {
  if (scope.hub.file.isLoose("es6.spread") && !t.isIdentifier(spread.argument, { name: "arguments" })) {
    return spread.argument;
  } else {
    return scope.toArray(spread.argument, true);
  }
}

/**
 * [Please add a description.]
 */

function hasSpread(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (t.isSpreadElement(nodes[i])) {
      return true;
    }
  }
  return false;
}

/**
 * [Please add a description.]
 */

function build(props, scope) {
  var nodes = [];

  var _props = [];

  var push = function push() {
    if (!_props.length) return;
    nodes.push(t.arrayExpression(_props));
    _props = [];
  };

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (t.isSpreadElement(prop)) {
      push();
      nodes.push(getSpreadLiteral(prop, scope));
    } else {
      _props.push(prop);
    }
  }

  push();

  return nodes;
}

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ArrayExpression: function ArrayExpression(node, parent, scope) {
    var elements = node.elements;
    if (!hasSpread(elements)) return;

    var nodes = build(elements, scope);
    var first = nodes.shift();

    if (!t.isArrayExpression(first)) {
      nodes.unshift(first);
      first = t.arrayExpression([]);
    }

    return t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes);
  },

  /**
   * [Please add a description.]
   */

  CallExpression: function CallExpression(node, parent, scope) {
    var args = node.arguments;
    if (!hasSpread(args)) return;

    var contextLiteral = t.identifier("undefined");

    node.arguments = [];

    var nodes;
    if (args.length === 1 && args[0].argument.name === "arguments") {
      nodes = [args[0].argument];
    } else {
      nodes = build(args, scope);
    }

    var first = nodes.shift();
    if (nodes.length) {
      node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
    } else {
      node.arguments.push(first);
    }

    var callee = node.callee;

    if (this.get("callee").isMemberExpression()) {
      var temp = scope.maybeGenerateMemoised(callee.object);
      if (temp) {
        callee.object = t.assignmentExpression("=", temp, callee.object);
        contextLiteral = temp;
      } else {
        contextLiteral = callee.object;
      }
      t.appendToMemberExpression(callee, t.identifier("apply"));
    } else {
      node.callee = t.memberExpression(node.callee, t.identifier("apply"));
    }

    node.arguments.unshift(contextLiteral);
  },

  /**
   * [Please add a description.]
   */

  NewExpression: function NewExpression(node, parent, scope, file) {
    var args = node.arguments;
    if (!hasSpread(args)) return;

    var nodes = build(args, scope);

    var context = t.arrayExpression([t.literal(null)]);

    args = t.callExpression(t.memberExpression(context, t.identifier("concat")), nodes);

    return t.newExpression(t.callExpression(t.memberExpression(file.addHelper("bind"), t.identifier("apply")), [node.callee, args]), []);
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235684, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _traversalVisitors = require("../../../../traversal/visitors");

var visitors = _interopRequireWildcard(_traversalVisitors);

var _default = require("./default");

var def = _interopRequireWildcard(_default);

var _rest = require("./rest");

var rest = _interopRequireWildcard(_rest);

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = visitors.merge([rest.visitor, def.visitor]);
exports.visitor = visitor;
}, function(modId) { var map = {"../../../../traversal/visitors":1676544235591,"./default":1676544235685,"./rest":1676544235687}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235685, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersCallDelegate = require("../../../helpers/call-delegate");

var _helpersCallDelegate2 = _interopRequireDefault(_helpersCallDelegate);

var _helpersGetFunctionArity = require("../../../helpers/get-function-arity");

var _helpersGetFunctionArity2 = _interopRequireDefault(_helpersGetFunctionArity);

var _util = require("../../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var hasDefaults = function hasDefaults(node) {
  for (var i = 0; i < node.params.length; i++) {
    if (!t.isIdentifier(node.params[i])) return true;
  }
  return false;
};

/**
 * [Please add a description.]
 */

var iifeVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (node.name !== "eval") {
      if (!state.scope.hasOwnBinding(node.name)) return;
      if (state.scope.bindingIdentifierEquals(node.name, node)) return;
    }

    state.iife = true;
    this.stop();
  }
};

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, file) {
    if (!hasDefaults(node)) return;

    // ensure it's a block, useful for arrow functions
    this.ensureBlock();

    var state = {
      iife: false,
      scope: scope
    };

    var body = [];

    //
    var argsIdentifier = t.identifier("arguments");
    argsIdentifier._shadowedFunctionLiteral = this;

    // push a default parameter definition
    function pushDefNode(left, right, i) {
      var defNode;
      if (exceedsLastNonDefault(i) || t.isPattern(left) || file.transformers["es6.spec.blockScoping"].canTransform()) {
        defNode = util.template("default-parameter", {
          VARIABLE_NAME: left,
          DEFAULT_VALUE: right,
          ARGUMENT_KEY: t.literal(i),
          ARGUMENTS: argsIdentifier
        }, true);
      } else {
        defNode = util.template("default-parameter-assign", {
          VARIABLE_NAME: left,
          DEFAULT_VALUE: right
        }, true);
      }
      defNode._blockHoist = node.params.length - i;
      body.push(defNode);
    }

    // check if an index exceeds the functions arity
    function exceedsLastNonDefault(i) {
      return i + 1 > lastNonDefaultParam;
    }

    //
    var lastNonDefaultParam = _helpersGetFunctionArity2["default"](node);

    //
    var params = this.get("params");
    for (var i = 0; i < params.length; i++) {
      var param = params[i];

      if (!param.isAssignmentPattern()) {
        if (!param.isIdentifier()) {
          param.traverse(iifeVisitor, state);
        }

        if (file.transformers["es6.spec.blockScoping"].canTransform() && param.isIdentifier()) {
          pushDefNode(param.node, t.identifier("undefined"), i);
        }

        continue;
      }

      var left = param.get("left");
      var right = param.get("right");

      if (exceedsLastNonDefault(i) || left.isPattern()) {
        var placeholder = scope.generateUidIdentifier("x");
        placeholder._isDefaultPlaceholder = true;
        node.params[i] = placeholder;
      } else {
        node.params[i] = left.node;
      }

      if (!state.iife) {
        if (right.isIdentifier() && scope.hasOwnBinding(right.node.name)) {
          state.iife = true;
        } else {
          right.traverse(iifeVisitor, state);
        }
      }

      pushDefNode(left.node, right.node, i);
    }

    // we need to cut off all trailing default parameters
    node.params = node.params.slice(0, lastNonDefaultParam);

    if (state.iife) {
      body.push(_helpersCallDelegate2["default"](node, scope));
      node.body = t.blockStatement(body);
    } else {
      node.body.body = body.concat(node.body.body);
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../helpers/call-delegate":1676544235686,"../../../helpers/get-function-arity":1676544235645,"../../../../util":1676544235570,"../../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235686, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent, scope, state) {
    if (this.isThisExpression() || this.isReferencedIdentifier({ name: "arguments" })) {
      state.found = true;
      this.stop();
    }
  },

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  }
};

/**
 * [Please add a description.]
 */

exports["default"] = function (node, scope) {
  var container = t.functionExpression(null, [], node.body, node.generator, node.async);

  var callee = container;
  var args = [];

  var state = { found: false };
  scope.traverse(node, visitor, state);
  if (state.found) {
    callee = t.memberExpression(container, t.identifier("apply"));
    args = [t.thisExpression(), t.identifier("arguments")];
  }

  var call = t.callExpression(callee, args);
  if (node.generator) call = t.yieldExpression(call, true);

  return t.returnStatement(call);
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235687, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _util = require("../../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var memberExpressionOptimisationVisitor = {

  /**
   * [Please add a description.]
   */

  Scope: function Scope(node, parent, scope, state) {
    // check if this scope has a local binding that will shadow the rest parameter
    if (!scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      this.skip();
    }
  },

  /**
   * [Please add a description.]
   */

  Flow: function Flow() {
    // don't touch reference in type annotations
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, state) {
    // skip over functions as whatever `arguments` we reference inside will refer
    // to the wrong function
    var oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    this.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    // we can't guarantee the purity of arguments
    if (node.name === "arguments") {
      state.deopted = true;
    }

    // is this a referenced identifier and is it referencing the rest parameter?
    if (node.name !== state.name) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      if (this.parentPath.isMemberExpression({ computed: true, object: node })) {
        // if we know that this member expression is referencing a number then we can safely
        // optimise it
        var prop = this.parentPath.get("property");
        if (prop.isBaseType("number")) {
          state.candidates.push(this);
          return;
        }
      }

      // optimise single spread args in calls
      if (this.parentPath.isSpreadElement() && state.offset === 0) {
        var call = this.parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push(this);
          return;
        }
      }

      state.references.push(this);
    }
  },

  /**
   * Deopt on use of a binding identifier with the same name as our rest param.
   *
   * See https://github.com/babel/babel/issues/2091
   */

  BindingIdentifier: function BindingIdentifier(node, parent, scope, state) {
    if (node.name === state.name) {
      state.deopted = true;
    }
  }
};

/**
 * [Please add a description.]
 */

function optimiseMemberExpression(parent, offset) {
  if (offset === 0) return;

  var newExpr;
  var prop = parent.property;

  if (t.isLiteral(prop)) {
    prop.value += offset;
    prop.raw = String(prop.value);
  } else {
    // // UnaryExpression, BinaryExpression
    newExpr = t.binaryExpression("+", prop, t.literal(offset));
    parent.property = newExpr;
  }
}

/**
 * [Please add a description.]
 */

function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope) {
    if (!hasRest(node)) return;

    var restParam = node.params.pop();
    var rest = restParam.argument;

    var argsId = t.identifier("arguments");

    // otherwise `arguments` will be remapped in arrow functions
    argsId._shadowedFunctionLiteral = this;

    // support patterns
    if (t.isPattern(rest)) {
      var pattern = rest;
      rest = scope.generateUidIdentifier("ref");

      var declar = t.variableDeclaration("let", pattern.elements.map(function (elem, index) {
        var accessExpr = t.memberExpression(rest, t.literal(index), true);
        return t.variableDeclarator(elem, accessExpr);
      }));
      node.body.body.unshift(declar);
    }

    // check and optimise for extremely common cases
    var state = {
      references: [],
      offset: node.params.length,

      argumentsNode: argsId,
      outerBinding: scope.getBindingIdentifier(rest.name),

      // candidate member expressions we could optimise if there are no other references
      candidates: [],

      // local rest binding name
      name: rest.name,

      // whether any references to the rest parameter were made in a function
      deopted: false
    };

    this.traverse(memberExpressionOptimisationVisitor, state);

    if (!state.deopted && !state.references.length) {
      // we only have shorthands and there are no other references
      if (state.candidates.length) {
        var _arr = state.candidates;

        for (var _i = 0; _i < _arr.length; _i++) {
          var candidate = _arr[_i];
          candidate.replaceWith(argsId);
          if (candidate.parentPath.isMemberExpression()) {
            optimiseMemberExpression(candidate.parent, state.offset);
          }
        }
      }
      return;
    } else {
      state.references = state.references.concat(state.candidates);
    }

    // deopt shadowed functions as transforms like regenerator may try touch the allocation loop
    state.deopted = state.deopted || !!node.shadow;

    //

    var start = t.literal(node.params.length);
    var key = scope.generateUidIdentifier("key");
    var len = scope.generateUidIdentifier("len");

    var arrKey = key;
    var arrLen = len;
    if (node.params.length) {
      // this method has additional params, so we need to subtract
      // the index of the current argument position from the
      // position in the array that we want to populate
      arrKey = t.binaryExpression("-", key, start);

      // we need to work out the size of the array that we're
      // going to store all the rest parameters
      //
      // we need to add a check to avoid constructing the array
      // with <0 if there are less arguments than params as it'll
      // cause an error
      arrLen = t.conditionalExpression(t.binaryExpression(">", len, start), t.binaryExpression("-", len, start), t.literal(0));
    }

    var loop = util.template("rest", {
      ARRAY_TYPE: restParam.typeAnnotation,
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      ARRAY_LEN: arrLen,
      START: start,
      ARRAY: rest,
      KEY: key,
      LEN: len
    });

    if (state.deopted) {
      loop._blockHoist = node.params.length + 1;
      node.body.body.unshift(loop);
    } else {
      // perform allocation at the lowest common denominator of all references
      loop._blockHoist = 1;

      var target = this.getEarliestCommonAncestorFrom(state.references).getStatementParent();

      // don't perform the allocation inside a loop
      var highestLoop;
      target.findParent(function (path) {
        if (path.isLoop()) {
          highestLoop = path;
        } else if (path.isFunction()) {
          // stop crawling up for functions
          return true;
        }
      });
      if (highestLoop) target = highestLoop;

      target.insertBefore(loop);
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../../util":1676544235570,"../../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235688, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ForXStatement: function ForXStatement(node, parent, scope, file) {
    var left = node.left;

    if (t.isPattern(left)) {
      // for ({ length: k } in { abc: 3 });

      var temp = scope.generateUidIdentifier("ref");

      node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);

      this.ensureBlock();

      node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));

      return;
    }

    if (!t.isVariableDeclaration(left)) return;

    var pattern = left.declarations[0].id;
    if (!t.isPattern(pattern)) return;

    var key = scope.generateUidIdentifier("ref");
    node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);

    var nodes = [];

    var destructuring = new DestructuringTransformer({
      kind: left.kind,
      file: file,
      scope: scope,
      nodes: nodes
    });

    destructuring.init(pattern, key);

    this.ensureBlock();

    var block = node.body;
    block.body = nodes.concat(block.body);
  },

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, file) {
    var hasDestructuring = false;
    var _arr = node.params;
    for (var _i = 0; _i < _arr.length; _i++) {
      var pattern = _arr[_i];
      if (t.isPattern(pattern)) {
        hasDestructuring = true;
        break;
      }
    }
    if (!hasDestructuring) return;

    var nodes = [];

    for (var i = 0; i < node.params.length; i++) {
      var pattern = node.params[i];
      if (!t.isPattern(pattern)) continue;

      var ref = scope.generateUidIdentifier("ref");
      if (t.isAssignmentPattern(pattern)) {
        var _pattern = pattern;
        pattern = pattern.left;
        _pattern.left = ref;
      } else {
        node.params[i] = ref;
      }

      t.inherits(ref, pattern);

      var destructuring = new DestructuringTransformer({
        blockHoist: node.params.length - i,
        nodes: nodes,
        scope: scope,
        file: file,
        kind: "let"
      });

      destructuring.init(pattern, ref);
    }

    this.ensureBlock();

    var block = node.body;
    block.body = nodes.concat(block.body);
  },

  /**
   * [Please add a description.]
   */

  CatchClause: function CatchClause(node, parent, scope, file) {
    var pattern = node.param;
    if (!t.isPattern(pattern)) return;

    var ref = scope.generateUidIdentifier("ref");
    node.param = ref;

    var nodes = [];

    var destructuring = new DestructuringTransformer({
      kind: "let",
      file: file,
      scope: scope,
      nodes: nodes
    });
    destructuring.init(pattern, ref);

    node.body.body = nodes.concat(node.body.body);
  },

  /**
   * [Please add a description.]
   */

  AssignmentExpression: function AssignmentExpression(node, parent, scope, file) {
    if (!t.isPattern(node.left)) return;

    var nodes = [];

    var destructuring = new DestructuringTransformer({
      operator: node.operator,
      file: file,
      scope: scope,
      nodes: nodes
    });

    var ref;
    if (this.isCompletionRecord() || !this.parentPath.isExpressionStatement()) {
      ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref");

      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, node.right)]));

      if (t.isArrayExpression(node.right)) {
        destructuring.arrays[ref.name] = true;
      }
    }

    destructuring.init(node.left, ref || node.right);

    if (ref) {
      nodes.push(t.expressionStatement(ref));
    }

    return nodes;
  },

  /**
   * [Please add a description.]
   */

  VariableDeclaration: function VariableDeclaration(node, parent, scope, file) {
    if (t.isForXStatement(parent)) return;
    if (!variableDeclarationHasPattern(node)) return;

    var nodes = [];
    var declar;

    for (var i = 0; i < node.declarations.length; i++) {
      declar = node.declarations[i];

      var patternId = declar.init;
      var pattern = declar.id;

      var destructuring = new DestructuringTransformer({
        nodes: nodes,
        scope: scope,
        kind: node.kind,
        file: file
      });

      if (t.isPattern(pattern)) {
        destructuring.init(pattern, patternId);

        if (+i !== node.declarations.length - 1) {
          // we aren't the last declarator so let's just make the
          // last transformed node inherit from us
          t.inherits(nodes[nodes.length - 1], declar);
        }
      } else {
        nodes.push(t.inherits(destructuring.buildVariableAssignment(declar.id, declar.init), declar));
      }
    }

    if (!t.isProgram(parent) && !t.isBlockStatement(parent)) {
      // https://github.com/babel/babel/issues/113
      // for (let [x] = [0]; false;) {}

      declar = null;

      for (i = 0; i < nodes.length; i++) {
        node = nodes[i];
        declar = declar || t.variableDeclaration(node.kind, []);

        if (!t.isVariableDeclaration(node) && declar.kind !== node.kind) {
          throw file.errorWithNode(node, messages.get("invalidParentForThisNode"));
        }

        declar.declarations = declar.declarations.concat(node.declarations);
      }

      return declar;
    }

    return nodes;
  }
};

exports.visitor = visitor;
/**
 * Test if a VariableDeclaration's declarations contains any Patterns.
 */

function variableDeclarationHasPattern(node) {
  for (var i = 0; i < node.declarations.length; i++) {
    if (t.isPattern(node.declarations[i].id)) {
      return true;
    }
  }
  return false;
}

/**
 * Test if an ArrayPattern's elements contain any RestElements.
 */

function hasRest(pattern) {
  for (var i = 0; i < pattern.elements.length; i++) {
    if (t.isRestElement(pattern.elements[i])) {
      return true;
    }
  }
  return false;
}

/**
 * [Please add a description.]
 */

var arrayUnpackVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (state.bindings[node.name]) {
      state.deopt = true;
      this.stop();
    }
  }
};

/**
 * [Please add a description.]
 */

var DestructuringTransformer = (function () {
  function DestructuringTransformer(opts) {
    _classCallCheck(this, DestructuringTransformer);

    this.blockHoist = opts.blockHoist;
    this.operator = opts.operator;
    this.arrays = {};
    this.nodes = opts.nodes || [];
    this.scope = opts.scope;
    this.file = opts.file;
    this.kind = opts.kind;
  }

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.buildVariableAssignment = function buildVariableAssignment(id, init) {
    var op = this.operator;
    if (t.isMemberExpression(id)) op = "=";

    var node;

    if (op) {
      node = t.expressionStatement(t.assignmentExpression(op, id, init));
    } else {
      node = t.variableDeclaration(this.kind, [t.variableDeclarator(id, init)]);
    }

    node._blockHoist = this.blockHoist;

    return node;
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.buildVariableDeclaration = function buildVariableDeclaration(id, init) {
    var declar = t.variableDeclaration("var", [t.variableDeclarator(id, init)]);
    declar._blockHoist = this.blockHoist;
    return declar;
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.push = function push(id, init) {
    if (t.isObjectPattern(id)) {
      this.pushObjectPattern(id, init);
    } else if (t.isArrayPattern(id)) {
      this.pushArrayPattern(id, init);
    } else if (t.isAssignmentPattern(id)) {
      this.pushAssignmentPattern(id, init);
    } else {
      this.nodes.push(this.buildVariableAssignment(id, init));
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.toArray = function toArray(node, count) {
    if (this.file.isLoose("es6.destructuring") || t.isIdentifier(node) && this.arrays[node.name]) {
      return node;
    } else {
      return this.scope.toArray(node, count);
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushAssignmentPattern = function pushAssignmentPattern(pattern, valueRef) {
    // we need to assign the current value of the assignment to avoid evaluating
    // it more than once

    var tempValueRef = this.scope.generateUidIdentifierBasedOnNode(valueRef);

    var declar = t.variableDeclaration("var", [t.variableDeclarator(tempValueRef, valueRef)]);
    declar._blockHoist = this.blockHoist;
    this.nodes.push(declar);

    //

    var tempConditional = t.conditionalExpression(t.binaryExpression("===", tempValueRef, t.identifier("undefined")), pattern.right, tempValueRef);

    var left = pattern.left;
    if (t.isPattern(left)) {
      var tempValueDefault = t.expressionStatement(t.assignmentExpression("=", tempValueRef, tempConditional));
      tempValueDefault._blockHoist = this.blockHoist;

      this.nodes.push(tempValueDefault);
      this.push(left, tempValueRef);
    } else {
      this.nodes.push(this.buildVariableAssignment(left, tempConditional));
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushObjectSpread = function pushObjectSpread(pattern, objRef, spreadProp, spreadPropIndex) {
    // get all the keys that appear in this object before the current spread

    var keys = [];

    for (var i = 0; i < pattern.properties.length; i++) {
      var prop = pattern.properties[i];

      // we've exceeded the index of the spread property to all properties to the
      // right need to be ignored
      if (i >= spreadPropIndex) break;

      // ignore other spread properties
      if (t.isSpreadProperty(prop)) continue;

      var key = prop.key;
      if (t.isIdentifier(key) && !prop.computed) key = t.literal(prop.key.name);
      keys.push(key);
    }

    keys = t.arrayExpression(keys);

    //

    var value = t.callExpression(this.file.addHelper("object-without-properties"), [objRef, keys]);
    this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushObjectProperty = function pushObjectProperty(prop, propRef) {
    if (t.isLiteral(prop.key)) prop.computed = true;

    var pattern = prop.value;
    var objRef = t.memberExpression(propRef, prop.key, prop.computed);

    if (t.isPattern(pattern)) {
      this.push(pattern, objRef);
    } else {
      this.nodes.push(this.buildVariableAssignment(pattern, objRef));
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushObjectPattern = function pushObjectPattern(pattern, objRef) {
    // https://github.com/babel/babel/issues/681

    if (!pattern.properties.length) {
      this.nodes.push(t.expressionStatement(t.callExpression(this.file.addHelper("object-destructuring-empty"), [objRef])));
    }

    // if we have more than one properties in this pattern and the objectRef is a
    // member expression then we need to assign it to a temporary variable so it's
    // only evaluated once

    if (pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
      var temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
      this.nodes.push(this.buildVariableDeclaration(temp, objRef));
      objRef = temp;
    }

    //

    for (var i = 0; i < pattern.properties.length; i++) {
      var prop = pattern.properties[i];
      if (t.isSpreadProperty(prop)) {
        this.pushObjectSpread(pattern, objRef, prop, i);
      } else {
        this.pushObjectProperty(prop, objRef);
      }
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.canUnpackArrayPattern = function canUnpackArrayPattern(pattern, arr) {
    // not an array so there's no way we can deal with this
    if (!t.isArrayExpression(arr)) return false;

    // pattern has less elements than the array and doesn't have a rest so some
    // elements wont be evaluated
    if (pattern.elements.length > arr.elements.length) return;
    if (pattern.elements.length < arr.elements.length && !hasRest(pattern)) return false;

    var _arr2 = pattern.elements;
    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var elem = _arr2[_i2];
      // deopt on holes
      if (!elem) return false;

      // deopt on member expressions as they may be included in the RHS
      if (t.isMemberExpression(elem)) return false;
    }

    var _arr3 = arr.elements;
    for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
      var elem = _arr3[_i3];
      // deopt on spread elements
      if (t.isSpreadElement(elem)) return false;
    }

    // deopt on reference to left side identifiers
    var bindings = t.getBindingIdentifiers(pattern);
    var state = { deopt: false, bindings: bindings };
    this.scope.traverse(arr, arrayUnpackVisitor, state);
    return !state.deopt;
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushUnpackedArrayPattern = function pushUnpackedArrayPattern(pattern, arr) {
    for (var i = 0; i < pattern.elements.length; i++) {
      var elem = pattern.elements[i];
      if (t.isRestElement(elem)) {
        this.push(elem.argument, t.arrayExpression(arr.elements.slice(i)));
      } else {
        this.push(elem, arr.elements[i]);
      }
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.pushArrayPattern = function pushArrayPattern(pattern, arrayRef) {
    if (!pattern.elements) return;

    // optimise basic array destructuring of an array expression
    //
    // we can't do this to a pattern of unequal size to it's right hand
    // array expression as then there will be values that wont be evaluated
    //
    // eg: var [a, b] = [1, 2];

    if (this.canUnpackArrayPattern(pattern, arrayRef)) {
      return this.pushUnpackedArrayPattern(pattern, arrayRef);
    }

    // if we have a rest then we need all the elements so don't tell
    // `scope.toArray` to only get a certain amount

    var count = !hasRest(pattern) && pattern.elements.length;

    // so we need to ensure that the `arrayRef` is an array, `scope.toArray` will
    // return a locally bound identifier if it's been inferred to be an array,
    // otherwise it'll be a call to a helper that will ensure it's one

    var toArray = this.toArray(arrayRef, count);

    if (t.isIdentifier(toArray)) {
      // we've been given an identifier so it must have been inferred to be an
      // array
      arrayRef = toArray;
    } else {
      arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef);
      this.arrays[arrayRef.name] = true;
      this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
    }

    //

    for (var i = 0; i < pattern.elements.length; i++) {
      var elem = pattern.elements[i];

      // hole
      if (!elem) continue;

      var elemRef;

      if (t.isRestElement(elem)) {
        elemRef = this.toArray(arrayRef);

        if (i > 0) {
          elemRef = t.callExpression(t.memberExpression(elemRef, t.identifier("slice")), [t.literal(i)]);
        }

        // set the element to the rest element argument since we've dealt with it
        // being a rest already
        elem = elem.argument;
      } else {
        elemRef = t.memberExpression(arrayRef, t.literal(i), true);
      }

      this.push(elem, elemRef);
    }
  };

  /**
   * [Please add a description.]
   */

  DestructuringTransformer.prototype.init = function init(pattern, ref) {
    // trying to destructure a value that we can't evaluate more than once so we
    // need to save it to a variable

    if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref)) {
      var memo = this.scope.maybeGenerateMemoised(ref, true);
      if (memo) {
        this.nodes.push(this.buildVariableDeclaration(memo, ref));
        ref = memo;
      }
    }

    //

    this.push(pattern, ref);

    return this.nodes;
  };

  return DestructuringTransformer;
})();
}, function(modId) { var map = {"../../../messages":1676544235569,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235689, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _traversal = require("../../../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _helpersObject = require("../../../helpers/object");

var _helpersObject2 = _interopRequireDefault(_helpersObject);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var _lodashObjectValues = require("lodash/object/values");

var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

/**
 * [Please add a description.]
 */

function isLet(node, parent) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  // https://github.com/babel/babel/issues/255
  if (isLetInitable(node, parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      declar.init = declar.init || t.identifier("undefined");
    }
  }

  node._let = true;
  node.kind = "var";
  return true;
}

/**
 * [Please add a description.]
 */

function isLetInitable(node, parent) {
  return !t.isFor(parent) || !t.isFor(parent, { left: node });
}

/**
 * [Please add a description.]
 */

function isVar(node, parent) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node, parent);
}

/**
 * [Please add a description.]
 */

function standardizeLets(declars) {
  var _arr = declars;

  for (var _i = 0; _i < _arr.length; _i++) {
    var declar = _arr[_i];
    delete declar._let;
  }
}

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  VariableDeclaration: function VariableDeclaration(node, parent, scope, file) {
    if (!isLet(node, parent)) return;

    if (isLetInitable(node) && file.transformers["es6.spec.blockScoping"].canTransform()) {
      var nodes = [node];

      for (var i = 0; i < node.declarations.length; i++) {
        var decl = node.declarations[i];
        if (decl.init) {
          var assign = t.assignmentExpression("=", decl.id, decl.init);
          assign._ignoreBlockScopingTDZ = true;
          nodes.push(t.expressionStatement(assign));
        }
        decl.init = file.addHelper("temporal-undefined");
      }

      node._blockHoist = 2;

      return nodes;
    }
  },

  /**
   * [Please add a description.]
   */

  Loop: function Loop(node, parent, scope, file) {
    var init = node.left || node.init;
    if (isLet(init, node)) {
      t.ensureBlock(node);
      node.body._letDeclarators = [init];
    }

    var blockScoping = new BlockScoping(this, this.get("body"), parent, scope, file);
    return blockScoping.run();
  },

  /**
   * [Please add a description.]
   */

  "BlockStatement|Program": function BlockStatementProgram(block, parent, scope, file) {
    if (!t.isLoop(parent)) {
      var blockScoping = new BlockScoping(null, this, parent, scope, file);
      blockScoping.run();
    }
  }
};

exports.visitor = visitor;
/**
 * [Please add a description.]
 */

function replace(node, parent, scope, remaps) {
  var remap = remaps[node.name];
  if (!remap) return;

  var ownBinding = scope.getBindingIdentifier(node.name);
  if (ownBinding === remap.binding) {
    node.name = remap.uid;
  } else {
    // scope already has it's own binding that doesn't
    // match the one we have a stored replacement for
    if (this) this.skip();
  }
}

/**
 * [Please add a description.]
 */

var replaceVisitor = {
  ReferencedIdentifier: replace,

  /**
   * [Please add a description.]
   */

  AssignmentExpression: function AssignmentExpression(node, parent, scope, remaps) {
    var ids = this.getBindingIdentifiers();
    for (var name in ids) {
      replace(ids[name], node, scope, remaps);
    }
  }
};

/**
 * [Please add a description.]
 */

function traverseReplace(node, parent, scope, remaps) {
  if (t.isIdentifier(node)) {
    replace(node, parent, scope, remaps);
  }

  if (t.isAssignmentExpression(node)) {
    var ids = t.getBindingIdentifiers(node);
    for (var name in ids) {
      replace(ids[name], parent, scope, remaps);
    }
  }

  scope.traverse(node, replaceVisitor, remaps);
}

/**
 * [Please add a description.]
 */

var letReferenceBlockVisitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, state) {
    this.traverse(letReferenceFunctionVisitor, state);
    return this.skip();
  }
};

/**
 * [Please add a description.]
 */

var letReferenceFunctionVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    var ref = state.letReferences[node.name];

    // not a part of our scope
    if (!ref) return;

    // this scope has a variable with the same name so it couldn't belong
    // to our let scope
    var localBinding = scope.getBindingIdentifier(node.name);
    if (localBinding && localBinding !== ref) return;

    state.closurify = true;
  }
};

/**
 * [Please add a description.]
 */

var hoistVarDeclarationsVisitor = {
  enter: function enter(node, parent, scope, self) {
    if (this.isForStatement()) {
      if (isVar(node.init, node)) {
        var nodes = self.pushDeclar(node.init);
        if (nodes.length === 1) {
          node.init = nodes[0];
        } else {
          node.init = t.sequenceExpression(nodes);
        }
      }
    } else if (this.isFor()) {
      if (isVar(node.left, node)) {
        self.pushDeclar(node.left);
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (this.isFunction()) {
      return this.skip();
    }
  }
};

/**
 * [Please add a description.]
 */

var loopLabelVisitor = {
  LabeledStatement: function LabeledStatement(node, parent, scope, state) {
    state.innerLabels.push(node.label.name);
  }
};

/**
 * [Please add a description.]
 */

var continuationVisitor = {
  enter: function enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      var bindings = this.getBindingIdentifiers();
      for (var name in bindings) {
        if (state.outsideReferences[name] !== scope.getBindingIdentifier(name)) continue;
        state.reassignments[name] = true;
      }
    }
  }
};

/**
 * [Please add a description.]
 */

var loopNodeTo = function loopNodeTo(node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
};

/**
 * [Please add a description.]
 */

var loopVisitor = {

  /**
   * [Please add a description.]
   */

  Loop: function Loop(node, parent, scope, state) {
    var oldIgnoreLabeless = state.ignoreLabeless;
    state.ignoreLabeless = true;
    this.traverse(loopVisitor, state);
    state.ignoreLabeless = oldIgnoreLabeless;
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  SwitchCase: function SwitchCase(node, parent, scope, state) {
    var oldInSwitchCase = state.inSwitchCase;
    state.inSwitchCase = true;
    this.traverse(loopVisitor, state);
    state.inSwitchCase = oldInSwitchCase;
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent, scope, state) {
    var replace;
    var loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        // we shouldn't be transforming this because it exists somewhere inside
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = loopText + "|" + node.label.name;
      } else {
        // we shouldn't be transforming these statements because
        // they don't refer to the actual loop we're scopifying
        if (state.ignoreLabeless) return;

        //
        if (state.inSwitchCase) return;

        // break statements mean something different in this context
        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.literal(loopText);
    }

    if (this.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([t.property("init", t.identifier("v"), node.argument || t.identifier("undefined"))]);
    }

    if (replace) {
      replace = t.returnStatement(replace);
      this.skip();
      return t.inherits(replace, node);
    }
  }
};

/**
 * [Please add a description.]
 */

var BlockScoping = (function () {
  function BlockScoping(loopPath, blockPath, parent, scope, file) {
    _classCallCheck(this, BlockScoping);

    this.parent = parent;
    this.scope = scope;
    this.file = file;

    this.blockPath = blockPath;
    this.block = blockPath.node;

    this.outsideLetReferences = _helpersObject2["default"]();
    this.hasLetReferences = false;
    this.letReferences = this.block._letReferences = _helpersObject2["default"]();
    this.body = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath = loopPath;
      this.loop = loopPath.node;
    }
  }

  /**
   * Start the ball rolling.
   */

  BlockScoping.prototype.run = function run() {
    var block = this.block;
    if (block._letDone) return;
    block._letDone = true;

    var needsClosure = this.getLetReferences();

    // this is a block within a `Function/Program` so we can safely leave it be
    if (t.isFunction(this.parent) || t.isProgram(this.block)) return;

    // we can skip everything
    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
      return t.labeledStatement(this.loopLabel, this.loop);
    }
  };

  /**
   * [Please add a description.]
   */

  BlockScoping.prototype.remap = function remap() {
    var hasRemaps = false;
    var letRefs = this.letReferences;
    var scope = this.scope;

    // alright, so since we aren't wrapping this block in a closure
    // we have to check if any of our let variables collide with
    // those in upper scopes and then if they do, generate a uid
    // for them and replace all references with it
    var remaps = _helpersObject2["default"]();

    for (var key in letRefs) {
      // just an Identifier node we collected in `getLetReferences`
      // this is the defining identifier of a declaration
      var ref = letRefs[key];

      // todo: could skip this if the colliding binding is in another function
      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        var uid = scope.generateUidIdentifier(ref.name).name;
        ref.name = uid;

        hasRemaps = true;
        remaps[key] = remaps[uid] = {
          binding: ref,
          uid: uid
        };
      }
    }

    if (!hasRemaps) return;

    //

    var loop = this.loop;
    if (loop) {
      traverseReplace(loop.right, loop, scope, remaps);
      traverseReplace(loop.test, loop, scope, remaps);
      traverseReplace(loop.update, loop, scope, remaps);
    }

    this.blockPath.traverse(replaceVisitor, remaps);
  };

  /**
   * [Please add a description.]
   */

  BlockScoping.prototype.wrapClosure = function wrapClosure() {
    var block = this.block;

    var outsideRefs = this.outsideLetReferences;

    // remap loop heads with colliding variables
    if (this.loop) {
      for (var name in outsideRefs) {
        var id = outsideRefs[name];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];

          this.scope.rename(id.name);

          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    // if we're inside of a for loop then we search to see if there are any
    // `break`s, `continue`s, `return`s etc
    this.has = this.checkLoop();

    // hoist var references to retain scope
    this.hoistVarDeclarations();

    // turn outsideLetReferences into an array
    var params = _lodashObjectValues2["default"](outsideRefs);
    var args = _lodashObjectValues2["default"](outsideRefs);

    // build the closure that we're going to wrap the block with
    var fn = t.functionExpression(null, params, t.blockStatement(block.body));
    fn.shadow = true;

    // continuation
    this.addContinuations(fn);

    // replace the current block body with the one we're going to build
    block.body = this.body;

    var ref = fn;

    if (this.loop) {
      ref = this.scope.generateUidIdentifier("loop");
      this.loopPath.insertBefore(t.variableDeclaration("var", [t.variableDeclarator(ref, fn)]));
    }

    // build a call and a unique id that we can assign the return value to
    var call = t.callExpression(ref, args);
    var ret = this.scope.generateUidIdentifier("ret");

    // handle generators
    var hasYield = _traversal2["default"].hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }

    // handlers async functions
    var hasAsync = _traversal2["default"].hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call);
    }

    this.buildClosure(ret, call);
  };

  /**
   * Push the closure to the body.
   */

  BlockScoping.prototype.buildClosure = function buildClosure(ret, call) {
    var has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  };

  /**
   * If any of the outer let variables are reassigned then we need to rename them in
   * the closure so we can get direct access to the outer variable to continue the
   * iteration with bindings based on each iteration.
   *
   * Reference: https://github.com/babel/babel/issues/1078
   */

  BlockScoping.prototype.addContinuations = function addContinuations(fn) {
    var state = {
      reassignments: {},
      outsideReferences: this.outsideLetReferences
    };

    this.scope.traverse(fn, continuationVisitor, state);

    for (var i = 0; i < fn.params.length; i++) {
      var param = fn.params[i];
      if (!state.reassignments[param.name]) continue;

      var newParam = this.scope.generateUidIdentifier(param.name);
      fn.params[i] = newParam;

      this.scope.rename(param.name, newParam.name, fn);

      // assign outer reference as it's been modified internally and needs to be retained
      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
    }
  };

  /**
   * [Please add a description.]
   */

  BlockScoping.prototype.getLetReferences = function getLetReferences() {
    var block = this.block;

    var declarators = block._letDeclarators || [];

    //
    for (var i = 0; i < declarators.length; i++) {
      var declar = declarators[i];
      _lodashObjectExtend2["default"](this.outsideLetReferences, t.getBindingIdentifiers(declar));
    }

    //
    if (block.body) {
      for (var i = 0; i < block.body.length; i++) {
        var declar = block.body[i];
        if (isLet(declar, block)) {
          declarators = declarators.concat(declar.declarations);
        }
      }
    }

    //
    for (var i = 0; i < declarators.length; i++) {
      var declar = declarators[i];
      var keys = t.getBindingIdentifiers(declar);
      _lodashObjectExtend2["default"](this.letReferences, keys);
      this.hasLetReferences = true;
    }

    // no let references so we can just quit
    if (!this.hasLetReferences) return;

    // set let references to plain var references
    standardizeLets(declarators);

    var state = {
      letReferences: this.letReferences,
      closurify: false
    };

    // traverse through this block, stopping on functions and checking if they
    // contain any local let references
    this.blockPath.traverse(letReferenceBlockVisitor, state);

    return state.closurify;
  };

  /**
   * If we're inside of a loop then traverse it and check if it has one of
   * the following node types `ReturnStatement`, `BreakStatement`,
   * `ContinueStatement` and replace it with a return value that we can track
   * later on.
   *
   * @returns {Object}
   */

  BlockScoping.prototype.checkLoop = function checkLoop() {
    var state = {
      hasBreakContinue: false,
      ignoreLabeless: false,
      inSwitchCase: false,
      innerLabels: [],
      hasReturn: false,
      isLoop: !!this.loop,
      map: {}
    };

    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);

    return state;
  };

  /**
   * Hoist all var declarations in this block to before it so they retain scope
   * once we wrap everything in a closure.
   */

  BlockScoping.prototype.hoistVarDeclarations = function hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  };

  /**
   * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
   * their declarations hoisted to before the closure wrapper.
   */

  BlockScoping.prototype.pushDeclar = function pushDeclar(node) {
    var declars = [];
    var names = t.getBindingIdentifiers(node);
    for (var name in names) {
      declars.push(t.variableDeclarator(names[name]));
    }

    this.body.push(t.variableDeclaration(node.kind, declars));

    var replace = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (!declar.init) continue;

      var expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }

    return replace;
  };

  /**
   * [Please add a description.]
   */

  BlockScoping.prototype.buildHas = function buildHas(ret, call) {
    var body = this.body;

    body.push(t.variableDeclaration("var", [t.variableDeclarator(ret, call)]));

    var retCheck;
    var has = this.has;
    var cases = [];

    if (has.hasReturn) {
      // typeof ret === "object"
      retCheck = util.template("let-scoping-return", {
        RETURN: ret
      });
    }

    if (has.hasBreakContinue) {
      for (var key in has.map) {
        cases.push(t.switchCase(t.literal(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        var single = cases[0];
        body.push(this.file.attachAuxiliaryComment(t.ifStatement(t.binaryExpression("===", ret, single.test), single.consequent[0])));
      } else {
        // https://github.com/babel/babel/issues/998
        for (var i = 0; i < cases.length; i++) {
          var caseConsequent = cases[i].consequent[0];
          if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
            caseConsequent.label = this.loopLabel = this.loopLabel || this.file.scope.generateUidIdentifier("loop");
          }
        }

        body.push(this.file.attachAuxiliaryComment(t.switchStatement(ret, cases)));
      }
    } else {
      if (has.hasReturn) {
        body.push(this.file.attachAuxiliaryComment(retCheck));
      }
    }
  };

  return BlockScoping;
})();
}, function(modId) { var map = {"../../../traversal":1676544235550,"../../../helpers/object":1676544235574,"../../../util":1676544235570,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235690, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function buildAssert(node, file) {
  return t.callExpression(file.addHelper("temporal-assert-defined"), [node, t.literal(node.name), file.addHelper("temporal-undefined")]);
}

/**
 * [Please add a description.]
 */

function references(node, scope, state) {
  var declared = state.letRefs[node.name];
  if (!declared) return false;

  // declared node is different in this scope
  return scope.getBindingIdentifier(node.name) === declared;
}

/**
 * [Please add a description.]
 */

var refVisitor = {

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (t.isFor(parent) && parent.left === node) return;

    if (!references(node, scope, state)) return;

    var assert = buildAssert(node, state.file);

    this.skip();

    if (t.isUpdateExpression(parent)) {
      if (parent._ignoreBlockScopingTDZ) return;
      this.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
    } else {
      return t.logicalExpression("&&", assert, node);
    }
  },

  /**
   * [Please add a description.]
   */

  AssignmentExpression: {
    exit: function exit(node, parent, scope, state) {
      if (node._ignoreBlockScopingTDZ) return;

      var nodes = [];
      var ids = this.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        if (references(id, scope, state)) {
          nodes.push(buildAssert(id, state.file));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        return nodes.map(t.expressionStatement);
      }
    }
  }
};

var metadata = {
  optional: true,
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  "Program|Loop|BlockStatement": {
    exit: function exit(node, parent, scope, file) {
      var letRefs = node._letReferences;
      if (!letRefs) return;

      this.traverse(refVisitor, {
        letRefs: letRefs,
        file: file
      });
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235691, function(require, module, exports) {


exports.__esModule = true;
exports.manipulateOptions = manipulateOptions;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersReact = require("../../helpers/react");

var react = _interopRequireWildcard(_helpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function manipulateOptions(opts) {
  opts.blacklist.push("react");
}

var metadata = {
  optional: true,
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = require("../../helpers/build-react-transformer")({

  /**
   * [Please add a description.]
   */

  pre: function pre(state) {
    state.callee = state.tagExpr;
  },

  /**
   * [Please add a description.]
   */

  post: function post(state) {
    if (react.isCompatTag(state.tagName)) {
      state.call = t.callExpression(t.memberExpression(t.memberExpression(t.identifier("React"), t.identifier("DOM")), state.tagExpr, t.isLiteral(state.tagExpr)), state.args);
    }
  }
});
exports.visitor = visitor;
}, function(modId) { var map = {"../../helpers/react":1676544235554,"../../../types":1676544235555,"../../helpers/build-react-transformer":1676544235692}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235692, function(require, module, exports) {
// Based upon the excellent jsx-transpiler by Ingvar Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

// jsx



exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangIsString = require("lodash/lang/isString");

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _messages = require("../../messages");

var messages = _interopRequireWildcard(_messages);

var _esutils = require("esutils");

var _esutils2 = _interopRequireDefault(_esutils);

var _react = require("./react");

var react = _interopRequireWildcard(_react);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

exports["default"] = function (opts) {
  var visitor = {};

  /**
   * [Please add a description.]
   */

  visitor.JSXIdentifier = function (node) {
    if (node.name === "this" && this.isReferenced()) {
      return t.thisExpression();
    } else if (_esutils2["default"].keyword.isIdentifierNameES6(node.name)) {
      node.type = "Identifier";
    } else {
      return t.literal(node.name);
    }
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXNamespacedName = function () {
    throw this.errorWithNode(messages.get("JSXNamespacedTags"));
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXMemberExpression = {
    exit: function exit(node) {
      node.computed = t.isLiteral(node.property);
      node.type = "MemberExpression";
    }
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXExpressionContainer = function (node) {
    return node.expression;
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXAttribute = {
    enter: function enter(node) {
      var value = node.value;
      if (t.isLiteral(value) && _lodashLangIsString2["default"](value.value)) {
        value.value = value.value.replace(/\n\s+/g, " ");
      }
    },

    exit: function exit(node) {
      var value = node.value || t.literal(true);
      return t.inherits(t.property("init", node.name, value), node);
    }
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXOpeningElement = {
    exit: function exit(node, parent, scope, file) {
      parent.children = react.buildChildren(parent);

      var tagExpr = node.name;
      var args = [];

      var tagName;
      if (t.isIdentifier(tagExpr)) {
        tagName = tagExpr.name;
      } else if (t.isLiteral(tagExpr)) {
        tagName = tagExpr.value;
      }

      var state = {
        tagExpr: tagExpr,
        tagName: tagName,
        args: args
      };

      if (opts.pre) {
        opts.pre(state, file);
      }

      var attribs = node.attributes;
      if (attribs.length) {
        attribs = buildJSXOpeningElementAttributes(attribs, file);
      } else {
        attribs = t.literal(null);
      }

      args.push(attribs);

      if (opts.post) {
        opts.post(state, file);
      }

      return state.call || t.callExpression(state.callee, args);
    }
  };

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containg
   * all prior attributes to an array for later processing.
   */

  var buildJSXOpeningElementAttributes = function buildJSXOpeningElementAttributes(attribs, file) {
    var _props = [];
    var objs = [];

    var pushProps = function pushProps() {
      if (!_props.length) return;

      objs.push(t.objectExpression(_props));
      _props = [];
    };

    while (attribs.length) {
      var prop = attribs.shift();
      if (t.isJSXSpreadAttribute(prop)) {
        pushProps();
        objs.push(prop.argument);
      } else {
        _props.push(prop);
      }
    }

    pushProps();

    if (objs.length === 1) {
      // only one object
      attribs = objs[0];
    } else {
      // looks like we have multiple objects
      if (!t.isObjectExpression(objs[0])) {
        objs.unshift(t.objectExpression([]));
      }

      // spread it
      attribs = t.callExpression(file.addHelper("extends"), objs);
    }

    return attribs;
  };

  /**
   * [Please add a description.]
   */

  visitor.JSXElement = {
    exit: function exit(node) {
      var callExpr = node.openingElement;

      callExpr.arguments = callExpr.arguments.concat(node.children);

      if (callExpr.arguments.length >= 3) {
        callExpr._prettyCall = true;
      }

      return t.inherits(callExpr, node);
    }
  };

  return visitor;
};

module.exports = exports["default"];
}, function(modId) { var map = {"../../messages":1676544235569,"./react":1676544235554,"../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235693, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersReact = require("../../helpers/react");

var react = _interopRequireWildcard(_helpersReact);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

var JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = require("../../helpers/build-react-transformer")({

  /**
   * [Please add a description.]
   */

  pre: function pre(state) {
    var tagName = state.tagName;
    var args = state.args;
    if (react.isCompatTag(tagName)) {
      args.push(t.literal(tagName));
    } else {
      args.push(state.tagExpr);
    }
  },

  /**
   * [Please add a description.]
   */

  post: function post(state, file) {
    state.callee = file.get("jsxIdentifier");
  }
});

exports.visitor = visitor;
/**
 * [Please add a description.]
 */

visitor.Program = function (node, parent, scope, file) {
  var id = file.opts.jsxPragma;

  for (var i = 0; i < file.ast.comments.length; i++) {
    var comment = file.ast.comments[i];
    var matches = JSX_ANNOTATION_REGEX.exec(comment.value);
    if (matches) {
      id = matches[1];
      if (id === "React.DOM") {
        throw file.errorWithNode(comment, "The @jsx React.DOM pragma has been deprecated as of React 0.12");
      } else {
        break;
      }
    }
  }

  file.set("jsxIdentifier", id.split(".").map(t.identifier).reduce(function (object, property) {
    return t.memberExpression(object, property);
  }));
};
}, function(modId) { var map = {"../../helpers/react":1676544235554,"../../../types":1676544235555,"../../helpers/build-react-transformer":1676544235692}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235694, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _regenerator = require("regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

// It's important to use the exact same NodePath constructor that
// Regenerator uses, rather than require("ast-types").NodePath, because
// the version of ast-types that Babel knows about might be different from
// the version that Regenerator depends on. See for example #1958.
var NodePath = _regenerator2["default"].types.NodePath;

var metadata = {
  group: "builtin-advanced"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: {
    exit: function exit(node) {
      if (node.async || node.generator) {
        // Although this code transforms only the subtree rooted at the given
        // Function node, that node might contain other generator functions
        // that will also be transformed. It might help performance to ignore
        // nested functions, and rely on the traversal to visit them later,
        // but that's a small optimization. Starting here instead of at the
        // root of the AST is the key optimization, since huge async/generator
        // functions are relatively rare.
        _regenerator2["default"].transform(convertNodePath(this));
      }
    }
  }
};

exports.visitor = visitor;
// Given a Babel NodePath, return an ast-types NodePath that includes full
// ancestry information (up to and including the Program node). This is
// complicated by having to include intermediate objects like blockStatement.body
// arrays, in addition to Node objects.
function convertNodePath(path) {
  var programNode;
  var keysAlongPath = [];

  while (path) {
    var pp = path.parentPath;
    var parentNode = pp && pp.node;
    if (parentNode) {
      keysAlongPath.push(path.key);

      if (parentNode !== path.container) {
        var found = Object.keys(parentNode).some(function (listKey) {
          if (parentNode[listKey] === path.container) {
            keysAlongPath.push(listKey);
            return true;
          }
        });

        if (!found) {
          throw new Error("Failed to find container object in parent node");
        }
      }

      if (t.isProgram(parentNode)) {
        programNode = parentNode;
        break;
      }
    }

    path = pp;
  }

  if (!programNode) {
    throw new Error("Failed to find root Program node");
  }

  var nodePath = new NodePath(programNode);

  while (keysAlongPath.length > 0) {
    nodePath = nodePath.get(keysAlongPath.pop());
  }

  return nodePath;
}
}, function(modId) { var map = {"regenerator":1676544235694,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235695, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

function keepBlockHoist(node, nodes) {
  if (node._blockHoist) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i]._blockHoist = node._blockHoist;
    }
  }
}

var metadata = {
  group: "builtin-modules"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ImportDeclaration: function ImportDeclaration(node, parent, scope, file) {
    // flow type
    if (node.importKind === "type" || node.importKind === "typeof") return;

    var nodes = [];

    if (node.specifiers.length) {
      var _arr = node.specifiers;

      for (var _i = 0; _i < _arr.length; _i++) {
        var specifier = _arr[_i];
        file.moduleFormatter.importSpecifier(specifier, node, nodes, scope);
      }
    } else {
      file.moduleFormatter.importDeclaration(node, nodes, scope);
    }

    if (nodes.length === 1) {
      // inherit `_blockHoist` - this is for `_blockHoist` in File.prototype.addImport
      nodes[0]._blockHoist = node._blockHoist;
    }

    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportAllDeclaration: function ExportAllDeclaration(node, parent, scope, file) {
    var nodes = [];
    file.moduleFormatter.exportAllDeclaration(node, nodes, scope);
    keepBlockHoist(node, nodes);
    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportDefaultDeclaration: function ExportDefaultDeclaration(node, parent, scope, file) {
    var nodes = [];
    file.moduleFormatter.exportDeclaration(node, nodes, scope);
    keepBlockHoist(node, nodes);
    return nodes;
  },

  /**
   * [Please add a description.]
   */

  ExportNamedDeclaration: function ExportNamedDeclaration(node, parent, scope, file) {
    // flow type
    if (this.get("declaration").isTypeAlias()) return;

    var nodes = [];

    if (node.declaration) {
      // make sure variable exports have an initializer
      // this is done here to avoid duplicating it in the module formatters
      if (t.isVariableDeclaration(node.declaration)) {
        var declar = node.declaration.declarations[0];
        declar.init = declar.init || t.identifier("undefined");
      }

      file.moduleFormatter.exportDeclaration(node, nodes, scope);
    } else if (node.specifiers) {
      for (var i = 0; i < node.specifiers.length; i++) {
        file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, scope);
      }
    }

    keepBlockHoist(node, nodes);

    return nodes;
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235696, function(require, module, exports) {


exports.__esModule = true;
var metadata = {
  group: "builtin-modules"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Program: {
    exit: function exit(program, parent, scope, file) {
      // ensure that these are at the top, just like normal imports
      var _arr = file.dynamicImports;
      for (var _i = 0; _i < _arr.length; _i++) {
        var node = _arr[_i];
        node._blockHoist = 3;
      }

      program.body = file.dynamicImports.concat(program.body);

      if (!file.transformers["es6.modules"].canTransform()) return;

      if (file.moduleFormatter.transform) {
        file.moduleFormatter.transform(program);
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235697, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodashCollectionReduceRight = require("lodash/collection/reduceRight");

var _lodashCollectionReduceRight2 = _interopRequireDefault(_lodashCollectionReduceRight);

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

var _lodashArrayFlatten = require("lodash/array/flatten");

var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);

var _util = require("../../../util");

var util = _interopRequireWildcard(_util);

var _lodashCollectionMap = require("lodash/collection/map");

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Function: function Function(node, parent, scope, file) {
    if (node.generator || node.async) return;
    var tailCall = new TailCallTransformer(this, scope, file);
    tailCall.run();
  }
};

exports.visitor = visitor;
/**
 * [Please add a description.]
 */

function returnBlock(expr) {
  return t.blockStatement([t.returnStatement(expr)]);
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  enter: function enter(node, parent) {
    if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        this.skip();
      } else if (parent.finalizer && node !== parent.finalizer) {
        this.skip();
      }
    }
  },

  /**
   * [Please add a description.]
   */

  ReturnStatement: function ReturnStatement(node, parent, scope, state) {
    return state.subTransform(node.argument);
  },

  /**
   * [Please add a description.]
   */

  Function: function Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  VariableDeclaration: function VariableDeclaration(node, parent, scope, state) {
    state.vars.push(node);
  },

  /**
   * [Please add a description.]
   */

  ThisExpression: function ThisExpression(node, parent, scope, state) {
    if (!state.isShadowed) {
      state.needsThis = true;
      state.thisPaths.push(this);
    }
  },

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope, state) {
    if (node.name === "arguments" && (!state.isShadowed || node._shadowedFunctionLiteral)) {
      state.needsArguments = true;
      state.argumentsPaths.push(this);
    }
  }
};

/**
 * [Please add a description.]
 */

var TailCallTransformer = (function () {
  function TailCallTransformer(path, scope, file) {
    _classCallCheck(this, TailCallTransformer);

    this.hasTailRecursion = false;

    this.needsArguments = false;
    this.argumentsPaths = [];
    this.setsArguments = false;

    this.needsThis = false;
    this.thisPaths = [];

    this.isShadowed = path.isArrowFunctionExpression() || path.is("shadow");
    this.ownerId = path.node.id;
    this.vars = [];

    this.scope = scope;
    this.path = path;
    this.file = file;
    this.node = path.node;
  }

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getArgumentsId = function getArgumentsId() {
    return this.argumentsId = this.argumentsId || this.scope.generateUidIdentifier("arguments");
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getThisId = function getThisId() {
    return this.thisId = this.thisId || this.scope.generateUidIdentifier("this");
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getLeftId = function getLeftId() {
    return this.leftId = this.leftId || this.scope.generateUidIdentifier("left");
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getFunctionId = function getFunctionId() {
    return this.functionId = this.functionId || this.scope.generateUidIdentifier("function");
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getAgainId = function getAgainId() {
    return this.againId = this.againId || this.scope.generateUidIdentifier("again");
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.getParams = function getParams() {
    var params = this.params;

    if (!params) {
      params = this.node.params;
      this.paramDecls = [];

      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (!param._isDefaultPlaceholder) {
          this.paramDecls.push(t.variableDeclarator(param, params[i] = this.scope.generateUidIdentifier("x")));
        }
      }
    }

    return this.params = params;
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.hasDeopt = function hasDeopt() {
    // check if the ownerId has been reassigned, if it has then it's not safe to
    // perform optimisations
    var ownerIdInfo = this.scope.getBinding(this.ownerId.name);
    return ownerIdInfo && !ownerIdInfo.constant;
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.run = function run() {
    var node = this.node;

    // only tail recursion can be optimized as for now, so we can skip anonymous
    // functions entirely
    var ownerId = this.ownerId;
    if (!ownerId) return;

    // traverse the function and look for tail recursion
    this.path.traverse(visitor, this);

    // has no tail call recursion
    if (!this.hasTailRecursion) return;

    // the function binding isn't constant so we can't be sure that it's the same function :(
    if (this.hasDeopt()) {
      this.file.log.deopt(node, messages.get("tailCallReassignmentDeopt"));
      return;
    }

    //

    var body = this.path.ensureBlock().body;

    for (var i = 0; i < body.length; i++) {
      var bodyNode = body[i];
      if (!t.isFunctionDeclaration(bodyNode)) continue;

      bodyNode = body[i] = t.variableDeclaration("var", [t.variableDeclarator(bodyNode.id, t.toExpression(bodyNode))]);
      bodyNode._blockHoist = 2;
    }

    var paramDecls = this.paramDecls;
    if (paramDecls.length > 0) {
      var paramDecl = t.variableDeclaration("var", paramDecls);
      paramDecl._blockHoist = Infinity;
      body.unshift(paramDecl);
    }

    body.unshift(t.expressionStatement(t.assignmentExpression("=", this.getAgainId(), t.literal(false))));

    node.body = util.template("tail-call-body", {
      FUNCTION_ID: this.getFunctionId(),
      AGAIN_ID: this.getAgainId(),
      BLOCK: node.body
    });

    var topVars = [];

    if (this.needsThis) {
      var _arr = this.thisPaths;

      for (var _i = 0; _i < _arr.length; _i++) {
        var path = _arr[_i];
        path.replaceWith(this.getThisId());
      }

      topVars.push(t.variableDeclarator(this.getThisId(), t.thisExpression()));
    }

    if (this.needsArguments || this.setsArguments) {
      var _arr2 = this.argumentsPaths;

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var _path = _arr2[_i2];
        _path.replaceWith(this.argumentsId);
      }

      var decl = t.variableDeclarator(this.argumentsId);
      if (this.argumentsId) {
        decl.init = t.identifier("arguments");
        decl.init._shadowedFunctionLiteral = this.path;
      }
      topVars.push(decl);
    }

    var leftId = this.leftId;
    if (leftId) {
      topVars.push(t.variableDeclarator(leftId));
    }

    if (topVars.length > 0) {
      node.body.body.unshift(t.variableDeclaration("var", topVars));
    }
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.subTransform = function subTransform(node) {
    if (!node) return;

    var handler = this["subTransform" + node.type];
    if (handler) return handler.call(this, node);
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.subTransformConditionalExpression = function subTransformConditionalExpression(node) {
    var callConsequent = this.subTransform(node.consequent);
    var callAlternate = this.subTransform(node.alternate);
    if (!callConsequent && !callAlternate) {
      return;
    }

    // if ternary operator had tail recursion in value, convert to optimized if-statement
    node.type = "IfStatement";
    node.consequent = callConsequent ? t.toBlock(callConsequent) : returnBlock(node.consequent);

    if (callAlternate) {
      node.alternate = t.isIfStatement(callAlternate) ? callAlternate : t.toBlock(callAlternate);
    } else {
      node.alternate = returnBlock(node.alternate);
    }

    return [node];
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.subTransformLogicalExpression = function subTransformLogicalExpression(node) {
    // only call in right-value of can be optimized
    var callRight = this.subTransform(node.right);
    if (!callRight) return;

    // cache left value as it might have side-effects
    var leftId = this.getLeftId();
    var testExpr = t.assignmentExpression("=", leftId, node.left);

    if (node.operator === "&&") {
      testExpr = t.unaryExpression("!", testExpr);
    }

    return [t.ifStatement(testExpr, returnBlock(leftId))].concat(callRight);
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.subTransformSequenceExpression = function subTransformSequenceExpression(node) {
    var seq = node.expressions;

    // only last element can be optimized
    var lastCall = this.subTransform(seq[seq.length - 1]);
    if (!lastCall) {
      return;
    }

    // remove converted expression from sequence
    // and convert to regular expression if needed
    if (--seq.length === 1) {
      node = seq[0];
    }

    return [t.expressionStatement(node)].concat(lastCall);
  };

  /**
   * [Please add a description.]
   */

  TailCallTransformer.prototype.subTransformCallExpression = function subTransformCallExpression(node) {
    var callee = node.callee;
    var thisBinding, args;

    if (t.isMemberExpression(callee, { computed: false }) && t.isIdentifier(callee.property)) {
      switch (callee.property.name) {
        case "call":
          args = t.arrayExpression(node.arguments.slice(1));
          break;

        case "apply":
          args = node.arguments[1] || t.identifier("undefined");
          this.needsArguments = true;
          break;

        default:
          return;
      }

      thisBinding = node.arguments[0];
      callee = callee.object;
    }

    // only tail recursion can be optimized as for now
    if (!t.isIdentifier(callee) || !this.scope.bindingIdentifierEquals(callee.name, this.ownerId)) {
      return;
    }

    this.hasTailRecursion = true;

    if (this.hasDeopt()) return;

    var body = [];

    if (this.needsThis && !t.isThisExpression(thisBinding)) {
      body.push(t.expressionStatement(t.assignmentExpression("=", this.getThisId(), thisBinding || t.identifier("undefined"))));
    }

    if (!args) {
      args = t.arrayExpression(node.arguments);
    }

    var argumentsId = this.getArgumentsId();
    var params = this.getParams();

    if (this.needsArguments) {
      body.push(t.expressionStatement(t.assignmentExpression("=", argumentsId, args)));
    }

    if (t.isArrayExpression(args)) {
      var elems = args.elements;

      // pad out the args so all the function args are reset - https://github.com/babel/babel/issues/1938
      while (elems.length < params.length) {
        elems.push(t.identifier("undefined"));
      }

      for (var i = 0; i < elems.length; i++) {
        var param = params[i];
        var elem = elems[i];

        if (param && !param._isDefaultPlaceholder) {
          elems[i] = t.assignmentExpression("=", param, elem);
        } else {
          // exceeds parameters but push it anyway to ensure correct execution
        }
      }

      if (!this.needsArguments) {
        var _arr3 = elems;

        for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
          var elem = _arr3[_i3];
          // only push expressions that we really need, this will skip pure arguments that exceed the
          // parameter length of the current function
          if (!this.scope.isPure(elem)) {
            body.push(t.expressionStatement(elem));
          }
        }
      }
    } else {
      this.setsArguments = true;
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (!param._isDefaultPlaceholder) {
          body.push(t.expressionStatement(t.assignmentExpression("=", param, t.memberExpression(argumentsId, t.literal(i), true))));
        }
      }
    }

    body.push(t.expressionStatement(t.assignmentExpression("=", this.getAgainId(), t.literal(true))));

    if (this.vars.length > 0) {
      var declarations = _lodashArrayFlatten2["default"](_lodashCollectionMap2["default"](this.vars, function (decl) {
        return decl.declarations;
      }));

      var assignment = _lodashCollectionReduceRight2["default"](declarations, function (expr, decl) {
        return t.assignmentExpression("=", decl.id, expr);
      }, t.identifier("undefined"));

      var statement = t.expressionStatement(assignment);
      body.push(statement);
    }

    body.push(t.continueStatement(this.getFunctionId()));

    return body;
  };

  return TailCallTransformer;
})();
}, function(modId) { var map = {"../../../messages":1676544235569,"../../../util":1676544235570,"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235698, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
function shouldShadow(path, shadowPath) {
  if (path.is("_forceShadow")) {
    return true;
  } else {
    return shadowPath && !shadowPath.isArrowFunctionExpression();
  }
}

/**
 * [Please add a description.]
 */

function remap(path, key, create) {
  // ensure that we're shadowed
  var shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath)) return;

  var shadowFunction = path.node._shadowedFunctionLiteral;
  var currentFunction;

  var fnPath = path.findParent(function (path) {
    if (path.isProgram() || path.isFunction()) {
      // catch current function in case this is the shadowed one and we can ignore it
      currentFunction = currentFunction || path;
    }

    if (path.isProgram()) {
      return true;
    } else if (path.isFunction()) {
      if (shadowFunction) {
        return path === shadowFunction || path.node === shadowFunction.node;
      } else {
        return !path.is("shadow");
      }
    }

    return false;
  });

  // no point in realiasing if we're in this function
  if (fnPath === currentFunction) return;

  var cached = fnPath.getData(key);
  if (cached) return cached;

  var init = create();
  var id = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id: id, init: init });

  return id;
}

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  ThisExpression: function ThisExpression() {
    return remap(this, "this", function () {
      return t.thisExpression();
    });
  },

  /**
   * [Please add a description.]
   */

  ReferencedIdentifier: function ReferencedIdentifier(node) {
    if (node.name === "arguments") {
      return remap(this, "arguments", function () {
        return t.identifier("arguments");
      });
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235699, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
/**
 * Turn reserved word properties into literals.
 *
 * **In**
 *
 * ```javascript
 * var foo = {
 *   catch: function () {}
 * };
 * ```
 *
 * **Out**
 *
 * ```javascript
 * var foo = {
 *   "catch": function () {}
 * };
 * ```
 */

var visitor = {

  /**
   * Look for non-computed keys with names that are not valid identifiers.
   * Turn them into literals.
   */

  Property: {
    exit: function exit(node) {
      var key = node.key;
      if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
        // default: "bar" -> "default": "bar"
        node.key = t.literal(key.name);
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235700, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
/**
 * Turn member expression reserved word properties into literals.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * foo.catch;
 * ```
 *
 * **Out**
 *
 * ```javascript
 * foo["catch"];
 * ```
 */

var visitor = {

  /**
   * Look for non-computed properties with names that are not valid identifiers.
   * Turn them into computed properties with literal names.
   */

  MemberExpression: {
    exit: function exit(node) {
      var prop = node.property;
      if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
        // foo.default -> foo["default"]
        node.property = t.literal(prop.name);
        node.computed = true;
      }
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235701, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionSortBy = require("lodash/collection/sortBy");

var _lodashCollectionSortBy2 = _interopRequireDefault(_lodashCollectionSortBy);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
/**
 * [Please add a description.]
 *
 * Priority:
 *
 *  - 0 We want this to be at the **very** bottom
 *  - 1 Default node position
 *  - 2 Priority over normal nodes
 *  - 3 We want this to be at the **very** top
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Block: {
    exit: function exit(node) {
      var hasChange = false;
      for (var i = 0; i < node.body.length; i++) {
        var bodyNode = node.body[i];
        if (bodyNode && bodyNode._blockHoist != null) {
          hasChange = true;
          break;
        }
      }
      if (!hasChange) return;

      node.body = _lodashCollectionSortBy2["default"](node.body, function (bodyNode) {
        var priority = bodyNode && bodyNode._blockHoist;
        if (priority == null) priority = 1;
        if (priority === true) priority = 2;

        // Higher priorities should move toward the top.
        return -1 * priority;
      });
    }
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235702, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
var FLOW_DIRECTIVE = "@flow";

/**
 * [Please add a description.]
 */

var visitor = {

  /**
   * [Please add a description.]
   */

  Program: function Program(node, parent, scope, file) {
    var _arr = file.ast.comments;

    for (var _i = 0; _i < _arr.length; _i++) {
      var comment = _arr[_i];
      if (comment.value.indexOf(FLOW_DIRECTIVE) >= 0) {
        // remove flow directive
        comment.value = comment.value.replace(FLOW_DIRECTIVE, "");

        // remove the comment completely if it only consists of whitespace and/or stars
        if (!comment.value.replace(/\*/g, "").trim()) comment._displayed = true;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  Flow: function Flow() {
    this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  ClassProperty: function ClassProperty(node) {
    node.typeAnnotation = null;
    if (!node.value) this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  Class: function Class(node) {
    node["implements"] = null;
  },

  /**
   * [Please add a description.]
   */

  Function: function Function(node) {
    for (var i = 0; i < node.params.length; i++) {
      var param = node.params[i];
      param.optional = false;
    }
  },

  /**
   * [Please add a description.]
   */

  TypeCastExpression: function TypeCastExpression(node) {
    do {
      node = node.expression;
    } while (t.isTypeCastExpression(node));
    return node;
  }
};
exports.visitor = visitor;
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235703, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true,
  group: "builtin-trailing"
};

exports.metadata = metadata;
var visitor = {
  Program: function Program(node, parent, scope, file) {
    if (file.moduleFormatter._setters) {
      scope.traverse(file.moduleFormatter._setters, optimizeSettersVisitor, {
        exportFunctionIdentifier: file.moduleFormatter.exportIdentifier
      });
    }
  }
};

exports.visitor = visitor;
/**
 * Setters are optimized to avoid slow export behavior in modules that rely on deep hierarchies
 * of export-from declarations.
 * More info in https://github.com/babel/babel/pull/1722 and
 * https://github.com/ModuleLoader/es6-module-loader/issues/386.
 *
 * TODO: Ideally this would be optimized during construction of the setters, but the current
 * architecture of the module formatters make that difficult.
 */
var optimizeSettersVisitor = {
  FunctionExpression: {
    enter: function enter(node, parent, scope, state) {
      state.hasExports = false;
      state.exportObjectIdentifier = scope.generateUidIdentifier("exportObj");
    },
    exit: function exit(node, parent, scope, state) {
      if (!state.hasExports) return;

      node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(t.cloneDeep(state.exportObjectIdentifier), t.objectExpression([]))]));
      node.body.body.push(t.expressionStatement(t.callExpression(t.cloneDeep(state.exportFunctionIdentifier), [t.cloneDeep(state.exportObjectIdentifier)])));
    }
  },
  CallExpression: function CallExpression(node, parent, scope, state) {
    if (!t.isIdentifier(node.callee, { name: state.exportFunctionIdentifier.name })) return;

    state.hasExports = true;
    var memberNode = t.memberExpression(t.cloneDeep(state.exportObjectIdentifier), node.arguments[0], true);
    return t.assignmentExpression("=", memberNode, node.arguments[1]);
  }
};
}, function(modId) { var map = {"../../../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235704, function(require, module, exports) {


exports.__esModule = true;
exports.internal = internal;
exports.blacklist = blacklist;
exports.whitelist = whitelist;
exports.stage = stage;
exports.optional = optional;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionIncludes = require("lodash/collection/includes");

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

/**
 * [Please add a description.]
 */

function internal(transformer) {
  if (transformer.key[0] === "_") return true;
}

/**
 * [Please add a description.]
 */

function blacklist(transformer, opts) {
  var blacklist = opts.blacklist;
  if (blacklist.length && _lodashCollectionIncludes2["default"](blacklist, transformer.key)) return false;
}

/**
 * [Please add a description.]
 */

function whitelist(transformer, opts) {
  var whitelist = opts.whitelist;
  if (whitelist) return _lodashCollectionIncludes2["default"](whitelist, transformer.key);
}

/**
 * [Please add a description.]
 */

function stage(transformer, opts) {
  var stage = transformer.metadata.stage;
  if (stage != null && stage >= opts.stage) return true;
}

/**
 * [Please add a description.]
 */

function optional(transformer, opts) {
  if (transformer.metadata.optional && !_lodashCollectionIncludes2["default"](opts.optional, transformer.key)) return false;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235705, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _generation = require("../generation");

var _generation2 = _interopRequireDefault(_generation);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _util = require("../util");

var util = _interopRequireWildcard(_util);

var _transformationFile = require("../transformation/file");

var _transformationFile2 = _interopRequireDefault(_transformationFile);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _types = require("../types");

var t = _interopRequireWildcard(_types);

/**
 * [Please add a description.]
 */

function buildGlobal(namespace, builder) {
  var body = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree = t.program([t.expressionStatement(t.callExpression(container, [util.template("helper-self-global")]))]);

  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([])))]));

  builder(body);

  return tree;
}

/**
 * [Please add a description.]
 */

function buildUmd(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.identifier("global"))]));

  builder(body);

  var container = util.template("umd-commonjs-strict", {
    FACTORY_PARAMETERS: t.identifier("global"),
    BROWSER_ARGUMENTS: t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression({})),
    COMMON_ARGUMENTS: t.identifier("exports"),
    AMD_ARGUMENTS: t.arrayExpression([t.literal("exports")]),
    FACTORY_BODY: body,
    UMD_ROOT: t.identifier("this")
  });
  return t.program([container]);
}

/**
 * [Please add a description.]
 */

function buildVar(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.objectExpression({}))]));
  builder(body);
  return t.program(body);
}

/**
 * [Please add a description.]
 */

function buildHelpers(body, namespace, whitelist) {
  _lodashCollectionEach2["default"](_transformationFile2["default"].helpers, function (name) {
    if (whitelist && whitelist.indexOf(name) === -1) return;

    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(namespace, key), util.template("helper-" + name))));
  });
}

/**
 * [Please add a description.]
 */

exports["default"] = function (whitelist) {
  var outputType = arguments.length <= 1 || arguments[1] === undefined ? "global" : arguments[1];

  var namespace = t.identifier("babelHelpers");

  var builder = function builder(body) {
    return buildHelpers(body, namespace, whitelist);
  };

  var tree;

  var build = ({
    global: buildGlobal,
    umd: buildUmd,
    "var": buildVar
  })[outputType];

  if (build) {
    tree = build(namespace, builder);
  } else {
    throw new Error(messages.get("unsupportedOutputType", outputType));
  }

  return _generation2["default"](tree).code;
};

module.exports = exports["default"];
}, function(modId) { var map = {"../generation":1676544235610,"../messages":1676544235569,"../util":1676544235570,"../transformation/file":1676544235592,"../types":1676544235555}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235706, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

require("../../polyfill");

var _node = require("./node");

exports["default"] = _interopRequire(_node);
module.exports = exports["default"];
}, function(modId) { var map = {"../../polyfill":1676544235707,"./node":1676544235708}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235707, function(require, module, exports) {


require("core-js/shim");

require("regenerator/runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235708, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _sourceMapSupport = require("source-map-support");

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _cache = require("./cache");

var registerCache = _interopRequireWildcard(_cache);

var _transformationFileOptionsOptionManager = require("../../transformation/file/options/option-manager");

var _transformationFileOptionsOptionManager2 = _interopRequireDefault(_transformationFileOptionsOptionManager);

var _lodashObjectExtend = require("lodash/object/extend");

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _node = require("../node");

var babel = _interopRequireWildcard(_node);

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _util = require("../../util");

var util = _interopRequireWildcard(_util);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

/**
 * Install sourcemaps into node.
 */

_sourceMapSupport2["default"].install({
  handleUncaughtExceptions: false,
  retrieveSourceMap: function retrieveSourceMap(source) {
    var map = maps && maps[source];
    if (map) {
      return {
        url: null,
        map: map
      };
    } else {
      return null;
    }
  }
});

/**
 * Load and setup cache.
 */

registerCache.load();
var cache = registerCache.get();

/**
 * Store options.
 */

var transformOpts = {};

var ignore;
var only;

var oldHandlers = {};
var maps = {};

var cwd = process.cwd();

/**
 * Get path from `filename` relative to the current working directory.
 */

var getRelativePath = function getRelativePath(filename) {
  return _path2["default"].relative(cwd, filename);
};

/**
 * Get last modified time for a `filename`.
 */

var mtime = function mtime(filename) {
  return +_fs2["default"].statSync(filename).mtime;
};

/**
 * Compile a `filename` with optional `opts`.
 */

var compile = function compile(filename) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var result;

  opts.filename = filename;

  var optsManager = new _transformationFileOptionsOptionManager2["default"]();
  optsManager.mergeOptions(transformOpts);
  opts = optsManager.init(opts);

  var cacheKey = JSON.stringify(opts) + ":" + babel.version;

  var env = process.env.BABEL_ENV || process.env.NODE_ENV;
  if (env) cacheKey += ":" + env;

  if (cache) {
    var cached = cache[cacheKey];
    if (cached && cached.mtime === mtime(filename)) {
      result = cached;
    }
  }

  if (!result) {
    result = babel.transformFileSync(filename, _lodashObjectExtend2["default"](opts, {
      sourceMap: "both",
      ast: false
    }));
  }

  if (cache) {
    result.mtime = mtime(filename);
    cache[cacheKey] = result;
  }

  maps[filename] = result.map;

  return result.code;
};

/**
 * Test if a `filename` should be ignored by Babel.
 */

var shouldIgnore = function shouldIgnore(filename) {
  if (!ignore && !only) {
    return getRelativePath(filename).split(_path2["default"].sep).indexOf("node_modules") >= 0;
  } else {
    return util.shouldIgnore(filename, ignore || [], only);
  }
};

/**
 * Monkey patch istanbul if it is running so that it works properly.
 */

var istanbulMonkey = {};

if (process.env.running_under_istanbul) {
  // we need to monkey patch fs.readFileSync so we can hook into
  // what istanbul gets, it's extremely dirty but it's the only way
  var _readFileSync = _fs2["default"].readFileSync;

  _fs2["default"].readFileSync = function (filename) {
    if (istanbulMonkey[filename]) {
      delete istanbulMonkey[filename];
      var code = compile(filename, {
        auxiliaryCommentBefore: "istanbul ignore next"
      });
      istanbulMonkey[filename] = true;
      return code;
    } else {
      return _readFileSync.apply(this, arguments);
    }
  };
}

/**
 * Replacement for the loader for istanbul.
 */

var istanbulLoader = function istanbulLoader(m, filename, old) {
  istanbulMonkey[filename] = true;
  old(m, filename);
};

/**
 * Default loader.
 */

var normalLoader = function normalLoader(m, filename) {
  m._compile(compile(filename), filename);
};

/**
 * Register a loader for an extension.
 */

var registerExtension = function registerExtension(ext) {
  var old = oldHandlers[ext] || oldHandlers[".js"] || require.extensions[".js"];

  var loader = normalLoader;
  if (process.env.running_under_istanbul) loader = istanbulLoader;

  require.extensions[ext] = function (m, filename) {
    if (shouldIgnore(filename)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
};

/**
 * Register loader for given extensions.
 */

var hookExtensions = function hookExtensions(_exts) {
  _lodashCollectionEach2["default"](oldHandlers, function (old, ext) {
    if (old === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = old;
    }
  });

  oldHandlers = {};

  _lodashCollectionEach2["default"](_exts, function (ext) {
    oldHandlers[ext] = require.extensions[ext];
    registerExtension(ext);
  });
};

/**
 * Register loader for default extensions.
 */

hookExtensions(util.canCompile.EXTENSIONS);

/**
 * Update options at runtime.
 */

exports["default"] = function () {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (opts.only != null) only = util.arrayify(opts.only, util.regexify);
  if (opts.ignore != null) ignore = util.arrayify(opts.ignore, util.regexify);

  if (opts.extensions) hookExtensions(util.arrayify(opts.extensions));

  if (opts.cache === false) cache = null;

  delete opts.extensions;
  delete opts.ignore;
  delete opts.cache;
  delete opts.only;

  _lodashObjectExtend2["default"](transformOpts, opts);
};

module.exports = exports["default"];
}, function(modId) { var map = {"./cache":1676544235709,"../../transformation/file/options/option-manager":1676544235606,"../node":1676544235543,"../../util":1676544235570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235709, function(require, module, exports) {


exports.__esModule = true;
exports.save = save;
exports.load = load;
exports.get = get;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _homeOrTmp = require("home-or-tmp");

var _homeOrTmp2 = _interopRequireDefault(_homeOrTmp);

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var FILENAME = process.env.BABEL_CACHE_PATH || _path2["default"].join(_homeOrTmp2["default"], ".babel.json");
var data = {};

/**
 * Write stringified cache to disk.
 */

function save() {
  _fs2["default"].writeFileSync(FILENAME, JSON.stringify(data, null, "  "));
}

/**
 * Load cache from disk and parse.
 */

function load() {
  if (process.env.BABEL_DISABLE_CACHE) return;

  process.on("exit", save);
  process.nextTick(save);

  if (!_pathExists2["default"].sync(FILENAME)) return;

  try {
    data = JSON.parse(_fs2["default"].readFileSync(FILENAME));
  } catch (err) {
    return;
  }
}

/**
 * Retrieve data from cache.
 */

function get() {
  return data;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235542);
})()
//miniprogram-npm-outsideDeps=["lodash/lang/isFunction","babylon","fs","../transformation/file/options/config","../../package","./transformers/deprecated","./transformers/aliases","lodash/object/assign","try-resolve","lodash/lang/clone","lodash/collection/includes","to-fast-properties","lodash/array/compact","lodash/collection/each","lodash/array/uniq","esutils","lodash/lang/isPlainObject","lodash/lang/isNumber","lodash/lang/isRegExp","lodash/lang/isString","repeating","lodash/object/defaults","globals","lodash/array/flatten","lodash/object/extend","lodash/string/escapeRegExp","lodash/string/startsWith","lodash/lang/cloneDeep","lodash/lang/isBoolean","minimatch","lodash/collection/contains","lodash/lang/isEmpty","path","lodash/object/has","slash","path-exists","js-tokens","chalk","convert-source-map","shebang-regex","source-map","lodash/object/values","lodash/array/last","lodash/collection/map","json5","path-is-absolute","./config","lodash/object/merge","detect-indent","trim-right","lodash/collection/some","is-integer","debug/node","babel-plugin-constant-folding","babel-plugin-eval","babel-plugin-remove-debugger","babel-plugin-remove-console","babel-plugin-inline-environment-variables","babel-plugin-dead-code-elimination","babel-plugin-react-display-name","babel-plugin-undeclared-variables-check","babel-plugin-react-constant-elements","babel-plugin-proto-to-assign","babel-plugin-undefined-to-void","babel-plugin-runtime","babel-plugin-member-expression-literals","babel-plugin-property-literals","babel-plugin-jscript","lodash/array/pull","regexpu/rewrite-pattern","lodash/collection/reduceRight","lodash/collection/sortBy","core-js/shim","regenerator/runtime","source-map-support","home-or-tmp"]
//# sourceMappingURL=index.js.map