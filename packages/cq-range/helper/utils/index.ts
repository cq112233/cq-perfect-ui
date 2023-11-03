import { Origin } from './../Origin/index';
import ioc from '../ioc'

// 高清化
export const getHdNum = (num:number):number=>{
  return num * devicePixelRatio
}

// 根据坐标计算坐标
export const getRealPoistion = (origin,{x,y})=>{
  y = origin.y - y
  x = origin.x + x
  return {
    x,
    y
  }
}

// 画直线
export const drawLine = (origin:Origin,begin = {
  y:0,
  x:200,
},end = {
  x :200,
  y :100
},fn = (ctx)=>{
  ctx.strokeStyle = 'blue'
  ctx.lineWidth = 2
}) => {
  const { ctx } = ioc.inject('global')
  ctx.save()
  ctx.beginPath()

  begin = getRealPoistion(origin,{
    x:begin.x,
    y:begin.y,
  })

  end = getRealPoistion(origin,{
    x:end.x,
    y:end.y,
  })
  // 画直线
  ctx.moveTo(getHdNum(begin.x) , getHdNum(begin.y))
  ctx.lineTo(getHdNum(end.x) , getHdNum(end.y))
  fn(ctx)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

// 画圆弧
export const drawArc = (origin) =>{
  
}