var animejsPlugins=function(e){"use strict";return e.imagesPlayer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.containerSelector,n=e.path,t=e.from,i=e.to,r=e.loop,l=void 0===r||r,o=e.autoplay,c=void 0===o||o,u=e.duration,s=void 0===u?1e3:u,d=e.endDelay,m=void 0===d?500:d,g=e.delay,p=void 0===g?0:g,v=e.easing,h=void 0===v?"linear":v,E=e.onImagesLoaded,f=void 0===E?null:E,y=e.onBegin,I=void 0===y?null:y,w=e.onUpdate,W=void 0===w?null:w,j=e.onComplete,x=void 0===j?null:j,L={containerSelector:a,wrapperEl:"",imagesWrapperEl:"",ctx:"",canvasEl:"",images:[],currentImage:0,allLength:"",lastImage:"",animationObject:""},b={init:function(){b.loadImages()},loadImages:function(){L.wrapperEl=document.querySelector(L.containerSelector),L.imagesWrapperEl=document.createElement("div"),L.imagesWrapperEl.style.display="none",L.wrapperEl.appendChild(L.imagesWrapperEl);var e=function(e,a,n){for(var t=n.indexOf("{num}"),i=[],r=e;r<=a;r++)i.push((l=r,[n.slice(0,t),l,n.slice(t+5)].join("")));var l;return L.allLength=a-e,L.lastImage=a,{path:i}}(t,i,n).path.map((function(e){var a=document.createElement("img");return a.src=e,L.imagesWrapperEl.appendChild(a),new Promise((function(e){return a.addEventListener("load",(function n(){return a.removeEventListener("load",n),e(a)}))}))}));Promise.all(e).then((function(e){L.images=e})).catch((function(e){return console.log("images not loaded")})).then((function(){b.render(),f&&f(L.animationObject)})).catch((function(e){return console.log(e)}))},render:function(){L.canvasEl=document.createElement("canvas"),L.canvasEl.className="ap-imagesplayer",L.wrapperEl.appendChild(L.canvasEl),L.ctx=L.canvasEl.getContext("2d"),L.canvasEl.width=L.images[0].naturalWidth,L.canvasEl.height=L.images[0].naturalHeight,L.animationObject=anime({targets:L,currentImage:L.allLength,duration:s,loop:l,autoplay:c,round:1,endDelay:m,delay:p,easing:h,begin:function(e){I&&I(e)},update:function(e){L.ctx.clearRect(0,0,L.canvasEl.width,L.canvasEl.height),L.ctx.drawImage(L.images[L.currentImage],0,0,L.images[L.currentImage].naturalWidth,L.images[L.currentImage].naturalHeight),W&&W(e)},complete:function(e){x&&x(e)}})}},C={play:function(){return L.animationObject.play()}};return b.init(),{actions:C}},e}({});
