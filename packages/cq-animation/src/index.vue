<!--
 * @Author: chen qi
 * @Date: 2023-06-21 14:45:27
 * @LastEditors: chen qi
 * @LastEditTime: 2023-06-21 15:39:20
 * @Description: ~
-->
<template>
  <div class="wrarry">
    <div class="dom" ref="dom">111222</div>
  </div>
</template>

<script setup name="cq-animation" lang="ts">
import { onMounted,ref } from 'vue'
const dom = ref(null)

const raf = window.requestAnimationFrame

class Animation {
  duration = 0
  fn = null
  startT = Date.now()
  constructor(duration, fn) {
    this.duration = duration
    this.fn = fn
    this.render()
  }
  render() {
    const nowDate = Date.now()
    const dt = nowDate - this.startT
    let p // 系数
    if (this.duration === 0) {
      p = 0
    } else {
      p = dt / this.duration
    }
    // 还未完成目标
    if (p < 1) {
      this.fn(p)
      // 继续执行
      raf(this.render.bind(this))
    } else {
      this.fn(1)
    }
  }
}

onMounted(() => {
  new Animation(10000, (p) => {
    const p1 = p ** 4
    const p2 = p ** 3
    dom.value.style.left = Math.floor(500 * p1) + 'px'
    dom.value.style.top = Math.floor(500 * p2) + 'px'
  })
})
</script>

<style lang="less" scoped>
.wrarry {
  width: 500px;
  height: 500px;
  border:1px solid #ccc;
  background: linear-gradient(to top right, transparent 50%, black 50%);
}
.dom {
  position:absolute;
  left:0;
  top:0px;
  border:1px solid #ccc;
}
</style>
