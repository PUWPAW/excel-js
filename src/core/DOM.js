class DOM {
  constructor(selector) {
    this.$el = typeof selector === 'string' 
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      this.$el.value.trim()
      return this
    }

    return this.$el.textContent.trim()
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
    return this
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])

    return this
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector) {
  return new DOM(selector)
}

$.create = (tagName, classes = '') => {
  const node = document.createElement(tagName)

  if (classes) {
    node.classList.add(classes)
  }
  return $(node)
}
