import { VNode } from './createElement'

export default function render(vNode: VNode): HTMLElement | Text {
  if (vNode.text) {
    return document.createTextNode(vNode.text)
  }

  const $el = document.createElement(vNode.tagName)

  // set attributes
  for (const [k, v] of Object.entries(vNode.attrs)) {
    $el.setAttribute(k, v)
  }

  // append children
  for (const child of vNode.children) {
    const $child = render(child)
    $el.appendChild($child)
  }

  return $el
}
