export function noPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
}

export function range(n, offset, fill) {
  var a = [];
  offset = offset || 0
  while(n) {
      if(fill > -1) {
          a.push(fill);
          --n;
      } else {
          a.push(--n + offset);
      }
  }
  return a.reverse();
}

export function isElement(item) {
        return (item[0] || item).nodeType
}

export function isArray(obj) {
    return !!(obj && Array === obj.constructor);
}

export function foreach(arg, func) {
	if (isElement(arg)) {
	    for (var i = 0; i < arg.length; i++) {
	        if (isElement(arg[i]))
	            func.call(window, arg[i], i, arg);
	    }
	    return false;
	}

	if (!isArray(arg) && !this.isObject(arg))
	    var arg = [arg];
	if (isArray(arg)) {
	    for (var i = 0; i < arg.length; i++) {
	        func.call(window, arg[i], i, arg);
	    }
	} else if (this.isObject(arg)) {
	    for (var key in arg) {
	        func.call(window, arg[key], key, arg);
	    }
	}
}

export function attemptJson(str) {
    try {
        return JSON.parse(str);
    } catch (err) {
        return str;
    }
}
