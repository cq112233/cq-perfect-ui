/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:29:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 20:54:02
 * @Description: ~
 */
// 导入颜色选择器组件
import { defineAsyncComponent } from 'vue';
import CqCalendar from './cq-calendar'
import CqChart from './cq-chart'
import CqUpload from './cq-upload'
import CqTree from './cq-tree'
const modules = import.meta.glob('./**/*.vue')
const regExp:RegExp = /\/([a-z-]+)\/src\//
const components:Record<string,any> = Object.keys(modules).reduce((pre, cur) => {
  pre[regExp.exec(cur)![1] as string] = modules[cur]
  return pre
}, {})
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (App) {
  // 遍历注册全局组件
  Object.keys(components).forEach(element => {
    App.component(element, defineAsyncComponent(components[element]))
  })
}


export {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  CqCalendar,
  CqChart,
  CqUpload,
  CqTree
}

export default install
