
export type Key = string | number

export interface VNode {
  _isVNode: true
  // the real dom ref
  el: Node | null
  tag: string | null
  data: VNodeData | null
  children: VNodeChildren | null
  text: string
}

export interface VNodeData {
  [key: string]: any
}

export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNode | string | number>

export function vnode(
  tag: string | null,
  data: any | null,
  children: VNodeChildren | null = null,
  text: string | null = null,
  el: Element | Text | null = null
): VNode {
  return {
    _isVNode: true,
    tag,
    data,
    children,
    text,
    el
  }
}