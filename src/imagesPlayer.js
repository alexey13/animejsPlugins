//Images player. Video from png images rolled by animejs
export function imagesPlayer({containerSelector, path, from, to, loop = true, autoplay = true, duration = 1000, endDelay = 500, delay = 0, easing = 'linear', onImagesLoaded = null, onBegin = null, onUpdate = null, onComplete = null} = {}) {

	const state = {
		containerSelector: containerSelector,
		wrapperEl: '',
		imagesWrapperEl: '',
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
			privateActions.createElements();
			privateActions.loadImages();
		},
		loadImages: () => {
			let images = filesHelper(from, to, path);
			let imagePromise = images.path.map(p => {
				let image = document.createElement('img');
				image.src = p;
				state.imagesWrapperEl.appendChild(image);
				return new Promise((resolve) => image.addEventListener('load', () => resolve(image)))
			})
			Promise.all(imagePromise)
				.then((images) => {
					state.images = images;
					privateActions.render();
					onImagesLoaded && onImagesLoaded(state.animationObject);
				})
		},
		createElements: () => {
			let wrapper = document.querySelector(state.containerSelector);
			state.wrapperEl = wrapper;
			
			let imagesWrapper = document.createElement('div')
			imagesWrapper.style.display = 'none';
			state.imagesWrapperEl = imagesWrapper;
			state.wrapperEl.appendChild(imagesWrapper);

			let canvas = document.createElement('canvas');
			canvas.className = 'ap-imagesplayer';
			wrapper.innerHtml = canvas;
			let ctx = canvas.getContext('2d');
			state.ctx = ctx;
			state.canvasEl = canvas;
		},
		render: () => {
			state.canvasEl.width = state.images[0].naturalWidth;
			state.canvasEl.height = state.images[0].naturalHeight;
			state.animationObject = anime({
				targets: state,
				currentImage: state.allLength,
				duration: duration,
				loop: loop,
				autoplay: autoplay,
				round: 1,
				endDelay: endDelay,
				delay: delay,
				easing: easing,
				begin: function(anim) {
					onBegin && onBegin(anim);
				},
				update: function(anim) {
					state.ctx.clearRect(0, 0, state.canvasEl.width, state.canvasEl.height);
					state.ctx.drawImage(state.images[state.currentImage], 0, 0, state.images[state.currentImage].naturalWidth, state.images[state.currentImage].naturalHeight);
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

		state.allLength = to - from;
		state.lastImage = to;

		return {
			path: path,
		}
	}

	privateActions.init();
	return {actions}
}