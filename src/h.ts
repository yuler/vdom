import { VNode, VNodeData, VNodeChildren, vnode } from './VNode'

export function h(tag: string): VNode
export function h(tag: string, data?: VNodeData): VNode
export function h(tag: string, children?: VNodeChildren): VNode
export function h(tag: string, data?: VNodeData, children?: VNodeChildren): VNode
export function h(tag: any, data?: any, children?: any) {
  const l = arguments.length
  let text: any
  if (l == 2) {
    if (data != null && typeof data == 'object' && !Array.isArray(data)) {
      if (data._isVNode) {
        return vnode(tag, null, [data])
      }
      return vnode(tag, data)
    } else {
      return vnode(tag, null, data)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l == 3 && children._isVNode) {
      children = [children]
    } else if (typeof children === 'string' || typeof children === 'number') {
      text = children
    }
    return vnode(tag, data, children, text)
  }
}
