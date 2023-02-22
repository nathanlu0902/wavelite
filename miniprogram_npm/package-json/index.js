module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236322, function(require, module, exports) {

var got = require('got');
var registryUrl = require('registry-url');

function get(url, cb) {
	got(url, {json: true}, function (err, data) {
		if (err && err.code === 404) {
			cb(new Error('Package or version doesn\'t exist'));
			return;
		}

		if (err) {
			cb(err);
			return;
		}

		cb(null, data);
	});
}

module.exports = function (name, version, cb) {
	var url = registryUrl(name.split('/')[0]) + name + '/';

	if (typeof version !== 'string') {
		cb = version;
		version = '';
	}

	get(url + version, cb);
};

module.exports.field = function (name, field, cb) {
	var url = registryUrl(name.split('/')[0]) +
		'-/by-field/?key=%22' + name + '%22&field=' + field;

	get(url, function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		if (Object.keys(res).length === 0) {
			cb(new Error('Field `' + field + '` doesn\'t exist'));
			return;
		}

		cb(null, res[name][field]);
	});
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236322);
})()
//miniprogram-npm-outsideDeps=["got","registry-url"]
//# sourceMappingURL=index.js.map