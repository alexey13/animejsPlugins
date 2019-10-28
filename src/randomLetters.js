import {wrapElementWidthHeight} from './helpers.js';
export function randomLetters({targetsSelector, stepPerFrames = 3, symbols, onBegin = null, onUpdate = null, onComplete = null, animation = null} = {}) {

  const charWrapper = 'random-letters-wrapper';
  const parent = document.querySelector(targetsSelector).parentNode;

  const defaultAnime = {
    scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
    opacity: {value: [0, 1], duration: 500 },
    endDelay: () => anime.random(300, 600),
    easing: 'cubicBezier(.17, .17, .83, .83)',
    autoplay: false,
  };

  //We get wrapped state by className
  const isAlreadyWrapped = parent.className === charWrapper ? true : false;

  //let frag = document.createDocumentFragment();
  let animes = [];

  document.querySelectorAll(targetsSelector).forEach((el, index) => {
    const value = el.innerHTML;

    //Before start animation we get width and height and wrap in span
    if (!isAlreadyWrapped) {
      let parentEl = el.parentNode;
      addInlineBlWhiteSp(el);
      const h = el.offsetHeight;
      const w = el.offsetWidth; 
      let wrapper = wrapElementWidthHeight(el, charWrapper, w, h);
      addHiddenWillCh(wrapper);
      addInlineBlWhiteSp(wrapper);
      parentEl.appendChild( wrapper );
    }

    //steps array
    let steps;
    //frame
    let upd = 0;
    let animeMerged = Object.assign(animation || defaultAnime, {
      targets: el,
      begin: function(anim) {
        steps = stepEvery(0, anim.duration, stepPerFrames);
        onBegin ? onBegin(anim) : ''
      },
      update: function(anim) {
        upd++
        //When update equals our step change symbol
        //If its a white space do not change symbol
        steps.includes(upd) ? (el.innerHTML !== " ")  && (el.innerHTML = pickRandomLetter()) : '';
        onUpdate ? onUpdate(anim) : ''
      },
      complete: function(anim) {
        //Set initial letter on end
        el.innerHTML = value;
        onComplete ? onComplete(anim) : '';
      }
    })
    animes.push(anime(animeMerged))
  })

  /*//If wrapper not added append it with targets
  if (!isAlreadyWrapped) {
    parent.appendChild( frag )
  }*/

  //Play all animations
  animes.map(a => a.play())

  function stepEvery(start, end, step) {
    let l = Math.floor((end - start) / step);
    return Array.from({length: l + 1}, (v, k) => (k * step) + start)
  }

  function pickRandomLetter() {
    const letters = symbols || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    return letter;
  }

  function addHiddenWillCh(el){
    //el.style.overflow = 'hidden';
    el.style.willChange = 'opacity, transform';
  }
  function addInlineBlWhiteSp(el) {
    el.style.display = 'inline-block';
    el.style.whiteSpace = 'pre';
  }
}