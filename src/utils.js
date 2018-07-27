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

export function formatBytes(bytes) {
    var kb = 1024;
    var ndx = Math.floor(Math.log(bytes) / Math.log(kb));
    var fileSizeTypes = [
        "bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
    ];

    return {
        size: + (bytes / kb / kb).toFixed(2),
        type: fileSizeTypes[ndx],
        human: + (bytes / kb / kb).toFixed(2) + fileSizeTypes[ndx]
    }
}

export function simpleMimeType(type) {
    const mimeTypes = {
        'jpeg': 'jpg',
        'jpg': 'jpg',
        'svg+xml': 'svg',
        'vnd.ms-powerpoint': 'ppt',
        'x-rar-compressed': 'rar',
        '/x-tar': 'tar',
        'typescript': 'ts',
        'x-icon': 'ico',
        'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'msword': 'doc',
        'plain': 'txt',
        'vnd.adobe.photoshop': 'psd',
        'x-iwork-keynote-sffkey': 'key'
    }
    return mimeTypes[type] || type
}

export function injectStyle(styles, id) {
    //if styles exists do nothing
    if (document.getElementById(id)) 
        return;
    let tag = document.createElement('style');
    tag.type = 'text/css';
    tag.id = id;
    if (tag.styleSheet) {
        tag.styleSheet.cssText = styles;
    } else {
        tag.appendChild(document.createTextNode(styles));
    }
    document.getElementsByTagName('head')[0].appendChild(tag);

}