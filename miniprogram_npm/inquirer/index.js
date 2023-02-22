module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544236175, function(require, module, exports) {
/**
 * Inquirer.js
 * A collection of common interactive command line user interfaces.
 */

var inquirer = module.exports;


/**
 * Client interfaces
 */

inquirer.prompts = {};

inquirer.Separator = require('./objects/separator');

inquirer.ui = {
  BottomBar: require('./ui/bottom-bar'),
  Prompt: require('./ui/prompt')
};

/**
 * Create a new self-contained prompt module.
 */
inquirer.createPromptModule = function (opt) {
  var promptModule = function (questions, allDone) {
    var ui = new inquirer.ui.Prompt(promptModule.prompts, opt);
    ui.run(questions, allDone);
    return ui;
  };
  promptModule.prompts = {};

  /**
   * Register a prompt type
   * @param {String} name     Prompt type name
   * @param {Function} prompt Prompt constructor
   * @return {inquirer}
   */

  promptModule.registerPrompt = function (name, prompt) {
    promptModule.prompts[name] = prompt;
    return this;
  };

  /**
   * Register the defaults provider prompts
   */

  promptModule.restoreDefaultPrompts = function () {
    this.registerPrompt('list', require('./prompts/list'));
    this.registerPrompt('input', require('./prompts/input'));
    this.registerPrompt('confirm', require('./prompts/confirm'));
    this.registerPrompt('rawlist', require('./prompts/rawlist'));
    this.registerPrompt('expand', require('./prompts/expand'));
    this.registerPrompt('checkbox', require('./prompts/checkbox'));
    this.registerPrompt('password', require('./prompts/password'));
  };

  promptModule.restoreDefaultPrompts();

  return promptModule;
};

/**
 * Public CLI helper interface
 * @param  {Array|Object|rx.Observable} questions - Questions settings array
 * @param  {Function} cb - Callback being passed the user answers
 * @return {inquirer.ui.Prompt}
 */

inquirer.prompt = inquirer.createPromptModule();

// Expose helper functions on the top level for easiest usage by common users
inquirer.registerPrompt = function (name, prompt) {
  inquirer.prompt.registerPrompt(name, prompt);
};
inquirer.restoreDefaultPrompts = function () {
  inquirer.prompt.restoreDefaultPrompts();
};

}, function(modId) {var map = {"./objects/separator":1676544236176,"./ui/bottom-bar":1676544236177,"./ui/prompt":1676544236180,"./prompts/list":1676544236182,"./prompts/input":1676544236189,"./prompts/confirm":1676544236190,"./prompts/rawlist":1676544236191,"./prompts/expand":1676544236192,"./prompts/checkbox":1676544236193,"./prompts/password":1676544236194}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236176, function(require, module, exports) {

var chalk = require('chalk');
var figures = require('figures');


/**
 * Separator object
 * Used to space/separate choices group
 * @constructor
 * @param {String} line   Separation line content (facultative)
 */

var Separator = module.exports = function (line) {
  this.type = 'separator';
  this.line = chalk.dim(line || new Array(15).join(figures.line));
};

/**
 * Helper function returning false if object is a separator
 * @param  {Object} obj object to test against
 * @return {Boolean}    `false` if object is a separator
 */

Separator.exclude = function (obj) {
  return obj.type !== 'separator';
};

/**
 * Stringify separator
 * @return {String} the separator display string
 */

Separator.prototype.toString = function () {
  return this.line;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236177, function(require, module, exports) {
/**
 * Sticky bottom bar user interface
 */

var util = require("util");
var through = require("through");
var Base = require("./baseUI");
var rlUtils = require("../utils/readline");
var _ = require("lodash");


/**
 * Module exports
 */

module.exports = Prompt;

/**
 * Constructor
 */

function Prompt( opt ) {
  opt || (opt = {});

  Base.apply( this, arguments );

  this.log = through( this.writeLog.bind(this) );
  this.bottomBar = opt.bottomBar || "";
  this.render();
}
util.inherits( Prompt, Base );


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function() {
  this.write(this.bottomBar);
  return this;
};


/**
 * Update the bottom bar content and rerender
 * @param  {String} bottomBar Bottom bar content
 * @return {Prompt}           self
 */

Prompt.prototype.updateBottomBar = function( bottomBar ) {
  this.bottomBar = bottomBar;
  rlUtils.clearLine(this.rl, 1);
  return this.render();
};


/**
 * Rerender the prompt
 * @return {Prompt} self
 */

Prompt.prototype.writeLog = function( data ) {
  rlUtils.clearLine(this.rl, 1);
  this.rl.output.write(this.enforceLF(data.toString()));
  return this.render();
};


/**
 * Make sure line end on a line feed
 * @param  {String} str Input string
 * @return {String}     The input string with a final line feed
 */

Prompt.prototype.enforceLF = function( str ) {
  return str.match(/[\r\n]$/) ? str : str + "\n";
};

/**
 * Helper for writing message in Prompt
 * @param {Prompt} prompt  - The Prompt object that extends tty
 * @param {String} message - The message to be output
 */
Prompt.prototype.write = function (message) {
  var msgLines = message.split(/\n/);
  this.height = msgLines.length;

  // Write message to screen and setPrompt to control backspace
  this.rl.setPrompt( _.last(msgLines) );

  if ( this.rl.output.rows === 0 && this.rl.output.columns === 0 ) {
    /* When it's a tty through serial port there's no terminal info and the render will malfunction,
       so we need enforce the cursor to locate to the leftmost position for rendering. */
    rlUtils.left( this.rl, message.length + this.rl.line.length );
  }
  this.rl.output.write( message );
};

}, function(modId) { var map = {"./baseUI":1676544236178,"../utils/readline":1676544236179}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236178, function(require, module, exports) {

var _ = require('lodash');
var readlineFacade = require('readline2');


/**
 * Base interface class other can inherits from
 */

var UI = module.exports = function (opt) {
  // Instantiate the Readline interface
  // @Note: Don't reassign if already present (allow test to override the Stream)
  if (!this.rl) {
    this.rl = readlineFacade.createInterface(_.extend({
      terminal: true
    }, opt));
  }
  this.rl.resume();

  this.onForceClose = this.onForceClose.bind(this);

  // Make sure new prompt start on a newline when closing
  this.rl.on('SIGINT', this.onForceClose);
  process.on('exit', this.onForceClose);
};


/**
 * Handle the ^C exit
 * @return {null}
 */

UI.prototype.onForceClose = function () {
  this.close();
  console.log('\n'); // Line return
};


/**
 * Close the interface and cleanup listeners
 */

UI.prototype.close = function () {
  // Remove events listeners
  this.rl.removeListener('SIGINT', this.onForceClose);
  process.removeListener('exit', this.onForceClose);

  // Restore prompt functionnalities
  this.rl.output.unmute();

  // Close the readline
  this.rl.output.end();
  this.rl.pause();
  this.rl.close();
  this.rl = null;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236179, function(require, module, exports) {

var ansiEscapes = require('ansi-escapes');

/**
 * Move cursor left by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go left (default to 1)
 */

exports.left = function(rl, x) {
  rl.output.write(ansiEscapes.cursorBackward(x));
};

/**
 * Move cursor right by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go left (default to 1)
 */

exports.right = function(rl, x) {
  rl.output.write(ansiEscapes.cursorForward(x));
};

/**
 * Move cursor up by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go up (default to 1)
 */

exports.up = function (rl, x) {
  rl.output.write(ansiEscapes.cursorUp(x));
};

/**
 * Move cursor down by `x`
 * @param  {Readline} rl - Readline instance
 * @param  {Number}   x  - How far to go down (default to 1)
 */

exports.down = function (rl, x) {
  rl.output.write(ansiEscapes.cursorDown(x));
};

/**
 * Clear current line
 * @param  {Readline} rl  - Readline instance
 * @param  {Number}   len - number of line to delete
 */
exports.clearLine = function (rl, len) {
  rl.output.write(ansiEscapes.eraseLines(len));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236180, function(require, module, exports) {

var _ = require('lodash');
var rx = require('rx-lite');
var util = require('util');
var runAsync = require('run-async');
var utils = require('../utils/utils');
var Base = require('./baseUI');


/**
 * Base interface class other can inherits from
 */

var PromptUI = module.exports = function (prompts, opt) {
  Base.call(this, opt);
  this.prompts = prompts;
};
util.inherits(PromptUI, Base);

PromptUI.prototype.run = function (questions, allDone) {
  // Keep global reference to the answers
  this.answers = {};
  this.completed = allDone;

  // Make sure questions is an array.
  if (_.isPlainObject(questions)) {
    questions = [questions];
  }

  // Create an observable, unless we received one as parameter.
  // Note: As this is a public interface, we cannot do an instanceof check as we won't
  // be using the exact same object in memory.
  var obs = _.isArray(questions) ? rx.Observable.from(questions) : questions;

  this.process = obs
    .concatMap(this.processQuestion.bind(this))
    .publish(); // `publish` creates a hot Observable. It prevents duplicating prompts.

  this.process.subscribe(
    _.noop,
    function (err) { throw err; },
    this.onCompletion.bind(this)
  );

  return this.process.connect();
};


/**
 * Once all prompt are over
 */

PromptUI.prototype.onCompletion = function () {
  this.close();

  if (_.isFunction(this.completed)) {
    this.completed(this.answers);
  }
};

PromptUI.prototype.processQuestion = function (question) {
  return rx.Observable.defer(function () {
    var obs = rx.Observable.create(function (obs) {
      obs.onNext(question);
      obs.onCompleted();
    });

    return obs
      .concatMap(this.setDefaultType.bind(this))
      .concatMap(this.filterIfRunnable.bind(this))
      .concatMap(utils.fetchAsyncQuestionProperty.bind(null, question, 'message', this.answers))
      .concatMap(utils.fetchAsyncQuestionProperty.bind(null, question, 'default', this.answers))
      .concatMap(utils.fetchAsyncQuestionProperty.bind(null, question, 'choices', this.answers))
      .concatMap(this.fetchAnswer.bind(this));
  }.bind(this));
};

PromptUI.prototype.fetchAnswer = function (question) {
  var Prompt = this.prompts[question.type];
  var prompt = new Prompt(question, this.rl, this.answers);
  var answers = this.answers;
  return utils.createObservableFromAsync(function () {
    var done = this.async();
    prompt.run(function (answer) {
      answers[question.name] = answer;
      done({ name: question.name, answer: answer });
    });
  });
};

PromptUI.prototype.setDefaultType = function (question) {
  // Default type to input
  if (!this.prompts[question.type]) {
    question.type = 'input';
  }
  return rx.Observable.defer(function () {
    return rx.Observable.return(question);
  });
};

PromptUI.prototype.filterIfRunnable = function (question) {
  if (question.when == null) {
    return rx.Observable.return(question);
  }

  var handleResult = function (obs, shouldRun) {
    if (shouldRun) {
      obs.onNext(question);
    }
    obs.onCompleted();
  };

  var answers = this.answers;
  return rx.Observable.defer(function () {
    return rx.Observable.create(function (obs) {
      if (_.isBoolean(question.when)) {
        handleResult(obs, question.when);
        return;
      }

      runAsync(question.when, function (shouldRun) {
        handleResult(obs, shouldRun);
      }, answers);
    });
  });
};

}, function(modId) { var map = {"../utils/utils":1676544236181,"./baseUI":1676544236178}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236181, function(require, module, exports) {

var _ = require('lodash');
var rx = require('rx-lite');
var runAsync = require('run-async');


/**
 * Create an oversable returning the result of a function runned in sync or async mode.
 * @param  {Function} func Function to run
 * @return {rx.Observable} Observable emitting when value is known
 */

exports.createObservableFromAsync = function (func) {
  return rx.Observable.defer(function () {
    return rx.Observable.create(function (obs) {
      runAsync(func, function (value) {
        obs.onNext(value);
        obs.onCompleted();
      });
    });
  });
};


/**
 * Resolve a question property value if it is passed as a function.
 * This method will overwrite the property on the question object with the received value.
 * @param  {Object} question - Question object
 * @param  {String} prop     - Property to fetch name
 * @param  {Object} answers  - Answers object
 * @...rest {Mixed} rest     - Arguments to pass to `func`
 * @return {rx.Obsersable}   - Observable emitting once value is known
 */

exports.fetchAsyncQuestionProperty = function (question, prop, answers) {
  if (!_.isFunction(question[prop])) {
    return rx.Observable.return(question);
  }

  return exports.createObservableFromAsync(function () {
    var done = this.async();
    runAsync(question[prop], function (value) {
      question[prop] = value;
      done(question);
    }, answers);
  });
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236182, function(require, module, exports) {
/**
 * `list` type prompt
 */

var _ = require("lodash");
var util = require("util");
var chalk = require("chalk");
var figures = require("figures");
var cliCursor = require("cli-cursor");
var Base = require("./base");
var observe = require("../utils/events");
var Paginator = require("../utils/paginator");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );

  if (!this.opt.choices) {
    this.throwParamError("choices");
  }

  this.firstRender = true;
  this.selected = 0;

  var def = this.opt.default;

  // Default being a Number
  if ( _.isNumber(def) && def >= 0 && def < this.opt.choices.realLength ) {
    this.selected = def;
  }

  // Default being a String
  if ( _.isString(def) ) {
    this.selected = this.opt.choices.pluck("value").indexOf( def );
  }

  // Make sure no default is set (so it won't be printed)
  this.opt.default = null;

  this.paginator = new Paginator();
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  var events = observe(this.rl);
  events.normalizedUpKey.takeUntil( events.line ).forEach( this.onUpKey.bind(this) );
  events.normalizedDownKey.takeUntil( events.line ).forEach( this.onDownKey.bind(this) );
  events.numberKey.takeUntil( events.line ).forEach( this.onNumberKey.bind(this) );
  events.line.take(1).forEach( this.onSubmit.bind(this) );

  // Init the prompt
  cliCursor.hide();
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function() {
  // Render question
  var message = this.getQuestion();

  if ( this.firstRender ) {
    message += chalk.dim( "(Use arrow keys)" );
  }

  // Render choices or answer depending on the state
  if ( this.status === "answered" ) {
    message += chalk.cyan( this.opt.choices.getChoice(this.selected).short );
  } else {
    var choicesStr = listRender(this.opt.choices, this.selected );
    var indexPosition = this.opt.choices.indexOf(this.opt.choices.getChoice(this.selected));
    message += "\n" + this.paginator.paginate(choicesStr, indexPosition, this.opt.pageSize);
  }

  this.firstRender = false;

  this.screen.render(message);
};


/**
 * When user press `enter` key
 */

Prompt.prototype.onSubmit = function() {
  var choice = this.opt.choices.getChoice( this.selected );
  this.status = "answered";

  // Rerender prompt
  this.render();

  this.screen.done();
  cliCursor.show();
  this.done( choice.value );
};


/**
 * When user press a key
 */
Prompt.prototype.onUpKey = function() {
  var len = this.opt.choices.realLength;
  this.selected = (this.selected > 0) ? this.selected - 1 : len - 1;
  this.render();
};

Prompt.prototype.onDownKey = function() {
  var len = this.opt.choices.realLength;
  this.selected = (this.selected < len - 1) ? this.selected + 1 : 0;
  this.render();
};

Prompt.prototype.onNumberKey = function( input ) {
  if ( input <= this.opt.choices.realLength ) {
    this.selected = input - 1;
  }
  this.render();
};


/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */
 function listRender(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function (choice, i) {
    if (choice.type === 'separator') {
      separatorOffset++;
      output += '  ' + choice + '\n';
      return;
    }

    var isSelected = (i - separatorOffset === pointer);
    var line = (isSelected ? figures.pointer + ' ' : '  ') + choice.name;
    if (isSelected) {
      line = chalk.cyan(line);
    }
    output += line + ' \n';
  });

  return output.replace(/\n$/, '');
}

}, function(modId) { var map = {"./base":1676544236183,"../utils/events":1676544236187,"../utils/paginator":1676544236188}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236183, function(require, module, exports) {
/**
 * Base prompt implementation
 * Should be extended by prompt types.
 */

var rx = require('rx-lite');
var _ = require('lodash');
var chalk = require('chalk');
var ansiRegex = require('ansi-regex');
var runAsync = require('run-async');
var Choices = require('../objects/choices');
var ScreenManager = require('../utils/screen-manager');


var Prompt = module.exports = function (question, rl, answers) {

  // Setup instance defaults property
  _.assign(this, {
    answers: answers,
    status : 'pending'
  });

  // Set defaults prompt options
  this.opt = _.defaults(_.clone(question), {
    validate: function () { return true; },
    filter: function (val) { return val; },
    when: function () { return true; }
  });

  // Check to make sure prompt requirements are there
  if (!this.opt.message) {
    this.throwParamError('message');
  }
  if (!this.opt.name) {
    this.throwParamError('name');
  }

  // Normalize choices
  if (Array.isArray(this.opt.choices)) {
    this.opt.choices = new Choices(this.opt.choices, answers);
  }

  this.rl = rl;
  this.screen = new ScreenManager(this.rl);
};


/**
 * Start the Inquiry session and manage output value filtering
 * @param  {Function} cb  Callback when prompt is done
 * @return {this}
 */

Prompt.prototype.run = function( cb ) {
  this._run(function (value) {
    this.filter(value, cb);
  }.bind(this));
};

// default noop (this one should be overwritten in prompts)
Prompt.prototype._run = function (cb) { cb(); };


/**
 * Throw an error telling a required parameter is missing
 * @param  {String} name Name of the missing param
 * @return {Throw Error}
 */

Prompt.prototype.throwParamError = function (name) {
  throw new Error('You must provide a `' + name + '` parameter');
};

/**
 * Validate a given input
 * @param  {String} value       Input string
 * @param  {Function} callback  Pass `true` (if input is valid) or an error message as
 *                              parameter.
 * @return {null}
 */

Prompt.prototype.validate = function (input, cb) {
  runAsync(this.opt.validate, cb, input);
};

/**
 * Run the provided validation method each time a submit event occur.
 * @param  {Rx.Observable} submit - submit event flow
 * @return {Object}        Object containing two observables: `success` and `error`
 */
Prompt.prototype.handleSubmitEvents = function (submit) {
  var self = this;
  var validation = submit.flatMap(function (value) {
    return rx.Observable.create(function (observer) {
      runAsync(self.opt.validate, function (isValid) {
        observer.onNext({ isValid: isValid, value: self.getCurrentValue(value) });
        observer.onCompleted();
      }, self.getCurrentValue(value), self.answers);
    });
  }).share();

  var success = validation
    .filter(function (state) { return state.isValid === true; })
    .take(1);

  var error = validation
    .filter(function (state) { return state.isValid !== true; })
    .takeUntil(success);

  return {
    success: success,
    error: error
  };
};

Prompt.prototype.getCurrentValue = function (value) {
  return value;
};

/**
 * Filter a given input before sending back
 * @param  {String}   value     Input string
 * @param  {Function} callback  Pass the filtered input as parameter.
 * @return {null}
 */

Prompt.prototype.filter = function (input, cb) {
  runAsync(this.opt.filter, cb, input);
};

/**
 * Return the prompt line prefix
 * @param  {String} [optionnal] String to concatenate to the prefix
 * @return {String} prompt prefix
 */

Prompt.prototype.prefix = function (str) {
  str || (str = '');
  return chalk.green('?') + ' ' + str;
};

/**
 * Return the prompt line suffix
 * @param  {String} [optionnal] String to concatenate to the suffix
 * @return {String} prompt suffix
 */

var reStrEnd = new RegExp('(?:' + ansiRegex().source + ')$|$');

Prompt.prototype.suffix = function (str) {
  str || (str = '');

  // make sure we get the `:` inside the styles
  if (str.length < 1 || /[a-z1-9]$/i.test(chalk.stripColor(str))) {
    str = str.replace(reStrEnd, ':$&');
  }

  return str.trim() + ' ';
};

/**
 * Generate the prompt question string
 * @return {String} prompt question string
 */

Prompt.prototype.getQuestion = function () {
  var message = chalk.green('?') + ' ' + chalk.bold(this.opt.message) + ' ';

  // Append the default if available, and if question isn't answered
  if ( this.opt.default != null && this.status !== 'answered' ) {
    message += chalk.dim('('+ this.opt.default + ') ');
  }

  return message;
};

}, function(modId) { var map = {"../objects/choices":1676544236184,"../utils/screen-manager":1676544236186}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236184, function(require, module, exports) {

var assert = require('assert');
var _ = require('lodash');
var Separator = require('./separator');
var Choice = require('./choice');


/**
 * Choices collection
 * Collection of multiple `choice` object
 * @constructor
 * @param {Array} choices  All `choice` to keep in the collection
 */

var Choices = module.exports = function (choices, answers) {
  this.choices = choices.map(function (val) {
    if (val.type === 'separator') {
      if (!(val instanceof Separator)) {
        val = new Separator(val.line);
      }
      return val;
    }
    return new Choice(val, answers);
  });

  this.realChoices = this.choices
    .filter(Separator.exclude)
    .filter(function (item) {
      return !item.disabled;
    });

  Object.defineProperty(this, 'length', {
    get: function () {
      return this.choices.length;
    },
    set: function (val) {
      this.choices.length = val;
    }
  });

  Object.defineProperty(this, 'realLength', {
    get: function () {
      return this.realChoices.length;
    },
    set: function () {
      throw new Error('Cannot set `realLength` of a Choices collection');
    }
  });
};


/**
 * Get a valid choice from the collection
 * @param  {Number} selector  The selected choice index
 * @return {Choice|Undefined} Return the matched choice or undefined
 */

Choices.prototype.getChoice = function (selector) {
  assert(_.isNumber(selector));
  return this.realChoices[selector];
};


/**
 * Get a raw element from the collection
 * @param  {Number} selector  The selected index value
 * @return {Choice|Undefined} Return the matched choice or undefined
 */

Choices.prototype.get = function (selector) {
  assert(_.isNumber(selector));
  return this.choices[selector];
};


/**
 * Match the valid choices against a where clause
 * @param  {Object} whereClause Lodash `where` clause
 * @return {Array}              Matching choices or empty array
 */

Choices.prototype.where = function (whereClause) {
  return _.where(this.realChoices, whereClause);
};


/**
 * Pluck a particular key from the choices
 * @param  {String} propertyName Property name to select
 * @return {Array}               Selected properties
 */

Choices.prototype.pluck = function (propertyName) {
  return _.pluck(this.realChoices, propertyName);
};


// Expose usual Array methods
Choices.prototype.indexOf = function () {
  return this.choices.indexOf.apply(this.choices, arguments);
};
Choices.prototype.forEach = function () {
  return this.choices.forEach.apply(this.choices, arguments);
};
Choices.prototype.filter = function () {
  return this.choices.filter.apply(this.choices, arguments);
};
Choices.prototype.push = function () {
  var objs = _.map(arguments, function (val) { return new Choice(val); });
  this.choices.push.apply(this.choices, objs);
  this.realChoices = this.choices.filter(Separator.exclude);
  return this.choices;
};

}, function(modId) { var map = {"./separator":1676544236176,"./choice":1676544236185}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236185, function(require, module, exports) {

var _ = require('lodash');


/**
 * Choice object
 * Normalize input as choice object
 * @constructor
 * @param {String|Object} val  Choice value. If an object is passed, it should contains
 *                             at least one of `value` or `name` property
 */

var Choice = module.exports = function (val, answers) {
  // Don't process Choice and Separator object
  if (val instanceof Choice || val.type === 'separator') {
    return val;
  }

  if (_.isString(val)) {
    this.name = val;
    this.value = val;
    this.short = val;
  } else {
    _.extend(this, val, {
      name: val.name || val.value,
      value: val.hasOwnProperty('value') ? val.value : val.name,
      short: val.short || val.name || val.value
    });
  }

  if (_.isFunction(val.disabled)) {
    this.disabled = val.disabled(answers);
  } else {
    this.disabled = val.disabled;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236186, function(require, module, exports) {

var _ = require('lodash');
var util = require('./readline');
var cliWidth = require('cli-width');
var stripAnsi = require('strip-ansi');
var stringWidth = require('string-width');

// Prevent crashes on environments where the width can't be properly detected
cliWidth.defaultWidth = 80;

function height(content) {
  return content.split('\n').length;
}

function lastLine(content) {
  return _.last(content.split('\n'));
}

function normalizedCliWidth() {
  var width = cliWidth() || cliWidth.defaultWidth;
  if (process.platform === 'win32') {
    return width - 1;
  }
  return width;
}

var ScreenManager = module.exports = function (rl) {
  // These variables are keeping information to allow correct prompt re-rendering
  this.height = 0;
  this.extraLinesUnderPrompt = 0;

  this.rl = rl;
};

ScreenManager.prototype.render = function (content, bottomContent) {
  this.rl.output.unmute();
  this.clean(this.extraLinesUnderPrompt);

  /**
   * Write message to screen and setPrompt to control backspace
   */

  var promptLine = lastLine(content);
  var rawPromptLine = stripAnsi(promptLine);

  // Remove the rl.line from our prompt. We can't rely on the content of
  // rl.line (mainly because of the password prompt), so just rely on it's
  // length.
  var prompt = promptLine;
  if (this.rl.line.length) {
    prompt = prompt.slice(0, -this.rl.line.length);
  }
  this.rl.setPrompt(prompt);

  // setPrompt will change cursor position, now we can get correct value
  var cursorPos = this.rl._getCursorPos();

  content = forceLineReturn(content);
  if (bottomContent) {
    bottomContent = forceLineReturn(bottomContent);
  }
  // Manually insert an extra line if we're at the end of the line.
  // This prevent the cursor from appearing at the beginning of the
  // current line.
  if (rawPromptLine.length % normalizedCliWidth() === 0) {
    content = content + '\n';
  }
  var fullContent = content + (bottomContent ? '\n' + bottomContent : '');
  this.rl.output.write(fullContent);

  /**
   * Re-adjust the cursor at the correct position.
   */

  // We need to consider parts of the prompt under the cursor as part of the bottom
  // content in order to correctly cleanup and re-render.
  var promptLineUpDiff = Math.floor(rawPromptLine.length / normalizedCliWidth()) - cursorPos.rows;
  var bottomContentHeight = promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
  if (bottomContentHeight > 0) {
    util.up(this.rl, bottomContentHeight);
  }

  // Reset cursor at the beginning of the line
  util.left(this.rl, stringWidth(lastLine(fullContent)));

  // Adjust cursor on the right
  util.right(this.rl, cursorPos.cols);

  /**
   * Set up state for next re-rendering
   */
  this.extraLinesUnderPrompt = bottomContentHeight;
  this.height = height(fullContent);

  this.rl.output.mute();
};

ScreenManager.prototype.clean = function (extraLines) {
  if (extraLines > 0) {
    util.down(this.rl, extraLines);
  }
  util.clearLine(this.rl, this.height);
};

ScreenManager.prototype.done = function () {
  this.rl.setPrompt('');
  this.rl.output.unmute();
  this.rl.output.write('\n');
};

function breakLines(lines) {
  // Break lines who're longuer than the cli width so we can normalize the natural line
  // returns behavior accross terminals.
  var width = normalizedCliWidth();
  var regex = new RegExp(
    '(?:(?:\\033\[[0-9;]*m)*.?){1,' + width + '}',
    'g'
  );
  return lines.map(function (line) {
    var chunk = line.match(regex);
    // last match is always empty
    chunk.pop();
    return chunk || '';
  });
}

function forceLineReturn(content) {
  return _.flatten(breakLines(content.split('\n'))).join('\n');
}

}, function(modId) { var map = {"./readline":1676544236179}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236187, function(require, module, exports) {

var rx = require('rx-lite');

function normalizeKeypressEvents(value, key) {
  return { value: value, key: key || {} };
}

module.exports = function (rl) {
  var keypress = rx.Observable.fromEvent(rl.input, 'keypress', normalizeKeypressEvents)
    .filter(function (e) {
      // Ignore `enter` key. On the readline, we only care about the `line` event.
      return e.key.name !== 'enter' && e.key.name !== 'return';
    });

  return {
    line: rx.Observable.fromEvent(rl, 'line'),
    keypress: keypress,

    normalizedUpKey: keypress.filter(function (e) {
      return e.key.name === 'up' || e.key.name === 'k';
    }).share(),

    normalizedDownKey: keypress.filter(function (e) {
      return e.key.name === 'down' || e.key.name === 'j';
    }).share(),

    numberKey: keypress.filter(function (e) {
      return e.value && '123456789'.indexOf(e.value) >= 0;
    }).map(function (e) {
      return Number(e.value);
    }).share(),

    spaceKey: keypress.filter(function (e) {
      return e.key && e.key.name === 'space';
    }).share()
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236188, function(require, module, exports) {


var _ = require('lodash');
var chalk = require('chalk');


/**
 * The paginator keep trakcs of a pointer index in a list and return
 * a subset of the choices if the list is too long.
 */

var Paginator = module.exports = function () {
  this.pointer = 0;
  this.lastIndex = 0;
};

Paginator.prototype.paginate = function (output, active, pageSize) {
  var pageSize = pageSize || 7;
  var lines = output.split('\n');

  // Make sure there's enough lines to paginate
  if (lines.length <= pageSize + 2) {
    return output;
  }

  // Move the pointer only when the user go down and limit it to 3
  if (this.pointer < 3 && this.lastIndex < active && active - this.lastIndex < 9) {
    this.pointer = Math.min(3, this.pointer + active - this.lastIndex);
  }
  this.lastIndex = active;

  // Duplicate the lines so it give an infinite list look
  var infinite = _.flatten([lines, lines, lines]);
  var topIndex = Math.max(0, active + lines.length - this.pointer);

  var section = infinite.splice(topIndex, pageSize).join('\n');
  return section + '\n' + chalk.dim('(Move up and down to reveal more choices)');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236189, function(require, module, exports) {
/**
 * `input` type prompt
 */

var util = require("util");
var chalk = require("chalk");
var Base = require("./base");
var observe = require("../utils/events");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  return Base.apply( this, arguments );
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  // Once user confirm (enter key)
  var events = observe(this.rl);
  var submit = events.line.map( this.filterInput.bind(this) );

  var validation = this.handleSubmitEvents( submit );
  validation.success.forEach( this.onEnd.bind(this) );
  validation.error.forEach( this.onError.bind(this) );

  events.keypress.takeUntil( validation.success ).forEach( this.onKeypress.bind(this) );

  // Init
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  var bottomContent = '';
  var message = this.getQuestion();

  if (this.status === 'answered') {
    message += chalk.cyan(this.answer);
  } else {
    message += this.rl.line;
  }

  if (error) {
    bottomContent = chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};


/**
 * When user press `enter` key
 */

Prompt.prototype.filterInput = function( input ) {
  if ( !input ) {
    return this.opt.default != null ? this.opt.default : "";
  }
  return input;
};

Prompt.prototype.onEnd = function( state ) {
  this.filter( state.value, function( filteredValue ) {
    this.answer = filteredValue;
    this.status = "answered";

    // Re-render prompt
    this.render();

    this.screen.done();
    this.done( state.value );
  }.bind(this));
};

Prompt.prototype.onError = function( state ) {
  this.render(state.isValid);
};

/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function() {
  this.render();
};

}, function(modId) { var map = {"./base":1676544236183,"../utils/events":1676544236187}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236190, function(require, module, exports) {
/**
 * `confirm` type prompt
 */

var _ = require("lodash");
var util = require("util");
var chalk = require("chalk");
var Base = require("./base");
var observe = require("../utils/events");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );

  var rawDefault = true;

  _.extend( this.opt, {
    filter: function( input ) {
      var value = rawDefault;
      if ( input != null && input !== "" ) {
        value = /^y(es)?/i.test(input);
      }
      return value;
    }.bind(this)
  });

  if ( _.isBoolean(this.opt.default) ) {
    rawDefault = this.opt.default;
  }

  this.opt.default = rawDefault ? "Y/n" : "y/N";

  return this;
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb   Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  // Once user confirm (enter key)
  var events = observe(this.rl);
  events.keypress.takeUntil( events.line ).forEach( this.onKeypress.bind(this) );

  events.line.take(1).forEach( this.onEnd.bind(this) );

  // Init
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (answer) {
  var message = this.getQuestion();

  if (typeof answer === "boolean") {
    message += chalk.cyan(answer ? "Yes" : "No");
  } else {
    message += this.rl.line;
  }

  this.screen.render(message);

  return this;
};

/**
 * When user press `enter` key
 */

Prompt.prototype.onEnd = function( input ) {
  this.status = "answered";

  var output = this.opt.filter( input );
  this.render( output );

  this.screen.done();
  this.done( input ); // send "input" because the master class will refilter
};

/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function() {
    this.render();
};

}, function(modId) { var map = {"./base":1676544236183,"../utils/events":1676544236187}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236191, function(require, module, exports) {
/**
 * `rawlist` type prompt
 */

var _ = require("lodash");
var util = require("util");
var chalk = require("chalk");
var Base = require("./base");
var Separator = require("../objects/separator");
var observe = require("../utils/events");
var Paginator = require("../utils/paginator");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );

  if (!this.opt.choices) {
    this.throwParamError("choices");
  }

  this.opt.validChoices = this.opt.choices.filter(Separator.exclude);

  this.selected = 0;
  this.rawDefault = 0;

  _.extend(this.opt, {
    validate: function( index ) {
      return this.opt.choices.getChoice( index ) != null;
    }.bind(this)
  });

  var def = this.opt.default;
  if ( _.isNumber(def) && def >= 0 && def < this.opt.choices.realLength ) {
    this.selected = this.rawDefault = def;
  }

  // Make sure no default is set (so it won't be printed)
  this.opt.default = null;

  this.paginator = new Paginator();
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  // Once user confirm (enter key)
  var events = observe(this.rl);
  var submit = events.line.map( this.filterInput.bind(this) );

  var validation = this.handleSubmitEvents( submit );
  validation.success.forEach( this.onEnd.bind(this) );
  validation.error.forEach( this.onError.bind(this) );

  events.keypress.takeUntil( validation.success ).forEach( this.onKeypress.bind(this) );

  // Init the prompt
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  // Render question
  var message = this.getQuestion();
  var bottomContent = '';

  if ( this.status === "answered" ) {
    message += chalk.cyan(this.opt.choices.getChoice(this.selected).name);
  } else {
    var choicesStr = renderChoices(this.opt.choices, this.selected);
    message += this.paginator.paginate(choicesStr, this.selected, this.opt.pageSize);
    message += "\n  Answer: ";
  }

  message += this.rl.line;

  if (error) {
    bottomContent = '\n' + chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};

/**
 * When user press `enter` key
 */

Prompt.prototype.filterInput = function( input ) {
  if ( input == null || input === "" ) {
    return this.rawDefault;
  } else {
    return input - 1;
  }
};

Prompt.prototype.onEnd = function( state ) {
  this.status = "answered";
  this.selected = state.value;

  var selectedChoice = this.opt.choices.getChoice( this.selected );

  // Re-render prompt
  this.render();

  this.screen.done();
  this.done( selectedChoice.value );
};

Prompt.prototype.onError = function() {
  this.render("Please enter a valid index");
};

/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function() {
  var index = this.rl.line.length ? Number(this.rl.line) - 1 : 0;

  if ( this.opt.choices.getChoice(index) ) {
    this.selected = index;
  } else {
    this.selected = undefined;
  }

  this.render();
};


/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

function renderChoices(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function (choice, i) {
    output += '\n  ';

    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice;
      return;
    }

    var index = i - separatorOffset;
    var display = (index + 1) + ') ' + choice.name;
    if (index === pointer) {
      display = chalk.cyan( display );
    }
    output += display;
  });

  return output;
}

}, function(modId) { var map = {"./base":1676544236183,"../objects/separator":1676544236176,"../utils/events":1676544236187,"../utils/paginator":1676544236188}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236192, function(require, module, exports) {
/**
 * `rawlist` type prompt
 */

var _ = require("lodash");
var util = require("util");
var chalk = require("chalk");
var Base = require("./base");
var Separator = require("../objects/separator");
var observe = require("../utils/events");
var Paginator = require("../utils/paginator");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );

  if ( !this.opt.choices ) {
    this.throwParamError("choices");
  }

  this.validateChoices( this.opt.choices );

  // Add the default `help` (/expand) option
  this.opt.choices.push({
    key   : "h",
    name  : "Help, list all options",
    value : "help"
  });

  // Setup the default string (capitalize the default key)
  this.opt.default = this.generateChoicesString( this.opt.choices, this.opt.default );

  this.paginator = new Paginator();
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  // Save user answer and update prompt to show selected option.
  var events = observe(this.rl);
  this.lineObs = events.line.forEach( this.onSubmit.bind(this) );
  this.keypressObs = events.keypress.forEach( this.onKeypress.bind(this) );

  // Init the prompt
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error, hint) {
  var message = this.getQuestion();
  var bottomContent = '';

  if ( this.status === "answered" ) {
    message += chalk.cyan( this.selected.name );
  } else if ( this.status === "expanded" ) {
    var choicesStr = renderChoices(this.opt.choices, this.selectedKey);
    message += this.paginator.paginate(choicesStr, this.selectedKey, this.opt.pageSize);
    message += "\n  Answer: ";
  }

  message += this.rl.line;

  if (error) {
    bottomContent = chalk.red('>> ') + error;
  }

  if (hint) {
    bottomContent = chalk.cyan('>> ') + hint;
  }

  this.screen.render(message, bottomContent);
};


/**
 * Generate the prompt choices string
 * @return {String}  Choices string
 */

Prompt.prototype.getChoices = function() {
  var output = "";

  this.opt.choices.forEach(function( choice, i ) {
    output += "\n  ";

    if ( choice.type === "separator" ) {
      output += " " + choice;
      return;
    }

    var choiceStr = choice.key + ") " + choice.name;
    if ( this.selectedKey === choice.key ) {
      choiceStr = chalk.cyan( choiceStr );
    }
    output += choiceStr;
  }.bind(this));

  return output;
};


/**
 * When user press `enter` key
 */

Prompt.prototype.onSubmit = function( input ) {
  if ( input == null || input === "" ) {
    input = this.rawDefault;
  }

  var selected = this.opt.choices.where({ key : input.toLowerCase().trim() })[0];

  if ( selected != null && selected.key === "h" ) {
    this.selectedKey = "";
    this.status = "expanded";
    this.render();
    return;
  }

  if ( selected != null ) {
    this.status = "answered";
    this.selected = selected;

    // Re-render prompt
    this.render();

    this.lineObs.dispose();
    this.keypressObs.dispose();
    this.screen.done();
    this.done( this.selected.value );
    return;
  }

  // Input is invalid
  this.render("Please enter a valid command");
};


/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function( s, key ) {
  this.selectedKey = this.rl.line.toLowerCase();
  var selected = this.opt.choices.where({ key : this.selectedKey })[0];
  if ( this.status === "expanded" )  {
    this.render();
  } else {
    this.render(null, selected ? selected.name : null);
  }
};


/**
 * Validate the choices
 * @param {Array} choices
 */

Prompt.prototype.validateChoices = function( choices ) {
  var formatError;
  var errors = [];
  var keymap = {};
  choices.filter(Separator.exclude).map(function( choice ) {
    if ( !choice.key || choice.key.length !== 1 ) {
      formatError = true;
    }
    if ( keymap[choice.key] ) {
      errors.push(choice.key);
    }
    keymap[ choice.key ] = true;
    choice.key = String( choice.key ).toLowerCase();
  });

  if ( formatError ) {
    throw new Error("Format error: `key` param must be a single letter and is required.");
  }
  if ( keymap.h ) {
    throw new Error("Reserved key error: `key` param cannot be `h` - this value is reserved.");
  }
  if ( errors.length ) {
    throw new Error( "Duplicate key error: `key` param must be unique. Duplicates: " +
        _.uniq(errors).join(", ") );
  }
};

/**
 * Generate a string out of the choices keys
 * @param  {Array}  choices
 * @param  {Number} defaultIndex - the choice index to capitalize
 * @return {String} The rendered choices key string
 */
Prompt.prototype.generateChoicesString = function( choices, defaultIndex ) {
  var defIndex = 0;
  if ( _.isNumber(defaultIndex) && this.opt.choices.getChoice(defaultIndex) ) {
    defIndex = defaultIndex;
  }
  var defStr = this.opt.choices.pluck("key");
  this.rawDefault = defStr[ defIndex ];
  defStr[ defIndex ] = String( defStr[defIndex] ).toUpperCase();
  return defStr.join("");
};


/**
 * Function for rendering checkbox choices
 * @param  {String} pointer Selected key
 * @return {String}         Rendered content
 */

function renderChoices (choices, pointer) {
  var output = '';

  choices.forEach(function (choice, i) {
    output += '\n  ';

    if (choice.type === 'separator') {
      output += ' ' + choice;
      return;
    }

    var choiceStr = choice.key + ') ' + choice.name;
    if (pointer === choice.key) {
      choiceStr = chalk.cyan(choiceStr);
    }
    output += choiceStr;
  });

  return output;
}

}, function(modId) { var map = {"./base":1676544236183,"../objects/separator":1676544236176,"../utils/events":1676544236187,"../utils/paginator":1676544236188}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236193, function(require, module, exports) {
/**
 * `list` type prompt
 */

var _ = require("lodash");
var util = require("util");
var chalk = require("chalk");
var cliCursor = require("cli-cursor");
var figures = require("figures");
var Base = require("./base");
var observe = require("../utils/events");
var Paginator = require("../utils/paginator");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );

  if (!this.opt.choices) {
    this.throwParamError("choices");
  }

  if ( _.isArray(this.opt.default) ) {
    this.opt.choices.forEach(function( choice ) {
      if ( this.opt.default.indexOf(choice.value) >= 0 ) {
        choice.checked = true;
      }
    }, this);
  }

  this.firstRender = true;
  this.pointer = 0;

  // Make sure no default is set (so it won't be printed)
  this.opt.default = null;

  this.paginator = new Paginator();
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  var events = observe(this.rl);

  var validation = this.handleSubmitEvents( events.line );
  validation.success.forEach( this.onEnd.bind(this) );
  validation.error.forEach( this.onError.bind(this) );

  events.normalizedUpKey.takeUntil( validation.success ).forEach( this.onUpKey.bind(this) );
  events.normalizedDownKey.takeUntil( validation.success ).forEach( this.onDownKey.bind(this) );
  events.numberKey.takeUntil( validation.success ).forEach( this.onNumberKey.bind(this) );
  events.spaceKey.takeUntil( validation.success ).forEach( this.onSpaceKey.bind(this) );

  // Init the prompt
  cliCursor.hide();
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  // Render question
  var message = this.getQuestion();
  var bottomContent = '';

  if ( this.firstRender ) {
    message += "(Press <space> to select)";
  }

  // Render choices or answer depending on the state
  if ( this.status === "answered" ) {
    message += chalk.cyan( this.selection.join(", ") );
  } else {
    var choicesStr = renderChoices(this.opt.choices, this.pointer);
    var indexPosition = this.opt.choices.indexOf(this.opt.choices.getChoice(this.pointer));
    message += "\n" + this.paginator.paginate(choicesStr, indexPosition, this.opt.pageSize);
  }

  if (error) {
    bottomContent = chalk.red('>> ') + error;
  }

  this.firstRender = false;

  this.screen.render(message, bottomContent);
};


/**
 * When user press `enter` key
 */

Prompt.prototype.onEnd = function( state ) {

  this.status = "answered";

  // Rerender prompt (and clean subline error)
  this.render();

  this.screen.done();
  cliCursor.show();
  this.done( state.value );
};

Prompt.prototype.onError = function ( state ) {
  this.render(state.isValid);
};

Prompt.prototype.getCurrentValue = function () {
  var choices = this.opt.choices.filter(function( choice ) {
    return !!choice.checked && !choice.disabled;
  });

  this.selection = _.pluck(choices, "short");
  return _.pluck(choices, "value");
};

Prompt.prototype.onUpKey = function() {
  var len = this.opt.choices.realLength;
  this.pointer = (this.pointer > 0) ? this.pointer - 1 : len - 1;
  this.render();
};

Prompt.prototype.onDownKey = function() {
  var len = this.opt.choices.realLength;
  this.pointer = (this.pointer < len - 1) ? this.pointer + 1 : 0;
  this.render();
};

Prompt.prototype.onNumberKey = function( input ) {
  if ( input <= this.opt.choices.realLength ) {
    this.pointer = input - 1;
    this.toggleChoice( this.pointer );
  }
  this.render();
};

Prompt.prototype.onSpaceKey = function( input ) {
  this.toggleChoice(this.pointer);
  this.render();
};

Prompt.prototype.toggleChoice = function( index ) {
  var checked = this.opt.choices.getChoice(index).checked;
  this.opt.choices.getChoice(index).checked = !checked;
};

/**
 * Function for rendering checkbox choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

function renderChoices(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function (choice, i) {
    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice + '\n';
      return;
    }

    if (choice.disabled) {
      separatorOffset++;
      output += ' - ' + choice.name;
      output += ' (' + (_.isString(choice.disabled) ? choice.disabled : 'Disabled') + ')';
    } else {
      var isSelected = (i - separatorOffset === pointer);
      output += isSelected ? chalk.cyan(figures.pointer) : ' ';
      output += getCheckbox(choice.checked) + ' ' + choice.name;
    }

    output += '\n';
  });

  return output.replace(/\n$/, '');
}

/**
 * Get the checkbox
 * @param  {Boolean} checked - add a X or not to the checkbox
 * @return {String} Composited checkbox string
 */

function getCheckbox(checked) {
  return checked ? chalk.green(figures.radioOn) : figures.radioOff;
}

}, function(modId) { var map = {"./base":1676544236183,"../utils/events":1676544236187,"../utils/paginator":1676544236188}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544236194, function(require, module, exports) {
/**
 * `password` type prompt
 */

var util = require("util");
var chalk = require("chalk");
var Base = require("./base");
var observe = require("../utils/events");

function mask(input) {
  input = String(input);
  if (input.length === 0) {
    return '';
  }

  return new Array(input.length + 1).join('*');
}

/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  return Base.apply( this, arguments );
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  var events = observe(this.rl);

  // Once user confirm (enter key)
  var submit = events.line.map( this.filterInput.bind(this) );

  var validation = this.handleSubmitEvents( submit );
  validation.success.forEach( this.onEnd.bind(this) );
  validation.error.forEach( this.onError.bind(this) );

  events.keypress.takeUntil( validation.success ).forEach( this.onKeypress.bind(this) );

  // Init
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  var message = this.getQuestion();
  var bottomContent = '';

  if (this.status === 'answered') {
    message += chalk.cyan(mask(this.answer));
  } else {
    message += mask(this.rl.line || '');
  }

  if (error) {
    bottomContent = '\n' + chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};

/**
 * When user press `enter` key
 */

Prompt.prototype.filterInput = function( input ) {
  if ( !input ) {
    return this.opt.default != null ? this.opt.default : "";
  }
  return input;
};

Prompt.prototype.onEnd = function( state ) {
  this.status = "answered";
  this.answer = state.value;

  // Re-render prompt
  this.render();

  this.screen.done();
  this.done( state.value );
};

Prompt.prototype.onError = function( state ) {
  this.render(state.isValid);
  this.rl.output.unmute();
};

/**
 * When user type
 */

Prompt.prototype.onKeypress = function() {
  this.render();
};

}, function(modId) { var map = {"./base":1676544236183,"../utils/events":1676544236187}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544236175);
})()
//miniprogram-npm-outsideDeps=["chalk","figures","util","through","lodash","readline2","ansi-escapes","rx-lite","run-async","cli-cursor","ansi-regex","assert","cli-width","strip-ansi","string-width"]
//# sourceMappingURL=index.js.map