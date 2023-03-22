/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 23:38:47
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqTree from './src/index.vue'
console.log('CqTree',CqTree)
// 为组件提供 install 安装方法，供按需引入
CqTree.install = function (app) {
  app.component(CqTree.name, CqTree)
}

// 默认导出组件
export default CqTree
