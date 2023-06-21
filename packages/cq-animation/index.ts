/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-06-21 14:49:59
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqAnimation from './src/index.vue'
console.log('cqAnimation',CqAnimation)
// 为组件提供 install 安装方法，供按需引入
CqAnimation.install = function (app) {
  app.component(CqAnimation.name, CqAnimation)
}

// 默认导出组件
export default CqAnimation
