import {pageLoaded} from './helpers.js';

//Images player. Video of png images rolled by animejs
export function imagesPlayer({path, from, to, loop = true, autoplay = true, onEnd = null} = {}) {

	const state = {
		loop: loop,
		autoplay: autoplay,
		wrapperClassName: '.loader',
		wrapperEl: '',
		imagesWrapperEl: '',
		ctx: '',
		canvasEl: '',
		images: [],
		currentImage: 0,
		allLength: '',
		lastImage: '',
		pageLoaded: false,
	}

	const actions = {
		init: () => {
			actions.createElements();
			actions.loadImages();
			actions.addEvent();
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
					state.images = images
					actions.render()
				})
		},
		createElements: () => {
			document.documentElement.style.overflowY = 'hidden';
			let wrapper = document.querySelector(state.wrapperClassName);
			state.wrapperEl = wrapper;

			let imagesWrapper = document.createElement('div')
			imagesWrapper.className = 'images-wrapper';
			state.imagesWrapperEl = imagesWrapper;
			state.wrapperEl.appendChild(imagesWrapper);

			let canvas = document.createElement('canvas');
			wrapper.appendChild(canvas);
			let ctx = canvas.getContext('2d');
			state.ctx = ctx;
			state.canvasEl = canvas;
		},
		render: () => {
			state.canvasEl.width = state.images[0].naturalWidth;
			state.canvasEl.height = state.images[0].naturalHeight;
			let a = anime({
				targets: state,
				currentImage: state.allLength,
				duration: 1000,
				loop: 2,
				round: 1,
				endDelay: 500,
				easing: 'linear',
				update: function() {
					state.ctx.clearRect(0, 0, state.canvasEl.width, state.canvasEl.height);
					state.ctx.drawImage(state.images[state.currentImage], 0, 0, state.images[state.currentImage].naturalWidth, state.images[state.currentImage].naturalHeight);
				},
				complete: function() {
			    if(state.pageLoaded) {
			    	a.pause()
			    	actions.end()
            onEnd ? onEnd() : ''
			    } else {
			    	a.restart()
			    }
			  }
			})
		},
		addEvent: () => {
      let f = () => state.pageLoaded = true;
      pageLoaded(f)
		},
		end: () => {
			state.wrapperEl.style.display = 'none'
			document.documentElement.style.overflowY = 'scroll';
		}
	}

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

	actions.init();
}