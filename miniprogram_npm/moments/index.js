module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236282, function(require, module, exports) {
const add = require('./lib/add')
const print = require('./lib/print')
const remove = require('./lib/remove')

module.exports = function (argv) {
  switch (argv._[0]) {
    case 'add':
      add(argv)
      break
    case 'remove':
      remove(argv)
      break
    default:
      print()
  }
}

}, function(modId) {var map = {"./lib/add":1676544236283,"./lib/print":1676544236285,"./lib/remove":1676544236286}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236283, function(require, module, exports) {
const inq = require('inquirer')
const timezones = require('./timezones')
const Fuse = require('fuse.js')
const config = require('./config')

var keyword
module.exports = function (argv) {
  const q = [
    {
      type: 'input',
      message: 'type a keyword of City or Country name to add it (eg: london):',
      name: 'keyword',
      validate (val) {
        return !!val
      }
    }
  ]
  const options = {
    /* default options
    caseSensitive: false,
    includeScore: false,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    */
    keys: ['value', 'text']
  }

  if (argv._[1]) {
    keyword = argv._[1]
    search(keyword, options)
  } else {
    inq.prompt(q, a => {
      keyword = a.keyword
      search(keyword, options)
    })
  }

  function search (key, options) {
    const fuse = new Fuse(timezones, options)
    const matches = fuse.search(key)
    if (!matches || matches.length === 0 ){
      return console.log('no matched timezone'.red)
    }
    askIndex(matches)
  }

  function askIndex (matches) {
    const q = [
      {
        type: 'list',
        message: `Here are ${matches.length} matched timezones, select one:`,
        choices: matches.map(m => {
          const plus = m.offset > 0 ? '+' : ''
          const offset = plus + m.offset.toString()
          return `[${offset}]${' '.repeat(6 - offset.length)}${m.value}`
        }),
        name: 'name'
      }
    ]
    inq.prompt(q, a => {
      const timezone = getTimezoneByName(a.name.replace(/([(0-9)\[\]\+\-\. ])+/i, ''))
      timezone.input = keyword
      console.log(`\n${'√'.green} You\'ve selected:\n\n${a.name.gray} ${timezone.text.gray}\n`)
      config
        .get('timezones')
        .then(addTimezone)

      function addTimezone (ts) {
        ts = ts || []
        if (checkTimezoneExists(ts, timezone.value)) {
          return console.log('Timezone already existed in config file!\n'.red)
        }
        ts.push(timezone)
        config
          .set('timezones', ts)
          .then(ts => {
            console.log('Success!'.green)
          })
          .catch(err => console.log(err))
      }
    })
  }

  function checkTimezoneExists (ts, value) {
    for (var i = 0; i < ts.length; i++) {
      if (ts[i].value === value) {
        return true
      }
    }
    return false
  }

  function getTimezoneByName (name) {
    for (var i = 0; i < timezones.length; i++) {
      if (timezones[i].value === name) {
        return timezones[i]
      }
    }
  }
}

}, function(modId) { var map = {"./config":1676544236284}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236284, function(require, module, exports) {
const Config = require('myconf')
module.exports = new Config('.momentsrc')

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236285, function(require, module, exports) {
const moment = require('moment')
const config = require('./config')
const logUpdate = require('log-update')

module.exports = function (argv) {
  config
    .get('timezones')
    .then(parseTimezones)
    .catch(err => console.log(err))

  function parseTimezones (ts) {
    if (!ts || ts.length === 0) {
      return console.log(`run ${'mm add'.cyan} to add timezone first`)
    }
    setInterval(() => {
      const result = ts.map(t => {
        return `[ ${t.value.gray + ' ('.gray + t.input.gray + ')'.gray} ]\n${moment().utcOffset(t.offset)}`
      }).join('\n\n')
      logUpdate(result)
    }, 1000)
  }
}

}, function(modId) { var map = {"./config":1676544236284}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236286, function(require, module, exports) {
const config = require('./config')
const inq = require('inquirer')

module.exports = function (argv) {
  config
    .get('timezones')
    .then(removeTimezone)
    .catch(err => console.log(err))

  function removeTimezone (ts) {
    const q = [
      {
        type: 'list',
        choices: ts.map(t => `${t.value} (${t.input})`),
        name: 'choice',
        message: 'Choose a timezone to remove:'
      }
    ]
    inq.prompt(q, a => {
      const re = /([a-zA-Z0-9 ])+/i
      const name = a.choice.match(re)[0].trim()
      if (!name) {
        return console.log('nothing matches'.red)
      }
      removeTimezoneByName(ts, name)
    })
  }

  function removeTimezoneByName (ts, name) {
    ts = ts.filter(t => {
      return t.value !== name
    })
    config
      .set('timezones', ts)
      .then(ts => {
        console.log(`You've removed ${name}!`.green)
      })
  }
}

}, function(modId) { var map = {"./config":1676544236284}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236282);
})()
//miniprogram-npm-outsideDeps=["inquirer","./timezones","fuse.js","myconf","moment","log-update"]
//# sourceMappingURL=index.js.map