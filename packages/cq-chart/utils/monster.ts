import { getHdNum, getRandomInt } from '../helper'
import Chart from './chart'
let uid = 0
/*
 * @Author: chen qi
 * @Date: 2023-03-15 23:28:26
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-17 10:03:34
 * @Description: 小怪
 */
export default class Monster {
  uid = uid++
  chart: Chart
  ctx: CanvasRenderingContext2D
  name: string
  hp: number
  attack: number
  isAlive:boolean = true
  fillStyle =  `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
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
    this.ctx.fillStyle = this.fillStyle
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
  move() {
    window.requestAnimationFrame(() => {
      if(!this.isAlive)return
      this.move()
    })
    if(this.x + this.width <= 0) {
      this.remove()
      this.isAlive = false
    }
    this.x = this.x - getHdNum(1)
  }

  remove() {
    this.chart.monsterList.splice(this.chart.monsterList.indexOf(this), 1)
    this.isAlive = false
  }
}
