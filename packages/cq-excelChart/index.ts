/*
 * @Author: chen qi
 * @Date: 2023-03-08 09:34:08
 * @LastEditors: chen qi
 * @LastEditTime: 2023-08-11 14:52:22
 * @Description: ~
 */
// 导入组件，组件必须声明 name
import CqExcelChart from './src/index.vue'
console.log('CqExcelChart',CqExcelChart)
// 为组件提供 install 安装方法，供按需引入
CqExcelChart.install = function (app) {
  app.component(CqExcelChart.name, CqExcelChart)
}

// 默认导出组件
export default CqExcelChart
