import {throttle} from './helpers.js';
export function scrollContainer({wrapper, onBegin = null, onComplete = null, duration, easing, section} = {}) {

  let state = {
    slider: 1,//slider index 
    scrollPosition: 0,
    sectionHeight: section.clientHeight,
    animating: false,
    contentEl: wrapper,
    scrollReachedEndPosition: 'up',
    beforeInitStyles: {},
    scroll: {
    	position: 0,
    	clicked: false
    },
  }


  function animate(direction) {
    let {scrollPosition, sectionHeight, animating, contentEl, scrollReachedEndPosition} = state;
    //If animation run return
    //If scroll reach end of slider return
    if (animating || direction === scrollReachedEndPosition ) return;
    let newPosition = direction === 'down' ? scrollPosition + sectionHeight : scrollPosition - sectionHeight;
    anime({
      targets: contentEl,
      scrollTop: [scrollPosition, newPosition],
      duration: duration,
      easing: easing,
      begin: function() {
        state.animating = true;
        onBegin ? onBegin(state.slider) : ''
      },
      complete: function() {
        state.animating = false
        state.scrollPosition = newPosition;
        state.scrollReachedEndPosition = calcScrollPosition();
        direction === 'down' ? state.slider++ : state.slider--
        onComplete ? onComplete(state.slider) : ''
        //clear if animation triggered by scroll
        if (state.scroll.clicked) scrollClear()
      },
    })
  }

  const animateThrottle = throttle(animate, 300);

  function scroll(event) {
    event.preventDefault()
    if (event.deltaY < 0) {
      animateThrottle('up');
    }
    else if (event.deltaY > 0) {
      animateThrottle('down');
    } 
  }

  function calcScrollPosition() {
    let {contentEl, sectionHeight} = state;
    let contentElHeight = contentEl.scrollHeight - sectionHeight;
    let scrollPosition = contentEl.scrollTop;
    return scrollPosition === contentElHeight ? 'down'
            : scrollPosition === 0 ? 'up'
            : ''
  }
  //If clicked in position more then half of scrollbar we slide down else we slide up
  function scrollClick(event) {
    let scrollBarHeight = event.target.clientHeight;
    let clickY = event.clientY;
    let clickProcent = clickY / scrollBarHeight;
    clickProcent = clickProcent.toFixed(1)
    clickProcent >= 0.5 ? animateThrottle('down') : animateThrottle('up');
  }

  //Set delta on mouse down
  function scrollSetDelta(event) {
  	state.scroll.clicked = true;
  	state.scroll.position = event.clientY;
  }

  //Get direction and scroll
  function scrollMove(event) {
  	if (!state.scroll.clicked) return
  	let moveY = event.clientY;
  	if (moveY < state.scroll.position) {
  		animateThrottle('up');
  	}
  	if (moveY > state.scroll.position) {
  		animateThrottle('down');
  	}
  }

  function scrollClear() {
  	state.scroll.clicked = false;
    state.scroll.position = 0;
  }

  function init() {
    //Set scroll position to top
    window.scrollTo(0,0)
    //Save before we changed value
    state.beforeInitStyles.documentOverflowY = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = 'inherit';

    //Save before we changed value
    state.beforeInitStyles.contentElOverflowY = state.contentEl.style.overflowY;
    state.beforeInitStyles.contentElOverflowX = state.contentEl.style.overflowX;
    state.contentEl.style.overflowY = 'scroll';
    state.contentEl.style.overflowX = 'hidden';
    state.contentEl.style.willChange = 'scroll-position';
    state.contentEl.scrollTo(0,0);

    //Create fixed element above scrollbar to avoid direct click on it
    const hackEl = document.createElement('div');
    hackEl.style.position = 'fixed';
    hackEl.style.height = '100%';
    hackEl.style.width = '20px';
    hackEl.style.top = '0';
    hackEl.style.right = '0';
    state.contentEl.appendChild(hackEl);

    //Set listners
    document.addEventListener('touchmove', scroll, {passive: false})
    document.addEventListener('wheel', scroll, {passive: false})
    hackEl.addEventListener('mousedown', scrollSetDelta, {passive: false})
    hackEl.addEventListener('mousemove', scrollMove, {passive: false})
    hackEl.addEventListener('mouseup', scrollClear, {passive: false})
    hackEl.addEventListener('click', scrollClick, {passive: false})
  }
  init()


  function destroy() {
    document.documentElement.style.overflowY = state.beforeInitStyles.documentOverflowY;
    state.contentEl.style.overflowY = state.beforeInitStyles.contentElOverflowY;
    state.contentEl.style.overflowX = state.beforeInitStyles.contentElOverflowX;
    document.removeEventListener('touchmove', scroll, {passive: false})
    document.removeEventListener('wheel', scroll, {passive: false})
  }
  
  return {destroy};
}