var animePlugins = (function (exports, wrapElement_js) {
  'use strict';

  function randomLettersAnimation(_ref) {
    var itemWrapperSelector = _ref.itemWrapperSelector,
        charSelector = _ref.charSelector,
        stepPerFrames = _ref.stepPerFrames,
        scaleDurationRandom = _ref.scaleDurationRandom,
        scaleEasing = _ref.scaleEasing,
        endDelayRandom = _ref.endDelayRandom;
    var itemWrapper = itemWrapperSelector;
    var charWrapper = '.random-letters-wrapper';
    var _char = charSelector;
    var alreadyWrapped = document.querySelectorAll("".concat(itemWrapper, " ").concat(charWrapper));
    var parent = document.querySelector("".concat(itemWrapper, " ").concat(_char)).parentNode;
    var frag = document.createDocumentFragment();
    var animes = [];
    document.querySelectorAll("".concat(itemWrapper, " ").concat(_char)).forEach(function (el, index) {
      var value = el.innerHTML; //Before start animation we get width and height and wrap in parent

      if (alreadyWrapped.length === 0) {
        var h = el.offsetHeight;
        var w = el.offsetWidth;
        var wrapper = wrapElement_js.wrapElementWidthHeight(el, charWrapper.substring(1, charWrapper.length), w, h);
        frag.appendChild(wrapper);
      } //number of steps


      var steps = stepEvery(0, 100, stepPerFrames); //update number

      var upd = 0;
      animes.push(anime({
        targets: el,
        scale: {
          value: [0, 1],
          duration: anime.random(scaleDurationRandom[0], scaleDurationRandom[1]),
          easing: scaleEasing
        },
        opacity: {
          value: [0, 1],
          duration: 500
        },
        endDelay: anime.random(endDelayRandom[0], endDelayRandom[1]),
        easing: 'cubicBezier(.17, .17, .83, .83)',
        autoplay: false,
        update: function update() {
          upd++; //When update equals our step change letter

          steps.includes(upd) ? el.innerHTML = pickRandomLetter() : '';
        },
        complete: function complete() {
          //Set initial letter
          el.innerHTML = value;
        }
      }));
    }); //If wrapper not added already add it

    if (alreadyWrapped.length === 0) {
      parent.appendChild(frag);
    } //Play all animations


    animes.map(function (a) {
      return a.play();
    });

    function stepEvery(start, end, step) {
      var l = Math.floor((end - start) / step);
      return Array.from({
        length: l + 1
      }, function (v, k) {
        return k * step + start;
      });
    }

    function pickRandomLetter() {
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var letter = letters.charAt(Math.floor(Math.random() * letters.length));
      return letter;
    }
  }

  exports.default = randomLettersAnimation;

  return exports;

}({}, wrapElement_js));
