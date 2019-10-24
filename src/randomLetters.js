import {wrapElementWidthHeight} from './wrapElement.js';
export function randomLetters({itemWrapperSelector, charSelector, stepPerFrames, scaleDurationRandom, scaleEasing, endDelayRandom}) {

  const itemWrapper = itemWrapperSelector;
  const charWrapper = '.random-letters-wrapper';
  const char = charSelector;

  const alreadyWrapped = document.querySelectorAll(`${itemWrapper} ${charWrapper}`);
  const parent = document.querySelector(`${itemWrapper} ${char}`).parentNode;

  let frag = document.createDocumentFragment();
  let animes = [];

  document.querySelectorAll(`${itemWrapper} ${char}`).forEach((el, index) => {
    const value = el.innerHTML
    //Before start animation we get width and height and wrap in parent
    if (alreadyWrapped.length === 0) {
      const h = el.offsetHeight;
      const w = el.offsetWidth; 
      let wrapper = wrapElementWidthHeight(el, charWrapper.substring(1,charWrapper.length), w, h)
      frag.appendChild( wrapper );
    }

    //number of steps
    const steps = stepEvery(0, 100, stepPerFrames);
    //update number
    let upd = 0;

    animes.push(anime({
      targets: el,
      scale: {value: [0, 1], duration: anime.random(scaleDurationRandom[0], scaleDurationRandom[1]), easing: scaleEasing },
      opacity: {value: [0, 1], duration: 500 },
      endDelay: anime.random(endDelayRandom[0], endDelayRandom[1]),
      easing: 'cubicBezier(.17, .17, .83, .83)',
      autoplay: false,
      update: function(anim) {
        upd = Math.round(anim.progress);
        //When update equals our step change letter
        steps.includes(upd) ? el.innerHTML = pickRandomLetter() : '';
      },
      complete: function() {
        //Set initial letter
        el.innerHTML = value
      }
    }))
  })

  //If wrapper not added already add it
  if (alreadyWrapped.length === 0) {
    parent.appendChild( frag )
  }

  //Play all animations
  animes.map(a => a.play())

  function stepEvery(start, end, step) {
    let l = Math.floor((end - start) / step);
    return Array.from({length: l + 1}, (v, k) => (k * step) + start)
  }

  function pickRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    return letter;
  }
}