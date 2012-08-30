/**
 * @description : for the AD show of the cnzz's advertisement manager
 * @filename : cnzz.app.adm.js
 * @aurthor : 
 * @version : 1.0 Beta
 * @date : 2011-11-1
 * 
 */
(function(window){
	/**
     * inject the function into the window's domain
     * that is mean make the private function public
     * @private
     * @function
     * @param {String} funstring      the name of the function
     * @param {Function} fn(@private)
     * @returns {}
     */
	function R(funstring,fn){
		funstring = funstring;
		return w[funstring] ? w[funstring] : w[funstring] = fn;
	}
	/**
     * transform the json data to other format
     * @private
     * @function
     * @param {String/json} inobject
     * @returns {String} outobject
     */
	function parseParams(id,jsondata){
		var data = !!id ? jsondata :(!!singleId?jsondata[singleId]:'');
		return data ? {
			id:id||singleId,
			af:data['af'] || false,
			did:data['aid'] || 0,
			slotType:data['stype'] || '',
			isbefore:data['pop'] || 0,
			htmlcode:data['_html'] || 0,
			width : data['_w'] || 0,
			height : data['_h'] || 0,
			stime:data['time']*1000 || 5000,
			ptime:data['parktime']*1000 || 0,
			loadtime:data['loadtime']*1000 || 0,
			closePosition:data['cb'] || 0,
			scroll:data['sc'] || 0,
			position:data['pos'] || 0,
			mleft:data['_m_left'] || 0,
			mtop:data['_m_top'] || 0,
			cc:data['cc'] || '',
			ip:data['ip'] || '',
			ht:data['ht'] || '',
			framesrc : ''
		} : null;
	}
	//show ad
	function _adShow(id){
		if(!!id){
			if(isbatch["b_"+id]){
				single_batch(id);
			}else{
				singleId = id;
				id = parseInt(id);
				var url = urlSet(id);
				d.write('<script type="text/javascript" charset="gbk" src="' + url + '"><\/scr'+'ipt>');
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
		d.write('<script type="text/javascript" charset="gbk" src="' + url + '"><\/scr'+'ipt>');
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
	//render slot
	function _renderSlot(jsondata,id){
		if(!!!jsondata){return false;}
		var slotid,poss,po,iframeHtml;
		slotid = id || "";
		options = parseParams(slotid,jsondata);
		if(options.htmlcode == "close"){
			return false;
		}
		if(!!options.position){
			po = options.position;
			poss = po.split("-");
			options['fleft'] = (poss[0]=='left');
			options['ftop'] = (poss[1]=='up');
		}
		iframeHtml = iframeset() || "";
		switch(options.slotType){
		case('1'):
			ADS.showFixed(iframeHtml);
			break;
		case('2'):
			ADS.showFloat(iframeHtml);
			break;
		case('3'):
			ADS.showPop();
			break;
		}
	}
	/**
     * function for give the htmlcodeiframe
     * @function
     * @param {String} id
     * @returns 
     */
	function cnzz_RenderIFrame(id) {
		var Oiframe = d.getElementById("cnzz_iframe_" + id) || "",htmlcode;
		if(!Oiframe){return false;}
		iswritable = iswritable || iframeWritable();
		htmlcode = holderArray["h_"+id]||'';
		if(!htmlcode){return false;}
		if(!options["done_"+id]){		
			if(iswritable){
				try {
					options["done_"+id] = true;
					var frameContent = Oiframe.contentWindow.document;
					(htmlcode.indexOf("<body>") < 0 ) && (htmlcode = "<!DOCTYPE html><body style='padding:0px;margin:0px;background-color: transparent;'>" + htmlcode);
					frameContent.open("text/html", "replace");
					frameContent.write(htmlcode);
					frameContent.close();
				} catch (e) {
					return false;
				}
			}
		}
		return false;
	}
	var ADS = {
			showFixed : function(iframeHtml){
				var a=options,iframecode,htmlinfo=options.htmlcode,codes;
				if(htmlinfo.type == "rich"){
					codes = htmlinfo.content.replace(/\s*/g,'').toLowerCase();
					if(codes.indexOf("script")!=-1){
						document.write(htmlinfo.content);
						return '';
					}
				}
				iframecode = '<div id="cnzz_slot_'+a.id+'" style="width:'+a.width+'px;height:'+a.height+'px;border:none;margin:0px;padding:0px;'+(iframeHtml?'':'background-color:#FFFFFF;')+'overflow:hidden;" >'+iframeHtml+'</div>';
				document.write(iframecode);
				if(browser.ie && iframeHtml){
					cnzz_RenderIFrame(a.id);
				}
				return false;
			},
			showFloat : function(iframeHtml){
				var a = options,iframecode,style_p = "",closebutton,IE6Element,styleinfo;
				if(iframeHtml==""){
					return false;
				}
				if(d.body){
					switch(a.position){
					case("left-up"):
						style_p = "left:"+(a.mleft || 0)+"px;top:"+(a.mtop || 0)+"px;";
						break;
					case("right-up"):
						style_p = "right:"+(a.mleft || 0)+"px;top:"+(a.mtop || 0)+"px;";
						break;
					case("left-down"):
						style_p = "left:"+(a.mleft || 0)+"px;bottom:"+(a.mtop || 0)+"px;";
						break;
					case("right-down"):
						style_p = "right:"+(a.mleft || 0)+"px;bottom:"+(a.mtop || 0)+"px;";
						break;
					 default:
					      break;
					}
					iframecode = '<div id="cnzz_float_'+a.id+'" style="width:'+(a.width || 0)+'px;'+((a.scroll == 1) ? 'position:fixed;' : 'position:absolute;')+style_p+'border:1px solid #E5E5E5;z-index:9999;overflow:hidden;background-color:#FFFFFF;">'
					+((a.closePosition.charAt(1)=='t') ? '<div style="width:'+(a.width || 0)+'px;height:18px;border-bottom: 1px solid #E5E5E5;background:#F2F2F2;" ><span id="closebutton_'+a.id+'" onclick="this.parentNode.parentNode.style.display=\'none\';return false;" style="width:45px;height:18px;'+((a.closePosition.charAt(0)=='l')?'float:left;background:url('+rootDomain+'/js/cbutton1.gif) no-repeat;background-position:center;':'float:right;background:url('+rootDomain+'/js/cbutton2.gif) no-repeat;background-position:center;')+'cursor:pointer;"></span></div>' : '')
					+'<div style="height:'+(a.height || 0)+'px;z-index:9999;overflow:hidden;">'+iframeHtml+'</div>'
					+((a.closePosition.charAt(1)=='b') ? '<div style="width:'+(a.width || 0)+'px;height:18px;border-top: 1px solid #E5E5E5;background:#F2F2F2;" ><span id="closebutton_'+a.id+'" onclick="this.parentNode.parentNode.style.display=\'none\';return false;" style="width:45px;height:18px;'+((a.closePosition.charAt(0)=='r')?'float:right;background:url('+rootDomain+'/js/cbutton2.gif) no-repeat;background-position:center;':'float:left;background:url('+rootDomain+'/js/cbutton1.gif) no-repeat;background-position:center;')+'cursor:pointer;"></span></div>' : '')
					+'</div>';
					d.write(iframecode);
					IE6Element = d.getElementById('cnzz_float_'+a.id);
					if(a.ptime != 0){
						setTimeout(function(){IE6Element.style.display = "none";},a.ptime);
					}
					if(browser.ie&&browser.version==6&&a.scroll==1){
						styleinfo=0;
						IE6Element.style.position = "absolute";
						switch(a.position){
						case("left-up"):
						case("right-up"):
							styleinfo = parseInt(a.mtop);
							break;
						case("left-down"):
						case("right-down"):
							styleinfo = d.documentElement.clientHeight - a.height - 25 - a.mtop;
							break;
						 default:
						      break;
						}
						w.attachEvent('onscroll',function(){
							IE6Element.style.top = ((d.body.scrollTop + d.documentElement.scrollTop) + styleinfo) + 'px';
					    });
					    w.attachEvent('onresize',function(){
					    	IE6Element.style.top = ((d.body.scrollTop + d.documentElement.scrollTop) + styleinfo) + 'px';
					    });
					}
					if(browser.ie && iframeHtml){
						cnzz_RenderIFrame(a.id);
					}
				}else{
					
				}
				return false;
			},
			showPop : function(){
				var a=options,iframeHtml = adHolder() || "",loadDialog;
				if(iframeHtml==""){
					return false;
				}
				(iframeHtml.indexOf("<body>") < 0 ) && (iframeHtml = "<!DOCTYPE html><body style='padding:0px;margin:0px;background-color: transparent;'>" + iframeHtml);
				loadDialog =  function(admX, admY, admXm, admYm, admStime, w_w, w_h,iframeHtml) {
					var window_width = w_w || 0,
					window_height = w_h || 0,loadWindow,ulwc;
					if (admX == 'right') {
						admXm = screen.width - window_width - admXm;
					}
					if (admY == 'down') {
						admYm = screen.height - window_height - admYm - 100;
					}
					try{
						loadWindow = w.open('about:blank', 'CNPOP'+ +new Date, 'width=' + window_width + ',height=' + window_height + ',left=' + admXm + ',top=' + admYm + ',toolbar=no,Location=no,status=no,titlebar=no,alwaysRaised=yes,menubar=no,resizable=no');
						if(!!loadWindow.document){
							ulwc = loadWindow.document;
							ulwc.open("text/html", "replace");
							ulwc.write(iframeHtml);
							ulwc.close();
							loadWindow.focus();
							if(!!ulwc.body){
								ulwc.body.style.fontSize = '12px';
								ulwc.body.style.padding = 0;
								ulwc.body.style.margin = 0;
							}
							0<admStime&&setTimeout(function(){loadWindow&&loadWindow.close();}, admStime);
						}
					}catch(m){
						return false;
					}
					return false;
				};
				var position = a.position.split("-"),left = position[0]||"left",up = position[1]||'up';
				if(a.isbefore == "1"){
					setTimeout(function(){
						loadDialog(left,up,a.mleft,a.mtop,a.ptime,a.width,a.height,iframeHtml);
					},a.loadtime);
				}else{
					0 < a.ptime && (iframeHtml=iframeHtml+"<script>setTimeout(function(){window.close();},"+a.ptime+");</script>");
					if(w.addEventListener){
						w.addEventListener('unload',
								function(){
									loadDialog(left,up,a.mleft,a.mtop,a.ptime,a.width,a.height,iframeHtml);
								}
						,0);
					}else{
						w.attachEvent('onunload',
								function(){
									loadDialog(left,up,a.mleft,a.mtop,a.ptime,a.width,a.height,iframeHtml);
								}
						);
					}
				}
				return false;
			}
	};
	//set url
	function urlSet(id,batch){
		if(!id){return false;}
		var url,customOion=GetOrientation(),s_width = screen.width,
		s_height = screen.height,ids,
		adm_client_referer = d.referrer,
		adm_client_url = d.location,
		adm_client_domain = '',adm_client_url = '' + adm_client_url + '';
		adm_client_url = adm_client_url.replace(/\&/g, '{0}');
		isflash = isflash || IsFlash();
		if (adm_client_referer != '') {
			var adm_client_reg = /(\w+):\/\/([^\/:]+)(:\d*)?([^#]*)/;
			var adm_client_Array = adm_client_referer.match(adm_client_reg);
			adm_client_domain = adm_client_Array[2];
		}
		if(!!batch){
			ids = id.split(",");
			
			url = rootDomain+"/batch.php?batchid="+id
			+"&fn=CNZZ_ADD_Batch" + "&showp=" + s_width +"x"+s_height;
		}else{
			url = rootUrl+"?sid=" + id
			+"&fn=CNZZ_AD_RSLOT"
			+ "&width=" + s_width
			+ "&height=" + s_height + customOion;
		}
		url = url
		+ "&page=" + (pagenum||1)
		+ "&browser=" + browser.name
		+ "&os=" + os
		+ "&isf=" + isflash
		+ "&time=" + +new Date
		+ "&domain=" + adm_client_domain
		+ "&referer=" + encodeURIComponent(adm_client_referer)
		+ "&href=" + encodeURIComponent(adm_client_url);
		return url;
	}
	//cookie
	function setCookie(NameOfCookie,value){
		var cookie = NameOfCookie+"=cnzz_pages_"+escape(value);
		var ExpireDate = new Date();
		ExpireDate.setTime(ExpireDate.getTime()+(30*1000));
		cookie +=";expires="+ExpireDate.toGMTString()+";";
		document.cookie=cookie;
	}
	function getCookie(NameOfCookie){
		if(document.cookie.length > 0){
		begin = document.cookie.indexOf(NameOfCookie+"=cnzz_pages_");
			if(begin != -1){
				begin += NameOfCookie.length+12;
				end = document.cookie.indexOf(";",begin);
				if (end == -1) end = document.cookie.length;
				return unescape(document.cookie.substring(begin,end));
			}else{
				return -1;
			}
		}else{
			return -1;
			}
	}
	/**
     * function for giving the iframe code
     * @function
     * @param {Object/Element} opetions
     * @returns {String} 
     */
	function iframeset() {
		var id = options.id || "",htmlinfo=options.htmlcode,
		framesrc = options.framesrc || "about:blank",codes,
		fwidth = options.width,
		fheight = options.height,sshtml = adHolder() || null;
		holderArray["h_"+id] = sshtml;
		if(!sshtml){
			return sshtml;
		}
		if(htmlinfo.type == "rich"){
			codes = htmlinfo.content.replace(/\s*/g,'').toLowerCase();
			if(codes.indexOf("script")==-1){
				return sshtml;
			}
		}
		return '<iframe id=cnzz_iframe_' + id +
		' src="' + framesrc + '" ' + ((browser.ie) ? '' : 'onload="cnzz_RenderIFrame(' + id + ')"') + '  width=' + fwidth + ' height=' + fheight + ' vspace="0" hspace="0" allowTransparency="true" scrolling="no" marginHeight="0" marginWidth="0" frameborder="0" style="padding:0px;border:0;vertical-align:bottom;margin:0px;display:block;"></iframe>';
	}
	//get the ad holder
    function adHolder(){
    	var mtype,tongjipont,htmlcode,html = options.htmlcode || "",mid;
    	if(!html){return "";}
    	mtype = (html.type || null) || (html.length?"slide":null);
    	switch(mtype){
    	case("text"):
    		if(html.text){
    			htmlcode = '<a href="'+html.href+'" target="'+html.target+'">'+html.text+'</a>';
    			mid = html.id;
    		}
    		break;
    	case("image"):
    		if(html.src){
    			htmlcode = '<div style="width:'+options.width+'px;height:'+options.height+'px;" ><a href="'+html.href+'" target="'+html.target+'"><img src="'+html.src+'" '+(html.width?"width="+html.width:"")+' '+(html.height?"height="+html.height:"")+' border=0 /></a></div>';
    			mid = html.id;
    		}
    		break;
    	case("flash"):
    		if(html.src){
    			htmlcode = SetFlash(html);
    			mid = html.id;
    		}
    		break;
    	case("rich"):
    		if(html.content){
    			htmlcode = html.content;
    			mid = html.id;
    		}
    		break;
    	case("slide"):
    		html = eval(html);
    		if(html.length){
    			var point,h,childmid=[],htmlcode = '<div id="cnzz_slide_'+options.id+'" onmouseover="clearInterval(rollId)" onmouseout="showAtTime()">';
    			for(var o in html){
    				h = eval('['+html[o]+']');
    				h = h[0];
    				if(!h.type){
    					continue;
    				}
    				childmid[o] = h.id;
    				htmlcode += '<div '+(o!=0 ? "style='display:none;'" : "")+'><a href="'+h.href+'" target="'+h.target+'">'
    				+((h.type == "text") ? (h.text) : ((h.type == "image") ? "<img width="+h.width+" height="+h.height+" src='"+h.src+"' border=0 />" : null))
    				+'</a></div>';
    			}
    			htmlcode += '</div>'
    				+'<script>'
    				+'var defaultNum=0,slidetime = '+options.stime+';'
    				+'var rollId=setInterval(showPushLink,slidetime);'
        			+'function G(x){return document.getElementById(x);}'
        			+'function showAtTime(){showPushLink();rollId=setInterval(showPushLink,slidetime);}'
        			+'function showPushLink(){var num,cnode,clength,pnode = G("cnzz_slide_'+options.id+'");cnode = pnode.childNodes;clength = cnode.length;'
        			+'defaultNum++;if(defaultNum>clength-1) defaultNum=0;num=defaultNum;'
        			+'for(var i=0;i<clength;i++){if(num != i){cnode[i].style.display = "none";}else{cnode[num].style.display = "";}}'
    				+'}</script>';
    		}
    		mid = childmid.join(",");
    		htmlcode = htmlcode || "";
    		break;
    	}
    	if(options.af){
    		tongjipont = options.ht+"/stat.gif?sid="+options.id+"&aid="+options.did+"&mid="+mid+"&ip="+options.ip+"&cookie="+options.cc+"&time="+ +new Date+"&referer="+encodeURIComponent(d.referrer)+"&href="+encodeURIComponent(d.location);
        	if(htmlcode){
        		htmlcode = htmlcode+'<img src="'+tongjipont+'" border=0 width=0 height=0 style="float:left;" />';
        	}
    	}
    	return htmlcode;
    }
	//flash ishave
	function IsFlash(){
		var hasflash=false;
		if(n.plugins && n.plugins.length){
		  for(var ii=0;ii<n.plugins.length;ii++){
		    if(n.plugins[ii].name.indexOf('Shockwave Flash')!=-1){hasflash=true;break;}
		  }
		}else if(w.ActiveXObject && !w.opera){
		  for (var ii=12;ii>=2;ii--){
		    try{
		      var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
		      if(fl){hasflash=true; break; }
		    }
		    catch(e) {}
		  }
		}
		return hasflash;
	}
    //set flash
    function SetFlash(flashinfo){
    	if(!flashinfo)return null;
    	var flashcode = "";
    	if(isflash){
    		flashcode = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + flashinfo.width + '" height="' + flashinfo.height + '" align="middle">'
        	+ '<param name="allowScriptAccess" value="always">'
        	+ '<param name="quality" value="high">'
        	+ '<param name="wmode" value="transparent">'
        	+ '<param name="movie" value="' + flashinfo.src + '">'
        	+ '<embed wmode="transparent" src="' + flashinfo.src + '" quality="high" width="' + flashinfo.width + '" height="' + flashinfo.height + '" align="middle" allowScriptAccess="always" '
        	+ 'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">'
        	+ '</object>';
        	if(flashinfo.href != ""){
        		flashcode = '<div style="position:relative;overflow:hidden;width:' + flashinfo.width + "px;height:" + flashinfo.height + 'px;"><a href="' + flashinfo.href + '" target="' + flashinfo.target + '" style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;filter:alpha(opacity=0);opacity:0;background:#FFF;cursor:pointer;display:block;"></a>'
        		+ flashcode + "</div>"
        		
        	}
    	}else{
    		if(flashinfo.href != ""){
    			flashcode = '<a href="' + flashinfo.href + '" target="' + flashinfo.target + '"><img src="' + flashinfo.backupimage + '" width="'+flashinfo.width+'" height="'+flashinfo.height+'" border="0" /></a>';
    		}
    	}
    	
    	return flashcode;
    }
	//get Orientation
	function GetOrientation(){
		var customOion = "",orientation = w.CNZZ_ADM_Orientation || '';
		if (orientation != '') {
			var ADM_Orientation = [];
			var pattern = /([0-9a-zA-Z_]+\((?:[0-9a-zA-Z_,]+?)\))\|*/;
			while (pattern.test(orientation)) {
				var s = RegExp['$1'];
				s = (s.substr(0, s.length - 1)).replace(/[\(|\)]/g, ',');
				ADM_Orientation.push(s);
				orientation = orientation.replace(pattern, '')
			}
			orientation = ADM_Orientation.join('|');
			customOion = '&customOion=' + orientation;
		}
		return customOion;
	}
	function abind(etarget,action,fn){
		etarget.addEventListener ? etarget.addEventListener(action, fn, 0) : etarget.attachEvent("on"+action, fn);
	}
	//define the common params 
	var w = window,d = w.document,options = [],batchs = [],isbatch=[],singleId,isflash,
	n = w.navigator,dom = [],evt = {},css = {},$ = {},
	holderArray = [],sshtml,pagenum,
	rootDomain = "http://js.adm.cnzz.net",
	rootUrl = rootDomain+"/gcm.php",iswritable;
	w.cnzz_config = [];
	//w.cnzz_api_adm=true;
	w.cnzz_config.admapi = true;
	/**
     * function for getting the rootdomain of the URI
     * @private
     * @function
     * @param {String} sinfo
     * @returns {String} domain
     */
	var getRootDomain = function(sinfo){
		 var a = sinfo || d.domain;
		 var b = a.match(/([a-z0-9][a-z0-9\-]*?\.(?:com|cn|net|org|gov|info|la|cc|co|jp)(?:\.(?:cn|jp))?)$/);
		 return b ? b[0] : a;
	};
	/**
     * function for getting the domain of the URI
     * @private
     * @function
     * @returns {String} domain
     */
	var getDomain = function(){
		var a = d.referrer;
		if(a != ""){
			var reg =/(\w+):\/\/([^\/:]+)(:\d*)?([^#]*)/;
			var b=a.match(reg);
			return b ? b[2] : "";
		}
		return "";
	};
	//iframe is allowed
	function iframeWritable() {
		var i = d.createElement("iframe"),writable=true;
		i.src = "about:blank";
		try {
			d.body.insertBefore(i, d.body.firstChild);
			writable = !i.contentWindow.document;
		} catch (e) {
			writable = !0;
		}
		d.body.removeChild(i);
		return !writable;
	};
	/**
     * function for getting the informationg of the browser
     * @private
     * @function
     * @returns {String} browser
     */
	var browser = function(){
		var agent = n.userAgent.toLowerCase(),
		opera = w.opera,browserlist,
		browser = {
			ie : !!window.ActiveXObject,
			opera : (!!opera && opera.vision),
			webkit : (agent.indexOf(" applewebkit") > -1),
			air : (agent.indexOf(" adobeair") > -1),
			mac : (agent.indexOf("macintosh") > -1),
			quirks : (document.compactMode || false == "BackCompat") || false
		};
		browserlist = {
                'opera':'Opera',
                'se 1.':'sougou',
                'se 2.':'sougou',
                'chrome':'Chrome',
                'safari':'Safari',
                '360se':'360safe',
                'tencent':'TT',
                'Maxthon':'Maxthon',
                'Theworld':'TheWorld',
                'firefox':'FireFox',
                'msie 6.0':'InternetExplorer6',
                'msie 7.0':'InternetExplorer7',
                'msie 8.0':'InternetExplorer8',
				'msie 9.0':'InternetExplorer9'
		};
		for(var client in browserlist){
			if(agent.indexOf(client) > -1){
				browser.name = browserlist[client];
			}
		}
		browser.gecko = (n.product == "Gecko" && !browser.webkit && !browser.opera);
		var version = 0;
		if(browser.ie){
			version = parseInt(agent.match(/msie (\d+)/)[1]);
		}
		if(browser.gecko){
			if(/firefox\/(\S+)/.test(agent)){
				browser.firefox = !!RegExp.$1;
			}
			var geckoRelease = agent.match(/rv:([\d\.]+)/);
			version = parseInt(geckoRelease[1]) || 0;
		}
		if(browser.webkit){
			if(/chrome\/(\S+)/.test(agent)){
				version = parseInt(RegExp["$1"]);
				browser.chrome =  !!RegExp.$1 ;
			}else if(/version \/(S+)/.test(agent)){
				version = parseInt(RegExp["$1"]);
				browser.safari = !!RegExp.$1 ;
			}
		}
		if(browser.opera){
			version = opera.version();
		}
		browser.version = version;
		return browser;
	}();
	//page function
	pagenum = (function(){
		var pagenum = getCookie('pagesnum');
		pagenum = parseInt(pagenum);
		if(pagenum && pagenum != -1){
			setCookie('pagesnum',(pagenum+1));
			pagenum = pagenum+1;
		}else{
			pagenum = 1;
			setCookie('pagesnum',1);
		}
		return pagenum;
	})();
	
	//OS
	/*
 	*    
	WindowsXp
	WindowsVista
	Windows2000
	Windows2003
	Windows7
	Android
	iOS
	Macintosh
	Linux
	Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_2 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5
	Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5
	MQQBrowser/25 (Linux; U; 2.3.3; zh-cn; HTC Desire S Build/GRI40;480*800)
	Mozilla/5.0 (Linux; U; Android 2.3.3; zh-cn; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
	Mozilla/5.0 (SymbianOS/9.3; U; Series60/3.2 NokiaE75-1 /110.48.125 Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413
	Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8J2
	Mozilla/5.0 (Windows NT 5.2) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.122 Safari/534.30
	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22
	Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
	Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
	Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A5313e Safari/7534.48.3
	Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
	Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; SAMSUNG; OMNIA7)　　　　　　----SAMSUNG MP7
	Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; XBLWP7; ZuneWP7)  　　　　　　　　----HTC MP7
 	* 
 	* */
	var os = function(){
		var ua = n.userAgent.toLowerCase(),os = n.platform,ioslist,iswin,ismac,islinux,isunix;
		iswin = (os == "Win32") || (os == "Windows");
		if(iswin){
			if(ua.indexOf("windows nt5.1") > -1 || ua.indexOf("windows xp") > -1)
				return "WindowsXp";
			if(ua.indexOf("windows nt 6.1") > -1 || ua.indexOf("windows 7") > -1)
				return "Windows7";
			if(ua.indexOf("windows nt 5.0") > -1 || ua.indexOf("windows 2000") > -1)
				return "Windows2000";
			if(ua.indexOf("windows nt 5.2") > -1 || ua.indexOf("windows 2003") > -1)
				return "Windows2003";
			if(ua.indexOf("windows nt 6.0") > -1 || ua.indexOf("windows vista") > -1)
				return "WindowsVista";
		}
		islinux = (String(os).indexOf("Linux") > -1);
		if(islinux){
			if(ua.indexOf("Android")>-1){
				return "Android";
			}else{
				return "Linux";
			}
		}
		ismac = (os == "Mac68K") || (os == "MacPPC") || (os == "Macintosh") || (os == "MacIntel");
		if(ismac){
			if(ua.indexOf("iphone")>-1 || ua.indexOf("ipod")>-1 || ua.indexOf("ipad")>-1)
				return "iOS";
			else
				return "Macintosh";
		}
		isunix = (os == "X11") && !iswin && !ismac;
		if(isunix) return "Unix";
		
		return "other";
	}();
	//REG the private function , give the function nick name
	//please remember the prefix "cnzz_app_adm_"
	R("cnzz_RenderIFrame",cnzz_RenderIFrame);
	R("CNZZ_AD_RSLOT",_renderSlot);
	R("CNZZ_SLOT_RENDER",_adShow);
})(window);