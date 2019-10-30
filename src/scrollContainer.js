import {throttle} from './helpers.js';
export function scrollContainer({sectionSelector, duration = 1000, easing = 'easeInOutQuad', onBegin = null, onComplete = null} = {}) {

  const section = document.querySelector(sectionSelector);

  const state = {
    slider: 1,//slider index 
    scrollPosition: 0,
    sectionHeight: section.offsetHeight,
    animating: false,
    contentEl: section.parentNode,
    scrollReachedEndPosition: 'up',
    beforeInitStyles: {},
    scroll: {
    	position: 0,
    	clicked: false
    },
  }

  //Direction - string 'up', 'down'
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
      begin: function(anim) {
        state.animating = true;
        onBegin ? onBegin(state.slider, anim) : ''
      },
      complete: function(anim) {
        state.animating = false
        state.scrollPosition = newPosition;
        state.scrollReachedEndPosition = calcScrollPosition();
        direction === 'down' ? state.slider++ : state.slider--
        onComplete ? onComplete(state.slider, anim) : ''
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
    let scrollBarHeight = event.target.offsetHeight;
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

  
  function resize() {
    //Recalc height
    state.sectionHeight = section.offsetHeight;
    //Set scroll position
    state.contentEl.scrollTop = (state.slider - 1) * state.sectionHeight;
    //Update scroll position value
    state.scrollPosition = state.contentEl.scrollTop;
  }

  function init() {
    //Set scroll position to top
    window.scrollTop = 0;
    //Save before we changed value
    state.beforeInitStyles.documentOverflowY = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = 'inherit';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';

    //Save before we changed value
    state.beforeInitStyles.contentElOverflowY = state.contentEl.style.overflowY;
    state.beforeInitStyles.contentElOverflowX = state.contentEl.style.overflowX;

    //Set each parent of section 100% height
    addStylesParents(state.contentEl);

    state.contentEl.style.overflowY = 'scroll';
    state.contentEl.style.overflowX = 'hidden';
    state.contentEl.style.willChange = 'scroll-position';
    state.contentEl.scrollTop = 0;

    //Create fixed element above scrollbar to avoid direct click on it
    const hackEl = document.createElement('div');
    hackEl.style.position = 'fixed';
    hackEl.style.height = '100%';
    hackEl.style.width = '20px';
    hackEl.style.top = '0';
    hackEl.style.right = '0';
    state.contentEl.appendChild(hackEl);

    //Set listners
    window.addEventListener('resize', resize);
    document.addEventListener('touchmove', scroll, {passive: false})
    document.addEventListener('wheel', scroll, {passive: false})
    hackEl.addEventListener('mousedown', scrollSetDelta, {passive: false})
    hackEl.addEventListener('mousemove', scrollMove, {passive: false})
    hackEl.addEventListener('mouseup', scrollClear, {passive: false})
    hackEl.addEventListener('click', scrollClick, {passive: false})
  }
  init()

  function addStylesParents(el) {
    el.style.height = '100%'
    let arr = [];
    for(let n in el){
      el = el.parentNode;
      if(el.nodeName == 'BODY') // return if the element is the body element
        break;
      arr.push(el);
    }
    arr.forEach(e => e.style.height = '100%')
  }

  function destroy() {
    document.documentElement.style.overflowY = state.beforeInitStyles.documentOverflowY;
    state.contentEl.style.overflowY = state.beforeInitStyles.contentElOverflowY;
    state.contentEl.style.overflowX = state.beforeInitStyles.contentElOverflowX;
    document.documentElement.style.height = '';
    document.body.style.height = '';
    document.removeEventListener('touchmove', scroll, {passive: false})
    document.removeEventListener('wheel', scroll, {passive: false})
    window.removeEventListener('resize', resize);
  }
  
  return {destroy};
}