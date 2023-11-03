import { Drawable, Destroyed } from './../index.d';
/***
 * @description 坐标系
 *
 */

import { AxisOption } from './axis.d';
import { Container } from "../Series";
import ioc from '../ioc';
import { drawLine } from '../utils';
let uid = 1
// x轴
export default class Axis implements Drawable,Destroyed  {
  uid:number;
  // 配置
  options: AxisOption
  
  private constructor(options) {
    this.options = options;
    this.draw()
    this.uid = ++uid
  }

  // 创建坐标
  static create(axis:AxisOption) {
    return new Axis(axis)
  }


  

  draw() {
    const { origin } = this.options
    drawLine(origin,{
      x:0,
      y:0,
    },{
      x:0,
      y:600,
    })
  }

  destroyed(): void {
    throw new Error('Method not implemented.');
  }

}