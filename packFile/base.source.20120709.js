var CNZZ = {
		ADMAPP:{}
};
CNZZ.ADMAPP.Fn = {};
CNZZ.ADMAPP.adFloat = function(opt, host) {
	if (opt == "")
		return false;
	var loc,
	windowWidth,
	windowHeight,
	a = window,
	b = a.document,
	isIE6 = false,
	c = a.navigator.userAgent.toLocaleUpperCase(),
	u = Object.prototype.hasOwnProperty,o,qimg,qtext,s,t,m_x,m_y,l=0,bu=0,to=0,IEversion,_t = "",zcheight,
	ocheight,ex,wx;
	for (ex in opt)
		if (u.call(opt, ex)) {
			opt = opt[ex]
		}
	opt = opt||{};
	includeCSS("" + host + "/css/common.css");
	qimg = b.getElementById("floatdiv_imgclose_" + opt.id) || {};
	qtext = b.getElementById("floatdiv_textclose_" + opt.id) || {};
	m_x = parseInt(opt.margin_x) || 0;
	m_y = parseInt(opt.margin_y) || 0;
	o = b.getElementById("floatdiv_" + opt.id) || {};
	s = o.style || {};
	if(typeof o.style == 'undefined'){return false;}
	t = s.cssText || "";
	if (b.documentElement && b.documentElement.clientHeight) {
		windowHeight = b.documentElement.clientHeight;
		windowWidth = b.documentElement.clientWidth
	} else if (b.body && b.body.clientHeight) {
		windowHeight = b.body.clientHeight;
		windowWidth = b.body.clientWidth
	}
	if (/MSIE ([^;]+)/.test(c)) {
		IEversion = parseInt(RegExp["$1"]);
		if (IEversion <= 6) {
			isIE6 = true
		}
	}
	switch (opt.position) {
	case ("rightbottom"):
		loc = {
			right : m_x + "px",
			bottom : m_y + "px"
		};
		break;
	case ("leftbottom"):
		loc = {
			left : m_x + "px",
			bottom : m_y + "px"
		};
		break;
	case ("lefttop"):
		loc = {
			left : m_x + "px",
			top : m_y + "px"
		};
		break;
	case ("righttop"):
		loc = {
			right : m_x + "px",
			top : m_y + "px"
		};
		break;
	case ("middle"):
		l = windowWidth / 2 - $(this).width() / 2;
		to = windowHeight / 2 - $(this).height() / 2;
		loc = {
			left : l + "px",
			top : to + "px"
		};
		break;
	case ("bottom"):
		l = windowWidth / 2 - $(this).width() / 2;
		loc = {
			left : l + "px",
			bottom : bu + "px"
		};
		break;
	default:
		loc = {
			right : m_x + "px",
			bottom : m_y + "px"
		};
		break
	}
	if (opt.isfixed == '1') {
		t += ";z-index:9999;position:fixed;"
	} else {
		t += ";z-index:9999;position:absolute;"
	}
	if (loc.valueOf() == "")
		return false;
	for (wx in loc)
		t += wx + ":" + loc[wx] + ";";
	o.style.cssText = t;
	if (isIE6) {
		o.style.position = "absolute";
		window.attachEvent('onscroll', function () {
			zcheight = b.documentElement.clientHeight;
			ocheight = o.offsetHeight;
			if (opt.position == "rightbottom" || opt.position == "leftbottom") {
				_t = zcheight - ocheight - m_y;
			} else {
				_t = m_y;
			}
			o.style.top = ((b.body.scrollTop || b.documentElement.scrollTop) + _t) + 'px';
		});
		window.attachEvent('onresize', function () {
			zcheight = b.documentElement.clientHeight;
			ocheight = o.offsetHeight;
			if (opt.position == "rightbottom" || opt.position == "leftbottom") {
				_t = zcheight - ocheight - m_y;
			} else {
				_t = m_y;
			}
			o.style.top = ((b.body.scrollTop || b.documentElement.scrollTop) + _t) + 'px';
		})
	}
	t = '';
	if (opt.time != 0) {
		setTimeout('document.getElementById("floatdiv_' + opt.id + '").style.display="none"', opt.time)
	}
	ln(qimg, "click", soltshutdown);
	ln(qtext, "click", soltshutdown);
	function ln(a, b, c) {
		if (a.addEventListener) {
			a.addEventListener(b, c, false)
		} else if (a.attachEvent) {
			a.attachEvent("on" + b, c)
		} else {
			a["on" + b] = c
		}
	}
	function soltshutdown() {
		var a = b.getElementById("floatdiv_" + opt.id) || {};
		a.style.display = 'none'
	}
	function includeCSS(filename) {
		var ref = document.createElement("link");
		ref.setAttribute("rel", "stylesheet");
		ref.setAttribute("type", "text/css");
		ref.setAttribute("href", filename);
		if (typeof ref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(ref)
		}
	}
};
CNZZ.ADMAPP.adIframe = function(i,n,w,h,u){
	var divid = i+Math.floor(Math.random()*10000);
	document.write('<div id="'+divid+'" style="border:none;margin:0px;padding:0px;width:'+w+'px;height:'+h+'px;overflow:hidden;z-index:99999;"></div>');
	var _c = document.createElement("IFRAME");
	_c.id=i;
	_c.name=n;
	if(-1 != w ){
		_c.width = w;
	}
	if(-1 != h){
		_c.height = h;
	}
	_c.vspace=0;
	_c.hspace=0;
	_c.allowTransparency="true";
	_c.scrolling="no";
	_c.marginWidth=0;
	_c.marginHeight=0;
	_c.frameBorder=0;
	_c.style.border="0px";
	_c.style.display="block";
	var _t = document.getElementById(divid);
	_t.insertBefore(_c,_t.firstChild);
	var _x = _c.contentWindow.document;
	_x.write(u);
	window.setTimeout(function(){_x.close();},500);
};
CNZZ.ADMAPP.REAL = function(elemid, url){
	var fn = this.Fn;
	fn.realShow(elemid, url);
};
CNZZ.ADMAPP.Fn.timerArray = [];
CNZZ.ADMAPP.Fn.urlArray = [];
CNZZ.ADMAPP.Fn.isloadArray = [];
CNZZ.ADMAPP.Fn._getPageHeight = function(){
	var clientHeight = 0,bodyCheight = 0,docECheight = 0;
	if (document.body.clientHeight) {
		bodyCheight = document.body.clientHeight;
	}
	if (document.documentElement.clientHeight) {
		docECheight = document.documentElement.clientHeight;
	}
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = (bodyCheight < docECheight) ? bodyCheight : docECheight;
	} else {
		clientHeight = (bodyCheight > docECheight) ? bodyCheight : docECheight;
	}
	return clientHeight;
};
CNZZ.ADMAPP.Fn._getPageAllHeight = function () {
	var iHeight = 0;
	if (document.body.scrollHeight || document.documentElement.scrollHeight) {
		iHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	} else {
		return false;
	}
	return iHeight;
};
CNZZ.ADMAPP.Fn._reachBottom = function () {
	var scrollTop = 0,clientHeight = this._getPageHeight(),iHeight = this._getPageAllHeight();
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	if ((scrollTop > 0) && (scrollTop + clientHeight == iHeight)) {
		return true;
	} else {
		return false;
	}
};
CNZZ.ADMAPP.Fn._getElementLoc = function(elemid){
	var ua = navigator.userAgent.toLowerCase(),elem = document.getElementById(elemid),parentNode = '',PageXY = [],box,scrollTop,scrollLeft,borderLeft,borderTop;;
	if (elem.parentNodeNode === null || elem.style.display == 'none') {
		return false
	}
	if (elem.getBoundingClientRect) {
		box = elem.getBoundingClientRect();
		scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		return {
			x : box.left + scrollLeft,
			y : box.top + scrollTop
		}
	} else if (document.getBoxObjectFor) {
		box = document.getBoxObjectFor(elem);
		borderLeft = (elem.style.borderLeftWidth) ? parseInt(elem.style.borderLeftWidth) : 0;
		borderTop = (elem.style.borderTopWidth) ? parseInt(elem.style.borderTopWidth) : 0;
		PageXY = [box.x - borderLeft, box.y - borderTop]
	} else {
		PageXY = [elem.offsetLeft, elem.offsetTop];
		parentNode = elem.offsetParent;
		if (!parentNode == elem) {
			while (parentNode) {
				PageXY[0] += parentNode.offsetLeft;
				PageXY[1] += parentNode.offsetTop;
				parentNode = parentNode.offsetParent
			}
		}
		if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && elem.style.PageXYition == 'absolute')) {
			PageXY[0] -= document.body.offsetLeft;
			PageXY[1] -= document.body.offsetTop
		}
	}
	if (elem.parentNodeNode) {
		parentNode = elem.parentNodeNode
	} else {
		parentNode = null
	}
	while (parentNode && parentNode.tagName != "BODY" && parentNode.tagName != "HTML") {
		PageXY[0] -= parentNode.scrollLeft;
		PageXY[1] -= parentNode.scrollTop;
		if (parentNode.parentNodeNode) {
			parentNode = parentNode.parentNodeNode
		} else {
			parentNode = null
		}
	}
	return {
		x : PageXY[0],
		y : PageXY[1]
	}
};
CNZZ.ADMAPP.Fn._addLoadEvent = function(func, params, paramurl) {
	var oldonload = window.onload,that = this;
	if (typeof window.onload != "function") {
		window.onload = func(params, paramurl,that)
	} else {
		window.onload = function () {
			oldonload();
			func(params, paramurl,that)
		}
	}
};
CNZZ.ADMAPP.Fn.realShow = function(elemid, url) {
	var fun = window.onload,sendHttp;
	if (typeof fun != "function")
		window.onload = function () {};
	sendHttp = this._scrollSendhttp;
	this._addLoadEvent(sendHttp, elemid, url)
};
CNZZ.ADMAPP.Fn._scrollSendhttp = function (elemid, url,that) {
	var fn = that,func,iIntervalId,iTop = document.documentElement.scrollTop + document.body.scrollTop,clientHeight = fn._getPageHeight(),flag = fn._reachBottom(),pageXY = fn._getElementLoc(elemid),pageY = pageXY.y,elems = document.getElementById(elemid),isdisplay = elems.style.display;;
	if (pageXY == false) {
		return false
	}
	fn.urlArray[elemid] = url;
	if (isdisplay == 'none') {
		return false
	}
	if (fn.isloadArray[elemid] != true) {
		if ((iTop + clientHeight) > parseInt(pageY * 0.99) || flag) {
			elems.setAttribute("src", url);
			fn.isloadArray[elemid] = true;
		} else {
			func = fn._onScroll;
			iIntervalId = setInterval("CNZZ.ADMAPP.Fn._onScroll('"+elemid+"')", 2000);
			fn.timerArray[elemid] = iIntervalId;
			fn.isloadArray[elemid] = false;
		}
	}
};
CNZZ.ADMAPP.Fn._onScroll = function (elemid,that) {
	var fn = CNZZ.ADMAPP.Fn,pageY,elementObj,iTop = document.documentElement.scrollTop + document.body.scrollTop,clientHeight = fn._getPageHeight(),flag = fn._reachBottom(),pageXY = fn._getElementLoc(elemid);
	if (pageXY == false || fn.isloadArray[elemid]) {
		return false
	}
	pageY = pageXY.y;
	elementObj = document.getElementById(elemid);
	if ((iTop + clientHeight) > parseInt(pageY * 0.99) || flag) {
		clearInterval(fn.timerArray[elemid]);
		elementObj.src = fn.urlArray[elemid];
		fn.isloadArray[elemid] = true;
		return false
	} else {
		fn.isloadArray[elemid] = false
	}
};