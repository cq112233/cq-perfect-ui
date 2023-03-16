import { getHdNum, getRandomInt } from '../helper'
import Chart from './chart'
let uid = 0
/*
 * @Author: chen qi
 * @Date: 2023-03-15 23:28:26
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 09:33:54
 * @Description: 小怪
 */
export default class Monster {
  uid = uid++
  chart: Chart
  ctx: CanvasRenderingContext2D
  name: string
  hp: number
  attack: number
  x
  y
  width
  height
  constructor(x, y, width, height) {
    this.name = '小怪'
    this.hp = 100
    this.attack = 10
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  /**
   * @description: 设置chart
   * @param {Chart} chart
   * @return {*}
   * @author: chen qi
   */
  setChart(chart: Chart) {
    this.chart = chart
    this.ctx = this.chart.ctx
  }
  draw() {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.x - this.width, this.y, this.width, this.height)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
  move() {
    window.requestAnimationFrame(() => {
      this.move()
    })
    this.x = this.x - getHdNum(1)
  }
}
