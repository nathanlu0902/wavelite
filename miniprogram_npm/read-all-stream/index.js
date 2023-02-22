module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236341, function(require, module, exports) {


var Writable = require('readable-stream').Writable;
var inherits = require('util').inherits;
var Promise = require('pinkie-promise');

function BufferStream() {
	Writable.call(this, { objectMode: true });
	this.buffer = [];
	this.length = 0;
}

inherits(BufferStream, Writable);
BufferStream.prototype._write = function(chunk, enc, next) {
	if (!Buffer.isBuffer(chunk)) {
		chunk = new Buffer(chunk);
	}

	this.buffer.push(chunk);
	this.length += chunk.length;
	next();
};

module.exports = function read(stream, options, cb) {
	if (!stream) {
		throw new Error('stream argument is required');
	}

	if (typeof options === 'function') {
		cb = options;
		options = {};
	}

	if (typeof options === 'string' || options === undefined || options === null) {
		options = { encoding: options };
	}

	if (options.encoding === undefined) { options.encoding = 'utf8'; }

	var promise;

	if (!cb) {
		var resolve, reject;
		promise = new Promise(function(_res, _rej) {
			resolve = _res;
			reject = _rej;
		});

		cb = function (err, data) {
			if (err) { return reject(err); }
			resolve(data);
		};
	}

	var sink = new BufferStream();

	sink.on('finish', function () {
		var data = Buffer.concat(this.buffer, this.length);

		if (options.encoding) {
			data = data.toString(options.encoding);
		}

		cb(null, data);
	});

	stream.once('error', cb);

	stream.pipe(sink);

	return promise;
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236341);
})()
//miniprogram-npm-outsideDeps=["readable-stream","util","pinkie-promise"]
//# sourceMappingURL=index.js.map