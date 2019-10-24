//Throttle
export function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments); // (1)
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}

//Check if page fully loaded
export function pageLoaded(callback) {
  if(document.readyState === 'complete'){
    callback();
    return;
  }
  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      callback();
    }
  });
}