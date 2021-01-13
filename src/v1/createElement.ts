export interface VNode {
  tagName: string
  attrs: {[key: string]: any}
  children: VNode[]
  text: string
}

export default function createElement (
  tagName: string | null,
  attrs: {[key: string]: any} | null = {},
  children: VNode[] | null = [],
  text?: string
): VNode {
  const obj = Object.create(null)
  
  return Object.assign(obj, {
    tagName,
    attrs,
    children,
    text
  })
}
