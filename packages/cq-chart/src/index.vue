<!--
 * @Author: chen qi
 * @Date: 2023-03-13 21:17:36
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 01:26:21
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
  const chart = Chart.init(document.getElementById('canvas') as HTMLCanvasElement)
  chart.draw()
})

</script>

<script lang="ts">
export default {
  name: 'cq-chart'
}
</script>

<style lang="less" scoped>
#canvas {
  width: 800px;
  height: 700px;
  background-color: #000;
}
</style>
