# animejsPlugins
> Animation plugins using power of [Animejs](https://github.com/juliangarnier/anime)

## Installation
If you have already [Animejs](https://github.com/juliangarnier/anime) in your project add only script.
Oe you can add each effect separate.
```html
<!-- Animejs -->
<script src="animejs.js"></script>
<!-- Script -->
<script src="animejsPlugins-all.js"></script>
<!-- Each plugin can used independent -->
<script src="animejsPlugins-RandomLetters.js"></script>
<script src="animejsPlugins-ScrollContainer.js"></script>
<script src="animejsPlugins-ImagesPlayer.js"></script>
```
## randomLetters

![randomLetters](https://github.com/alexey13/animejsPlugins/blob/master/gifs/randomLetters.gif)

https://codepen.io/alexzhav/pen/yLLVJqy

```js
animejsPlugins.randomLetters({
  targetsSelector: '.random-letters-item.active span[class^="char"]',
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

## ImagesPlayer
- Making video from image files.

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

## scrollContainer
- Scroll by container height.
- Not hide scrollbar.
- Scrollbar overlayed by hidden div that catch click events.
- Recommend to disable it on mobiles.

![randomLetters](https://github.com/alexey13/animejsPlugins/blob/master/gifs/scrollSection.gif)

https://codepen.io/alexzhav/pen/Yzzxgqd

```html
<!-- Required sections wrapped in div -->
<div class="sections">
  <div class="section"></div>
  <div class="section"></div>
  <div class="section"></div>
</div>
```

```js
animejsPlugins.scrollContainer({
  sectionSelector: '.section',
  duration: 1000,
  easing: 'easeInOutQuad',
  onBegin: (index, anim) => {},
  onComplete: (index, anim) => {},
})
```

### Options
#### `sectionSelector`
Section selector

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