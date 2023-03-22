<!--
 * @Author: chen qi
 * @Date: 2023-03-13 22:39:10
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-22 16:19:53
 * @Description: ~
-->


<template>
  <!-- <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link> -->
  <!-- <router-view></router-view> -->
  <!-- <CqChart/> -->
  <!-- <CqCalendar v-model:value="value"/> -->
  <!-- <CqUpload/> -->

  <CqTree/>
  <!-- <img :src="star" alt="" srcset=""> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import star from './assets/star.png'
import { ref } from 'vue';
import { CqCalendar, CqChart ,CqUpload,CqTree} from '../packages/index'
// import { CqCalendar, CqChart } from '../lib/cq-perfect-ui.es.js'
import '../lib/style.css'
const value = ref([])

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
