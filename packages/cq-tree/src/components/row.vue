<!--
 * @Author: chen qi
 * @Date: 2023-03-23 22:01:26
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-26 14:24:32
 * @Description: 行，拖拽目标
-->
<template>
  <div
    :draggable="prop.draggable"
    @dragstart.stop="dragstart"
    @dragend="dragend"
    @drop="drop"
    :data-depth="depth"
    :class="['cursor-pointer']"
    :data-id="data[customFieldName.id]"
    :data-pid="pId"
  >
    <section
      class="flex w-full cqTreeRow relative"
      :data-id="data[customFieldName.id]"
      :data-pid="pId"
    >
      <section
        :class="['center', 'w-40px']"
        :style="{
          border: '1px solid #000'
        }"
      >
        <Checkbox @change="selected" v-model:checked="checked"></Checkbox>
      </section>
      <div class="flex flex-1  overflow-hidden">
        <section
          v-for="(column, index) of columns"
          :key="index"
          class="row-column center bg-red-300 h-50px relative"
          :class="[column.width || 'flex-1']"
          :style="{
            width: `${column.width}px`,
            height: `${column.height}px`,
            border: '1px solid #000'
          }"
        >
          <Space :size="index === 0 ? depth * 40 : 0">
            <span></span>
            <span> {{ data[column.dataIndex] }} </span>
          </Space>
        </section>
        <section class="absolute h-full w-full">
          <div
            class="absolute top-0/100 bg-[blue] w-full h-25/100 isTop opacity-30"
          ></div>
          <div
            class="absolute top-25/100 bg-[red] w-full h-50/100 isCenter opacity-30"
          ></div>
          <div
            class="absolute top-75/100 bg-[yellow] w-full h-25/100 isBottom opacity-30"
          ></div>
        </section>
      </div>
    </section>
    <template v-if="data.children">
      <template v-for="(row, index) of data.children" :key="index">
        <Row
          :data="row"
          :columns="columns"
          :prop="prop"
          :depth="depth + 1"
          :pId="row[customFieldName.pid]"
          :customFieldName="customFieldName"
        ></Row>
      </template>
    </template>
  </div>
</template>

<script setup name="Row" lang="ts">
import 'ant-design-vue/es/checkbox/style/index.css'
import 'ant-design-vue/es/space/style/index.css'
import { Checkbox, Space } from 'ant-design-vue'
import { defineProps, withDefaults, ref, toRef, toRefs } from 'vue'
const props = withDefaults(
  defineProps<{
    data: any
    columns: any
    prop: any
    depth: number
    pId: number | string
    customFieldName?: any
  }>(),
  {
    // 自定义字段
    customFieldName: () => {},

    // 父id
    pId: 0,

    // 深度
    depth: 0,

    // row 数据
    data: () => {
      return {}
    },

    // 列
    columns: () => {
      return {}
    },

    // 初始值传递
    prop: () => {
      return {}
    }
  }
)
const { prop, data, customFieldName } = toRefs(props)

const checked = ref(false)
const selected = () => {}

const dragstart = (e) => {
  // console.log(e, '内dragstart')
  const dragId = data.value[customFieldName.value.id]
  const dragPid = data.value[customFieldName.value.pid]
  window._cqDragTargeting = e.target
  // 传递id
  e.dataTransfer.setData('dragId', dragId)
  e.dataTransfer.setData('dragPid', dragPid)
}

const dragend = (e) => {
  // console.log(e,'内dragend')
}

const drop = (e) => {
  // console.log(e,'内drop')
}
</script>

<style lang="less" scoped>
.isTop,
.isCenter,
.isBottom {
  display: none;
}

.cq-top {
  .isTop {
    display: block;
  }
}

.cq-center {
  .isCenter {
    display: block;
  }
}

.cq-bottom {
  .isBottom {
    display: block;
  }
}
</style>
