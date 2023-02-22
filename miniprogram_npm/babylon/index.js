module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1676544235727, function(require, module, exports) {


exports.__esModule = true;
exports.parse = parse;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

require("./parser/util");

require("./parser/statement");

require("./parser/lval");

require("./parser/expression");

require("./parser/node");

require("./parser/location");

require("./parser/comments");

var _tokenizerTypes = require("./tokenizer/types");

require("./tokenizer");

require("./tokenizer/context");

var _pluginsFlow = require("./plugins/flow");

var _pluginsFlow2 = _interopRequireDefault(_pluginsFlow);

var _pluginsJsx = require("./plugins/jsx");

var _pluginsJsx2 = _interopRequireDefault(_pluginsJsx);

_parser.plugins.flow = _pluginsFlow2["default"];
_parser.plugins.jsx = _pluginsJsx2["default"];

function parse(input, options) {
  return new _parser2["default"](options, input).parse();
}

exports.tokTypes = _tokenizerTypes.types;
}, function(modId) {var map = {"./parser":1676544235728,"./parser/util":1676544235737,"./parser/statement":1676544235738,"./parser/lval":1676544235739,"./parser/expression":1676544235740,"./parser/node":1676544235741,"./parser/location":1676544235742,"./parser/comments":1676544235743,"./tokenizer/types":1676544235732,"./tokenizer":1676544235731,"./tokenizer/context":1676544235733,"./plugins/flow":1676544235744,"./plugins/jsx":1676544235745}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235728, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilIdentifier = require("../util/identifier");

var _options = require("../options");

var _tokenizer = require("../tokenizer");

var _tokenizer2 = _interopRequireDefault(_tokenizer);

// Registered plugins

var plugins = {};

exports.plugins = plugins;

var Parser = (function (_Tokenizer) {
  _inherits(Parser, _Tokenizer);

  function Parser(options, input) {
    _classCallCheck(this, Parser);

    _Tokenizer.call(this, input);

    this.options = _options.getOptions(options);
    this.isKeyword = _utilIdentifier.isKeyword;
    this.isReservedWord = _utilIdentifier.reservedWords[6];
    this.input = input;
    this.loadPlugins(this.options.plugins);

    // Figure out if it's a module code.
    this.inModule = this.options.sourceType === "module";
    this.strict = this.options.strictMode === false ? false : this.inModule;

    // If enabled, skip leading hashbang line.
    if (this.state.pos === 0 && this.input[0] === "#" && this.input[1] === "!") {
      this.skipLineComment(2);
    }
  }

  Parser.prototype.extend = function extend(name, f) {
    this[name] = f(this[name]);
  };

  Parser.prototype.loadPlugins = function loadPlugins(plugins) {
    for (var _name in plugins) {
      var plugin = exports.plugins[_name];
      if (!plugin) throw new Error("Plugin '" + _name + "' not found");
      plugin(this, plugins[_name]);
    }
  };

  Parser.prototype.parse = function parse() {
    var file = this.startNode();
    var program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  };

  return Parser;
})(_tokenizer2["default"]);

exports["default"] = Parser;
}, function(modId) { var map = {"../util/identifier":1676544235729,"../options":1676544235730,"../tokenizer":1676544235731}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235729, function(require, module, exports) {
// This is a trick taken from Esprima. It turns out that, on
// non-Chrome browsers, to check whether a string is in a set, a
// predicate containing a big ugly `switch` statement is faster than
// a regular expression, and on Chrome the two are about on par.
// This function uses `eval` (non-lexical) to produce such a
// predicate from a space-separated string of words.
//
// It starts by sorting the words by length.



exports.__esModule = true;
exports.isIdentifierStart = isIdentifierStart;
exports.isIdentifierChar = isIdentifierChar;
function makePredicate(words) {
  words = words.split(" ");
  return function (str) {
    return words.indexOf(str) >= 0;
  };
}

// Reserved word lists for various dialects of the language

var reservedWords = {
  6: makePredicate("enum await"),
  strict: makePredicate("implements interface let package private protected public static yield"),
  strictBind: makePredicate("eval arguments")
};

exports.reservedWords = reservedWords;
// And the keywords

var isKeyword = makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this let const class extends export import yield super");

exports.isKeyword = isKeyword;
// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `tools/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
var nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by tools/generate-identifier-regex.js
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 99, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 98, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 955, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 38, 17, 2, 24, 133, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 32, 4, 287, 47, 21, 1, 2, 0, 185, 46, 82, 47, 21, 0, 60, 42, 502, 63, 32, 0, 449, 56, 1288, 920, 104, 110, 2962, 1070, 13266, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 16481, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 1340, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 16355, 541];
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 16, 9, 83, 11, 168, 11, 6, 9, 8, 2, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 316, 19, 13, 9, 214, 6, 3, 8, 112, 16, 16, 9, 82, 12, 9, 9, 535, 9, 20855, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 4305, 6, 792618, 239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) return false;

    pos += set[i + 1];
    if (pos >= code) return true;
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code) {
  if (code < 65) return code === 36;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  return isInAstralSet(code, astralIdentifierStartCodes);
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235730, function(require, module, exports) {
// A second optional argument can be given to further configure
// the parser process. These options are recognized:



exports.__esModule = true;
exports.getOptions = getOptions;
var defaultOptions = {
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // By default, reserved words are not enforced. Disable
  // `allowReserved` to enforce them. When this option has the
  // value "never", reserved words and keywords can also not be
  // used as property names.
  allowReserved: true,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  plugins: {},
  // Babel-specific options
  features: {},
  strictMode: null
};

exports.defaultOptions = defaultOptions;
// Interpret and default an options object

function getOptions(opts) {
  var options = {};
  for (var key in defaultOptions) {
    options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
  }
  return options;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235731, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilIdentifier = require("../util/identifier");

var _types = require("./types");

var _context = require("./context");

var _utilLocation = require("../util/location");

var _utilWhitespace = require("../util/whitespace");

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(state) {
  _classCallCheck(this, Token);

  this.type = state.type;
  this.value = state.value;
  this.start = state.start;
  this.end = state.end;
  this.loc = new _utilLocation.SourceLocation(state.startLoc, state.endLoc);
}

// ## Tokenizer

// Are we running under Rhino?
/* global Packages */
;

exports.Token = Token;
var isRhino = typeof Packages === "object" && Object.prototype.toString.call(Packages) === "[object JavaPackage]";

// Parse a regular expression. Some context-awareness is necessary,
// since a '/' inside a '[]' set does not end the expression.

function tryCreateRegexp(src, flags, throwErrorStart) {
  try {
    return new RegExp(src, flags);
  } catch (e) {
    if (throwErrorStart !== undefined) {
      if (e instanceof SyntaxError) this.raise(throwErrorStart, "Error parsing regular expression: " + e.message);
      this.raise(e);
    }
  }
}

var regexpUnicodeSupport = !!tryCreateRegexp("￿", "u");

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code);
  return String.fromCharCode((code - 0x10000 >> 10) + 0xD800, (code - 0x10000 & 1023) + 0xDC00);
}

var Tokenizer = (function () {
  function Tokenizer(input) {
    _classCallCheck(this, Tokenizer);

    this.state = new _state2["default"]();
    this.state.init(input);
  }

  // Move to the next token

  Tokenizer.prototype.next = function next() {
    this.state.tokens.push(new Token(this.state));

    this.state.lastTokEnd = this.state.end;
    this.state.lastTokStart = this.state.start;
    this.state.lastTokEndLoc = this.state.endLoc;
    this.state.lastTokStartLoc = this.state.startLoc;
    this.nextToken();
  };

  // TODO

  Tokenizer.prototype.eat = function eat(type) {
    if (this.match(type)) {
      this.next();
      return true;
    } else {
      return false;
    }
  };

  // TODO

  Tokenizer.prototype.match = function match(type) {
    return this.state.type === type;
  };

  // TODO

  Tokenizer.prototype.lookahead = function lookahead() {
    var old = this.state;
    this.state = old.clone();
    this.next();
    var curr = this.state.clone();
    this.state = old;
    return curr;
  };

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  Tokenizer.prototype.setStrict = function setStrict(strict) {
    this.strict = strict;
    if (!this.match(_types.types.num) && !this.match(_types.types.string)) return;
    this.state.pos = this.state.start;
    while (this.state.pos < this.state.lineStart) {
      this.state.lineStart = this.input.lastIndexOf("\n", this.state.lineStart - 2) + 1;
      --this.state.curLine;
    }
    this.nextToken();
  };

  Tokenizer.prototype.curContext = function curContext() {
    return this.state.context[this.state.context.length - 1];
  };

  // Read a single token, updating the parser object's token-related
  // properties.

  Tokenizer.prototype.nextToken = function nextToken() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) this.skipSpace();

    this.state.start = this.state.pos;
    this.state.startLoc = this.state.curPosition();
    if (this.state.pos >= this.input.length) return this.finishToken(_types.types.eof);

    if (curContext.override) {
      return curContext.override(this);
    } else {
      return this.readToken(this.fullCharCodeAtPos());
    }
  };

  Tokenizer.prototype.readToken = function readToken(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (_utilIdentifier.isIdentifierStart(code, true) || code === 92 /* '\' */) return this.readWord();

    return this.getTokenFromCode(code);
  };

  Tokenizer.prototype.fullCharCodeAtPos = function fullCharCodeAtPos() {
    var code = this.input.charCodeAt(this.state.pos);
    if (code <= 0xd7ff || code >= 0xe000) return code;

    var next = this.input.charCodeAt(this.state.pos + 1);
    return (code << 10) + next - 0x35fdc00;
  };

  Tokenizer.prototype.pushComment = function pushComment(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "CommentBlock" : "CommentLine",
      value: text,
      start: start,
      end: end,
      loc: new _utilLocation.SourceLocation(startLoc, endLoc),
      range: [start, end]
    };

    this.state.tokens.push(comment);
    this.state.comments.push(comment);
    this.addComment(comment);
  };

  Tokenizer.prototype.skipBlockComment = function skipBlockComment() {
    var startLoc = this.state.curPosition();
    var start = this.state.pos,
        end = this.input.indexOf("*/", this.state.pos += 2);
    if (end === -1) this.raise(this.state.pos - 2, "Unterminated comment");

    this.state.pos = end + 2;
    _utilWhitespace.lineBreakG.lastIndex = start;
    var match = undefined;
    while ((match = _utilWhitespace.lineBreakG.exec(this.input)) && match.index < this.state.pos) {
      ++this.state.curLine;
      this.state.lineStart = match.index + match[0].length;
    }

    this.pushComment(true, this.input.slice(start + 2, end), start, this.state.pos, startLoc, this.state.curPosition());
  };

  Tokenizer.prototype.skipLineComment = function skipLineComment(startSkip) {
    var start = this.state.pos;
    var startLoc = this.state.curPosition();
    var ch = this.input.charCodeAt(this.state.pos += startSkip);
    while (this.state.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
      ++this.state.pos;
      ch = this.input.charCodeAt(this.state.pos);
    }

    this.pushComment(false, this.input.slice(start + startSkip, this.state.pos), start, this.state.pos, startLoc, this.state.curPosition());
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  Tokenizer.prototype.skipSpace = function skipSpace() {
    loop: while (this.state.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.state.pos);
      switch (ch) {
        case 32:case 160:
          // ' '
          ++this.state.pos;
          break;

        case 13:
          if (this.input.charCodeAt(this.state.pos + 1) === 10) {
            ++this.state.pos;
          }

        case 10:case 8232:case 8233:
          ++this.state.pos;
          ++this.state.curLine;
          this.state.lineStart = this.state.pos;
          break;

        case 47:
          // '/'
          switch (this.input.charCodeAt(this.state.pos + 1)) {
            case 42:
              // '*'
              this.skipBlockComment();
              break;

            case 47:
              this.skipLineComment(2);
              break;

            default:
              break loop;
          }
          break;

        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && _utilWhitespace.nonASCIIwhitespace.test(String.fromCharCode(ch))) {
            ++this.state.pos;
          } else {
            break loop;
          }
      }
    }
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  Tokenizer.prototype.finishToken = function finishToken(type, val) {
    this.state.end = this.state.pos;
    this.state.endLoc = this.state.curPosition();
    var prevType = this.state.type;
    this.state.type = type;
    this.state.value = val;

    this.updateContext(prevType);
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //

  Tokenizer.prototype.readToken_dot = function readToken_dot() {
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }

    var next2 = this.input.charCodeAt(this.state.pos + 2);
    if (next === 46 && next2 === 46) {
      // 46 = dot '.'
      this.state.pos += 3;
      return this.finishToken(_types.types.ellipsis);
    } else {
      ++this.state.pos;
      return this.finishToken(_types.types.dot);
    }
  };

  Tokenizer.prototype.readToken_slash = function readToken_slash() {
    // '/'
    if (this.state.exprAllowed) {
      ++this.state.pos;
      return this.readRegexp();
    }

    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) {
      return this.finishOp(_types.types.assign, 2);
    } else {
      return this.finishOp(_types.types.slash, 1);
    }
  };

  Tokenizer.prototype.readToken_mult_modulo = function readToken_mult_modulo(code) {
    // '%*'
    var type = code === 42 ? _types.types.star : _types.types.modulo;
    var width = 1;
    var next = this.input.charCodeAt(this.state.pos + 1);

    if (next === 42 && this.options.features["es7.exponentiationOperator"]) {
      // '*'
      width++;
      next = this.input.charCodeAt(this.state.pos + 2);
      type = _types.types.exponent;
    }

    if (next === 61) {
      width++;
      type = _types.types.assign;
    }

    return this.finishOp(type, width);
  };

  Tokenizer.prototype.readToken_pipe_amp = function readToken_pipe_amp(code) {
    // '|&'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === code) return this.finishOp(code === 124 ? _types.types.logicalOR : _types.types.logicalAND, 2);
    if (next === 61) return this.finishOp(_types.types.assign, 2);
    return this.finishOp(code === 124 ? _types.types.bitwiseOR : _types.types.bitwiseAND, 1);
  };

  Tokenizer.prototype.readToken_caret = function readToken_caret() {
    // '^'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) {
      return this.finishOp(_types.types.assign, 2);
    } else {
      return this.finishOp(_types.types.bitwiseXOR, 1);
    }
  };

  Tokenizer.prototype.readToken_plus_min = function readToken_plus_min(code) {
    // '+-'
    var next = this.input.charCodeAt(this.state.pos + 1);

    if (next === code) {
      if (next === 45 && this.input.charCodeAt(this.state.pos + 2) === 62 && _utilWhitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.pos))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(_types.types.incDec, 2);
    }

    if (next === 61) {
      return this.finishOp(_types.types.assign, 2);
    } else {
      return this.finishOp(_types.types.plusMin, 1);
    }
  };

  Tokenizer.prototype.readToken_lt_gt = function readToken_lt_gt(code) {
    // '<>'
    var next = this.input.charCodeAt(this.state.pos + 1);
    var size = 1;

    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.state.pos + size) === 61) return this.finishOp(_types.types.assign, size + 1);
      return this.finishOp(_types.types.bitShift, size);
    }

    if (next === 33 && code === 60 && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {
      if (this.inModule) this.unexpected();
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }

    if (next === 61) {
      size = this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2;
    }

    return this.finishOp(_types.types.relational, size);
  };

  Tokenizer.prototype.readToken_eq_excl = function readToken_eq_excl(code) {
    // '=!'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) return this.finishOp(_types.types.equality, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
    if (code === 61 && next === 62) {
      // '=>'
      this.state.pos += 2;
      return this.finishToken(_types.types.arrow);
    }
    return this.finishOp(code === 61 ? _types.types.eq : _types.types.prefix, 1);
  };

  Tokenizer.prototype.getTokenFromCode = function getTokenFromCode(code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case 46:
        // '.'
        return this.readToken_dot();

      // Punctuation tokens.
      case 40:
        ++this.state.pos;return this.finishToken(_types.types.parenL);
      case 41:
        ++this.state.pos;return this.finishToken(_types.types.parenR);
      case 59:
        ++this.state.pos;return this.finishToken(_types.types.semi);
      case 44:
        ++this.state.pos;return this.finishToken(_types.types.comma);
      case 91:
        ++this.state.pos;return this.finishToken(_types.types.bracketL);
      case 93:
        ++this.state.pos;return this.finishToken(_types.types.bracketR);
      case 123:
        ++this.state.pos;return this.finishToken(_types.types.braceL);
      case 125:
        ++this.state.pos;return this.finishToken(_types.types.braceR);

      case 58:
        if (this.options.features["es7.functionBind"] && this.input.charCodeAt(this.state.pos + 1) === 58) {
          return this.finishOp(_types.types.doubleColon, 2);
        } else {
          ++this.state.pos;
          return this.finishToken(_types.types.colon);
        }

      case 63:
        ++this.state.pos;return this.finishToken(_types.types.question);
      case 64:
        ++this.state.pos;return this.finishToken(_types.types.at);

      case 96:
        // '`'
        ++this.state.pos;
        return this.finishToken(_types.types.backQuote);

      case 48:
        // '0'
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
      case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
        // 1-9
        return this.readNumber(false);

      // Quotes produce strings.
      case 34:case 39:
        // '"', "'"
        return this.readString(code);

      // Operators are parsed inline in tiny state machines. '=' (61) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.

      case 47:
        // '/'
        return this.readToken_slash();

      case 37:case 42:
        // '%*'
        return this.readToken_mult_modulo(code);

      case 124:case 38:
        // '|&'
        return this.readToken_pipe_amp(code);

      case 94:
        // '^'
        return this.readToken_caret();

      case 43:case 45:
        // '+-'
        return this.readToken_plus_min(code);

      case 60:case 62:
        // '<>'
        return this.readToken_lt_gt(code);

      case 61:case 33:
        // '=!'
        return this.readToken_eq_excl(code);

      case 126:
        // '~'
        return this.finishOp(_types.types.prefix, 1);
    }

    this.raise(this.state.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  Tokenizer.prototype.finishOp = function finishOp(type, size) {
    var str = this.input.slice(this.state.pos, this.state.pos + size);
    this.state.pos += size;
    return this.finishToken(type, str);
  };

  Tokenizer.prototype.readRegexp = function readRegexp() {
    // istanbul ignore next

    var _this = this;

    var escaped = undefined,
        inClass = undefined,
        start = this.state.pos;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
      var ch = this.input.charAt(this.state.pos);
      if (_utilWhitespace.lineBreak.test(ch)) {
        this.raise(start, "Unterminated regular expression");
      }
      if (escaped) {
        escaped = false;
      } else {
        if (ch === "[") {
          inClass = true;
        } else if (ch === "]" && inClass) {
          inClass = false;
        } else if (ch === "/" && !inClass) {
          break;
        }
        escaped = ch === "\\";
      }
      ++this.state.pos;
    }
    var content = this.input.slice(start, this.state.pos);
    ++this.state.pos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = this.readWord1();
    var tmp = content;
    if (mods) {
      var validFlags = /^[gmsiyu]*$/;
      if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
      if (mods.indexOf("u") >= 0 && !regexpUnicodeSupport) {
        // Replace each astral symbol and every Unicode escape sequence that
        // possibly represents an astral symbol or a paired surrogate with a
        // single ASCII symbol to avoid throwing on regular expressions that
        // are only valid in combination with the `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it would
        // be replaced by `[x-b]` which throws an error.
        tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (match, code, offset) {
          code = Number("0x" + code);
          if (code > 0x10FFFF) _this.raise(start + offset + 3, "Code point out of bounds");
          return "x";
        });
        tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
      }
    }
    // Detect invalid regular expressions.
    var value = null;
    // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
    // so don't do detection if we are running under Rhino
    if (!isRhino) {
      tryCreateRegexp.call(this, tmp, undefined, start);
      // Get a regular expression object for this pattern-flag pair, or `null` in
      // case the current environment doesn't support the flags it uses.
      value = tryCreateRegexp.call(this, content, mods);
    }
    return this.finishToken(_types.types.regexp, {
      pattern: content,
      flags: mods,
      value: value
    });
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  Tokenizer.prototype.readInt = function readInt(radix, len) {
    var start = this.state.pos,
        total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.state.pos),
          val = undefined;
      if (code >= 97) {
        val = code - 97 + 10; // a
      } else if (code >= 65) {
          val = code - 65 + 10; // A
        } else if (code >= 48 && code <= 57) {
            val = code - 48; // 0-9
          } else {
              val = Infinity;
            }
      if (val >= radix) break;
      ++this.state.pos;
      total = total * radix + val;
    }
    if (this.state.pos === start || len != null && this.state.pos - start !== len) return null;

    return total;
  };

  Tokenizer.prototype.readRadixNumber = function readRadixNumber(radix) {
    this.state.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) this.raise(this.state.start + 2, "Expected number in radix " + radix);
    if (_utilIdentifier.isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");
    return this.finishToken(_types.types.num, val);
  };

  // Read an integer, octal integer, or floating-point number.

  Tokenizer.prototype.readNumber = function readNumber(startsWithDot) {
    var start = this.state.pos,
        isFloat = false,
        octal = this.input.charCodeAt(this.state.pos) === 48;
    if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
    var next = this.input.charCodeAt(this.state.pos);
    if (next === 46) {
      // '.'
      ++this.state.pos;
      this.readInt(10);
      isFloat = true;
      next = this.input.charCodeAt(this.state.pos);
    }
    if (next === 69 || next === 101) {
      // 'eE'
      next = this.input.charCodeAt(++this.state.pos);
      if (next === 43 || next === 45) ++this.state.pos; // '+-'
      if (this.readInt(10) === null) this.raise(start, "Invalid number");
      isFloat = true;
    }
    if (_utilIdentifier.isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");

    var str = this.input.slice(start, this.state.pos),
        val = undefined;
    if (isFloat) {
      val = parseFloat(str);
    } else if (!octal || str.length === 1) {
      val = parseInt(str, 10);
    } else if (/[89]/.test(str) || this.strict) {
      this.raise(start, "Invalid number");
    } else {
      val = parseInt(str, 8);
    }
    return this.finishToken(_types.types.num, val);
  };

  // Read a string value, interpreting backslash-escapes.

  Tokenizer.prototype.readCodePoint = function readCodePoint() {
    var ch = this.input.charCodeAt(this.state.pos),
        code = undefined;

    if (ch === 123) {
      var codePos = ++this.state.pos;
      code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos);
      ++this.state.pos;
      if (code > 0x10FFFF) this.raise(codePos, "Code point out of bounds");
    } else {
      code = this.readHexChar(4);
    }
    return code;
  };

  Tokenizer.prototype.readString = function readString(quote) {
    var out = "",
        chunkStart = ++this.state.pos;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated string constant");
      var ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.state.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.state.pos;
      } else {
        if (_utilWhitespace.isNewLine(ch)) this.raise(this.state.start, "Unterminated string constant");
        ++this.state.pos;
      }
    }
    out += this.input.slice(chunkStart, this.state.pos++);
    return this.finishToken(_types.types.string, out);
  };

  // Reads template string tokens.

  Tokenizer.prototype.readTmplToken = function readTmplToken() {
    var out = "",
        chunkStart = this.state.pos;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated template");
      var ch = this.input.charCodeAt(this.state.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.state.pos + 1) === 123) {
        // '`', '${'
        if (this.state.pos === this.state.start && this.match(_types.types.template)) {
          if (ch === 36) {
            this.state.pos += 2;
            return this.finishToken(_types.types.dollarBraceL);
          } else {
            ++this.state.pos;
            return this.finishToken(_types.types.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.state.pos);
        return this.finishToken(_types.types.template, out);
      }
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.state.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.state.pos;
      } else if (_utilWhitespace.isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.state.pos);
        ++this.state.pos;
        switch (ch) {
          case 13:
            if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos;
          case 10:
            out += "\n";
            break;
          default:
            out += String.fromCharCode(ch);
            break;
        }
        ++this.state.curLine;
        this.state.lineStart = this.state.pos;
        chunkStart = this.state.pos;
      } else {
        ++this.state.pos;
      }
    }
  };

  // Used to read escaped characters

  Tokenizer.prototype.readEscapedChar = function readEscapedChar(inTemplate) {
    var ch = this.input.charCodeAt(++this.state.pos);
    ++this.state.pos;
    switch (ch) {
      case 110:
        return "\n"; // 'n' -> '\n'
      case 114:
        return "\r"; // 'r' -> '\r'
      case 120:
        return String.fromCharCode(this.readHexChar(2)); // 'x'
      case 117:
        return codePointToString(this.readCodePoint()); // 'u'
      case 116:
        return "\t"; // 't' -> '\t'
      case 98:
        return "\b"; // 'b' -> '\b'
      case 118:
        return "\u000b"; // 'v' -> '\u000b'
      case 102:
        return "\f"; // 'f' -> '\f'
      case 13:
        if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos; // '\r\n'
      case 10:
        // ' \n'
        this.state.lineStart = this.state.pos;
        ++this.state.curLine;
        return "";
      default:
        if (ch >= 48 && ch <= 55) {
          var octalStr = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);
          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }
          if (octal > 0 && (this.strict || inTemplate)) {
            this.raise(this.state.pos - 2, "Octal literal in strict mode");
          }
          this.state.pos += octalStr.length - 1;
          return String.fromCharCode(octal);
        }
        return String.fromCharCode(ch);
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  Tokenizer.prototype.readHexChar = function readHexChar(len) {
    var codePos = this.state.pos;
    var n = this.readInt(16, len);
    if (n === null) this.raise(codePos, "Bad character escape sequence");
    return n;
  };

  // Read an identifier, and return it as a string. Sets `this.state.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  Tokenizer.prototype.readWord1 = function readWord1() {
    this.state.containsEsc = false;
    var word = "",
        first = true,
        chunkStart = this.state.pos;
    while (this.state.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (_utilIdentifier.isIdentifierChar(ch, true)) {
        this.state.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) {
        // "\"
        this.state.containsEsc = true;

        word += this.input.slice(chunkStart, this.state.pos);
        var escStart = this.state.pos;

        if (this.input.charCodeAt(++this.state.pos) !== 117) {
          // "u"
          this.raise(this.state.pos, "Expecting Unicode escape sequence \\uXXXX");
        }

        ++this.state.pos;
        var esc = this.readCodePoint();
        if (!(first ? _utilIdentifier.isIdentifierStart : _utilIdentifier.isIdentifierChar)(esc, true)) {
          this.raise(escStart, "Invalid Unicode escape");
        }

        word += codePointToString(esc);
        chunkStart = this.state.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.state.pos);
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  Tokenizer.prototype.readWord = function readWord() {
    var word = this.readWord1();
    var type = _types.types.name;
    if (!this.state.containsEsc && this.isKeyword(word)) type = _types.keywords[word];
    return this.finishToken(type, word);
  };

  Tokenizer.prototype.braceIsBlock = function braceIsBlock(prevType) {
    if (prevType === _types.types.colon) {
      var _parent = this.curContext();
      if (_parent === _context.types.b_stat || _parent === _context.types.b_expr) {
        return !_parent.isExpr;
      }
    }

    if (prevType === _types.types._return) {
      return _utilWhitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
    }

    if (prevType === _types.types._else || prevType === _types.types.semi || prevType === _types.types.eof || prevType === _types.types.parenR) {
      return true;
    }

    if (prevType === _types.types.braceL) {
      return this.curContext() === _context.types.b_stat;
    }

    return !this.state.exprAllowed;
  };

  Tokenizer.prototype.updateContext = function updateContext(prevType) {
    var update = undefined,
        type = this.state.type;
    if (type.keyword && prevType === _types.types.dot) {
      this.state.exprAllowed = false;
    } else if (update = type.updateContext) {
      update.call(this, prevType);
    } else {
      this.state.exprAllowed = type.beforeExpr;
    }
  };

  return Tokenizer;
})();

exports["default"] = Tokenizer;
}, function(modId) { var map = {"../util/identifier":1676544235729,"./types":1676544235732,"./context":1676544235733,"../util/location":1676544235734,"../util/whitespace":1676544235735,"./state":1676544235736}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235732, function(require, module, exports) {
// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenType = function TokenType(label) {
  var conf = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  _classCallCheck(this, TokenType);

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.rightAssociative = !!conf.rightAssociative;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

exports.TokenType = TokenType;

function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true },
    startsExpr = { startsExpr: true };

var types = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  doubleColon: new TokenType("::", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
  at: new TokenType("@"),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("prefix", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=", 6),
  relational: binop("</>", 7),
  bitShift: binop("<</>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  exponent: new TokenType("**", { beforeExpr: true, binop: 11, rightAssociative: true })
};

exports.types = types;
// Map keyword names to token types.

var keywords = {};

exports.keywords = keywords;
// Succinct definitions of keyword token types
function kw(name) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.keyword = name;
  keywords[name] = types["_" + name] = new TokenType(name, options);
}

kw("break");
kw("case", beforeExpr);
kw("catch");
kw("continue");
kw("debugger");
kw("default", beforeExpr);
kw("do", { isLoop: true });
kw("else", beforeExpr);
kw("finally");
kw("for", { isLoop: true });
kw("function", startsExpr);
kw("if");
kw("return", beforeExpr);
kw("switch");
kw("throw", beforeExpr);
kw("try");
kw("var");
kw("let");
kw("const");
kw("while", { isLoop: true });
kw("with");
kw("new", { beforeExpr: true, startsExpr: true });
kw("this", startsExpr);
kw("super", startsExpr);
kw("class");
kw("extends", beforeExpr);
kw("export");
kw("import");
kw("yield", { beforeExpr: true, startsExpr: true });
kw("null", startsExpr);
kw("true", startsExpr);
kw("false", startsExpr);
kw("in", { beforeExpr: true, binop: 7 });
kw("instanceof", { beforeExpr: true, binop: 7 });
kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true });
kw("void", { beforeExpr: true, prefix: true, startsExpr: true });
kw("delete", { beforeExpr: true, prefix: true, startsExpr: true });
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235733, function(require, module, exports) {
// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design



exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _types = require("./types");

var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
  _classCallCheck(this, TokContext);

  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
};

exports.TokContext = TokContext;
var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", true),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) {
    return p.readTmplToken();
  }),
  f_expr: new TokContext("function", true)
};

exports.types = types;
// Token-specific context update code

_types.types.parenR.updateContext = _types.types.braceR.updateContext = function () {
  if (this.state.context.length === 1) {
    this.state.exprAllowed = true;
    return;
  }

  var out = this.state.context.pop();
  if (out === types.b_stat && this.curContext() === types.f_expr) {
    this.state.context.pop();
    this.state.exprAllowed = false;
  } else if (out === types.b_tmpl) {
    this.state.exprAllowed = true;
  } else {
    this.state.exprAllowed = !out.isExpr;
  }
};

_types.types.braceL.updateContext = function (prevType) {
  this.state.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.state.exprAllowed = true;
};

_types.types.dollarBraceL.updateContext = function () {
  this.state.context.push(types.b_tmpl);
  this.state.exprAllowed = true;
};

_types.types.parenL.updateContext = function (prevType) {
  var statementParens = prevType === _types.types._if || prevType === _types.types._for || prevType === _types.types._with || prevType === _types.types._while;
  this.state.context.push(statementParens ? types.p_stat : types.p_expr);
  this.state.exprAllowed = true;
};

_types.types.incDec.updateContext = function () {
  // tokExprAllowed stays unchanged
};

_types.types._function.updateContext = function () {
  if (this.curContext() !== types.b_stat) {
    this.state.context.push(types.f_expr);
  }

  this.state.exprAllowed = false;
};

_types.types.backQuote.updateContext = function () {
  if (this.curContext() === types.q_tmpl) {
    this.state.context.pop();
  } else {
    this.state.context.push(types.q_tmpl);
  }
  this.state.exprAllowed = false;
};
}, function(modId) { var map = {"./types":1676544235732}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235734, function(require, module, exports) {


exports.__esModule = true;
exports.getLineInfo = getLineInfo;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _whitespace = require("./whitespace");

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  _classCallCheck(this, Position);

  this.line = line;
  this.column = col;
};

exports.Position = Position;

var SourceLocation = function SourceLocation(start, end) {
  _classCallCheck(this, SourceLocation);

  this.start = start;
  this.end = end;
}

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

;

exports.SourceLocation = SourceLocation;

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    _whitespace.lineBreakG.lastIndex = cur;
    var match = _whitespace.lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur);
    }
  }
}
}, function(modId) { var map = {"./whitespace":1676544235735}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235735, function(require, module, exports) {
// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.



exports.__esModule = true;
exports.isNewLine = isNewLine;
var lineBreak = /\r\n?|\n|\u2028|\u2029/;
exports.lineBreak = lineBreak;
var lineBreakG = new RegExp(lineBreak.source, "g");

exports.lineBreakG = lineBreakG;

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
exports.nonASCIIwhitespace = nonASCIIwhitespace;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235736, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilLocation = require("../util/location");

var _context = require("./context");

var _types = require("./types");

var State = (function () {
  function State() {
    _classCallCheck(this, State);
  }

  State.prototype.init = function init(input) {
    this.input = input;

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;

    // Flags to track whether we are in a function, a generator.
    this.inFunction = this.inGenerator = false;

    // Labels in scope.
    this.labels = [];

    // Leading decorators.
    this.decorators = [];

    // Token store.
    this.tokens = [];

    // Comment store.
    this.comments = [];

    // Comment attachment store
    this.trailingComments = [];
    this.leadingComments = [];
    this.commentStack = [];

    // The current position of the tokenizer in the input.
    this.pos = this.lineStart = 0;
    this.curLine = 1;

    // Properties of the current token:
    // Its type
    this.type = _types.types.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = [_context.types.b_stat];
    this.exprAllowed = true;

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.

    this.containsEsc = false;

    return this;
  };

  State.prototype.curPosition = function curPosition() {
    return new _utilLocation.Position(this.curLine, this.pos - this.lineStart);
  };

  State.prototype.clone = function clone() {
    var state = new State();
    for (var key in this) {
      var val = this[key];
      if (Array.isArray(val)) val = val.slice();
      state[key] = val;
    }
    return state;
  };

  return State;
})();

exports["default"] = State;
module.exports = exports["default"];
}, function(modId) { var map = {"../util/location":1676544235734,"./context":1676544235733,"./types":1676544235732}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235737, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tokenizerTypes = require("../tokenizer/types");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _utilWhitespace = require("../util/whitespace");

var pp = _index2["default"].prototype;

// ## Parser utilities

// Test whether a statement node is the string literal `"use strict"`.

pp.isUseStrict = function (stmt) {
  return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.raw.slice(1, -1) === "use strict";
};

// TODO

pp.isRelational = function (op) {
  return this.match(_tokenizerTypes.types.relational) && this.state.value === op;
};

// TODO

pp.expectRelational = function (op) {
  if (this.isRelational(op)) {
    this.next();
  } else {
    this.unexpected();
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function (name) {
  return this.match(_tokenizerTypes.types.name) && this.state.value === name;
};

// Consumes contextual keyword if possible.

pp.eatContextual = function (name) {
  return this.state.value === name && this.eat(_tokenizerTypes.types.name);
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function (name) {
  if (!this.eatContextual(name)) this.unexpected();
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function () {
  return this.match(_tokenizerTypes.types.eof) || this.match(_tokenizerTypes.types.braceR) || _utilWhitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function () {
  if (!this.eat(_tokenizerTypes.types.semi) && !this.canInsertSemicolon()) this.unexpected();
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function (type) {
  return this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function (pos) {
  this.raise(pos != null ? pos : this.state.start, "Unexpected token");
};
}, function(modId) { var map = {"../tokenizer/types":1676544235732,"./index":1676544235728,"../util/whitespace":1676544235735}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235738, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tokenizerTypes = require("../tokenizer/types");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _utilWhitespace = require("../util/whitespace");

var pp = _index2["default"].prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp.parseTopLevel = function (file, program) {
  program.sourceType = this.options.sourceType;
  program.body = [];

  var first = true;
  while (!this.match(_tokenizerTypes.types.eof)) {
    var stmt = this.parseStatement(true, true);
    program.body.push(stmt);
    if (first) {
      if (this.isUseStrict(stmt)) this.setStrict(true);
      first = false;
    }
  }
  this.next();

  file.program = this.finishNode(program, "Program");
  file.comments = this.state.comments;
  file.tokens = this.state.tokens;

  return this.finishNode(file, "File");
};

var loopLabel = { kind: "loop" },
    switchLabel = { kind: "switch" };

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp.parseStatement = function (declaration, topLevel) {
  if (this.match(_tokenizerTypes.types.at)) {
    this.parseDecorators(true);
  }

  var starttype = this.state.type,
      node = this.startNode();

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
    case _tokenizerTypes.types._break:case _tokenizerTypes.types._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case _tokenizerTypes.types._debugger:
      return this.parseDebuggerStatement(node);
    case _tokenizerTypes.types._do:
      return this.parseDoStatement(node);
    case _tokenizerTypes.types._for:
      return this.parseForStatement(node);
    case _tokenizerTypes.types._function:
      if (!declaration) this.unexpected();
      return this.parseFunctionStatement(node);

    case _tokenizerTypes.types._class:
      if (!declaration) this.unexpected();
      this.takeDecorators(node);
      return this.parseClass(node, true);

    case _tokenizerTypes.types._if:
      return this.parseIfStatement(node);
    case _tokenizerTypes.types._return:
      return this.parseReturnStatement(node);
    case _tokenizerTypes.types._switch:
      return this.parseSwitchStatement(node);
    case _tokenizerTypes.types._throw:
      return this.parseThrowStatement(node);
    case _tokenizerTypes.types._try:
      return this.parseTryStatement(node);
    case _tokenizerTypes.types._let:case _tokenizerTypes.types._const:
      if (!declaration) this.unexpected(); // NOTE: falls through to _var
    case _tokenizerTypes.types._var:
      return this.parseVarStatement(node, starttype);
    case _tokenizerTypes.types._while:
      return this.parseWhileStatement(node);
    case _tokenizerTypes.types._with:
      return this.parseWithStatement(node);
    case _tokenizerTypes.types.braceL:
      return this.parseBlock();
    case _tokenizerTypes.types.semi:
      return this.parseEmptyStatement(node);
    case _tokenizerTypes.types._export:
    case _tokenizerTypes.types._import:
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) this.raise(this.state.start, "'import' and 'export' may only appear at the top level");

        if (!this.inModule) this.raise(this.state.start, "'import' and 'export' may appear only with 'sourceType: module'");
      }
      return starttype === _tokenizerTypes.types._import ? this.parseImport(node) : this.parseExport(node);

    case _tokenizerTypes.types.name:
      if (this.options.features["es7.asyncFunctions"] && this.state.value === "async") {
        // peek ahead and see if next token is a function
        var state = this.state.clone();
        this.next();
        if (this.match(_tokenizerTypes.types._function) && !this.canInsertSemicolon()) {
          this.expect(_tokenizerTypes.types._function);
          return this.parseFunction(node, true, false, true);
        } else {
          this.state = state;
        }
      }

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      var maybeName = this.state.value,
          expr = this.parseExpression();

      if (starttype === _tokenizerTypes.types.name && expr.type === "Identifier" && this.eat(_tokenizerTypes.types.colon)) {
        return this.parseLabeledStatement(node, maybeName, expr);
      } else {
        return this.parseExpressionStatement(node, expr);
      }
  }
};

pp.takeDecorators = function (node) {
  if (this.state.decorators.length) {
    node.decorators = this.state.decorators;
    this.state.decorators = [];
  }
};

pp.parseDecorators = function (allowExport) {
  while (this.match(_tokenizerTypes.types.at)) {
    this.state.decorators.push(this.parseDecorator());
  }

  if (allowExport && this.match(_tokenizerTypes.types._export)) {
    return;
  }

  if (!this.match(_tokenizerTypes.types._class)) {
    this.raise(this.state.start, "Leading decorators must be attached to a class declaration");
  }
};

pp.parseDecorator = function () {
  if (!this.options.features["es7.decorators"]) {
    this.unexpected();
  }
  var node = this.startNode();
  this.next();
  node.expression = this.parseMaybeAssign();
  return this.finishNode(node, "Decorator");
};

pp.parseBreakContinueStatement = function (node, keyword) {
  var isBreak = keyword === "break";
  this.next();

  if (this.eat(_tokenizerTypes.types.semi) || this.canInsertSemicolon()) {
    node.label = null;
  } else if (!this.match(_tokenizerTypes.types.name)) {
    this.unexpected();
  } else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  for (var i = 0; i < this.state.labels.length; ++i) {
    var lab = this.state.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
      if (node.label && isBreak) break;
    }
  }
  if (i === this.state.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};

pp.parseDebuggerStatement = function (node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};

pp.parseDoStatement = function (node) {
  this.next();
  this.state.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  this.expect(_tokenizerTypes.types._while);
  node.test = this.parseParenExpression();
  this.eat(_tokenizerTypes.types.semi);
  return this.finishNode(node, "DoWhileStatement");
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp.parseForStatement = function (node) {
  this.next();
  this.state.labels.push(loopLabel);
  this.expect(_tokenizerTypes.types.parenL);

  if (this.match(_tokenizerTypes.types.semi)) {
    return this.parseFor(node, null);
  }

  if (this.match(_tokenizerTypes.types._var) || this.match(_tokenizerTypes.types._let) || this.match(_tokenizerTypes.types._const)) {
    var _init = this.startNode(),
        varKind = this.state.type;
    this.next();
    this.parseVar(_init, true, varKind);
    this.finishNode(_init, "VariableDeclaration");
    if ((this.match(_tokenizerTypes.types._in) || this.isContextual("of")) && _init.declarations.length === 1 && !(varKind !== _tokenizerTypes.types._var && _init.declarations[0].init)) return this.parseForIn(node, _init);
    return this.parseFor(node, _init);
  }

  var refShorthandDefaultPos = { start: 0 };
  var init = this.parseExpression(true, refShorthandDefaultPos);
  if (this.match(_tokenizerTypes.types._in) || this.isContextual("of")) {
    this.toAssignable(init);
    this.checkLVal(init);
    return this.parseForIn(node, init);
  } else if (refShorthandDefaultPos.start) {
    this.unexpected(refShorthandDefaultPos.start);
  }
  return this.parseFor(node, init);
};

pp.parseFunctionStatement = function (node) {
  this.next();
  return this.parseFunction(node, true);
};

pp.parseIfStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  node.consequent = this.parseStatement(false);
  node.alternate = this.eat(_tokenizerTypes.types._else) ? this.parseStatement(false) : null;
  return this.finishNode(node, "IfStatement");
};

pp.parseReturnStatement = function (node) {
  if (!this.state.inFunction && !this.options.allowReturnOutsideFunction) {
    this.raise(this.state.start, "'return' outside of function");
  }

  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(_tokenizerTypes.types.semi) || this.canInsertSemicolon()) {
    node.argument = null;
  } else {
    node.argument = this.parseExpression();
    this.semicolon();
  }

  return this.finishNode(node, "ReturnStatement");
};

pp.parseSwitchStatement = function (node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(_tokenizerTypes.types.braceL);
  this.state.labels.push(switchLabel);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  for (var cur, sawDefault; !this.match(_tokenizerTypes.types.braceR);) {
    if (this.match(_tokenizerTypes.types._case) || this.match(_tokenizerTypes.types._default)) {
      var isCase = this.match(_tokenizerTypes.types._case);
      if (cur) this.finishNode(cur, "SwitchCase");
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) this.raise(this.state.lastTokStart, "Multiple default clauses");
        sawDefault = true;
        cur.test = null;
      }
      this.expect(_tokenizerTypes.types.colon);
    } else {
      if (!cur) this.unexpected();
      cur.consequent.push(this.parseStatement(true));
    }
  }
  if (cur) this.finishNode(cur, "SwitchCase");
  this.next(); // Closing brace
  this.state.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};

pp.parseThrowStatement = function (node) {
  this.next();
  if (_utilWhitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start))) this.raise(this.state.lastTokEnd, "Illegal newline after throw");
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp.parseTryStatement = function (node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.match(_tokenizerTypes.types._catch)) {
    var clause = this.startNode();
    this.next();
    this.expect(_tokenizerTypes.types.parenL);
    clause.param = this.parseBindingAtom();
    this.checkLVal(clause.param, true);
    this.expect(_tokenizerTypes.types.parenR);
    clause.body = this.parseBlock();
    node.handler = this.finishNode(clause, "CatchClause");
  }

  node.guardedHandlers = empty;
  node.finalizer = this.eat(_tokenizerTypes.types._finally) ? this.parseBlock() : null;

  if (!node.handler && !node.finalizer) {
    this.raise(node.start, "Missing catch or finally clause");
  }

  return this.finishNode(node, "TryStatement");
};

pp.parseVarStatement = function (node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};

pp.parseWhileStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  this.state.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, "WhileStatement");
};

pp.parseWithStatement = function (node) {
  if (this.strict) this.raise(this.state.start, "'with' in strict mode");
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement(false);
  return this.finishNode(node, "WithStatement");
};

pp.parseEmptyStatement = function (node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};

pp.parseLabeledStatement = function (node, maybeName, expr) {
  var _arr = this.state.labels;

  for (var _i = 0; _i < _arr.length; _i++) {
    var label = _arr[_i];
    if (label.name === maybeName) {
      this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
  }

  var kind = this.state.type.isLoop ? "loop" : this.match(_tokenizerTypes.types._switch) ? "switch" : null;
  for (var i = this.state.labels.length - 1; i >= 0; i--) {
    var label = this.state.labels[i];
    if (label.statementStart === node.start) {
      label.statementStart = this.state.start;
      label.kind = kind;
    } else {
      break;
    }
  }

  this.state.labels.push({ name: maybeName, kind: kind, statementStart: this.state.start });
  node.body = this.parseStatement(true);
  this.state.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};

pp.parseExpressionStatement = function (node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp.parseBlock = function (allowStrict) {
  var node = this.startNode(),
      first = true,
      oldStrict = undefined;
  node.body = [];
  this.expect(_tokenizerTypes.types.braceL);
  while (!this.eat(_tokenizerTypes.types.braceR)) {
    var stmt = this.parseStatement(true);
    node.body.push(stmt);
    if (first && allowStrict && this.isUseStrict(stmt)) {
      oldStrict = this.strict;
      this.setStrict(this.strict = true);
    }
    first = false;
  }
  if (oldStrict === false) this.setStrict(false);
  return this.finishNode(node, "BlockStatement");
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp.parseFor = function (node, init) {
  node.init = init;
  this.expect(_tokenizerTypes.types.semi);
  node.test = this.match(_tokenizerTypes.types.semi) ? null : this.parseExpression();
  this.expect(_tokenizerTypes.types.semi);
  node.update = this.match(_tokenizerTypes.types.parenR) ? null : this.parseExpression();
  this.expect(_tokenizerTypes.types.parenR);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, "ForStatement");
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp.parseForIn = function (node, init) {
  var type = this.match(_tokenizerTypes.types._in) ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.expect(_tokenizerTypes.types.parenR);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, type);
};

// Parse a list of variable declarations.

pp.parseVar = function (node, isFor, kind) {
  node.declarations = [];
  node.kind = kind.keyword;
  for (;;) {
    var decl = this.startNode();
    this.parseVarHead(decl);
    if (this.eat(_tokenizerTypes.types.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (kind === _tokenizerTypes.types._const && !(this.match(_tokenizerTypes.types._in) || this.isContextual("of"))) {
      this.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this.match(_tokenizerTypes.types._in) || this.isContextual("of")))) {
      this.raise(this.state.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(_tokenizerTypes.types.comma)) break;
  }
  return node;
};

pp.parseVarHead = function (decl) {
  decl.id = this.parseBindingAtom();
  this.checkLVal(decl.id, true);
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp.parseFunction = function (node, isStatement, allowExpressionBody, isAsync) {
  this.initFunction(node, isAsync);
  node.generator = this.eat(_tokenizerTypes.types.star);

  if (isStatement || this.match(_tokenizerTypes.types.name)) {
    node.id = this.parseIdent();
  }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

pp.parseFunctionParams = function (node) {
  this.expect(_tokenizerTypes.types.parenL);
  node.params = this.parseBindingList(_tokenizerTypes.types.parenR, false, this.options.features["es7.trailingFunctionCommas"]);
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp.parseClass = function (node, isStatement) {
  this.next();
  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(_tokenizerTypes.types.braceL);
  var decorators = [];
  while (!this.eat(_tokenizerTypes.types.braceR)) {
    if (this.eat(_tokenizerTypes.types.semi)) continue;
    if (this.match(_tokenizerTypes.types.at)) {
      decorators.push(this.parseDecorator());
      continue;
    }
    var method = this.startNode();
    if (decorators.length) {
      method.decorators = decorators;
      decorators = [];
    }
    var isMaybeStatic = this.match(_tokenizerTypes.types.name) && this.state.value === "static";
    var isGenerator = this.eat(_tokenizerTypes.types.star),
        isAsync = false;
    this.parsePropertyName(method);
    method["static"] = isMaybeStatic && !this.match(_tokenizerTypes.types.parenL);
    if (method["static"]) {
      if (isGenerator) this.unexpected();
      isGenerator = this.eat(_tokenizerTypes.types.star);
      this.parsePropertyName(method);
    }
    if (!isGenerator && method.key.type === "Identifier" && !method.computed && this.isClassProperty()) {
      classBody.body.push(this.parseClassProperty(method));
      continue;
    }
    if (this.options.features["es7.asyncFunctions"] && !this.match(_tokenizerTypes.types.parenL) && !method.computed && method.key.type === "Identifier" && method.key.name === "async") {
      isAsync = true;
      this.parsePropertyName(method);
    }
    var isGetSet = false;
    method.kind = "method";
    if (!method.computed) {
      var key = method.key;

      if (!isAsync && !isGenerator && key.type === "Identifier" && !this.match(_tokenizerTypes.types.parenL) && (key.name === "get" || key.name === "set")) {
        isGetSet = true;
        method.kind = key.name;
        key = this.parsePropertyName(method);
      }
      if (!method["static"] && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
        if (hadConstructor) this.raise(key.start, "Duplicate constructor in the same class");
        if (isGetSet) this.raise(key.start, "Constructor can't have get/set modifier");
        if (isGenerator) this.raise(key.start, "Constructor can't be a generator");
        if (isAsync) this.raise(key.start, "Constructor can't be an async function");
        method.kind = "constructor";
        hadConstructor = true;
      }
    }
    if (method.kind === "constructor" && method.decorators) {
      this.raise(method.start, "You can't attach decorators to a class constructor");
    }
    this.parseClassMethod(classBody, method, isGenerator, isAsync);
    if (isGetSet) {
      var paramCount = method.kind === "get" ? 0 : 1;
      if (method.value.params.length !== paramCount) {
        var start = method.value.start;
        if (method.kind === "get") {
          this.raise(start, "getter should have no params");
        } else {
          this.raise(start, "setter should have exactly one param");
        }
      }
    }
  }

  if (decorators.length) {
    this.raise(this.state.start, "You have trailing decorators with no method");
  }

  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};

pp.isClassProperty = function () {
  return this.match(_tokenizerTypes.types.eq) || this.match(_tokenizerTypes.types.semi) || this.canInsertSemicolon();
};

pp.parseClassProperty = function (node) {
  if (this.match(_tokenizerTypes.types.eq)) {
    if (!this.options.features["es7.classProperties"]) this.unexpected();
    this.next();
    node.value = this.parseMaybeAssign();
  } else {
    node.value = null;
  }
  this.semicolon();
  return this.finishNode(node, "ClassProperty");
};

pp.parseClassMethod = function (classBody, method, isGenerator, isAsync) {
  method.value = this.parseMethod(isGenerator, isAsync);
  classBody.body.push(this.finishNode(method, "MethodDefinition"));
};

pp.parseClassId = function (node, isStatement) {
  node.id = this.match(_tokenizerTypes.types.name) ? this.parseIdent() : isStatement ? this.unexpected() : null;
};

pp.parseClassSuper = function (node) {
  node.superClass = this.eat(_tokenizerTypes.types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp.parseExport = function (node) {
  this.next();
  // export * from '...'
  if (this.match(_tokenizerTypes.types.star)) {
    var specifier = this.startNode();
    this.next();
    if (this.options.features["es7.exportExtensions"] && this.eatContextual("as")) {
      specifier.exported = this.parseIdent();
      node.specifiers = [this.finishNode(specifier, "ExportNamespaceSpecifier")];
      this.parseExportSpecifiersMaybe(node);
      this.parseExportFrom(node, true);
    } else {
      this.parseExportFrom(node, true);
      return this.finishNode(node, "ExportAllDeclaration");
    }
  } else if (this.options.features["es7.exportExtensions"] && this.isExportDefaultSpecifier()) {
    var specifier = this.startNode();
    specifier.exported = this.parseIdent(true);
    node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
    if (this.match(_tokenizerTypes.types.comma) && this.lookahead().type === _tokenizerTypes.types.star) {
      this.expect(_tokenizerTypes.types.comma);
      var _specifier = this.startNode();
      this.expect(_tokenizerTypes.types.star);
      this.expectContextual("as");
      _specifier.exported = this.parseIdent();
      node.specifiers.push(this.finishNode(_specifier, "ExportNamespaceSpecifier"));
    } else {
      this.parseExportSpecifiersMaybe(node);
    }
    this.parseExportFrom(node, true);
  } else if (this.eat(_tokenizerTypes.types._default)) {
    // export default ...
    var possibleDeclaration = this.match(_tokenizerTypes.types._function) || this.match(_tokenizerTypes.types._class);
    var expr = this.parseMaybeAssign();
    var needsSemi = true;
    if (possibleDeclaration) {
      needsSemi = false;
      if (expr.id) {
        expr.type = expr.type === "FunctionExpression" ? "FunctionDeclaration" : "ClassDeclaration";
      }
    }
    node.declaration = expr;
    if (needsSemi) this.semicolon();
    this.checkExport(node);
    return this.finishNode(node, "ExportDefaultDeclaration");
  } else if (this.state.type.keyword || this.shouldParseExportDeclaration()) {
    node.specifiers = [];
    node.source = null;
    node.declaration = this.parseExportDeclaration(node);
  } else {
    // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers();
    this.parseExportFrom(node);
  }
  this.checkExport(node);
  return this.finishNode(node, "ExportNamedDeclaration");
};

pp.parseExportDeclaration = function () {
  return this.parseStatement(true);
};

pp.isExportDefaultSpecifier = function () {
  if (this.match(_tokenizerTypes.types.name)) {
    return this.state.value !== "type" && this.state.value !== "async" && this.state.value !== "interface";
  }

  if (!this.match(_tokenizerTypes.types._default)) {
    return false;
  }

  var lookahead = this.lookahead();
  return lookahead.type === _tokenizerTypes.types.comma || lookahead.type === _tokenizerTypes.types.name && lookahead.value === "from";
};

pp.parseExportSpecifiersMaybe = function (node) {
  if (this.eat(_tokenizerTypes.types.comma)) {
    node.specifiers = node.specifiers.concat(this.parseExportSpecifiers());
  }
};

pp.parseExportFrom = function (node, expect) {
  if (this.eatContextual("from")) {
    node.source = this.match(_tokenizerTypes.types.string) ? this.parseExprAtom() : this.unexpected();
    this.checkExport(node);
  } else {
    if (expect) {
      this.unexpected();
    } else {
      node.source = null;
    }
  }

  this.semicolon();
};

pp.shouldParseExportDeclaration = function () {
  return this.options.features["es7.asyncFunctions"] && this.isContextual("async");
};

pp.checkExport = function (node) {
  if (this.state.decorators.length) {
    var isClass = node.declaration && (node.declaration.type === "ClassDeclaration" || node.declaration.type === "ClassExpression");
    if (!node.declaration || !isClass) {
      this.raise(node.start, "You can only use decorators on an export when exporting a class");
    }
    this.takeDecorators(node.declaration);
  }
};

// Parses a comma-separated list of module exports.

pp.parseExportSpecifiers = function () {
  var nodes = [],
      first = true;
  // export { x, y as z } [from '...']
  this.expect(_tokenizerTypes.types.braceL);

  while (!this.eat(_tokenizerTypes.types.braceR)) {
    if (first) {
      first = false;
    } else {
      this.expect(_tokenizerTypes.types.comma);
      if (this.eat(_tokenizerTypes.types.braceR)) break;
    }

    var node = this.startNode();
    node.local = this.parseIdent(this.match(_tokenizerTypes.types._default));
    node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local.__clone();
    nodes.push(this.finishNode(node, "ExportSpecifier"));
  }

  return nodes;
};

// Parses import declaration.

pp.parseImport = function (node) {
  this.next();

  // import '...'
  if (this.match(_tokenizerTypes.types.string)) {
    node.specifiers = [];
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = [];
    this.parseImportSpecifiers(node);
    this.expectContextual("from");
    node.source = this.match(_tokenizerTypes.types.string) ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

// Parses a comma-separated list of module imports.

pp.parseImportSpecifiers = function (node) {
  var first = true;
  if (this.match(_tokenizerTypes.types.name)) {
    // import defaultObj, { x, y as z } from '...'
    var startPos = this.state.start,
        startLoc = this.state.startLoc;
    node.specifiers.push(this.parseImportSpecifierDefault(this.parseIdent(), startPos, startLoc));
    if (!this.eat(_tokenizerTypes.types.comma)) return;
  }

  if (this.match(_tokenizerTypes.types.star)) {
    var specifier = this.startNode();
    this.next();
    this.expectContextual("as");
    specifier.local = this.parseIdent();
    this.checkLVal(specifier.local, true);
    node.specifiers.push(this.finishNode(specifier, "ImportNamespaceSpecifier"));
    return;
  }

  this.expect(_tokenizerTypes.types.braceL);
  while (!this.eat(_tokenizerTypes.types.braceR)) {
    if (first) {
      first = false;
    } else {
      this.expect(_tokenizerTypes.types.comma);
      if (this.eat(_tokenizerTypes.types.braceR)) break;
    }

    var specifier = this.startNode();
    specifier.imported = this.parseIdent(true);
    specifier.local = this.eatContextual("as") ? this.parseIdent() : specifier.imported.__clone();
    this.checkLVal(specifier.local, true);
    node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
  }
};

pp.parseImportSpecifierDefault = function (id, startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.local = id;
  this.checkLVal(node.local, true);
  return this.finishNode(node, "ImportDefaultSpecifier");
};
}, function(modId) { var map = {"../tokenizer/types":1676544235732,"./index":1676544235728,"../util/whitespace":1676544235735}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235739, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tokenizerTypes = require("../tokenizer/types");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _utilIdentifier = require("../util/identifier");

var pp = _index2["default"].prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp.toAssignable = function (node, isBinding) {
  if (node) {
    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        var _arr = node.properties;
        for (var _i = 0; _i < _arr.length; _i++) {
          var prop = _arr[_i];
          if (prop.type === "SpreadProperty") continue;
          if (prop.kind !== "init") this.raise(prop.key.start, "Object pattern can't contain getter or setter");
          this.toAssignable(prop.value, isBinding);
        }
        break;

      case "ArrayExpression":
        node.type = "ArrayPattern";
        this.toAssignableList(node.elements, isBinding);
        break;

      case "AssignmentExpression":
        if (node.operator === "=") {
          node.type = "AssignmentPattern";
          delete node.operator;
        } else {
          this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
        }
        break;

      case "MemberExpression":
        if (!isBinding) break;

      default:
        this.raise(node.start, "Assigning to rvalue");
    }
  }
  return node;
};

// Convert list of expression atoms to binding list.

pp.toAssignableList = function (exprList, isBinding) {
  var end = exprList.length;
  if (end) {
    var last = exprList[end - 1];
    if (last && last.type === "RestElement") {
      --end;
    } else if (last && last.type === "SpreadElement") {
      last.type = "RestElement";
      var arg = last.argument;
      this.toAssignable(arg, isBinding);
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") {
        this.unexpected(arg.start);
      }
      --end;
    }
  }
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) this.toAssignable(elt, isBinding);
  }
  return exprList;
};

// Convert list of expression atoms to a list of

pp.toReferencedList = function (exprList) {
  return exprList;
};

// Parses spread element.

pp.parseSpread = function (refShorthandDefaultPos) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(refShorthandDefaultPos);
  return this.finishNode(node, "SpreadElement");
};

pp.parseRest = function () {
  var node = this.startNode();
  this.next();
  node.argument = this.match(_tokenizerTypes.types.name) || this.match(_tokenizerTypes.types.bracketL) ? this.parseBindingAtom() : this.unexpected();
  return this.finishNode(node, "RestElement");
};

// Parses lvalue (assignable) atom.

pp.parseBindingAtom = function () {
  switch (this.state.type) {
    case _tokenizerTypes.types.name:
      return this.parseIdent();

    case _tokenizerTypes.types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(_tokenizerTypes.types.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern");

    case _tokenizerTypes.types.braceL:
      return this.parseObj(true);

    default:
      this.unexpected();
  }
};

pp.parseBindingList = function (close, allowEmpty, allowTrailingComma) {
  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (first) first = false;else this.expect(_tokenizerTypes.types.comma);
    if (allowEmpty && this.match(_tokenizerTypes.types.comma)) {
      elts.push(null);
    } else if (allowTrailingComma && this.eat(close)) {
      break;
    } else if (this.match(_tokenizerTypes.types.ellipsis)) {
      elts.push(this.parseAssignableListItemTypes(this.parseRest()));
      this.expect(close);
      break;
    } else {
      var left = this.parseMaybeDefault();
      this.parseAssignableListItemTypes(left);
      elts.push(this.parseMaybeDefault(null, null, left));
    }
  }
  return elts;
};

pp.parseAssignableListItemTypes = function (param) {
  return param;
};

// Parses assignment pattern around given atom if possible.

pp.parseMaybeDefault = function (startPos, startLoc, left) {
  startLoc = startLoc || this.state.startLoc;
  startPos = startPos || this.state.start;
  left = left || this.parseBindingAtom();
  if (!this.eat(_tokenizerTypes.types.eq)) return left;

  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};

// Verify that a node is an lval — something that can be assigned
// to.

pp.checkLVal = function (expr, isBinding, checkClashes) {
  switch (expr.type) {
    case "Identifier":
      if (this.strict && (_utilIdentifier.reservedWords.strictBind(expr.name) || _utilIdentifier.reservedWords.strict(expr.name))) this.raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      if (checkClashes) {
        if (checkClashes[expr.name]) {
          this.raise(expr.start, "Argument name clash in strict mode");
        } else {
          checkClashes[expr.name] = true;
        }
      }
      break;

    case "MemberExpression":
      if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
      break;

    case "ObjectPattern":
      var _arr2 = expr.properties;

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var prop = _arr2[_i2];
        if (prop.type === "Property") prop = prop.value;
        this.checkLVal(prop, isBinding, checkClashes);
      }
      break;

    case "ArrayPattern":
      var _arr3 = expr.elements;

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var elem = _arr3[_i3];
        if (elem) this.checkLVal(elem, isBinding, checkClashes);
      }
      break;

    case "AssignmentPattern":
      this.checkLVal(expr.left, isBinding, checkClashes);
      break;

    case "SpreadProperty":
    case "RestElement":
      this.checkLVal(expr.argument, isBinding, checkClashes);
      break;

    default:
      this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " rvalue");
  }
};
}, function(modId) { var map = {"../tokenizer/types":1676544235732,"./index":1676544235728,"../util/identifier":1676544235729}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235740, function(require, module, exports) {
// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser



// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tokenizerTypes = require("../tokenizer/types");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _utilIdentifier = require("../util/identifier");

var pp = _index2["default"].prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp.checkPropClash = function (prop, propHash) {
  if (prop.computed || prop.method || prop.shorthand) return;

  var key = prop.key,
      name = undefined;
  switch (key.type) {
    case "Identifier":
      name = key.name;break;
    case "Literal":
      name = String(key.value);break;
    default:
      return;
  }

  var kind = prop.kind;
  if (name === "__proto__" && kind === "init") {
    if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
    propHash.proto = true;
  }
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function (s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp.parseExpression = function (noIn, refShorthandDefaultPos) {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
  if (this.match(_tokenizerTypes.types.comma)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(_tokenizerTypes.types.comma)) {
      node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
    }
    this.toReferencedList(node.expressions);
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp.parseMaybeAssign = function (noIn, refShorthandDefaultPos, afterLeftParse) {
  if (this.match(_tokenizerTypes.types._yield) && this.state.inGenerator) {
    return this.parseYield();
  }

  var failOnShorthandAssign = undefined;
  if (!refShorthandDefaultPos) {
    refShorthandDefaultPos = { start: 0 };
    failOnShorthandAssign = true;
  } else {
    failOnShorthandAssign = false;
  }
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  if (this.match(_tokenizerTypes.types.parenL) || this.match(_tokenizerTypes.types.name)) {
    this.state.potentialArrowAt = this.state.start;
  }
  var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos);
  if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
  if (this.state.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.state.value;
    node.left = this.match(_tokenizerTypes.types.eq) ? this.toAssignable(left) : left;
    refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly
    this.checkLVal(left);
    if (left.parenthesizedExpression) {
      var errorMsg = undefined;
      if (left.type === "ObjectPattern") {
        errorMsg = "`({a}) = 0` use `({a} = 0)`";
      } else if (left.type === "ArrayPattern") {
        errorMsg = "`([a]) = 0` use `([a] = 0)`";
      }
      if (errorMsg) {
        this.raise(left.start, "You're trying to assign to a parenthesized expression, eg. instead of " + errorMsg);
      }
    }
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression");
  } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
    this.unexpected(refShorthandDefaultPos.start);
  }
  return left;
};

// Parse a ternary conditional (`?:`) operator.

pp.parseMaybeConditional = function (noIn, refShorthandDefaultPos) {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
  if (this.eat(_tokenizerTypes.types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(_tokenizerTypes.types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};

// Start the precedence parser.

pp.parseExprOps = function (noIn, refShorthandDefaultPos) {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var expr = this.parseMaybeUnary(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  } else {
    return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  }
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.state.type.binop;
  if (prec != null && (!noIn || !this.match(_tokenizerTypes.types._in))) {
    if (prec > minPrec) {
      var node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.left = left;
      node.operator = this.state.value;
      var op = this.state.type;
      this.next();
      var startPos = this.state.start,
          startLoc = this.state.startLoc;
      node.right = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, op.rightAssociative ? prec - 1 : prec, noIn);
      this.finishNode(node, op === _tokenizerTypes.types.logicalOR || op === _tokenizerTypes.types.logicalAND ? "LogicalExpression" : "BinaryExpression");
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
  }
  return left;
};

// Parse unary operators, both prefix and postfix.

pp.parseMaybeUnary = function (refShorthandDefaultPos) {
  if (this.state.type.prefix) {
    var node = this.startNode(),
        update = this.match(_tokenizerTypes.types.incDec);
    node.operator = this.state.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary();
    if (refShorthandDefaultPos && refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);
    if (update) {
      this.checkLVal(node.argument);
    } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
      this.raise(node.start, "Deleting local variable in strict mode");
    }
    return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  }

  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var expr = this.parseExprSubscripts(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
  while (this.state.type.postfix && !this.canInsertSemicolon()) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.state.value;
    node.prefix = false;
    node.argument = expr;
    this.checkLVal(expr);
    this.next();
    expr = this.finishNode(node, "UpdateExpression");
  }
  return expr;
};

// Parse call, dot, and `[]`-subscript expressions.

pp.parseExprSubscripts = function (refShorthandDefaultPos) {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var expr = this.parseExprAtom(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  } else {
    return this.parseSubscripts(expr, startPos, startLoc);
  }
};

pp.parseSubscripts = function (base, startPos, startLoc, noCalls) {
  for (;;) {
    if (!noCalls && this.eat(_tokenizerTypes.types.doubleColon)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.callee = this.parseNoCallExpr();
      return this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
    } else if (this.eat(_tokenizerTypes.types.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseIdent(true);
      node.computed = false;
      base = this.finishNode(node, "MemberExpression");
    } else if (this.eat(_tokenizerTypes.types.bracketL)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = this.parseExpression();
      node.computed = true;
      this.expect(_tokenizerTypes.types.bracketR);
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.match(_tokenizerTypes.types.parenL)) {
      var possibleAsync = base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon();
      this.next();

      var node = this.startNodeAt(startPos, startLoc);
      node.callee = base;
      node.arguments = this.parseExprList(_tokenizerTypes.types.parenR, this.options.features["es7.trailingFunctionCommas"]);
      base = this.finishNode(node, "CallExpression");

      if (possibleAsync && (this.match(_tokenizerTypes.types.colon) || this.match(_tokenizerTypes.types.arrow))) {
        base = this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), node);
      } else {
        this.toReferencedList(node.arguments);
      }
    } else if (this.match(_tokenizerTypes.types.backQuote)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.tag = base;
      node.quasi = this.parseTemplate();
      base = this.finishNode(node, "TaggedTemplateExpression");
    } else {
      return base;
    }
  }
};

pp.parseAsyncArrowFromCallExpression = function (node, call) {
  if (!this.options.features["es7.asyncFunctions"]) this.unexpected();
  this.expect(_tokenizerTypes.types.arrow);
  return this.parseArrowExpression(node, call.arguments, true);
};

// Parse a no-call expression (like argument of `new` or `::` operators).

pp.parseNoCallExpr = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp.parseExprAtom = function (refShorthandDefaultPos) {
  var node = undefined,
      canBeArrow = this.state.potentialArrowAt === this.state.start;
  switch (this.state.type) {
    case _tokenizerTypes.types._super:
      if (!this.state.inFunction) this.raise(this.state.start, "'super' outside of function or class");
    case _tokenizerTypes.types._this:
      var type = this.match(_tokenizerTypes.types._this) ? "ThisExpression" : "Super";
      node = this.startNode();
      this.next();
      return this.finishNode(node, type);

    case _tokenizerTypes.types._yield:
      if (this.state.inGenerator) this.unexpected();

    case _tokenizerTypes.types._do:
      if (this.options.features["es7.doExpressions"]) {
        var _node = this.startNode();
        this.next();
        var oldInFunction = this.state.inFunction;
        var oldLabels = this.state.labels;
        this.state.labels = [];
        this.state.inFunction = false;
        _node.body = this.parseBlock();
        this.state.inFunction = oldInFunction;
        this.state.labels = oldLabels;
        return this.finishNode(_node, "DoExpression");
      }

    case _tokenizerTypes.types.name:
      node = this.startNode();
      var id = this.parseIdent(true);

      if (this.options.features["es7.asyncFunctions"]) {
        if (id.name === "await") {
          if (this.inAsync) return this.parseAwait(node);
        } else if (id.name === "async" && this.match(_tokenizerTypes.types._function) && !this.canInsertSemicolon()) {
          this.next();
          return this.parseFunction(node, false, false, true);
        } else if (canBeArrow && id.name === "async" && this.match(_tokenizerTypes.types.name)) {
          var params = [this.parseIdent()];
          this.expect(_tokenizerTypes.types.arrow);
          // var foo = bar => {};
          return this.parseArrowExpression(node, params, true);
        }
      }

      if (canBeArrow && !this.canInsertSemicolon() && this.eat(_tokenizerTypes.types.arrow)) {
        return this.parseArrowExpression(node, [id]);
      }

      return id;

    case _tokenizerTypes.types.regexp:
      var value = this.state.value;
      node = this.parseLiteral(value.value);
      node.regex = { pattern: value.pattern, flags: value.flags };
      return node;

    case _tokenizerTypes.types.num:case _tokenizerTypes.types.string:
      return this.parseLiteral(this.state.value);

    case _tokenizerTypes.types._null:case _tokenizerTypes.types._true:case _tokenizerTypes.types._false:
      node = this.startNode();
      node.rawValue = node.value = this.match(_tokenizerTypes.types._null) ? null : this.match(_tokenizerTypes.types._true);
      node.raw = this.state.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");

    case _tokenizerTypes.types.parenL:
      return this.parseParenAndDistinguishExpression(null, null, canBeArrow);

    case _tokenizerTypes.types.bracketL:
      node = this.startNode();
      this.next();
      // check whether this is array comprehension or regular array
      if (this.options.features["es7.comprehensions"] && this.match(_tokenizerTypes.types._for)) {
        return this.parseComprehension(node, false);
      }
      node.elements = this.parseExprList(_tokenizerTypes.types.bracketR, true, true, refShorthandDefaultPos);
      this.toReferencedList(node.elements);
      return this.finishNode(node, "ArrayExpression");

    case _tokenizerTypes.types.braceL:
      return this.parseObj(false, refShorthandDefaultPos);

    case _tokenizerTypes.types._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, false);

    case _tokenizerTypes.types.at:
      this.parseDecorators();

    case _tokenizerTypes.types._class:
      node = this.startNode();
      this.takeDecorators(node);
      return this.parseClass(node, false);

    case _tokenizerTypes.types._new:
      return this.parseNew();

    case _tokenizerTypes.types.backQuote:
      return this.parseTemplate();

    case _tokenizerTypes.types.doubleColon:
      node = this.startNode();
      this.next();
      node.object = null;
      var callee = node.callee = this.parseNoCallExpr();
      if (callee.type === "MemberExpression") {
        return this.finishNode(node, "BindExpression");
      } else {
        this.raise(callee.start, "Binding should be performed on object property.");
      }

    default:
      this.unexpected();
  }
};

pp.parseLiteral = function (value) {
  var node = this.startNode();
  node.rawValue = node.value = value;
  node.raw = this.input.slice(this.state.start, this.state.end);
  this.next();
  return this.finishNode(node, "Literal");
};

pp.parseParenExpression = function () {
  this.expect(_tokenizerTypes.types.parenL);
  var val = this.parseExpression();
  this.expect(_tokenizerTypes.types.parenR);
  return val;
};

pp.parseParenAndDistinguishExpression = function (startPos, startLoc, canBeArrow, isAsync) {
  startPos = startPos || this.state.start;
  startLoc = startLoc || this.state.startLoc;
  var val = undefined;
  this.next();

  if (this.options.features["es7.comprehensions"] && this.match(_tokenizerTypes.types._for)) {
    return this.parseComprehension(this.startNodeAt(startPos, startLoc), true);
  }

  var innerStartPos = this.state.start,
      innerStartLoc = this.state.startLoc;
  var exprList = [],
      first = true;
  var refShorthandDefaultPos = { start: 0 },
      spreadStart = undefined,
      innerParenStart = undefined,
      optionalCommaStart = undefined;
  while (!this.match(_tokenizerTypes.types.parenR)) {
    if (first) {
      first = false;
    } else {
      this.expect(_tokenizerTypes.types.comma);
      if (this.match(_tokenizerTypes.types.parenR) && this.options.features["es7.trailingFunctionCommas"]) {
        optionalCommaStart = this.state.start;
        break;
      }
    }

    if (this.match(_tokenizerTypes.types.ellipsis)) {
      var spreadNodeStartPos = this.state.start,
          spreadNodeStartLoc = this.state.startLoc;
      spreadStart = this.state.start;
      exprList.push(this.parseParenItem(this.parseRest(), spreadNodeStartLoc, spreadNodeStartPos));
      break;
    } else {
      if (this.match(_tokenizerTypes.types.parenL) && !innerParenStart) {
        innerParenStart = this.state.start;
      }
      exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem));
    }
  }
  var innerEndPos = this.state.start;
  var innerEndLoc = this.state.startLoc;
  this.expect(_tokenizerTypes.types.parenR);

  if (canBeArrow && !this.canInsertSemicolon() && this.eat(_tokenizerTypes.types.arrow)) {
    if (innerParenStart) this.unexpected(innerParenStart);
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, isAsync);
  }

  if (!exprList.length) {
    if (isAsync) {
      return;
    } else {
      this.unexpected(this.state.lastTokStart);
    }
  }
  if (optionalCommaStart) this.unexpected(optionalCommaStart);
  if (spreadStart) this.unexpected(spreadStart);
  if (refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);

  if (exprList.length > 1) {
    val = this.startNodeAt(innerStartPos, innerStartLoc);
    val.expressions = exprList;
    this.toReferencedList(val.expressions);
    this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
  } else {
    val = exprList[0];
  }

  val.parenthesizedExpression = true;
  return val;
};

pp.parseParenItem = function (node) {
  return node;
};

// New's precedence is slightly tricky. It must allow its argument
// to be a `[]` or dot subscript expression, but not a call — at
// least, not without wrapping it in parentheses. Thus, it uses the

pp.parseNew = function () {
  var node = this.startNode();
  var meta = this.parseIdent(true);

  if (this.eat(_tokenizerTypes.types.dot)) {
    node.meta = meta;
    node.property = this.parseIdent(true);

    if (node.property.name !== "target") {
      this.raise(node.property.start, "The only valid meta property for new is new.target");
    }

    return this.finishNode(node, "MetaProperty");
  }

  node.callee = this.parseNoCallExpr();

  if (this.eat(_tokenizerTypes.types.parenL)) {
    node.arguments = this.parseExprList(_tokenizerTypes.types.parenR, this.options.features["es7.trailingFunctionCommas"]);
    this.toReferencedList(node.arguments);
  } else {
    node.arguments = [];
  }

  return this.finishNode(node, "NewExpression");
};

// Parse template expression.

pp.parseTemplateElement = function () {
  var elem = this.startNode();
  elem.value = {
    raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
    cooked: this.state.value
  };
  this.next();
  elem.tail = this.match(_tokenizerTypes.types.backQuote);
  return this.finishNode(elem, "TemplateElement");
};

pp.parseTemplate = function () {
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement();
  node.quasis = [curElt];
  while (!curElt.tail) {
    this.expect(_tokenizerTypes.types.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(_tokenizerTypes.types.braceR);
    node.quasis.push(curElt = this.parseTemplateElement());
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};

// Parse an object literal or binding pattern.

pp.parseObj = function (isPattern, refShorthandDefaultPos) {
  var node = this.startNode(),
      first = true,
      propHash = Object.create(null);
  node.properties = [];
  var decorators = [];
  this.next();
  while (!this.eat(_tokenizerTypes.types.braceR)) {
    if (first) {
      first = false;
    } else {
      this.expect(_tokenizerTypes.types.comma);
      if (this.eat(_tokenizerTypes.types.braceR)) break;
    }

    while (this.match(_tokenizerTypes.types.at)) {
      decorators.push(this.parseDecorator());
    }

    var prop = this.startNode(),
        isGenerator = false,
        isAsync = false,
        startPos = undefined,
        startLoc = undefined;
    if (decorators.length) {
      prop.decorators = decorators;
      decorators = [];
    }
    if (this.options.features["es7.objectRestSpread"] && this.match(_tokenizerTypes.types.ellipsis)) {
      prop = this.parseSpread();
      prop.type = "SpreadProperty";
      node.properties.push(prop);
      continue;
    }
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refShorthandDefaultPos) {
      startPos = this.state.start;
      startLoc = this.state.startLoc;
    }
    if (!isPattern) {
      isGenerator = this.eat(_tokenizerTypes.types.star);
    }
    if (!isPattern && this.options.features["es7.asyncFunctions"] && this.isContextual("async")) {
      if (isGenerator) this.unexpected();
      var asyncId = this.parseIdent();
      if (this.match(_tokenizerTypes.types.colon) || this.match(_tokenizerTypes.types.parenL) || this.match(_tokenizerTypes.types.braceR)) {
        prop.key = asyncId;
      } else {
        isAsync = true;
        this.parsePropertyName(prop);
      }
    } else {
      this.parsePropertyName(prop);
    }
    this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos);
    this.checkPropClash(prop, propHash);
    node.properties.push(this.finishNode(prop, "Property"));
  }
  if (decorators.length) {
    this.raise(this.state.start, "You have trailing decorators with no property");
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};

pp.parseObjPropValue = function (prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos) {
  if (this.eat(_tokenizerTypes.types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssign(false, refShorthandDefaultPos);
    prop.kind = "init";
  } else if (this.match(_tokenizerTypes.types.parenL)) {
    if (isPattern) this.unexpected();
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && !this.match(_tokenizerTypes.types.comma) && !this.match(_tokenizerTypes.types.braceR)) {
    if (isGenerator || isAsync || isPattern) this.unexpected();
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") this.raise(start, "getter should have no params");else this.raise(start, "setter should have exactly one param");
    }
  } else if (!prop.computed && prop.key.type === "Identifier") {
    prop.kind = "init";
    if (isPattern) {
      if (this.isKeyword(prop.key.name) || this.strict && (_utilIdentifier.reservedWords.strictBind(prop.key.name) || _utilIdentifier.reservedWords.strict(prop.key.name)) || !this.options.allowReserved && this.isReservedWord(prop.key.name)) this.raise(prop.key.start, "Binding " + prop.key.name);
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else if (this.match(_tokenizerTypes.types.eq) && refShorthandDefaultPos) {
      if (!refShorthandDefaultPos.start) refShorthandDefaultPos.start = this.state.start;
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else {
      prop.value = prop.key.__clone();
    }
    prop.shorthand = true;
  } else {
    this.unexpected();
  }
};

pp.parsePropertyName = function (prop) {
  if (this.eat(_tokenizerTypes.types.bracketL)) {
    prop.computed = true;
    prop.key = this.parseMaybeAssign();
    this.expect(_tokenizerTypes.types.bracketR);
    return prop.key;
  } else {
    prop.computed = false;
    return prop.key = this.match(_tokenizerTypes.types.num) || this.match(_tokenizerTypes.types.string) ? this.parseExprAtom() : this.parseIdent(true);
  }
};

// Initialize empty function node.

pp.initFunction = function (node, isAsync) {
  node.id = null;
  node.generator = false;
  node.expression = false;
  if (this.options.features["es7.asyncFunctions"]) {
    node.async = !!isAsync;
  }
};

// Parse object or class method.

pp.parseMethod = function (isGenerator, isAsync) {
  var node = this.startNode();
  this.initFunction(node, isAsync);
  this.expect(_tokenizerTypes.types.parenL);
  node.params = this.parseBindingList(_tokenizerTypes.types.parenR, false, this.options.features["es7.trailingFunctionCommas"]);
  node.generator = isGenerator;
  this.parseFunctionBody(node);
  return this.finishNode(node, "FunctionExpression");
};

// Parse arrow function expression with given parameters.

pp.parseArrowExpression = function (node, params, isAsync) {
  this.initFunction(node, isAsync);
  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);
  return this.finishNode(node, "ArrowFunctionExpression");
};

// Parse function body and check parameters.

pp.parseFunctionBody = function (node, allowExpression) {
  var isExpression = allowExpression && !this.match(_tokenizerTypes.types.braceL);

  var oldInAsync = this.inAsync;
  this.inAsync = node.async;
  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
  } else {
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldInFunc = this.state.inFunction,
        oldInGen = this.state.inGenerator,
        oldLabels = this.state.labels;
    this.state.inFunction = true;this.state.inGenerator = node.generator;this.state.labels = [];
    node.body = this.parseBlock(true);
    node.expression = false;
    this.state.inFunction = oldInFunc;this.state.inGenerator = oldInGen;this.state.labels = oldLabels;
  }
  this.inAsync = oldInAsync;

  // If this is a strict mode function, verify that argument names
  // are not repeated, and it does not try to bind the words `eval`
  // or `arguments`.
  if (this.strict || !isExpression && node.body.body.length && this.isUseStrict(node.body.body[0])) {
    var nameHash = Object.create(null),
        oldStrict = this.strict;
    this.strict = true;
    if (node.id) {
      this.checkLVal(node.id, true);
    }
    var _arr = node.params;
    for (var _i = 0; _i < _arr.length; _i++) {
      var param = _arr[_i];
      this.checkLVal(param, true, nameHash);
    }
    this.strict = oldStrict;
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp.parseExprList = function (close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(_tokenizerTypes.types.comma);
      if (allowTrailingComma && this.eat(close)) break;
    }

    elts.push(this.parseExprListItem(allowEmpty, refShorthandDefaultPos));
  }
  return elts;
};

pp.parseExprListItem = function (allowEmpty, refShorthandDefaultPos) {
  var elt = undefined;
  if (allowEmpty && this.match(_tokenizerTypes.types.comma)) {
    elt = null;
  } else if (this.match(_tokenizerTypes.types.ellipsis)) {
    elt = this.parseSpread(refShorthandDefaultPos);
  } else {
    elt = this.parseMaybeAssign(false, refShorthandDefaultPos);
  }
  return elt;
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp.parseIdent = function (liberal) {
  var node = this.startNode();
  if (this.match(_tokenizerTypes.types.name)) {
    if (!liberal && (!this.options.allowReserved && this.isReservedWord(this.state.value) || this.strict && _utilIdentifier.reservedWords.strict(this.state.value))) this.raise(this.state.start, "The keyword '" + this.state.value + "' is reserved");
    node.name = this.state.value;
  } else if (liberal && this.state.type.keyword) {
    node.name = this.state.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "Identifier");
};

// Parses await expression inside async function.

pp.parseAwait = function (node) {
  if (this.eat(_tokenizerTypes.types.semi) || this.canInsertSemicolon()) {
    this.unexpected();
  }
  node.all = this.eat(_tokenizerTypes.types.star);
  node.argument = this.parseMaybeUnary();
  return this.finishNode(node, "AwaitExpression");
};

// Parses yield expression inside generator.

pp.parseYield = function () {
  var node = this.startNode();
  this.next();
  if (this.match(_tokenizerTypes.types.semi) || this.canInsertSemicolon() || !this.match(_tokenizerTypes.types.star) && !this.state.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(_tokenizerTypes.types.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression");
};

// Parses array and generator comprehensions.

pp.parseComprehension = function (node, isGenerator) {
  node.blocks = [];
  while (this.match(_tokenizerTypes.types._for)) {
    var block = this.startNode();
    this.next();
    this.expect(_tokenizerTypes.types.parenL);
    block.left = this.parseBindingAtom();
    this.checkLVal(block.left, true);
    this.expectContextual("of");
    block.right = this.parseExpression();
    this.expect(_tokenizerTypes.types.parenR);
    node.blocks.push(this.finishNode(block, "ComprehensionBlock"));
  }
  node.filter = this.eat(_tokenizerTypes.types._if) ? this.parseParenExpression() : null;
  node.body = this.parseExpression();
  this.expect(isGenerator ? _tokenizerTypes.types.parenR : _tokenizerTypes.types.bracketR);
  node.generator = isGenerator;
  return this.finishNode(node, "ComprehensionExpression");
};
}, function(modId) { var map = {"../tokenizer/types":1676544235732,"./index":1676544235728,"../util/identifier":1676544235729}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235741, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _utilLocation = require("../util/location");

// Start an AST node, attaching a start offset.

var pp = _index2["default"].prototype;

var Node = (function () {
  function Node(parser, pos, loc) {
    _classCallCheck(this, Node);

    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new _utilLocation.SourceLocation(loc);
  }

  Node.prototype.__clone = function __clone() {
    var node2 = new Node();
    for (var key in this) node2[key] = this[key];
    return node2;
  };

  return Node;
})();

exports.Node = Node;

pp.startNode = function () {
  return new Node(this, this.state.start, this.state.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  node.loc.end = loc;
  this.processComment(node);
  return node;
}

// Finish an AST node, adding `type` and `end` properties.

pp.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
};

// Finish node at given position

pp.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};
}, function(modId) { var map = {"./index":1676544235728,"../util/location":1676544235734}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235742, function(require, module, exports) {


// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _utilLocation = require("../util/location");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var pp = _index2["default"].prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp.raise = function (pos, message) {
  var loc = _utilLocation.getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  throw err;
};
}, function(modId) { var map = {"../util/location":1676544235734,"./index":1676544235728}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235743, function(require, module, exports) {
/**
 * Based on the comment attachment algorithm used in espree and estraverse.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function last(stack) {
  return stack[stack.length - 1];
}

var pp = _index2["default"].prototype;

pp.addComment = function (comment) {
  this.state.trailingComments.push(comment);
  this.state.leadingComments.push(comment);
};

pp.processComment = function (node) {
  if (node.type === "Program" && node.body.length > 0) return;

  var stack = this.state.commentStack;

  var lastChild, trailingComments, i;

  if (this.state.trailingComments.length > 0) {
    // If the first comment in trailingComments comes after the
    // current node, then we're good - all comments in the array will
    // come after the node and so it's safe to add them as official
    // trailingComments.
    if (this.state.trailingComments[0].start >= node.end) {
      trailingComments = this.state.trailingComments;
      this.state.trailingComments = [];
    } else {
      // Otherwise, if the first comment doesn't come after the
      // current node, that means we have a mix of leading and trailing
      // comments in the array and that leadingComments contains the
      // same items as trailingComments. Reset trailingComments to
      // zero items and we'll handle this by evaluating leadingComments
      // later.
      this.state.trailingComments.length = 0;
    }
  } else {
    var lastInStack = last(stack);
    if (stack.length > 0 && lastInStack.trailingComments && lastInStack.trailingComments[0].start >= node.end) {
      trailingComments = lastInStack.trailingComments;
      lastInStack.trailingComments = null;
    }
  }

  // Eating the stack.
  while (stack.length > 0 && last(stack).start >= node.start) {
    lastChild = stack.pop();
  }

  if (lastChild) {
    if (lastChild.leadingComments) {
      if (lastChild !== node && last(lastChild.leadingComments).end <= node.start) {
        node.leadingComments = lastChild.leadingComments;
        lastChild.leadingComments = null;
      } else {
        // A leading comment for an anonymous class had been stolen by its first MethodDefinition,
        // so this takes back the leading comment.
        // See also: https://github.com/eslint/espree/issues/158
        for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
          if (lastChild.leadingComments[i].end <= node.start) {
            node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
            break;
          }
        }
      }
    }
  } else if (this.state.leadingComments.length > 0) {
    if (last(this.state.leadingComments).end <= node.start) {
      node.leadingComments = this.state.leadingComments;
      this.state.leadingComments = [];
    } else {
      // https://github.com/eslint/espree/issues/2
      //
      // In special cases, such as return (without a value) and
      // debugger, all comments will end up as leadingComments and
      // will otherwise be eliminated. This step runs when the
      // commentStack is empty and there are comments left
      // in leadingComments.
      //
      // This loop figures out the stopping point between the actual
      // leading and trailing comments by finding the location of the
      // first comment that comes after the given node.
      for (i = 0; i < this.state.leadingComments.length; i++) {
        if (this.state.leadingComments[i].end > node.start) {
          break;
        }
      }

      // Split the array based on the location of the first comment
      // that comes after the node. Keep in mind that this could
      // result in an empty array, and if so, the array must be
      // deleted.
      node.leadingComments = this.state.leadingComments.slice(0, i);
      if (node.leadingComments.length === 0) {
        node.leadingComments = null;
      }

      // Similarly, trailing comments are attached later. The variable
      // must be reset to null if there are no trailing comments.
      trailingComments = this.state.leadingComments.slice(i);
      if (trailingComments.length === 0) {
        trailingComments = null;
      }
    }
  }

  if (trailingComments) {
    if (trailingComments.length && trailingComments[0].start >= node.start && last(trailingComments).end <= node.end) {
      node.innerComments = trailingComments;
    } else {
      node.trailingComments = trailingComments;
    }
  }

  stack.push(node);
};
}, function(modId) { var map = {"./index":1676544235728}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235744, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _tokenizerTypes = require("../tokenizer/types");

var _parser = require("../parser");

var _parser2 = _interopRequireDefault(_parser);

var pp = _parser2["default"].prototype;

pp.flowParseTypeInitialiser = function (tok) {
  var oldInType = this.state.inType;
  this.state.inType = true;
  this.expect(tok || _tokenizerTypes.types.colon);
  var type = this.flowParseType();
  this.state.inType = oldInType;
  return type;
};

pp.flowParseDeclareClass = function (node) {
  this.next();
  this.flowParseInterfaceish(node, true);
  return this.finishNode(node, "DeclareClass");
};

pp.flowParseDeclareFunction = function (node) {
  this.next();

  var id = node.id = this.parseIdent();

  var typeNode = this.startNode();
  var typeContainer = this.startNode();

  if (this.isRelational("<")) {
    typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }

  this.expect(_tokenizerTypes.types.parenL);
  var tmp = this.flowParseFunctionTypeParams();
  typeNode.params = tmp.params;
  typeNode.rest = tmp.rest;
  this.expect(_tokenizerTypes.types.parenR);
  typeNode.returnType = this.flowParseTypeInitialiser();

  typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
  id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");

  this.finishNode(id, id.type);

  this.semicolon();

  return this.finishNode(node, "DeclareFunction");
};

pp.flowParseDeclare = function (node) {
  if (this.match(_tokenizerTypes.types._class)) {
    return this.flowParseDeclareClass(node);
  } else if (this.match(_tokenizerTypes.types._function)) {
    return this.flowParseDeclareFunction(node);
  } else if (this.match(_tokenizerTypes.types._var)) {
    return this.flowParseDeclareVariable(node);
  } else if (this.isContextual("module")) {
    return this.flowParseDeclareModule(node);
  } else if (this.isContextual("type")) {
    return this.flowParseDeclareTypeAlias(node);
  } else if (this.isContextual("interface")) {
    return this.flowParseDeclareInterface(node);
  } else {
    this.unexpected();
  }
};

pp.flowParseDeclareVariable = function (node) {
  this.next();
  node.id = this.flowParseTypeAnnotatableIdentifier();
  this.semicolon();
  return this.finishNode(node, "DeclareVariable");
};

pp.flowParseDeclareModule = function (node) {
  this.next();

  if (this.match(_tokenizerTypes.types.string)) {
    node.id = this.parseExprAtom();
  } else {
    node.id = this.parseIdent();
  }

  var bodyNode = node.body = this.startNode();
  var body = bodyNode.body = [];
  this.expect(_tokenizerTypes.types.braceL);
  while (!this.match(_tokenizerTypes.types.braceR)) {
    var node2 = this.startNode();

    // todo: declare check
    this.next();

    body.push(this.flowParseDeclare(node2));
  }
  this.expect(_tokenizerTypes.types.braceR);

  this.finishNode(bodyNode, "BlockStatement");
  return this.finishNode(node, "DeclareModule");
};

pp.flowParseDeclareTypeAlias = function (node) {
  this.next();
  this.flowParseTypeAlias(node);
  return this.finishNode(node, "DeclareTypeAlias");
};

pp.flowParseDeclareInterface = function (node) {
  this.next();
  this.flowParseInterfaceish(node);
  return this.finishNode(node, "DeclareInterface");
};

// Interfaces

pp.flowParseInterfaceish = function (node, allowStatic) {
  node.id = this.parseIdent();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node["extends"] = [];
  node.mixins = [];

  if (this.eat(_tokenizerTypes.types._extends)) {
    do {
      node["extends"].push(this.flowParseInterfaceExtends());
    } while (this.eat(_tokenizerTypes.types.comma));
  }

  if (this.isContextual("mixins")) {
    this.next();
    do {
      node.mixins.push(this.flowParseInterfaceExtends());
    } while (this.eat(_tokenizerTypes.types.comma));
  }

  node.body = this.flowParseObjectType(allowStatic);
};

pp.flowParseInterfaceExtends = function () {
  var node = this.startNode();

  node.id = this.parseIdent();
  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  } else {
    node.typeParameters = null;
  }

  return this.finishNode(node, "InterfaceExtends");
};

pp.flowParseInterface = function (node) {
  this.flowParseInterfaceish(node, false);
  return this.finishNode(node, "InterfaceDeclaration");
};

// Type aliases

pp.flowParseTypeAlias = function (node) {
  node.id = this.parseIdent();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.right = this.flowParseTypeInitialiser(_tokenizerTypes.types.eq);
  this.semicolon();

  return this.finishNode(node, "TypeAlias");
};

// Type annotations

pp.flowParseTypeParameterDeclaration = function () {
  var node = this.startNode();
  node.params = [];

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseTypeAnnotatableIdentifier());
    if (!this.isRelational(">")) {
      this.expect(_tokenizerTypes.types.comma);
    }
  }
  this.expectRelational(">");

  return this.finishNode(node, "TypeParameterDeclaration");
};

pp.flowParseTypeParameterInstantiation = function () {
  var node = this.startNode(),
      oldInType = this.state.inType;
  node.params = [];

  this.state.inType = true;

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseType());
    if (!this.isRelational(">")) {
      this.expect(_tokenizerTypes.types.comma);
    }
  }
  this.expectRelational(">");

  this.state.inType = oldInType;

  return this.finishNode(node, "TypeParameterInstantiation");
};

pp.flowParseObjectPropertyKey = function () {
  return this.match(_tokenizerTypes.types.num) || this.match(_tokenizerTypes.types.string) ? this.parseExprAtom() : this.parseIdent(true);
};

pp.flowParseObjectTypeIndexer = function (node, isStatic) {
  node["static"] = isStatic;

  this.expect(_tokenizerTypes.types.bracketL);
  node.id = this.flowParseObjectPropertyKey();
  node.key = this.flowParseTypeInitialiser();
  this.expect(_tokenizerTypes.types.bracketR);
  node.value = this.flowParseTypeInitialiser();

  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeIndexer");
};

pp.flowParseObjectTypeMethodish = function (node) {
  node.params = [];
  node.rest = null;
  node.typeParameters = null;

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  }

  this.expect(_tokenizerTypes.types.parenL);
  while (this.match(_tokenizerTypes.types.name)) {
    node.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(_tokenizerTypes.types.parenR)) {
      this.expect(_tokenizerTypes.types.comma);
    }
  }

  if (this.eat(_tokenizerTypes.types.ellipsis)) {
    node.rest = this.flowParseFunctionTypeParam();
  }
  this.expect(_tokenizerTypes.types.parenR);
  node.returnType = this.flowParseTypeInitialiser();

  return this.finishNode(node, "FunctionTypeAnnotation");
};

pp.flowParseObjectTypeMethod = function (startPos, startLoc, isStatic, key) {
  var node = this.startNodeAt(startPos, startLoc);
  node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(startPos, startLoc));
  node["static"] = isStatic;
  node.key = key;
  node.optional = false;
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeProperty");
};

pp.flowParseObjectTypeCallProperty = function (node, isStatic) {
  var valueNode = this.startNode();
  node["static"] = isStatic;
  node.value = this.flowParseObjectTypeMethodish(valueNode);
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeCallProperty");
};

pp.flowParseObjectType = function (allowStatic) {
  var nodeStart = this.startNode();
  var node;
  var propertyKey;
  var isStatic;

  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];

  this.expect(_tokenizerTypes.types.braceL);

  while (!this.match(_tokenizerTypes.types.braceR)) {
    var optional = false;
    var startPos = this.state.start,
        startLoc = this.state.startLoc;
    node = this.startNode();
    if (allowStatic && this.isContextual("static")) {
      this.next();
      isStatic = true;
    }

    if (this.match(_tokenizerTypes.types.bracketL)) {
      nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic));
    } else if (this.match(_tokenizerTypes.types.parenL) || this.isRelational("<")) {
      nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, allowStatic));
    } else {
      if (isStatic && this.match(_tokenizerTypes.types.colon)) {
        propertyKey = this.parseIdent();
      } else {
        propertyKey = this.flowParseObjectPropertyKey();
      }
      if (this.isRelational("<") || this.match(_tokenizerTypes.types.parenL)) {
        // This is a method property
        nodeStart.properties.push(this.flowParseObjectTypeMethod(startPos, startLoc, isStatic, propertyKey));
      } else {
        if (this.eat(_tokenizerTypes.types.question)) {
          optional = true;
        }
        node.key = propertyKey;
        node.value = this.flowParseTypeInitialiser();
        node.optional = optional;
        node["static"] = isStatic;
        this.flowObjectTypeSemicolon();
        nodeStart.properties.push(this.finishNode(node, "ObjectTypeProperty"));
      }
    }
  }

  this.expect(_tokenizerTypes.types.braceR);

  return this.finishNode(nodeStart, "ObjectTypeAnnotation");
};

pp.flowObjectTypeSemicolon = function () {
  if (!this.eat(_tokenizerTypes.types.semi) && !this.eat(_tokenizerTypes.types.comma) && !this.match(_tokenizerTypes.types.braceR)) {
    this.unexpected();
  }
};

pp.flowParseGenericType = function (startPos, startLoc, id) {
  var node = this.startNodeAt(startPos, startLoc);

  node.typeParameters = null;
  node.id = id;

  while (this.eat(_tokenizerTypes.types.dot)) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.qualification = node.id;
    node2.id = this.parseIdent();
    node.id = this.finishNode(node2, "QualifiedTypeIdentifier");
  }

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  }

  return this.finishNode(node, "GenericTypeAnnotation");
};

pp.flowParseTypeofType = function () {
  var node = this.startNode();
  this.expect(_tokenizerTypes.types._typeof);
  node.argument = this.flowParsePrimaryType();
  return this.finishNode(node, "TypeofTypeAnnotation");
};

pp.flowParseTupleType = function () {
  var node = this.startNode();
  node.types = [];
  this.expect(_tokenizerTypes.types.bracketL);
  // We allow trailing commas
  while (this.state.pos < this.input.length && !this.match(_tokenizerTypes.types.bracketR)) {
    node.types.push(this.flowParseType());
    if (this.match(_tokenizerTypes.types.bracketR)) break;
    this.expect(_tokenizerTypes.types.comma);
  }
  this.expect(_tokenizerTypes.types.bracketR);
  return this.finishNode(node, "TupleTypeAnnotation");
};

pp.flowParseFunctionTypeParam = function () {
  var optional = false;
  var node = this.startNode();
  node.name = this.parseIdent();
  if (this.eat(_tokenizerTypes.types.question)) {
    optional = true;
  }
  node.optional = optional;
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "FunctionTypeParam");
};

pp.flowParseFunctionTypeParams = function () {
  var ret = { params: [], rest: null };
  while (this.match(_tokenizerTypes.types.name)) {
    ret.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(_tokenizerTypes.types.parenR)) {
      this.expect(_tokenizerTypes.types.comma);
    }
  }
  if (this.eat(_tokenizerTypes.types.ellipsis)) {
    ret.rest = this.flowParseFunctionTypeParam();
  }
  return ret;
};

pp.flowIdentToTypeAnnotation = function (startPos, startLoc, node, id) {
  switch (id.name) {
    case "any":
      return this.finishNode(node, "AnyTypeAnnotation");

    case "void":
      return this.finishNode(node, "VoidTypeAnnotation");

    case "bool":
    case "boolean":
      return this.finishNode(node, "BooleanTypeAnnotation");

    case "mixed":
      return this.finishNode(node, "MixedTypeAnnotation");

    case "number":
      return this.finishNode(node, "NumberTypeAnnotation");

    case "string":
      return this.finishNode(node, "StringTypeAnnotation");

    default:
      return this.flowParseGenericType(startPos, startLoc, id);
  }
};

// The parsing of types roughly parallels the parsing of expressions, and
// primary types are kind of like primary expressions...they're the
// primitives with which other types are constructed.
pp.flowParsePrimaryType = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var node = this.startNode();
  var tmp;
  var type;
  var isGroupedType = false;

  switch (this.state.type) {
    case _tokenizerTypes.types.name:
      return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdent());

    case _tokenizerTypes.types.braceL:
      return this.flowParseObjectType();

    case _tokenizerTypes.types.bracketL:
      return this.flowParseTupleType();

    case _tokenizerTypes.types.relational:
      if (this.state.value === "<") {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
        this.expect(_tokenizerTypes.types.parenL);
        tmp = this.flowParseFunctionTypeParams();
        node.params = tmp.params;
        node.rest = tmp.rest;
        this.expect(_tokenizerTypes.types.parenR);

        this.expect(_tokenizerTypes.types.arrow);

        node.returnType = this.flowParseType();

        return this.finishNode(node, "FunctionTypeAnnotation");
      }

    case _tokenizerTypes.types.parenL:
      this.next();

      // Check to see if this is actually a grouped type
      if (!this.match(_tokenizerTypes.types.parenR) && !this.match(_tokenizerTypes.types.ellipsis)) {
        if (this.match(_tokenizerTypes.types.name)) {
          var token = this.lookahead().type;
          isGroupedType = token !== _tokenizerTypes.types.question && token !== _tokenizerTypes.types.colon;
        } else {
          isGroupedType = true;
        }
      }

      if (isGroupedType) {
        type = this.flowParseType();
        this.expect(_tokenizerTypes.types.parenR);

        // If we see a => next then someone was probably confused about
        // function types, so we can provide a better error message
        if (this.eat(_tokenizerTypes.types.arrow)) {
          this.raise(node, "Unexpected token =>. It looks like " + "you are trying to write a function type, but you ended up " + "writing a grouped type followed by an =>, which is a syntax " + "error. Remember, function type parameters are named so function " + "types look like (name1: type1, name2: type2) => returnType. You " + "probably wrote (type1) => returnType");
        }

        return type;
      }

      tmp = this.flowParseFunctionTypeParams();
      node.params = tmp.params;
      node.rest = tmp.rest;

      this.expect(_tokenizerTypes.types.parenR);

      this.expect(_tokenizerTypes.types.arrow);

      node.returnType = this.flowParseType();
      node.typeParameters = null;

      return this.finishNode(node, "FunctionTypeAnnotation");

    case _tokenizerTypes.types.string:
      node.rawValue = node.value = this.state.value;
      node.raw = this.input.slice(this.state.start, this.state.end);
      this.next();
      return this.finishNode(node, "StringLiteralTypeAnnotation");

    case _tokenizerTypes.types._true:case _tokenizerTypes.types._false:
      node.value = this.match(_tokenizerTypes.types._true);
      this.next();
      return this.finishNode(node, "BooleanLiteralTypeAnnotation");

    case _tokenizerTypes.types.num:
      node.rawValue = node.value = this.state.value;
      node.raw = this.input.slice(this.state.start, this.state.end);
      this.next();
      return this.finishNode(node, "NumberLiteralTypeAnnotation");

    case _tokenizerTypes.types._null:
      node.value = this.match(_tokenizerTypes.types._null);
      this.next();
      return this.finishNode(node, "NullLiteralTypeAnnotation");

    case _tokenizerTypes.types._this:
      node.value = this.match(_tokenizerTypes.types._this);
      this.next();
      return this.finishNode(node, "ThisTypeAnnotation");

    default:
      if (this.state.type.keyword === "typeof") {
        return this.flowParseTypeofType();
      }
  }

  this.unexpected();
};

pp.flowParsePostfixType = function () {
  var node = this.startNode();
  var type = node.elementType = this.flowParsePrimaryType();
  if (this.match(_tokenizerTypes.types.bracketL)) {
    this.expect(_tokenizerTypes.types.bracketL);
    this.expect(_tokenizerTypes.types.bracketR);
    return this.finishNode(node, "ArrayTypeAnnotation");
  } else {
    return type;
  }
};

pp.flowParsePrefixType = function () {
  var node = this.startNode();
  if (this.eat(_tokenizerTypes.types.question)) {
    node.typeAnnotation = this.flowParsePrefixType();
    return this.finishNode(node, "NullableTypeAnnotation");
  } else {
    return this.flowParsePostfixType();
  }
};

pp.flowParseIntersectionType = function () {
  var node = this.startNode();
  var type = this.flowParsePrefixType();
  node.types = [type];
  while (this.eat(_tokenizerTypes.types.bitwiseAND)) {
    node.types.push(this.flowParsePrefixType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
};

pp.flowParseUnionType = function () {
  var node = this.startNode();
  var type = this.flowParseIntersectionType();
  node.types = [type];
  while (this.eat(_tokenizerTypes.types.bitwiseOR)) {
    node.types.push(this.flowParseIntersectionType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
};

pp.flowParseType = function () {
  var oldInType = this.state.inType;
  this.state.inType = true;
  var type = this.flowParseUnionType();
  this.state.inType = oldInType;
  return type;
};

pp.flowParseTypeAnnotation = function () {
  var node = this.startNode();
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "TypeAnnotation");
};

pp.flowParseTypeAnnotatableIdentifier = function (requireTypeAnnotation, canBeOptionalParam) {
  var ident = this.parseIdent();
  var isOptionalParam = false;

  if (canBeOptionalParam && this.eat(_tokenizerTypes.types.question)) {
    this.expect(_tokenizerTypes.types.question);
    isOptionalParam = true;
  }

  if (requireTypeAnnotation || this.match(_tokenizerTypes.types.colon)) {
    ident.typeAnnotation = this.flowParseTypeAnnotation();
    this.finishNode(ident, ident.type);
  }

  if (isOptionalParam) {
    ident.optional = true;
    this.finishNode(ident, ident.type);
  }

  return ident;
};

exports["default"] = function (instance) {
  // function name(): string {}
  instance.extend("parseFunctionBody", function (inner) {
    return function (node, allowExpression) {
      if (this.match(_tokenizerTypes.types.colon) && !allowExpression) {
        // if allowExpression is true then we're parsing an arrow function and if
        // there's a return type then it's been handled elsewhere
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, allowExpression);
    };
  });

  instance.extend("parseStatement", function (inner) {
    return function (declaration, topLevel) {
      // strict mode handling of `interface` since it's a reserved word
      if (this.strict && this.match(_tokenizerTypes.types.name) && this.state.value === "interface") {
        var node = this.startNode();
        this.next();
        return this.flowParseInterface(node);
      } else {
        return inner.call(this, declaration, topLevel);
      }
    };
  });

  instance.extend("parseExpressionStatement", function (inner) {
    return function (node, expr) {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (this.match(_tokenizerTypes.types._class) || this.match(_tokenizerTypes.types.name) || this.match(_tokenizerTypes.types._function) || this.match(_tokenizerTypes.types._var)) {
            return this.flowParseDeclare(node);
          }
        } else if (this.match(_tokenizerTypes.types.name)) {
          if (expr.name === "interface") {
            return this.flowParseInterface(node);
          } else if (expr.name === "type") {
            return this.flowParseTypeAlias(node);
          }
        }
      }

      return inner.call(this, node, expr);
    };
  });

  instance.extend("shouldParseExportDeclaration", function (inner) {
    return function () {
      return this.isContextual("type") || this.isContextual("interface") || inner.call(this);
    };
  });

  instance.extend("parseParenItem", function () {
    return function (node, startLoc, startPos, forceArrow) {
      if (this.match(_tokenizerTypes.types.colon)) {
        var typeCastNode = this.startNodeAt(startLoc, startPos);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        if (forceArrow && !this.match(_tokenizerTypes.types.arrow)) {
          this.unexpected();
        }

        if (this.eat(_tokenizerTypes.types.arrow)) {
          // ((lol): number => {});
          var func = this.parseArrowExpression(this.startNodeAt(startLoc, startPos), [node]);
          func.returnType = typeCastNode.typeAnnotation;
          return func;
        } else {
          return this.finishNode(typeCastNode, "TypeCastExpression");
        }
      } else {
        return node;
      }
    };
  });

  instance.extend("parseExport", function (inner) {
    return function (node) {
      node = inner.call(this, node);
      if (node.type === "ExportNamedDeclaration") {
        node.exportKind = node.exportKind || "value";
      }
      return node;
    };
  });

  instance.extend("parseExportDeclaration", function (inner) {
    return function (node) {
      if (this.isContextual("type")) {
        node.exportKind = "type";

        var declarationNode = this.startNode();
        this.next();

        if (this.match(_tokenizerTypes.types.braceL)) {
          // export type { foo, bar };
          node.specifiers = this.parseExportSpecifiers();
          this.parseExportFrom(node);
          return null;
        } else {
          // export type Foo = Bar;
          return this.flowParseTypeAlias(declarationNode);
        }
      } else if (this.isContextual("interface")) {
        node.exportKind = "type";
        var _declarationNode = this.startNode();
        this.next();
        return this.flowParseInterface(_declarationNode);
      } else {
        return inner.call(this, node);
      }
    };
  });

  instance.extend("parseClassId", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    };
  });

  // don't consider `void` to be a keyword as then it'll use the void token type
  // and set startExpr
  instance.extend("isKeyword", function (inner) {
    return function (name) {
      if (this.state.inType && name === "void") {
        return false;
      } else {
        return inner.call(this, name);
      }
    };
  });

  instance.extend("readToken", function (inner) {
    return function (code) {
      if (this.state.inType && (code === 62 || code === 60)) {
        return this.finishOp(_tokenizerTypes.types.relational, 1);
      } else {
        return inner.call(this, code);
      }
    };
  });

  instance.extend("jsx_readToken", function (inner) {
    return function () {
      if (!this.state.inType) return inner.call(this);
    };
  });

  function typeCastToParameter(node) {
    node.expression.typeAnnotation = node.typeAnnotation;
    return node.expression;
  }

  instance.extend("toAssignableList", function (inner) {
    return function (exprList, isBinding) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr.type === "TypeCastExpression") {
          exprList[i] = typeCastToParameter(expr);
        }
      }
      return inner.call(this, exprList, isBinding);
    };
  });

  instance.extend("toReferencedList", function () {
    return function (exprList) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr._exprListItem && expr.type === "TypeCastExpression") {
          this.raise(expr.start, "Unexpected type cast");
        }
      }

      return exprList;
    };
  });

  instance.extend("parseExprListItem", function (inner) {
    return function (allowEmpty, refShorthandDefaultPos) {
      var container = this.startNode();
      var node = inner.call(this, allowEmpty, refShorthandDefaultPos);
      if (this.match(_tokenizerTypes.types.colon)) {
        container._exprListItem = true;
        container.expression = node;
        container.typeAnnotation = this.flowParseTypeAnnotation();
        return this.finishNode(container, "TypeCastExpression");
      } else {
        return node;
      }
    };
  });

  instance.extend("parseClassProperty", function (inner) {
    return function (node) {
      if (this.match(_tokenizerTypes.types.colon)) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return inner.call(this, node);
    };
  });

  instance.extend("isClassProperty", function (inner) {
    return function () {
      return this.match(_tokenizerTypes.types.colon) || inner.call(this);
    };
  });

  instance.extend("parseClassMethod", function () {
    return function (classBody, method, isGenerator, isAsync) {
      var typeParameters;
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
      }
      method.value = this.parseMethod(isGenerator, isAsync);
      method.value.typeParameters = typeParameters;
      classBody.body.push(this.finishNode(method, "MethodDefinition"));
    };
  });

  instance.extend("parseClassSuper", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual("implements")) {
        this.next();
        var implemented = node["implements"] = [];
        do {
          var _node = this.startNode();
          _node.id = this.parseIdent();
          if (this.isRelational("<")) {
            _node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
            _node.typeParameters = null;
          }
          implemented.push(this.finishNode(_node, "ClassImplements"));
        } while (this.eat(_tokenizerTypes.types.comma));
      }
    };
  });

  instance.extend("parseObjPropValue", function (inner) {
    return function (prop) {
      var typeParameters;

      // method shorthand
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
        if (!this.match(_tokenizerTypes.types.parenL)) this.unexpected();
      }

      inner.apply(this, arguments);

      // add typeParameters if we found them
      if (typeParameters) {
        prop.value.typeParameters = typeParameters;
      }
    };
  });

  instance.extend("parseAssignableListItemTypes", function () {
    return function (param) {
      if (this.eat(_tokenizerTypes.types.question)) {
        param.optional = true;
      }
      if (this.match(_tokenizerTypes.types.colon)) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      }
      this.finishNode(param, param.type);
      return param;
    };
  });

  instance.extend("parseImportSpecifiers", function (inner) {
    return function (node) {
      node.importKind = "value";

      var kind = this.match(_tokenizerTypes.types._typeof) ? "typeof" : this.isContextual("type") ? "type" : null;
      if (kind) {
        var lh = this.lookahead();
        if (lh.type === _tokenizerTypes.types.name && lh.value !== "from" || lh.type === _tokenizerTypes.types.braceL || lh.type === _tokenizerTypes.types.star) {
          this.next();
          node.importKind = kind;
        }
      }

      inner.call(this, node);
    };
  });

  // function foo<T>() {}
  instance.extend("parseFunctionParams", function (inner) {
    return function (node) {
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      inner.call(this, node);
    };
  });

  // var foo: string = bar
  instance.extend("parseVarHead", function (inner) {
    return function (decl) {
      inner.call(this, decl);
      if (this.match(_tokenizerTypes.types.colon)) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(decl.id, decl.id.type);
      }
    };
  });

  // var foo = (async (): number => {});
  instance.extend("parseAsyncArrowFromCallExpression", function (inner) {
    return function (node, call) {
      if (this.match(_tokenizerTypes.types.colon)) {
        node.returnType = this.flowParseTypeAnnotation();
      }

      return inner.call(this, node, call);
    };
  });

  instance.extend("parseParenAndDistinguishExpression", function (inner) {
    return function (startPos, startLoc, canBeArrow, isAsync) {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;

      if (this.lookahead().type === _tokenizerTypes.types.parenR) {
        // var foo = (): number => {};
        this.expect(_tokenizerTypes.types.parenL);
        this.expect(_tokenizerTypes.types.parenR);

        var node = this.startNodeAt(startPos, startLoc);
        if (this.match(_tokenizerTypes.types.colon)) node.returnType = this.flowParseTypeAnnotation();
        this.expect(_tokenizerTypes.types.arrow);
        return this.parseArrowExpression(node, [], isAsync);
      } else {
        // var foo = (foo): number => {};
        var node = inner.call(this, startPos, startLoc, canBeArrow, isAsync);

        if (this.match(_tokenizerTypes.types.colon)) {
          var state = this.state.clone();
          try {
            return this.parseParenItem(node, startPos, startLoc, true);
          } catch (err) {
            if (err instanceof SyntaxError) {
              this.state = state;
              return node;
            } else {
              throw err;
            }
          }
        } else {
          return node;
        }
      }
    };
  });
};

module.exports = exports["default"];
}, function(modId) { var map = {"../tokenizer/types":1676544235732,"../parser":1676544235728}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235745, function(require, module, exports) {


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _xhtml = require("./xhtml");

var _xhtml2 = _interopRequireDefault(_xhtml);

var _tokenizerTypes = require("../../tokenizer/types");

var _tokenizerContext = require("../../tokenizer/context");

var _parser = require("../../parser");

var _parser2 = _interopRequireDefault(_parser);

var _utilIdentifier = require("../../util/identifier");

var _utilWhitespace = require("../../util/whitespace");

var HEX_NUMBER = /^[\da-fA-F]+$/;
var DECIMAL_NUMBER = /^\d+$/;

_tokenizerContext.types.j_oTag = new _tokenizerContext.TokContext("<tag", false);
_tokenizerContext.types.j_cTag = new _tokenizerContext.TokContext("</tag", false);
_tokenizerContext.types.j_expr = new _tokenizerContext.TokContext("<tag>...</tag>", true, true);

_tokenizerTypes.types.jsxName = new _tokenizerTypes.TokenType("jsxName");
_tokenizerTypes.types.jsxText = new _tokenizerTypes.TokenType("jsxText", { beforeExpr: true });
_tokenizerTypes.types.jsxTagStart = new _tokenizerTypes.TokenType("jsxTagStart");
_tokenizerTypes.types.jsxTagEnd = new _tokenizerTypes.TokenType("jsxTagEnd");

_tokenizerTypes.types.jsxTagStart.updateContext = function () {
  this.state.context.push(_tokenizerContext.types.j_expr); // treat as beginning of JSX expression
  this.state.context.push(_tokenizerContext.types.j_oTag); // start opening tag context
  this.state.exprAllowed = false;
};

_tokenizerTypes.types.jsxTagEnd.updateContext = function (prevType) {
  var out = this.state.context.pop();
  if (out === _tokenizerContext.types.j_oTag && prevType === _tokenizerTypes.types.slash || out === _tokenizerContext.types.j_cTag) {
    this.state.context.pop();
    this.state.exprAllowed = this.curContext() === _tokenizerContext.types.j_expr;
  } else {
    this.state.exprAllowed = true;
  }
};

var pp = _parser2["default"].prototype;

// Reads inline JSX contents token.

pp.jsxReadToken = function () {
  var out = "",
      chunkStart = this.state.pos;
  for (;;) {
    if (this.state.pos >= this.input.length) {
      this.raise(this.state.start, "Unterminated JSX contents");
    }

    var ch = this.input.charCodeAt(this.state.pos);

    switch (ch) {
      case 60: // "<"
      case 123:
        // "{"
        if (this.state.pos === this.state.start) {
          if (ch === 60 && this.state.exprAllowed) {
            ++this.state.pos;
            return this.finishToken(_tokenizerTypes.types.jsxTagStart);
          }
          return this.getTokenFromCode(ch);
        }
        out += this.input.slice(chunkStart, this.state.pos);
        return this.finishToken(_tokenizerTypes.types.jsxText, out);

      case 38:
        // "&"
        out += this.input.slice(chunkStart, this.state.pos);
        out += this.jsxReadEntity();
        chunkStart = this.state.pos;
        break;

      default:
        if (_utilWhitespace.isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadNewLine(true);
          chunkStart = this.state.pos;
        } else {
          ++this.state.pos;
        }
    }
  }
};

pp.jsxReadNewLine = function (normalizeCRLF) {
  var ch = this.input.charCodeAt(this.state.pos);
  var out;
  ++this.state.pos;
  if (ch === 13 && this.input.charCodeAt(this.state.pos) === 10) {
    ++this.state.pos;
    out = normalizeCRLF ? "\n" : "\r\n";
  } else {
    out = String.fromCharCode(ch);
  }
  ++this.state.curLine;
  this.state.lineStart = this.state.pos;

  return out;
};

pp.jsxReadString = function (quote) {
  var out = "",
      chunkStart = ++this.state.pos;
  for (;;) {
    if (this.state.pos >= this.input.length) {
      this.raise(this.state.start, "Unterminated string constant");
    }

    var ch = this.input.charCodeAt(this.state.pos);
    if (ch === quote) break;
    if (ch === 38) {
      // "&"
      out += this.input.slice(chunkStart, this.state.pos);
      out += this.jsxReadEntity();
      chunkStart = this.state.pos;
    } else if (_utilWhitespace.isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.state.pos);
      out += this.jsxReadNewLine(false);
      chunkStart = this.state.pos;
    } else {
      ++this.state.pos;
    }
  }
  out += this.input.slice(chunkStart, this.state.pos++);
  return this.finishToken(_tokenizerTypes.types.string, out);
};

pp.jsxReadEntity = function () {
  var str = "",
      count = 0,
      entity;
  var ch = this.input[this.state.pos];

  var startPos = ++this.state.pos;
  while (this.state.pos < this.input.length && count++ < 10) {
    ch = this.input[this.state.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (HEX_NUMBER.test(str)) entity = String.fromCharCode(parseInt(str, 16));
        } else {
          str = str.substr(1);
          if (DECIMAL_NUMBER.test(str)) entity = String.fromCharCode(parseInt(str, 10));
        }
      } else {
        entity = _xhtml2["default"][str];
      }
      break;
    }
    str += ch;
  }
  if (!entity) {
    this.state.pos = startPos;
    return "&";
  }
  return entity;
};

// Read a JSX identifier (valid tag or attribute name).
//
// Optimized version since JSX identifiers can"t contain
// escape characters and so can be read as single slice.
// Also assumes that first character was already checked
// by isIdentifierStart in readToken.

pp.jsxReadWord = function () {
  var ch,
      start = this.state.pos;
  do {
    ch = this.input.charCodeAt(++this.state.pos);
  } while (_utilIdentifier.isIdentifierChar(ch) || ch === 45); // "-"
  return this.finishToken(_tokenizerTypes.types.jsxName, this.input.slice(start, this.state.pos));
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier") {
    return object.name;
  }

  if (object.type === "JSXNamespacedName") {
    return object.namespace.name + ":" + object.name.name;
  }

  if (object.type === "JSXMemberExpression") {
    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  }
}

// Parse next token as JSX identifier

pp.jsxParseIdentifier = function () {
  var node = this.startNode();
  if (this.match(_tokenizerTypes.types.jsxName)) {
    node.name = this.state.value;
  } else if (this.state.type.keyword) {
    node.name = this.state.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "JSXIdentifier");
};

// Parse namespaced identifier.

pp.jsxParseNamespacedName = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var name = this.jsxParseIdentifier();
  if (!this.eat(_tokenizerTypes.types.colon)) return name;

  var node = this.startNodeAt(startPos, startLoc);
  node.namespace = name;
  node.name = this.jsxParseIdentifier();
  return this.finishNode(node, "JSXNamespacedName");
};

// Parses element name in any form - namespaced, member
// or single identifier.

pp.jsxParseElementName = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var node = this.jsxParseNamespacedName();
  while (this.eat(_tokenizerTypes.types.dot)) {
    var newNode = this.startNodeAt(startPos, startLoc);
    newNode.object = node;
    newNode.property = this.jsxParseIdentifier();
    node = this.finishNode(newNode, "JSXMemberExpression");
  }
  return node;
};

// Parses any type of JSX attribute value.

pp.jsxParseAttributeValue = function () {
  var node;
  switch (this.state.type) {
    case _tokenizerTypes.types.braceL:
      node = this.jsxParseExpressionContainer();
      if (node.expression.type === "JSXEmptyExpression") {
        this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
      } else {
        return node;
      }

    case _tokenizerTypes.types.jsxTagStart:
    case _tokenizerTypes.types.string:
      node = this.parseExprAtom();
      node.rawValue = null;
      return node;

    default:
      this.raise(this.state.start, "JSX value should be either an expression or a quoted JSX text");
  }
};

// JSXEmptyExpression is unique type since it doesn"t actually parse anything,
// and so it should start at the end of last read token (left brace) and finish
// at the beginning of the next one (right brace).

pp.jsxParseEmptyExpression = function () {
  var tmp = this.state.start;
  this.state.start = this.state.lastTokEnd;
  this.state.lastTokEnd = tmp;

  tmp = this.state.startLoc;
  this.state.startLoc = this.state.lastTokEndLoc;
  this.state.lastTokEndLoc = tmp;

  return this.finishNode(this.startNode(), "JSXEmptyExpression");
};

// Parses JSX expression enclosed into curly brackets.

pp.jsxParseExpressionContainer = function () {
  var node = this.startNode();
  this.next();
  if (this.match(_tokenizerTypes.types.braceR)) {
    node.expression = this.jsxParseEmptyExpression();
  } else {
    node.expression = this.parseExpression();
  }
  this.expect(_tokenizerTypes.types.braceR);
  return this.finishNode(node, "JSXExpressionContainer");
};

// Parses following JSX attribute name-value pair.

pp.jsxParseAttribute = function () {
  var node = this.startNode();
  if (this.eat(_tokenizerTypes.types.braceL)) {
    this.expect(_tokenizerTypes.types.ellipsis);
    node.argument = this.parseMaybeAssign();
    this.expect(_tokenizerTypes.types.braceR);
    return this.finishNode(node, "JSXSpreadAttribute");
  }
  node.name = this.jsxParseNamespacedName();
  node.value = this.eat(_tokenizerTypes.types.eq) ? this.jsxParseAttributeValue() : null;
  return this.finishNode(node, "JSXAttribute");
};

// Parses JSX opening tag starting after "<".

pp.jsxParseOpeningElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.attributes = [];
  node.name = this.jsxParseElementName();
  while (!this.match(_tokenizerTypes.types.slash) && !this.match(_tokenizerTypes.types.jsxTagEnd)) {
    node.attributes.push(this.jsxParseAttribute());
  }
  node.selfClosing = this.eat(_tokenizerTypes.types.slash);
  this.expect(_tokenizerTypes.types.jsxTagEnd);
  return this.finishNode(node, "JSXOpeningElement");
};

// Parses JSX closing tag starting after "</".

pp.jsxParseClosingElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.name = this.jsxParseElementName();
  this.expect(_tokenizerTypes.types.jsxTagEnd);
  return this.finishNode(node, "JSXClosingElement");
};

// Parses entire JSX element, including it"s opening tag
// (starting after "<"), attributes, contents and closing tag.

pp.jsxParseElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  var children = [];
  var openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
  var closingElement = null;

  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (this.state.type) {
        case _tokenizerTypes.types.jsxTagStart:
          startPos = this.state.start;startLoc = this.state.startLoc;
          this.next();
          if (this.eat(_tokenizerTypes.types.slash)) {
            closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
            break contents;
          }
          children.push(this.jsxParseElementAt(startPos, startLoc));
          break;

        case _tokenizerTypes.types.jsxText:
          children.push(this.parseExprAtom());
          break;

        case _tokenizerTypes.types.braceL:
          children.push(this.jsxParseExpressionContainer());
          break;

        default:
          this.unexpected();
      }
    }

    if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
      this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
    }
  }

  node.openingElement = openingElement;
  node.closingElement = closingElement;
  node.children = children;
  if (this.match(_tokenizerTypes.types.relational) && this.state.value === "<") {
    this.raise(this.state.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
  }
  return this.finishNode(node, "JSXElement");
};

// Parses entire JSX element from current position.

pp.jsxParseElement = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  this.next();
  return this.jsxParseElementAt(startPos, startLoc);
};

exports["default"] = function (instance) {
  instance.extend("parseExprAtom", function (inner) {
    return function (refShortHandDefaultPos) {
      if (this.match(_tokenizerTypes.types.jsxText)) {
        var node = this.parseLiteral(this.state.value);
        // https://github.com/babel/babel/issues/2078
        node.rawValue = null;
        return node;
      } else if (this.match(_tokenizerTypes.types.jsxTagStart)) {
        return this.jsxParseElement();
      } else {
        return inner.call(this, refShortHandDefaultPos);
      }
    };
  });

  instance.extend("readToken", function (inner) {
    return function (code) {
      var context = this.curContext();

      if (context === _tokenizerContext.types.j_expr) {
        return this.jsxReadToken();
      }

      if (context === _tokenizerContext.types.j_oTag || context === _tokenizerContext.types.j_cTag) {
        if (_utilIdentifier.isIdentifierStart(code)) {
          return this.jsxReadWord();
        }

        if (code === 62) {
          ++this.state.pos;
          return this.finishToken(_tokenizerTypes.types.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context === _tokenizerContext.types.j_oTag) {
          return this.jsxReadString(code);
        }
      }

      if (code === 60 && this.state.exprAllowed) {
        ++this.state.pos;
        return this.finishToken(_tokenizerTypes.types.jsxTagStart);
      }

      return inner.call(this, code);
    };
  });

  instance.extend("updateContext", function (inner) {
    return function (prevType) {
      if (this.match(_tokenizerTypes.types.braceL)) {
        var curContext = this.curContext();
        if (curContext === _tokenizerContext.types.j_oTag) {
          this.state.context.push(_tokenizerContext.types.b_expr);
        } else if (curContext === _tokenizerContext.types.j_expr) {
          this.state.context.push(_tokenizerContext.types.b_tmpl);
        } else {
          inner.call(this, prevType);
        }
        this.state.exprAllowed = true;
      } else if (this.match(_tokenizerTypes.types.slash) && prevType === _tokenizerTypes.types.jsxTagStart) {
        this.state.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
        this.state.context.push(_tokenizerContext.types.j_cTag); // reconsider as closing tag context
        this.state.exprAllowed = false;
      } else {
        return inner.call(this, prevType);
      }
    };
  });
};

module.exports = exports["default"];
}, function(modId) { var map = {"./xhtml":1676544235746,"../../tokenizer/types":1676544235732,"../../tokenizer/context":1676544235733,"../../parser":1676544235728,"../../util/identifier":1676544235729,"../../util/whitespace":1676544235735}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1676544235746, function(require, module, exports) {


exports.__esModule = true;
exports["default"] = {
  quot: "\"",
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  frasl: "⁄",
  euro: "€",
  image: "ℑ",
  weierp: "℘",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  "int": "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
};
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1676544235727);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map