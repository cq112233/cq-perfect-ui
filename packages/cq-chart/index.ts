/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-14 09:46:26
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqChart from './src/index.vue'
console.log('CqChart',CqChart)
// 为组件提供 install 安装方法，供按需引入
CqChart.install = function (app) {
  app.component(CqChart.name, CqChart)
}

// 默认导出组件
export default CqChart
