module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236458, function(require, module, exports) {
// simple-is.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013 Olov Lassus <olov.lassus@gmail.com>

var is = (function() {
    

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    var _undefined = void 0;

    return {
        nan: function(v) {
            return v !== v;
        },
        boolean: function(v) {
            return typeof v === "boolean";
        },
        number: function(v) {
            return typeof v === "number";
        },
        string: function(v) {
            return typeof v === "string";
        },
        fn: function(v) {
            return typeof v === "function";
        },
        object: function(v) {
            return v !== null && typeof v === "object";
        },
        primitive: function(v) {
            var t = typeof v;
            return v === null || v === _undefined ||
                t === "boolean" || t === "number" || t === "string";
        },
        array: Array.isArray || function(v) {
            return toString.call(v) === "[object Array]";
        },
        finitenumber: function(v) {
            return typeof v === "number" && isFinite(v);
        },
        someof: function(v, values) {
            return values.indexOf(v) >= 0;
        },
        noneof: function(v, values) {
            return values.indexOf(v) === -1;
        },
        own: function(obj, prop) {
            return hasOwnProperty.call(obj, prop);
        },
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = is;
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236458);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map