import { OriginOptions } from '../Origin/Origin'

// 坐标配置
export type AxisOption = {
  type?: AxisType // 轴类型 
  origin?:OriginOptions, // 原点
  position?: AxisContainer, // 方向
  number?:number // 长度
}

// 坐标
export enum AxisContainer { 
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}


export enum AxisType { 
  X,
  Y,
}