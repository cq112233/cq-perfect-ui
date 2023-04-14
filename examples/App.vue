<!--
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-26 16:55:46
 * @Description: ~
-->

<template>
  <!-- <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link> -->
  <!-- <router-view></router-view> -->
  <!-- <CqChart/> -->
  <!-- <Button @click="visible = true">kai</Button>
  <Drawer :visible="visible">

  </Drawer> -->
  <!-- <CqCalendar v-model:value="value"/> -->
  <!-- <CqUpload/> -->
  <div class="w-80vw">
    <CqTree v-model:dataSource="value" @checked="checked" ref="cqTree" />
  </div>

  <!-- <img :src="star" alt="" srcset=""> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import 'ant-design-vue/es/drawer/style/index.css'
import { Drawer, Button } from 'ant-design-vue'
import star from './assets/star.png'
import { onMounted, ref } from 'vue'
import { CqCalendar, CqChart, CqUpload, CqTree } from '../packages/index'
// import { CqCalendar, CqChart } from '../lib/cq-perfect-ui.es.js'
import '../lib/style.css'

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

const checked = (value) => {
  console.log('value 11', value)
}
const cqTree = ref()

onMounted(() => {
  setTimeout(() => {
    console.log('cqTree.value', cqTree.value.getHalfIds())
  }, 4000)
})

const visible = ref(false)

console.log(star)
</script>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
