import { getHdNum } from './../helper/index'
import Controlled from './controlled'

/*
 * @Author: chen qi
 * @Date: 2023-03-14 15:58:54
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-16 01:07:32
 * @Description: 控制器
 */
export default class Controller {
  xSpeed: number = getHdNum(5) //
  ySpeed: number = getHdNum(5)
  operation = {
    ArrowUp:{
      key:'ArrowUp',
      state:false
    },
    ArrowDown:{
      key:'ArrowDown',
      state:false
    },
    ArrowLeft:{
      key:'ArrowUp',
      state:false
    },
    ArrowRight:{
      key:'ArrowUp',
      state:false
    }
  }
  lastTime: number
  constructor(dom: HTMLCanvasElement, controlled: Controlled) {
    dom.addEventListener(
      'keydown',
      (e) => {
        const { x, y } = controlled.getPosition()
        if (e.key === 'ArrowUp') {
          if( this.operation.ArrowUp.state) return
          this.operation.ArrowUp.state = true
          controlled.move(this.ySpeed,'ArrowUp')
        }
        if (e.key === 'ArrowDown') {
          if( this.operation.ArrowDown.state) return
          this.operation.ArrowDown.state = true
          controlled.move(this.ySpeed,'ArrowDown')
        }
        if (e.key === 'ArrowLeft') {
          if( this.operation.ArrowLeft.state) return
          this.operation.ArrowLeft.state = true
          controlled.move(this.xSpeed,'ArrowLeft')
        }
        if (e.key === 'ArrowRight') {
          if( this.operation.ArrowRight.state) return
          this.operation.ArrowRight.state = true
          controlled.move(this.xSpeed,'ArrowRight')
        }
        if(e.key === 'q') {
          controlled.createBullets(getHdNum(5))
        }
      },
      false
    )
    dom.addEventListener(
      'keyup',
      (e) => {
        if (e.key === 'ArrowUp') {
          this.operation.ArrowUp.state = false
          controlled.stopMove()
        }
        if (e.key === 'ArrowDown') {
          this.operation.ArrowDown.state = false
          controlled.stopMove()
        }
        if (e.key === 'ArrowLeft') {
          this.operation.ArrowLeft.state = false
          controlled.stopMove()
        }
        if (e.key === 'ArrowRight') {
          this.operation.ArrowRight.state = false
          controlled.stopMove()
        }
      },
      false
    )
  }
}
