/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:29:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-10-12 15:54:00
 * @Description: ~
 */
// 导入颜色选择器组件
import { defineAsyncComponent } from 'vue';
import CqCalendar from './cq-calendar'
import CqChart from './cq-chart'
import CqUpload from './cq-upload'
import CqDragTable from './cq-dragTable'
import CqSortTree from './cq-sortTree'
import CqMasonry from './cq-masonry'
import CqAnimation from './cq-animation'
import CqExcelChart from './cq-excelChart'
import CqNumber from './cq-number'
import cqRange from './cq-range'


// const modules = import.meta.glob('./**/*.vue')
// const regExp:RegExp = /\/([a-z-]+)\/src\//
// const components:Record<string,any> = Object.keys(modules).reduce((pre, cur) => {
//   console.log(pre[regExp.exec(cur)]);
//   // pre[regExp.exec(cur)![1] as string] = modules[cur]
//   return pre
// }, {})
const components = {
  CqCalendar,
  CqChart,
  CqUpload,
  CqDragTable,
  CqSortTree,
  CqMasonry,
  CqAnimation,
  CqExcelChart,
  CqNumber,
  cqRange
}
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (App) {
  // 遍历注册全局组件
  Object.keys(components).forEach(element => {
    App.component(element, components[element])
  })
}


export {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  CqCalendar,
  CqSortTree,
  CqChart,
  CqUpload,
  CqDragTable,
  CqMasonry,
  CqAnimation,
  CqExcelChart,
  CqNumber,
  cqRange
}

export default install
