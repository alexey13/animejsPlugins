var animejsPlugins=function(t){"use strict";return t.slider=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.slidersSelector,e=t.autoplay,i=void 0!==e&&e,l=t.timeout,a=void 0===l?3e3:l,o=t.onSlide,r=Array.from(document.querySelectorAll(n)),u=r.length,c={slidesLength:u,currentSlideIndex:0,nextSlideIndex:null,allSlidesEls:r,playing:!1,autoplay:i,timeout:a},p={isPlaying:function(){return c.playing},timer:function(t){var n=this,e=0;!function i(l){l-e>a&&(t(),e=l),n.frame=requestAnimationFrame(i)}()},cancelTimer:function(){cancelAnimationFrame(this.frame)}},d={play:function(t){if(!p.isPlaying()&&t!==c.currentSlideIndex){c.playing=!0,c.nextSlideIndex=u-1<t?0:t;var n=c.currentSlideIndex,e=c.nextSlideIndex;o(n,e,d.stop)}},stopAutoplay:function(){c.autoplay=!1,p.cancelTimer()},stop:function(){c.currentSlideIndex=c.nextSlideIndex,c.playing=!1},startAutoplay:function(){p.timer((function(){var t=c.currentSlideIndex+1;d.play(t)}))}},s={playNext:function(){s.stopAutoplay();var t=c.currentSlideIndex+1;d.play(t)},playPrev:function(){s.stopAutoplay();var t=c.currentSlideIndex-1;d.play(t)},playIndex:function(t){s.stopAutoplay(),d.play(t)},stopAutoplay:function(){c.autoplay&&d.stopAutoplay()},startAutoplay:function(){d.startAutoplay()}};return i&&s.startAutoplay(),{state:c,actions:s}},t}({});