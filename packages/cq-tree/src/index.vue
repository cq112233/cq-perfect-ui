<template>
  <div class="flex">
    <div v-for="(item, index) of col" :key="index">
      <div :ref="`imgList${index + 1}`" :class="`imgList${index + 1}`">
        <div v-for="(v, i) of imgs[`imgList${index + 1}`]">
          <div
            :style="{
              width: '20px',
              height: `${v.h}px`,
              background: `rgb(${255*Math.random()},${255*Math.random()},${255*Math.random()})`
            }"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CqTree" lang="ts">
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  reactive,
  nextTick,
  ref
} from 'vue'
const prop = defineProps({
  // 行
  col: {
    type: Number,
    default: 4
  },
  // 图片
  imgs: {
    type: Array,
    default: [
      {
        h: Math.floor(Math.random() * 100),
      },
      {
        h: Math.floor(Math.random() * 100)
      },
      {
        h: Math.floor(Math.random() * 100)
      },
      {
        h: Math.floor(Math.random() * 100)
      },
      {
        h: Math.floor(Math.random() * 100),
      },
      {
        h: Math.floor(Math.random() * 100)
      },
      {
        h: Math.floor(Math.random() * 100)
      },
      {
        h: Math.floor(Math.random() * 100)
      }
    ]
  }
})
const instance = ref<any>()
onMounted(() => {
  const { proxy } = getCurrentInstance()
  instance.value = proxy
  // pushImg(prop.imgs)
  pushImg(prop.imgs)
})
const { col } = prop
const imgs = reactive({})
for (let index = 1; index <= col; index++) {
  const element = index
  imgs[`imgList${index}`] = []
}

const getMinCol = () => {
  let doms = []
  for (const key in instance.value.$refs) {
    if (Object.prototype.hasOwnProperty.call(instance.value.$refs, key)) {
      const element = instance.value.$refs[key]
      doms.push({ key, data: element[0] })
    }
  }
  doms = doms.sort(function (a, b) {
    return a.data.offsetHeight - b.data.offsetHeight
  })

  return doms[0]
}

function pushImg(imgList) {
  let temp = imgList
  let minKey = getMinCol()['key']
  imgs[minKey].push(temp[0])
  temp.splice(0,1)
  if(temp.length) {
    nextTick(() => {
      pushImg(temp)
    })
  }
}
</script>

<style lang="" scoped></style>
