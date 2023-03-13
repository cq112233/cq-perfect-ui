/*
 * @Author: chen qi
 * @Date: 2023-03-13 21:39:45
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-13 21:58:25
 * @Description: 主容器
 */
export default class Chart {
  container = null // 主容器dom
  ctx = null // canvas ctx
  constructor (container) {
    this.container = container
    this.ctx = container
  }

  // 初始化
  static init (container) {
    console.log(container)
    if (!container) return new Error('container is required')
    return new Chart(container)
  }
}
