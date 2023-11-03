import { Providable ,Options} from './index.d';
import { AxisContainer, AxisType } from './Axis/axis.d';
import { Origin } from './Origin/index';
import Axis from "./Axis";
import ioc from './ioc'
import { getHdNum } from "./utils";
let uid = 1
// 配置接口

// 容器类
export class Echart implements Providable {
  canvas:HTMLCanvasElement;
  dom:HTMLElement;
  options: Options;
  xAxis: Axis;
  yAxis: Axis;
  uid:string;
  
  private constructor(dom: HTMLElement) {
    this.dom = dom
  }
  // 注入  
  provide() {
    this.uid = `echart-${uid}`
    uid++
    ioc.provide('global',{
      echart:this,
      dom: this.dom,
      canvas:this.canvas,
      ctx:this.canvas.getContext('2d')
    }) 
  }

  // 建立坐标系
  createCoordinate() {
    const {width,height} =  this.dom.getBoundingClientRect()

    // 创建原点
    const origin = Origin.create({
      x:width * 0.1,
      y:height * 0.9,
      r:1,
    })

    // 创建x轴
    this.xAxis = Axis.create({
      type: AxisType.X,
      position:AxisContainer.RIGHT,
      origin:origin,
    })

    ioc.provide('xAxis',{
      xAxis:{
        ...this.xAxis
      }
    }) 
  }


  createCanvas() {
    this.canvas = document.createElement('canvas')
    this.dom.appendChild(this.canvas) 
    const {width,height} = this.dom.getBoundingClientRect()
    this.canvas.width = getHdNum(width)
    this.canvas.height = getHdNum(height)
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
    this.provide()
  }

  draw() {
    // 创建坐标系
    this.createCoordinate()
  }


  static init(dom: HTMLElement) {
    return new Echart(dom)
  }
  setOption(options: Options) {
    // dom
    const {width,height} =  this.dom.getBoundingClientRect()
  
    // 默认配置
    const defalutOptions:Options = {
      width: width || window.innerWidth,
      height: height || window.innerHeight,
      xAxis: {
        number: 10,
      },
      yAxis: {
        number: 10,
      },
    }
    // 合并配置
    this.options = {
      ...defalutOptions,
      ...options
    };

    // 创建画布
    this.createCanvas()

    // 绘制
    this.draw()
  }
}
