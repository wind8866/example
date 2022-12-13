<template>
  <span
    :attr-title="`${title}-1`"
    v-bind:title="title"
    v-bind="objectOfAttrs"
  >模板语法 {{title}}</span>

  <button :[`attr-${count}`]="count" @click="++count">add {{count}}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title: string = 'title'
interface ObjectOfAttrs {
  id: string
  class: string
}
const objectOfAttrs: ObjectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
const count = ref(0)

</script>
