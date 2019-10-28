var animejsPlugins=function(e){"use strict";return e.imagesPlayer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.path,t=e.from,o=e.to,l=e.loop,i=void 0===l||l,a=e.autoplay,r=void 0===a||a,c=e.onEnd,s=void 0===c?null:c,d={loop:i,autoplay:r,wrapperClassName:".loader",wrapperEl:"",imagesWrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",pageLoaded:!1},u={init:function(){u.createElements(),u.loadImages(),u.addEvent()},loadImages:function(){var e=function(e,n,t){for(var o=t.indexOf("{num}"),l=[],i=e;i<=n;i++)l.push((a=i,[t.slice(0,o),a,t.slice(o+5)].join("")));var a;return d.allLength=n-e,d.lastImage=n,{path:l}}(t,o,n).path.map((function(e){var n=document.createElement("img");return n.src=e,d.imagesWrapperEl.appendChild(n),new Promise((function(e){return n.addEventListener("load",(function(){return e(n)}))}))}));Promise.all(e).then((function(e){d.images=e,u.render()}))},createElements:function(){document.documentElement.style.overflowY="hidden";var e=document.querySelector(d.wrapperClassName);d.wrapperEl=e;var n=document.createElement("div");n.className="images-wrapper",d.imagesWrapperEl=n,d.wrapperEl.appendChild(n);var t=document.createElement("canvas");e.appendChild(t);var o=t.getContext("2d");d.ctx=o,d.canvasEl=t},render:function(){d.canvasEl.width=d.images[0].naturalWidth,d.canvasEl.height=d.images[0].naturalHeight;var e=anime({targets:d,currentImage:d.allLength,duration:1e3,loop:2,round:1,endDelay:500,easing:"linear",update:function(){d.ctx.clearRect(0,0,d.canvasEl.width,d.canvasEl.height),d.ctx.drawImage(d.images[d.currentImage],0,0,d.images[d.currentImage].naturalWidth,d.images[d.currentImage].naturalHeight)},complete:function(){d.pageLoaded?(e.pause(),u.end(),s&&s()):e.restart()}})},addEvent:function(){var e;e=function(){return d.pageLoaded=!0},"complete"!==document.readyState?document.addEventListener("readystatechange",(function(n){"complete"===n.target.readyState&&e()})):e()},end:function(){d.wrapperEl.style.display="none",document.documentElement.style.overflowY="scroll"}};u.init()},e.randomLetters=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.targetsSelector,t=e.stepPerFrames,o=void 0===t?3:t,l=e.symbols,i=e.onBegin,a=void 0===i?null:i,r=e.onUpdate,c=void 0===r?null:r,s=e.onComplete,d=void 0===s?null:s,u=e.animation,p=void 0===u?null:u,m=document.querySelector(n).parentNode,v={scale:{value:[0,1],duration:function(){return anime.random(500,1e3)},easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:function(){return anime.random(300,600)},easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},f="random-letters-wrapper"===m.className,g=[];function h(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(n).forEach((function(e,n){var t,i=e.innerHTML;if(!f){var r=e.parentNode;h(e);var s=e.offsetHeight,u=e.offsetWidth,m=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,l=document.createElement("span");return n&&(l.className=n),l.style.height=o+"px",l.style.width=t+"px",l.appendChild(e),l}(e,"random-letters-wrapper",u,s);!function(e){e.style.willChange="opacity, transform"}(m),h(m),r.appendChild(m)}var E=0,y=Object.assign(p||v,{targets:e,begin:function(e){var n,l,i,r;n=0,l=e.duration,i=o,r=Math.floor((l-n)/i),t=Array.from({length:r+1},(function(e,t){return t*i+n})),a&&a(e)},update:function(n){var o;E++,t.includes(E)&&(" "!==e.innerHTML&&(e.innerHTML=(o=l||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").charAt(Math.floor(Math.random()*o.length)))),c&&c(n)},complete:function(n){e.innerHTML=i,d&&d(n)}});g.push(anime(y))})),g.map((function(e){return e.play()}))},e.scrollContainer=function(){var e,n,t,o,l,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=i.wrapper,r=i.onBegin,c=void 0===r?null:r,s=i.onComplete,d=void 0===s?null:s,u=i.duration,p=i.easing,m={slider:1,scrollPosition:0,sectionHeight:i.section.clientHeight,animating:!1,contentEl:a,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},v=(e=function(e){var n=m.scrollPosition,t=m.sectionHeight,o=m.animating,l=m.contentEl,i=m.scrollReachedEndPosition;if(!o&&e!==i){var a="down"===e?n+t:n-t;anime({targets:l,scrollTop:[n,a],duration:u,easing:p,begin:function(){m.animating=!0,c&&c(m.slider)},complete:function(){m.animating=!1,m.scrollPosition=a,m.scrollReachedEndPosition=function(){var e=m.contentEl,n=m.sectionHeight,t=e.scrollHeight-n,o=e.scrollTop;return o===t?"down":0===o?"up":""}(),"down"===e?m.slider++:m.slider--,d&&d(m.slider),m.scroll.clicked&&y()}})}},n=300,l=!1,function i(){if(l)return t=arguments,void(o=this);e.apply(this,arguments),l=!0,setTimeout((function(){l=!1,t&&(i.apply(o,t),t=o=null)}),n)});function f(e){e.preventDefault(),e.deltaY<0?v("up"):e.deltaY>0&&v("down")}function g(e){var n=e.target.clientHeight,t=e.clientY/n;t=t.toFixed(1),v(t>=.5?"down":"up")}function h(e){m.scroll.clicked=!0,m.scroll.position=e.clientY}function E(e){if(m.scroll.clicked){var n=e.clientY;n<m.scroll.position&&v("up"),n>m.scroll.position&&v("down")}}function y(){m.scroll.clicked=!1,m.scroll.position=0}return function(){window.scrollTop=0,m.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="inherit",m.beforeInitStyles.contentElOverflowY=m.contentEl.style.overflowY,m.beforeInitStyles.contentElOverflowX=m.contentEl.style.overflowX,m.contentEl.style.overflowY="scroll",m.contentEl.style.overflowX="hidden",m.contentEl.style.willChange="scroll-position",m.contentEl.scrollTop=0;var e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",m.contentEl.appendChild(e),document.addEventListener("touchmove",f,{passive:!1}),document.addEventListener("wheel",f,{passive:!1}),e.addEventListener("mousedown",h,{passive:!1}),e.addEventListener("mousemove",E,{passive:!1}),e.addEventListener("mouseup",y,{passive:!1}),e.addEventListener("click",g,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=m.beforeInitStyles.documentOverflowY,m.contentEl.style.overflowY=m.beforeInitStyles.contentElOverflowY,m.contentEl.style.overflowX=m.beforeInitStyles.contentElOverflowX,document.removeEventListener("touchmove",f,{passive:!1}),document.removeEventListener("wheel",f,{passive:!1})}}},e}({});