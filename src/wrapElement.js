export function wrapElementWidthHeight(el, className = null, width, height) {
  let wrapper = document.createElement( "span" );
  className ? wrapper.className = className : '';
  wrapper.style.height = height + 'px';
  wrapper.style.width = width + 'px';
  wrapper.appendChild( el );
  return wrapper;
}