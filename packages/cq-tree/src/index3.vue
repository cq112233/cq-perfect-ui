<template>
  <div class="w-100vw h-100vh">
    <a-space align="center" style="margin-bottom: 16px">
      CheckStrictly:
      <a-switch v-model:checked="rowSelection.checkStrictly"></a-switch>
    </a-space>
    <s-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      expand-row-by-click
      @row-drag-end="onRowDragEnd"
    />
  </div>
</template>
<script>
import 'ant-design-vue/es/switch/style/css'
import { Switch as ASwitch, Space as ASpace } from 'ant-design-vue'
import STable from '@surely-vue/table'

import { defineComponent, ref } from 'vue'
console.log('ASwitch', ASwitch)
export default defineComponent({
  name: 'CqTree',
  components: {
    ASwitch,
    STable,
    ASpace
  },
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        rowDrag: true
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%'
        // rowDrag: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address'
      }
    ]
    const data = [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        parentName: 'root',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
            parentName: 'John Brown sr.'
          },
          {
            parentName: 'John Brown sr.',
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [
              {
                parentName: 'John Brown jr.',
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park'
              }
            ]
          },
          {
            parentName: 'John Brown sr.',
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            children: [
              {
                key: 131,
                name: 'Jim Green',
                parentName: 'Jim Green sr.',
                age: 42,
                address: 'London No. 2 Lake Park'
                // children: [
                //   {
                //     key: 1311,
                //     name: 'Jim Green jr.',
                //     age: 25,
                //     address: 'London No. 3 Lake Park',
                //   },
                //   {
                //     key: 1312,
                //     name: 'Jimmy Green sr.',
                //     age: 18,
                //     address: 'London No. 4 Lake Park',
                //   },
                // ],
              }
            ]
          }
        ]
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        parentName: 'root',
        address: 'Sidney No. 1 Lake Park'
      },
      {
        key: 3,
        name: 'Joe Green',
        age: 42,
        parentName: 'root',
        address: 'Sidney No. 2 Lake Park'
      }
    ]
    const rowSelection = ref({
      checkStrictly: false,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    })
    const getNode = (key, data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        if (element.key === key) {
          return element
        }
        if (element.children) {
          if (getNode(key, element.children)) {
            return getNode(key, element.children)
          }
        }
      }
    }
    const onRowDragEnd = (node) => {
      console.log(node);
      if (!node.insertToRowKey && node.record.parentName === 'root') {
        return true
      }
      if(!node.insertToRowKey) return false
      const node1 = getNode(node.insertToRowKey, data)
      // debugger
      if (node1.name !== node.record.parentName) return false
    }
    return {
      data,
      columns,
      rowSelection,
      onRowDragEnd
    }
  }
})
</script>
