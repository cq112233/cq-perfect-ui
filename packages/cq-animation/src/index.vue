<!--
 * @Author: chen qi
 * @Date: 2023-06-21 14:45:27
 * @LastEditors: chen qi
 * @LastEditTime: 2023-08-11 14:51:01
 * @Description: ~
-->
<template>
  <div id="amt"></div>
  <canvas id="canvas" width="200" height="200"></canvas>
  <div class="wrarry">
    <!-- <div class="dom" ref="dom">111222</div> -->
  </div>
</template>

<script setup name="cq-animation" lang="ts">
import { onMounted, ref } from 'vue'
const dom = ref(null)

const raf = window.requestAnimationFrame

onMounted(() => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#FF0000'
  ctx.fillRect(0, 0, 200, 200)
  Animation.wavec(canvas, 1000)
})
class Animation {
  duration = 0
  fn = null
  startT = Date.now()
  // 时间，渲染函数
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
  static createCanvasAnimation(canvas: HTMLCanvasElement, duration, drawingFn) {
    //创建离屏Canvas
    const vc = document.createElement('CANVAS') as HTMLCanvasElement
    const { width, height } = canvas
    vc.width = width
    vc.height = height

    const vctx = vc.getContext('2d')
    const ctx = canvas.getContext('2d')

    //拷贝图样到离屏Canvas
    vctx.drawImage(canvas, 0, 0, width, height)

    return new Animation(duration, (p) => drawingFn(ctx, vc, p))
  }
  static PI(times) {
    return Math.PI * times
  }
  // 扇形动画
  static wavec(canvas, duration, easing = (p) => p) {
    return Animation.createCanvasAnimation(canvas, duration, (ctx, img, p) => {
      const { width, height } = ctx.canvas

      const r = (width + height) / 2 //最大尺寸 计算简便,懒得开方

      //获取中心点
      const cx = width / 2
      const cy = height / 2

      //缓动生效
      p = easing(p)

      //存储画布
      ctx.save()
      ctx.clearRect(0, 0, width, height)

      //裁剪出一个扇形来
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, -Animation.PI(0.5), Animation.PI(2 * p - 0.5))
      ctx.closePath()
      ctx.clip()

      //绘制图片(的一部分)
      ctx.drawImage(img, 0, 0, width, height)

      //恢复画布
      ctx.restore()
    })
  }
}


// 对象存储器类
class IOC {
  static ico = null
  modules = new Map()
  private constructor() {
    
  }
  // 懒汉单列模式
  static getInstance() {
    if(IOC.ico === null) {
      IOC.ico = new IOC()
    }
    return IOC.ico
  }
  // 注册类名
  provide(key, clazz, ...args) {
    if (this.modules.has(key)) return console.warn(`${key}已经被注册`)
    this.modules.set(key, { clazz, args })
  }
  // 获取对象实例
  getClazz(key, ...args) {
    const { clazz, args: defaultArgs } = this.modules.get(key)
    return Reflect.construct(clazz, [...defaultArgs, ...args])
  }
}


onMounted(()=>{
  const amt = document.querySelector('#amt') as HTMLElement
  amt.style.width = '200px'
  amt.style.height = '200px'
  amt.style.backgroundColor = '#eee'
  amt.animate([
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
  ],{
  duration: 2000,
  iterations: 1,
  })
})

</script>

<style lang="less" scoped>
.wrarry {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  background: linear-gradient(to top right, transparent 50%, black 50%);
}
.dom {
  position: absolute;
  left: 0;
  top: 0px;
  border: 1px solid #ccc;
}
</style>
