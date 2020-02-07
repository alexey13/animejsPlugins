export function slider({
	slidersSelector,
	autoplay = false,
	timeout = 3000,
	onSlide
} = {}) {

	//Slides nodes
	const allSlidesEls = Array.from(document.querySelectorAll(slidersSelector));

	//Slides length
	const slidesLength = allSlidesEls.length;

	const state = {
		slidesLength,
		currentSlideIndex: 0,
		currentSlideEl: null,
		nextSlideIndex: null,
		nextSlideEl: null,
		allSlidesEls,
		playing: false,
		autoplay,
		timeout
	};

	const helpers = {
		isPlaying() {
			const {playing} = state;
			return playing;
		},
		timer(callback) {
			let lastTime = 0;
			const animate = (time) => {
		    if ( (time - lastTime) > timeout) {
		      callback()
		      lastTime = time;
		    }
		    this.frame = requestAnimationFrame(animate);
			}
			animate()
		},
		cancelRaf() {
			cancelAnimationFrame(this.frame);
		}
	};


	const _actions = {
		play(index) {
			//If playing return or same slider
			if (helpers.isPlaying() || index === state.currentSlideIndex) return;

			state.playing = true;

			//Current Slide
			const {currentSlideIndex, slidesLength} = state;
			state.currentSlideEl = allSlidesEls[currentSlideIndex];

			//Next Slide
			state.nextSlideIndex = slidesLength - 1 < index ? 0 : index;
			state.nextSlideEl = allSlidesEls[state.nextSlideIndex]

			const {currentSlideEl, nextSlideEl} = state;

			//Current slide, next slide, callback when animation is done
			onSlide(currentSlideEl, nextSlideEl, _actions.stop);
		},
		stopAutoplay() {
			state.autoplay = false;
			helpers.cancelRaf();
		},
		stop() {
			state.currentSlideIndex = state.nextSlideIndex;
			state.playing = false;
		},
		startAutoplay() {
			function callback() {
				const index = state.currentSlideIndex + 1;
				_actions.play(index)
			};
			helpers.timer(callback)
		}
	};

	const actions = {
		playNext() {
			actions.stopAutoplay();
			const index = state.currentSlideIndex + 1;
			_actions.play(index);
		},
		playPrev() {
			actions.stopAutoplay();
			const index = state.currentSlideIndex - 1;
			_actions.play(index);
		},
		playIndex(index) {
			actions.stopAutoplay();
			_actions.play(index);
		},
		stopAutoplay() {
			const {autoplay} = state;
			autoplay ? _actions.stopAutoplay() : '';
		},
		startAutoplay() {
			_actions.startAutoplay();
		},
	};

	autoplay ? actions.startAutoplay() : '';

	return {
		state,
		actions
	}
}