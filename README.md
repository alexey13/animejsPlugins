# animejsPlugins
> Animation plugins using power of [Animejs](https://github.com/juliangarnier/anime)

## Installation

Add [Animejs](https://github.com/juliangarnier/anime) and plugin.
```html
<!-- Animejs https://github.com/juliangarnier/anime -->
<script src="animejs.js"></script>
<!-- Plugin -->
<script src="animejsPlugins.min.js"></script>
```
## Animations
1. Random letters
Example https://codepen.io/alexzhav/pen/yLLVJqy

```js
animejsPlugins.randomLetters({
  targetsSelector: '.random-letters-item.active span[class^="char"]',
  symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  stepPerFrames: 3,
  //Animation properties
  animation: {
    scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
    opacity: {value: [0, 1], duration: 500 },
    endDelay: () => anime.random(300, 600),
    easing: 'cubicBezier(.17, .17, .83, .83)',
    autoplay: false,
  },
  onBegin: (anim) => {},
  onUpdate: (anim) => {},
  onComplete: (anim) => {},
})
```
### Options
#### `targetsSelector`
Animation target selector

#### `symbols`
Symbols to choose from.
##### Default: `'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'`

#### `stepPerFrames`
Change symbol every X frame.
##### Default: `3`

#### `animation`
Animejs options.
Begin, update and complete animejs callbacks overwritten by onBegin, onUpdate, onComplete. 
##### Default: 
`{
  scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
  opacity: {value: [0, 1], duration: 500 },
  endDelay: () => anime.random(300, 600),
  easing: 'cubicBezier(.17, .17, .83, .83)',
  autoplay: false,
}`

#### `onBegin`
Callback function when animation begin. Get current anime object as argument.
##### Default: `null`

#### `onUpdate`
Callback function when animation update. Get current anime object as argument.
##### Default: `null`

#### `onComplete`
Callback function when animation complete. Get current anime object as argument.
##### Default: `null`

<br>

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

<br>

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