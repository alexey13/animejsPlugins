# animejsPlugins
required Animejs https://github.com/juliangarnier/anime

1. Random letters animation
randomLettersAnimation({
  stepPerFrames: 3,
  scaleDurationRandom: [300,1000],
  scaleEasing: 'cubicBezier(.17, -0, .83, 1)',
  endDelayRandom: [300,600],
  charSelector: 'span[class^="char"]',
  itemWrapperSelector: '.project-item.active'
})
https://codepen.io/alexzhav/pen/yLLVJqy
