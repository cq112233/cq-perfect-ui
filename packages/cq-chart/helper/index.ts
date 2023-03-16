/**
 * @description: 高清数字
 * @param {number} num
 * @return {*}
 * @author: chen qi
 */
 declare global {
  interface Number {
    getHdNum(): number
  }
}

export const getHdNum = (num:number):number=>{
  return num * devicePixelRatio
}
export function getRandomInt(min, max) {
  // Math.floor() 向下取整，使得结果为整数
  // Math.random() 生成0到1之间的随机小数
  // (max - min + 1) 用于计算随机数的范围
  // 加上min可以将结果偏移至min到max之间
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Number.prototype.getHdNum = function(){
  return this * devicePixelRatio
}