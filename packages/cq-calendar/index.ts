/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-14 09:47:27
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqCalendar from './src/index.vue'
console.log('CqCalendar',CqCalendar)
// 为组件提供 install 安装方法，供按需引入
CqCalendar.install = function (app) {
  app.component(CqCalendar.name, CqCalendar)
}

// 默认导出组件
export default CqCalendar
