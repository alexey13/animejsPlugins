var animejsPlugins=function(e){"use strict";return e.scrollContainer=function(){var e,t,n,o,l,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=i.wrapper,c=i.onBegin,r=void 0===c?null:c,d=i.onComplete,u=void 0===d?null:d,a=i.duration,v=i.easing,f={slider:1,scrollPosition:0,sectionHeight:i.section.clientHeight,animating:!1,contentEl:s,scrollReachedEndPosition:"up",beforeInitStyles:{},scroll:{position:0,clicked:!1}},p=(e=function(e){var t=f.scrollPosition,n=f.sectionHeight,o=f.animating,l=f.contentEl,i=f.scrollReachedEndPosition;if(!o&&e!==i){var s="down"===e?t+n:t-n;anime({targets:l,scrollTop:[t,s],duration:a,easing:v,begin:function(){f.animating=!0,r&&r(f.slider)},complete:function(){f.animating=!1,f.scrollPosition=s,f.scrollReachedEndPosition=function(){var e=f.contentEl,t=f.sectionHeight,n=e.scrollHeight-t,o=e.scrollTop;return o===n?"down":0===o?"up":""}(),"down"===e?f.slider++:f.slider--,u&&u(f.slider),f.scroll.clicked&&h()}})}},t=300,l=!1,function i(){if(l)return n=arguments,void(o=this);e.apply(this,arguments),l=!0,setTimeout((function(){l=!1,n&&(i.apply(o,n),n=o=null)}),t)});function m(e){e.preventDefault(),e.deltaY<0?p("up"):e.deltaY>0&&p("down")}function E(e){var t=e.target.clientHeight,n=e.clientY/t;n=n.toFixed(1),p(n>=.5?"down":"up")}function w(e){f.scroll.clicked=!0,f.scroll.position=e.clientY}function y(e){if(f.scroll.clicked){var t=e.clientY;t<f.scroll.position&&p("up"),t>f.scroll.position&&p("down")}}function h(){f.scroll.clicked=!1,f.scroll.position=0}return function(){window.scrollTop=0,f.beforeInitStyles.documentOverflowY=document.documentElement.style.overflowY,document.documentElement.style.overflowY="inherit",f.beforeInitStyles.contentElOverflowY=f.contentEl.style.overflowY,f.beforeInitStyles.contentElOverflowX=f.contentEl.style.overflowX,f.contentEl.style.overflowY="scroll",f.contentEl.style.overflowX="hidden",f.contentEl.style.willChange="scroll-position",f.contentEl.scrollTop=0;var e=document.createElement("div");e.style.position="fixed",e.style.height="100%",e.style.width="20px",e.style.top="0",e.style.right="0",f.contentEl.appendChild(e),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("wheel",m,{passive:!1}),e.addEventListener("mousedown",w,{passive:!1}),e.addEventListener("mousemove",y,{passive:!1}),e.addEventListener("mouseup",h,{passive:!1}),e.addEventListener("click",E,{passive:!1})}(),{destroy:function(){document.documentElement.style.overflowY=f.beforeInitStyles.documentOverflowY,f.contentEl.style.overflowY=f.beforeInitStyles.contentElOverflowY,f.contentEl.style.overflowX=f.beforeInitStyles.contentElOverflowX,document.removeEventListener("touchmove",m,{passive:!1}),document.removeEventListener("wheel",m,{passive:!1})}}},e}({});
