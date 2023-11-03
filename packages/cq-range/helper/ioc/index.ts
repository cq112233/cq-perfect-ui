// 对象存储器类
class IOC {
  static ico = null
  modules = new Map()
  private constructor() {
    
  }
  // 懒汉单列模式
  static getInstance():IOC {
    if(IOC.ico === null) {
      IOC.ico = new IOC()
    }
    return IOC.ico
  }
  // 注册类名
  provide<T,V>(key:T, clazz:V, ...args) {
    if (this.modules.has(key)) return console.warn(`${key}已经被注册`)
    if(typeof clazz === 'object' && clazz !== null) {
      this.modules.set(key,{clazz})
    }else {
      this.modules.set(key, { clazz, args })
    }
  }
  // 获取对象实例
  inject(key:any, ...args) {
    const { clazz, args: defaultArgs } = this.modules.get(key)
    if(typeof clazz === 'object' && clazz !== null) {
      return clazz;
    }else {
      return Reflect.construct(clazz, [...defaultArgs, ...args])
    }
  }
}

export default IOC.getInstance()