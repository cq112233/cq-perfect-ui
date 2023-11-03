<!--
 * @Author: chen qi
 * @Date: 2023-03-20 17:23:31
 * @LastEditors: chen qi
 * @LastEditTime: 2023-10-12 18:19:53
 * @Description: ~
-->
<template>
  <div id="cq-range">
    <div id="div"></div>
  </div>
</template>

<script setup name="cqRange" lang="ts">
import { Echart }  from '../helper' 
import { onMounted ,ref } from "vue";
const view = ref()
onMounted(()=>{
  const echarts = Echart.init(document.getElementById("div"))
  echarts.setOption()
})
</script>

<style>
#div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 80vw;
  height: 80vh;
  border: 1px solid #000;
}
</style>
