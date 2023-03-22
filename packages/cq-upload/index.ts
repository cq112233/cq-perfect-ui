/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-20 17:26:03
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqUpload from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
CqUpload.install = function (app) {
  app.component(CqUpload.name, CqUpload)
}

// 默认导出组件
export default CqUpload
