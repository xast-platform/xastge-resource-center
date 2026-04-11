(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ao.b_ === region.aH.b_)
	{
		return 'on line ' + region.ao.b_;
	}
	return 'on lines ' + region.ao.b_ + ' through ' + region.aH.b_;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bX,
		impl.cJ,
		impl.cE,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		b7: func(record.b7),
		aq: record.aq,
		al: record.al
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.b7;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aq;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.al) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bX,
		impl.cJ,
		impl.cE,
		function(sendToApp, initialModel) {
			var view = impl.cN;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bX,
		impl.cJ,
		impl.cE,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.an && impl.an(sendToApp)
			var view = impl.cN;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.ab);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.au) && (_VirtualDom_doc.title = title = doc.au);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.cd;
	var onUrlRequest = impl.ce;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		an: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a1 === next.a1
							&& curr.aO === next.aO
							&& curr.a_.a === next.a_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bX: function(flags)
		{
			return A3(impl.bX, flags, _Browser_getUrl(), key);
		},
		cN: impl.cN,
		cJ: impl.cJ,
		cE: impl.cE
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bT: 'hidden', by: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bT: 'mozHidden', by: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bT: 'msHidden', by: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bT: 'webkitHidden', by: 'webkitvisibilitychange' }
		: { bT: 'hidden', by: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		a7: _Browser_getScene(),
		bk: {
			bm: _Browser_window.pageXOffset,
			bn: _Browser_window.pageYOffset,
			bl: _Browser_doc.documentElement.clientWidth,
			aN: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bl: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aN: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			a7: {
				bl: node.scrollWidth,
				aN: node.scrollHeight
			},
			bk: {
				bm: node.scrollLeft,
				bn: node.scrollTop,
				bl: node.clientWidth,
				aN: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			a7: _Browser_getScene(),
			bk: {
				bm: x,
				bn: y,
				bl: _Browser_doc.documentElement.clientWidth,
				aN: _Browser_doc.documentElement.clientHeight
			},
			bL: {
				bm: x + rect.left,
				bn: y + rect.top,
				bl: rect.width,
				aN: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.ad.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.ad.b, xhr)); });
		$elm$core$Maybe$isJust(request.av) && _Http_track(router, xhr, request.av.a);

		try {
			xhr.open(request.ah, request.aw, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.aw));
		}

		_Http_configureRequest(xhr, request);

		request.ab.a && xhr.setRequestHeader('Content-Type', request.ab.a);
		xhr.send(request.ab.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.ae; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.at.a || 0;
	xhr.responseType = request.ad.d;
	xhr.withCredentials = request.bq;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		aw: xhr.responseURL,
		cA: xhr.status,
		cB: xhr.statusText,
		ae: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			cu: event.loaded,
			bd: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			cn: event.loaded,
			bd: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}

var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $author$project$Event$LinkClicked = function (a) {
	return {$: 68, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $author$project$Event$UrlChange = function (a) {
	return {$: 67, a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.b) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.d);
		} else {
			var treeLen = builder.b * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.e) : builder.e;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.b);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.d);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{e: nodeList, b: (len / $elm$core$Array$branchFactor) | 0, d: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aM: fragment, aO: host, cj: path, a_: port_, a1: protocol, ck: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Model$Route$getTitle = function (route) {
	switch (route.$) {
		case 0:
			return 'XastGE Resource Center';
		case 1:
			return 'Browse | XastGE Resource Center';
		case 2:
			return 'About | XastGE Resource Center';
		case 8:
			return 'Page not found | XastGE Resource Center';
		case 4:
			return 'Register | XastGE Resource Center';
		case 3:
			return 'Login | XastGE Resource Center';
		case 6:
			return 'Dashboard | XastGE Resource Center';
		case 7:
			return 'Asset | XastGE Resource Center';
		default:
			return 'Confirm Account | XastGE Resource Center';
	}
};
var $author$project$Model$PageModel$Browse = function (a) {
	return {$: 1, a: a};
};
var $author$project$Event$LoadAssetPage = function (a) {
	return {$: 58, a: a};
};
var $author$project$Event$LoadBrowseData = {$: 14};
var $author$project$Event$LoadDashboardData = {$: 31};
var $author$project$Event$LoadHomeData = {$: 10};
var $author$project$Model$AccountStatus$LoggedIn = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$AccountStatus$LoggedOut = {$: 0};
var $author$project$Api$Backend$Rest = 0;
var $author$project$Event$SendConfirm = function (a) {
	return {$: 65, a: a};
};
var $author$project$Model$Page$BrowseModel$empty = {bp: '', aB: '', aC: _List_Nil, bv: '', bS: false, b1: true, aS: false, ca: '', ch: 1, aY: 50, ap: $elm$core$Maybe$Nothing, cG: ''};
var $author$project$Model$PageModel$About = {$: 2};
var $author$project$Model$PageModel$Asset = function (a) {
	return {$: 6, a: a};
};
var $author$project$Model$PageModel$Confirm = function (a) {
	return {$: 8, a: a};
};
var $author$project$Model$PageModel$Dashboard = function (a) {
	return {$: 5, a: a};
};
var $author$project$Model$PageModel$Home = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$PageModel$Login = function (a) {
	return {$: 3, a: a};
};
var $author$project$Model$PageModel$NotFound = function (a) {
	return {$: 7, a: a};
};
var $author$project$Model$PageModel$Register = function (a) {
	return {$: 4, a: a};
};
var $author$project$Model$Page$DashboardModel$Home = 0;
var $author$project$Model$Page$DashboardModel$empty = {az: _List_Nil, bt: $elm$core$Maybe$Nothing, aB: 'Scene', ac: '', bF: false, bG: '', bH: $elm$core$Maybe$Nothing, bI: '', bJ: $elm$core$Maybe$Nothing, bK: $elm$core$Maybe$Nothing, W: _List_Nil, b0: $elm$core$Maybe$Nothing, b2: false, aR: false, X: _List_Nil, a8: '', cv: false, a9: '', am: '', cw: false, cx: $elm$core$Maybe$Nothing, ba: '', cy: false, bb: '', cz: false, cF: 0, as: '', bg: $elm$core$Maybe$Nothing, cK: false, aa: _List_Nil, cL: $elm$core$Maybe$Nothing};
var $author$project$Model$Page$HomeModel$empty = {aQ: _List_Nil, b3: true, cl: '', ap: $elm$core$Maybe$Nothing};
var $author$project$Model$Page$LoginModel$empty = {aI: _List_Nil, b5: false, Y: '', a6: true, cD: $elm$core$Maybe$Nothing, ax: ''};
var $author$project$Model$Page$RegisterModel$empty = {bM: '', aI: _List_Nil, Y: '', ci: '', co: false, a6: true, cD: $elm$core$Maybe$Nothing, ax: ''};
var $author$project$Model$Page$AssetModel$init = function (assetId) {
	return {bs: $elm$core$Maybe$Nothing, aA: assetId, b1: true, cp: '', bc: false, ap: $elm$core$Maybe$Nothing};
};
var $author$project$Model$Page$ConfirmModel$init = function (token) {
	return {ap: $elm$core$Maybe$Nothing, h: token};
};
var $author$project$Model$PageModel$fromRoute = function (route) {
	switch (route.$) {
		case 0:
			return $author$project$Model$PageModel$Home($author$project$Model$Page$HomeModel$empty);
		case 1:
			return $author$project$Model$PageModel$Browse($author$project$Model$Page$BrowseModel$empty);
		case 2:
			return $author$project$Model$PageModel$About;
		case 3:
			return $author$project$Model$PageModel$Login($author$project$Model$Page$LoginModel$empty);
		case 4:
			return $author$project$Model$PageModel$Register($author$project$Model$Page$RegisterModel$empty);
		case 6:
			return $author$project$Model$PageModel$Dashboard($author$project$Model$Page$DashboardModel$empty);
		case 7:
			var assetId = route.a;
			return $author$project$Model$PageModel$Asset(
				$author$project$Model$Page$AssetModel$init(assetId));
		case 8:
			var page = route.a;
			return $author$project$Model$PageModel$NotFound(page);
		default:
			var token = route.a;
			return $author$project$Model$PageModel$Confirm(
				$author$project$Model$Page$ConfirmModel$init(token));
	}
};
var $author$project$Api$Backend$GraphQL = 1;
var $author$project$Api$Backend$fromString = function (str) {
	if (str === 'graphql') {
		return 1;
	} else {
		return 0;
	}
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Model$getQueryParam = F2(
	function (key, maybeQuery) {
		if (maybeQuery.$ === 1) {
			return '';
		} else {
			var query = maybeQuery.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$elm$core$List$head(
					A2(
						$elm$core$List$filterMap,
						function (part) {
							var _v1 = A2($elm$core$String$split, '=', part);
							_v1$2:
							while (true) {
								if (_v1.b) {
									if (_v1.b.b) {
										if (!_v1.b.b.b) {
											var currentKey = _v1.a;
											var _v2 = _v1.b;
											var rawValue = _v2.a;
											return _Utils_eq(currentKey, key) ? $elm$url$Url$percentDecode(rawValue) : $elm$core$Maybe$Nothing;
										} else {
											break _v1$2;
										}
									} else {
										var currentKey = _v1.a;
										return _Utils_eq(currentKey, key) ? $elm$core$Maybe$Just('') : $elm$core$Maybe$Nothing;
									}
								} else {
									break _v1$2;
								}
							}
							return $elm$core$Maybe$Nothing;
						},
						A2($elm$core$String$split, '&', query))));
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Model$Route$NotFound = function (a) {
	return {$: 8, a: a};
};
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {v: frag, x: params, u: unvisited, K: value, B: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.u;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.K);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.K);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.cj),
					$elm$url$Url$Parser$prepareQuery(url.ck),
					url.aM,
					$elm$core$Basics$identity)));
	});
var $author$project$Model$Route$About = {$: 2};
var $author$project$Model$Route$Asset = function (a) {
	return {$: 7, a: a};
};
var $author$project$Model$Route$Browse = {$: 1};
var $author$project$Model$Route$Confirm = function (a) {
	return {$: 5, a: a};
};
var $author$project$Model$Route$Dashboard = {$: 6};
var $author$project$Model$Route$Home = {$: 0};
var $author$project$Model$Route$Login = {$: 3};
var $author$project$Model$Route$Register = {$: 4};
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.B;
		var unvisited = _v0.u;
		var params = _v0.x;
		var frag = _v0.v;
		var value = _v0.K;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.B;
			var unvisited = _v1.u;
			var params = _v1.x;
			var frag = _v1.v;
			var value = _v1.K;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.B;
		var unvisited = _v0.u;
		var params = _v0.x;
		var frag = _v0.v;
		var value = _v0.K;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.B;
			var unvisited = _v0.u;
			var params = _v0.x;
			var frag = _v0.v;
			var value = _v0.K;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
					var nextValue = _v2.a;
					return _List_fromArray(
						[
							A5(
							$elm$url$Url$Parser$State,
							A2($elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Model$Route$routeParser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Model$Route$Home, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Browse,
			$elm$url$Url$Parser$s('browse')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Login,
			$elm$url$Url$Parser$s('login')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Register,
			$elm$url$Url$Parser$s('register')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$About,
			$elm$url$Url$Parser$s('about')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Dashboard,
			$elm$url$Url$Parser$s('dashboard')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Asset,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('asset'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$Route$Confirm,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('confirm'),
				$elm$url$Url$Parser$string))
		]));
var $author$project$Model$Route$parseUrl = function (url) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Model$Route$NotFound(
			A2($elm$core$String$dropLeft, 1, url.cj)),
		A2($elm$url$Url$Parser$parse, $author$project$Model$Route$routeParser, url));
};
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Model$init = F3(
	function (flags, url, key) {
		var route = $author$project$Model$Route$parseUrl(url);
		var pageLoadCmd = function () {
			switch (route.$) {
				case 0:
					return A2(
						$elm$core$Task$perform,
						$elm$core$Basics$identity,
						$elm$core$Task$succeed($author$project$Event$LoadHomeData));
				case 1:
					return A2(
						$elm$core$Task$perform,
						$elm$core$Basics$identity,
						$elm$core$Task$succeed($author$project$Event$LoadBrowseData));
				case 6:
					return A2(
						$elm$core$Task$perform,
						$elm$core$Basics$identity,
						$elm$core$Task$succeed($author$project$Event$LoadDashboardData));
				case 7:
					var assetId = route.a;
					return A2(
						$elm$core$Task$perform,
						$elm$core$Basics$identity,
						$elm$core$Task$succeed(
							$author$project$Event$LoadAssetPage(assetId)));
				case 5:
					var token = route.a;
					return A2(
						$elm$core$Task$perform,
						$elm$core$Basics$identity,
						$elm$core$Task$succeed(
							$author$project$Event$SendConfirm(token)));
				default:
					return $elm$core$Platform$Cmd$none;
			}
		}();
		var initialPage = function () {
			if (route.$ === 1) {
				var browseModel = $author$project$Model$Page$BrowseModel$empty;
				return $author$project$Model$PageModel$Browse(
					_Utils_update(
						browseModel,
						{
							bp: A2($author$project$Model$getQueryParam, 'q', url.ck)
						}));
			} else {
				return $author$project$Model$PageModel$fromRoute(route);
			}
		}();
		var initialBackend = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $author$project$Api$Backend$fromString, flags.aE));
		var accountStatus = function () {
			var _v6 = flags.cM;
			if (!_v6.$) {
				var userData = _v6.a;
				return $author$project$Model$AccountStatus$LoggedIn(userData);
			} else {
				return $author$project$Model$AccountStatus$LoggedOut;
			}
		}();
		var redirectToHome = function () {
			var _v3 = _Utils_Tuple2(accountStatus, route);
			_v3$2:
			while (true) {
				if (_v3.a.$ === 1) {
					switch (_v3.b.$) {
						case 3:
							var _v4 = _v3.b;
							return true;
						case 4:
							var _v5 = _v3.b;
							return true;
						default:
							break _v3$2;
					}
				} else {
					break _v3$2;
				}
			}
			return false;
		}();
		var redirectToLogin = function () {
			var _v0 = _Utils_Tuple2(accountStatus, route);
			if ((!_v0.a.$) && (_v0.b.$ === 6)) {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return true;
			} else {
				return false;
			}
		}();
		return _Utils_Tuple2(
			{S: accountStatus, aE: initialBackend, aP: key, ch: initialPage, ct: route},
			redirectToHome ? A2($elm$browser$Browser$Navigation$replaceUrl, key, '/') : (redirectToLogin ? A2($elm$browser$Browser$Navigation$replaceUrl, key, '/login') : pageLoadCmd));
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Model$Page$DashboardModel$AssetFile = 1;
var $author$project$Model$Page$DashboardModel$AssetType = 0;
var $author$project$Model$Page$DashboardModel$Description = 2;
var $author$project$Model$Page$RegisterModel$Email = 1;
var $author$project$Model$Page$RegisterModel$Error = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$Page$LoginModel$Password = 1;
var $author$project$Model$Page$RegisterModel$Password = 2;
var $author$project$Model$Page$RegisterModel$PasswordAgain = 3;
var $author$project$Model$Page$RegisterModel$Success = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Page$DashboardModel$ThumbnailFile = 3;
var $author$project$Model$Page$LoginModel$Username = 0;
var $author$project$Model$Page$RegisterModel$Username = 0;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Api$Ports$cleanUserData = _Platform_outgoingPort(
	'cleanUserData',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Event$EmailConfirmationReceived = function (a) {
	return {$: 66, a: a};
};
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $author$project$Api$Rest$backendErrorDecoder = A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string);
var $author$project$Api$Rest$backendMessageDecoder = A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Api$Rest$backendMessageResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Request failed'));
			}
		default:
			var body = response.b;
			var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendMessageDecoder, body);
			if (!_v2.$) {
				var message = _v2.a;
				return $elm$core$Result$Ok(message);
			} else {
				return $elm$core$Result$Ok('Success');
			}
	}
};
var $author$project$Api$Config$backendUrl = 'https://api.rc.xast.org/api';
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {a3: reqs, be: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.av;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.a3));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.be)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					bq: r.bq,
					ab: r.ab,
					ad: A2(_Http_mapExpect, func, r.ad),
					ae: r.ae,
					ah: r.ah,
					at: r.at,
					av: r.av,
					aw: r.aw
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{bq: false, ab: r.ab, ad: r.ad, ae: r.ae, ah: r.ah, at: r.at, av: r.av, aw: r.aw}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{ab: $elm$http$Http$emptyBody, ad: r.ad, ae: _List_Nil, ah: 'GET', at: $elm$core$Maybe$Nothing, av: $elm$core$Maybe$Nothing, aw: r.aw});
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $author$project$Api$Rest$confirmEmail = function (token) {
	return $elm$http$Http$get(
		{
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$EmailConfirmationReceived, $author$project$Api$Rest$backendMessageResolver),
			aw: $author$project$Api$Config$backendUrl + ('/auth/verify-email?token=' + $elm$url$Url$percentEncode(token))
		});
};
var $author$project$Api$confirmEmail = function (token) {
	return $author$project$Api$Rest$confirmEmail(token);
};
var $author$project$Event$DashboardAccountDeleteResponseReceived = function (a) {
	return {$: 57, a: a};
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $author$project$Api$GraphQL$authHeaders = function (token) {
	if (!token.$) {
		var t = token.a;
		return _List_fromArray(
			[
				A2($elm$http$Http$header, 'Authorization', 'Bearer ' + t)
			]);
	} else {
		return _List_Nil;
	}
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Api$GraphQL$decodeGraphqlError = function (body) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeString,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['errors']),
			$elm$json$Json$Decode$list(
				A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string))),
		body);
	if ((!_v0.$) && _v0.a.b) {
		var _v1 = _v0.a;
		var first = _v1.a;
		return first;
	} else {
		var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
		if (!_v2.$) {
			var message = _v2.a;
			return message;
		} else {
			return 'Request failed';
		}
	}
};
var $author$project$Api$GraphQL$graphqlResolver = F2(
	function (dataDecoder, response) {
		switch (response.$) {
			case 0:
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Invalid request URL'));
			case 1:
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Request timed out'));
			case 2:
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Network error, check if backend is running'));
			case 3:
				var body = response.b;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(
						$author$project$Api$GraphQL$decodeGraphqlError(body)));
			default:
				var body = response.b;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeString,
					A2($elm$json$Json$Decode$field, 'data', dataDecoder),
					body);
				if (!_v1.$) {
					var payload = _v1.a;
					return $elm$core$Result$Ok(payload);
				} else {
					return $elm$core$Result$Err(
						$elm$http$Http$BadBody(
							$author$project$Api$GraphQL$decodeGraphqlError(body)));
				}
		}
	});
var $author$project$Api$Config$graphqlUrl = 'https://api.rc.xast.org/graphql';
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Api$GraphQL$graphqlRequest = F4(
	function (token, query, payloadDecoder, toMsg) {
		return $elm$http$Http$request(
			{
				ab: $elm$http$Http$jsonBody(
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'query',
								$elm$json$Json$Encode$string(query))
							]))),
				ad: A2(
					$elm$http$Http$expectStringResponse,
					toMsg,
					$author$project$Api$GraphQL$graphqlResolver(payloadDecoder)),
				ae: $author$project$Api$GraphQL$authHeaders(token),
				ah: 'POST',
				at: $elm$core$Maybe$Nothing,
				av: $elm$core$Maybe$Nothing,
				aw: $author$project$Api$Config$graphqlUrl
			});
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Api$GraphQL$joinArgs = function (args) {
	return $elm$core$List$isEmpty(args) ? '' : ('(' + (A2($elm$core$String$join, ', ', args) + ')'));
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Api$GraphQL$escapeGraphqlString = function (value) {
	return A3(
		$elm$core$String$replace,
		'\n',
		'\\n',
		A3(
			$elm$core$String$replace,
			'\"',
			'\\\"',
			A3($elm$core$String$replace, '\\', '\\\\', value)));
};
var $author$project$Api$GraphQL$strArg = F2(
	function (key, value) {
		return key + (': \"' + ($author$project$Api$GraphQL$escapeGraphqlString(value) + '\"'));
	});
var $author$project$Api$GraphQL$deleteAccount = function (req) {
	var query = 'mutation { deleteAccount' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'password', req.Y)
			])) + ' { message } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['deleteAccount', 'message']),
			$elm$json$Json$Decode$string),
		$author$project$Event$DashboardAccountDeleteResponseReceived);
};
var $author$project$Api$Rest$authHeaders = function (token) {
	if (!token.$) {
		var t = token.a;
		return _List_fromArray(
			[
				A2($elm$http$Http$header, 'Authorization', 'Bearer ' + t)
			]);
	} else {
		return _List_Nil;
	}
};
var $author$project$Api$Rest$deleteAccount = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$jsonBody(
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'password',
							$elm$json$Json$Encode$string(req.Y))
						]))),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardAccountDeleteResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'DELETE',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/auth/account'
		});
};
var $author$project$Api$deleteAccount = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$deleteAccount(req);
		} else {
			return $author$project$Api$GraphQL$deleteAccount(req);
		}
	});
var $author$project$Event$DashboardDeleteResponseReceived = function (a) {
	return {$: 44, a: a};
};
var $author$project$Api$GraphQL$deleteAsset = function (req) {
	var query = 'mutation { deleteAsset' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'id', req.G)
			])) + ' { message } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['deleteAsset', 'message']),
			$elm$json$Json$Decode$string),
		$author$project$Event$DashboardDeleteResponseReceived);
};
var $author$project$Api$Rest$deleteAsset = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardDeleteResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'DELETE',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets/' + req.G)
		});
};
var $author$project$Api$deleteAsset = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$deleteAsset(req);
		} else {
			return $author$project$Api$GraphQL$deleteAsset(req);
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$String$trim = _String_trim;
var $author$project$Model$Page$DashboardModel$isPasswordFieldValid = function (password) {
	return $elm$core$String$trim(password) !== '';
};
var $author$project$Model$Page$DashboardModel$deletePasswordValid = function (password) {
	return $author$project$Model$Page$DashboardModel$isPasswordFieldValid(password);
};
var $author$project$Event$AssetPageAssetReceived = function (a) {
	return {$: 59, a: a};
};
var $author$project$Model$Asset$Asset = function (id) {
	return function (ownerId) {
		return function (authorName) {
			return function (assetType) {
				return function (description) {
					return function (tags) {
						return function (fileName) {
							return function (fileUrl) {
								return function (thumbnailUrl) {
									return function (favoriteCount) {
										return function (downloadCount) {
											return function (isFavorite) {
												return {aB: assetType, aD: authorName, ac: description, bE: downloadCount, bP: favoriteCount, bQ: fileName, bR: fileUrl, G: id, bY: isFavorite, cg: ownerId, as: tags, bh: thumbnailUrl};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Api$Rest$andMap = F2(
	function (decoder, fnDecoder) {
		return A3($elm$json$Json$Decode$map2, $elm$core$Basics$apR, decoder, fnDecoder);
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Api$Rest$assetDecoder = A2(
	$author$project$Api$Rest$andMap,
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$field, 'isFavorite', $elm$json$Json$Decode$bool),
				$elm$json$Json$Decode$succeed(false)
			])),
	A2(
		$author$project$Api$Rest$andMap,
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2($elm$json$Json$Decode$field, 'downloadCount', $elm$json$Json$Decode$int),
					$elm$json$Json$Decode$succeed(0)
				])),
		A2(
			$author$project$Api$Rest$andMap,
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'favoriteCount', $elm$json$Json$Decode$int),
						$elm$json$Json$Decode$succeed(0)
					])),
			A2(
				$author$project$Api$Rest$andMap,
				$elm$json$Json$Decode$oneOf(
					_List_fromArray(
						[
							A2($elm$json$Json$Decode$field, 'thumbnailUrl', $elm$json$Json$Decode$string),
							$elm$json$Json$Decode$succeed('')
						])),
				A2(
					$author$project$Api$Rest$andMap,
					A2($elm$json$Json$Decode$field, 'fileUrl', $elm$json$Json$Decode$string),
					A2(
						$author$project$Api$Rest$andMap,
						A2($elm$json$Json$Decode$field, 'fileName', $elm$json$Json$Decode$string),
						A2(
							$author$project$Api$Rest$andMap,
							A2(
								$elm$json$Json$Decode$field,
								'tags',
								$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
							A2(
								$author$project$Api$Rest$andMap,
								A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
								A2(
									$author$project$Api$Rest$andMap,
									A2($elm$json$Json$Decode$field, 'assetType', $elm$json$Json$Decode$string),
									A2(
										$author$project$Api$Rest$andMap,
										$elm$json$Json$Decode$oneOf(
											_List_fromArray(
												[
													A2($elm$json$Json$Decode$field, 'authorName', $elm$json$Json$Decode$string),
													$elm$json$Json$Decode$succeed('')
												])),
										A2(
											$author$project$Api$Rest$andMap,
											$elm$json$Json$Decode$oneOf(
												_List_fromArray(
													[
														A2($elm$json$Json$Decode$field, 'ownerId', $elm$json$Json$Decode$string),
														$elm$json$Json$Decode$succeed('')
													])),
											A2(
												$author$project$Api$Rest$andMap,
												A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
												$elm$json$Json$Decode$succeed($author$project$Model$Asset$Asset)))))))))))));
var $author$project$Api$GraphQL$getAssetById = function (req) {
	var query = 'query { asset' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'id', req.G)
			])) + ' { asset { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		req.h,
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['asset', 'asset']),
			$author$project$Api$Rest$assetDecoder),
		$author$project$Event$AssetPageAssetReceived);
};
var $author$project$Api$Rest$assetDetailResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Failed to load asset'));
			}
		default:
			var body = response.b;
			var _v2 = A2(
				$elm$json$Json$Decode$decodeString,
				A2($elm$json$Json$Decode$field, 'asset', $author$project$Api$Rest$assetDecoder),
				body);
			if (!_v2.$) {
				var asset = _v2.a;
				return $elm$core$Result$Ok(asset);
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Unexpected response from server'));
			}
	}
};
var $author$project$Api$Rest$getAssetById = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$AssetPageAssetReceived, $author$project$Api$Rest$assetDetailResolver),
			ae: $author$project$Api$Rest$authHeaders(req.h),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets/' + req.G)
		});
};
var $author$project$Api$getAssetById = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$getAssetById(req);
		} else {
			return $author$project$Api$GraphQL$getAssetById(req);
		}
	});
var $author$project$Event$DashboardMyAssetsReceived = function (a) {
	return {$: 33, a: a};
};
var $author$project$Api$GraphQL$boolArg = F2(
	function (key, value) {
		return key + (': ' + (value ? 'true' : 'false'));
	});
var $author$project$Api$GraphQL$getAssets = function (req) {
	var query = 'query { listAssets' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$boolArg, 'mine', req.b8),
				A2($author$project$Api$GraphQL$boolArg, 'favorites', req.aK)
			])) + ' { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		req.h,
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['listAssets', 'assets']),
			$elm$json$Json$Decode$list($author$project$Api$Rest$assetDecoder)),
		$author$project$Event$DashboardMyAssetsReceived);
};
var $author$project$Api$Rest$assetListResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Failed to load assets'));
			}
		default:
			var body = response.b;
			var _v2 = A2(
				$elm$json$Json$Decode$decodeString,
				A2(
					$elm$json$Json$Decode$field,
					'assets',
					$elm$json$Json$Decode$list($author$project$Api$Rest$assetDecoder)),
				body);
			if (!_v2.$) {
				var assets = _v2.a;
				return $elm$core$Result$Ok(assets);
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Unexpected response from server'));
			}
	}
};
var $author$project$Api$Rest$boolToQuery = function (val) {
	return val ? 'true' : 'false';
};
var $author$project$Api$Rest$getAssets = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardMyAssetsReceived, $author$project$Api$Rest$assetListResolver),
			ae: $author$project$Api$Rest$authHeaders(req.h),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets?mine=' + ($author$project$Api$Rest$boolToQuery(req.b8) + ('&favorites=' + $author$project$Api$Rest$boolToQuery(req.aK))))
		});
};
var $author$project$Api$getAssets = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$getAssets(req);
		} else {
			return $author$project$Api$GraphQL$getAssets(req);
		}
	});
var $author$project$Event$BrowseAssetsReceived = function (a) {
	return {$: 22, a: a};
};
var $author$project$Api$GraphQL$intArg = F2(
	function (key, value) {
		return key + (': ' + $elm$core$String$fromInt(value));
	});
var $author$project$Api$GraphQL$maybeStrArg = F2(
	function (key, value) {
		return ($elm$core$String$trim(value) === '') ? _List_Nil : _List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, key, value)
			]);
	});
var $author$project$Api$GraphQL$getBrowseAssets = function (req) {
	var args = _Utils_ap(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$intArg, 'page', req.ch),
				A2($author$project$Api$GraphQL$intArg, 'limit', req.bZ)
			]),
		_Utils_ap(
			A2($author$project$Api$GraphQL$maybeStrArg, 'name', req.ca),
			_Utils_ap(
				A2($author$project$Api$GraphQL$maybeStrArg, 'type', req.aB),
				_Utils_ap(
					A2($author$project$Api$GraphQL$maybeStrArg, 'tag', req.cG),
					_Utils_ap(
						A2($author$project$Api$GraphQL$maybeStrArg, 'author', req.bv),
						A2($author$project$Api$GraphQL$maybeStrArg, 'q', req.bp))))));
	var query = 'query { listAssets' + ($author$project$Api$GraphQL$joinArgs(args) + ' { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		req.h,
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['listAssets', 'assets']),
			$elm$json$Json$Decode$list($author$project$Api$Rest$assetDecoder)),
		$author$project$Event$BrowseAssetsReceived);
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Api$Rest$getBrowseAssets = function (req) {
	var queryParams = A2(
		$elm$core$List$map,
		function (_v1) {
			var key = _v1.a;
			var value = _v1.b;
			return key + ('=' + $elm$url$Url$percentEncode(value));
		},
		A2(
			$elm$core$List$filter,
			function (_v0) {
				var value = _v0.b;
				return $elm$core$String$trim(value) !== '';
			},
			_List_fromArray(
				[
					_Utils_Tuple2('name', req.ca),
					_Utils_Tuple2('type', req.aB),
					_Utils_Tuple2('tag', req.cG),
					_Utils_Tuple2('author', req.bv),
					_Utils_Tuple2('q', req.bp)
				])));
	var pageParam = 'page=' + $elm$core$String$fromInt(req.ch);
	var limitParam = 'limit=' + $elm$core$String$fromInt(req.bZ);
	var queryString = A2(
		$elm$core$String$join,
		'&',
		A2(
			$elm$core$List$cons,
			limitParam,
			A2($elm$core$List$cons, pageParam, queryParams)));
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$BrowseAssetsReceived, $author$project$Api$Rest$assetListResolver),
			ae: $author$project$Api$Rest$authHeaders(req.h),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets?' + queryString)
		});
};
var $author$project$Api$getBrowseAssets = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$getBrowseAssets(req);
		} else {
			return $author$project$Api$GraphQL$getBrowseAssets(req);
		}
	});
var $author$project$Event$DashboardAnalyticsReceived = function (a) {
	return {$: 35, a: a};
};
var $author$project$Model$Asset$AssetAnalytics = F3(
	function (assetType, totalDownloads, assetsCount) {
		return {aB: assetType, bu: assetsCount, cI: totalDownloads};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Api$Rest$analyticsDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Model$Asset$AssetAnalytics,
	A2($elm$json$Json$Decode$field, 'assetType', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'totalDownloads', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'assetsCount', $elm$json$Json$Decode$int));
var $author$project$Api$GraphQL$getDownloadAnalytics = function (req) {
	var query = 'query { downloadAnalytics { analytics { assetType totalDownloads assetsCount } } }';
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['downloadAnalytics', 'analytics']),
			$elm$json$Json$Decode$list($author$project$Api$Rest$analyticsDecoder)),
		$author$project$Event$DashboardAnalyticsReceived);
};
var $author$project$Api$Rest$analyticsResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Failed to load analytics'));
			}
		default:
			var body = response.b;
			var _v2 = A2(
				$elm$json$Json$Decode$decodeString,
				A2(
					$elm$json$Json$Decode$field,
					'analytics',
					$elm$json$Json$Decode$list($author$project$Api$Rest$analyticsDecoder)),
				body);
			if (!_v2.$) {
				var analytics = _v2.a;
				return $elm$core$Result$Ok(analytics);
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Unexpected response from server'));
			}
	}
};
var $author$project$Api$Rest$getDownloadAnalytics = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardAnalyticsReceived, $author$project$Api$Rest$analyticsResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/assets/analytics/downloads'
		});
};
var $author$project$Api$getDownloadAnalytics = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$getDownloadAnalytics(req);
		} else {
			return $author$project$Api$GraphQL$getDownloadAnalytics(req);
		}
	});
var $author$project$Event$DashboardFavoriteAssetsReceived = function (a) {
	return {$: 34, a: a};
};
var $author$project$Api$GraphQL$getFavoriteAssets = function (req) {
	var query = 'query { listAssets' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$boolArg, 'mine', false),
				A2($author$project$Api$GraphQL$boolArg, 'favorites', req.aK)
			])) + ' { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		req.h,
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['listAssets', 'assets']),
			$elm$json$Json$Decode$list($author$project$Api$Rest$assetDecoder)),
		$author$project$Event$DashboardFavoriteAssetsReceived);
};
var $author$project$Api$Rest$getFavoriteAssets = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardFavoriteAssetsReceived, $author$project$Api$Rest$assetListResolver),
			ae: $author$project$Api$Rest$authHeaders(req.h),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets?mine=false&favorites=' + $author$project$Api$Rest$boolToQuery(req.aK))
		});
};
var $author$project$Api$getFavoriteAssets = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$getFavoriteAssets(req);
		} else {
			return $author$project$Api$GraphQL$getFavoriteAssets(req);
		}
	});
var $author$project$Event$HomeLatestAssetsReceived = function (a) {
	return {$: 13, a: a};
};
var $author$project$Api$GraphQL$getLatestAssets = function (token) {
	var query = 'query { latestAssets(limit: 12) { assets { id ownerId authorName assetType description tags fileName fileUrl thumbnailUrl favoriteCount downloadCount isFavorite } } }';
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		token,
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['latestAssets', 'assets']),
			$elm$json$Json$Decode$list($author$project$Api$Rest$assetDecoder)),
		$author$project$Event$HomeLatestAssetsReceived);
};
var $author$project$Api$Rest$getLatestAssets = function (token) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$HomeLatestAssetsReceived, $author$project$Api$Rest$assetListResolver),
			ae: $author$project$Api$Rest$authHeaders(token),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/assets?limit=12'
		});
};
var $author$project$Api$getLatestAssets = F2(
	function (backend, token) {
		if (!backend) {
			return $author$project$Api$Rest$getLatestAssets(token);
		} else {
			return $author$project$Api$GraphQL$getLatestAssets(token);
		}
	});
var $author$project$Event$MeResponseReceived = function (a) {
	return {$: 32, a: a};
};
var $author$project$Model$AccountStatus$UserData = F5(
	function (username, email, token, confirmed, role) {
		return {bA: confirmed, bM: email, cs: role, h: token, ax: username};
	});
var $author$project$Api$GraphQL$userDecoder = A2(
	$author$project$Api$Rest$andMap,
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$field, 'role', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed('user')
			])),
	A2(
		$author$project$Api$Rest$andMap,
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2($elm$json$Json$Decode$field, 'confirmed', $elm$json$Json$Decode$bool),
					$elm$json$Json$Decode$succeed(false)
				])),
		A2(
			$author$project$Api$Rest$andMap,
			$elm$json$Json$Decode$succeed(''),
			A2(
				$author$project$Api$Rest$andMap,
				A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
				A2(
					$author$project$Api$Rest$andMap,
					A2($elm$json$Json$Decode$field, 'username', $elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$Model$AccountStatus$UserData))))));
var $author$project$Api$GraphQL$getMe = function (token) {
	var query = 'query { me { user { username email confirmed role } } }';
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(token),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['me', 'user']),
			$author$project$Api$GraphQL$userDecoder),
		$author$project$Event$MeResponseReceived);
};
var $author$project$Api$Rest$meSuccessDecoder = A2(
	$author$project$Api$Rest$andMap,
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['user', 'role']),
				$elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed('user')
			])),
	A2(
		$author$project$Api$Rest$andMap,
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['user', 'confirmed']),
					$elm$json$Json$Decode$bool),
					$elm$json$Json$Decode$succeed(false)
				])),
		A2(
			$author$project$Api$Rest$andMap,
			$elm$json$Json$Decode$succeed(''),
			A2(
				$author$project$Api$Rest$andMap,
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['user', 'email']),
					$elm$json$Json$Decode$string),
				A2(
					$author$project$Api$Rest$andMap,
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['user', 'username']),
						$elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$Model$AccountStatus$UserData))))));
var $author$project$Api$Rest$meResponseResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Failed to refresh user'));
			}
		default:
			var body = response.b;
			var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$meSuccessDecoder, body);
			if (!_v2.$) {
				var userData = _v2.a;
				return $elm$core$Result$Ok(userData);
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Unexpected response from server'));
			}
	}
};
var $author$project$Api$Rest$getMe = function (token) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$MeResponseReceived, $author$project$Api$Rest$meResponseResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(token)),
			ah: 'GET',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/auth/me'
		});
};
var $author$project$Api$getMe = F2(
	function (backend, token) {
		if (!backend) {
			return $author$project$Api$Rest$getMe(token);
		} else {
			return $author$project$Api$GraphQL$getMe(token);
		}
	});
var $author$project$Update$getQueryParam = F2(
	function (key, maybeQuery) {
		if (maybeQuery.$ === 1) {
			return '';
		} else {
			var query = maybeQuery.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$elm$core$List$head(
					A2(
						$elm$core$List$filterMap,
						function (part) {
							var _v1 = A2($elm$core$String$split, '=', part);
							_v1$2:
							while (true) {
								if (_v1.b) {
									if (_v1.b.b) {
										if (!_v1.b.b.b) {
											var currentKey = _v1.a;
											var _v2 = _v1.b;
											var rawValue = _v2.a;
											return _Utils_eq(currentKey, key) ? $elm$url$Url$percentDecode(rawValue) : $elm$core$Maybe$Nothing;
										} else {
											break _v1$2;
										}
									} else {
										var currentKey = _v1.a;
										return _Utils_eq(currentKey, key) ? $elm$core$Maybe$Just('') : $elm$core$Maybe$Nothing;
									}
								} else {
									break _v1$2;
								}
							}
							return $elm$core$Maybe$Nothing;
						},
						A2($elm$core$String$split, '&', query))));
		}
	});
var $author$project$Update$httpErrorToMessage = function (err) {
	switch (err.$) {
		case 0:
			return 'Invalid request URL';
		case 1:
			return 'Request timed out';
		case 2:
			return 'Network error, check if backend is running';
		case 3:
			var status = err.a;
			return (status === 409) ? 'Username or email already exists' : 'Request failed';
		default:
			var message = err.a;
			return ($elm$core$String$trim(message) === '') ? 'Unexpected response from server' : message;
	}
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$Update$loadRouteData = function (model) {
	var _v0 = model.ct;
	switch (_v0.$) {
		case 0:
			return A2(
				$elm$core$Task$perform,
				$elm$core$Basics$identity,
				$elm$core$Task$succeed($author$project$Event$LoadHomeData));
		case 1:
			return A2(
				$elm$core$Task$perform,
				$elm$core$Basics$identity,
				$elm$core$Task$succeed($author$project$Event$LoadBrowseData));
		case 6:
			var _v1 = model.S;
			if (_v1.$ === 1) {
				return A2(
					$elm$core$Task$perform,
					$elm$core$Basics$identity,
					$elm$core$Task$succeed($author$project$Event$LoadDashboardData));
			} else {
				return $elm$core$Platform$Cmd$none;
			}
		case 7:
			var assetId = _v0.a;
			var _v2 = model.S;
			if (_v2.$ === 1) {
				var userData = _v2.a;
				return A2(
					$author$project$Api$getAssetById,
					model.aE,
					{
						G: assetId,
						h: $elm$core$Maybe$Just(userData.h)
					});
			} else {
				return A2(
					$author$project$Api$getAssetById,
					model.aE,
					{G: assetId, h: $elm$core$Maybe$Nothing});
			}
		default:
			return $elm$core$Platform$Cmd$none;
	}
};
var $author$project$Event$LoginResponseReceived = function (a) {
	return {$: 4, a: a};
};
var $author$project$Api$GraphQL$authPayloadDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (token, user) {
			return _Utils_update(
				user,
				{h: token});
		}),
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'user', $author$project$Api$GraphQL$userDecoder));
var $author$project$Api$GraphQL$login = function (req) {
	var query = 'mutation { login' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'username', req.ax),
				A2($author$project$Api$GraphQL$strArg, 'password', req.Y),
				A2($author$project$Api$GraphQL$boolArg, 'saveSession', req.a6)
			])) + ' { token user { username email confirmed role } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Nothing,
		query,
		A2($elm$json$Json$Decode$field, 'login', $author$project$Api$GraphQL$authPayloadDecoder),
		$author$project$Event$LoginResponseReceived);
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$Api$Rest$loginEncoder = function (req) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'username',
				$elm$json$Json$Encode$string(req.ax)),
				_Utils_Tuple2(
				'password',
				$elm$json$Json$Encode$string(req.Y)),
				_Utils_Tuple2(
				'saveSession',
				$elm$json$Json$Encode$bool(req.a6))
			]));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{ab: r.ab, ad: r.ad, ae: _List_Nil, ah: 'POST', at: $elm$core$Maybe$Nothing, av: $elm$core$Maybe$Nothing, aw: r.aw});
};
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Api$Rest$retrieveUserSuccessDecoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Model$AccountStatus$UserData,
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['user', 'username']),
		$elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['user', 'email']),
		$elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['user', 'confirmed']),
				$elm$json$Json$Decode$bool),
				$elm$json$Json$Decode$succeed(false)
			])),
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['user', 'role']),
				$elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed('user')
			])));
var $author$project$Api$Rest$retrieveUserResponseResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var metadata = response.a;
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return (metadata.cA === 409) ? $elm$core$Result$Err(
					$elm$http$Http$BadBody('Username or email already exists')) : $elm$core$Result$Err(
					$elm$http$Http$BadBody('Registration failed'));
			}
		default:
			var body = response.b;
			var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$retrieveUserSuccessDecoder, body);
			if (!_v2.$) {
				var userData = _v2.a;
				return $elm$core$Result$Ok(userData);
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Unexpected response from server'));
			}
	}
};
var $author$project$Api$Rest$login = function (req) {
	return $elm$http$Http$post(
		{
			ab: $elm$http$Http$jsonBody(
				$author$project$Api$Rest$loginEncoder(req)),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$LoginResponseReceived, $author$project$Api$Rest$retrieveUserResponseResolver),
			aw: $author$project$Api$Config$backendUrl + '/auth/login'
		});
};
var $author$project$Api$login = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$login(req);
		} else {
			return $author$project$Api$GraphQL$login(req);
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Model$Page$DashboardModel$isNewPasswordValid = function (password) {
	return $elm$core$String$length(
		$elm$core$String$trim(password)) >= 6;
};
var $author$project$Model$Page$DashboardModel$passwordChangeValid = F2(
	function (currentPassword, newPassword) {
		return $author$project$Model$Page$DashboardModel$isPasswordFieldValid(currentPassword) && $author$project$Model$Page$DashboardModel$isNewPasswordValid(newPassword);
	});
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Event$RegisterResponseReceived = function (a) {
	return {$: 7, a: a};
};
var $author$project$Api$GraphQL$register = function (req) {
	var query = 'mutation { register' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'username', req.ax),
				A2($author$project$Api$GraphQL$strArg, 'email', req.bM),
				A2($author$project$Api$GraphQL$strArg, 'password', req.Y),
				A2($author$project$Api$GraphQL$boolArg, 'saveSession', req.a6)
			])) + ' { token user { username email confirmed role } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Nothing,
		query,
		A2($elm$json$Json$Decode$field, 'register', $author$project$Api$GraphQL$authPayloadDecoder),
		$author$project$Event$RegisterResponseReceived);
};
var $author$project$Api$Rest$registerEncoder = function (req) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'username',
				$elm$json$Json$Encode$string(req.ax)),
				_Utils_Tuple2(
				'email',
				$elm$json$Json$Encode$string(req.bM)),
				_Utils_Tuple2(
				'password',
				$elm$json$Json$Encode$string(req.Y)),
				_Utils_Tuple2(
				'saveSession',
				$elm$json$Json$Encode$bool(req.a6))
			]));
};
var $author$project$Api$Rest$register = function (req) {
	return $elm$http$Http$post(
		{
			ab: $elm$http$Http$jsonBody(
				$author$project$Api$Rest$registerEncoder(req)),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$RegisterResponseReceived, $author$project$Api$Rest$retrieveUserResponseResolver),
			aw: $author$project$Api$Config$backendUrl + '/auth/register'
		});
};
var $author$project$Api$register = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$register(req);
		} else {
			return $author$project$Api$GraphQL$register(req);
		}
	});
var $author$project$Event$AssetReportResponseReceived = function (a) {
	return {$: 64, a: a};
};
var $author$project$Api$GraphQL$reportAsset = function (req) {
	var query = 'mutation { reportAsset' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'id', req.G),
				A2($author$project$Api$GraphQL$strArg, 'reason', req.cm)
			])) + ' { message } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['reportAsset', 'message']),
			$elm$json$Json$Decode$string),
		$author$project$Event$AssetReportResponseReceived);
};
var $author$project$Api$Rest$reportAsset = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$jsonBody(
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'reason',
							$elm$json$Json$Encode$string(req.cm))
						]))),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$AssetReportResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'POST',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets/' + (req.G + '/report'))
		});
};
var $author$project$Api$reportAsset = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$reportAsset(req);
		} else {
			return $author$project$Api$GraphQL$reportAsset(req);
		}
	});
var $author$project$Api$Ports$saveBackend = _Platform_outgoingPort('saveBackend', $elm$json$Json$Encode$string);
var $author$project$Api$Ports$saveUserData = _Platform_outgoingPort(
	'saveUserData',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'confirmed',
					$elm$json$Json$Encode$bool($.bA)),
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string($.bM)),
					_Utils_Tuple2(
					'role',
					$elm$json$Json$Encode$string($.cs)),
					_Utils_Tuple2(
					'token',
					$elm$json$Json$Encode$string($.h)),
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string($.ax))
				]));
	});
var $author$project$Update$shouldRedirectAnonymous = F2(
	function (accountStatus, route) {
		if (!accountStatus.$) {
			if (route.$ === 6) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	});
var $author$project$Update$shouldRedirectAuthenticated = F2(
	function (accountStatus, route) {
		if (accountStatus.$ === 1) {
			switch (route.$) {
				case 3:
					return true;
				case 4:
					return true;
				default:
					return false;
			}
		} else {
			return false;
		}
	});
var $author$project$Model$Page$DashboardModel$tagsToString = function (tags) {
	return A2($elm$core$String$join, ', ', tags);
};
var $author$project$Api$Backend$toString = function (backend) {
	if (!backend) {
		return 'rest';
	} else {
		return 'graphql';
	}
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.a1;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.aM,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.ck,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.a_,
					_Utils_ap(http, url.aO)),
				url.cj)));
};
var $author$project$Event$AssetFavoriteResponseReceived = function (a) {
	return {$: 61, a: a};
};
var $author$project$Api$GraphQL$toggleFavoriteAsset = function (req) {
	var operation = req.bY ? 'unfavoriteAsset' : 'favoriteAsset';
	var query = 'mutation { ' + (operation + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'id', req.G)
			])) + ' { message } }'));
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				[operation, 'message']),
			$elm$json$Json$Decode$string),
		$author$project$Event$AssetFavoriteResponseReceived);
};
var $author$project$Api$Rest$toggleFavoriteAsset = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$emptyBody,
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$AssetFavoriteResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: req.bY ? 'DELETE' : 'POST',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets/' + (req.G + '/favorite'))
		});
};
var $author$project$Api$toggleFavoriteAsset = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$toggleFavoriteAsset(req);
		} else {
			return $author$project$Api$GraphQL$toggleFavoriteAsset(req);
		}
	});
var $author$project$Event$DashboardSettingsPasswordResponseReceived = function (a) {
	return {$: 52, a: a};
};
var $author$project$Api$GraphQL$updateAccountPassword = function (req) {
	var query = 'mutation { updatePassword' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'currentPassword', req.bB),
				A2($author$project$Api$GraphQL$strArg, 'newPassword', req.cb)
			])) + ' { message } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['updatePassword', 'message']),
			$elm$json$Json$Decode$string),
		$author$project$Event$DashboardSettingsPasswordResponseReceived);
};
var $author$project$Api$Rest$updateAccountPassword = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$jsonBody(
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'currentPassword',
							$elm$json$Json$Encode$string(req.bB)),
							_Utils_Tuple2(
							'newPassword',
							$elm$json$Json$Encode$string(req.cb))
						]))),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardSettingsPasswordResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'PATCH',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/auth/password'
		});
};
var $author$project$Api$updateAccountPassword = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$updateAccountPassword(req);
		} else {
			return $author$project$Api$GraphQL$updateAccountPassword(req);
		}
	});
var $author$project$Event$DashboardSettingsUsernameResponseReceived = function (a) {
	return {$: 48, a: a};
};
var $author$project$Api$GraphQL$updateAccountUsername = function (req) {
	var query = 'mutation { updateUsername' + ($author$project$Api$GraphQL$joinArgs(
		_List_fromArray(
			[
				A2($author$project$Api$GraphQL$strArg, 'username', req.ax),
				A2($author$project$Api$GraphQL$strArg, 'password', req.Y)
			])) + ' { user { username email confirmed role } } }');
	return A4(
		$author$project$Api$GraphQL$graphqlRequest,
		$elm$core$Maybe$Just(req.h),
		query,
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['updateUsername', 'user']),
			$author$project$Api$GraphQL$userDecoder),
		$author$project$Event$DashboardSettingsUsernameResponseReceived);
};
var $author$project$Api$Rest$updateAccountUsername = function (req) {
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$jsonBody(
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'username',
							$elm$json$Json$Encode$string(req.ax)),
							_Utils_Tuple2(
							'password',
							$elm$json$Json$Encode$string(req.Y))
						]))),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardSettingsUsernameResponseReceived, $author$project$Api$Rest$meResponseResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'PATCH',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/auth/username'
		});
};
var $author$project$Api$updateAccountUsername = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$updateAccountUsername(req);
		} else {
			return $author$project$Api$GraphQL$updateAccountUsername(req);
		}
	});
var $author$project$Event$DashboardEditResponseReceived = function (a) {
	return {$: 42, a: a};
};
var $elm$http$Http$filePart = _Http_pair;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$http$Http$multipartBody = function (parts) {
	return A2(
		_Http_pair,
		'',
		_Http_toFormData(parts));
};
var $elm$http$Http$stringPart = _Http_pair;
var $author$project$Api$GraphQL$updateAsset = function (req) {
	var _v0 = req.cH;
	if (!_v0.$) {
		var thumbnail = _v0.a;
		var operationsJson = A2(
			$elm$json$Json$Encode$encode,
			0,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'query',
						$elm$json$Json$Encode$string('mutation($id: ID!, $description: String!, $tags: String, $thumbnailFile: Upload) { updateAsset(id: $id, description: $description, tags: $tags, thumbnailFile: $thumbnailFile) { message } }')),
						_Utils_Tuple2(
						'variables',
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'id',
									$elm$json$Json$Encode$string(req.G)),
									_Utils_Tuple2(
									'description',
									$elm$json$Json$Encode$string(req.ac)),
									_Utils_Tuple2(
									'tags',
									$elm$json$Json$Encode$string(req.as)),
									_Utils_Tuple2('thumbnailFile', $elm$json$Json$Encode$null)
								])))
					])));
		var mapJson = A2(
			$elm$json$Json$Encode$encode,
			0,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'0',
						A2(
							$elm$json$Json$Encode$list,
							$elm$json$Json$Encode$string,
							_List_fromArray(
								['variables.thumbnailFile'])))
					])));
		var parts = _List_fromArray(
			[
				A2($elm$http$Http$stringPart, 'operations', operationsJson),
				A2($elm$http$Http$stringPart, 'map', mapJson),
				A2($elm$http$Http$filePart, '0', thumbnail)
			]);
		return $elm$http$Http$request(
			{
				ab: $elm$http$Http$multipartBody(parts),
				ad: A2(
					$elm$http$Http$expectStringResponse,
					$author$project$Event$DashboardEditResponseReceived,
					$author$project$Api$GraphQL$graphqlResolver(
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['updateAsset', 'message']),
							$elm$json$Json$Decode$string))),
				ae: _List_fromArray(
					[
						A2($elm$http$Http$header, 'Authorization', 'Bearer ' + req.h)
					]),
				ah: 'POST',
				at: $elm$core$Maybe$Nothing,
				av: $elm$core$Maybe$Nothing,
				aw: $author$project$Api$Config$graphqlUrl
			});
	} else {
		var query = 'mutation { updateAsset' + ($author$project$Api$GraphQL$joinArgs(
			_List_fromArray(
				[
					A2($author$project$Api$GraphQL$strArg, 'id', req.G),
					A2($author$project$Api$GraphQL$strArg, 'description', req.ac),
					A2($author$project$Api$GraphQL$strArg, 'tags', req.as)
				])) + ' { message } }');
		return A4(
			$author$project$Api$GraphQL$graphqlRequest,
			$elm$core$Maybe$Just(req.h),
			query,
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['updateAsset', 'message']),
				$elm$json$Json$Decode$string),
			$author$project$Event$DashboardEditResponseReceived);
	}
};
var $author$project$Api$Rest$updateAsset = function (req) {
	var parts = _Utils_ap(
		_List_fromArray(
			[
				A2($elm$http$Http$stringPart, 'description', req.ac),
				A2($elm$http$Http$stringPart, 'tags', req.as)
			]),
		function () {
			var _v0 = req.cH;
			if (!_v0.$) {
				var thumbnailFile = _v0.a;
				return _List_fromArray(
					[
						A2($elm$http$Http$filePart, 'thumbnailFile', thumbnailFile)
					]);
			} else {
				return _List_Nil;
			}
		}());
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$multipartBody(parts),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardEditResponseReceived, $author$project$Api$Rest$backendMessageResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'PUT',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + ('/assets/' + req.G)
		});
};
var $author$project$Api$updateAsset = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$updateAsset(req);
		} else {
			return $author$project$Api$GraphQL$updateAsset(req);
		}
	});
var $author$project$Event$DashboardUploadResponseReceived = function (a) {
	return {$: 30, a: a};
};
var $author$project$Api$GraphQL$uploadAsset = function (req) {
	var operationsJson = A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'query',
					$elm$json$Json$Encode$string('mutation($assetType: String!, $description: String!, $tags: String, $assetFile: Upload!, $thumbnailFile: Upload) { uploadAsset(assetType: $assetType, description: $description, tags: $tags, assetFile: $assetFile, thumbnailFile: $thumbnailFile) { message } }')),
					_Utils_Tuple2(
					'variables',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'assetType',
								$elm$json$Json$Encode$string(req.aB)),
								_Utils_Tuple2(
								'description',
								$elm$json$Json$Encode$string(req.ac)),
								_Utils_Tuple2(
								'tags',
								$elm$json$Json$Encode$string(req.as)),
								_Utils_Tuple2('assetFile', $elm$json$Json$Encode$null),
								_Utils_Tuple2('thumbnailFile', $elm$json$Json$Encode$null)
							])))
				])));
	var mapJson = A2(
		$elm$json$Json$Encode$encode,
		0,
		function () {
			var _v1 = req.bg;
			if (!_v1.$) {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'0',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$string,
								_List_fromArray(
									['variables.assetFile']))),
							_Utils_Tuple2(
							'1',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$string,
								_List_fromArray(
									['variables.thumbnailFile'])))
						]));
			} else {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'0',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$string,
								_List_fromArray(
									['variables.assetFile'])))
						]));
			}
		}());
	var parts = _Utils_ap(
		_List_fromArray(
			[
				A2($elm$http$Http$stringPart, 'operations', operationsJson),
				A2($elm$http$Http$stringPart, 'map', mapJson),
				A2($elm$http$Http$filePart, '0', req.bt)
			]),
		function () {
			var _v0 = req.bg;
			if (!_v0.$) {
				var thumbnail = _v0.a;
				return _List_fromArray(
					[
						A2($elm$http$Http$filePart, '1', thumbnail)
					]);
			} else {
				return _List_Nil;
			}
		}());
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$multipartBody(parts),
			ad: A2(
				$elm$http$Http$expectStringResponse,
				$author$project$Event$DashboardUploadResponseReceived,
				$author$project$Api$GraphQL$graphqlResolver(
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['uploadAsset', 'message']),
						$elm$json$Json$Decode$string))),
			ae: _List_fromArray(
				[
					A2($elm$http$Http$header, 'Authorization', 'Bearer ' + req.h)
				]),
			ah: 'POST',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$graphqlUrl
		});
};
var $author$project$Api$Rest$uploadAssetResponseResolver = function (response) {
	switch (response.$) {
		case 0:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Invalid request URL'));
		case 1:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Request timed out'));
		case 2:
			return $elm$core$Result$Err(
				$elm$http$Http$BadBody('Network error, check if backend is running'));
		case 3:
			var body = response.b;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendErrorDecoder, body);
			if (!_v1.$) {
				var message = _v1.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody(message));
			} else {
				return $elm$core$Result$Err(
					$elm$http$Http$BadBody('Upload failed'));
			}
		default:
			var body = response.b;
			var _v2 = A2($elm$json$Json$Decode$decodeString, $author$project$Api$Rest$backendMessageDecoder, body);
			if (!_v2.$) {
				var message = _v2.a;
				return $elm$core$Result$Ok(message);
			} else {
				return $elm$core$Result$Ok('Asset uploaded successfully');
			}
	}
};
var $author$project$Api$Rest$uploadAsset = function (req) {
	var parts = _Utils_ap(
		_List_fromArray(
			[
				A2($elm$http$Http$stringPart, 'assetType', req.aB),
				A2($elm$http$Http$stringPart, 'description', req.ac),
				A2($elm$http$Http$stringPart, 'tags', req.as),
				A2($elm$http$Http$filePart, 'assetFile', req.bt)
			]),
		function () {
			var _v0 = req.bg;
			if (!_v0.$) {
				var thumbnailFile = _v0.a;
				return _List_fromArray(
					[
						A2($elm$http$Http$filePart, 'thumbnailFile', thumbnailFile)
					]);
			} else {
				return _List_Nil;
			}
		}());
	return $elm$http$Http$request(
		{
			ab: $elm$http$Http$multipartBody(parts),
			ad: A2($elm$http$Http$expectStringResponse, $author$project$Event$DashboardUploadResponseReceived, $author$project$Api$Rest$uploadAssetResponseResolver),
			ae: $author$project$Api$Rest$authHeaders(
				$elm$core$Maybe$Just(req.h)),
			ah: 'POST',
			at: $elm$core$Maybe$Nothing,
			av: $elm$core$Maybe$Nothing,
			aw: $author$project$Api$Config$backendUrl + '/assets/upload'
		});
};
var $author$project$Api$uploadAsset = F2(
	function (backend, req) {
		if (!backend) {
			return $author$project$Api$Rest$uploadAsset(req);
		} else {
			return $author$project$Api$GraphQL$uploadAsset(req);
		}
	});
var $author$project$Model$Page$DashboardModel$usernameMaxLength = 32;
var $author$project$Model$Page$DashboardModel$usernameMinLength = 3;
var $author$project$Model$Page$DashboardModel$isUsernameValid = function (username) {
	var trimmed = $elm$core$String$trim(username);
	var len = $elm$core$String$length(trimmed);
	return (_Utils_cmp(len, $author$project$Model$Page$DashboardModel$usernameMinLength) > -1) && (_Utils_cmp(len, $author$project$Model$Page$DashboardModel$usernameMaxLength) < 1);
};
var $author$project$Model$Page$DashboardModel$usernameChangeValid = F2(
	function (username, confPassword) {
		return $author$project$Model$Page$DashboardModel$isUsernameValid(username) && $author$project$Model$Page$DashboardModel$isPasswordFieldValid(confPassword);
	});
var $author$project$Model$Page$LoginModel$PasswordError = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$Page$LoginModel$UsernameError = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Page$LoginModel$errorInList = F3(
	function (field, maybeError, errors) {
		var filteredErrors = A2(
			$elm$core$List$filter,
			function (e) {
				var _v1 = _Utils_Tuple2(field, e);
				_v1$2:
				while (true) {
					if (!_v1.a) {
						if (!_v1.b.$) {
							var _v2 = _v1.a;
							return false;
						} else {
							break _v1$2;
						}
					} else {
						if (_v1.b.$ === 1) {
							var _v3 = _v1.a;
							return false;
						} else {
							break _v1$2;
						}
					}
				}
				return true;
			},
			errors);
		if (!maybeError.$) {
			var err = maybeError.a;
			return A2($elm$core$List$cons, err, filteredErrors);
		} else {
			return filteredErrors;
		}
	});
var $author$project$Model$Page$LoginModel$validateField = F2(
	function (field, model) {
		if (!field) {
			var error = (model.ax === '') ? $elm$core$Maybe$Just(
				$author$project$Model$Page$LoginModel$UsernameError('Username cannot be empty')) : $elm$core$Maybe$Nothing;
			return _Utils_update(
				model,
				{
					aI: A3($author$project$Model$Page$LoginModel$errorInList, 0, error, model.aI)
				});
		} else {
			var error = (model.Y === '') ? $elm$core$Maybe$Just(
				$author$project$Model$Page$LoginModel$PasswordError('Password cannot be empty')) : $elm$core$Maybe$Nothing;
			return _Utils_update(
				model,
				{
					aI: A3($author$project$Model$Page$LoginModel$errorInList, 1, error, model.aI)
				});
		}
	});
var $author$project$Model$Page$RegisterModel$EmailError = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$Page$RegisterModel$PasswordAgainError = function (a) {
	return {$: 3, a: a};
};
var $author$project$Model$Page$RegisterModel$PasswordError = function (a) {
	return {$: 2, a: a};
};
var $author$project$Model$Page$RegisterModel$UsernameError = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Page$RegisterModel$errorInList = F3(
	function (field, maybeError, errors) {
		var filteredErrors = A2(
			$elm$core$List$filter,
			function (e) {
				var _v1 = _Utils_Tuple2(field, e);
				_v1$4:
				while (true) {
					switch (_v1.a) {
						case 0:
							if (!_v1.b.$) {
								var _v2 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						case 1:
							if (_v1.b.$ === 1) {
								var _v3 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						case 2:
							if (_v1.b.$ === 2) {
								var _v4 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						default:
							if (_v1.b.$ === 3) {
								var _v5 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
					}
				}
				return true;
			},
			errors);
		if (!maybeError.$) {
			var err = maybeError.a;
			return A2($elm$core$List$cons, err, filteredErrors);
		} else {
			return filteredErrors;
		}
	});
var $author$project$Model$Page$RegisterModel$validateField = F2(
	function (field, model) {
		switch (field) {
			case 0:
				var error = (model.ax === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$UsernameError('Username cannot be empty')) : (($elm$core$String$length(model.ax) < 3) ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$UsernameError('Username must be at least 3 characters long')) : $elm$core$Maybe$Nothing);
				return _Utils_update(
					model,
					{
						aI: A3($author$project$Model$Page$RegisterModel$errorInList, 0, error, model.aI)
					});
			case 1:
				var error = (model.bM === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$EmailError('Email cannot be empty')) : ((!A2($elm$core$String$contains, '@', model.bM)) ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$EmailError('This field must be a valid email')) : $elm$core$Maybe$Nothing);
				return _Utils_update(
					model,
					{
						aI: A3($author$project$Model$Page$RegisterModel$errorInList, 1, error, model.aI)
					});
			case 2:
				var error = (model.Y === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$PasswordError('Password cannot be empty')) : (($elm$core$String$length(model.Y) < 6) ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$PasswordError('Password must be at least 6 characters long')) : $elm$core$Maybe$Nothing);
				return _Utils_update(
					model,
					{
						aI: A3($author$project$Model$Page$RegisterModel$errorInList, 2, error, model.aI)
					});
			default:
				var error = (model.ci === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$PasswordAgainError('Please confirm your password')) : ((!_Utils_eq(model.ci, model.Y)) ? $elm$core$Maybe$Just(
					$author$project$Model$Page$RegisterModel$PasswordAgainError('Passwords do not match')) : $elm$core$Maybe$Nothing);
				return _Utils_update(
					model,
					{
						aI: A3($author$project$Model$Page$RegisterModel$errorInList, 3, error, model.aI)
					});
		}
	});
var $author$project$Model$Page$DashboardModel$AssetFileError = function (a) {
	return {$: 1, a: a};
};
var $author$project$Model$Page$DashboardModel$AssetTypeError = function (a) {
	return {$: 0, a: a};
};
var $author$project$Model$Page$DashboardModel$DescriptionError = function (a) {
	return {$: 2, a: a};
};
var $author$project$Model$Page$DashboardModel$ThumbnailFileError = function (a) {
	return {$: 3, a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Model$Page$DashboardModel$assetTypeErrorMessage = function (assetType) {
	switch (assetType) {
		case 'Model':
			return 'Model supports .gltf, .glb, .obj, .zip';
		case 'Texture':
			return 'Texture supports image files and .zip';
		case 'Audio':
			return 'Audio must be an audio file';
		case 'Script':
			return 'Script supports .js, .ts, .lua, .py, .cs, .json, .zip';
		case 'Scene':
			return 'Scene supports .xsc, .zip, .rar, .7z';
		default:
			return 'Unsupported file type for selected asset type';
	}
};
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$file$File$mime = _File_mime;
var $author$project$Model$Page$DashboardModel$isAudio = function (file) {
	return A2(
		$elm$core$String$startsWith,
		'audio/',
		$elm$file$File$mime(file));
};
var $author$project$Model$Page$DashboardModel$isImage = function (file) {
	return A2(
		$elm$core$String$startsWith,
		'image/',
		$elm$file$File$mime(file));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$String$endsWith = _String_endsWith;
var $elm$file$File$name = _File_name;
var $elm$core$String$toLower = _String_toLower;
var $author$project$Model$Page$DashboardModel$isZip = function (file) {
	var name = $elm$core$String$toLower(
		$elm$file$File$name(file));
	var mime = $elm$file$File$mime(file);
	return A2(
		$elm$core$List$any,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				mime === 'application/zip',
				mime === 'application/x-zip-compressed',
				A2($elm$core$String$endsWith, '.zip', name)
			]));
};
var $author$project$Model$Page$DashboardModel$isModel = function (file) {
	var name = $elm$core$String$toLower(
		$elm$file$File$name(file));
	var mime = $elm$file$File$mime(file);
	return A2(
		$elm$core$List$any,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				$author$project$Model$Page$DashboardModel$isZip(file),
				mime === 'model/gltf+json',
				mime === 'model/gltf-binary',
				A2($elm$core$String$endsWith, '.gltf', name),
				A2($elm$core$String$endsWith, '.glb', name),
				A2($elm$core$String$endsWith, '.obj', name)
			]));
};
var $author$project$Model$Page$DashboardModel$isScene = function (file) {
	var name = $elm$core$String$toLower(
		$elm$file$File$name(file));
	return A2(
		$elm$core$List$any,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				A2($elm$core$String$endsWith, '.xsc', name),
				A2($elm$core$String$endsWith, '.zip', name),
				A2($elm$core$String$endsWith, '.rar', name),
				A2($elm$core$String$endsWith, '.7z', name)
			]));
};
var $author$project$Model$Page$DashboardModel$isScript = function (file) {
	var name = $elm$core$String$toLower(
		$elm$file$File$name(file));
	var mime = $elm$file$File$mime(file);
	return A2(
		$elm$core$List$any,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				mime === 'text/plain',
				mime === 'application/javascript',
				mime === 'text/javascript',
				mime === 'application/json',
				A2($elm$core$String$endsWith, '.js', name),
				A2($elm$core$String$endsWith, '.ts', name),
				A2($elm$core$String$endsWith, '.lua', name),
				A2($elm$core$String$endsWith, '.py', name),
				A2($elm$core$String$endsWith, '.cs', name),
				A2($elm$core$String$endsWith, '.json', name)
			]));
};
var $author$project$Model$Page$DashboardModel$isAssetFileValidForType = F2(
	function (assetType, file) {
		switch (assetType) {
			case 'Model':
				return $author$project$Model$Page$DashboardModel$isModel(file);
			case 'Texture':
				return $author$project$Model$Page$DashboardModel$isImage(file) || $author$project$Model$Page$DashboardModel$isZip(file);
			case 'Audio':
				return $author$project$Model$Page$DashboardModel$isAudio(file);
			case 'Script':
				return $author$project$Model$Page$DashboardModel$isScript(file) || $author$project$Model$Page$DashboardModel$isZip(file);
			case 'Scene':
				return $author$project$Model$Page$DashboardModel$isScene(file);
			default:
				return true;
		}
	});
var $elm$file$File$size = _File_size;
var $author$project$Model$Page$DashboardModel$uploadErrorInList = F3(
	function (field, maybeError, errors) {
		var filteredErrors = A2(
			$elm$core$List$filter,
			function (e) {
				var _v1 = _Utils_Tuple2(field, e);
				_v1$4:
				while (true) {
					switch (_v1.a) {
						case 0:
							if (!_v1.b.$) {
								var _v2 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						case 1:
							if (_v1.b.$ === 1) {
								var _v3 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						case 2:
							if (_v1.b.$ === 2) {
								var _v4 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
						default:
							if (_v1.b.$ === 3) {
								var _v5 = _v1.a;
								return false;
							} else {
								break _v1$4;
							}
					}
				}
				return true;
			},
			errors);
		if (!maybeError.$) {
			var err = maybeError.a;
			return A2($elm$core$List$cons, err, filteredErrors);
		} else {
			return filteredErrors;
		}
	});
var $author$project$Model$Page$DashboardModel$validateUploadField = F2(
	function (field, model) {
		switch (field) {
			case 0:
				var error = ($elm$core$String$trim(model.aB) === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$DashboardModel$AssetTypeError('Asset type is required')) : $elm$core$Maybe$Nothing;
				return _Utils_update(
					model,
					{
						aa: A3($author$project$Model$Page$DashboardModel$uploadErrorInList, 0, error, model.aa)
					});
			case 1:
				var error = function () {
					var _v1 = model.bt;
					if (!_v1.$) {
						var file = _v1.a;
						return ($elm$file$File$size(file) <= 0) ? $elm$core$Maybe$Just(
							$author$project$Model$Page$DashboardModel$AssetFileError('Asset file is empty')) : (A2($author$project$Model$Page$DashboardModel$isAssetFileValidForType, model.aB, file) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
							$author$project$Model$Page$DashboardModel$AssetFileError(
								$author$project$Model$Page$DashboardModel$assetTypeErrorMessage(model.aB))));
					} else {
						return $elm$core$Maybe$Just(
							$author$project$Model$Page$DashboardModel$AssetFileError('Asset file is required'));
					}
				}();
				return _Utils_update(
					model,
					{
						aa: A3($author$project$Model$Page$DashboardModel$uploadErrorInList, 1, error, model.aa)
					});
			case 2:
				var trimmedDescription = $elm$core$String$trim(model.ac);
				var error = (trimmedDescription === '') ? $elm$core$Maybe$Just(
					$author$project$Model$Page$DashboardModel$DescriptionError('Description is required')) : (($elm$core$String$length(trimmedDescription) < 10) ? $elm$core$Maybe$Just(
					$author$project$Model$Page$DashboardModel$DescriptionError('Description must be at least 10 characters long')) : $elm$core$Maybe$Nothing);
				return _Utils_update(
					model,
					{
						aa: A3($author$project$Model$Page$DashboardModel$uploadErrorInList, 2, error, model.aa)
					});
			default:
				var error = A2(
					$elm$core$Maybe$andThen,
					function (file) {
						return ($elm$file$File$size(file) <= 0) ? $elm$core$Maybe$Just(
							$author$project$Model$Page$DashboardModel$ThumbnailFileError('Thumbnail file is empty')) : ($author$project$Model$Page$DashboardModel$isImage(file) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
							$author$project$Model$Page$DashboardModel$ThumbnailFileError('Thumbnail must be an image')));
					},
					model.bg);
				return _Utils_update(
					model,
					{
						aa: A3($author$project$Model$Page$DashboardModel$uploadErrorInList, 3, error, model.aa)
					});
		}
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 67:
				var url = msg.a;
				var newRoute = $author$project$Model$Route$parseUrl(url);
				var nextPage = function () {
					if (newRoute.$ === 1) {
						var browseModel = $author$project$Model$Page$BrowseModel$empty;
						return $author$project$Model$PageModel$Browse(
							_Utils_update(
								browseModel,
								{
									bp: A2($author$project$Update$getQueryParam, 'q', url.ck)
								}));
					} else {
						return $author$project$Model$PageModel$fromRoute(newRoute);
					}
				}();
				var nextModel = _Utils_update(
					model,
					{ch: nextPage, ct: newRoute});
				return _Utils_Tuple2(
					nextModel,
					A2($author$project$Update$shouldRedirectAuthenticated, model.S, newRoute) ? A2($elm$browser$Browser$Navigation$replaceUrl, model.aP, '/') : (A2($author$project$Update$shouldRedirectAnonymous, model.S, newRoute) ? A2($elm$browser$Browser$Navigation$replaceUrl, model.aP, '/login') : $author$project$Update$loadRouteData(nextModel)));
			case 68:
				var req = msg.a;
				if (req.$ === 1) {
					var href = req.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				} else {
					var url = req.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.aP,
							$elm$url$Url$toString(url)));
				}
			case 0:
				var backend = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aE: backend}),
					$author$project$Api$Ports$saveBackend(
						$author$project$Api$Backend$toString(backend)));
			case 10:
				var _v3 = model.ch;
				if (!_v3.$) {
					var hm = _v3.a;
					var token = function () {
						var _v4 = model.S;
						if (_v4.$ === 1) {
							var userData = _v4.a;
							return $elm$core$Maybe$Just(userData.h);
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Home(
									_Utils_update(
										hm,
										{b3: true, ap: $elm$core$Maybe$Nothing}))
							}),
						A2($author$project$Api$getLatestAssets, model.aE, token));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 11:
				var value = msg.a;
				var _v5 = model.ch;
				if (!_v5.$) {
					var hm = _v5.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Home(
									_Utils_update(
										hm,
										{cl: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 12:
				var _v6 = model.ch;
				if (!_v6.$) {
					var hm = _v6.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.aP,
							'/browse?q=' + $elm$url$Url$percentEncode(hm.cl)));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 13:
				var result = msg.a;
				var _v7 = model.ch;
				if (!_v7.$) {
					var hm = _v7.a;
					if (!result.$) {
						var assets = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Home(
										_Utils_update(
											hm,
											{aQ: assets, b3: false}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Home(
										_Utils_update(
											hm,
											{
												b3: false,
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 14:
				var _v9 = model.ch;
				if (_v9.$ === 1) {
					var bm = _v9.a;
					var token = function () {
						var _v10 = model.S;
						if (_v10.$ === 1) {
							var userData = _v10.a;
							return $elm$core$Maybe$Just(userData.h);
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}();
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{bS: false, b1: true, aS: false, ch: 1, ap: $elm$core$Maybe$Nothing}))
							}),
						A2(
							$author$project$Api$getBrowseAssets,
							model.aE,
							{bp: bm.bp, aB: bm.aB, bv: bm.bv, bZ: bm.aY, ca: bm.ca, ch: 1, cG: bm.cG, h: token}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 15:
				var value = msg.a;
				var _v11 = model.ch;
				if (_v11.$ === 1) {
					var bm = _v11.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{ca: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 16:
				var value = msg.a;
				var _v12 = model.ch;
				if (_v12.$ === 1) {
					var bm = _v12.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{aB: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 17:
				var value = msg.a;
				var _v13 = model.ch;
				if (_v13.$ === 1) {
					var bm = _v13.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{cG: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 18:
				var value = msg.a;
				var _v14 = model.ch;
				if (_v14.$ === 1) {
					var bm = _v14.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{bv: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 19:
				var value = msg.a;
				var _v15 = model.ch;
				if (_v15.$ === 1) {
					var bm = _v15.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Browse(
									_Utils_update(
										bm,
										{bp: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 20:
				var _v16 = model.ch;
				if (_v16.$ === 1) {
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Task$perform,
							$elm$core$Basics$identity,
							$elm$core$Task$succeed($author$project$Event$LoadBrowseData)));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 21:
				var _v17 = model.ch;
				if (_v17.$ === 1) {
					var bm = _v17.a;
					if (bm.b1 || (bm.aS || (!bm.bS))) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var token = function () {
							var _v18 = model.S;
							if (_v18.$ === 1) {
								var userData = _v18.a;
								return $elm$core$Maybe$Just(userData.h);
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}();
						var nextPage = bm.ch + 1;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Browse(
										_Utils_update(
											bm,
											{aS: true, ap: $elm$core$Maybe$Nothing}))
								}),
							A2(
								$author$project$Api$getBrowseAssets,
								model.aE,
								{bp: bm.bp, aB: bm.aB, bv: bm.bv, bZ: bm.aY, ca: bm.ca, ch: nextPage, cG: bm.cG, h: token}));
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 22:
				var result = msg.a;
				var _v19 = model.ch;
				if (_v19.$ === 1) {
					var bm = _v19.a;
					if (!result.$) {
						var assets = result.a;
						return bm.aS ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Browse(
										_Utils_update(
											bm,
											{
												aC: _Utils_ap(bm.aC, assets),
												bS: _Utils_eq(
													$elm$core$List$length(assets),
													bm.aY),
												b1: false,
												aS: false,
												ch: bm.ch + 1
											}))
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Browse(
										_Utils_update(
											bm,
											{
												aC: assets,
												bS: _Utils_eq(
													$elm$core$List$length(assets),
													bm.aY),
												b1: false,
												aS: false,
												ch: 1
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Browse(
										_Utils_update(
											bm,
											{
												b1: false,
												aS: false,
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 31:
				var _v21 = _Utils_Tuple2(model.S, model.ch);
				if ((_v21.a.$ === 1) && (_v21.b.$ === 5)) {
					var userData = _v21.a.a;
					var dbm = _v21.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{b0: $elm$core$Maybe$Nothing, b2: true, aR: true, ba: userData.ax}))
							}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2($author$project$Api$getMe, model.aE, userData.h),
									A2(
									$author$project$Api$getAssets,
									model.aE,
									{
										aK: false,
										b8: true,
										h: $elm$core$Maybe$Just(userData.h)
									}),
									A2(
									$author$project$Api$getFavoriteAssets,
									model.aE,
									{
										aK: true,
										b8: false,
										h: $elm$core$Maybe$Just(userData.h)
									}),
									A2(
									$author$project$Api$getDownloadAnalytics,
									model.aE,
									{h: userData.h})
								])));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 58:
				var assetId = msg.a;
				var token = function () {
					var _v22 = model.S;
					if (_v22.$ === 1) {
						var userData = _v22.a;
						return $elm$core$Maybe$Just(userData.h);
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				var nextModel = _Utils_update(
					model,
					{
						ch: $author$project$Model$PageModel$Asset(
							$author$project$Model$Page$AssetModel$init(assetId))
					});
				return _Utils_Tuple2(
					nextModel,
					A2(
						$author$project$Api$getAssetById,
						model.aE,
						{G: assetId, h: token}));
			case 8:
				var field = msg.a;
				var str = msg.b;
				var _v23 = model.ch;
				if (_v23.$ === 4) {
					var rm = _v23.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Register(
									function () {
										switch (field) {
											case 0:
												return A2(
													$author$project$Model$Page$RegisterModel$validateField,
													0,
													_Utils_update(
														rm,
														{cD: $elm$core$Maybe$Nothing, ax: str}));
											case 1:
												return A2(
													$author$project$Model$Page$RegisterModel$validateField,
													1,
													_Utils_update(
														rm,
														{bM: str, cD: $elm$core$Maybe$Nothing}));
											case 2:
												return A2(
													$author$project$Model$Page$RegisterModel$validateField,
													2,
													_Utils_update(
														rm,
														{Y: str, cD: $elm$core$Maybe$Nothing}));
											default:
												return A2(
													$author$project$Model$Page$RegisterModel$validateField,
													3,
													_Utils_update(
														rm,
														{ci: str, cD: $elm$core$Maybe$Nothing}));
										}
									}())
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 9:
				var val = msg.a;
				var _v25 = model.ch;
				if (_v25.$ === 4) {
					var rm = _v25.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Register(
									_Utils_update(
										rm,
										{a6: val}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 6:
				var registerModel = msg.a;
				var newModel = A2(
					$author$project$Model$Page$RegisterModel$validateField,
					3,
					A2(
						$author$project$Model$Page$RegisterModel$validateField,
						2,
						A2(
							$author$project$Model$Page$RegisterModel$validateField,
							1,
							A2($author$project$Model$Page$RegisterModel$validateField, 0, registerModel))));
				return $elm$core$List$isEmpty(newModel.aI) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ch: $author$project$Model$PageModel$Register(
								_Utils_update(
									newModel,
									{co: true}))
						}),
					A2(
						$author$project$Api$register,
						model.aE,
						{bM: newModel.bM, Y: newModel.Y, a6: newModel.a6, ax: newModel.ax})) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ch: $author$project$Model$PageModel$Register(newModel)
						}),
					$elm$core$Platform$Cmd$none);
			case 7:
				var result = msg.a;
				var _v26 = model.ch;
				if (_v26.$ === 4) {
					var rm = _v26.a;
					if (!result.$) {
						var userData = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									S: $author$project$Model$AccountStatus$LoggedIn(userData),
									ch: $author$project$Model$PageModel$Register(
										_Utils_update(
											rm,
											{
												co: false,
												cD: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(
														userData.bA ? 'Registered successfully' : 'Registered. Please verify your email before uploading assets'))
											}))
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Api$Ports$saveUserData(userData),
										A2($elm$browser$Browser$Navigation$pushUrl, model.aP, '/dashboard')
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Register(
										_Utils_update(
											rm,
											{
												co: false,
												cD: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 2:
				var field = msg.a;
				var str = msg.b;
				var _v28 = model.ch;
				if (_v28.$ === 3) {
					var lm = _v28.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Login(
									function () {
										if (!field) {
											return A2(
												$author$project$Model$Page$LoginModel$validateField,
												0,
												_Utils_update(
													lm,
													{ax: str}));
										} else {
											return A2(
												$author$project$Model$Page$LoginModel$validateField,
												1,
												_Utils_update(
													lm,
													{Y: str}));
										}
									}())
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 3:
				var val = msg.a;
				var _v30 = model.ch;
				if (_v30.$ === 3) {
					var lm = _v30.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Login(
									_Utils_update(
										lm,
										{a6: val}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 1:
				var loginModel = msg.a;
				var newModel = A2(
					$author$project$Model$Page$LoginModel$validateField,
					1,
					A2($author$project$Model$Page$LoginModel$validateField, 0, loginModel));
				return $elm$core$List$isEmpty(newModel.aI) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ch: $author$project$Model$PageModel$Login(
								_Utils_update(
									newModel,
									{b5: true}))
						}),
					A2(
						$author$project$Api$login,
						model.aE,
						{Y: newModel.Y, a6: newModel.a6, ax: newModel.ax})) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ch: $author$project$Model$PageModel$Login(newModel)
						}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var result = msg.a;
				var _v31 = model.ch;
				if (_v31.$ === 3) {
					var lm = _v31.a;
					if (!result.$) {
						var userData = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									S: $author$project$Model$AccountStatus$LoggedIn(userData),
									ch: $author$project$Model$PageModel$Login(
										_Utils_update(
											lm,
											{
												b5: false,
												cD: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success('Logged in successfully'))
											}))
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Api$Ports$saveUserData(userData),
										A2($elm$browser$Browser$Navigation$pushUrl, model.aP, '/dashboard')
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Login(
										_Utils_update(
											lm,
											{
												b5: false,
												cD: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 5:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{S: $author$project$Model$AccountStatus$LoggedOut}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Api$Ports$cleanUserData(0),
								A2($elm$browser$Browser$Navigation$pushUrl, model.aP, '/login')
							])));
			case 23:
				var tab = msg.a;
				var _v33 = model.ch;
				if (_v33.$ === 5) {
					var dbm = _v33.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cF: tab}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 33:
				var result = msg.a;
				var _v34 = model.ch;
				if (_v34.$ === 5) {
					var dbm = _v34.a;
					if (!result.$) {
						var assets = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{aR: false, X: assets}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												b0: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err))),
												aR: false
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 32:
				var result = msg.a;
				var _v36 = _Utils_Tuple2(model.S, result);
				if ((_v36.a.$ === 1) && (!_v36.b.$)) {
					var existing = _v36.a.a;
					var meUser = _v36.b.a;
					var mergedUser = _Utils_update(
						meUser,
						{h: existing.h});
					var nextModel = _Utils_update(
						model,
						{
							S: $author$project$Model$AccountStatus$LoggedIn(mergedUser)
						});
					return _Utils_Tuple2(
						nextModel,
						$author$project$Api$Ports$saveUserData(mergedUser));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 34:
				var result = msg.a;
				var _v37 = model.ch;
				if (_v37.$ === 5) {
					var dbm = _v37.a;
					if (!result.$) {
						var assets = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{W: assets}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 35:
				var result = msg.a;
				var _v39 = model.ch;
				if (_v39.$ === 5) {
					var dbm = _v39.a;
					if (!result.$) {
						var analytics = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{az: analytics, b2: false}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{b2: false}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 24:
				var assetType = msg.a;
				var _v41 = model.ch;
				if (_v41.$ === 5) {
					var dbm = _v41.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									A2(
										$author$project$Model$Page$DashboardModel$validateUploadField,
										0,
										_Utils_update(
											dbm,
											{aB: assetType, cL: $elm$core$Maybe$Nothing})))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 25:
				var description = msg.a;
				var _v42 = model.ch;
				if (_v42.$ === 5) {
					var dbm = _v42.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									A2(
										$author$project$Model$Page$DashboardModel$validateUploadField,
										2,
										_Utils_update(
											dbm,
											{ac: description, cL: $elm$core$Maybe$Nothing})))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 26:
				var tags = msg.a;
				var _v43 = model.ch;
				if (_v43.$ === 5) {
					var dbm = _v43.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{as: tags, cL: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 27:
				var assetFile = msg.a;
				var _v44 = model.ch;
				if (_v44.$ === 5) {
					var dbm = _v44.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									A2(
										$author$project$Model$Page$DashboardModel$validateUploadField,
										1,
										_Utils_update(
											dbm,
											{
												bt: $elm$core$Maybe$Just(assetFile),
												cL: $elm$core$Maybe$Nothing
											})))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 28:
				var thumbnailFile = msg.a;
				var _v45 = model.ch;
				if (_v45.$ === 5) {
					var dbm = _v45.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									A2(
										$author$project$Model$Page$DashboardModel$validateUploadField,
										3,
										_Utils_update(
											dbm,
											{
												bg: $elm$core$Maybe$Just(thumbnailFile),
												cL: $elm$core$Maybe$Nothing
											})))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 29:
				var _v46 = model.ch;
				if (_v46.$ === 5) {
					var dbm = _v46.a;
					var validatedModel = A2(
						$author$project$Model$Page$DashboardModel$validateUploadField,
						2,
						A2(
							$author$project$Model$Page$DashboardModel$validateUploadField,
							3,
							A2(
								$author$project$Model$Page$DashboardModel$validateUploadField,
								1,
								A2($author$project$Model$Page$DashboardModel$validateUploadField, 0, dbm))));
					if ($elm$core$List$isEmpty(validatedModel.aa)) {
						var _v47 = _Utils_Tuple2(model.S, validatedModel.bt);
						if (_v47.a.$ === 1) {
							if (!_v47.b.$) {
								var userData = _v47.a.a;
								var assetFile = _v47.b.a;
								return userData.bA ? _Utils_Tuple2(
									_Utils_update(
										model,
										{
											ch: $author$project$Model$PageModel$Dashboard(
												_Utils_update(
													validatedModel,
													{cK: true}))
										}),
									A2(
										$author$project$Api$uploadAsset,
										model.aE,
										{
											bt: assetFile,
											aB: validatedModel.aB,
											ac: $elm$core$String$trim(validatedModel.ac),
											as: validatedModel.as,
											bg: validatedModel.bg,
											h: userData.h
										})) : _Utils_Tuple2(
									_Utils_update(
										model,
										{
											ch: $author$project$Model$PageModel$Dashboard(
												_Utils_update(
													validatedModel,
													{
														cL: $elm$core$Maybe$Just(
															$author$project$Model$Page$RegisterModel$Error('Confirm your email before uploading'))
													}))
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var _v49 = _v47.b;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											ch: $author$project$Model$PageModel$Dashboard(validatedModel)
										}),
									$elm$core$Platform$Cmd$none);
							}
						} else {
							var _v48 = _v47.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										ch: $author$project$Model$PageModel$Dashboard(
											_Utils_update(
												validatedModel,
												{
													cL: $elm$core$Maybe$Just(
														$author$project$Model$Page$RegisterModel$Error('You must be logged in'))
												}))
									}),
								$elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(validatedModel)
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 30:
				var result = msg.a;
				var _v50 = model.ch;
				if (_v50.$ === 5) {
					var dbm = _v50.a;
					if (!result.$) {
						var message = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												bt: $elm$core$Maybe$Nothing,
												aB: 'Scene',
												ac: '',
												as: '',
												bg: $elm$core$Maybe$Nothing,
												cK: false,
												aa: _List_Nil,
												cL: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(message))
											}))
								}),
							$author$project$Update$loadRouteData(model));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												cK: false,
												cL: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 36:
				var asset = msg.a;
				var _v52 = model.ch;
				if (_v52.$ === 5) {
					var dbm = _v52.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{
											bG: asset.ac,
											bH: $elm$core$Maybe$Nothing,
											bI: $author$project$Model$Page$DashboardModel$tagsToString(asset.as),
											bJ: $elm$core$Maybe$Nothing,
											bK: $elm$core$Maybe$Just(asset)
										}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 37:
				var _v53 = model.ch;
				if (_v53.$ === 5) {
					var dbm = _v53.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{bH: $elm$core$Maybe$Nothing, bK: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 38:
				var value = msg.a;
				var _v54 = model.ch;
				if (_v54.$ === 5) {
					var dbm = _v54.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{
											bH: $elm$core$Maybe$Nothing,
											bJ: $elm$core$Maybe$Just(value)
										}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 39:
				var value = msg.a;
				var _v55 = model.ch;
				if (_v55.$ === 5) {
					var dbm = _v55.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{bG: value, bH: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 40:
				var value = msg.a;
				var _v56 = model.ch;
				if (_v56.$ === 5) {
					var dbm = _v56.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{bH: $elm$core$Maybe$Nothing, bI: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 41:
				var _v57 = _Utils_Tuple2(model.S, model.ch);
				if ((_v57.a.$ === 1) && (_v57.b.$ === 5)) {
					var userData = _v57.a.a;
					var dbm = _v57.b.a;
					var _v58 = dbm.bK;
					if (!_v58.$) {
						var asset = _v58.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{bF: true}))
								}),
							A2(
								$author$project$Api$updateAsset,
								model.aE,
								{
									ac: $elm$core$String$trim(dbm.bG),
									G: asset.G,
									as: dbm.bI,
									cH: dbm.bJ,
									h: userData.h
								}));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 42:
				var result = msg.a;
				var _v59 = model.ch;
				if (_v59.$ === 5) {
					var dbm = _v59.a;
					if (!result.$) {
						var message = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												bF: false,
												bH: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(message))
											}))
								}),
							$author$project$Update$loadRouteData(model));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												bF: false,
												bH: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 43:
				var assetId = msg.a;
				var _v61 = model.S;
				if (_v61.$ === 1) {
					var userData = _v61.a;
					return _Utils_Tuple2(
						model,
						A2(
							$author$project$Api$deleteAsset,
							model.aE,
							{G: assetId, h: userData.h}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 44:
				var result = msg.a;
				var _v62 = model.ch;
				if (_v62.$ === 5) {
					var dbm = _v62.a;
					if (!result.$) {
						var message = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												b0: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(message))
											}))
								}),
							$author$project$Update$loadRouteData(model));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												b0: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 45:
				var value = msg.a;
				var _v64 = model.ch;
				if (_v64.$ === 5) {
					var dbm = _v64.a;
					var isValid = A2($author$project$Model$Page$DashboardModel$usernameChangeValid, value, dbm.bb);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cx: $elm$core$Maybe$Nothing, ba: value, cy: !isValid}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 46:
				var value = msg.a;
				var _v65 = model.ch;
				if (_v65.$ === 5) {
					var dbm = _v65.a;
					var isValid = A2($author$project$Model$Page$DashboardModel$usernameChangeValid, dbm.ba, value);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cx: $elm$core$Maybe$Nothing, cy: !isValid, bb: value}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 47:
				var _v66 = _Utils_Tuple2(model.S, model.ch);
				if ((_v66.a.$ === 1) && (_v66.b.$ === 5)) {
					var userData = _v66.a.a;
					var dbm = _v66.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cx: $elm$core$Maybe$Nothing, cy: true}))
							}),
						A2(
							$author$project$Api$updateAccountUsername,
							model.aE,
							{
								Y: dbm.bb,
								h: userData.h,
								ax: $elm$core$String$trim(dbm.ba)
							}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 48:
				var result = msg.a;
				var _v67 = _Utils_Tuple2(model.S, model.ch);
				if ((_v67.a.$ === 1) && (_v67.b.$ === 5)) {
					var existing = _v67.a.a;
					var dbm = _v67.b.a;
					if (!result.$) {
						var updatedUser = result.a;
						var mergedUser = _Utils_update(
							updatedUser,
							{h: existing.h});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									S: $author$project$Model$AccountStatus$LoggedIn(mergedUser),
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												cx: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success('Login updated successfully')),
												ba: mergedUser.ax,
												cy: false,
												bb: ''
											}))
								}),
							$author$project$Api$Ports$saveUserData(mergedUser));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												cx: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err))),
												cy: false
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 49:
				var value = msg.a;
				var _v69 = model.ch;
				if (_v69.$ === 5) {
					var dbm = _v69.a;
					var isValid = A2($author$project$Model$Page$DashboardModel$passwordChangeValid, value, dbm.am);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{a8: value, cw: !isValid, cx: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 50:
				var value = msg.a;
				var _v70 = model.ch;
				if (_v70.$ === 5) {
					var dbm = _v70.a;
					var isValid = A2($author$project$Model$Page$DashboardModel$passwordChangeValid, dbm.a8, value);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{am: value, cw: !isValid, cx: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 51:
				var _v71 = _Utils_Tuple2(model.S, model.ch);
				if ((_v71.a.$ === 1) && (_v71.b.$ === 5)) {
					var userData = _v71.a.a;
					var dbm = _v71.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cw: true, cx: $elm$core$Maybe$Nothing}))
							}),
						A2(
							$author$project$Api$updateAccountPassword,
							model.aE,
							{bB: dbm.a8, cb: dbm.am, h: userData.h}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 52:
				var result = msg.a;
				var _v72 = model.ch;
				if (_v72.$ === 5) {
					var dbm = _v72.a;
					if (!result.$) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												a8: '',
												am: '',
												cw: false,
												cx: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success('Password updated successfully'))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												cw: false,
												cx: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 53:
				var _v74 = model.ch;
				if (_v74.$ === 5) {
					var dbm = _v74.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{a9: '', cx: $elm$core$Maybe$Nothing, cz: true}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 54:
				var _v75 = model.ch;
				if (_v75.$ === 5) {
					var dbm = _v75.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cv: false, a9: '', cz: false}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 55:
				var value = msg.a;
				var _v76 = model.ch;
				if (_v76.$ === 5) {
					var dbm = _v76.a;
					var isValid = $author$project$Model$Page$DashboardModel$deletePasswordValid(value);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cv: !isValid, a9: value, cx: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 56:
				var _v77 = _Utils_Tuple2(model.S, model.ch);
				if ((_v77.a.$ === 1) && (_v77.b.$ === 5)) {
					var userData = _v77.a.a;
					var dbm = _v77.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Dashboard(
									_Utils_update(
										dbm,
										{cv: true, cx: $elm$core$Maybe$Nothing}))
							}),
						A2(
							$author$project$Api$deleteAccount,
							model.aE,
							{Y: dbm.a9, h: userData.h}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 57:
				var result = msg.a;
				var _v78 = model.ch;
				if (_v78.$ === 5) {
					var dbm = _v78.a;
					if (!result.$) {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{S: $author$project$Model$AccountStatus$LoggedOut}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										$author$project$Api$Ports$cleanUserData(0),
										A2($elm$browser$Browser$Navigation$pushUrl, model.aP, '/login')
									])));
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Dashboard(
										_Utils_update(
											dbm,
											{
												cv: false,
												cx: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 59:
				var result = msg.a;
				var _v80 = model.ch;
				if (_v80.$ === 6) {
					var assetModel = _v80.a;
					if (!result.$) {
						var asset = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Asset(
										_Utils_update(
											assetModel,
											{
												bs: $elm$core$Maybe$Just(asset),
												b1: false
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Asset(
										_Utils_update(
											assetModel,
											{
												b1: false,
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 60:
				var assetId = msg.a;
				var isFavorite = msg.b;
				var _v82 = model.S;
				if (_v82.$ === 1) {
					var userData = _v82.a;
					return _Utils_Tuple2(
						model,
						A2(
							$author$project$Api$toggleFavoriteAsset,
							model.aE,
							{G: assetId, bY: isFavorite, h: userData.h}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 61:
				var result = msg.a;
				if (!result.$) {
					return _Utils_Tuple2(
						model,
						$author$project$Update$loadRouteData(model));
				} else {
					var err = result.a;
					var _v84 = model.ch;
					if (_v84.$ === 6) {
						var assetModel = _v84.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Asset(
										_Utils_update(
											assetModel,
											{
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				}
			case 62:
				var reason = msg.a;
				var _v85 = model.ch;
				if (_v85.$ === 6) {
					var assetModel = _v85.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ch: $author$project$Model$PageModel$Asset(
									_Utils_update(
										assetModel,
										{cp: reason, ap: $elm$core$Maybe$Nothing}))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 63:
				var assetId = msg.a;
				var _v86 = _Utils_Tuple2(model.S, model.ch);
				if ((_v86.a.$ === 1) && (_v86.b.$ === 6)) {
					var userData = _v86.a.a;
					var assetModel = _v86.b.a;
					return _Utils_Tuple2(
						model,
						A2(
							$author$project$Api$reportAsset,
							model.aE,
							{
								G: assetId,
								cm: ($elm$core$String$trim(assetModel.cp) === '') ? 'Inappropriate content' : $elm$core$String$trim(assetModel.cp),
								h: userData.h
							}));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 64:
				var result = msg.a;
				var _v87 = model.ch;
				if (_v87.$ === 6) {
					var assetModel = _v87.a;
					if (!result.$) {
						var message = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Asset(
										_Utils_update(
											assetModel,
											{
												cp: '',
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(message))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Asset(
										_Utils_update(
											assetModel,
											{
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 66:
				var result = msg.a;
				var _v89 = model.ch;
				if (_v89.$ === 8) {
					var confirmModel = _v89.a;
					if (!result.$) {
						var message = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Confirm(
										_Utils_update(
											confirmModel,
											{
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Success(message))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = result.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ch: $author$project$Model$PageModel$Confirm(
										_Utils_update(
											confirmModel,
											{
												ap: $elm$core$Maybe$Just(
													$author$project$Model$Page$RegisterModel$Error(
														$author$project$Update$httpErrorToMessage(err)))
											}))
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var token = msg.a;
				return _Utils_Tuple2(
					model,
					$author$project$Api$confirmEmail(token));
		}
	});
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Component$Page$DashboardView$invalidView = function (message) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container-fluid mt-5 d-flex flex-column align-items-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('display-2 text-light fw-bold mt-5 text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Invalid state')
					])),
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('display-5 text-light text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(message)
					]))
			]));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Component$Navbar$branding = F2(
	function (icon, brand) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('navbar-brand text-light fw-bold'),
					$elm$html$Html$Attributes$href('/')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('me-2 d-inline-block'),
							$elm$html$Html$Attributes$src(icon),
							$elm$html$Html$Attributes$width(30)
						]),
					_List_Nil),
					$elm$html$Html$text(brand)
				]));
	});
var $author$project$Component$Generic$container = F2(
	function (attrs, children) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('container'),
				attrs),
			children);
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $chandru89new$elm_lucide$LucideIcons$xmlns = function (s) {
	return A2(
		$elm$virtual_dom$VirtualDom$property,
		'xmlns',
		$elm$json$Json$Encode$string(s));
};
var $chandru89new$elm_lucide$LucideIcons$baseOptions = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$width('24'),
		$elm$svg$Svg$Attributes$height('24'),
		$elm$svg$Svg$Attributes$fill('none'),
		$elm$svg$Svg$Attributes$stroke('currentColor'),
		$elm$svg$Svg$Attributes$strokeWidth('2'),
		$elm$svg$Svg$Attributes$strokeLinecap('round'),
		$elm$svg$Svg$Attributes$strokeLinejoin('round'),
		$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
		$chandru89new$elm_lucide$LucideIcons$xmlns('http://www.w3.org/2000/svg'),
		A2(
		$elm$virtual_dom$VirtualDom$property,
		'style',
		$elm$json$Json$Encode$string('width:1em;height:1em'))
	]);
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $chandru89new$elm_lucide$LucideIcons$ellipsisVerticalIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('5'),
						$elm$svg$Svg$Attributes$r('1')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('19'),
						$elm$svg$Svg$Attributes$r('1')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Component$Navbar$mobileToggler = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$attribute, 'aria-controls', 'navbarNavDropdown'),
			A2($elm$html$Html$Attributes$attribute, 'aria-expanded', 'false'),
			A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Toggle navigation'),
			A2($elm$html$Html$Attributes$attribute, 'data-bs-target', '#navbarNavDropdown'),
			A2($elm$html$Html$Attributes$attribute, 'data-bs-toggle', 'collapse'),
			$elm$html$Html$Attributes$type_('button'),
			$elm$html$Html$Attributes$class('navbar-toggler')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('navbar-toggler-icon')
				]),
			_List_fromArray(
				[
					$chandru89new$elm_lucide$LucideIcons$ellipsisVerticalIcon(_List_Nil)
				]))
		]));
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Event$Logout = {$: 5};
var $author$project$Event$SetBackend = function (a) {
	return {$: 0, a: a};
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $chandru89new$elm_lucide$LucideIcons$chevronsLeftRightEllipsisIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 12h.01')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M16 12h.01')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m17 7 5 5-5 5')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m7 7-5 5 5 5')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M8 12h.01')
					]),
				_List_Nil)
			]));
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $chandru89new$elm_lucide$LucideIcons$gitGraphIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('5'),
						$elm$svg$Svg$Attributes$cy('6'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M5 9v6')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('5'),
						$elm$svg$Svg$Attributes$cy('18'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 3v18')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('19'),
						$elm$svg$Svg$Attributes$cy('6'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M16 15.7A9 9 0 0 0 19 9')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $chandru89new$elm_lucide$LucideIcons$routeIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('6'),
						$elm$svg$Svg$Attributes$cy('19'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('18'),
						$elm$svg$Svg$Attributes$cy('5'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Component$Navbar$apiModeToggler = function (backend) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('nav-item dropdown')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-link dropdown-toggle d-flex align-items-center text-light bg-transparent border-0'),
						$elm$html$Html$Attributes$type_('button'),
						A2($elm$html$Html$Attributes$attribute, 'data-bs-toggle', 'dropdown'),
						A2($elm$html$Html$Attributes$attribute, 'aria-expanded', 'false')
					]),
				_List_fromArray(
					[
						$chandru89new$elm_lucide$LucideIcons$chevronsLeftRightEllipsisIcon(
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('me-1')
							])),
						$elm$html$Html$text('API')
					])),
				A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('dropdown-menu dropdown-menu-dark dropdown-menu-end')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('dropdown-item', true),
												_Utils_Tuple2('text-info', !backend)
											])),
										$elm$html$Html$Attributes$type_('button'),
										$elm$html$Html$Events$onClick(
										$author$project$Event$SetBackend(0))
									]),
								_List_fromArray(
									[
										$chandru89new$elm_lucide$LucideIcons$routeIcon(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$class('me-1')
											])),
										$elm$html$Html$text('REST')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('dropdown-item', true),
												_Utils_Tuple2('text-info', backend === 1)
											])),
										$elm$html$Html$Attributes$type_('button'),
										$elm$html$Html$Events$onClick(
										$author$project$Event$SetBackend(1))
									]),
								_List_fromArray(
									[
										$chandru89new$elm_lucide$LucideIcons$gitGraphIcon(
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$class('me-1')
											])),
										$elm$html$Html$text('GraphQL')
									]))
							]))
					]))
			]));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $chandru89new$elm_lucide$LucideIcons$circleUserRoundIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M18 20a6 6 0 0 0-12 0')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('10'),
						$elm$svg$Svg$Attributes$r('4')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('10')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Navbar$loggedInView = F2(
	function (logoutEvent, username) {
		return A2(
			$elm$html$Html$li,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nav-item dropdown ms-lg-auto')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('nav-link dropdown-toggle d-flex align-items-center text-light bg-transparent border-0'),
							$elm$html$Html$Attributes$type_('button'),
							A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
							A2($elm$html$Html$Attributes$attribute, 'data-bs-toggle', 'dropdown'),
							A2($elm$html$Html$Attributes$attribute, 'aria-expanded', 'false')
						]),
					_List_fromArray(
						[
							$chandru89new$elm_lucide$LucideIcons$circleUserRoundIcon(
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('me-1')
								])),
							$elm$html$Html$text(username)
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dropdown-menu dropdown-menu-dark dropdown-menu-end')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dropdown-item'),
											$elm$html$Html$Attributes$href('/dashboard')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Dashboard')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dropdown-item text-danger w-100 text-start'),
											$elm$html$Html$Attributes$type_('button'),
											$elm$html$Html$Events$onClick(logoutEvent)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Logout')
										]))
								]))
						]))
				]));
	});
var $author$project$Component$Navbar$loggedOutView = A2(
	$elm$html$Html$li,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('nav-item ms-lg-auto')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nav-link text-info'),
					$elm$html$Html$Attributes$href('/login')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Login')
				]))
		]));
var $author$project$Component$Navbar$navigation = F3(
	function (backend, links, status) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('collapse navbar-collapse'),
					$elm$html$Html$Attributes$id('navbarNavDropdown')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('navbar-nav nav-underline w-100 align-items-lg-center')
						]),
					_Utils_ap(
						A2(
							$elm$core$List$map,
							function (_v0) {
								var name = _v0.a;
								var link = _v0.b;
								return A2(
									$elm$html$Html$li,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('nav-item')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('nav-link text-light'),
													$elm$html$Html$Attributes$href(link)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(name)
												]))
										]));
							},
							links),
						_List_fromArray(
							[
								function () {
								if (!status.$) {
									return $author$project$Component$Navbar$loggedOutView;
								} else {
									var userData = status.a;
									return A2($author$project$Component$Navbar$loggedInView, $author$project$Event$Logout, userData.ax);
								}
							}(),
								$author$project$Component$Navbar$apiModeToggler(backend)
							])))
				]));
	});
var $author$project$Component$Navbar$view = function (props) {
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('navbar sticky-top navbar-expand-lg bg-dark navbar-dark')
			]),
		_List_fromArray(
			[
				A2(
				$author$project$Component$Generic$container,
				_List_Nil,
				_List_fromArray(
					[
						A2($author$project$Component$Navbar$branding, props.bU, props.bw),
						$author$project$Component$Navbar$mobileToggler,
						A3($author$project$Component$Navbar$navigation, props.aE, props.b$, props.S)
					]))
			]));
};
var $chandru89new$elm_lucide$LucideIcons$infoIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('10')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 16v-4')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 8h.01')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Component$Page$AboutView$aboutPanel = function (props) {
	return A2(
		$author$project$Component$Generic$container,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-5 text-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('about-surface border border-secondary rounded p-4 p-lg-5')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('display-5 mb-3 icon-text-center')
							]),
						_List_fromArray(
							[
								$chandru89new$elm_lucide$LucideIcons$infoIcon(
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$class('me-2')
									])),
								$elm$html$Html$text(props.af)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lead text-secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(props.ac)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex flex-wrap gap-2')
							]),
						A2(
							$elm$core$List$map,
							function (_v0) {
								var name = _v0.a;
								var link = _v0.b;
								var icon = _v0.c;
								return A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-outline-info icon-text-center'),
											$elm$html$Html$Attributes$href(link),
											$elm$html$Html$Attributes$target('_blank'),
											$elm$html$Html$Attributes$rel('noreferrer')
										]),
									_List_fromArray(
										[
											icon(
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$class('me-1')
												])),
											$elm$html$Html$text(name)
										]));
							},
							props.b$))
					]))
			]));
};
var $chandru89new$elm_lucide$LucideIcons$githubIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M9 18c-4.51 2-5-2-7-2')
					]),
				_List_Nil)
			]));
};
var $chandru89new$elm_lucide$LucideIcons$sendIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m21.854 2.147-10.94 10.939')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$AboutView$view = $author$project$Component$Page$AboutView$aboutPanel(
	{
		ac: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus odio non faucibus mattis. Curabitur ullamcorper sed mauris eget rutrum. Sed consectetur tellus in massa auctor rhoncus ut eu justo. Praesent ultrices rutrum risus. In sit amet nibh lobortis, tristique purus quis, faucibus metus. Sed id velit malesuada, lobortis eros nec, tempus risus. Quisque aliquet diam in ex consequat posuere. Duis dictum sagittis turpis, vel efficitur ex malesuada quis. Etiam lacus sem, molestie elementum laoreet non, fermentum ac nibh. Ut rhoncus nulla leo, eu suscipit ex blandit sit amet. Nulla facilisi. Aenean tincidunt ornare consectetur. In nec elit orci. Morbi ac condimentum neque. Morbi scelerisque feugiat laoreetm. Vestibulum vestibulum egestas rhoncus. Fusce pharetra ultrices magna eu posuere. Etiam id tortor lobortis, euismod sem eu, laoreet sapien. Praesent sed tellus id felis tincidunt ornare. Quisque placerat turpis commodo urna euismod, ut blandit magna sollicitudin. Quisque bibendum dolor sed odio vehicula, sed dictum augue facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida bibendum nisl, vel dignissim lacus sodales quis. Sed fermentum dolor a ligula placerat sagittis. Curabitur blandit eros eu metus tristique sollicitudin. Cras tincidunt nibh turpis, at condimentum arcu fringilla et. Nulla gravida dapibus pulvinar. Nam interdum condimentum magna ut dignissim. Aenean elementum fringilla arcu, vitae luctus ex pharetra eu. Integer ultrices non purus quis varius. ',
		af: 'About XastGE Resource Center',
		b$: _List_fromArray(
			[
				_Utils_Tuple3('GitHub', 'https://github.com/xast-platform/xastge-resource-center/', $chandru89new$elm_lucide$LucideIcons$githubIcon),
				_Utils_Tuple3('Telegram', 'https://t.me/xast_programming', $chandru89new$elm_lucide$LucideIcons$sendIcon)
			])
	});
var $author$project$Event$ToggleAssetFavorite = F2(
	function (a, b) {
		return {$: 60, a: a, b: b};
	});
var $elm$html$Html$Attributes$download = function (fileName) {
	return A2($elm$html$Html$Attributes$stringProperty, 'download', fileName);
};
var $chandru89new$elm_lucide$LucideIcons$downloadIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 15V3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m7 10 5 5 5-5')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$AssetView$errorView = function (model) {
	return A2(
		$author$project$Component$Generic$container,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-5 text-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-danger mb-3')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Asset not found')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-secondary mb-3')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('The asset you\'re looking for could not be loaded.')
					])),
				function () {
				var _v0 = model.ap;
				if ((!_v0.$) && (_v0.a.$ === 1)) {
					var err = _v0.a.a;
					return A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-danger small')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Error: ' + err)
							]));
				} else {
					return $elm$html$Html$text('');
				}
			}(),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('btn btn-outline-info'),
						$elm$html$Html$Attributes$href('/')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Back to home')
					]))
			]));
};
var $chandru89new$elm_lucide$LucideIcons$flagIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$AssetView$loadingView = A2(
	$author$project$Component$Generic$container,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('py-5 text-light')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Loading asset...')
				]))
		]));
var $author$project$Event$SubmitAssetReport = function (a) {
	return {$: 63, a: a};
};
var $author$project$Event$UpdateAssetReportReason = function (a) {
	return {$: 62, a: a};
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Component$Form$formTextarea = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-label text-light')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(props.s)
						])),
					A2(
					$elm$html$Html$textarea,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
							$elm$html$Html$Attributes$rows(props.a5),
							$elm$html$Html$Attributes$value(props.K),
							$elm$html$Html$Events$onInput(props.H)
						]),
					_List_Nil)
				]),
			function () {
				var _v0 = props.r;
				if (!_v0.$) {
					var err = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-danger small mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(err)
								]))
						]);
				} else {
					return _List_Nil;
				}
			}()));
};
var $author$project$Component$Form$submitStatus = function (maybeErr) {
	if (!maybeErr.$) {
		if (maybeErr.a.$ === 1) {
			var err = maybeErr.a.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-danger text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(err)
					]));
		} else {
			var msg = maybeErr.a.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('alert alert-success text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(msg)
					]));
		}
	} else {
		return $elm$html$Html$text('');
	}
};
var $author$project$Component$Page$AssetView$reportModal = F2(
	function (model, asset) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal fade'),
					$elm$html$Html$Attributes$id('reportAssetModal'),
					A2($elm$html$Html$Attributes$attribute, 'tabindex', '-1'),
					A2($elm$html$Html$Attributes$attribute, 'aria-labelledby', 'reportAssetLabel'),
					A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-dialog')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-content text-bg-dark border-secondary')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-header border-secondary')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h1,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-title'),
													$elm$html$Html$Attributes$id('reportAssetLabel')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Report asset')
												])),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn-close btn-close-white'),
													$elm$html$Html$Attributes$type_('button'),
													A2($elm$html$Html$Attributes$attribute, 'data-bs-dismiss', 'modal'),
													A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Close')
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-body')
										]),
									_List_fromArray(
										[
											$author$project$Component$Form$submitStatus(model.ap),
											$author$project$Component$Form$formTextarea(
											{r: $elm$core$Maybe$Nothing, s: 'Reason for report', H: $author$project$Event$UpdateAssetReportReason, a5: 4, K: model.cp})
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-footer border-secondary')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn btn-outline-light'),
													$elm$html$Html$Attributes$type_('button'),
													A2($elm$html$Html$Attributes$attribute, 'data-bs-dismiss', 'modal')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Cancel')
												])),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn btn-danger'),
													$elm$html$Html$Attributes$type_('button'),
													$elm$html$Html$Events$onClick(
													$author$project$Event$SubmitAssetReport(asset.G)),
													A2($elm$html$Html$Attributes$attribute, 'data-bs-dismiss', 'modal')
												]),
											_List_fromArray(
												[
													$chandru89new$elm_lucide$LucideIcons$flagIcon(
													_List_fromArray(
														[
															$elm$svg$Svg$Attributes$class('me-1')
														])),
													$elm$html$Html$text('Submit report')
												]))
										]))
								]))
						]))
				]));
	});
var $chandru89new$elm_lucide$LucideIcons$starIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $author$project$Component$Page$AssetView$view = F2(
	function (model, accountStatus) {
		if (model.b1) {
			return $author$project$Component$Page$AssetView$loadingView;
		} else {
			var _v0 = model.bs;
			if (!_v0.$) {
				var asset = _v0.a;
				return A2(
					$author$project$Component$Generic$container,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-5 text-light')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(asset.bQ)
								])),
							$author$project$Component$Form$submitStatus(model.ap),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('row g-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('col-lg-5')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('img-fluid image-ratio-fixed rounded border border-secondary'),
													$elm$html$Html$Attributes$src(
													(asset.bh === '') ? 'https://dummyimage.com/640x640/4c4c4c/ffffff.png&text=  No+Thumbnail' : asset.bh)
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('col-lg-7')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('lead')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(asset.ac)
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Type: ')
														])),
													$elm$html$Html$text(asset.aB)
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Downloads: ')
														])),
													$elm$html$Html$text(
													$elm$core$String$fromInt(asset.bE))
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Favorites: ')
														])),
													$elm$html$Html$text(
													$elm$core$String$fromInt(asset.bP))
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Tags: ')
														])),
													$elm$html$Html$text(
													A2($elm$core$String$join, ', ', asset.as))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('d-flex flex-wrap gap-2 mt-4')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$a,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn btn-info'),
															$elm$html$Html$Attributes$href($author$project$Api$Config$backendUrl + ('/assets/' + (asset.G + '/download'))),
															$elm$html$Html$Attributes$download(asset.bQ)
														]),
													_List_fromArray(
														[
															$chandru89new$elm_lucide$LucideIcons$downloadIcon(
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$class('me-1')
																])),
															$elm$html$Html$text('Download')
														])),
													function () {
													if (accountStatus.$ === 1) {
														return A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class(
																	asset.bY ? 'btn btn-warning' : 'btn btn-outline-warning'),
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Event$ToggleAssetFavorite, asset.G, asset.bY))
																]),
															_List_fromArray(
																[
																	$chandru89new$elm_lucide$LucideIcons$starIcon(
																	_List_fromArray(
																		[
																			$elm$svg$Svg$Attributes$class('me-1')
																		])),
																	$elm$html$Html$text(
																	asset.bY ? 'Unfavorite' : 'Favorite')
																]));
													} else {
														return $elm$html$Html$text('');
													}
												}()
												])),
											function () {
											if (accountStatus.$ === 1) {
												return A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn btn-outline-danger mt-4'),
															$elm$html$Html$Attributes$type_('button'),
															A2($elm$html$Html$Attributes$attribute, 'data-bs-toggle', 'modal'),
															A2($elm$html$Html$Attributes$attribute, 'data-bs-target', '#reportAssetModal')
														]),
													_List_fromArray(
														[
															$chandru89new$elm_lucide$LucideIcons$flagIcon(
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$class('me-1')
																])),
															$elm$html$Html$text('Report asset')
														]));
											} else {
												return A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-secondary mt-4')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Log in to favorite or report assets')
														]));
											}
										}()
										]))
								])),
							A2($author$project$Component$Page$AssetView$reportModal, model, asset)
						]));
			} else {
				return $author$project$Component$Page$AssetView$errorView(model);
			}
		}
	});
var $author$project$Event$SubmitBrowseLoadMore = {$: 21};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Component$Page$BrowseView$assetCard = function (asset) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card text-bg-dark border border-secondary'),
				A2($elm$html$Html$Attributes$style, 'width', '240px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-img-top image-ratio-fixed border-bottom border-secondary'),
						$elm$html$Html$Attributes$src(
						(asset.bh === '') ? 'https://dummyimage.com/240x240/595959/ffffff.png&text=  No+Thumbnail' : asset.bh)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-body')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card-title mb-1 text-truncate'),
								$elm$html$Html$Attributes$title(asset.bQ)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(asset.bQ)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('small text-secondary mb-1')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(asset.aB)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('small text-secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								'by ' + ((asset.aD === '') ? 'Unknown' : asset.aD))
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-sm btn-outline-info'),
								$elm$html$Html$Attributes$href('/asset/' + asset.G)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Open')
							]))
					]))
			]));
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $chandru89new$elm_lucide$LucideIcons$scanSearchIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3 7V5a2 2 0 0 1 2-2h2')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M17 3h2a2 2 0 0 1 2 2v2')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M21 17v2a2 2 0 0 1-2 2h-2')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M7 21H5a2 2 0 0 1-2-2v-2')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m16 16-1.9-1.9')
					]),
				_List_Nil)
			]));
};
var $author$project$Event$SubmitBrowseSearch = {$: 20};
var $author$project$Event$UpdateBrowseAll = function (a) {
	return {$: 19, a: a};
};
var $author$project$Event$UpdateBrowseAuthor = function (a) {
	return {$: 18, a: a};
};
var $author$project$Event$UpdateBrowseName = function (a) {
	return {$: 15, a: a};
};
var $author$project$Event$UpdateBrowseTag = function (a) {
	return {$: 17, a: a};
};
var $author$project$Event$UpdateBrowseType = function (a) {
	return {$: 16, a: a};
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$option = _VirtualDom_node('option');
var $chandru89new$elm_lucide$LucideIcons$searchIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m21 21-4.34-4.34')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('11'),
						$elm$svg$Svg$Attributes$cy('11'),
						$elm$svg$Svg$Attributes$r('8')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Component$Page$BrowseView$searchPanel = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('border border-secondary rounded p-3 bg-dark')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('row g-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-12 col-lg-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-label text-light')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Name')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(model.ca),
										$elm$html$Html$Events$onInput($author$project$Event$UpdateBrowseName)
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-12 col-lg-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-label text-light')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Type')
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-select text-bg-dark border-secondary'),
										$elm$html$Html$Events$onInput($author$project$Event$UpdateBrowseType)
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value(''),
												$elm$html$Html$Attributes$selected(model.aB === '')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Any type')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('Scene'),
												$elm$html$Html$Attributes$selected(model.aB === 'Scene')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Scene')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('Model'),
												$elm$html$Html$Attributes$selected(model.aB === 'Model')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Model')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('Script'),
												$elm$html$Html$Attributes$selected(model.aB === 'Script')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Script')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('Texture'),
												$elm$html$Html$Attributes$selected(model.aB === 'Texture')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Texture')
											])),
										A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('Audio'),
												$elm$html$Html$Attributes$selected(model.aB === 'Audio')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Audio')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-12 col-lg-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-label text-light')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Tag')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(model.cG),
										$elm$html$Html$Events$onInput($author$project$Event$UpdateBrowseTag)
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-12 col-lg-6')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-label text-light')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Author')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(model.bv),
										$elm$html$Html$Events$onInput($author$project$Event$UpdateBrowseAuthor)
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-12 col-lg-6')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-label text-light')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('All fields')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$value(model.bp),
										$elm$html$Html$Events$onInput($author$project$Event$UpdateBrowseAll)
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('d-flex gap-2 mt-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-info icon-text-center'),
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Events$onClick($author$project$Event$SubmitBrowseSearch)
							]),
						_List_fromArray(
							[
								$chandru89new$elm_lucide$LucideIcons$searchIcon(
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$class('me-1')
									])),
								$elm$html$Html$text('Search')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-outline-light'),
								$elm$html$Html$Attributes$href('/browse')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Reset')
							]))
					]))
			]));
};
var $author$project$Component$Page$BrowseView$view = function (model) {
	return A2(
		$author$project$Component$Generic$container,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-4 text-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('display-5 mb-2 icon-text-center')
					]),
				_List_fromArray(
					[
						$chandru89new$elm_lucide$LucideIcons$scanSearchIcon(
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('me-2')
							])),
						$elm$html$Html$text('Browse assets')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-secondary mb-4')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Use one or multiple filters to search by name, type, tag, author, or everything at once')
					])),
				$author$project$Component$Page$BrowseView$searchPanel(model),
				$author$project$Component$Form$submitStatus(model.ap),
				model.b1 ? A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-secondary mt-3')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Searching assets')
					])) : ($elm$core$List$isEmpty(model.aC) ? A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-secondary mt-3')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('No assets found for this query')
					])) : A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex flex-wrap gap-3 mt-3 justify-content-center')
							]),
						A2($elm$core$List$map, $author$project$Component$Page$BrowseView$assetCard, model.aC)),
						model.bS ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-4 d-flex justify-content-center')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-outline-info'),
										$elm$html$Html$Attributes$type_('button'),
										$elm$html$Html$Events$onClick($author$project$Event$SubmitBrowseLoadMore),
										$elm$html$Html$Attributes$disabled(model.aS)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										model.aS ? 'Loading more...' : 'Load next 50')
									]))
							])) : $elm$html$Html$text('')
					])))
			]));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Component$Page$ConfirmView$view = function (model) {
	return A2(
		$author$project$Component$Generic$container,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-bg-dark text-center')
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.ap;
				if (_v0.$ === 1) {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('confirm-loading')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Verifying your email...')
							]));
				} else {
					if (!_v0.a.$) {
						var message = _v0.a.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-success mt-5')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('display-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Email Confirmed!')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('lead')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(message)
										])),
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-info'),
											$elm$html$Html$Attributes$href('/login')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Go to Login')
										]))
								]));
					} else {
						var message = _v0.a.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-error mt-5')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('display-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Verification Failed')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('lead')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(message)
										])),
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-info'),
											$elm$html$Html$Attributes$href('/register')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Back to Registration')
										]))
								]));
					}
				}
			}()
			]));
};
var $author$project$Model$Page$DashboardModel$Analytics = 3;
var $author$project$Model$Page$DashboardModel$Favorite = 1;
var $author$project$Model$Page$DashboardModel$Settings = 4;
var $author$project$Model$Page$DashboardModel$Upload = 2;
var $elm$html$Html$Attributes$colspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'colspan',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Component$Page$DashboardView$analyticsTab = function (model) {
	return _List_fromArray(
		[
			model.b2 ? A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-secondary')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Loading analytics')
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('table-responsive')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$table,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('table table-dark table-striped')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$thead,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$tr,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$th,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Asset type')
												])),
											A2(
											$elm$html$Html$th,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Total downloads')
												])),
											A2(
											$elm$html$Html$th,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Assets count')
												]))
										]))
								])),
							A2(
							$elm$html$Html$tbody,
							_List_Nil,
							$elm$core$List$isEmpty(model.az) ? _List_fromArray(
								[
									A2(
									$elm$html$Html$tr,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$colspan(3),
													$elm$html$Html$Attributes$class('text-secondary')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('No analytics available')
												]))
										]))
								]) : A2(
								$elm$core$List$map,
								function (row) {
									return A2(
										$elm$html$Html$tr,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$elm$html$Html$td,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(row.aB)
													])),
												A2(
												$elm$html$Html$td,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														$elm$core$String$fromInt(row.cI))
													])),
												A2(
												$elm$html$Html$td,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text(
														$elm$core$String$fromInt(row.bu))
													]))
											]));
								},
								model.az))
						]))
				]))
		]);
};
var $author$project$Event$SelectDashboardTab = function (a) {
	return {$: 23, a: a};
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Component$Page$DashboardView$dashboardPanel = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('dashboard-shell d-flex flex-column flex-lg-row')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('dashboard-sidebar border-end border-secondary text-white p-3 col-lg-2 col-md-12 col-12 col-sm-12 flex-lg-shrink-0')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('ms-2 mb-3')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Dashboard')
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav nav-pills flex-column mb-auto')
							]),
						A2(
							$elm$core$List$map,
							function (_v0) {
								var tab = _v0.a;
								var name = _v0.b;
								return A2(
									$elm$html$Html$li,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('nav-item mb-2')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('nav-link text-white'),
													$elm$html$Html$Attributes$classList(
													_List_fromArray(
														[
															_Utils_Tuple2(
															'bg-secondary active',
															_Utils_eq(props.U, tab))
														])),
													$elm$html$Html$Events$onClick(
													$author$project$Event$SelectDashboardTab(tab)),
													$elm$html$Html$Attributes$href('#')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(name)
												]))
										]));
							},
							props._))
					])),
				function () {
				var _v1 = $elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v2) {
							var tab = _v2.a;
							return _Utils_eq(tab, props.U);
						},
						props._));
				if (!_v1.$) {
					var _v3 = _v1.a;
					var name = _v3.b;
					var content = _v3.c;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('dashboard-content flex-grow-1 p-4 col-12 col-lg')
							]),
						_Utils_ap(
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h1,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-light display-4')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$toUpper(name))
										])),
									A2(
									$elm$html$Html$hr,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('border border-secondary opacity-50 mb-4')
										]),
									_List_Nil)
								]),
							content));
				} else {
					return $author$project$Component$Page$DashboardView$invalidView('Selected tab does not exist');
				}
			}()
			]));
};
var $author$project$Event$CloseDashboardDeleteAccountModal = {$: 54};
var $author$project$Event$SubmitDashboardDeleteAccount = {$: 56};
var $author$project$Event$UpdateDashboardDeletePassword = function (a) {
	return {$: 55, a: a};
};
var $author$project$Component$Form$cancelButton = F3(
	function (lab, msg, dis) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('d-flex justify-content-center mb-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-outline-danger px-5'),
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(msg),
							$elm$html$Html$Attributes$disabled(dis),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('btn-smooth', true),
									_Utils_Tuple2('is-disabled', dis)
								]))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(lab)
						]))
				]));
	});
var $author$project$Component$Form$dangerSubmitButton = F3(
	function (lab, msg, dis) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('d-flex justify-content-center mb-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-danger px-4'),
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(msg),
							$elm$html$Html$Attributes$disabled(dis),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('btn-smooth', true),
									_Utils_Tuple2('is-disabled', dis)
								]))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(lab)
						]))
				]));
	});
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $author$project$Component$Form$formInput = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-label text-light')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(props.s)
						])),
					A2(
					$elm$html$Html$input,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary'),
								$elm$html$Html$Attributes$type_(props.bi),
								$elm$html$Html$Attributes$value(props.K),
								$elm$html$Html$Events$onInput(props.H)
							]),
						function () {
							var _v0 = props.aT;
							if (!_v0.$) {
								var max_val = _v0.a;
								return _List_fromArray(
									[
										$elm$html$Html$Attributes$maxlength(max_val)
									]);
							} else {
								return _List_Nil;
							}
						}()),
					_List_Nil)
				]),
			function () {
				var _v1 = props.r;
				if (!_v1.$) {
					var err = _v1.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-danger small mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(err)
								]))
						]);
				} else {
					return _List_Nil;
				}
			}()));
};
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $author$project$Component$Page$DashboardView$deleteAccountModal = function (model) {
	return model.cz ? A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal show d-block'),
						A2($elm$html$Html$Attributes$attribute, 'tabindex', '-1'),
						A2($elm$html$Html$Attributes$attribute, 'role', 'dialog')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-dialog modal-dialog-centered')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('modal-content bg-dark text-white border border-secondary')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('modal-header border-secondary')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$h5,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('modal-title')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('DELETE ACCOUNT')
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn-close btn-close-white'),
														$elm$html$Html$Attributes$type_('button'),
														$elm$html$Html$Events$onClick($author$project$Event$CloseDashboardDeleteAccountModal)
													]),
												_List_Nil)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('modal-body')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('text-danger')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('This action is permanent and cannot be undone')
													])),
												function () {
												var passwordError = ($elm$core$String$trim(model.a9) === '') ? $elm$core$Maybe$Just('Password is required') : $elm$core$Maybe$Nothing;
												return $author$project$Component$Form$formInput(
													{r: passwordError, s: 'Confirm your password', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardDeletePassword, bi: 'password', K: model.a9});
											}()
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('modal-footer border-secondary')
											]),
										_List_fromArray(
											[
												A3($author$project$Component$Form$cancelButton, 'Cancel', $author$project$Event$CloseDashboardDeleteAccountModal, false),
												A3($author$project$Component$Form$dangerSubmitButton, 'Delete forever', $author$project$Event$SubmitDashboardDeleteAccount, model.cv)
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal-backdrop show')
					]),
				_List_Nil)
			])) : $elm$html$Html$text('');
};
var $author$project$Event$CloseDashboardEditAsset = {$: 37};
var $author$project$Event$SubmitDashboardEditAsset = {$: 41};
var $author$project$Event$UpdateDashboardEditDescription = function (a) {
	return {$: 39, a: a};
};
var $author$project$Event$UpdateDashboardEditTags = function (a) {
	return {$: 40, a: a};
};
var $author$project$Event$UpdateDashboardEditThumbnailFile = function (a) {
	return {$: 38, a: a};
};
var $elm$file$File$decoder = _File_decoder;
var $author$project$Component$Form$fileInput = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-label text-light')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(props.s)
						])),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary form-control-sm'),
							$elm$html$Html$Attributes$type_('file'),
							A2(
							$elm$html$Html$Events$on,
							'change',
							A2(
								$elm$json$Json$Decode$map,
								props.aW,
								A2(
									$elm$json$Json$Decode$at,
									_List_fromArray(
										['target', 'files', '0']),
									$elm$file$File$decoder)))
						]),
					_List_Nil)
				]),
			function () {
				var _v0 = props.r;
				if (!_v0.$) {
					var err = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-danger small mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(err)
								]))
						]);
				} else {
					return _List_Nil;
				}
			}()));
};
var $author$project$Component$Form$submitButton = F3(
	function (lab, msg, dis) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('d-flex justify-content-center mb-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-info px-4'),
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(msg),
							$elm$html$Html$Attributes$disabled(dis),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('btn-smooth', true),
									_Utils_Tuple2('is-disabled', dis)
								]))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(lab)
						]))
				]));
	});
var $author$project$Component$Page$DashboardView$editForm = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('w-100')
			]),
		_List_fromArray(
			[
				$author$project$Component$Form$submitStatus(model.bH),
				$author$project$Component$Form$fileInput(
				{
					r: $elm$core$Maybe$Nothing,
					bQ: A2($elm$core$Maybe$map, $elm$file$File$name, model.bJ),
					s: 'Thumbnail file',
					aW: $author$project$Event$UpdateDashboardEditThumbnailFile
				}),
				$author$project$Component$Form$formTextarea(
				{r: $elm$core$Maybe$Nothing, s: 'Description', H: $author$project$Event$UpdateDashboardEditDescription, a5: 3, K: model.bG}),
				$author$project$Component$Form$formInput(
				{r: $elm$core$Maybe$Nothing, s: 'Tags (comma separated)', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardEditTags, bi: 'text', K: model.bI}),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('d-flex gap-2')
					]),
				_List_fromArray(
					[
						A3($author$project$Component$Form$submitButton, 'Save changes', $author$project$Event$SubmitDashboardEditAsset, model.bF),
						A3($author$project$Component$Form$cancelButton, 'Cancel', $author$project$Event$CloseDashboardEditAsset, false)
					]))
			]));
};
var $author$project$Component$Page$DashboardView$editModal = function (model) {
	var _v0 = model.bK;
	if (_v0.$ === 1) {
		return $elm$html$Html$text('');
	} else {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal show d-block'),
							A2($elm$html$Html$Attributes$attribute, 'tabindex', '-1'),
							A2($elm$html$Html$Attributes$attribute, 'role', 'dialog')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-dialog modal-dialog-centered')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-content bg-dark text-white border border-secondary')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-header border-secondary')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$h5,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-title')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('EDIT ASSET')
														])),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn-close btn-close-white'),
															$elm$html$Html$Attributes$type_('button'),
															$elm$html$Html$Events$onClick($author$project$Event$CloseDashboardEditAsset)
														]),
													_List_Nil)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-body')
												]),
											_List_fromArray(
												[
													$author$project$Component$Page$DashboardView$editForm(model)
												]))
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-backdrop show')
						]),
					_List_Nil)
				]));
	}
};
var $author$project$Component$Page$DashboardView$card = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card text-bg-dark border border-secondary'),
				A2($elm$html$Html$Attributes$attribute, 'style', 'width: 240px;')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-img-top image-ratio-fixed border-bottom border-secondary'),
						$elm$html$Html$Attributes$src(
						(props.O === '') ? 'https://dummyimage.com/240x240/595959/ffffff.png&text=  No+Thumbnail' : props.O)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-body')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card-title mb-1 text-truncate'),
								$elm$html$Html$Attributes$title(props.s)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(props.s)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('small text-secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(props.Z)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex flex-wrap gap-2')
							]),
						props.T)
					]))
			]));
};
var $chandru89new$elm_lucide$LucideIcons$eyeIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('3')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$DashboardView$assetCard = function (asset) {
	return $author$project$Component$Page$DashboardView$card(
		{
			T: _List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-sm btn-outline-info'),
							$elm$html$Html$Attributes$href('/asset/' + asset.G)
						]),
					_List_fromArray(
						[
							$chandru89new$elm_lucide$LucideIcons$eyeIcon(
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('me-1')
								])),
							$elm$html$Html$text('Open')
						]))
				]),
			O: asset.bh,
			s: asset.bQ,
			Z: asset.aB + (' | Favorites: ' + $elm$core$String$fromInt(asset.bP))
		});
};
var $author$project$Component$Page$DashboardView$subsection = F2(
	function (name, comps) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-light mb-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$toUpper(name))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('border border-secondary rounded p-3 d-flex flex-wrap gap-3 mb-4')
						]),
					comps)
				]));
	});
var $author$project$Component$Page$DashboardView$favoriteTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$author$project$Component$Page$DashboardView$subsection,
			'Your favorites',
			$elm$core$List$isEmpty(model.W) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-secondary m-0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('No favorites yet')
						]))
				]) : A2($elm$core$List$map, $author$project$Component$Page$DashboardView$assetCard, model.W))
		]);
};
var $author$project$Event$OpenDashboardEditAsset = function (a) {
	return {$: 36, a: a};
};
var $author$project$Event$SubmitDashboardDeleteAsset = function (a) {
	return {$: 43, a: a};
};
var $chandru89new$elm_lucide$LucideIcons$pencilIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m15 5 4 4')
					]),
				_List_Nil)
			]));
};
var $chandru89new$elm_lucide$LucideIcons$trash2Icon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M10 11v6')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M14 11v6')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3 6h18')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$DashboardView$managedAssetCard = function (asset) {
	return $author$project$Component$Page$DashboardView$card(
		{
			T: _List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-sm btn-outline-info'),
							$elm$html$Html$Attributes$href('/asset/' + asset.G)
						]),
					_List_fromArray(
						[
							$chandru89new$elm_lucide$LucideIcons$eyeIcon(
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('me-1')
								])),
							$elm$html$Html$text('Open')
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-sm btn-outline-warning'),
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(
							$author$project$Event$OpenDashboardEditAsset(asset))
						]),
					_List_fromArray(
						[
							$chandru89new$elm_lucide$LucideIcons$pencilIcon(
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('me-1')
								])),
							$elm$html$Html$text('Edit')
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn btn-sm btn-outline-danger'),
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(
							$author$project$Event$SubmitDashboardDeleteAsset(asset.G))
						]),
					_List_fromArray(
						[
							$chandru89new$elm_lucide$LucideIcons$trash2Icon(
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('me-1')
								])),
							$elm$html$Html$text('Delete')
						]))
				]),
			O: asset.bh,
			s: asset.bQ,
			Z: asset.aB + (' | Downloads: ' + $elm$core$String$fromInt(asset.bE))
		});
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Component$Page$DashboardView$homeTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$author$project$Component$Page$DashboardView$subsection,
			'Latest favorites',
			$elm$core$List$isEmpty(model.W) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-secondary m-0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('No favorite assets yet')
						]))
				]) : A2(
				$elm$core$List$map,
				$author$project$Component$Page$DashboardView$assetCard,
				A2($elm$core$List$take, 4, model.W))),
			A2(
			$author$project$Component$Page$DashboardView$subsection,
			'Latest uploaded',
			$elm$core$List$isEmpty(model.X) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-secondary m-0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('No uploaded assets yet')
						]))
				]) : A2(
				$elm$core$List$map,
				$author$project$Component$Page$DashboardView$managedAssetCard,
				A2($elm$core$List$take, 6, model.X)))
		]);
};
var $author$project$Event$OpenDashboardDeleteAccountModal = {$: 53};
var $author$project$Event$SubmitDashboardSettingsPassword = {$: 51};
var $author$project$Event$SubmitDashboardSettingsUsername = {$: 47};
var $author$project$Event$UpdateDashboardSettingsCurrentPassword = function (a) {
	return {$: 49, a: a};
};
var $author$project$Event$UpdateDashboardSettingsNewPassword = function (a) {
	return {$: 50, a: a};
};
var $author$project$Event$UpdateDashboardSettingsUsername = function (a) {
	return {$: 45, a: a};
};
var $author$project$Event$UpdateDashboardSettingsUsernamePassword = function (a) {
	return {$: 46, a: a};
};
var $author$project$Component$Page$DashboardView$settingsTab = F2(
	function (model, userData) {
		return _List_fromArray(
			[
				$author$project$Component$Form$submitStatus(model.cx),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Account',
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex flex-column')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-light lead')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Email')
											])),
										$elm$html$Html$text(' : ' + userData.bM)
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-light lead')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Role')
											])),
										$elm$html$Html$text(' : ' + userData.cs)
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-light lead')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Verification')
											])),
										$elm$html$Html$text(
										userData.bA ? ' : confirmed' : ' : not confirmed')
									]))
							]))
					])),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Change login',
				_List_fromArray(
					[
						function () {
						var trimmedUsername = $elm$core$String$trim(model.ba);
						var usernameLen = $elm$core$String$length(trimmedUsername);
						var usernameError = (trimmedUsername === '') ? $elm$core$Maybe$Nothing : ((_Utils_cmp(usernameLen, $author$project$Model$Page$DashboardModel$usernameMinLength) < 0) ? $elm$core$Maybe$Just(
							'Username must be at least ' + ($elm$core$String$fromInt($author$project$Model$Page$DashboardModel$usernameMinLength) + ' characters')) : ((_Utils_cmp(usernameLen, $author$project$Model$Page$DashboardModel$usernameMaxLength) > 0) ? $elm$core$Maybe$Just(
							'Username cannot exceed ' + ($elm$core$String$fromInt($author$project$Model$Page$DashboardModel$usernameMaxLength) + ' characters')) : $elm$core$Maybe$Nothing));
						var passwordError = ($elm$core$String$trim(model.bb) === '') ? $elm$core$Maybe$Just('Current password is required') : $elm$core$Maybe$Nothing;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Component$Form$formInput(
									{
										r: usernameError,
										s: 'New login',
										aT: $elm$core$Maybe$Just($author$project$Model$Page$DashboardModel$usernameMaxLength),
										H: $author$project$Event$UpdateDashboardSettingsUsername,
										bi: 'text',
										K: model.ba
									}),
									$author$project$Component$Form$formInput(
									{r: passwordError, s: 'Confirm password', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardSettingsUsernamePassword, bi: 'password', K: model.bb}),
									A3($author$project$Component$Form$submitButton, 'Save login', $author$project$Event$SubmitDashboardSettingsUsername, model.cy)
								]));
					}()
					])),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Change password',
				_List_fromArray(
					[
						function () {
						var newPasswordError = ($elm$core$String$trim(model.am) === '') ? $elm$core$Maybe$Nothing : ((!$author$project$Model$Page$DashboardModel$isNewPasswordValid(model.am)) ? $elm$core$Maybe$Just('New password must be at least 6 characters') : $elm$core$Maybe$Nothing);
						var currentPasswordError = ($elm$core$String$trim(model.a8) === '') ? $elm$core$Maybe$Just('Current password is required') : $elm$core$Maybe$Nothing;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Component$Form$formInput(
									{r: currentPasswordError, s: 'Current password', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardSettingsCurrentPassword, bi: 'password', K: model.a8}),
									$author$project$Component$Form$formInput(
									{r: newPasswordError, s: 'New password', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardSettingsNewPassword, bi: 'password', K: model.am}),
									A3($author$project$Component$Form$submitButton, 'Save password', $author$project$Event$SubmitDashboardSettingsPassword, model.cw)
								]));
					}()
					])),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Danger zone',
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-outline-danger'),
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Events$onClick($author$project$Event$OpenDashboardDeleteAccountModal)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Delete account')
							]))
					]))
			]);
	});
var $author$project$Event$SelectDashboardAssetFile = function (a) {
	return {$: 27, a: a};
};
var $author$project$Event$SelectDashboardThumbnailFile = function (a) {
	return {$: 28, a: a};
};
var $author$project$Event$SubmitDashboardUpload = {$: 29};
var $author$project$Event$UpdateDashboardAssetType = function (a) {
	return {$: 24, a: a};
};
var $author$project$Event$UpdateDashboardDescription = function (a) {
	return {$: 25, a: a};
};
var $author$project$Event$UpdateDashboardTags = function (a) {
	return {$: 26, a: a};
};
var $author$project$Component$Form$formSelect = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3')
			]),
		_Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-label text-light')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(props.s)
						])),
					A2(
					$elm$html$Html$select,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-select text-bg-dark border-secondary form-select-sm'),
							$elm$html$Html$Events$onInput(props.H)
						]),
					A2(
						$elm$core$List$map,
						function (optionValue) {
							return A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$selected(
										_Utils_eq(props.K, optionValue))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(optionValue)
									]));
						},
						props.aX))
				]),
			function () {
				var _v0 = props.r;
				if (!_v0.$) {
					var err = _v0.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-danger small mt-1')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(err)
								]))
						]);
				} else {
					return _List_Nil;
				}
			}()));
};
var $author$project$Model$Page$DashboardModel$getAssetFileError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 1) {
					var message = e.a;
					return $elm$core$Maybe$Just(message);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$DashboardModel$getAssetTypeError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (!e.$) {
					var message = e.a;
					return $elm$core$Maybe$Just(message);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$DashboardModel$getDescriptionError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 2) {
					var message = e.a;
					return $elm$core$Maybe$Just(message);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$DashboardModel$getThumbnailError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 3) {
					var message = e.a;
					return $elm$core$Maybe$Just(message);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Component$Page$DashboardView$uploadForm = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('w-100')
			]),
		_List_fromArray(
			[
				$author$project$Component$Form$submitStatus(model.cL),
				$author$project$Component$Form$formSelect(
				{
					r: $author$project$Model$Page$DashboardModel$getAssetTypeError(model.aa),
					s: 'Asset Type',
					H: $author$project$Event$UpdateDashboardAssetType,
					aX: _List_fromArray(
						['Scene', 'Model', 'Script', 'Texture', 'Audio']),
					K: model.aB
				}),
				$author$project$Component$Form$fileInput(
				{
					r: $author$project$Model$Page$DashboardModel$getAssetFileError(model.aa),
					bQ: A2($elm$core$Maybe$map, $elm$file$File$name, model.bt),
					s: 'Asset file',
					aW: $author$project$Event$SelectDashboardAssetFile
				}),
				$author$project$Component$Form$fileInput(
				{
					r: $author$project$Model$Page$DashboardModel$getThumbnailError(model.aa),
					bQ: A2($elm$core$Maybe$map, $elm$file$File$name, model.bg),
					s: 'Thumbnail file',
					aW: $author$project$Event$SelectDashboardThumbnailFile
				}),
				$author$project$Component$Form$formTextarea(
				{
					r: $author$project$Model$Page$DashboardModel$getDescriptionError(model.aa),
					s: 'Description',
					H: $author$project$Event$UpdateDashboardDescription,
					a5: 3,
					K: model.ac
				}),
				$author$project$Component$Form$formInput(
				{r: $elm$core$Maybe$Nothing, s: 'Tags (comma separated)', aT: $elm$core$Maybe$Nothing, H: $author$project$Event$UpdateDashboardTags, bi: 'text', K: model.as}),
				A3($author$project$Component$Form$submitButton, 'Upload Asset', $author$project$Event$SubmitDashboardUpload, model.cK)
			]));
};
var $author$project$Component$Page$DashboardView$uploadTab = F2(
	function (model, userData) {
		return _List_fromArray(
			[
				$author$project$Component$Form$submitStatus(model.b0),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Upload New Asset',
				_List_fromArray(
					[
						userData.bA ? $author$project$Component$Page$DashboardView$uploadForm(model) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('alert alert-warning m-0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Confirm your email first to upload assets')
							]))
					])),
				A2(
				$author$project$Component$Page$DashboardView$subsection,
				'Uploaded assets',
				$elm$core$List$isEmpty(model.X) ? _List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-secondary m-0')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No uploaded assets yet')
							]))
					]) : A2($elm$core$List$map, $author$project$Component$Page$DashboardView$managedAssetCard, model.X))
			]);
	});
var $author$project$Component$Page$DashboardView$view = F2(
	function (model, userData) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$Component$Page$DashboardView$dashboardPanel(
					{
						U: model.cF,
						_: _List_fromArray(
							[
								_Utils_Tuple3(
								0,
								'Home',
								$author$project$Component$Page$DashboardView$homeTab(model)),
								_Utils_Tuple3(
								1,
								'Favorite',
								$author$project$Component$Page$DashboardView$favoriteTab(model)),
								_Utils_Tuple3(
								2,
								'Upload',
								A2($author$project$Component$Page$DashboardView$uploadTab, model, userData)),
								_Utils_Tuple3(
								3,
								'Analytics',
								$author$project$Component$Page$DashboardView$analyticsTab(model)),
								_Utils_Tuple3(
								4,
								'Settings',
								A2($author$project$Component$Page$DashboardView$settingsTab, model, userData))
							])
					}),
					$author$project$Component$Page$DashboardView$editModal(model),
					$author$project$Component$Page$DashboardView$deleteAccountModal(model)
				]));
	});
var $author$project$Event$SubmitHomeQuickSearch = {$: 12};
var $author$project$Event$UpdateHomeQuickSearch = function (a) {
	return {$: 11, a: a};
};
var $author$project$Component$Page$HomeView$assetCard = function (asset) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card text-bg-dark border border-secondary'),
				A2($elm$html$Html$Attributes$style, 'width', '240px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-img-top image-ratio-fixed card-thumbnail-fixed border-bottom border-secondary'),
						$elm$html$Html$Attributes$src(
						(asset.bh === '') ? 'https://dummyimage.com/240x240/595959/ffffff.png&text= No+Thumbnail' : asset.bh)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-body')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card-title mb-1 text-truncate'),
								$elm$html$Html$Attributes$title(asset.bQ)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(asset.bQ)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('small text-secondary mb-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								asset.aB + (' by ' + ((asset.aD === '') ? 'Unknown' : asset.aD)))
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-sm btn-outline-info'),
								$elm$html$Html$Attributes$href('/asset/' + asset.G)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Open')
							]))
					]))
			]));
};
var $chandru89new$elm_lucide$LucideIcons$cuboidIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M10 22v-8')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M2.336 8.89 10 14l11.715-7.029')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$header = _VirtualDom_node('header');
var $author$project$Component$Page$HomeView$homeHeader = F3(
	function (icon, title, subtitle) {
		return A2(
			$elm$html$Html$header,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('header py-5')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$Component$Generic$container,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('px-4 px-lg-5 my-5')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center text-light')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h1,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('display-4 fw-bolder')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('me-2 display-3 align-text-bottom home-hero-icon')
												]),
											_List_fromArray(
												[icon])),
											$elm$html$Html$text(title)
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('lead fw-normal text-light mb-0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(subtitle)
										]))
								]))
						]))
				]));
	});
var $chandru89new$elm_lucide$LucideIcons$clock3Icon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('10')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 6v6h4')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$HomeView$latestAssets = function (label) {
	return A2(
		$elm$html$Html$h2,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-light mb-3 icon-text-center')
			]),
		_List_fromArray(
			[
				$chandru89new$elm_lucide$LucideIcons$clock3Icon(
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('me-2')
					])),
				$elm$html$Html$text(label)
			]));
};
var $author$project$Component$Page$HomeView$searchBar = function (props) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('home-quick-search border border-secondary rounded p-3 mb-4')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('h4 text-light mb-3 icon-text-center')
					]),
				_List_fromArray(
					[
						$chandru89new$elm_lucide$LucideIcons$searchIcon(
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('me-2')
							])),
						$elm$html$Html$text(props.au)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('input-group')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('form-control text-bg-dark border-secondary text-light'),
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$value(props.K),
								$elm$html$Html$Events$onInput(props.aj)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('btn btn-info'),
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Events$onClick(props.ak)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(props.ar)
							]))
					]))
			]));
};
var $author$project$Component$Page$HomeView$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-bg-dark')
			]),
		_List_fromArray(
			[
				A3(
				$author$project$Component$Page$HomeView$homeHeader,
				$chandru89new$elm_lucide$LucideIcons$cuboidIcon(_List_Nil),
				'XastGE Game Assets',
				'Models, plugins, scripts and more'),
				A2(
				$author$project$Component$Generic$container,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('py-4')
					]),
				_List_fromArray(
					[
						$author$project$Component$Page$HomeView$searchBar(
						{aj: $author$project$Event$UpdateHomeQuickSearch, ak: $author$project$Event$SubmitHomeQuickSearch, ar: 'Browse all', au: 'Quick search', K: model.cl}),
						$author$project$Component$Page$HomeView$latestAssets('Latest uploaded assets'),
						$author$project$Component$Form$submitStatus(model.ap),
						model.b3 ? A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Loading latest assets')
							])) : ($elm$core$List$isEmpty(model.aQ) ? A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-secondary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('No assets yet')
							])) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex flex-wrap justify-content-center gap-3')
							]),
						A2($elm$core$List$map, $author$project$Component$Page$HomeView$assetCard, model.aQ)))
					]))
			]));
};
var $author$project$Event$SubmitLogin = function (a) {
	return {$: 1, a: a};
};
var $author$project$Event$UpdateLoginField = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$Event$UpdateLoginSaveSession = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $author$project$Component$Form$formFluid = function (comps) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container-fluid mt-5')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('row justify-content-center px-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col-lg-3 col-md-6 col-sm-8 col-12 border mt-5 p-5 border-secondary rounded')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$form,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('form-dark')
									]),
								comps)
							]))
					]))
			]));
};
var $author$project$Model$Page$LoginModel$getPasswordError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 1) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$LoginModel$getUsernameError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (!e.$) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Component$Form$heading = function (h) {
	return A2(
		$elm$html$Html$h1,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3 text-center text-light mt-3')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(h)
			]));
};
var $author$project$Component$Form$lnk = F2(
	function (lab, hrf) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 text-center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-info'),
							$elm$html$Html$Attributes$href(hrf)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(lab)
						]))
				]));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $author$project$Component$Form$switch = F3(
	function (lab, val, onCheckMsg) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('form-check form-switch mb-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-check-input'),
							$elm$html$Html$Attributes$id('switchCheckDefault'),
							A2($elm$html$Html$Attributes$attribute, 'role', 'switch'),
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Attributes$checked(val),
							$elm$html$Html$Events$onCheck(onCheckMsg)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-check-label text-light'),
							$elm$html$Html$Attributes$for('switchCheckDefault')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(lab)
						]))
				]));
	});
var $author$project$Component$Page$LoginView$view = function (model) {
	return $author$project$Component$Form$formFluid(
		_List_fromArray(
			[
				$author$project$Component$Form$heading('Login'),
				$author$project$Component$Form$submitStatus(model.cD),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$LoginModel$getUsernameError(model.aI),
					s: 'Username',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateLoginField(0),
					bi: 'text',
					K: model.ax
				}),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$LoginModel$getPasswordError(model.aI),
					s: 'Password',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateLoginField(1),
					bi: 'password',
					K: model.Y
				}),
				A3($author$project$Component$Form$switch, 'Save session', model.a6, $author$project$Event$UpdateLoginSaveSession),
				A3(
				$author$project$Component$Form$submitButton,
				'Login',
				$author$project$Event$SubmitLogin(model),
				model.b5),
				A2($author$project$Component$Form$lnk, 'Don\'t have an account? Register!', '/register')
			]));
};
var $chandru89new$elm_lucide$LucideIcons$ghostIcon = function (options) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap($chandru89new$elm_lucide$LucideIcons$baseOptions, options),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M9 10h.01')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M15 10h.01')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z')
					]),
				_List_Nil)
			]));
};
var $author$project$Component$Page$NotFoundView$view = function (path) {
	return A2(
		$author$project$Component$Generic$container,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-5 text-light')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('not-found-surface border border-secondary rounded p-4 p-lg-5 text-center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('display-1 fw-bold mb-3')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('404')
							])),
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('display-6 mb-3 icon-text-center')
							]),
						_List_fromArray(
							[
								$chandru89new$elm_lucide$LucideIcons$ghostIcon(
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$class('me-2')
									])),
								$elm$html$Html$text('Page not found')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-secondary mb-4')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Requested path: /' + path)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex justify-content-center gap-2')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-info'),
										$elm$html$Html$Attributes$href('/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Back home')
									])),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-outline-light'),
										$elm$html$Html$Attributes$href('/browse')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Browse assets')
									]))
							]))
					]))
			]));
};
var $author$project$Event$SubmitRegister = function (a) {
	return {$: 6, a: a};
};
var $author$project$Event$UpdateRegisterField = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $author$project$Event$UpdateRegisterSaveSession = function (a) {
	return {$: 9, a: a};
};
var $author$project$Model$Page$RegisterModel$getEmailError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 1) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$RegisterModel$getPasswordAgainError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 3) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$RegisterModel$getPasswordError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (e.$ === 2) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Model$Page$RegisterModel$getUsernameError = function (errors) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filterMap,
			function (e) {
				if (!e.$) {
					var msg = e.a;
					return $elm$core$Maybe$Just(msg);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			errors));
};
var $author$project$Component$Page$RegisterView$view = function (model) {
	return $author$project$Component$Form$formFluid(
		_List_fromArray(
			[
				$author$project$Component$Form$heading('Register'),
				$author$project$Component$Form$submitStatus(model.cD),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$RegisterModel$getUsernameError(model.aI),
					s: 'Username',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateRegisterField(0),
					bi: 'text',
					K: model.ax
				}),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$RegisterModel$getEmailError(model.aI),
					s: 'Email',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateRegisterField(1),
					bi: 'email',
					K: model.bM
				}),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$RegisterModel$getPasswordError(model.aI),
					s: 'Password',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateRegisterField(2),
					bi: 'password',
					K: model.Y
				}),
				$author$project$Component$Form$formInput(
				{
					r: $author$project$Model$Page$RegisterModel$getPasswordAgainError(model.aI),
					s: 'Confirm password',
					aT: $elm$core$Maybe$Nothing,
					H: $author$project$Event$UpdateRegisterField(3),
					bi: 'password',
					K: model.ci
				}),
				A3($author$project$Component$Form$switch, 'Save session', model.a6, $author$project$Event$UpdateRegisterSaveSession),
				A3(
				$author$project$Component$Form$submitButton,
				'Register',
				$author$project$Event$SubmitRegister(model),
				model.co),
				A2($author$project$Component$Form$lnk, 'Already have an account? Login!', '/login')
			]));
};
var $author$project$Component$AppView$view = function (model) {
	return _List_fromArray(
		[
			$author$project$Component$Navbar$view(
			{
				S: model.S,
				aE: model.aE,
				bw: 'XastGE Resource Center',
				bU: '/assets/img/favicon.svg',
				b$: _List_fromArray(
					[
						_Utils_Tuple2('Home', '/'),
						_Utils_Tuple2('Browse', '/browse'),
						_Utils_Tuple2('About', '/about')
					])
			}),
			function () {
			var _v0 = model.ch;
			switch (_v0.$) {
				case 0:
					var home = _v0.a;
					return $author$project$Component$Page$HomeView$view(home);
				case 1:
					var browse = _v0.a;
					return $author$project$Component$Page$BrowseView$view(browse);
				case 2:
					return $author$project$Component$Page$AboutView$view;
				case 3:
					var login = _v0.a;
					return $author$project$Component$Page$LoginView$view(login);
				case 4:
					var register = _v0.a;
					return $author$project$Component$Page$RegisterView$view(register);
				case 5:
					var dashboard = _v0.a;
					var _v1 = model.S;
					if (!_v1.$) {
						return $author$project$Component$Page$DashboardView$invalidView('You must be logged in to view the dashboard.');
					} else {
						var userData = _v1.a;
						return A2($author$project$Component$Page$DashboardView$view, dashboard, userData);
					}
				case 6:
					var assetModel = _v0.a;
					return A2($author$project$Component$Page$AssetView$view, assetModel, model.S);
				case 7:
					var path = _v0.a;
					return $author$project$Component$Page$NotFoundView$view(path);
				default:
					var confirmModel = _v0.a;
					return $author$project$Component$Page$ConfirmView$view(confirmModel);
			}
		}()
		]);
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{
		bX: $author$project$Model$init,
		cd: $author$project$Event$UrlChange,
		ce: $author$project$Event$LinkClicked,
		cE: $elm$core$Basics$always($elm$core$Platform$Sub$none),
		cJ: $author$project$Update$update,
		cN: function (m) {
			return {
				ab: $author$project$Component$AppView$view(m),
				au: $author$project$Model$Route$getTitle(m.ct)
			};
		}
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (userData) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (backend) {
					return $elm$json$Json$Decode$succeed(
						{aE: backend, cM: userData});
				},
				A2(
					$elm$json$Json$Decode$field,
					'backend',
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
								A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
							]))));
		},
		A2(
			$elm$json$Json$Decode$field,
			'userData',
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
						A2(
						$elm$json$Json$Decode$map,
						$elm$core$Maybe$Just,
						A2(
							$elm$json$Json$Decode$andThen,
							function (username) {
								return A2(
									$elm$json$Json$Decode$andThen,
									function (token) {
										return A2(
											$elm$json$Json$Decode$andThen,
											function (role) {
												return A2(
													$elm$json$Json$Decode$andThen,
													function (email) {
														return A2(
															$elm$json$Json$Decode$andThen,
															function (confirmed) {
																return $elm$json$Json$Decode$succeed(
																	{bA: confirmed, bM: email, cs: role, h: token, ax: username});
															},
															A2($elm$json$Json$Decode$field, 'confirmed', $elm$json$Json$Decode$bool));
													},
													A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string));
											},
											A2($elm$json$Json$Decode$field, 'role', $elm$json$Json$Decode$string));
									},
									A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string));
							},
							A2($elm$json$Json$Decode$field, 'username', $elm$json$Json$Decode$string)))
					])))))(0)}});}(this));