this.animejsPlugins=this.animejsPlugins||{},this.animejsPlugins.charming=function(e){"use strict";function t(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.tagName,r=void 0===n?"span":n,i=t.split,a=t.setClassName,o=void 0===a?function(e){return"char"+e}:a;e.normalize();var s=1;function c(e){var t=e.parentNode,n=e.nodeValue;(i?i(n):n.split("")).forEach((function(n){var i=document.createElement(r),a=o(s++,n);a&&(i.className=a),i.appendChild(document.createTextNode(n)),i.setAttribute("aria-hidden","true"),t.insertBefore(i,e)})),""!==n.trim()&&t.setAttribute("aria-label",n),t.removeChild(e)}!function e(t){if(3===t.nodeType)return c(t);var n=Array.prototype.slice.call(t.childNodes);if(1===n.length&&3===n[0].nodeType)return c(n[0]);n.forEach((function(t){e(t)}))}(e)}return e.charmingWordsChars=function(e){t(e,{split:function(e){return e.split(/(\s+)/)},setClassName:function(e){return"word-".concat(e)}}),e.querySelectorAll('span[class^="word"]').forEach((function(e){return t(e)}))},e}({});
