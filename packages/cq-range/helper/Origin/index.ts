import { Drawable,Destroyed } from '../index'
import { OriginOptions } from './Origin';
import ioc from '../ioc';
let uid = 1

export class Origin implements Drawable,Destroyed,Injectable {
  uid:string;
  originOptions:OriginOptions
  public x: number;
  public y: number;
  public r: number

  private constructor(originOptions) {
    this.x = originOptions.x;
    this.y = originOptions.y;
    this.r = originOptions.r;
    this.originOptions = originOptions;
    this.provide()
  }

  // 注册
  provide() {
    this.uid = 'origin' + uid
    uid++
    ioc.provide(this.uid,{
      origin:{
        ...this
      }
    }) 
  }

  static create(originOptions:OriginOptions) {
    return new Origin(originOptions);
  }
  destroyed(): void {
    throw new Error('Method not implemented.');
  }
  draw(): void {
    throw new Error('Method not implemented.');
  }
}