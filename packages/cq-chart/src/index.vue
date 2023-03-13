<!--
 * @Author: chen qi
 * @Date: 2023-03-13 21:17:36
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-13 23:59:52
 * @Description: ~
-->
<template>
  <div class=''>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Chart from '../utils/chart'
onMounted(() => {
  const chart = Chart.init(document.getElementById('canvas'))
  console.log('chart', chart)
})

</script>

<script lang="ts">
export default {
  name: 'cq-chart'
}
</script>

<style lang="less" scoped>
canvas {
  width: 500px;
  height: 500px;
  background-color: #000;
}
</style>
