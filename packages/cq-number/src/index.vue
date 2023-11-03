<!--
 * @Author: chen qi
 * @Date: 2023-03-20 17:23:31
 * @LastEditors: chen qi
 * @LastEditTime: 2023-10-12 15:53:20
 * @Description: ~
-->
<template>
  <div id="range">
    <!-- <button @click="handler(1)">+</button>
    <button @click="handler(2)">-</button>
    <a-button @click="add">添加</a-button>
    <div class="box">
      <div class="numberBox">
        <div class="moveBox" :data-value="9">
          <div v-for="item of numbers" :key="item" class="number">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div id="qm" :style="{
      width:'200px',
      height: '200px',
      border:'1px solid #000'
    }">

    </div> -->
  </div>
</template>

<script setup name="CqNumber" lang="ts">
import { createdQm } from '../helper/qm'
import gsap from 'gsap'
import { repeat } from 'lodash-es'
import { nextTick } from 'vue'
import { onMounted, ref } from 'vue'

const COUNT_OF_NUMBERS = 10 // 隐藏在舞台外的数字个数
const HEIGHT_PER_NUMBER = 50 // 每个数字所占高度
const ONE_LAP = HEIGHT_PER_NUMBER * COUNT_OF_NUMBERS // 列表滚动一圈的位移
const ENDING_ANIMATION_PERCENT = 0.25 // 收尾动画的时间占比

const numbers = new Array(10)
  .fill(null)
  .map((_, index) => index)
  .concat(0)

onMounted(() => {
  createdQm(document.getElementById('qm'))
  useNumberScroll({ duration: 5 })

  // 获取设备
  function getDevices() {
    window.navigator.mediaDevices.enumerateDevices().then(res=>{
      console.log(res);
    })
  }
  getDevices()
})

const useNumberScroll = ({ duration }, dependencies = []) => {
  const getScrollSpeed = () => 300 // 设置一个较快的速度即可，单位：px / s
  const getDuration = (s, v) => s / v // 时间 = 位移 / 速度
  const startTime = ref() // 用于控制无限滚动的时间
  const endingDuration = Math.min(duration * ENDING_ANIMATION_PERCENT, 2) // 收尾动画最多播放 2 秒
  const loopDuration = duration - endingDuration

  const endAnimate = (ctx) => {
    // 停止无限滚动
    ctx.pause()
    const ele = ctx.targets()[0]
    // 获取目标数字的值
    const value = +ele.dataset.value

    console.log(ctx.targets()[0], ele.dataset.value, value)
    const valueOffset = value === 0 ? 10 : value
    // 撤除滤镜
    gsap.set(ele, {
      css: {
        filter: ''
      }
    })
    // 播放一个从目标数字上方滚动至目标数字的动画
    gsap.fromTo(
      ele,
      {
        y: -((valueOffset - 1) * HEIGHT_PER_NUMBER) // 目标数字的上一个数字
      },
      {
        y: -(valueOffset * HEIGHT_PER_NUMBER),
        duration: endingDuration,
        ease: 'elastic.out(1, 0.3)'
      }
    )
  }

  const animate = () => {
    const gimmicSelector = '.moveBox'
    gsap.fromTo(
      gimmicSelector,
      { y: 0 },
      {
        y: -ONE_LAP,
        duration: getDuration(ONE_LAP, getScrollSpeed()),
        ease: 'none',
        repeat: -1,
        onStart() {
          // 添加模糊滤镜
          gsap.set(gimmicSelector, {
            css: {
              filter: 'blur(1px)'
            }
          })
          startTime.value = Date.now()
        },
        onUpdate() {
          const isEnd = Date.now() - startTime.value >= loopDuration * 1000
          if (isEnd) endAnimate(this)
        }
      }
    )
  }
  animate()
}

const handler = () => {
  useNumberScroll({ duration: 5 })
}
const ctx = ref()
let uid = 0
const add = () => {
  uid++
  if (ctx.value && ctx.value.isActive()) return
  const div = document.createElement('div')
  div.className = `div${uid} dot`
  document.getElementById('ani').append(div)
  nextTick(()=>{
    // gsap
    // .fromTo(
    //   `.div${uid}`,
    //   { x: 0 , display: 'block'},
    //   {
    //     x: 100,
    //     duration: 2.5,
    //     repeat: 0
    //   }
    // )
    // .repeat(0)
  gsap
    .fromTo(
      `.div${uid}`,
      { y: 0, display: 'block' },
      {
        y: 300,
        duration: 2.5,
        // rotation: 360,
        repeat: 0,
        // ease: 'power1.inOut',
        ease:'rough',
        // ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})",
        onComplete(value) {
          // this.targets()[0].remove()
        },
        immediateRenderer:true
      }
    )
    .repeat(0)
  })
 
}
</script>

<style>
.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 100%;
}
</style>
<style lang="less" scoped>
#ani {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.numberBox {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  overflow: hidden;
}
.moveBox {
  overflow: hidden;
  // position: absolute;
  // transition: all 0.5s;
  // top:0
}
.number {
  // position: absolute;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  transition: all 2s;
}

</style>
