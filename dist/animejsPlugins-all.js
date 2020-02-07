var animejsPlugins=function(e){"use strict";function n(e,n){var t,o,l=!1;return function i(){if(l)return t=arguments,void(o=this);e.apply(this,arguments),l=!0,setTimeout((function(){l=!1,t&&(i.apply(o,t),t=o=null)}),n)}}function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.tagName,o=void 0===t?"span":t,l=n.split,i=n.setClassName,r=void 0===i?function(e){return"char"+e}:i;e.normalize();var a=1;function c(e){var n=e.parentNode,t=e.nodeValue;(l?l(t):t.split("")).forEach((function(t){var l=document.createElement(o),i=r(a++,t);i&&(l.className=i),l.appendChild(document.createTextNode(t)),l.setAttribute("aria-hidden","true"),n.insertBefore(l,e)})),""!==t.trim()&&n.setAttribute("aria-label",t),n.removeChild(e)}!function e(n){if(3===n.nodeType)return c(n);var t=Array.prototype.slice.call(n.childNodes);if(1===t.length&&3===t[0].nodeType)return c(t[0]);t.forEach((function(n){e(n)}))}(e)}return e.charmingWordsChars=function(e){t(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return"word-".concat(e)}}),e.querySelectorAll('span[class^="word"]').forEach((function(e){return t(e)}))},e.imagesPlayer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.containerSelector,t=e.path,o=e.from,l=e.to,i=e.loop,r=void 0===i||i,a=e.autoplay,c=void 0===a||a,s=e.duration,d=void 0===s?1e3:s,u=e.endDelay,p=void 0===u?500:u,m=e.delay,f=void 0===m?0:m,v=e.easing,g=void 0===v?"linear":v,h=e.onImagesLoaded,y=void 0===h?null:h,E=e.onBegin,w=void 0===E?null:E,S=e.onUpdate,x=void 0===S?null:S,I=e.onComplete,L=void 0===I?null:I,b={containerSelector:n,wrapperEl:"",imagesWrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},A={init:function(){A.loadImages()},loadImages:function(){b.wrapperEl=document.querySelector(b.containerSelector),b.imagesWrapperEl=document.createElement("div"),b.imagesWrapperEl.style.display="none",b.wrapperEl.appendChild(b.imagesWrapperEl);var e=function(e,n,t){for(var o=t.indexOf("{num}"),l=[],i=e;i<=n;i++)l.push((r=i,[t.slice(0,o),r,t.slice(o+5)].join("")));var r;return b.allLength=n-e,b.lastImage=n,{path:l}}(o,l,t).path.map((function(e){var n=document.createElement("img");return n.src=e,b.imagesWrapperEl.appendChild(n),new Promise((function(e){return n.addEventListener("load",(function t(){return n.removeEventListener("load",t),e(n)}))}))}));Promise.all(e).then((function(e){b.images=e,A.render(),y&&y(b.animationObject)})).catch((function(e){return console.log("images not loaded")}))},render:function(){b.canvasEl=document.createElement("canvas"),b.canvasEl.className="ap-imagesplayer",b.wrapperEl.appendChild(b.canvasEl),b.ctx=b.canvasEl.getContext("2d"),b.canvasEl.width=b.images[0].naturalWidth,b.canvasEl.height=b.images[0].naturalHeight,b.animationObject=anime({targets:b,currentImage:b.allLength,duration:d,loop:r,autoplay:c,round:1,endDelay:p,delay:f,easing:g,begin:function(e){w&&w(e)},update:function(e){b.ctx.clearRect(0,0,b.canvasEl.width,b.canvasEl.height),b.ctx.drawImage(b.images[b.currentImage],0,0,b.images[b.currentImage].naturalWidth,b.images[b.currentImage].naturalHeight),x&&x(e)},complete:function(e){L&&L(e)}})}},C={play:function(){return b.animationObject.play()}};return A.init(),{actions:C}},e.preloader=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.containerSelector,t=e.onPageLoaded,o=void 0===t?null:t,l=e.onBegin,i=void 0===l?null:l,r={container:document.querySelector(n)},a={start:function(){var e;document.documentElement.style.overflowY="hidden",i&&i(),e=a.onPageLoaded,"complete"!==document.readyState?document.addEventListener("readystatechange",(function(n){"complete"===n.target.readyState&&e()})):e()},hide:function(){r.container.style.display="none",document.documentElement.style.overflowY=""},onPageLoaded:function(){o&&o()}};return a.start(),{actions:a}},e.randomLetters=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.targetsSelector,t=e.stepPerFrames,o=void 0===t?3:t,l=e.symbols,i=e.onBegin,r=void 0===i?null:i,a=e.onUpdate,c=void 0===a?null:a,s=e.onComplete,d=void 0===s?null:s,u=e.animation,p=void 0===u?null:u,m=document.querySelector(n).parentNode,f={scale:{value:[0,1],duration:function(){return anime.random(500,1e3)},easing:"cubicBezier(.17, -0, .83, 1)"},opacity:{value:[0,1],duration:500},endDelay:function(){return anime.random(300,600)},easing:"cubicBezier(.17, .17, .83, .83)",autoplay:!1},v="random-letters-wrapper"===m.className,g=[];function h(e){e.style.display="inline-block",e.style.whiteSpace="pre"}document.querySelectorAll(n).forEach((function(e,n){var t,i=e.innerHTML;if(!v){var a=e.parentNode;h(e);var s=e.offsetHeight,u=e.offsetWidth,m=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,l=document.createElement("span");return n&&(l.className=n),l.style.height=o+"px",l.style.width=t+"px",l.appendChild(e),l}(e,"random-letters-wrapper",u,s);!function(e){e.style.willChange="opacity, transform"}(m),h(m),a.appendChild(m)}var y=0,E=Object.assign(p||f,{targets:e,begin:function(e){var n,l,i,a;n=0,l=e.duration,i=o,a=Math.floor((l-n)/i),t=Array.from({length:a+1},(function(e,t){return t*i+n})),r&&r(e)},update:function(n){var o;y++,t.includes(y)&&(" "!==e.innerHTML&&(e.innerHTML=(o=l||"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").charAt(Math.floor(Math.random()*o.length)))),c&&c(n)},complete:function(n){e.innerHTML=i,d&&d(n)}});g.push(anime(E))})),g.map((function(e){return e.play()}))},e.scrollContainer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.sectionSelector,o=e.wrapperSelector,l=e.duration,i=void 0===l?1e3:l,r=e.easing,a=void 0===r?"easeInOutQuad":r,c=e.onBegin,s=void 0===c?null:c,d=e.onComplete,u=void 0===d?null:d,p=document.querySelector(t),m=document.querySelector(o),f={slider:1,scrollPosition:0,sectionHeight:p.offsetHeight,animating:!1,contentEl:m,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},v=n((function(e){var n=f.scrollPosition,t=f.sectionHeight,o=f.animating,l=f.contentEl,r=f.scrollReachedEndPosition;if(!o&&e!==r){var c="down"===e?n+t:n-t;anime({targets:l,scrollTop:[n,c],duration:i,easing:a,begin:function(e){f.animating=!0,s&&s(f.slider,e)},complete:function(n){f.animating=!1,f.scrollPosition=c,f.scrollReachedEndPosition=function(){var e=f.contentEl,n=f.sectionHeight,t=e.scrollHeight-n,o=e.scrollTop;return o===t?"down":0===o?"up":""}(),"down"===e?f.slider++:f.slider--,u&&u(f.slider,n),f.scroll.clicked&&w()}})}}),300);function g(e){e.preventDefault(),e.deltaY<0?v("up"):e.deltaY>0&&v("down")}function h(e){var n=e.target.offsetHeight,t=e.clientY/n;t=t.toFixed(1),v(t>=.5?"down":"up")}function y(e){f.scroll.clicked=!0,f.scroll.position=e.clientY}function E(e){if(f.scroll.clicked){var n=e.clientY;n<f.scroll.position&&v("up"),n>f.scroll.position&&v("down")}}function w(){f.scroll.clicked=!1,f.scroll.position=0}function S(){f.sectionHeight=p.offsetHeight,f.contentEl.scrollTop=(f.slider-1)*f.sectionHeight,f.scrollPosition=f.contentEl.scrollTop}return function(){window.scrollTop=0,f.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="hidden",document.documentElement.style.height="100%",document.body.style.height="100%",f.beforeInitStyles.contentElOverflowY=f.contentEl.style.overflowY,f.beforeInitStyles.contentElOverflowX=f.contentEl.style.overflowX,function(e){e.style.height="100%";var n=[];for(var t in e){if("BODY"==(e=e.parentNode).nodeName)break;n.push(e)}n.forEach((function(e){return e.style.height="100%"}))}(f.contentEl),f.contentEl.style.overflowY="scroll",f.contentEl.style.overflowX="hidden",f.contentEl.style.willChange="scroll-position",f.contentEl.scrollTop=0;var e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",f.contentEl.appendChild(e),window.addEventListener("resize",S),document.addEventListener("touchmove",g,{passive:!1}),document.addEventListener("wheel",g,{passive:!1}),e.addEventListener("mousedown",y,{passive:!1}),e.addEventListener("mousemove",E,{passive:!1}),e.addEventListener("mouseup",w,{passive:!1}),e.addEventListener("click",h,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=f.beforeInitStyles.documentOverflowY,f.contentEl.style.overflowY=f.beforeInitStyles.contentElOverflowY,f.contentEl.style.overflowX=f.beforeInitStyles.contentElOverflowX,document.documentElement.style.height=null,document.body.style.height=null,document.removeEventListener("touchmove",g,{passive:!1}),document.removeEventListener("wheel",g,{passive:!1}),window.removeEventListener("resize",S)}}},e.slider=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.slidersSelector,t=e.autoplay,o=void 0!==t&&t,l=e.timeout,i=void 0===l?3e3:l,r=e.onSlide,a=Array.from(document.querySelectorAll(n)),c={slidesLength:a.length,currentSlideIndex:0,currentSlideEl:null,nextSlideIndex:null,nextSlideEl:null,allSlidesEls:a,playing:!1,autoplay:o,timeout:i},s={isPlaying:function(){return c.playing},timer:function(e){var n=this,t=0;!function o(l){l-t>i&&(e(),t=l),n.frame=requestAnimationFrame(o)}()},cancelRaf:function(){cancelAnimationFrame(this.frame)}},d={play:function(e){if(!s.isPlaying()&&e!==c.currentSlideIndex){c.playing=!0;var n=c.currentSlideIndex,t=c.slidesLength;c.currentSlideEl=a[n],c.nextSlideIndex=t-1<e?0:e,c.nextSlideEl=a[c.nextSlideIndex];var o=c.currentSlideEl,l=c.nextSlideEl;r(o,l,d.stop)}},stopAutoplay:function(){c.autoplay=!1,s.cancelRaf()},stop:function(){c.currentSlideIndex=c.nextSlideIndex,c.playing=!1},startAutoplay:function(){s.timer((function(){var e=c.currentSlideIndex+1;d.play(e)}))}},u={playNext:function(){u.stopAutoplay();var e=c.currentSlideIndex+1;d.play(e)},playPrev:function(){u.stopAutoplay();var e=c.currentSlideIndex-1;d.play(e)},playIndex:function(e){u.stopAutoplay(),d.play(e)},stopAutoplay:function(){c.autoplay&&d.stopAutoplay()},startAutoplay:function(){d.startAutoplay()}};return o&&u.startAutoplay(),{state:c,actions:u}},e.throttle=n,e}({});
