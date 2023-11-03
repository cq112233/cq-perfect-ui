import { AxisOption } from './Axis/axis'

export interface SeriesOption { 
  name: string;
  data: any[];
  type: string;
  smooth: boolean;
  symbol: string;
  symbolSize: number;
  showSymbol: boolean;
  showEffectOn: string;
  hoverAnimation: boolean;
  hoverAnimationOption: any;
  itemStyle: any;
  lineStyle: any;
  barWidth: number;
  barMaxWidth: number;
  barMinHeight: number;
  barGap: string;
  barCategoryGap: string;
}

export interface Options {
  width: number;
  height: number;
  xAxis?: AxisOption[] | AxisOption;
  yAxis?: AxisOption[] | AxisOption;
  series?: SeriesOption []
}


// 绘画
export interface Drawable {
  draw(): void;
}

// 销毁
export interface Destroyed {
  destroyed(): void;
}

// 提供者
export interface Providable {
  provide(): void;
}

// 注入
export interface Injectable {
  inject(): void;
}