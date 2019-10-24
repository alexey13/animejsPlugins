import {wrapElementWidthHeight} from './wrapElement.js';
export function randomLetters({targetsSelector, stepPerFrames, symbols, onBegin = null, onUpdate = null, onComplete = null, animation} = {}) {

  const charWrapper = 'random-letters-wrapper';
  const parent = document.querySelector(targetsSelector).parentNode;

  const isAlreadyWrapped = parent.className === charWrapper ? true : false;

  let frag = document.createDocumentFragment();
  let animes = [];

  document.querySelectorAll(targetsSelector).forEach((el, index) => {
    const value = el.innerHTML
    //Before start animation we get width and height and wrap in parent
    if (!isAlreadyWrapped) {
      const h = el.offsetHeight;
      const w = el.offsetWidth; 
      let wrapper = wrapElementWidthHeight(el, charWrapper, w, h)
      frag.appendChild( wrapper );
    }

    //steps array
    let steps;
    //frame
    let upd = 0;
    let animeMerged = Object.assign(animation, {
      targets: el,
      begin: function(anim) {
        steps = stepEvery(0, anim.duration, stepPerFrames);
        onBegin ? onBegin(anim) : ''
      },
      update: function(anim) {
        upd++
        //When update equals our step change letter
        steps.includes(upd) ? el.innerHTML = pickRandomLetter() : '';
        onUpdate ? onUpdate(anim) : ''
      },
      complete: function(anim) {
        //Set initial letter
        el.innerHTML = value
        onComplete ? onComplete(anim) : '';
      }
    })
    animes.push(anime(animeMerged))
  })

  //If wrapper not added append it with targets
  if (!isAlreadyWrapped) {
    parent.appendChild( frag )
  }

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
}