# animejsPlugins
> Animation plugins using power of [Animejs](https://github.com/juliangarnier/anime)

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
  targetsSelector: '.random-letters-item.active span[class^="char"]',//animation target selector
  symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',//string symbols to choose from
  stepPerFrames: 3,//change letter every X frame
  //Animation properties
  animation: {
    scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
    opacity: {value: [0, 1], duration: 500 },
    endDelay: () => anime.random(300, 600),
    easing: 'cubicBezier(.17, .17, .83, .83)',
    autoplay: false,
  },
  //Callback functions similar animejs 
  onBegin: (anim) => {},
  onUpdate: (anim) => {},
  onComplete: (anim) => {},
})
```

Example https://codepen.io/alexzhav/pen/yLLVJqy

2. ImagesPlayer. Making video from image files

```js
animejsPlugins.imagesPlayer({
	path: '/animations/logo-png/{num}.png',
	from: 26,
	to: 56,
	loop: true,
	autoplay: true,
	onEnd: fun
})
```

3. Scroll container height

```js
animejsPlugins.scrollContainer({
	wrapper: document.querySelector('#page'),
	section: document.querySelector('.section'),
	duration: 1000,
	easing: 'easeInOutQuad',
	onComplete: index => fun(index)
})
```