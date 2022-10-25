import isArray from 'lodash.isarray'
import isFunction from 'lodash.isfunction'
import isObject from 'lodash.isobject'
import { Slot, VNode } from 'vue'
import castArray from 'lodash.castarray'

function getVNodesText(children: VNode[]): string {
  return children
    .map((node) => {
      if (!node.children || typeof node.children === 'string') {
        return node.children || ''
      } else if (isArray(node.children)) {
        return getVNodesText(node.children as VNode[])
      } else if (isObject(node.children) && isFunction(node.children.default)) {
        return getVNodesText(node.children.default())
      }
    })
    .join('')
    .trim()
}

export function getVNodeText(
  vnode: VNode | VNode[] | Slot | undefined,
): string {
  if (!vnode) {
    return ''
  }

  return getVNodesText(isFunction(vnode) ? vnode() : castArray(vnode))
}
