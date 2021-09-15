/**
 * 从当前节点，寻找顶级节点
 *
 * @export
 * @param {*} nodes 树节点 - list 格式
 * @param {*} currentNode 当前节点
 * @returns
 */
export function queryRootNode(nodes, currentNode) {
  let rootNodeChain = [currentNode]

  const findParentNode = (nodes, node) => {
    const parentNode = nodes.find((item) => item.id === node.parentId)

    if (parentNode) {
      rootNodeChain.push(parentNode)

      if (parentNode.parentId !== '-1') {
        findParentNode(nodes, parentNode)
      }
    }
  }

  findParentNode(nodes, currentNode)

  return rootNodeChain[rootNodeChain.length - 1]
}

/**
 * 从树节点寻找最深级节点
 *
 * @export
 * @param {*} nodes 树节点 tree 结构
 * @returns
 */
export function queryDeepestNode(nodes) {
  const deepNodeChain = []
  const findDeepNode = (nodes) => {
    return nodes.some((node) => {
      deepNodeChain.push(node)

      if (node.children && node.children.length > 0) {
        return findDeepNode(node.children, node)
      } else {
        return true
      }
    })
  }

  findDeepNode(nodes)

  return deepNodeChain[deepNodeChain.length - 1]
}
