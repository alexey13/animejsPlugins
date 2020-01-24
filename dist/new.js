var animePlugins=function(e){"use strict";function t(e,t){let n,o,l=!1;return function i(){if(l)return n=arguments,void(o=this);e.apply(this,arguments),l=!0,setTimeout((function(){l=!1,n&&(i.apply(o,n),n=o=null)}),t)}}function n(e,{tagName:t="span",split:n,setClassName:o=function(e){return"char"+e}}={}){e.normalize();let l=1;function i(e){const i=e.parentNode,r=e.nodeValue;(n?n(r):r.split("")).forEach((function(n){const r=document.createElement(t),a=o(l++,n);a&&(r.className=a),r.appendChild(document.createTextNode(n)),r.setAttribute("aria-hidden","true"),i.insertBefore(r,e)})),""!==r.trim()&&i.setAttribute("aria-label",r),i.removeChild(e)}!function e(t){if(3===t.nodeType)return i(t);const n=Array.prototype.slice.call(t.childNodes);if(1===n.length&&3===n[0].nodeType)return i(n[0]);n.forEach((function(t){e(t)}))}(e)}return e.charmingWordsChars=function(e){n(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return`word-${e}`}}),e.querySelectorAll('span[class^="word"]').forEach(e=>n(e))},e.imagesPlayer=function({containerSelector:e,path:t,from:n,to:o,loop:l=!0,autoplay:i=!0,duration:r=1e3,endDelay:a=500,delay:c=0,easing:s="linear",onImagesLoaded:d=null,onBegin:u=null,onUpdate:m=null,onComplete:p=null}={}){const f={containerSelector:e,wrapperEl:"",imagesWrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},h={init:()=>{h.createElements(),h.loadImages()},loadImages:()=>{let e=function(e,t,n){let o=n.indexOf("{num}");const l=e=>[n.slice(0,o),e,n.slice(o+5)].join("");let i=[];for(let n=e;n<=t;n++)i.push(l(n));return f.allLength=t-e,f.lastImage=t,{path:i}}(n,o,t).path.map(e=>{let t=document.createElement("img");return t.src=e,f.imagesWrapperEl.appendChild(t),new Promise(e=>t.addEventListener("load",()=>e(t)))});Promise.all(e).then(e=>{f.images=e,h.render(),d&&d(f.animationObject)})},createElements:()=>{f.wrapperEl=document.querySelector(f.containerSelector),f.wrapperEl.innerHtml="";let e=document.createElement("div");e.style.display="none",f.imagesWrapperEl=e,f.wrapperEl.appendChild(e);let t=document.createElement("canvas");t.className="ap-imagesplayer",f.wrapperEl.appendChild(t);let n=t.getContext("2d");f.ctx=n,f.canvasEl=t},render:()=>{f.canvasEl.width=f.images[0].naturalWidth,f.canvasEl.height=f.images[0].naturalHeight,f.animationObject=anime({targets:f,currentImage:f.allLength,duration:r,loop:l,autoplay:i,round:1,endDelay:a,delay:c,easing:s,begin:function(e){u&&u(e)},update:function(e){f.ctx.clearRect(0,0,f.canvasEl.width,f.canvasEl.height),f.ctx.drawImage(f.images[f.currentImage],0,0,f.images[f.currentImage].naturalWidth,f.images[f.currentImage].naturalHeight),m&&m(e)},complete:function(e){p&&p(e)}})}},g={play:()=>f.animationObject.play()};return h.init(),{actions:g}},e.preloader=function({containerSelector:e,onPageLoaded:t=null,onBegin:n=null}={}){const o={container:document.querySelector(e)},l={start:()=>{document.documentElement.style.overflowY="hidden",n&&n(),function(e){"complete"!==document.readyState?document.addEventListener("readystatechange",t=>{"complete"===t.target.readyState&&e()}):e()}(l.onPageLoaded)},hide:()=>{o.container.style.display="none",document.documentElement.style.overflowY=""},onPageLoaded:()=>{t&&t()}};return l.start(),{actions:l}},e.randomLetters=function({targetsSelector:e,stepPerFrames:t=3,symbols:n,onBegin:o=null,onUpdate:l=null,onComplete:i=null,animation:r=null}={}){const a=document.querySelector(e).parentNode,c={scale:{value:[0,1],duration:()=>anime.random(500,1e3),easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:()=>anime.random(300,600),easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},s="random-letters-wrapper"===a.className;let d=[];function u(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(e).forEach((e,a)=>{const m=e.innerHTML;if(!s){let t=e.parentNode;u(e);const n=e.offsetHeight,o=e.offsetWidth;let l=function(e,t=null,n,o){let l=document.createElement("span");return t&&(l.className=t),l.style.height=o+"px",l.style.width=n+"px",l.appendChild(e),l}(e,"random-letters-wrapper",o,n);!function(e){e.style.willChange="opacity, transform"}(l),u(l),t.appendChild(l)}let p,f=0,h=Object.assign(r||c,{targets:e,begin:function(e){p=function(e,t,n){let o=Math.floor((t-e)/n);return Array.from({length:o+1},(t,o)=>o*n+e)}(0,e.duration,t),o&&o(e)},update:function(t){f++,p.includes(f)&&(" "!==e.innerHTML&&(e.innerHTML=function(){const e=n||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";return e.charAt(Math.floor(Math.random()*e.length))}())),l&&l(t)},complete:function(t){e.innerHTML=m,i&&i(t)}});d.push(anime(h))}),d.map(e=>e.play())},e.scrollContainer=function({sectionSelector:e,wrapperSelector:n,duration:o=1e3,easing:l="easeInOutQuad",onBegin:i=null,onComplete:r=null}={}){const a=document.querySelector(e),c=document.querySelector(n),s={slider:1,scrollPosition:0,sectionHeight:a.offsetHeight,animating:!1,contentEl:c,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},d=t((function(e){let{scrollPosition:t,sectionHeight:n,animating:a,contentEl:c,scrollReachedEndPosition:d}=s;if(a||e===d)return;let u="down"===e?t+n:t-n;anime({targets:c,scrollTop:[t,u],duration:o,easing:l,begin:function(e){s.animating=!0,i&&i(s.slider,e)},complete:function(t){s.animating=!1,s.scrollPosition=u,s.scrollReachedEndPosition=function(){let{contentEl:e,sectionHeight:t}=s,n=e.scrollHeight-t,o=e.scrollTop;return o===n?"down":0===o?"up":""}(),"down"===e?s.slider++:s.slider--,r&&r(s.slider,t),s.scroll.clicked&&h()}})}),300);function u(e){e.preventDefault(),e.deltaY<0?d("up"):e.deltaY>0&&d("down")}function m(e){let t=e.target.offsetHeight,n=e.clientY/t;n=n.toFixed(1),d(n>=.5?"down":"up")}function p(e){s.scroll.clicked=!0,s.scroll.position=e.clientY}function f(e){if(!s.scroll.clicked)return;let t=e.clientY;t<s.scroll.position&&d("up"),t>s.scroll.position&&d("down")}function h(){s.scroll.clicked=!1,s.scroll.position=0}function g(){s.sectionHeight=a.offsetHeight,s.contentEl.scrollTop=(s.slider-1)*s.sectionHeight,s.scrollPosition=s.contentEl.scrollTop}return function(){window.scrollTop=0,s.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="inherit",document.documentElement.style.height="100%",document.body.style.height="100%",s.beforeInitStyles.contentElOverflowY=s.contentEl.style.overflowY,s.beforeInitStyles.contentElOverflowX=s.contentEl.style.overflowX,function(e){e.style.height="100%";let t=[];for(let n in e){if("BODY"==(e=e.parentNode).nodeName)break;t.push(e)}t.forEach(e=>e.style.height="100%")}(s.contentEl),s.contentEl.style.overflowY="scroll",s.contentEl.style.overflowX="hidden",s.contentEl.style.willChange="scroll-position",s.contentEl.scrollTop=0;const e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",s.contentEl.appendChild(e),window.addEventListener("resize",g),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("wheel",u,{passive:!1}),e.addEventListener("mousedown",p,{passive:!1}),e.addEventListener("mousemove",f,{passive:!1}),e.addEventListener("mouseup",h,{passive:!1}),e.addEventListener("click",m,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=s.beforeInitStyles.documentOverflowY,s.contentEl.style.overflowY=s.beforeInitStyles.contentElOverflowY,s.contentEl.style.overflowX=s.beforeInitStyles.contentElOverflowX,document.documentElement.style.height="",document.body.style.height="",document.removeEventListener("touchmove",u,{passive:!1}),document.removeEventListener("wheel",u,{passive:!1}),window.removeEventListener("resize",g)}}},e.throttle=t,e}({});
