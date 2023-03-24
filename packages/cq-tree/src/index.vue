<template>
  <div class="">
    <!-- 表头部 -->
    <header class="flex">
      <section
        v-if="rowSelection"
        :class="['center', 'w-40px']"
        :style="{
          border: '1px solid #000'
        }"
      >
        <Checkbox @change="allSelected" v-model:checked="allChecked"></Checkbox>
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
      >
        <slot name="column" :column="column">
          {{ column.title }}
        </slot>
      </section>
    </header>
    <!-- table列表 -->
    <main>
      <!-- 可拖拽区域 -->
      <div @dragover="dragover" @drop="drop">
        <!-- table -->
        <template v-for="(row, index) of dataSource" :key="index">
          <Row :data="row" :depth="0" :columns="columns" :prop="props" :p-id="'0'"></Row>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup name="CqDragTable" lang="ts">
import Row from './components/row.vue'
import 'ant-design-vue/es/checkbox/style/index.css'
import { Checkbox } from 'ant-design-vue'
import { defineProps, withDefaults, ref } from 'vue'
import type { Column } from './types'
const props = withDefaults(
  defineProps<{
    columns?: any
    dataSource?: any
    rowSelection?: any
    draggable?: boolean
  }>(),
  {
    draggable: true,
    // 表头
    columns: () => [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }
    ],
    //table
    dataSource: () => [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        children: [
          {
            key: '11',
            name: '胡彦斌',
            age: 33,
            address: '西湖区湖底公园1号'
          }
        ]
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
      }
    ],
    rowSelection: () => {
      return true
    }
  }
)
const allChecked = ref(false)
// 全选
const allSelected = () => {}

const dragover = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  // console.log(e);
}

// 参照到屏幕的距离
const drop = (e:DragEvent) => {
  e.preventDefault()

  const { clientX,clientY  } = e
  const dragId = e.dataTransfer.getData('dragId')
  

  console.log(e, '外drop')
}
</script>

<style lang="less" scoped></style>
