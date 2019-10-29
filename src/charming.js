//https://github.com/yuanqing/charming
function charming(
  element,
  {
    tagName = 'span',
    split,
    setClassName = function (index) {
      return 'char' + index
    }
  } = {}
) {
  element.normalize()
  let index = 1
  function inject (element) {
    const parentNode = element.parentNode
    const nodeValue = element.nodeValue
    const array = split ? split(nodeValue) : nodeValue.split('')
    array.forEach(function (string) {
      const node = document.createElement(tagName)
      const className = setClassName(index++, string)
      if (className) {
        node.className = className
      }
      node.appendChild(document.createTextNode(string))
      node.setAttribute('aria-hidden', 'true')
      parentNode.insertBefore(node, element)
    })
    if (nodeValue.trim() !== '') {
      parentNode.setAttribute('aria-label', nodeValue)
    }
    parentNode.removeChild(element)
  }
  ;(function traverse (element) {
    // `element` is itself a text node
    if (element.nodeType === 3) {
      return inject(element)
    }
    // `element` has a single child text node
    const childNodes = Array.prototype.slice.call(element.childNodes) // static array of nodes
    const length = childNodes.length
    if (length === 1 && childNodes[0].nodeType === 3) {
      return inject(childNodes[0])
    }
    // `element` has more than one child node
    childNodes.forEach(function (childNode) {
      traverse(childNode)
    })
  })(element)
}

export function charmingWordsChars(el) {
  //Convert to words
  charming(el, {
    split: function (string) {
      return string.split(/(\s+)/)
    },
    setClassName: function (index) {
      return `word-${index}`
    }
  })
  //Convert to chars
  el.querySelectorAll('span[class^="word"]').forEach(e => charming(e))
}