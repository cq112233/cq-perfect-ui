import { getHdNum } from '../helper'
import Controller from './controller'
import Chart from './chart'
import Cullet from './cullet'
/*
 * @Author: chen qi
 * @Date: 2023-03-13 21:54:40
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 01:25:10
 * @Description: 角色
 */
type Options = {
  fillStyle: string
  strokeStyle: string
  lineWidth: number
}

export default class Controlled {
  ctx: CanvasRenderingContext2D
  chart: Chart // 画布
  x: number // 圆心坐标x
  y: number // 圆心坐标y
  radius: number // 半径
  lastTime: number
  isMove:boolean
  count = 0
  options: Options = {
    lineWidth: getHdNum(1),
    fillStyle: '#fff', // 填充色
    strokeStyle: '#fff'
  }
  controller: Controller
  constructor(x: number, y: number, r: number, option?: Options) {
    this.x = x
    this.y = y
    this.radius = r
    this.options = {
      ...this.options,
      ...option
    }
  }
  /**
   * @description: 创建子弹
   * @return {*}
   * @author: chen qi
   */
  createBullets(speed) {
    let cullet = new Cullet(this.x, this.y,speed)
    cullet.setChart(this.chart)
    cullet.draw(this)
  }
  stopMove() {
    this.isMove = false
  }
  /**
   * @description: 移动
   * @return {*}
   * @author: chen qi
   */
  move(speed, direction) {
    this.isMove = true
    window.requestAnimationFrame(() => {
      if(this.isMove) {
        this.move(speed, direction)
      }
    })
    switch (direction) {
      case 'ArrowRight':
        this.x = this.x + speed
        if(this.x>=this.chart.width) {
          this.x = this.chart.width - this.radius 
        }
        break
      case 'ArrowLeft':
        this.x = this.x - speed
        if(this.x<=0) {
          this.x = 0 + this.radius 
        }
        break
      case 'ArrowDown':
        this.y = this.y + speed
        if(this.y>=this.chart.height) {
          this.y=this.chart.height - this.radius 
        }
        break
      case 'ArrowUp':
        this.y = this.y - speed
        if(this.y<=0) {
          this.y=0 + this.radius 
        }
        break
      default:
        break
    }
  }

  /**
   * @description: 获取坐标
   * @return {*}
   * @author: chen qi
   */
  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }
  /**
   * @description: 设置坐标
   * @param {*} x
   * @param {*} y
   * @return {*}
   * @author: chen qi
   */
  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * @description: 设置chart 创建控制器
   * @param {Chart} chart
   * @return {*}
   * @author: chen qi
   */
  setChart(chart: Chart) {
    this.chart = chart
    this.ctx = this.chart.ctx
    this.controller = new Controller(this.chart.container, this)
  }

  /**
   * @description: 绘制圆点
   * @param {CanvasRenderingContext2D} ctx
   * @return {*}
   * @author: chen qi
   */
  draw() {
    // window.requestAnimationFrame(() => {
    //   this.draw()
    // })
    this.ctx.beginPath()
    this.ctx.lineWidth = this.options.lineWidth
    this.ctx.strokeStyle = this.options?.strokeStyle
    this.ctx.fillStyle = this.options?.fillStyle
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
  }
}
