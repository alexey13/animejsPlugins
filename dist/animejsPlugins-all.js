var animejsPlugins=function(e){"use strict";function t(e,t){var n,o,i=!1;return function l(){if(i)return n=arguments,void(o=this);e.apply(this,arguments),i=!0,setTimeout((function(){i=!1,n&&(l.apply(o,n),n=o=null)}),t)}}function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.tagName,o=void 0===n?"span":n,i=t.split,l=t.setClassName,a=void 0===l?function(e){return"char"+e}:l;e.normalize();var r=1;function c(e){var t=e.parentNode,n=e.nodeValue;(i?i(n):n.split("")).forEach((function(n){var i=document.createElement(o),l=a(r++,n);l&&(i.className=l),i.appendChild(document.createTextNode(n)),i.setAttribute("aria-hidden","true"),t.insertBefore(i,e)})),""!==n.trim()&&t.setAttribute("aria-label",n),t.removeChild(e)}!function e(t){if(3===t.nodeType)return c(t);var n=Array.prototype.slice.call(t.childNodes);if(1===n.length&&3===n[0].nodeType)return c(n[0]);n.forEach((function(t){e(t)}))}(e)}return e.charmingWordsChars=function(e){n(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return"word-".concat(e)}}),e.querySelectorAll('span[class^="word"]').forEach((function(e){return n(e)}))},e.imagesPlayer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.containerSelector,n=e.path,o=e.from,i=e.to,l=e.sprite,a=void 0!==l&&l,r=e.loop,c=void 0===r||r,d=e.autoplay,s=void 0===d||d,u=e.duration,m=void 0===u?1e3:u,p=e.endDelay,f=void 0===p?500:p,v=e.direction,h=void 0===v?"normal":v,g=e.delay,y=void 0===g?0:g,E=e.easing,w=void 0===E?"linear":E,S=e.onImagesLoaded,I=void 0===S?null:S,x=e.onBegin,L=void 0===x?null:x,b=e.onUpdate,P=void 0===b?null:b,A=e.onComplete,H=void 0===A?null:A,Y={containerSelector:t,wrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},C={init:function(){C.loadImages()},loadImages:function(){var e;if(a){var t=document.createElement("img");t.src=n,e=[new Promise((function(e){return t.addEventListener("load",(function n(){t.removeEventListener("load",n),e(t)}))})).then((function(e){return function(e,t,n){"function"!=typeof window.createImageBitmap&&(window.createImageBitmap=function(e,t,n,o,i){return Promise.resolve().then((function(){var l=document.createElement("canvas");return l.width=o||e.naturalWidth||e.videoWidth||e.width,l.height=i||e.naturalHeight||e.videoHeight||e.height,l.getContext("2d").drawImage(e,t||0,n||0,l.width,l.height,0,0,l.width,l.height),l})).catch((function(e){return console.log(e)}))});for(var o=t-e+1,i=n.naturalWidth,l=n.naturalHeight/o,a=[],r=0;r<o;r++)a.push([0,r*l,i,l]);return Promise.all(a.map((function(e){return createImageBitmap.apply(window,[n].concat(e))})))}(o,i,e)}))]}else{e=function(e,t,n){for(var o=n.indexOf("{num}"),i=[],l=e;l<=t;l++)i.push((a=l,[n.slice(0,o),a,n.slice(o+5)].join("")));var a;return{path:i}}(o,i,n).path.map((function(e){var t=document.createElement("img");return t.src=e,t.decode().then((function(){return t}))}))}Promise.all(e).then((function(e){Y.images=a?e[0]:e,Y.allLength=i-o,Y.lastImage=i})).catch((function(e){return console.log("images not loaded")})).then((function(){C.render(),I&&I(Y.animationObject)})).catch((function(e){return console.log(e)}))},render:function(){Y.wrapperEl=document.querySelector(Y.containerSelector),Y.canvasEl=document.createElement("canvas"),Y.canvasEl.className="ap-imagesplayer",Y.wrapperEl.appendChild(Y.canvasEl),Y.ctx=Y.canvasEl.getContext("2d"),Y.canvasEl.width=Y.images[0].naturalWidth||Y.images[0].width,Y.canvasEl.height=Y.images[0].naturalHeight||Y.images[0].height,Y.animationObject=anime({targets:Y,currentImage:Y.allLength,duration:m,loop:c,autoplay:s,round:1,endDelay:f,delay:y,direction:h,easing:w,begin:function(e){L&&L(e)},update:function(e){Y.ctx.clearRect(0,0,Y.canvasEl.width,Y.canvasEl.height),Y.ctx.drawImage(Y.images[Y.currentImage],0,0),P&&P(e)},complete:function(e){H&&H(e)}})}},T={play:function(){return Y.animationObject.play()}};return C.init(),{actions:T}},e.preloader=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.containerSelector,n=e.onPageLoaded,o=void 0===n?null:n,i=e.onBegin,l=void 0===i?null:i,a={container:document.querySelector(t)},r={start:function(){var e;document.documentElement.style.overflowY="hidden",l&&l(),e=r.onPageLoaded,"complete"!==document.readyState?document.addEventListener("readystatechange",(function(t){"complete"===t.target.readyState&&e()})):e()},hide:function(){a.container.style.display="none",document.documentElement.style.overflowY=""},onPageLoaded:function(){o&&o()}};return r.start(),{actions:r}},e.randomLetters=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.targetsSelector,n=e.stepPerFrames,o=void 0===n?3:n,i=e.symbols,l=e.onBegin,a=void 0===l?null:l,r=e.onUpdate,c=void 0===r?null:r,d=e.onComplete,s=void 0===d?null:d,u=e.animation,m=void 0===u?null:u,p=document.querySelector(t).parentNode,f={scale:{value:[0,1],duration:function(){return anime.random(500,1e3)},easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:function(){return anime.random(300,600)},easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},v="random-letters-wrapper"===p.className,h=[];function g(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(t).forEach((function(e,t){var n,l=e.innerHTML;if(!v){var r=e.parentNode;g(e);var d=e.offsetHeight,u=e.offsetWidth,p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,i=document.createElement("span");return t&&(i.className=t),i.style.height=o+"px",i.style.width=n+"px",i.appendChild(e),i}(e,"random-letters-wrapper",u,d);!function(e){e.style.willChange="opacity, transform"}(p),g(p),r.appendChild(p)}var y=0,E=Object.assign(m||f,{targets:e,begin:function(e){var t,i,l,r;t=0,i=e.duration,l=o,r=Math.floor((i-t)/l),n=Array.from({length:r+1},(function(e,n){return n*l+t})),a&&a(e)},update:function(t){var o;y++,n.includes(y)&&(" "!==e.innerHTML&&(e.innerHTML=(o=i||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").charAt(Math.floor(Math.random()*o.length)))),c&&c(t)},complete:function(t){e.innerHTML=l,s&&s(t)}});h.push(anime(E))})),h.map((function(e){return e.play()}))},e.scrollContainer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.sectionSelector,o=e.wrapperSelector,i=e.duration,l=void 0===i?1e3:i,a=e.easing,r=void 0===a?"easeInOutQuad":a,c=e.onBegin,d=void 0===c?null:c,s=e.onComplete,u=void 0===s?null:s,m=document.querySelector(n),p=document.querySelector(o),f={slider:1,scrollPosition:0,sectionHeight:m.offsetHeight,animating:!1,contentEl:p,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},v=t((function(e){var t=f.scrollPosition,n=f.sectionHeight,o=f.animating,i=f.contentEl,a=f.scrollReachedEndPosition;if(!o&&e!==a){var c="down"===e?t+n:t-n;anime({targets:i,scrollTop:[t,c],duration:l,easing:r,begin:function(e){f.animating=!0,d&&d(f.slider,e)},complete:function(t){f.animating=!1,f.scrollPosition=c,f.scrollReachedEndPosition=function(){var e=f.contentEl,t=f.sectionHeight,n=e.scrollHeight-t,o=e.scrollTop;return o===n?"down":0===o?"up":""}(),"down"===e?f.slider++:f.slider--,u&&u(f.slider,t),f.scroll.clicked&&w()}})}}),300);function h(e){e.preventDefault(),e.deltaY<0?v("up"):e.deltaY>0&&v("down")}function g(e){var t=e.target.offsetHeight,n=e.clientY/t;n=n.toFixed(1),v(n>=.5?"down":"up")}function y(e){f.scroll.clicked=!0,f.scroll.position=e.clientY}function E(e){if(f.scroll.clicked){var t=e.clientY;t<f.scroll.position&&v("up"),t>f.scroll.position&&v("down")}}function w(){f.scroll.clicked=!1,f.scroll.position=0}function S(){f.sectionHeight=m.offsetHeight,f.contentEl.scrollTop=(f.slider-1)*f.sectionHeight,f.scrollPosition=f.contentEl.scrollTop}return function(){window.scrollTop=0,f.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="hidden",document.documentElement.style.height="100%",document.body.style.height="100%",f.beforeInitStyles.contentElOverflowY=f.contentEl.style.overflowY,f.beforeInitStyles.contentElOverflowX=f.contentEl.style.overflowX,function(e){e.style.height="100%";var t=[];for(var n in e){if("BODY"==(e=e.parentNode).nodeName)break;t.push(e)}t.forEach((function(e){return e.style.height="100%"}))}(f.contentEl),f.contentEl.style.overflowY="scroll",f.contentEl.style.overflowX="hidden",f.contentEl.style.willChange="scroll-position",f.contentEl.scrollTop=0;var e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",f.contentEl.appendChild(e),window.addEventListener("resize",S),document.addEventListener("touchmove",h,{passive:!1}),document.addEventListener("wheel",h,{passive:!1}),e.addEventListener("mousedown",y,{passive:!1}),e.addEventListener("mousemove",E,{passive:!1}),e.addEventListener("mouseup",w,{passive:!1}),e.addEventListener("click",g,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=f.beforeInitStyles.documentOverflowY,f.contentEl.style.overflowY=f.beforeInitStyles.contentElOverflowY,f.contentEl.style.overflowX=f.beforeInitStyles.contentElOverflowX,document.documentElement.style.height=null,document.body.style.height=null,document.removeEventListener("touchmove",h,{passive:!1}),document.removeEventListener("wheel",h,{passive:!1}),window.removeEventListener("resize",S)}}},e.slider=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.slidesLength,n=e.autoplay,o=void 0!==n&&n,i=e.timeout,l=void 0===i?3e3:i,a=e.onSlide,r={slidesLength:t,currentSlideIndex:0,nextSlideIndex:null,playing:!1,autoplay:o,timeout:l},c={isPlaying:function(){return r.playing},timer:function(e){var t=this,n=0;!function o(i){i-n>l&&(e(),n=i),t.frame=requestAnimationFrame(o)}()},cancelTimer:function(){cancelAnimationFrame(this.frame)}},d={play:function(e){if(!c.isPlaying()&&e!==r.currentSlideIndex){r.playing=!0,r.nextSlideIndex=t-1<e?0:e;var n=r.currentSlideIndex,o=r.nextSlideIndex;a(n,o,d.stop)}},stopAutoplay:function(){r.autoplay=!1,c.cancelTimer()},stop:function(){r.currentSlideIndex=r.nextSlideIndex,r.playing=!1},startAutoplay:function(){r.autoplay=!0,c.timer((function(){var e=r.currentSlideIndex+1;d.play(e)}))}},s={playNext:function(){s.stopAutoplay();var e=r.currentSlideIndex+1;d.play(e)},playPrev:function(){s.stopAutoplay();var e=r.currentSlideIndex-1;d.play(e)},playIndex:function(e){s.stopAutoplay(),d.play(e)},stopAutoplay:function(){r.autoplay&&d.stopAutoplay()},startAutoplay:function(){d.startAutoplay()}};return o&&s.startAutoplay(),{state:r,actions:s}},e.throttle=t,e}({});

