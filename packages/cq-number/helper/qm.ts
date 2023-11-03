/*
 * @Author: chen qi
 * @Date: 2023-09-05 20:47:00
 * @LastEditors: chen qi
 * @LastEditTime: 2023-09-05 21:15:23
 * @Description: ~
 */

const getGqNum = (number) => {
  return number * window.devicePixelRatio
}
export const createdQm = (dom: HTMLElement) => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const { width, height } = dom.getBoundingClientRect()
  console.log(width, height);
  // css 像素比 物理像素比 1:3
  canvas.width = getGqNum(width)
  canvas.height = getGqNum(height)
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  dom.append(canvas)
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
  let startX = null
  let startY = null
  let endX = null
  let endY = null
  let start = false
  canvas.addEventListener('mousedown', (event) => {
    startX = event.offsetX
    startY = event.offsetY
    start = true
  })

  canvas.addEventListener('mousemove', (event) => {
    if (!start) return
    endX = event.offsetX
    endY = event.offsetY
    draw(ctx, {
      startX,
      startY,
      endX,
      endY
    })
    startX = endX
    startY = endY
  })

  canvas.addEventListener('mouseup', (event) => {
    start = false
  })
  window.addEventListener('mouseup', (event) => {
    start = false
  })

  const draw = (ctx: CanvasRenderingContext2D, option = {
    startX,
    startY,
    endX,
    endY
  }) => {
    const { startX,
      startY,
      endX,
      endY } = option
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(getGqNum(startX), getGqNum(startY));
    ctx.lineTo(getGqNum(endX), getGqNum(endY));
    ctx.stroke();
    ctx.closePath()
  }

  draw(ctx)


}