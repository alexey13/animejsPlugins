//Images player. Video from png images rolled by animejs
export function imagesPlayer({
	containerSelector,
	path,
	from,
	to,
	sprite: {
  	imageWidth = null,//integrer
  	imageHeight = null,//integrer
  	chromakeyColor = null //rgb array [0,0,255]
	} = {},
	loop = true,
	autoplay = true,
	duration = 1000,
	endDelay = 500,
	direction = 'normal',
	delay = 0,
	easing = 'linear',
	onImagesLoaded = null,
	onBegin = null,
	onUpdate = null,
	onComplete = null
} = {}) {

	const state = {
		containerSelector: containerSelector,
		wrapperEl: '',
		ctx: '',
		canvasEl: '',
		images: [],
		currentImage: 0,
		allLength: '',
		lastImage: '',
		animationObject: '',
	}

	const privateActions = {
		init: () => {
			privateActions.loadImages();
		},
		loadImages: () => {

			let imagePromise;

			//Sequince
			if(!sprite.imageWidth) {
				let images = filesHelper(from, to, path);
				imagePromise = images.path.map(p => {
					let image = document.createElement('img');
					image.src = p;
					//In Chrome decode with bags, safari not working?
					const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
					if (isFirefox) {
						return image.decode().then(() => image);
					} else {
						return new Promise((resolve) => image.addEventListener('load', function loaded(){
							image.removeEventListener('load', loaded);
							resolve(image);
						}))
					}
				})
			//Sprite
			} else {
				let image = document.createElement('img');
				image.src = path;

				function as() {
					return new Promise((resolve) => image.addEventListener('load', function loaded(){
						image.removeEventListener('load', loaded);
						resolve(image);
					})).then((image) => spriteHelper(from, to, image));
				}
				imagePromise = [as()];
			}
			//Load images
				Promise.all(imagePromise)
					.then((images) => {
						//Sprite return array of arrays
						state.images = sprite.imageWidth ? images[0] : images;
						state.allLength = to - from;
						state.lastImage = to;
					})
					.catch(er => console.log('images not loaded'))
					.then(() => {
						privateActions.render();
						onImagesLoaded && onImagesLoaded(state.animationObject);
					})
					.catch(er => console.log(er))

			
		},
		render: () => {
			state.wrapperEl = document.querySelector(state.containerSelector);

			//Create canvas
			state.canvasEl = document.createElement('canvas');
			state.canvasEl.className = 'ap-imagesplayer';
			state.wrapperEl.appendChild(state.canvasEl);
			state.ctx = state.canvasEl.getContext('2d');
			state.canvasEl.width = state.images[0].naturalWidth || state.images[0].width;
			state.canvasEl.height = state.images[0].naturalHeight || state.images[0].height;

			//Set animation
			state.animationObject = anime({
				targets: state,
				currentImage: state.allLength,
				duration,
				loop,
				autoplay,
				round: 1,
				endDelay,
				delay,
				direction,
				easing,
				begin: function(anim) {
					onBegin && onBegin(anim);
				},
				update: function(anim) {
					//state.ctx.clearRect(0, 0, state.canvasEl.width, state.canvasEl.height);
					state.ctx.drawImage(state.images[state.currentImage], 0, 0);
					onUpdate && onUpdate(anim)
				},
				complete: function(anim) {
          onComplete && onComplete(anim);
			  }
			})
		}
	}

	const actions = {
		play: () => state.animationObject.play(),
	};

	function filesHelper(from, to, pathE) {
		const placeholder = '{num}'

		let different = pathE.indexOf(placeholder);

		//Add number of image in place
		const src = (index) => [pathE.slice(0, different), index, pathE.slice(different + 5)].join('');

    //Create array of image paths
		let path = [];
		for(let i = from; i <= to; i++) {
			path.push(src(i));
		}

		return {
			path: path,
		}
	}

	//Based on this comment https://stackoverflow.com/questions/56842256/strange-700ms-delay-when-using-context-drawimage
	function spriteHelper(from, to, image) {
		//We used createImageBitmap which is used only in 80% browsers. For others we use canvas
		if (typeof window.createImageBitmap !== "function") {
		  window.createImageBitmap = monkeyPatch;
		}

		function monkeyPatch(source, sx, sy, sw, sh) {
		  return Promise.resolve()
		    .then(drawImage).catch(er => console.log(er));

		  function drawImage() {
		    var canvas = document.createElement('canvas');
		    canvas.width = sw || source.naturalWidth || source.videoWidth || source.width;
		    canvas.height = sh || source.naturalHeight || source.videoHeight || source.height;
		    canvas.getContext('2d').drawImage(source,
		      sx || 0, sy || 0, canvas.width, canvas.height,
		      0, 0, canvas.width, canvas.height
		    );
		    return canvas;
		  }
		}

		//Create canvas
		const sprite = document.createElement('canvas');
		sprite.width = image.naturalWidth || image.width;
		sprite.height = image.naturalHeight || image.height;
		const spriteCtx = sprite.getContext('2d');
		//Draw sprite
		spriteCtx.drawImage(image, 0, 0);
		//Get pixel data
		let frame = spriteCtx.getImageData(0, 0, sprite.width, sprite.height);
		let l = frame.data.length / 4;
		//For each pixel loop
		for (let i = 0; i < l; i++) {
		  let r = frame.data[i * 4 + 0];
		  let g = frame.data[i * 4 + 1];
		  let b = frame.data[i * 4 + 2];
		  if (r === chromakeyColor[0] && g === chromakeyColor[1] && b === chromakeyColor[2]) {//if blue make pixel transparent
		    frame.data[i * 4 + 3] = 0;
		  }
		}

		spriteCtx.putImageData(frame, 0, 0);

		//Cords of images in sprite
		const coords = [];
		for(let imageY = 0; imageY < sprite.naturalHeight / imageHeight; imageY++) {
			for(let imageX = 0; imageX < sprite.naturalWidth / imageWidth; imageX++) {
				coords.push([imageX * imageWidth, imageY * imageHeight, imageWidth, imageHeight]);
			}
		}

	  return Promise.all(coords.map(function(opts) {
	      return createImageBitmap.apply(window, [image].concat(opts));
	    }
	  ));
	}


	privateActions.init();
	return {actions}
}




