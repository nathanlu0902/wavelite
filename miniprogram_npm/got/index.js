module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236131, function(require, module, exports) {

var http = require('http');
var https = require('https');
var urlLib = require('url');
var util = require('util');
var zlib = require('zlib');
var querystring = require('querystring');
var objectAssign = require('object-assign');
var infinityAgent = require('infinity-agent');
var duplexify = require('duplexify');
var isStream = require('is-stream');
var readAllStream = require('read-all-stream');
var timedOut = require('timed-out');
var prependHttp = require('prepend-http');
var lowercaseKeys = require('lowercase-keys');
var isRedirect = require('is-redirect');
var NestedErrorStacks = require('nested-error-stacks');

function GotError(message, nested) {
	NestedErrorStacks.call(this, message, nested);
	objectAssign(this, nested, {nested: this.nested});
}

util.inherits(GotError, NestedErrorStacks);
GotError.prototype.name = 'GotError';

function got(url, opts, cb) {
	if (typeof url !== 'string' && typeof url !== 'object') {
		throw new GotError('Parameter `url` must be a string or object, not ' + typeof url);
	}

	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	opts = objectAssign(
		{
			protocol: 'http:'
		},
		typeof url === 'string' ? urlLib.parse(prependHttp(url)) : url,
		opts
	);

	opts.headers = objectAssign({
		'user-agent': 'https://github.com/sindresorhus/got',
		'accept-encoding': 'gzip,deflate'
	}, lowercaseKeys(opts.headers));

	if (opts.pathname) {
		opts.path = opts.pathname;
	}

	if (opts.query) {
		if (typeof opts.query !== 'string') {
			opts.query = querystring.stringify(opts.query);
		}

		opts.path = opts.pathname + '?' + opts.query;
		delete opts.query;
	}

	var encoding = opts.encoding;
	var body = opts.body;
	var json = opts.json;
	var timeout = opts.timeout;
	var proxy;
	var redirectCount = 0;

	delete opts.encoding;
	delete opts.body;
	delete opts.json;
	delete opts.timeout;

	if (json) {
		opts.headers.accept = opts.headers.accept || 'application/json';
	}

	if (body) {
		if (typeof body !== 'string' && !Buffer.isBuffer(body) && !isStream.readable(body)) {
			throw new GotError('options.body must be a ReadableStream, string or Buffer');
		}

		opts.method = opts.method || 'POST';

		if (!opts.headers['content-length'] && !opts.headers['transfer-encoding'] && !isStream.readable(body)) {
			var length = typeof body === 'string' ? Buffer.byteLength(body) : body.length;
			opts.headers['content-length'] = length;
		}
	}

	opts.method = opts.method || 'GET';

	// returns a proxy stream to the response
	// if no callback has been provided
	if (!cb) {
		proxy = duplexify();

		// forward errors on the stream
		cb = function (err, data, response) {
			proxy.emit('error', err, data, response);
		};
	}

	if (proxy && json) {
		throw new GotError('got can not be used as stream when options.json is used');
	}

	function get(opts, cb) {
		var fn = opts.protocol === 'https:' ? https : http;
		var url = urlLib.format(opts);

		if (opts.agent === undefined) {
			opts.agent = infinityAgent[fn === https ? 'https' : 'http'].globalAgent;

			if (process.version.indexOf('v0.10') === 0 && fn === https && (
				typeof opts.ca !== 'undefined' ||
				typeof opts.cert !== 'undefined' ||
				typeof opts.ciphers !== 'undefined' ||
				typeof opts.key !== 'undefined' ||
				typeof opts.passphrase !== 'undefined' ||
				typeof opts.pfx !== 'undefined' ||
				typeof opts.rejectUnauthorized !== 'undefined')) {
				opts.agent = new infinityAgent.https.Agent({
					ca: opts.ca,
					cert: opts.cert,
					ciphers: opts.ciphers,
					key: opts.key,
					passphrase: opts.passphrase,
					pfx: opts.pfx,
					rejectUnauthorized: opts.rejectUnauthorized
				});
			}
		}

		var req = fn.request(opts, function (response) {
			var statusCode = response.statusCode;
			var res = response;

			// auto-redirect only for GET and HEAD methods
			if (isRedirect(statusCode) && 'location' in res.headers && (opts.method === 'GET' || opts.method === 'HEAD')) {
				// discard response
				res.resume();

				if (++redirectCount > 10) {
					cb(new GotError('Redirected 10 times. Aborting.'), undefined, res);
					return;
				}

				var redirectUrl = urlLib.resolve(url, res.headers.location);
				var redirectOpts = objectAssign({}, opts, urlLib.parse(redirectUrl));

				if (opts.agent === infinityAgent.http.globalAgent && redirectOpts.protocol === 'https:' && opts.protocol === 'http:') {
					redirectOpts.agent = undefined;
				}

				if (proxy) {
					proxy.emit('redirect', res, redirectOpts);
				}

				get(redirectOpts, cb);
				return;
			}

			if (proxy) {
				proxy.emit('response', res);
			}

			if (['gzip', 'deflate'].indexOf(res.headers['content-encoding']) !== -1) {
				res = res.pipe(zlib.createUnzip());
			}

			if (statusCode < 200 || statusCode > 299) {
				readAllStream(res, encoding, function (err, data) {
					err = new GotError(opts.method + ' ' + url + ' response code is ' + statusCode + ' (' + http.STATUS_CODES[statusCode] + ')', err);
					err.code = statusCode;

					if (data && json) {
						try {
							data = JSON.parse(data);
						} catch (e) {
							err = new GotError('Parsing ' + url + ' response failed', new GotError(e.message, err));
						}
					}

					cb(err, data, response);
				});

				return;
			}

			// pipe the response to the proxy if in proxy mode
			if (proxy) {
				proxy.setReadable(res);
				return;
			}

			readAllStream(res, encoding, function (err, data) {
				if (err) {
					err = new GotError('Reading ' + url + ' response failed', err);
				} else if (json && statusCode !== 204) {
					// only parse json if the option is enabled, and the response
					// is not a 204 (empty reponse)
					try {
						data = JSON.parse(data);
					} catch (e) {
						err = new GotError('Parsing ' + url + ' response failed', e);
					}
				}

				cb(err, data, response);
			});
		}).once('error', function (err) {
			cb(new GotError('Request to ' + url + ' failed', err));
		});

		if (timeout) {
			timedOut(req, timeout);
		}

		if (!proxy) {
			if (isStream.readable(body)) {
				body.pipe(req);
			} else {
				req.end(body);
			}

			return;
		}

		if (body) {
			proxy.write = function () {
				throw new Error('got\'s stream is not writable when options.body is used');
			};

			if (isStream.readable(body)) {
				body.pipe(req);
			} else {
				req.end(body);
			}

			return;
		}

		if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
			proxy.setWritable(req);
			return;
		}

		req.end();
	}

	get(opts, cb);

	return proxy;
}

[
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
].forEach(function (el) {
	got[el] = function (url, opts, cb) {
		if (typeof opts === 'function') {
			cb = opts;
			opts = {};
		}

		return got(url, objectAssign({}, opts, {method: el.toUpperCase()}), cb);
	};
});

module.exports = got;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236131);
})()
//miniprogram-npm-outsideDeps=["http","https","url","util","zlib","querystring","object-assign","infinity-agent","duplexify","is-stream","read-all-stream","timed-out","prepend-http","lowercase-keys","is-redirect","nested-error-stacks"]
//# sourceMappingURL=index.js.map