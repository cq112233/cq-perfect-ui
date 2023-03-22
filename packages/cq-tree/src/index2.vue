<!--
 * @Author: chen qi
 * @Date: 2023-03-21 20:53:09
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 23:15:23
 * @Description: ~
-->
<template>
  <div class="">
    <a-tree
      class="draggable-tree"
      draggable
      block-node
      :tree-data="gData"
      @dragenter="onDragEnter"
      @drop="onDrop"
    >
      <template #title="node">
        {{ node.title }}
      </template>
    </a-tree>
  </div>
</template>

<script setup name="CqTree" lang="ts">
import 'ant-design-vue/es/tree/style/css'
import { Tree as ATree } from 'ant-design-vue'
import { ref } from 'vue'
import { debug } from 'console'
// const x = 3;
// const y = 2;
// const z = 1;
// const genData = [];
// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || genData;
//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({
//       title: key,
//       key,
//     });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

// const expandedKeys = ref(['0-0', '0-0-0', '0-0-0-0'])
const tree = [
  {
    key: 1,
    title: '爷爷',
    name: 'grandfather',
    parentName: 'root',
    children: [
      {
        key: 2,
        title: '叔叔',
        name: 'father2',
        parentName: 'grandfather'
      },
      {
        key: 3,
        title: '爸爸',
        name: 'father1',
        parentName: 'grandfather'
      },
      {
        key: 7,
        title: '爸爸1',
        name: 'father',
        parentName: 'grandfather',
        children: [
          {
            parentName: 'father',
            key: 8,
            name: 'son',
            title: '孙子'
          },
          {
            parentName: 'father',
            key: 9,
            name: 'son1',
            title: '孙子1'
          },
          {
            parentName: 'father',
            key: 10,
            name: 'son2',
            title: '孙子2'
          }
        ]
      }
    ]
  },
  {
    key: 4,
    title: '奶奶',
    parentName: 'root',
    name: 'grandmother',
    children: [
      {
        key: 5,
        title: '舅舅',
        name: 'uncle1',
        parentName: 'grandmother'
      },
      {
        key: 6,
        title: '舅妈',
        name: 'uncle2',
        parentName: 'grandmother'
      }
    ]
  }
]

const gData = ref(tree)
const onDragEnter = (info) => {
  console.log(info)
  // expandedKeys 需要展开时
  // expandedKeys.value = info.expandedKeys;
}

const onDrop = (info) => {
  console.log(info)
  const dropKey = info.node.key // 放下的节点
  const dragKey = info.dragNode.key // 被拖住的节点
  const dropPos = info.node.pos.split('-') // 放下的位置
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
  
  if (!info.dropToGap && info.node.name === info.dragNode.parentName) {
  } else {
    if (!info.dropToGap) return
    if (info.node.parentName !== info.dragNode.parentName) return
  }

  const loop = (data, key, callback) => {
    data.forEach((item, index) => {
      if (item.key === key) {
        return callback(item, index, data)
      }
      if (item.children) {
        return loop(item.children, key, callback)
      }
    })
  }
  const data = [...gData.value]

  // Find dragObject
  let dragObj
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1)
    dragObj = item
  })
  // 往里
  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      /// where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj)
    })
  } else if (
    (info.node.children || []).length > 0 &&
    // Has children
    info.node.expanded &&
    // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      // where to insert 示例添加到头部，可以是随意位置
      item.children.unshift(dragObj)
    })
  } else {
    let ar = []
    let i = 0
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr
      i = index
    })
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj)
    } else {
      ar.splice(i + 1, 0, dragObj)
    }
  }
  gData.value = data
}

// const onDrop = (info) => {
//   // 目标节点
//   const dropKey = info.node.eventKey
//   // 拖动节点
//   const dragKey = info.dragNode.eventKey

//   const dropPos = info.node.pos.split('-')
//   // -1 上
//   // 0 内
//   // 1 下
//   // 拖动的位置
//   const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

//   const loop = (data, key: string, callback: any) => {
//     data.forEach((item, index, arr) => {
//       if (item.key === key) {
//         return callback(item, index, arr)
//       }
//       if (item.children) {
//         return loop(item.children, key, callback)
//       }
//     })
//   }
//   const data = [...gData.value]

//   // 拖动节点的对象
//   let dragObj = {}
//   // false
//   if (!info.dropToGap) {
//     if (info.node.name === info.dragNode.parentName) {
//       loop(data, dragKey, (item, index, arr) => {
//         arr.splice(index, 1)
//         dragObj = item
//       })
//       // Drop on the content
//       loop(data, dropKey, (item) => {
//         item.children = item.children || []
//         /// where to insert 示例添加到头部，可以是随意位置
//         item.children.unshift(dragObj)
//       })
//       return false
//     }
//   } else if (
//     (info.node.children || []).length > 0 &&
//     info.node.expanded &&
//     dropPosition === 1
//   ) {
//     return false
//   } else {
//     let a = []
//     let ii = 0
//     loop(data, dragKey, (item, index, arr) => {
//       a = arr
//       ii = index
//       dragObj = item
//     })
//     // 只允许当前节点下的子节点拖动排序
//     if (a.some((item) => item.key === dropKey)) {
//       a.splice(ii, 1)
//       let ar = []
//       let i = 0
//       loop(data, dropKey, (item, index, arr) => {
//         ar = arr
//         i = index
//       })
//       if (dropPosition === -1) {
//         ar.splice(i, 0, dragObj)
//       } else {
//         ar.splice(i + 1, 0, dragObj)
//       }
//     }
//   }
//   gData.value = data
// }
</script>

<style lang="" scoped></style>
