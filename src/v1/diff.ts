import { VNode } from './createElement';
import render from './render'

type patch = ($node: HTMLElement) => HTMLElement | Text | void

export default function diff(oldVNode: VNode, newVNode?: VNode): patch {
  // If don't exist new vnode, remove
  if (!newVNode) {
    return $node => {
      $node.remove()
    }
  }

  // If two vnode both Text
  if (oldVNode.text && newVNode.text) {
    // different values
    if (oldVNode.text !== newVNode.text) {
      return $node => {
        const $newNode = render(newVNode)
        $node.replaceWith($newNode)
        return $newNode
      }
    }
    return $node => $node
  }

  // If one of vnode is Text
  if (oldVNode.text || newVNode.text) {
    return $node => {
      const $newNode = render(newVNode)
      $node.replaceWith($newNode)
      return $newNode
    }
  }

  // If are difference element, replace
  if (oldVNode.tagName !== newVNode.tagName) {
    return $node => {
      const $newNode = render(newVNode)
      $node.replaceWith($newNode)
      return $newNode
    }
  }

  const patchAttrs = diffAttrs(oldVNode.attrs, newVNode.attrs)
  const patchChildren = diffChildren(oldVNode.children, newVNode.children)

  return $node => {
    patchAttrs($node)
    patchChildren($node)
    return $node
  }
}

function diffAttrs(oldAttrs: {[key: string]: any}, newAttrs: {[key: string]: any}): patch {
  const patches: patch[] = []

  // set new
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v)
      return $node
    })
  }

  // remove old
  for (const k of Object.keys(oldAttrs)) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k)
        return $node
      })
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node)
    }
    return $node
  }
}

function diffChildren(oldVChildren: VNode[], newVChildren: VNode[]): patch {
  const patches: patch[] = []

  oldVChildren.forEach((child, i) => {
    patches.push(diff(child, newVChildren[i]))
  })

  const addPatches: patch[] = []
  for (const child of newVChildren.slice(oldVChildren.length)) {
    addPatches.push($node => {
      $node.appendChild(render(child))
      return $node
    })
  }

  return $parent => {
    $parent.childNodes.forEach(($child, i) => {
      patches[i]($child as HTMLElement)
    })

    for (const patch of addPatches) {
      patch($parent)
    }

    return $parent
  }
}