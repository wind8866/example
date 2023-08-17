<script lang="ts">
export interface TreeNode {
  id: number
  name: string
  parentId: null | number
  children: TreeNode[]
}
export type Tree = TreeNode[]
export default {
  name: 'Tree',
}
</script>
<script lang="ts" setup>
import { defineProps } from 'vue'
import Tree from './Tree.vue'
const props = defineProps<{
  nodes: Tree
  getLevel: (id: number) => number
}>()

function getTop(node: TreeNode): number {
  if (node == null || node.parentId === null) return 0
  const step = props.getLevel(node.id) - props.getLevel(node.parentId)
  return step * 36
}
</script>
<template>
  <div
    v-for="(node, index) in props.nodes"
    :key="index"
    :class="['node', index === 0 ? 'first' : 'other']"
  >
    <span
      v-if="node.parentId && index === 0"
      class="guide-line"
      :style="{ height: getTop(node) - 14 + 'px' }"
    ></span>
    <span :class="['title', { root: !node.parentId }]">
      {{ node.name }}
    </span>
    <div class="list" :style="{ top: getTop(node.children?.[0]) + 'px' }">
      <tree :nodes="node.children" :get-level="props.getLevel" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.list {
  position: absolute;
  padding-left: 45px;
}
.node {
  position: relative;
  display: inline-block;
  &.other {
    padding-left: 64px;
    &::before {
      content: '';
      position: absolute;
      background: #d8d8d8;
      height: 1px;
      left: 8px;
      width: 48px;
      top: 50%;
    }
  }
}
.title {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    color: #3471ff;
  }
  &.root {
    font-weight: 500;
    padding-left: 0;
  }
}
.guide-line {
  position: absolute;
  width: 17px;
  height: 36px;
  left: -25px;
  bottom: 10px;
  border-left: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  border-bottom-left-radius: 8px;
}
</style>
