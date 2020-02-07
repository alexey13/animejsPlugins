var animejsPlugins=function(e){"use strict";function n(e,n){var t,o,i=!1;return function l(){if(i)return t=arguments,void(o=this);e.apply(this,arguments),i=!0,setTimeout((function(){i=!1,t&&(l.apply(o,t),t=o=null)}),n)}}function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.tagName,o=void 0===t?"span":t,i=n.split,l=n.setClassName,r=void 0===l?function(e){return"char"+e}:l;e.normalize();var a=1;function c(e){var n=e.parentNode,t=e.nodeValue;(i?i(t):t.split("")).forEach((function(t){var i=document.createElement(o),l=r(a++,t);l&&(i.className=l),i.appendChild(document.createTextNode(t)),i.setAttribute("aria-hidden","true"),n.insertBefore(i,e)})),""!==t.trim()&&n.setAttribute("aria-label",t),n.removeChild(e)}!function e(n){if(3===n.nodeType)return c(n);var t=Array.prototype.slice.call(n.childNodes);if(1===t.length&&3===t[0].nodeType)return c(t[0]);t.forEach((function(n){e(n)}))}(e)}return e.charmingWordsChars=function(e){t(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return"word-".concat(e)}}),e.querySelectorAll('span[class^="word"]').forEach((function(e){return t(e)}))},e.imagesPlayer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.containerSelector,t=e.path,o=e.from,i=e.to,l=e.loop,r=void 0===l||l,a=e.autoplay,c=void 0===a||a,s=e.duration,d=void 0===s?1e3:s,u=e.endDelay,p=void 0===u?500:u,m=e.delay,f=void 0===m?0:m,v=e.easing,g=void 0===v?"linear":v,h=e.onImagesLoaded,y=void 0===h?null:h,E=e.onBegin,w=void 0===E?null:E,S=e.onUpdate,I=void 0===S?null:S,x=e.onComplete,L=void 0===x?null:x,b={containerSelector:n,wrapperEl:"",imagesWrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},A={init:function(){A.loadImages()},loadImages:function(){b.wrapperEl=document.querySelector(b.containerSelector),b.imagesWrapperEl=document.createElement("div"),b.imagesWrapperEl.style.display="none",b.wrapperEl.appendChild(b.imagesWrapperEl);var e=function(e,n,t){for(var o=t.indexOf("{num}"),i=[],l=e;l<=n;l++)i.push((r=l,[t.slice(0,o),r,t.slice(o+5)].join("")));var r;return b.allLength=n-e,b.lastImage=n,{path:i}}(o,i,t).path.map((function(e){var n=document.createElement("img");return n.src=e,b.imagesWrapperEl.appendChild(n),new Promise((function(e){return n.addEventListener("load",(function t(){return n.removeEventListener("load",t),e(n)}))}))}));Promise.all(e).then((function(e){b.images=e,A.render(),y&&y(b.animationObject)})).catch((function(e){return console.log("images not loaded")}))},render:function(){b.canvasEl=document.createElement("canvas"),b.canvasEl.className="ap-imagesplayer",b.wrapperEl.appendChild(b.canvasEl),b.ctx=b.canvasEl.getContext("2d"),b.canvasEl.width=b.images[0].naturalWidth,b.canvasEl.height=b.images[0].naturalHeight,b.animationObject=anime({targets:b,currentImage:b.allLength,duration:d,loop:r,autoplay:c,round:1,endDelay:p,delay:f,easing:g,begin:function(e){w&&w(e)},update:function(e){b.ctx.clearRect(0,0,b.canvasEl.width,b.canvasEl.height),b.ctx.drawImage(b.images[b.currentImage],0,0,b.images[b.currentImage].naturalWidth,b.images[b.currentImage].naturalHeight),I&&I(e)},complete:function(e){L&&L(e)}})}},C={play:function(){return b.animationObject.play()}};return A.init(),{actions:C}},e.preloader=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.containerSelector,t=e.onPageLoaded,o=void 0===t?null:t,i=e.onBegin,l=void 0===i?null:i,r={container:document.querySelector(n)},a={start:function(){var e;document.documentElement.style.overflowY="hidden",l&&l(),e=a.onPageLoaded,"complete"!==document.readyState?document.addEventListener("readystatechange",(function(n){"complete"===n.target.readyState&&e()})):e()},hide:function(){r.container.style.display="none",document.documentElement.style.overflowY=""},onPageLoaded:function(){o&&o()}};return a.start(),{actions:a}},e.randomLetters=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.targetsSelector,t=e.stepPerFrames,o=void 0===t?3:t,i=e.symbols,l=e.onBegin,r=void 0===l?null:l,a=e.onUpdate,c=void 0===a?null:a,s=e.onComplete,d=void 0===s?null:s,u=e.animation,p=void 0===u?null:u,m=document.querySelector(n).parentNode,f={scale:{value:[0,1],duration:function(){return anime.random(500,1e3)},easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:function(){return anime.random(300,600)},easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},v="random-letters-wrapper"===m.className,g=[];function h(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(n).forEach((function(e,n){var t,l=e.innerHTML;if(!v){var a=e.parentNode;h(e);var s=e.offsetHeight,u=e.offsetWidth,m=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,i=document.createElement("span");return n&&(i.className=n),i.style.height=o+"px",i.style.width=t+"px",i.appendChild(e),i}(e,"random-letters-wrapper",u,s);!function(e){e.style.willChange="opacity, transform"}(m),h(m),a.appendChild(m)}var y=0,E=Object.assign(p||f,{targets:e,begin:function(e){var n,i,l,a;n=0,i=e.duration,l=o,a=Math.floor((i-n)/l),t=Array.from({length:a+1},(function(e,t){return t*l+n})),r&&r(e)},update:function(n){var o;y++,t.includes(y)&&(" "!==e.innerHTML&&(e.innerHTML=(o=i||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").charAt(Math.floor(Math.random()*o.length)))),c&&c(n)},complete:function(n){e.innerHTML=l,d&&d(n)}});g.push(anime(E))})),g.map((function(e){return e.play()}))},e.scrollContainer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.sectionSelector,o=e.wrapperSelector,i=e.duration,l=void 0===i?1e3:i,r=e.easing,a=void 0===r?"easeInOutQuad":r,c=e.onBegin,s=void 0===c?null:c,d=e.onComplete,u=void 0===d?null:d,p=document.querySelector(t),m=document.querySelector(o),f={slider:1,scrollPosition:0,sectionHeight:p.offsetHeight,animating:!1,contentEl:m,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},v=n((function(e){var n=f.scrollPosition,t=f.sectionHeight,o=f.animating,i=f.contentEl,r=f.scrollReachedEndPosition;if(!o&&e!==r){var c="down"===e?n+t:n-t;anime({targets:i,scrollTop:[n,c],duration:l,easing:a,begin:function(e){f.animating=!0,s&&s(f.slider,e)},complete:function(n){f.animating=!1,f.scrollPosition=c,f.scrollReachedEndPosition=function(){var e=f.contentEl,n=f.sectionHeight,t=e.scrollHeight-n,o=e.scrollTop;return o===t?"down":0===o?"up":""}(),"down"===e?f.slider++:f.slider--,u&&u(f.slider,n),f.scroll.clicked&&w()}})}}),300);function g(e){e.preventDefault(),e.deltaY<0?v("up"):e.deltaY>0&&v("down")}function h(e){var n=e.target.offsetHeight,t=e.clientY/n;t=t.toFixed(1),v(t>=.5?"down":"up")}function y(e){f.scroll.clicked=!0,f.scroll.position=e.clientY}function E(e){if(f.scroll.clicked){var n=e.clientY;n<f.scroll.position&&v("up"),n>f.scroll.position&&v("down")}}function w(){f.scroll.clicked=!1,f.scroll.position=0}function S(){f.sectionHeight=p.offsetHeight,f.contentEl.scrollTop=(f.slider-1)*f.sectionHeight,f.scrollPosition=f.contentEl.scrollTop}return function(){window.scrollTop=0,f.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="hidden",document.documentElement.style.height="100%",document.body.style.height="100%",f.beforeInitStyles.contentElOverflowY=f.contentEl.style.overflowY,f.beforeInitStyles.contentElOverflowX=f.contentEl.style.overflowX,function(e){e.style.height="100%";var n=[];for(var t in e){if("BODY"==(e=e.parentNode).nodeName)break;n.push(e)}n.forEach((function(e){return e.style.height="100%"}))}(f.contentEl),f.contentEl.style.overflowY="scroll",f.contentEl.style.overflowX="hidden",f.contentEl.style.willChange="scroll-position",f.contentEl.scrollTop=0;var e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",f.contentEl.appendChild(e),window.addEventListener("resize",S),document.addEventListener("touchmove",g,{passive:!1}),document.addEventListener("wheel",g,{passive:!1}),e.addEventListener("mousedown",y,{passive:!1}),e.addEventListener("mousemove",E,{passive:!1}),e.addEventListener("mouseup",w,{passive:!1}),e.addEventListener("click",h,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=f.beforeInitStyles.documentOverflowY,f.contentEl.style.overflowY=f.beforeInitStyles.contentElOverflowY,f.contentEl.style.overflowX=f.beforeInitStyles.contentElOverflowX,document.documentElement.style.height=null,document.body.style.height=null,document.removeEventListener("touchmove",g,{passive:!1}),document.removeEventListener("wheel",g,{passive:!1}),window.removeEventListener("resize",S)}}},e.slider=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.slidersSelector,t=e.autoplay,o=void 0!==t&&t,i=e.timeout,l=void 0===i?3e3:i,r=e.onSlide,a=Array.from(document.querySelectorAll(n)),c=a.length,s={slidesLength:c,currentSlideIndex:0,nextSlideIndex:null,allSlidesEls:a,playing:!1,autoplay:o,timeout:l},d={isPlaying:function(){return s.playing},timer:function(e){var n=this,t=0;!function o(i){i-t>l&&(e(),t=i),n.frame=requestAnimationFrame(o)}()},cancelTimer:function(){cancelAnimationFrame(this.frame)}},u={play:function(e){if(!d.isPlaying()&&e!==s.currentSlideIndex){s.playing=!0,s.nextSlideIndex=c-1<e?0:e;var n=s.currentSlideIndex,t=s.nextSlideIndex;r(n,t,u.stop)}},stopAutoplay:function(){s.autoplay=!1,d.cancelTimer()},stop:function(){s.currentSlideIndex=s.nextSlideIndex,s.playing=!1},startAutoplay:function(){d.timer((function(){var e=s.currentSlideIndex+1;u.play(e)}))}},p={playNext:function(){p.stopAutoplay();var e=s.currentSlideIndex+1;u.play(e)},playPrev:function(){p.stopAutoplay();var e=s.currentSlideIndex-1;u.play(e)},playIndex:function(e){p.stopAutoplay(),u.play(e)},stopAutoplay:function(){s.autoplay&&u.stopAutoplay()},startAutoplay:function(){u.startAutoplay()}};return o&&p.startAutoplay(),{state:s,actions:p}},e.throttle=n,e}({});
