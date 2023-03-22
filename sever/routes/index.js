/*
 * @Author: chen qi
 * @Date: 2023-03-20 17:14:46
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 11:06:08
 * @Description: ~
 */
const path = require('path')
const router = require('koa-router')()
const fs = require('fs')
const formidable = require('formidable')

const TEMPORARY_FILES = path.join(__dirname, 'temporary')
const STATIC_FILES = path.join(__dirname, 'public')
console.log('__dirname', TEMPORARY_FILES)
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/alreadyFile', async (ctx) => {
  const { filename } = ctx.query
  const already = []
  //fs.readdirSync,该方法将返回一个包含“指定目录下所有文件名称”的数组对象
  //切片文件目下没有 `${filename}`的文件夹，那就是还没开始上传
  if (!fs.existsSync(`${TEMPORARY_FILES}\\${filename}`)) {
    ctx.body = already
  } else {
    //有文件夹，那就获取该文件夹下面切片的文件名
    fs.readdirSync(`${TEMPORARY_FILES}\\${filename}`).forEach((name) => {
      already.push(Number(name))
    })
    ctx.body = already
  }
})

router.post('/upload', async (ctx) => {
  let form = new formidable.IncomingForm()
  console.log(111);
  form.parse(ctx.req, (err, value, files) => {
    console.log('form',value,files)
    //切片保存在temporary目录下的那个文件夹下
    let dir = `${TEMPORARY_FILES}\\${value.filename}`
    //第几个切片
    let hash = value.hash
    let chunk = files.chunk
    console.log(chunk.filepath);
    const buffer = fs.readFileSync(chunk.filepath)
    try {
      // 是否存在这个文件夹
      if (!fs.existsSync(dir)) {
          //创建
          fs.mkdirSync(dir)
      }
      // 创建切片文件
      const ws = fs.createWriteStream(`${dir}\\${hash}`)
      // 切片写入
      ws.write(buffer)
      ws.close()
    } catch (error) {
      console.error(error)
    }
  })
  ctx.body = 'ok'
})

router.get('/fileLink', async (ctx) => {
  const { filename } = ctx.query
  try {
    // 在public目录下是否存在这个文件，有就直接返回链接，ctx.origin获取域名
    if (fs.existsSync(`${STATIC_FILES}\\${filename}`)) {
      ctx.body = { url: `${ctx.origin}/${filename}` }
    }
  } catch (error) {
    console.error(error)
  }

  try {
    let len = 0
    //fs.readdirSync,该方法将返回一个包含“指定目录下所有文件名称”的数组对象
    const bufferList = fs
      .readdirSync(`${TEMPORARY_FILES}\\${filename}`)
      .map((hash, index) => {
        //读取切片数据
        const buffer = fs.readFileSync(
          `${TEMPORARY_FILES}\\${filename}\\${index}`
        )
        len += buffer.length
        return buffer
      })
    //合并切片文件
    // 返回一个连接了 list 中所有 Buffer 的新 Buffe
    const buffer = Buffer.concat(bufferList, len)
    //在public下创建文件
    const ws = fs.createWriteStream(`${STATIC_FILES}\\${filename}`)
    ws.write(buffer)
    ws.close()
  } catch (error) {
    console.error(error)
  }
  ctx.body = { url: `${ctx.origin}/${filename}` }
})

module.exports = router
