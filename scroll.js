window.onload=function(e){
	document.getElementById("contant").style.cssText="margin-top:15em;";
	document.getElementById("head").style.cssText="position:fixed; width:100%; top:0; z-index:999;";
	
	
	var contant=document.getElementById("contant").getElementsByTagName("div");
	for(var i=0,arr=[],cont=[],allNum=0,len=contant.length;i<len;i++){
		if(contant[i].className.search(/(^| )infor($| )/)>=0){
			allNum+=contant[i].offsetHeight;
			arr.push(contant[i].offsetHeight);
			cont.push(pageY(contant[i]));
			
		}
	}
	var wH=e?window.document.documentElement.offsetHeight-windowHeight():window.document.body.offsetHeight-windowHeight();
	for(var i=0,len=arr.length;i<len;i++){
		arr[i]=Math.round(arr[i]/allNum*wH);
	}
	for(var i=0,len=arr.length,num=0;i<len;i++){
		num+=arr[i];
		arr[i]=num;
	}
	var lis=document.getElementById("navigate").getElementsByTagName("li");
	arr.unshift(0);
	arr[-1]=0;
	var A=0,B=arr[1],D=1;
	window.onscroll=function(){
		num=scrollY();
		for(var len=arr.length,i=0;i<len;i++){
			if(num>=arr[i]&&num<=arr[i+1]){
				if(document.getElementById("on")){document.getElementById("on").id=""}
				lis[i].id="on";
			id("navigate").style.top=pageY(cont[i])-pageY(lis[i])+"px";
				return;
			}
		}
		mb=scrollY();
			if(mb<A){
				A=arr[D-1];
				B=arr[D];
				document.getElementById("on").id="";
				lis[D-1].id="on";
				D--;
			}
			if(mb>=B){
				A=arr[D];
				B=arr[D+1];
				document.getElementById("on").id="";
				lis[D].id="on";
				D++;
			}
	}
	for(var i=0,len=lis.length;i<len;i++){
		(function(){
			var j=i;
			lis[j].onclick=function(e){
				var num01=e?cont[j]-230:cont[j]-480;
				var num02=scrollY();
				var h=num01-num02;
				var num=0;
				var int=setInterval(function(){window.scrollBy(0,h/8);num++;if(num>=8){window.clearInterval(int);}},20);
				return false;
			}
		})()
	}
	window.scrollTo(0,Math.random()*10);
}




function id(n){return document.getElementById(n);}

function addLoadEvent(func){//添加页面加载完后要执行的函数
	var old=window.onload;
	if(typeof window.onload != 'function'){
		window.onload=func;
	}else{
		window.onload=function(){
			if(old){old();}
			func();
		}
	}
}

function addEvent(node,type,listener){
	node=document.getElementById(node);
	if(node.addEventListener){
		node.addEventListener(type,listener,false);
		return true;
	}else if(node.attachEvent){
		node['e'+type+listener]=listener;
		node[type+listener]=function(){
			node['e'+type+listener](window.event);
		}
		node.attachEvent('on'+type,node[type+listener]);
	}
}

function fixE(e){//标准化事件对象函数
	e=e||window.event;
	e.targetElement=e.target||e.srcElement;
	if(typeof e.layerX=='undefined') e.layerX=e.offsetX;
	if(typeof e.layerY=='undefined') e.layerY=e.offsetY;
	return e;
}

function prev(elem){//返回上一个兄弟元素
	do{elem=elem.previousSibling;}while(elem && elem.nodeType!=1);
	return elem;
}

function next(elem){//返回下一个兄弟元素
	do{elem=elem.nextSibling;}while(elem && elem.nodeType!=1);
	return elem;
}

function first(elem){//返回第一个子元素
	elem=elem.firstChild;
	return elem&&elem.nodeType!=1?next(elem):elem;
}

function last(elem){//返回最后一个子元素
	elem=elem.lastChild;
	return elem&&elem.nodeType!=1?prev(elem):elem;
}

function windowHeight() {//窗口的可视宽度
	var de = document.documentElement;
	return self.innerHeight ||( de && de.clientHeight ) ||document.body.clientHeight;
}
function windowWidth() {//窗口的可视高度
	var de = document.documentElement;
	return self.innerWidth ||( de && de.clientWidth ) ||document.body.clientWidth;
}

//防止事件冒泡的通用函数
function stopBubble(e) {//防止事件冒泡的通用函数
    if ( e )
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
}
function stopDefault( e ) {//防止发生默认浏览器行为的通用函数
	if ( e )
		e.preventDefault();
	else 
		window.event.returnValue=false;
	return false;
}


function setOpacity( elem, level ) {//改变一个对象的透明度
    if ( elem.filters )
        elem.filters.alpha.opacity = level;
    else
        elem.style.opacity = level / 100;
}

function fadeIn( elem ) {//改变对象的透明度，让对象逐步显示出来
    setOpacity( elem, 0 );
    for ( var i = 0; i <= 100; i += 5 ) {
		(function(){
            var pos = i; 
            setTimeout(function(){
                setOpacity( elem, pos );
            }, ( pos + 1 ) * 10 );
        })();
    }
}

function fadeOut( elem ) {//-改变对象的透明度，让对象逐步隐藏
	elem.style.display="block";
    setOpacity( elem, 100 );
    for ( var i = 100; i >= 0; i -= 5 ) {
		(function(){
            var pos = i; 
            setTimeout(function(){
                setOpacity( elem, pos );
				if(pos<=0){elem.style.display="none"};
            }, (100-pos)*5);
        })();
    }
}

function cleanWhitespace( element ) {//删除文件中的空白节点
    element = element || document;
    var cur = element.firstChild;
    while ( cur != null ) {
        if ( cur.nodeType == 3 && ! /\S/.test(cur.nodeValue) ) {
            element.removeChild( cur );
        } else if ( cur.nodeType == 1 ) {
             cleanWhitespace( cur );
        }
    }
}

function scrollY(){//获取滚动条向上滚动距离
	var de=document.documentElement;
	return self.pageYOffset||(de&&de.scrollTop)||document.body.scrollTop;
}
function scrollX(){//获取滚动条向上滚动距离
	var de=document.documentElement;
	return self.pageXOffset||(de&&de.scrollLeft)||document.body.scrollLeft;
}

//两个确定元素相对于整个文档的Ｘ和Ｙ的位置辅助函数
function pageX(elem) {
	var p = 0;
	while ( elem.offsetParent ) {
		p += elem.offsetLeft;
		elem = elem.offsetParent;
	}
	return p;
}
function pageY(elem) {
	var p = 0;
	while ( elem.offsetParent ) {
		p += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return p;
}
		
//确定元素相对于父亲的位置的两个函数
function parentX(elem) {
	return elem.parentNode == elem.offsetParent ?
		elem.offsetLeft :
		pageX( elem ) - pageX( elem.parentNode );
}
function parentY(elem) {
	return elem.parentNode == elem.offsetParent ?
		elem.offsetTop :
		pageY( elem ) - pageY( elem.parentNode );
}

function winScroll(elem){//原创---窗口滚动到ID处或顶部和底部
	var h=scrollY();
	var num=0;
	var int=setInterval(function(){window.scrollBy(0,h/20);num++;if(num>=20){window.clearInterval(int);}},20);
}



