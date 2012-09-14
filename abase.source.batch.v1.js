(function (window) {
	/**
	 * 注册域内函数到window
	 * @name FnRegister
	 * @function
	 * @example
	 */
	function FnRegister(funstring, fn) {
		funstring = funstring;
		return w[funstring] ? w[funstring] : w[funstring] = fn
	}
	/**
	 * 接收整理参数
	 * @name parseParams
	 * @function
	 * @example
	 */
	function parseParams(id,jsondata) {
		var data;
		if(!!id){
			data = jsondata;
		}else{
			for(var singleId in jsondata ){};
			data = jsondata[singleId] || "";
		}
		return data ? {
			id : id||singleId,
			af : data.af || false,
			did : data.aid || 0,
			slotType : data.stype,
			isbefore : data.pop || 0,
			htmlcode : data._html || 0,
			width : data._w || 0,
			height : data._h || 0,
			done : false,
			isflash : IsFlash() || false,
			stime : data.time * 1000 || 5000,
			ptime : data.parktime * 1000 || 0,
			loadtime : data.loadtime * 1000 || 0,
			closePosition : data.cb || 0,
			scroll : data.sc || 0,
			position : data.pos || 0,
			mleft : data._m_left || 0,
			mtop : data._m_top || 0,
			ip : data.ip,
			isiframe : data.isiframe || false,
			cc : data.cc,
			ht : data.ht,
			turl : data.turl || '',
			framesrc : ""
		}
		 : null
	}
	/**
	 * 代理渲染方法
	 * @name _adShow
	 * @function
	 * @example
	 */
	function _adShow(id) {
		if(!!id){
			if(isbatch["b_"+id]){
				single_batch(id);
			}else{
				id = parseInt(id);
				var url = urlSet(id);
				document.write('<a id="cnzz_adm_anchor_'+id+'" style="display:none!important"></a>');
				__loadScript(url);
				//d.write('<script type="text/javascript" charset="gbk" src="' + url + '"><\/scr'+'ipt>');
			}
		}
		return false;
	}
	//do batch
	function do_batch(batchid){
		if(batchid==''){
			return false;
		}
		var url = urlSet(batchid,"batch");
		__loadScript(url);
		//d.write('<script type="text/javascript" charset="gbk" src="' + url + '"><\/scr'+'ipt>');
		return false;
	}
	//add function
	function add_batch(jsondata){
		if(!!!jsondata)return false;
		for(var id in jsondata){
			if(!!!jsondata[id])continue;
			isbatch["b_"+id] = true;
			batchs["batch_"+id] = jsondata[id];
		}
	}
	//single do function
	function single_batch(id){
		if(!!!batchs){return false;}
		var jsondata = batchs["batch_"+id];
		_renderSlot(jsondata,id);
	}
	/**
	 * 渲染函数
	 * @name _renderSlot
	 * @function
	 * @example
	 */
	function _renderSlot(jsondata,id) {
		if (!!!jsondata) {
			return false
		}
		var slotid,
		poss,
		po;
		slotid = id || "";
		options = parseParams(slotid,jsondata);
		if(!options){
			return false;
		}
		
		iswritable = (typeof iswritable == 'undefined') ? iframeWritable() : iswritable;
		if (!!options.position) {
			po = options.position;
			poss = po.split("-");
			options.fleft = (poss[0] == "left");
			options.ftop = (poss[1] == "up")
		}
		switch (options.slotType) {
		case ("1"):
			ADS.__showFixed();
			break;
		case ("2"):
			ADS.__showFloat();
			break;
		case ("3"):
			ADS.__showPop();
			break
		}
	}
	/**
	 * 展现广告
	 * @name ADS
	 * @function
	 * @example
	 */
	var ADS = {
		__showFixed : function () {
			var a=options,iframecode,htmlinfo=options.htmlcode,codes,iframeHtml = __iframeset() || "",anchor;
			anchor = d.getElementById("cnzz_adm_anchor_"+a.id);
			iframeHtml = '<div id="cnzz_slot_' + a.id + '" style="'
			+(((a.width != -1)&&"width:"+a.width+"px;")|| "")
			+(((a.height != -1)&&"height:"+a.height+"px;")|| "")
			+'border:none;margin:0px;padding:0px;' 
			+ (iframeHtml ? "" : "background-color:#FFFFFF;") 
			+ 'overflow:hidden;" >' + iframeHtml + '</div>';
			__insertHtml(iframeHtml,anchor);
			if(!anchor){
				if(!iframeHtml){
					iframecode = '<div id="cnzz_slot_' + a.id + '" style="width:' 
					+ a.width + 'px;height:' + a.height 
					+ 'px;border:none;margin:0px;padding:0px;background-color:#FFFFFF;overflow:hidden;" ></div>';
					document.write(iframecode);
					return false;
				}
				if(htmlinfo.type == "rich"){
					if(htmlinfo.fromtype){
						iframecode = '<div id="cnzz_slot_' + a.id + '" style="'
						+(((a.width != -1)&&"width:"+a.width+"px;")|| "")
						+(((a.height != -1)&&"height:"+a.height+"px;")|| "")
						+'border:none;margin:0px;padding:0px;' 
						+ (iframeHtml ? "" : "background-color:#FFFFFF;") 
						+ 'overflow:hidden;" >' + iframeHtml + '</div>';
					}
					iframecode = iframeHtml;
					if(!a.isiframe){
						document.write(iframecode);
						return false;
					}
				}
				if( a.width == -1 || a.height == -1){
					iframecode = '<div id="cnzz_slot_' + a.id + '" style="'
					+(((a.width != -1)&&"width:"+a.width+"px;")|| "")
					+(((a.height != -1)&&"height:"+a.height+"px;")|| "")
					+'border:none;margin:0px;padding:0px;overflow:hidden;" >' 
					+ iframeHtml + '</div>';
					document.write(iframecode);
					return false;
				}
				iframecode = '<div id="cnzz_slot_' + a.id + '" style="width:' + a.width 
				+ "px;height:" + a.height + "px;border:none;margin:0px;padding:0px;" 
				+ (iframeHtml ? "" : "background-color:#FFFFFF;") + 'overflow:hidden;" >' 
				+ iframeHtml + '</div>';
				document.write(iframecode);
				if (browser.ie && iframeHtml) {
					cnzz_RenderIFrame(a.id);
				}
			}
			return false;
		},
		__showFloat : function () {
			var a = options,
			iframecode,
			style_p = "",
			closebutton,
			IE6Element,
			styleinfo=0,tt,_floatConfig,_m1=0,_m2=0;
			mybody = mybody || d.body;
			if (d.body) {
				iframeHtml = __iframeset() || "";
				if (iframeHtml == "") {
					return false;
				}
				a.position = a.position || "right-down";
				_floatConfig = a.position.split("-");
				_m1 = a.mleft || 0;
				_m2= a.mtop || 0;
				for(var p in _floatConfig){
					var floatInfos = _floatConfig[p];
					if(p==0){
						if(floatInfos=="left"){
							style_p = "left:" + (_m1) + "px;";
						}else if(floatInfos=="right"){
							style_p = "right:" + (_m1) + "px;";
						}else if(floatInfos=="center"){
							_m1 = (mybody.clientWidth-a.width)/2;
							if(_m1 < 0){
								_m1 =0;
							}
							style_p = "left:" + (_m1) + "px;";
						}
					}else if(p==1){
						if(floatInfos=="up"){
							styleinfo = parseInt(a.mtop);
							style_p += "top:" + (_m2) + "px;";
						}else if(floatInfos=="down"){
							style_p += "bottom:" + (_m2) + "px;";
						}else if(floatInfos=="center"){
							_m2 = (mybody.clientHeight-a.height-22)/2;
							if(_m2 < 0){
								_m2 = 0;
							}
							styleinfo = _m2;
							style_p += "top:" + (_m2) + "px;";
						}
					}
				}
				/**
				//构建三种节点
				*/
				var outerContentDiv = d.createElement("div"),closeDiv = d.createElement("div"),innerContentDiv = d.createElement("div"),closeSpan = d.createElement("span");
				outerContentDiv.id="cnzz_float_" + a.id;
				
				outerContentDiv.style.cssText = "width:" + (a.width || 0) + "px;" 
				+ ((a.scroll == 1) ? "position:fixed;" : "position:absolute;") 
				+ style_p 
				+"z-index:2147483647;overflow:hidden;";
				outerContentDiv.style.border = "1px solid #E5E5E5";
				outerContentDiv.style.background = "#FFFFFF";
				innerContentDiv.innerHTML = iframeHtml;
				innerContentDiv.style.cssText = "height:" + (a.height || 0) 
				+ "px;z-index:2147483646;overflow:hidden;";
				//插入内容节点
				
				outerContentDiv.appendChild(innerContentDiv);
				//构建关闭按钮节点
				closeDiv.style.cssText = "width:" + (a.width || 0) + "px;height:18px;z-index:2147483647;";
				closeDiv.style.background = "#F2F2F2";
				closeSpan.id = "closebutton_" + a.id;
				closeSpan.style.cssText = "width:45px;height:18px;cursor:pointer;";
				closeSpan.onclick= function(){this.parentNode.parentNode.style.display='none';return false;};
				if(a.closePosition.charAt(0) == "l"){
					closeSpan.style.cssText += ";float:left;background:url(" + rootDomain + "/js/cbutton1.gif) no-repeat;background-position:center;";
				}else if(a.closePosition.charAt(0) == "r"){
					closeSpan.style.cssText += ";float:right;background:url(" + rootDomain + "/js/cbutton2.gif) no-repeat;background-position:center;";
				}
				closeDiv.appendChild(closeSpan);
				if(a.closePosition.charAt(1) == "t"){
					closeDiv.style.borderBottom = "1px solid #E5E5E5";
					outerContentDiv.insertBefore(closeDiv,outerContentDiv.firstChild);
				}else if(a.closePosition.charAt(1) == "b"){
					closeDiv.style.borderTop = "1px solid #E5E5E5";
					outerContentDiv.appendChild(closeDiv);
				}
				d.body.insertBefore(outerContentDiv, d.body.firstChild);
				
				/*iframecode = '<div id="cnzz_float_' + a.id + '" style="width:' + (a.width || 0) + "px;" + ((a.scroll == 1) ? "position:fixed;" : "position:absolute;") + style_p + 'border:1px solid #E5E5E5;z-index:9999;overflow:hidden;background-color:#FFFFFF;">' + ((a.closePosition.charAt(1) == "t") ? '<div style="width:' + (a.width || 0) + 'px;height:18px;border-bottom: 1px solid #E5E5E5;background:#F2F2F2;" ><span id="closebutton_' + a.id + '" onclick="this.parentNode.parentNode.style.display=\'none\';return false;" style="width:45px;height:18px;' + ((a.closePosition.charAt(0) == "l") ? "float:left;background:url(" + rootDomain + "/js/cbutton1.gif) no-repeat;background-position:center;" : "float:right;background:url(" + rootDomain + "/js/cbutton2.gif) no-repeat;background-position:center;") + 'cursor:pointer;"></span></div>' : "") + '<div style="height:' + (a.height || 0) + 'px;z-index:9999;overflow:hidden;">' + iframeHtml + "</div>" + ((a.closePosition.charAt(1) == "b") ? '<div style="width:' + (a.width || 0) + 'px;height:18px;border-top: 1px solid #E5E5E5;background:#F2F2F2;" ><span id="closebutton_' + a.id + '" onclick="this.parentNode.parentNode.style.display=\'none\';return false;" style="width:45px;height:18px;' + ((a.closePosition.charAt(0) == "r") ? "float:right;background:url(" + rootDomain + "/js/cbutton2.gif) no-repeat;background-position:center;" : "float:left;background:url(" + rootDomain + "/js/cbutton1.gif) no-repeat;background-position:center;") + 'cursor:pointer;"></span></div>' : "") + "</div>";
				d.write(iframecode);*/
				IE6Element = outerContentDiv || d.getElementById("cnzz_float_" + a.id);
				closebutton = closeSpan || d.getElementById("closebutton_" + a.id) || {};
				if (a.ptime != 0) {
					setTimeout(function () {
						IE6Element.style.display = "none";
					}, a.ptime)
				}
				if (browser.ie && browser.version == 6 && a.scroll == 1) {
					IE6Element.style.position = "absolute";
					if(_floatConfig[1] == "down"){
						styleinfo = d.documentElement.clientHeight - (IE6Element.offsetHeight || (parseInt(a.height) + 21)) - a.mtop;
					}
					var defaultTop = ((d.body.scrollTop + d.documentElement.scrollTop)),nowTop;
					w.attachEvent("onscroll", function () {
						tt && clearTimeout(tt);
						nowTop = ((d.body.scrollTop + d.documentElement.scrollTop));
						tt = setTimeout(function(){
							var topLength = Math.abs(nowTop-defaultTop);
							IE6Element.style.top = (nowTop+styleinfo)+"px";
						},100);
					});
					w.attachEvent("onresize", function () {
						IE6Element.style.top = ((d.body.scrollTop + d.documentElement.scrollTop) + styleinfo) + "px"
					});
				};
				if (browser.ie && iframeHtml) {
					cnzz_RenderIFrame(a.id)
				}
			} else {}
			iframeHtml = null;
			return false;
		},
		__showPop : function () {
			var a = options,
			iframeHtml = __adHolder() || "",
			loadDialog;
			if (iframeHtml == "") {
				return false
			}
			(iframeHtml.indexOf("<body>") < 0) && (iframeHtml = "<!DOCTYPE html><body style='padding:0px;margin:0px;background-color: transparent;'>" + iframeHtml);
			loadDialog = function (admX, admY, admXm, admYm, admStime, w_w, w_h, iframeHtml) {
				var window_width = w_w || 0,
				window_height = w_h || 0,
				loadWindow,
				ulwc;
				if (admX == "right") {
					admXm = screen.width - window_width - admXm
				}
				if (admY == "down") {
					admYm = screen.height - window_height - admYm - 100
				}
				try {
					loadWindow = w.open("about:blank", "CNPOP" + +new Date, "width=" + window_width + ",height=" + window_height + ",left=" + admXm + ",top=" + admYm + ",toolbar=no,Location=no,status=no,titlebar=no,alwaysRaised=yes,menubar=no,resizable=no");
					if (!!loadWindow.document) {
						ulwc = loadWindow.document;
						ulwc.open("text/html", "replace");
						ulwc.write(iframeHtml);
						ulwc.close();
						loadWindow.focus();
						if (!!ulwc.body) {
							ulwc.body.style.fontSize = "12px";
							ulwc.body.style.padding = 0;
							ulwc.body.style.margin = 0
						}
						0 < admStime && setTimeout(function () {
							loadWindow && loadWindow.close()
						}, admStime)
					}
				} catch (m) {
					return false
				}
				return false
			};
			var position = a.position.split("-"),
			left = position[0] || "left",
			up = position[1] || "up";
			if (a.isbefore == "1") {
				setTimeout(function () {
					loadDialog(left, up, a.mleft, a.mtop, a.ptime, a.width, a.height, iframeHtml)
				}, a.loadtime)
			} else {
				if (w.addEventListener) {
					w.addEventListener("unload", function () {
						loadDialog(left, up, a.mleft, a.mtop, a.ptime, a.width, a.height, iframeHtml)
					}, 0)
				} else {
					w.attachEvent("onunload", function () {
						loadDialog(left, up, a.mleft, a.mtop, a.ptime, a.width, a.height, iframeHtml)
					})
				}
			}
			return false
		}
	};
		
	/**
	 * 写入html
	 * @name __insertHtml
	 * @function
	 * @param	String html
	 * @param	Object anchor
	 * @param	Object other
	 * @param	callback Function
	 * */
	function __insertHtml(html,anchor,other,callback){
		if (anchor) {
			window.setTimeout((function () {
				anchor.insertAdjacentHTML("beforebegin", html);
					if (typeof callback == "function") {
						callback();
					}
				}), 0);
		} else {
			if (other) {
				window.setTimeout((function () {
						other.insertAdjacentHTML("afterbegin", html);
						if (typeof callback == "function") {
							callback();
						}
					}), 0);
			} else {
				document.write(html);
				if (typeof callback == "function") {
					callback();
				}
			}
		}
	}
	/**
	 * 构建iframe，渲染ad
	 * @name __iframeset
	 * @function
	 * @example
	 */
	function __iframeset() {
		var id = options.id || "",
		htmlinfo = options.htmlcode,
		framesrc = options.framesrc || "about:blank",
		codes,
		fwidth = options.width,
		fheight = options.height,
		sshtml = __adHolder() || null,iframecode='<iframe id=cnzz_iframe_' + id + ' src="' + framesrc + '" onload="cnzz_RenderIFrame(' + id + ')" ' + ((fwidth==-1) ? '' : 'width='+fwidth) + " " + ((fheight==-1)?'':'height='+fheight) + ' vspace="0" hspace="0" allowTransparency="true" scrolling="no" marginHeight="0" marginWidth="0" frameborder="0" style="padding:0px;border:0;vertical-align:bottom;margin:0px;display:block;"></iframe>';
		if(!sshtml){return sshtml;}
		holderArray["h_"+id] = sshtml;
		if(options.slotType=='2'){
			if(htmlinfo.type == "rich"){
				sshtml = iframecode;
			}
		}else if(options.slotType=='1'){
			if(htmlinfo.type == "rich"){
				sshtml = iframecode;
			}
		}
		return sshtml;
	}
	/**
	 * 执行渲染
	 * @name cnzz_RenderIFrame
	 * @function
	 * @param	String id
	 */
	function cnzz_RenderIFrame(id) {
		var Oiframe = d.getElementById("cnzz_iframe_" + id) || "",
		htmlcode,needclose=true;
		if(browser.ie || browser.opera){
			needclose=false;
		}
		if (!Oiframe) {
			return false;
		}
		htmlcode = holderArray["h_"+id] || "";
		if (!htmlcode) {
			return false;
		}
		if (!options["done_"+id]) {
			if (iswritable) {
				try {
					var frameContent = Oiframe.contentWindow.document;
					(htmlcode.indexOf("<body>") < 0) && (htmlcode = "<!DOCTYPE html><body style='padding:0px;margin:0px;background-color: transparent;'>" + htmlcode);
					frameContent.open("text/html", "replace");
					frameContent.write(htmlcode);
					needclose && frameContent.close();
					options["done_"+id] = true;
					return true;
				} catch (e) {
					if(browser.ie){
						options["done_"+id] = true;
						Oiframe.src = "javascript:void((function(){document.open();document.domain='"+ document.domain + "';document.close()})())";
						var frameContent = Oiframe.contentWindow.document;
						(htmlcode.indexOf("<body>") < 0) && (htmlcode = "<!DOCTYPE html><body style='padding:0px;margin:0px;background-color: transparent;'>" + htmlcode);
						frameContent.open("text/html", "replace");
						frameContent.write(htmlcode);
						needclose && frameContent.close();
						return true;
					}
					return false;
				}
			}
		}
		return false;
	}
	/**
	 * 根据不同的物料类型返回html
	 * @name __adHolder
	 * @function
	 * @example
	 */
	function __adHolder() {
		var mtype,
		tongjipont,
		htmlcode,
		html = options.htmlcode || "",
		mid;
		if (!html) {
			return ""
		}
		mtype = (html.type || null) || (html.length ? "slide" : null);
		switch (mtype) {
		case ("text"):
			if (html.content) {
				htmlcode = html.content;
				mid = html.id;
			}
			break;
		case ("image"):
			if (html.src) {
				htmlcode = '<a href="' + html.href + '" target="' + html.target + '"><img src="' + html.src + '" ' + (html.width ? "width=" + html.width : "") + " " + (html.height ? "height=" + html.height : "") + " border=0 "+(html.title?'title="'+html.title+'"':'')+" /></a>";
				mid = html.id;
			}
			break;
		case ("flash"):
			if (html.src) {
				htmlcode = __SetFlash(html);
				mid = html.id;
			}
			break;
		case ("rich"):
			if (html.content) {
				htmlcode = html.content;
				mid = html.id;
			}
			break;
		case ("slide"):
			html = eval(html);
			if (html.length) {
				var point,
				h,
				childmid = [],
				htmlcode = '<div id="cnzz_slide_' + options.id + '" onmouseover="clearInterval(rollId)" onmouseout="showAtTime()">';
				for (var o in html) {
					h = html[o];
					if(typeof h=="string"){
						h = eval("[" + h + "]");
						h = h[0];
						childmid[o] = h.id;
						htmlcode += "<div " + (o != 0 ? 'style="display:none;"' : "") 
						+ '><a href="' + h.href + '" target="' + h.target + '" '
						+(h.type == "text" ? ('style="'+(h.color==undefined?'':'color:'+h.color+';')
						+(h.font==undefined ? '':'font-size:'+h.font+'px;')+'"') :'')+'>' 
						+ ((h.type == "text") ? (h.text) : ((h.type == "image") ? "<img width=" 
						+ h.width + " height=" + h.height + " src='" + h.src + "' border=0 />" : null)) 
						+ "</a></div>"
					}else{
						childmid[o] = h.id;
						htmlcode += "<div " + (o != 0 ? 'style="display:none;"' : "") + ">";
						if(h.content){
							htmlcode += h.content;
						}else if(h.src){
							htmlcode += '<a href="' + h.href + '" target="' 
							+ h.target + '"><img src="' + h.src + '" ' 
							+ (h.width ? "width=" + h.width : "") + " " 
							+ (h.height ? "height=" + h.height : "") 
							+ " border=0 "+(h.title?'title="'+h.title+'"':'')+" /></a>";
						}
						htmlcode += "</div>";
					}
					if (!h.type) {
						continue;
					}
				}
				htmlcode += "</div><script>var defaultNum=0,slidetime = " + options.stime + ';var rollId=setInterval(showPushLink,slidetime);function G(x){return document.getElementById(x);}function showAtTime(){showPushLink();rollId=setInterval(showPushLink,slidetime);}function showPushLink(){var num,cnode,clength,pnode = G("cnzz_slide_' + options.id + '");cnode = pnode.childNodes;clength = cnode.length;defaultNum++;if(defaultNum>clength-1) defaultNum=0;num=defaultNum;for(var i=0;i<clength;i++){if(num != i){cnode[i].style.display = "none";}else{cnode[num].style.display = "";}}}<\/script>'
			}
			mid = childmid.join(",");
			htmlcode = htmlcode || "";
			break
		}
		if (options.af) {
			tongjipont = options.ht + "/stat.gif?sid=" + options.id + "&aid=" + options.did + "&mid=" + mid + "&ip=" + options.ip + "&cookie=" + options.cc + "&time=" + +new Date + "&referer=" + encodeURIComponent(d.referrer) + "&href=" + encodeURIComponent(d.location);
			if (htmlcode) {
				htmlcode = htmlcode + '<img src="' + tongjipont + '" border=0 width=0 height=0 style="float:left;" />';
				if(options.turl){
					htmlcode = htmlcode+'<img src="' + options.turl + '" border=0 width=0 height=0 style="float:left;" />';
				}
			}
		}
		return htmlcode;
	}
	/**
	 * 设置url
	 * @name urlSet
	 * @function
	 * @example
	 */
	function urlSet(id,batch) {
		if (!id) {
			return false
		}
		var url,ids,
		customOion = GetOrientation(),
		s_width = screen.width,
		s_height = screen.height,
		adm_client_referer = d.referrer,
		adm_client_url = d.location.toString(),
		adm_client_domain = "";
		if (adm_client_url.match(/http:\/\/.+/)) {
			adm_client_url = encodeURIComponent(adm_client_url);
		}else{
			adm_client_url = "";
		}
		if (adm_client_referer != "") {
			var adm_client_reg = /(\w+):\/\/([^\/:]+)(:\d*)?([^#]*)/;
			var adm_client_Array = adm_client_referer.match(adm_client_reg);
			adm_client_domain = adm_client_Array[2]
		}
		if(!!batch){
			ids = id.split(",");
			url = rootDomain+"/batch.php?batchid="+id
			+"&fn=CNZZ_ADD_BATCH" + "&showp=" + s_width +"x"+s_height;
		}else{
			url = rootUrl+"?sid=" + id
			+"&fn=CNZZ_AD_RSLOT"
			+ "&width=" + s_width
			+ "&height=" + s_height + customOion;
		}
		url = url
		+ "&browser=" + browser.name
		+ "&time=" + +new Date
		+ "&domain=" + adm_client_domain
		+ "&referer=" + encodeURIComponent(adm_client_referer)
		+ "&href=" +(adm_client_url);
		return url
	}
	/**
	 * 载入脚本文件
	 * @name __loadScript
	 * @function
	 * @param	String url
	 * */
	function __loadScript(url) {
		if(!url){return false;}
		var s = document.createElement('script');
		s.charset = "gbk";
		s.async = !0;
		s.src = url;
		document.body.insertBefore(s, document.body.firstChild);
	}
	/**
	 * 包装flash
	 * @name __SetFlash
	 * @function
	 * @param	JSON flashinfo
	 */
	function __SetFlash(flashinfo) {
		if (!flashinfo) {
			return null
		}
		var flashcode = "",flashMode;
		if (options.isflash) {
			flashMode = (flashinfo.wmode==1)?'transparent':'opaque';
			flashcode = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + flashinfo.width + '" height="' + flashinfo.height + '" align="middle"><param name="allowScriptAccess" value="always"><param name="quality" value="high"><param name="wmode" value="'+flashMode+'"><param name="movie" value="' + flashinfo.src + '"><embed wmode="'+flashMode+'" src="' + flashinfo.src + '" quality="high" width="' + flashinfo.width + '" height="' + flashinfo.height + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>';
			if (flashinfo.href != "") {
				flashcode = '<div style="position:relative;overflow:hidden;width:' + flashinfo.width + "px;height:" + flashinfo.height + 'px;"><a href="' + flashinfo.href + '" target="' + flashinfo.target + '" style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;filter:alpha(opacity=0);opacity:0;background:#FFF;cursor:pointer;display:block;"></a>' + flashcode + "</div>"
			}
		} else {
			if (flashinfo.href != "") {
				flashcode = '<a href="' + flashinfo.href + '" target="' + flashinfo.target + '"><img src="' + flashinfo.backupimage + '" width="' + flashinfo.width + '" height="' + flashinfo.height + '" border="0" /></a>'
			}
		}
		return flashcode
	}
	/**
	 * 接收自定义参数
	 * @name GetOrientation
	 * @function
	 * @example
	 */
	function GetOrientation() {
		var customOion = "",
		orientation = w.CNZZ_ADM_Orientation || "";
		if (orientation != "") {
			var ADM_Orientation = [];
			var pattern = /([0-9a-zA-Z_]+\((?:[0-9a-zA-Z_,]+?)\))\|*/;
			while (pattern.test(orientation)) {
				var s = RegExp["$1"];
				s = (s.substr(0, s.length - 1)).replace(/[\(|\)]/g, ",");
				ADM_Orientation.push(s);
				orientation = orientation.replace(pattern, "")
			}
			orientation = ADM_Orientation.join("|");
			customOion = "&customOion=" + orientation
		}
		return customOion
	}
	/**
	 * 事件注册
	 * @name abind
	 * @function
	 * @param	Object etatget
	 * @param	String action
	 * @param	String fn
	 */
	function abind(etarget, action, fn) {
		etarget.addEventListener ? etarget.addEventListener(action, fn, 0) : etarget.attachEvent("on" + action, fn)
	}
	var w = window,
	d = w.document,
	options = [],batchs = [],isbatch=[],singleId,
	n = w.navigator,
	dom = [],
	evt = {},
	css = {},
	$ = {},
	holderArray = new Array(),
	rootDomain = "http://v2.js.adm.cnzz.net",
	rootUrl = rootDomain + "/appgcm.php",
	iswritable,mybody = (d.compatMode&&d.compatMode.toLowerCase() == "css1compat")?d.documentElement:d.body;
	w.cnzz_api_adm = true;
	/**
	 * 获取根域名
	 * @name getRootDomain
	 * @function
	 * @param	String sinfo
	 */
	var getRootDomain = function (sinfo) {
		var a = sinfo || d.domain;
		var b = a.match(/([a-z0-9][a-z0-9\-]*?\.(?:com|cn|net|org|gov|info|la|cc|co|jp)(?:\.(?:cn|jp))?)$/);
		return b ? b[0] : a
	};
	/**
	 * 获取域名
	 * @name getDomain
	 * @function
	 * @example
	 */
	var getDomain = function () {
		var a = d.referrer;
		if (a != "") {
			var reg = /(\w+):\/\/([^\/:]+)(:\d*)?([^#]*)/;
			var b = a.match(reg);
			return b ? b[2] : ""
		}
		return "";
	};
	/**
	 * 检测iframe是否可写
	 * @name iframeWritable
	 * @function
	 * @example
	 */
	function iframeWritable() {
		var i = d.createElement("iframe"),
		writable = true;
		i.src = "about:blank";
		d.body.appendChild(i);
		try {
			writable = !i.contentWindow.document;
		} catch (e) {
			try{
				if(browser.ie){
					i.src = "javascript:void((function(){document.open();document.domain='"+ document.domain + "';document.close()})())";
					try{
						writable = !i.contentWindow.document;
					}catch(e){
						writable = !0;
					}
				}else{
					writable = !0;
				}
			}catch(e){
				writable = !0;
			}
		}
		d.body.removeChild(i);
		return !writable;
	}
	/**
	 * 检测浏览器信息
	 * @name browser
	 * @function
	 * @example
	 */
	var browser = function () {
		var agent = n.userAgent.toLowerCase(),
		opera = w.opera,
		browser = {
			ie : !!window.ActiveXObject,
			opera : (!!opera && opera.vision),
			webkit : (agent.indexOf(" applewebkit") > -1),
			air : (agent.indexOf(" adobeair") > -1),
			mac : (agent.indexOf("macintosh") > -1),
			quirks : (document.compactMode || false == "BackCompat") || false
		};
		browser.gecko = (n.product == "Gecko" && !browser.webkit && !browser.opera);
		var version = 0;
		if (browser.ie) {
			version = parseInt(agent.match(/msie (\d+)/)[1])
		}
		if (browser.gecko) {
			if (/firefox\/(\S+)/.test(agent)) {
				browser.firefox = !!RegExp.$1
			}
			var geckoRelease = agent.match(/rv:([\d\.]+)/);
			version = parseInt(geckoRelease[1]) || 0
		}
		if (browser.webkit) {
			if (/chrome\/(\S+)/.test(agent)) {
				version = parseInt(RegExp["$1"]);
				browser.chrome = !!RegExp.$1
			} else {
				if (/version \/(S+)/.test(agent)) {
					version = parseInt(RegExp["$1"]);
					browser.safari = !!RegExp.$1
				}
			}
		}
		if (browser.opera) {
			version = opera.version()
		}
		browser.version = version;
		return browser
	}();
	/**
	 * 检测flash
	 * @name IsFlash
	 * @function
	 * @example
	 */
	var IsFlash = function () {
		var hasflash = false;
		if (n.plugins && n.plugins.length) {
			for (var ii = 0; ii < n.plugins.length; ii++) {
				if (n.plugins[ii].name.indexOf("Shockwave Flash") != -1) {
					hasflash = true;
					break
				}
			}
		} else {
			if (w.ActiveXObject && !w.opera) {
				for (var ii = 12; ii >= 2; ii--) {
					try {
						var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
						if (fl) {
							hasflash = true;
							break
						}
					} catch (e) {}
					
				}
			}
		}
		return hasflash
	};
	//FF补丁
	(function () {
		if (typeof(HTMLElement) != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
			HTMLElement.prototype.insertAdjacentElement = function (a, b) {
				switch (a.toLowerCase()) {
				case "beforebegin":
					this.parentNode.insertBefore(b, this);
					break;
				case "afterbegin":
					this.insertBefore(b, this.firstChild);
					break;
				case "beforeend":
					this.appendChild(b);
					break;
				case "afterend":
					if (this.nextSibling) {
						this.parentNode.insertBefore(b, this.nextSibling)
					} else {
						this.parentNode.appendChild(b)
					}
					break
				}
			};
			HTMLElement.prototype.insertAdjacentHTML = function (b, d) {
				var c = this.ownerDocument.createRange();
				c.setStartBefore(this);
				var a = c.createContextualFragment(d);
				this.insertAdjacentElement(b, a)
			}
		}
	})();
	/**
	 * 注册函数
	 */
	FnRegister("CNZZ_ADD_BATCH", add_batch);
	FnRegister("CNZZ_AD_BATCH", do_batch);
	FnRegister("cnzz_RenderIFrame", cnzz_RenderIFrame);
	FnRegister("CNZZ_AD_RSLOT", _renderSlot);
	FnRegister("CNZZ_SLOT_RENDER", _adShow)
})(window);
