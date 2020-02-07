# animejsPlugins
> Animation plugins that using power of Animejs

## Installation
Include [Animejs](https://github.com/juliangarnier/anime) in your project and plugin script.
```html
<!-- Animejs -->
<script src="animejs.js"></script>
<!-- All plugins -->
<script src="animejsPlugins-all.js"></script>
<!-- Each plugin can be used independent -->
<script src="animejsPlugins-RandomLetters.js"></script>
<script src="animejsPlugins-ScrollContainer.js"></script>
<script src="animejsPlugins-ImagesPlayer.js"></script>
```
## randomLetters

![randomLetters](https://github.com/alexey13/animejsPlugins/blob/master/gifs/randomLetters.gif)

https://codepen.io/alexzhav/pen/yLLVJqy

```html
<!-- First wrap each char of animation in span (you can use helper animejsPlugins.charmingWordsChars(el)) -->
<div class="class">
  <span class="char">W</span>
  <span class="char">O</span>
  <span class="char">R</span>
  <span class="char">D</span>
</div>
```

```js
animejsPlugins.randomLetters({
  targetsSelector: '.class span[class^="char"]',
  symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  stepPerFrames: 3,
  animation: {
    scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
    opacity: {value: [0, 1], duration: 500 },
    endDelay: () => anime.random(300, 600),
    easing: 'cubicBezier(.17, .17, .83, .83)',
    autoplay: false,
  },
  onBegin: (anim) => {},
  onUpdate: (anim) => {},
  onComplete: (anim) => {}
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
Animejs properties.
Begin, update and complete animejs callbacks overwritten by onBegin, onUpdate, onComplete. 
##### Default:
```js 
{
  scale: {value: [0, 1], duration: () => anime.random(500, 1000), easing: 'cubicBezier(.17, -0, .83, 1)' },
  opacity: {value: [0, 1], duration: 500 },
  endDelay: () => anime.random(300, 600),
  easing: 'cubicBezier(.17, .17, .83, .83)',
  autoplay: false,
}
```

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

## imagesPlayer
- Making video from image files.

https://codepen.io/alexzhav/pen/BaawOQp

```js
animejsPlugins.imagesPlayer({
  containerSelector: '.selector',
  path: '/animations/logo-png/{num}.png',
  from: 26,
  to: 56,
  loop: true,
  autoplay: true,
  onImagesLoaded: (anim) => {},
  onBegin: (anim) => {},
  onUpdate: (anim) => {},
  onComplete: (anim) => {}
})
```
### Options
#### `onImagesLoaded`
On images loaded event. Argument - current anime object.


<br>

## scrollContainer
- Scroll by container height.
- Not hide scrollbar.
- Scrollbar overlayed by hidden div that catch click events.
- Recommend to disable it on mobiles.

![scrollContainer](https://github.com/alexey13/animejsPlugins/blob/master/gifs/scrollSection.gif)

https://codepen.io/alexzhav/pen/Yzzxgqd

```html
<!-- Section not allowed to have as parentNode body -->
<div class="sections">
  <div class="section"></div>
  <div class="section"></div>
  <div class="section"></div>
</div>
```

```js
animejsPlugins.scrollContainer({
  sectionSelector: '.section',
  wrapperSelector: '.wrapper',
  duration: 1000,
  easing: 'easeInOutQuad',
  onBegin: (index, anim) => {},
  onComplete: (index, anim) => {},
})
```

### Options
#### `sectionSelector`
Section selector

#### `wrapperSelector`
Wrapper selector

#### `duration`
Animation duration
##### Default: `1000`

#### `easing`
Animation easing
##### Default: `'easeInOutQuad'`

#### `onBegin`
Callback function when animation begin. Arguments: current section index, anime object.
##### Default: `null`

#### `onComplete`
Callback function when animation complete. Arguments: current section index, anime object.
##### Default: `null`

<br>

## Slider
- tiny helper to create slider

https://codepen.io/alexzhav/pen/Exjaaaq

```js
animejsPlugins.slider({
  slidersSelector: '.slider__inner .slider__item',
  onSlide: function(currentSlide, nextSlide, done) {
    animation(currentSlide, nextSlide, done)
  },
  autoplay: false,
  timeout: 3000
})
```
### Options
#### `slidersSelector`
Sliders selector

#### `autoplay`
Autoplay mode

#### `timeout`
Timeout between slide change if autoplay is active

#### `onSlide`
Callback function when change slide event start.
Arguments: current slider node element, next slide node element, callback to call when animation finished.

### Return object with actions
#### `playNext`
Start next slider

#### `playPrev`
Start prev slider

#### `playIndex`
Start slider with index

#### `stopAutoplay`
Stop autoplay. Used on first click.

#### `startAutoplay`
Start autoplay




