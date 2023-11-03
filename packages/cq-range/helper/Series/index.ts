import { Drawable, Destroyed, Providable,SeriesOption } from '../index.d';
import ioc from '../ioc';
let uid = 1
export class Series implements Drawable,Destroyed,Providable {
  uid:string
  options:any

  private constructor(seriesOption) {
    this.options = seriesOption
    this.provide()
  }

  static create(seriesOption:SeriesOption): Series { 
    return new Series(seriesOption)
  }

  provide(): void {
    this.uid = 'container' + uid 
    uid++
    ioc.provide(this.uid,this)
  }

  destroyed(): void {
    throw new Error('Method not implemented.');
  }
  draw(): void {
    throw new Error('Method not implemented.');
  }
}