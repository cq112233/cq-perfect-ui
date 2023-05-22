import { cloneDeep } from "lodash-es"

/*
 * @Author: chen qi
 * @Date: 2023-03-26 10:41:34
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-26 10:43:15
 * @Description: ~
 */
export const clearStyle = (rowDoms: HTMLElement[]) => {
  const insertWhere = ['cq-top', 'cq-center', 'cq-bottom']
  Array.from(rowDoms).forEach((row) => {
    insertWhere.forEach((v) => {
      row.classList.remove(v)
    })
  })
}


export function treeToList(tree, customFieldName) {
  const children = customFieldName.children
  let list = []

  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    list.push(node)

    if (node[children] && node[children].length > 0) {
      list = list.concat(treeToList(node[children], customFieldName))
    }
  }

  return list
}


export const getRowByClassName = (name = 'cqTreeRow'): HTMLElement[] => {
  return document.getElementsByClassName(name) as any
}