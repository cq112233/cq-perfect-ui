/*
 * @Author: chen qi
 * @Date: 2023-04-17 16:42:07
 * @LastEditors: chen qi
 * @LastEditTime: 2023-04-17 16:45:09
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqSortTree from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
CqSortTree.install = function (app) {
  app.component(CqSortTree.name, CqSortTree)
}

// 默认导出组件
export default CqSortTree
