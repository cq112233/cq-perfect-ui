import { getHdNum } from './../helper/index';
import Chart from './chart';
import Controlled from './controlled';
/*
 * @Author: chen qi
 * @Date: 2023-03-14 15:58:54
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 01:21:41
 * @Description: 子弹
 */
export default class Cullet {
  ctx:CanvasRenderingContext2D
  chart:Chart // 画布
  x: number
  y: number
  speed: number
  r: number = getHdNum(3)
  isLive: boolean = true
  constructor(x,y,speed) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  /**
   * @description: 设置chart 创建控制器
   * @param {Chart} chart
   * @return {*}
   * @author: chen qi
   */
  setChart(chart:Chart) {
    this.chart = chart
    this.ctx = this.chart.ctx
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

  draw(controlled:Controlled) {
    window.requestAnimationFrame(()=>{
      if(!this.isLive)return
      this.draw(controlled)
    })
    if(this.x > this.chart.width) {
      this.isLive = false
    }
    // 打中小怪,消灭子弹
    this.chart.monsterList.forEach(monster=>{
      const xTrue = this.x+this.r >= monster.x
      const yTrue = this.y>= monster.y - this.r && this.y <= monster.y + monster.height + this.r
      const xControlledTrue = controlled.x + controlled.radius < monster.x 
      if(xTrue && yTrue && xControlledTrue) {
        this.chart.monsterList.splice(this.chart.monsterList.indexOf(monster),1)
        this.isLive = false
      }
    })

    this.ctx.save();
    this.ctx.beginPath()
    this.x = this.x + getHdNum(this.speed)
    this.y = this.y
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.restore()
  }

}
