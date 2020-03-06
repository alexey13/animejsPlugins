var animePlugins=function(e){"use strict";function t(e,t){let n,o,l=!1;return function i(){if(l)return n=arguments,void(o=this);e.apply(this,arguments),l=!0,setTimeout((function(){l=!1,n&&(i.apply(o,n),n=o=null)}),t)}}function n(e,{tagName:t="span",split:n,setClassName:o=function(e){return"char"+e}}={}){e.normalize();let l=1;function i(e){const i=e.parentNode,a=e.nodeValue;(n?n(a):a.split("")).forEach((function(n){const a=document.createElement(t),r=o(l++,n);r&&(a.className=r),a.appendChild(document.createTextNode(n)),a.setAttribute("aria-hidden","true"),i.insertBefore(a,e)})),""!==a.trim()&&i.setAttribute("aria-label",a),i.removeChild(e)}!function e(t){if(3===t.nodeType)return i(t);const n=Array.prototype.slice.call(t.childNodes);if(1===n.length&&3===n[0].nodeType)return i(n[0]);n.forEach((function(t){e(t)}))}(e)}return e.charmingWordsChars=function(e){n(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return`word-${e}`}}),e.querySelectorAll('span[class^="word"]').forEach(e=>n(e))},e.imagesPlayer=function({containerSelector:e,path:t,from:n,to:o,sprite:l=!1,loop:i=!0,autoplay:a=!0,duration:r=1e3,endDelay:c=500,direction:s="normal",delay:d=0,easing:u="linear",onImagesLoaded:m=null,onBegin:p=null,onUpdate:f=null,onComplete:h=null}={}){const g={containerSelector:e,wrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},y={init:()=>{y.loadImages()},loadImages:()=>{let e;if(l){let l=document.createElement("img");function i(){return new Promise(e=>l.addEventListener("load",(function t(){l.removeEventListener("load",t),e(l)}))).then(e=>(function(e,t,n){"function"!=typeof window.createImageBitmap&&(window.createImageBitmap=function(e,t,n,o,l){return Promise.resolve().then((function(){var i=document.createElement("canvas");return i.width=o||e.naturalWidth||e.videoWidth||e.width,i.height=l||e.naturalHeight||e.videoHeight||e.height,i.getContext("2d").drawImage(e,t||0,n||0,i.width,i.height,0,0,i.width,i.height),i})).catch(e=>console.log(e))});const o=t-e+1,l=n.naturalWidth,i=n.naturalHeight/o,a=[];for(let e=0;e<o;e++)a.push([0,e*i,l,i]);return Promise.all(a.map((function(e){return createImageBitmap.apply(window,[n].concat(e))})))})(n,o,e))}l.src=t,e=[i()]}else{e=function(e,t,n){let o=n.indexOf("{num}");const l=e=>[n.slice(0,o),e,n.slice(o+5)].join("");let i=[];for(let n=e;n<=t;n++)i.push(l(n));return{path:i}}(n,o,t).path.map(e=>{let t=document.createElement("img");return t.src=e,navigator.userAgent.toLowerCase().indexOf("firefox")>-1?t.decode().then(()=>t):new Promise(e=>t.addEventListener("load",(function n(){t.removeEventListener("load",n),e(t)})))})}Promise.all(e).then(e=>{g.images=l?e[0]:e,g.allLength=o-n,g.lastImage=o}).catch(e=>console.log("images not loaded")).then(()=>{y.render(),m&&m(g.animationObject)}).catch(e=>console.log(e))},render:()=>{g.wrapperEl=document.querySelector(g.containerSelector),g.canvasEl=document.createElement("canvas"),g.canvasEl.className="ap-imagesplayer",g.wrapperEl.appendChild(g.canvasEl),g.ctx=g.canvasEl.getContext("2d"),g.canvasEl.width=g.images[0].naturalWidth||g.images[0].width,g.canvasEl.height=g.images[0].naturalHeight||g.images[0].height,g.animationObject=anime({targets:g,currentImage:g.allLength,duration:r,loop:i,autoplay:a,round:1,endDelay:c,delay:d,direction:s,easing:u,begin:function(e){p&&p(e)},update:function(e){g.ctx.drawImage(g.images[g.currentImage],0,0),f&&f(e)},complete:function(e){h&&h(e)}})}},v={play:()=>g.animationObject.play()};return y.init(),{actions:v}},e.preloader=function({containerSelector:e,onPageLoaded:t=null,onBegin:n=null}={}){const o={container:document.querySelector(e)},l={start:()=>{document.documentElement.style.overflowY="hidden",n&&n(),function(e){"complete"!==document.readyState?document.addEventListener("readystatechange",t=>{"complete"===t.target.readyState&&e()}):e()}(l.onPageLoaded)},hide:()=>{o.container.style.display="none",document.documentElement.style.overflowY=""},onPageLoaded:()=>{t&&t()}};return l.start(),{actions:l}},e.randomLetters=function({targetsSelector:e,stepPerFrames:t=3,symbols:n,onBegin:o=null,onUpdate:l=null,onComplete:i=null,animation:a=null}={}){const r=document.querySelector(e).parentNode,c={scale:{value:[0,1],duration:()=>anime.random(500,1e3),easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:()=>anime.random(300,600),easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},s="random-letters-wrapper"===r.className;let d=[];function u(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(e).forEach((e,r)=>{const m=e.innerHTML;if(!s){let t=e.parentNode;u(e);const n=e.offsetHeight,o=e.offsetWidth;let l=function(e,t=null,n,o){let l=document.createElement("span");return t&&(l.className=t),l.style.height=o+"px",l.style.width=n+"px",l.appendChild(e),l}(e,"random-letters-wrapper",o,n);!function(e){e.style.willChange="opacity, transform"}(l),u(l),t.appendChild(l)}let p,f=0,h=Object.assign(a||c,{targets:e,begin:function(e){p=function(e,t,n){let o=Math.floor((t-e)/n);return Array.from({length:o+1},(t,o)=>o*n+e)}(0,e.duration,t),o&&o(e)},update:function(t){f++,p.includes(f)&&(" "!==e.innerHTML&&(e.innerHTML=function(){const e=n||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";return e.charAt(Math.floor(Math.random()*e.length))}())),l&&l(t)},complete:function(t){e.innerHTML=m,i&&i(t)}});d.push(anime(h))}),d.map(e=>e.play())},e.scrollContainer=function({sectionSelector:e,wrapperSelector:n,duration:o=1e3,easing:l="easeInOutQuad",onBegin:i=null,onComplete:a=null}={}){const r=document.querySelector(e),c=document.querySelector(n),s={slider:1,scrollPosition:0,sectionHeight:r.offsetHeight,animating:!1,contentEl:c,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},d=t((function(e){let{scrollPosition:t,sectionHeight:n,animating:r,contentEl:c,scrollReachedEndPosition:d}=s;if(r||e===d)return;let u="down"===e?t+n:t-n;anime({targets:c,scrollTop:[t,u],duration:o,easing:l,begin:function(e){s.animating=!0,i&&i(s.slider,e)},complete:function(t){s.animating=!1,s.scrollPosition=u,s.scrollReachedEndPosition=function(){let{contentEl:e,sectionHeight:t}=s,n=e.scrollHeight-t,o=e.scrollTop;return o===n?"down":0===o?"up":""}(),"down"===e?s.slider++:s.slider--,a&&a(s.slider,t),s.scroll.clicked&&h()}})}),300);function u(e){e.preventDefault(),e.deltaY<0?d("up"):e.deltaY>0&&d("down")}function m(e){let t=e.target.offsetHeight,n=e.clientY/t;n=n.toFixed(1),d(n>=.5?"down":"up")}function p(e){s.scroll.clicked=!0,s.scroll.position=e.clientY}function f(e){if(!s.scroll.clicked)return;let t=e.clientY;t<s.scroll.position&&d("up"),t>s.scroll.position&&d("down")}function h(){s.scroll.clicked=!1,s.scroll.position=0}function g(){s.sectionHeight=r.offsetHeight,s.contentEl.scrollTop=(s.slider-1)*s.sectionHeight,s.scrollPosition=s.contentEl.scrollTop}return function(){window.scrollTop=0,s.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="hidden",document.documentElement.style.height="100%",document.body.style.height="100%",s.beforeInitStyles.contentElOverflowY=s.contentEl.style.overflowY,s.beforeInitStyles.contentElOverflowX=s.contentEl.style.overflowX,function(e){e.style.height="100%";let t=[];for(let n in e){if("BODY"==(e=e.parentNode).nodeName)break;t.push(e)}t.forEach(e=>e.style.height="100%")}(s.contentEl),s.contentEl.style.overflowY="scroll",s.contentEl.style.overflowX="hidden",s.contentEl.style.willChange="scroll-position",s.contentEl.scrollTop=0;const e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",s.contentEl.appendChild(e),window.addEventListener("resize",g),document.addEventListener("touchmove",u,{passive:!1}),document.addEventListener("wheel",u,{passive:!1}),e.addEventListener("mousedown",p,{passive:!1}),e.addEventListener("mousemove",f,{passive:!1}),e.addEventListener("mouseup",h,{passive:!1}),e.addEventListener("click",m,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=s.beforeInitStyles.documentOverflowY,s.contentEl.style.overflowY=s.beforeInitStyles.contentElOverflowY,s.contentEl.style.overflowX=s.beforeInitStyles.contentElOverflowX,document.documentElement.style.height=null,document.body.style.height=null,document.removeEventListener("touchmove",u,{passive:!1}),document.removeEventListener("wheel",u,{passive:!1}),window.removeEventListener("resize",g)}}},e.slider=function({slidesLength:e,autoplay:t=!1,timeout:n=3e3,onSlide:o}={}){const l={slidesLength:e,currentSlideIndex:0,nextSlideIndex:null,playing:!1,autoplay:t,timeout:n},i={isPlaying(){const{playing:e}=l;return e},timer(e){let t=0;const o=l=>{l-t>n&&(e(),t=l),this.frame=requestAnimationFrame(o)};o()},cancelTimer(){cancelAnimationFrame(this.frame)}},a={play(t){if(i.isPlaying()||t===l.currentSlideIndex)return;l.playing=!0,l.nextSlideIndex=e-1<t?0:t;const{currentSlideIndex:n,nextSlideIndex:r}=l;o(n,r,a.stop)},stopAutoplay(){l.autoplay=!1,i.cancelTimer()},stop(){l.currentSlideIndex=l.nextSlideIndex,l.playing=!1},startAutoplay(){l.autoplay=!0,i.timer((function(){const e=l.currentSlideIndex+1;a.play(e)}))}},r={playNext(){r.stopAutoplay();const e=l.currentSlideIndex+1;a.play(e)},playPrev(){r.stopAutoplay();const e=l.currentSlideIndex-1;a.play(e)},playIndex(e){r.stopAutoplay(),a.play(e)},stopAutoplay(){const{autoplay:e}=l;e&&a.stopAutoplay()},startAutoplay(){a.startAutoplay()}};return t&&r.startAutoplay(),{state:l,actions:r}},e.throttle=t,e}({});
