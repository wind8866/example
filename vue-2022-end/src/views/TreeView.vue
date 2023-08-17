<script setup lang="ts">
import TreeTemplate, { Tree, TreeNode } from '../components/Tree.vue'
import { cloneDeep } from 'lodash-es'
const areaTree: Tree = [
  {
    id: 1,
    name: '中国',
    parentId: null,
    children: [
      {
        id: 11,
        name: '浙江省',
        parentId: 1,
        children: [
          {
            id: 111,
            name: '杭州市',
            parentId: 11,
            children: [],
          },
          {
            id: 112,
            name: '温州市',
            parentId: 11,
            children: [],
          },
          {
            id: 113,
            name: '金华市',
            parentId: 11,
            children: [],
          },
        ],
      },
      {
        id: 12,
        name: '山东省',
        parentId: 1,
        children: [
          {
            id: 121,
            name: '济南市',
            parentId: 12,
            children: [
              {
                id: 1211,
                name: '历下区',
                parentId: 121,
                children: [],
              },
              {
                id: 1212,
                name: '市中区',
                parentId: 121,
                children: [],
              },
              {
                id: 1213,
                name: '槐荫区',
                parentId: 121,
                children: [],
              },
              {
                id: 1214,
                name: '天桥区',
                parentId: 121,
                children: [],
              },
            ],
          },
          {
            id: 122,
            name: '青岛市',
            parentId: 12,
            children: [
              {
                id: 1221,
                name: '市南区',
                parentId: 122,
                children: [],
              },
              {
                id: 1222,
                name: '市北区',
                parentId: 122,
                children: [],
              },
              {
                id: 1223,
                name: '崂山区',
                parentId: 122,
                children: [],
              },
              {
                id: 1224,
                name: '黄岛区',
                parentId: 122,
                children: [],
              },
              {
                id: 1225,
                name: '李沧区',
                parentId: 122,
                children: [],
              },
              {
                id: 1226,
                name: '城阳区',
                parentId: 122,
                children: [],
              },
              {
                id: 1227,
                name: '即墨区',
                parentId: 122,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

function tree2Table(): Tree[] {
  const table: Tree[] = []
  // 我是把 stack 的最后一个元素作为栈顶
  let stack = cloneDeep(areaTree)
  while (stack.length > 0) {
    const currentLevel = []
    let nextLevel: Tree = []
    const lastNode = stack.at(-1) as TreeNode
    const levelParentKey = lastNode.parentId
    while (stack.length > 0) {
      const lastNode: TreeNode = stack.at(-1) as TreeNode
      // 并不完全是层序遍历，因为济南和杭州不在同一层，以parentId进行区分
      if (lastNode.parentId !== levelParentKey) break
      const { children, ...iNode } = stack.pop() as TreeNode // A
      // 因为同一层是从后往前遍历，但数据是从前往后展示，所以这里使用unshift
      // 这里也可以push，在tables前需reverse
      currentLevel.unshift(iNode)
      // A行取栈顶元素并将当前元素的子元素再次放到栈顶
      // ['浙江', '山东'] => ['浙江', '济南', '青岛']
      if (children) {
        nextLevel = [...children, ...nextLevel]
      }
    }
    table.push(currentLevel)
    stack = stack.concat(nextLevel)
  }
  return table
}
console.log(tree2Table())

interface Hash {
  [nodeId: string]: number
}
function tree2NodeHash(): [number, Hash] {
  const hash: Hash = {}
  let levelCount = 0
  let stack = cloneDeep(areaTree)
  while (stack.length > 0) {
    const currentLevel = []
    let nextLevel: Tree = []
    const lastNode = stack.at(-1) as TreeNode
    const levelParentKey = lastNode.parentId
    while (stack.length > 0) {
      const lastNode: TreeNode = stack.at(-1) as TreeNode
      if (lastNode.parentId !== levelParentKey) break
      const { children, ...iNode } = stack.pop() as TreeNode
      hash[iNode.id] = levelCount
      currentLevel.unshift(iNode)
      if (children) {
        nextLevel = [...children, ...nextLevel]
      }
    }
    levelCount++
    stack = stack.concat(nextLevel)
  }
  return [levelCount, hash]
}
const [maxHeight, nodeHash] = tree2NodeHash()

const getLevel = (id: number) => {
  return nodeHash[id]
}
console.log(maxHeight, nodeHash)
</script>
<template>
  <div class="bg" :style="{ height: '' + (maxHeight * 36 + 24) + 'px' }">
    <tree-template :nodes="areaTree" :get-level="getLevel" />
  </div>
</template>

<style scoped>
.bg {
  color: #111;
  background: #f7f9fb;
  padding: 12px 16px;
  white-space: nowrap;
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: auto;
  font-size: 15px;
}
</style>
