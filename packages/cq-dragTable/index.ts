/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-04-17 17:01:18
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqDragTable from './src/index.vue'
console.log('CqDragTable',CqDragTable)
// 为组件提供 install 安装方法，供按需引入
CqDragTable.install = function (app) {
  app.component(CqDragTable.name, CqDragTable)
}

// 默认导出组件
export default CqDragTable
