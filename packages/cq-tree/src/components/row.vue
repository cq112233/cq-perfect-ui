<!--
 * @Author: chen qi
 * @Date: 2023-03-23 22:01:26
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-24 00:41:42
 * @Description: 行，拖拽目标
-->
<template>
  <div
    class="row"
    :draggable="prop.draggable"
    @dragstart="dragstart"
    @dragend="dragend"
    @drop="drop"
    :data-depth="depth"
    :class="['cursor-pointer']"
    :data-id="data.key"
    :data-pid="pId"
  >
    <header class="flex">
      <section
        :class="['center', 'w-40px']"
        :style="{
          border: '1px solid #000'
        }"
      >
        <Checkbox @change="selected" v-model:checked="checked"></Checkbox>
      </section>
      <section
        v-for="(column, index) of columns"
        :key="index"
        class="header-column center bg-red-300 h-50px"
        :class="[column.width || 'flex-1', column.align || 'center']"
        :style="{
          width: `${column.width}px`,
          height: `${column.height}px`,
          border: '1px solid #000'
        }"
        :data-id="122"
      >
        <Space :size="index===0? depth * 30 : 0"
          >
          <span></span> 
          <span> {{ data[column.dataIndex] }} </span></Space
        >
      </section>
    </header>
    <template v-if="data.children">
      <template v-for="(row, index) of data.children" :key="index">
        <Row
          :data="row"
          :columns="columns"
          :prop="prop"
          :depth="depth + 1"
          :p-id="row.key"
        ></Row>
      </template>
    </template>
  </div>
</template>

<script setup name="Row" lang="ts">
import 'ant-design-vue/es/checkbox/style/index.css'
import 'ant-design-vue/es/space/style/index.css'
import { Checkbox, Space } from 'ant-design-vue'
import { defineProps, withDefaults, ref } from 'vue'
const props = withDefaults(
  defineProps<{
    data: any
    columns: any
    prop: any
    depth: number
    pId:number | string
  }>(),
  {
    // 父id
    pId:0,

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
const { prop,data } = props
const checked = ref(false)
const selected = () => {
}

const dragstart = (e)=>{
  console.log(e,'内dragstart')
  e.dataTransfer.setData('dragId',data.key)
}

const dragend= (e)=>{
    // console.log(e,'内dragend')
}

const drop = (e)=>{
  // console.log(e,'内drop')
}
</script>

<style lang="" scoped></style>
