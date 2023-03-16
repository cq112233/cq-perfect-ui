/*
 * @Author: chen qi
 * @Date: 2023-03-13 21:39:45
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 09:23:36
 * @Description: ~
 */
/*
 * @Author: chen qi
 * @Date: 2023-03-13 21:39:45
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-14 15:14:05
 * @Description: 游戏载体
 */
import { getHdNum, getRandomInt } from "../helper"
import Monster from "./monster"
import Controlled from "./controlled"
export default class Chart {
  width:number
  height:number
  container:HTMLCanvasElement // 主容器dom
  ctx:CanvasRenderingContext2D  // canvas ctx
  controlledList:Controlled[] = []
  // monsterMap:Map<number,Monster> = new Map<number,Monster>()
  monsterList:Monster[]= []

  constructor (container) {
    this.container = container
    this.container.setAttribute('tabindex','-1')
    const domRect:DOMRect = this.container.getBoundingClientRect()
    this.width = this.container.width = getHdNum(domRect.width) 
    this.height = this.container.height = getHdNum(domRect.height)
    this.ctx = this.container.getContext('2d')
    const controlled = new Controlled(getHdNum(15),getHdNum(15),getHdNum(10))
    controlled.setChart(this)
    this.controlledList.push(controlled)
    setInterval(()=>{
      const monster = new Monster(this.width,getRandomInt(0,this.height),getHdNum(30),getHdNum(30))
      monster.setChart(this)
      this.monsterList.push(monster)
      monster.move()
    },3000)
  }

  // 初始化
  static init (container:HTMLCanvasElement):Chart {
    return new Chart(container)
  }
  // 绘画
  draw() {
    window.requestAnimationFrame(()=>{
      this.draw()
    })
    this.ctx.clearRect(0, 0, this.container.width, this.container.height)
    this.monsterList.forEach(element => {
      element.draw()
    });
    this.controlledList.forEach(controlled =>{
      controlled.draw()
    })
  }
}