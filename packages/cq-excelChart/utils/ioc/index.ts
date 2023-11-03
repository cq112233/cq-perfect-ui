// 对象存储器类
export class IOC {
  static ico = null
  modules = new Map()
  private constructor() {
    
  }
  // 懒汉单列模式
  static getInstance() {
    if(IOC.ico === null) {
      IOC.ico = new IOC()
    }
    return IOC.ico
  }
  // 注册类名
  provide(key, clazz, ...args) {
    if (this.modules.has(key)) return console.warn(`${key}已经被注册`)
    this.modules.set(key, { clazz, args })
  }
  // 获取对象实例
  getClazz(key, ...args) {
    const { clazz, args: defaultArgs } = this.modules.get(key)
    return Reflect.construct(clazz, [...defaultArgs, ...args])
  }
}


 