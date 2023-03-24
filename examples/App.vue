<!--
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-24 09:50:48
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
  <CqCalendar v-model:value="value"/>
  <!-- <CqUpload/> -->
  <div class="w-80vw m-auto mt-10px">
    <!-- <CqTree/> -->
  </div>

  <!-- <img :src="star" alt="" srcset=""> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import 'ant-design-vue/es/drawer/style/index.css'
import { Drawer,Button } from 'ant-design-vue'
import star from './assets/star.png'
import { ref } from 'vue';
import { CqCalendar, CqChart ,CqUpload,CqTree} from '../packages/index'
// import { CqCalendar, CqChart } from '../lib/cq-perfect-ui.es.js'
import '../lib/style.css'

const value = ref([])

setTimeout(()=>{
  value.value = ['2023/03/26']
},1000)

const visible = ref(false)


console.log(star);
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
