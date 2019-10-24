# animejsPlugins
> Animation plugins using power of [Animejs](https://github.com/juliangarnier/anime)

required Animejs https://github.com/juliangarnier/anime

## Installation
Add files to page and you are ready to go
```html
<!-- Animejs https://github.com/juliangarnier/anime -->
<script src="/animejs.js"></script>
<!-- Plugins -->
<script src="/animejsPlugins.js"></script>
```
## Plugins
1. Random letters animation
```js
animejsPlugins.randomLetters({
  stepPerFrames: 3,
  scaleDurationRandom: [300,1000],
  scaleEasing: 'cubicBezier(.17, -0, .83, 1)',
  endDelayRandom: [300,600],
  charSelector: 'span[class^="char"]',
  itemWrapperSelector: '.project-item.active'
})
```
Example https://codepen.io/alexzhav/pen/yLLVJqy
