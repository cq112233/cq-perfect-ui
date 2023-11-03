/*
 * @Author: chen qi
 * @Date: 2023-08-11 14:54:44
 * @LastEditors: chen qi
 * @LastEditTime: 2023-08-11 15:38:57
 * @Description:  容器
 */
import { IOC } from '../utils/ioc'
import { createElement,addChildNode } from '../utils/domUtils'
// 对象工厂
window.$cqExcelChartIOC = IOC.getInstance();

// 简约表单
export class excelTable {
  dom:HTMLElement = null
  canvas:HTMLCanvasElement = null
  ctx:CanvasRenderingContext2D = null
  static init(dom: HTMLElement) {
    return new excelTable(dom)
  }
  private constructor(dom: HTMLElement) {
    this.dom = dom
    this.canvas = createElement('canvas')
    this.canvas.width = this.dom.clientWidth * window.devicePixelRatio
    this.canvas.height = this.dom.clientHeight * window.devicePixelRatio
    this.canvas.style.width = this.canvas.width / window.devicePixelRatio + 'px'
    this.canvas.style.height = this.canvas.height  / window.devicePixelRatio + 'px'
    this.ctx = this.canvas.getContext('2d')

    this.ctx.fillStyle = 'red'
    this.ctx.fillText('xxxx',100,100)
    this.ctx.fillStyle = 'blue'


    this.dom.appendChild(this.canvas)
  }
  setOption(option:Object) {

  }
}