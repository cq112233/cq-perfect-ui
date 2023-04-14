<template>
  <div class="overflow-hidden">
    <!-- 表头部 -->
    <header class="flex select-none w-full overflow-hidden">
      <section
        v-if="rowSelection"
        :class="['center', 'w-40px']"
        :style="{
          border: bordered ? '1px solid #000' : ''
        }"
      >
        <Checkbox
          @change="allSelected"
          :indeterminate="indeterminate"
          v-model:checked="allChecked"
        ></Checkbox>
      </section>
      <div class="flex flex-1 overflow-hidden">
        <section
          v-for="(column, index) of columns"
          :key="index"
          class="header-column center bg-red-300 h-50px relative"
          :class="[column.width || 'flex-1', column.align || 'center']"
          :style="{
            width: `${column.width}px`,
            height: `${column.height}px`,
            border: bordered ? '1px solid #000' : ''
          }"
        >
          <slot name="column" :column="column">
            {{ column.title }}
          </slot>
          <!-- 拖拽 -->
          <section
            class="absolute right-0 h-full bg-[yellow] transform border-resize"
            @mousedown="mousedown($event, index)"
            @mouseup="mouseup"
          >
            1
          </section>
        </section>
      </div>
    </header>
    <!-- table列表 -->
    <main>
      <!-- 可拖拽区域 -->
      <div @dragover.prevent="dragover" @drop.prevent="drop">
        <!-- table -->
        <template v-for="(row, index) of dataSource" :key="index">
          <Row
            :data="row"
            :depth="0"
            :columns="columns"
            :prop="props"
            :customFieldName="customFieldName"
            :p-id="row[customFieldName.pid]"
            @changeAllCheck="changeAllCheck"
          ></Row>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup name="CqDragTable" lang="ts">
import Row from './components/row.vue'
import 'ant-design-vue/es/checkbox/style/index.css'
import { Checkbox } from 'ant-design-vue'
import { defineProps, withDefaults, ref, toRefs, watch } from 'vue'
import type { Column } from './types'
import { cloneDeep } from 'lodash-es'
import { clearStyle, getRowByClassName, treeToList } from './helper'
const props = withDefaults(
  defineProps<{
    columns?: any
    dataSource?: any
    rowSelection?: any
    draggable?: boolean
    bordered?: boolean
    customFieldName?: any
  }>(),
  {
    customFieldName: () => {
      return {
        id: 'key',
        pid: 'pid',
        children: 'children',
        checked: 'checked',
        indeterminate:'indeterminate'
      }
    },
    bordered: true,
    draggable: true,
    // 表头
    columns: () => [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 400
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        width: 500
      }
    ],
    //table
    dataSource: () => [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        pid: '0',
        children: [
          {
            pid: '1',
            key: '11',
            name: '胡彦斌',
            age: 33,
            address: '西湖区湖底公园1号'
          }
        ]
      },
      {
        pid: '0',
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
const emits = defineEmits(['update:dataSource','checked'])
const { dataSource, customFieldName } = toRefs(props)
const targetId = ref('')
const insertWhere = ref('') // 有三种状态，插上，插入，插下
const indeterminate = ref(false) // 半选状态
const allChecked = ref(false) // 选中状态
const resizeBorderObj = ref<any>({})
const dataSourceList = treeToList(dataSource.value, customFieldName.value)
// 全选
const allSelected = (e) => {
  const checkedKey = customFieldName.value.checked
  const childrenKey = customFieldName.value.children

  function dg(data, status) {
    data.forEach((element) => {
      element[checkedKey] = status
      if (element[childrenKey]) {
        dg(element[childrenKey], status)
      }
    })
  }
  if (e.target.checked) {
    dg(dataSource.value, true)
  } else {
    dg(dataSource.value, false)
  }
}

watch(
  () => dataSource.value,
  (value) => {
    console.log('watch', value)
  }
)

// 事件监听,全选
const changeAllCheck = (value) => {
  if (
    value.selectedList.length > 0 &&
    value.selectedList.length < dataSourceList.length
  ) {
    indeterminate.value = true
  }
  if (value.selectedList.length === 0) {
    indeterminate.value = false
    allChecked.value = false
  }
  if (value.selectedList.length === dataSourceList.length) {
    indeterminate.value = false
    allChecked.value = true
  }
  emits('checked',value)
}

// 核心代码
const dragover = (e) => {
  e.dataTransfer.dropEffect = 'move'
  const rows: HTMLElement[] = getRowByClassName()
  // 清楚样式
  clearStyle(rows)
  // 鼠标位置
  const { clientX, clientY } = e
  // 拖拽dom
  const { height: dragHeight, top: dragTop } =
    window._cqDragTargeting.getBoundingClientRect()
  // 目标dom
  let targetRow: HTMLElement = null

  // 寻找rows中在clientX和clientY的row
  for (let index = 0; index < rows.length; index++) {
    const element = rows[index]
    const { width, height, left, top } = element.getBoundingClientRect()
    const isWidth = clientX >= left && clientX <= width + left
    const isHeight = clientY >= top && clientY <= height + top
    // 不再选中范围内,拖拽dom不能自己，内插
    const isNoSelf = clientY < dragTop || clientY > dragTop + dragHeight
    if (isWidth && isHeight && isNoSelf) {
      targetRow = element
    }
  }
  if (!targetRow) return
  const { height, top } = targetRow.getBoundingClientRect()
  // 找到后,添加样式
  if (clientY <= top + (1 / 4) * height) {
    insertWhere.value = 'cq-top'
  } else if (
    clientY > top + (1 / 4) * height &&
    clientY < top + (3 / 4) * height
  ) {
    insertWhere.value = 'cq-center'
  } else {
    insertWhere.value = 'cq-bottom'
  }
  targetRow.classList.add(insertWhere.value)
  targetId.value = targetRow.getAttribute('data-id')
  const targetPid = targetRow.getAttribute('data-pid')
  const dragPid = window._cqDragTargeting.getAttribute('data-pid')
  // 平级才能移动,逻辑
  // 父级不相同的就不能移动
  // if (targetPid !== dragPid) {
  //   targetId.value = ''
  // } else {
  //   //父级相同 中间位置不能插入
  //   if (insertWhere.value === 'cq-center') {
  //     targetId.value = ''
  //   }
  // }
}

// 参照到屏幕的距离
const drop = (e: DragEvent) => {
  const rows: HTMLElement[] = getRowByClassName()
  clearStyle(rows)
  const dragId = e.dataTransfer.getData('dragId')
  const dragPid = e.dataTransfer.getData('dragPid')
  // 开始进行操作
  if (targetId.value) {
    const dataSourceCopy = cloneDeep(dataSource.value)
    const list = treeToList(dataSourceCopy, customFieldName.value)
    const drag = list.find((item) => item[customFieldName.value.id] === dragId)
    const newDataSource = copyTree(
      dataSourceCopy,
      [],
      drag,
      customFieldName.value
    )
    emits('update:dataSource', newDataSource)
  }
}

// 创建新tree
function copyTree(dataSource, newDataSource = [], drag, customFieldName) {
  const pid = customFieldName.pid
  const id = customFieldName.id
  const children = customFieldName.children
  for (let i = 0; i < dataSource.length; i++) {
    const item = { ...dataSource[i] }
    const obj = cloneDeep(item)
    obj[children] = []
    // 找到目标节点
    if (item[id] === targetId.value) {
      // 上
      if (insertWhere.value === 'cq-top') {
        drag[pid] = item[pid]
        newDataSource.push(drag)
        newDataSource.push(obj)
      }
      // 中
      else if (insertWhere.value === 'cq-center') {
        drag[pid] = item[id]
        obj[children].push(drag)
        newDataSource.push(obj)
      }
      // 下
      else if (insertWhere.value === 'cq-bottom') {
        drag[pid] = item[pid]
        newDataSource.push(obj)
        newDataSource.push(drag)
      }
    } else {
      if (item[id] !== drag[id]) {
        newDataSource.push(obj)
      }
    }
    if (item[children] && item[children].length) {
      copyTree(item[children], obj[children], drag, customFieldName)
    }
  }

  return newDataSource
}


// 获取选中id
const getSelectedIds = ()=> {
  let idList = []
  const idKey = customFieldName.value.id
  const checkedKey = customFieldName.value.checked
  const childrenKey = customFieldName.value.children

  function dg(data) {
    data.forEach((element) => {
      if (element[checkedKey]){
        idList.push(element[idKey])
      }
      if (element[childrenKey]) {
        dg(element[childrenKey])
      }
    })
  }
  dg(dataSource.value)

  return idList
}
// 半选状态
const getHalfIds = ()=> {
  let idList = []
  const idKey = customFieldName.value.id
  const indeterminateKey = customFieldName.value.indeterminate
  const childrenKey = customFieldName.value.children

  function dg(data) {
    data.forEach((element) => {
      if (element[indeterminateKey]){
        idList.push(element[idKey])
      }
      if (element[childrenKey]) {
        dg(element[childrenKey])
      }
    })
  }
  dg(dataSource.value)

  return idList
}

// 以下扩展代码
const move = (e) => {
  const { left } = resizeBorderObj.value.option as DOMRect
  const columnIndex = resizeBorderObj.value.columnIndex
  const columns = [...(getRowByClassName('header-column') as HTMLElement[])]
  const rows = [...(getRowByClassName('row-column') as HTMLElement[])]
  const column = columns[columnIndex]
  const { offsetWidth } = column
  const { left: columnLeft } = column.getBoundingClientRect() as DOMRect
  const { clientX } = e
  const diffX = clientX - (offsetWidth + columnLeft)
  const newWidth = offsetWidth + diffX
  column.style.flex = 'none'
  column.style.width = newWidth + 'px'
  try {
    for (
      let index = columnIndex;
      index < rows.length;
      index = index + props.columns.length
    ) {
      const row = rows[index]
      row.style.flex = 'none'
      row.style.width = newWidth + 'px'
    }
  } catch (error) {
    console.log(error)
  }

  // diffX 正向右 负向左
  console.log(e, 'e')
}

const mousedown = (event: Event, columnIndex: number) => {
  const target: HTMLElement = event.target as HTMLElement
  resizeBorderObj.value = {
    option: target.getBoundingClientRect(),
    columnIndex
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', move)
  })
}

defineExpose({
  getSelectedIds,
  getHalfIds
})

</script>

<style lang="less" scoped>
.border-resize {
  transform: translateX(50%);
  z-index: 9999;
  &:hover {
    cursor: col-resize;
  }
}
</style>
