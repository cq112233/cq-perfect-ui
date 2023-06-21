<!--
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-06-21 14:50:35
 * @Description: ~
-->

<template>
  <!-- 日历 -->
  <!-- <CqCalendar v-model:value="value" /> -->
  <!-- <div class="w-80vw">
    <CqDragTable v-model:dataSource="value" @checked="checked" ref="cqTree" />
  </div> -->
  <CqAnimation/>
</template>

<script setup lang="ts">
import star from './assets/star.png'
import { onMounted, ref } from 'vue'
import {
  CqCalendar,
  CqChart,
  CqUpload,
  CqDragTable,
  CqSortTree,
  CqAnimation
} from '../packages/index'

const value = ref([
  {
    key: '1',
    name: '胡彦斌1',
    age: 32,
    address: '西湖区湖底公园1号',
    pid: '0',
    children: [
      {
        pid: '1',
        key: '11',
        name: '胡彦斌11',
        age: 33,
        address: '西湖区湖底公园1号',
        children: [
          {
            pid: '11',
            key: '111',
            name: '胡彦斌111',
            age: 33,
            address: '西湖区湖底公园1号',
            children: []
          }
        ]
      },
      {
        pid: '1',
        key: '12',
        name: '胡彦斌12',
        age: 12,
        address: '西湖区湖底公园1号'
      }
    ]
  },
  {
    pid: '0',
    key: '2',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园1号',
    children: []
  },
  {
    pid: '0',
    key: '3',
    name: '刘德华',
    age: 42,
    address: '西湖区湖底公园1号',
    children: []
  }
])

</script>

<style scoped>
</style>
