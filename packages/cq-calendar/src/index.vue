<template>
  <a-popover trigger="click" v-model:visible="visible">

    <template #content>
      <div class="content">
        <div class="shortcuts" v-if="shortcuts.length">
          <div class="shortcuts-items" v-for="(shortcut, index) of shortcuts" :key="index"
            @click="shortcutSelected(shortcut.value && shortcut.value())">
            {{ shortcut.text }}</div>
        </div>
        <!-- 日历 -->
        <div class="calendars">
          <div v-for="(month, index) of manyMonths" :key="index" class="calendar">
            <header>
              <div v-if="index === 0" class="leftBtn">
                <span @click="handlerMonth(-1, 'years')">
                  <DoubleLeftOutlined />
                </span>
                <span @click="handlerMonth(-1, 'months')">
                  <LeftOutlined />
                </span>
              </div>

              <slot :month="month" name="header">
                <div class="todayDate">
                  {{ month.currentMonth.format("YYYY年MM月") }}
                </div>
              </slot>

              <div v-if="index === manyMonths.length - 1" class="rightBtn">
                <span @click="handlerMonth(1, 'months')">
                  <RightOutlined />
                </span>
                <span @click="handlerMonth(1, 'years')">
                  <DoubleRightOutlined />
                </span>
              </div>
            </header>
            <main>
              <!-- ["日", "一", '二', '三', '四', '五', '六'] -->
              <div class="header">
                <div v-for="(item, index) of weeksName" :key="index" class="header-item"
                  :style="{ color: item === '日' || item === '六' ? '#F56C6C' : '' }">
                  {{ item }}
                </div>
              </div>
              <!-- 一个月的 -->
              <div class="content">
                <div v-for="(item, index) of month.data" :key="index" :class="[
                  'dateBox',
                  item.isSelected ? 'isSelected' : '',
                  item.isRestDate ? 'isRestDate' : '',
                  item.isAvailable ? '' : 'isNoAvailable',
                  item.isDisabled ? 'isDisabled' : '',
                  item.isLegalDate ? 'isLegalDate' : '',
                ]" @click="selectDate(item)">
                  <!-- 默认插槽 -->
                  <slot :item="item">
                    <div v-if="item.isSelected && item.isAvailable" class="isSelectedDate">
                      {{ item.dateNumber }}
                    </div>

                    <span v-else> {{ item.dateNumber }} </span>
                  </slot>
                  <!-- 角标插槽 -->
                  <slot :item="item" name="mark">
                    <div v-if="item.isToday" class="isToday">

                    </div>
                  </slot>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <slot name="footer">
        <div class="footer">
          <span @click="deleteDays('restDate')" class="pointer" :style="{
            color: '#ebb563',
            margin: '0 5px'
          }" v-if="footerOptions.isRestDateBtn">{{
  footerOptions.restDateText
}}</span>
          <span :style="{
            color: '#F56C6C',
            margin: '0 5px'
          }" @click="deleteDays('legalDate')" class="pointer" v-if="footerOptions.isLegalBtn">{{
  footerOptions.legalDateText
}}</span>
          <a-button @click="reset" danger v-if="footerOptions.isResetBtn">{{
            footerOptions.resetText
          }}</a-button>
          <a-button @click="cancel" v-if="footerOptions.isCancelBtn">{{
            footerOptions.cancelText
          }}</a-button>
          <a-button type="primary" @click="confirm" v-if="footerOptions.isConfirmBtn">{{
            footerOptions.confirmText
          }}</a-button>
        </div>
      </slot>
    </template>

    <!-- <template #reference> -->
    <a-input allowClear readonly v-model:value="dates" :placeholder="placeholder">
      <template #suffix>
        <calendar-outlined />
      </template>
    </a-input>
    <!-- </template> -->
  </a-popover>
</template>

<script setup lang="ts">

import { Input as AInput, Popover as APopover, Button as AButton } from 'ant-design-vue'
import 'ant-design-vue/es/input/style/css'
import 'ant-design-vue/es/popover/style/css'
import 'ant-design-vue/es/button/style/css'
import { cloneDeep } from 'lodash-es'
import dayjs from 'dayjs'
import {
  onMounted,
  ref,
  unref,
  markRaw,
  defineProps,
  defineEmits,
  watch,
  nextTick,
  defineExpose
} from 'vue'
import {
  getDate,
  getTimeInWeekday,
  getWeekDays,
  getTimesBetween,
  getTodayStart
} from '../helper/index.js'
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined, CalendarOutlined } from '@ant-design/icons-vue'
const footerDefaultOptions = {
  isRestDateBtn: true,
  isResetBtn: true,
  isLegalBtn: true,
  isCancelBtn: true,
  isConfirmBtn: true,
  // 创建日期钩子
  restDateText: '去除休息日',
  legalDateText: '去除法定节假日',
  resetText: '重置',
  cancelText: '取消',
  confirmText: '确认'
}
const defaultHooks = {
  // 创建日期钩子
  createdDateHook: (data) => {
    return data
  },
  // 日历钩子
  legalDateApiHook: (res) => {
    return res.data.filter(item => Number(item.type) === 2).map(item => item.dayStr)
  }
}

const props = defineProps({
  // 字体图标链接
  fontIconLink: {
    type: String,
    // '//at.alicdn.com/t/c/font_3603377_v0ivh1js0tj.css'
    default: ''
  },
  // 自定义快速选择日期面板
  shortcuts: {
    type: Object,
    default: () => {
      return [
        // {
        //   text: '最近一周',
        //   value: () => {
        //     const end = new Date()
        //     const start = new Date()
        //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        //     return [start, end]
        //   },
        // },
      ]
    }
  },
  // 底部配置
  footerOptions: {
    type: Object,
    default: () => {
      return {
        isRestDateBtn: true,
        isResetBtn: true,
        isLegalBtn: true,
        isCancelBtn: true,
        isConfirmBtn: true,
        // 创建日期钩子
        restDateText: '去除休息日',
        legalDateText: '去除法定节假日',
        resetText: '重置',
        cancelText: '取消',
        confirmText: '确认'
      }
    }
  },
  // 最大日期
  maxDate: {
    type: String,
    default: '2099/12/31'
  },
  // 最小日期
  minDate: {
    type: String,
    default: '1980/01/01'
  },
  // format字符串
  format: {
    type: String,
    default: 'YYYY/MM/DD'
  },

  // 月份展示数量
  monthNum: {
    type: Number,
    default: 2
  },

  // 法定节假日输入
  legalDate: {
    type: Array,
    default: () => {
      return []
    }
  },

  // 开始联机配置
  isCascadeDate: {
    type: Boolean,
    default: true
  },

  // model
  value: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 时间戳
  valueFormat: {
    type: Boolean,
    default: false
  },

  // placeholder
  placeholder: {
    type: String,
    default: '请选择时间'
  },

  // 过程钩子
  hooks: {
    type: Object,
    default: () => {
      return {
      }
    }
  },
  // 日历api
  legalDateApi: {
    type: Function,
    default: () => {
      return false
    }
  },
  // 分隔符
  separator: {
    type: String,
    default: ','
  }
})
const emits = defineEmits(['update:value'])
const { format, monthNum, fontIconLink, shortcuts, legalDateApi, valueFormat, legalDate, placeholder, separator, minDate, maxDate, isCascadeDate } = unref(props)
const weeksName = ['日', '一', '二', '三', '四', '五', '六']
let monthDate = dayjs()
const visible = ref(false)
const manyMonths = ref([])
const dates = ref('')
const selectedMap = ref(new Map())
const initValue = ref([])
const initSelectedMap = ref([])
let initMonthDate

const footerOptions = ref({
  ...footerDefaultOptions,
  ...props.footerOptions
})
const hooks = {
  ...defaultHooks,
  ...props.hooks
}

let legalDateClone = []



const show = () => {
  initMonthDate = monthDate.clone()
  initValue.value = cloneDeep(props.value)
  initSelectedMap.value = cloneDeep(selectedMap.value) as any
}

// 生产日历
onMounted(async () => {
  legalDateClone = legalDate
  // 获取法定节假日
  !legalDateClone.length && await getLegalDate()

  // 添加字体图标
  fontIconLink && addFontIcon()

  // 初始化
  getManyMonths()
})

/**
 * @description: 获取法定节假日
 * @return {*}
 * @author: chen qi
 */
const getLegalDate = async () => {
  const promise = legalDateApi()
  if (promise instanceof Promise) {
    try {
      const res = await promise
      legalDateClone = hooks.legalDateApiHook(res).map(item => dayjs(item).format(format))
    } catch (error) {
      throw new Error('获取法定节假日失败')
    }
  }
}

/**
 * @description: 获取日期 // 更新识图
 * @return {*}
 * @author: chen qi
 */
const getManyMonths = () => {
  manyMonths.value = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let index = 0; index < monthNum; index++) {
    manyMonths.value.push({
      currentMonth: monthDate.add(index, 'month'),
      data: getDateLists(monthDate.add(index, 'month'))
    })
  }
}

/**
 * @description: 动态添加字体图标
 * @return {*}
 * @author: chen qi
 */
const addFontIcon = () => {
  const link = document.createElement('link')
  link.href = fontIconLink
  link.rel = 'stylesheet'
  link.type = 'text/css'
  document.getElementsByTagName('head')[0].append(link)
}

/**
 * @description: 点击获取 上月，下月 ，年
 * @param {*} diff
 * @param {*} type
 * @return {*}
 * @author: chen qi
 */
function handlerMonth (diff, type = 'months') {
  monthDate = monthDate.add(diff, type as any)
  getManyMonths()
}

/**
 * @description: 取消
 * @return {*}
 * @author: chen qi
 */
function cancel () {
  emits(
    'update:value',
    valueFormat
      ? initValue.value.map((item) => dayjs(item).valueOf())
      : initValue.value
  )
  selectedMap.value.clear()
  initValue.value.forEach((v) => {
    selectedMap.value.set(v, true)
  })
  selectedMap.value = initSelectedMap.value as any
  monthDate = initMonthDate
  getManyMonths()
  visible.value = false
}

/**
 * @description: 选择中月份
 * @param {*} dateInstance
 * @return {*}
 * @author: chen qi
 */
function selectDate (dateInstance) {
  if (disabledClick(dateInstance)) return

  // 判断是够选中第二个
  isCascadeDate && cascadeDate(dateInstance)

  // 单个点击
  dateInstance.isSelected = !dateInstance.isSelected
  if (dateInstance.isSelected) {
    selectedMap.value.set(dateInstance.format, dateInstance.isSelected)
  } else {
    selectedMap.value.delete(dateInstance.format)
  }

  emits(
    'update:value',
    valueFormat
      ? [...selectedMap.value.keys()].map((item) => dayjs(item).valueOf())
      : [...selectedMap.value.keys()]
  )
}

/**
 * @description: 联级时间触发
 * @param {*} dateInstance 单个日期
 * @return {*}
 * @author: chen qi
 */
const cascadeDate = (dateInstance) => {
  if (props.value.length === 1) {
    const first = dayjs(props.value[0] as any).valueOf()
    const seconde = dayjs(dateInstance.momentDate).valueOf()
    // 判断获取时间 包括自身的时间
    let betweenTimes = getTimesBetween(
      seconde > first ? first : seconde,
      seconde > first ? seconde : first,
      format
    )
    // 去除节假日,法定，休息日,禁用的
    betweenTimes = deleteDate(betweenTimes, manyMonths)
    // 设置选中的
    betweenTimes.forEach((item) => {
      selectedMap.value.set(item, true)
    })
    // 重新更新
    getManyMonths()
  }
}

/**
 * @description: 去除节假日,法定，休息日,禁用的
 * @param {string[]} betweenTimes
 * @return {string[]}
 * @author: chen qi
 */
const deleteDate = (betweenTimes, manyMonths) => {
  manyMonths = unref(manyMonths)
  const disabledObj = {}
  const legalDateObj = {}
  const restDateObj = {}
  manyMonths.forEach((v) => {
    for (let index = 0; index < v.data.length; index++) {
      const element = v.data[index]
      if (element.isDisabled) {
        disabledObj[element.format] = true
      }
      if (element.isRestDate) {
        restDateObj[element.format] = true
      }
      if (element.isLegalDate) {
        legalDateObj[element.format] = true
      }
    }
  })
  // 去除节假日
  // betweenTimes = betweenTimes.filter((item) => {
  //   return !legalDateObj[item]
  // })

  // 去除休息日 0星期天 6星期六

  // betweenTimes = betweenTimes.filter((item) => {
  //   return !restDateObj[item]
  // })

  // 去除禁用的
  betweenTimes = betweenTimes.filter((item) => {
    return !disabledObj[item]
  })
  return betweenTimes
}

/**
 * @description: 禁止选中
 * @param {*} dateInstance
 * @return {*}
 * @author: chen qi
 */
const disabledClick = (dateInstance) => {
  if (
    !dateInstance.isAvailable ||
    // dateInstance.isRestDate ||
    // dateInstance.isLegalDate ||
    dateInstance.isDisabled
  ) {
    return true
  }
  return false
}

/**
 * @description: 获取时间数据结构
 * @param {*} time // 传入的当前月
 * @return {*}
 * @author: chen qi
 */
function getDateLists (time) {
  const currentMonth = dayjs(time)
  const monthNumber = currentMonth.daysInMonth()
  const tempDateList = []
  for (let index = 1; index <= monthNumber; index++) {
    const momentDate = getDate(index, time)
    setDayDate(momentDate, tempDateList, true)
  }
  const firstLength = tempDateList[0].weekNameIndex
  const lastLength = tempDateList[tempDateList.length - 1].weekNameIndex

  // 补全before
  if (tempDateList[0].weekNameIndex !== 0) {
    for (let index = 0; index < firstLength; index++) {
      const beforeDayDate = getDate(1, time).add(-(index + 1), 'days')
      setDayDate(beforeDayDate, tempDateList, false, 'unshift')
    }
  }
  // 获取到底有几列
  setCols(tempDateList)

  // 补全after
  if (tempDateList[0].realColMaxNum === 5) {
    for (let index = 0; index < 6 - lastLength + 7; index++) {
      const afterDayDate = getDate(monthNumber, time).add(index + 1, 'days')
      setDayDate(afterDayDate, tempDateList)
    }
  } else if (tempDateList[0].realColMaxNum === 4) {
    for (let index = 0; index < 6 - lastLength + 14; index++) {
      const afterDayDate = getDate(monthNumber, time).add(index + 1, 'days')
      setDayDate(afterDayDate, tempDateList)
    }
  } else if (tempDateList[0].realColMaxNum === 6) {
    for (let index = 0; index < 6 - lastLength; index++) {
      const afterDayDate = getDate(monthNumber, time).add(index + 1, 'days')
      setDayDate(afterDayDate, tempDateList)
    }
  }
  // 设置所在列
  setCols(tempDateList)
  // 设置所在行
  setRows(tempDateList)

  // create钩子
  tempDateList.forEach(day => {
      hooks.createdDateHook(day)
  });
  
  return tempDateList
}

/**
 * @description: 设置当个日期的属性
 * @param {*} dayDate 单个日期
 * @param {*} tempDateList 展示day list
 * @param {*} isAvailable 无效的
 * @param {*} type push｜unshift
 * @return {*}
 * @author: chen qi
 */
const setDayDate = (
  dayDate,
  tempDateList,
  isAvailable = false,
  type = 'push'
) => {
  const dateNumber = dayDate.date()
  const weekNameIndex = dayDate.day()
  const weekName = getTimeInWeekday(dayDate)
  const formatValue = getTodayStart(dayDate).format(format)
  const day = {
    rows: markRaw([]), // 所在行
    cols: markRaw([]), // 所在列
    weekName, // 周日
    dateNumber, // 几号
    weekNameIndex, // 周几索引
    format: formatValue, // 字符串
    momentDate: markRaw(dayDate), // 时间对象
    isLegalDate: legalDateClone.includes(formatValue), // 是否是法定节假日
    isRestDate: !!(weekName === '周日' || weekName === '周六'), // 是否休息日
    isSelected: !!selectedMap.value.get(formatValue), // 是否被点击
    isAvailable, // 是否有效
    isToday: getTodayStart().format(format) === formatValue, // 是否今天
    isLeapYear: dayDate.isLeapYear(), // 是否是闰年
    realColMaxNum: 0, // 最大列
    isDisabled: !(dayjs(maxDate).valueOf() >= getTodayStart(dayDate).valueOf() && getTodayStart(dayDate).valueOf() >= dayjs(minDate).valueOf()) // 禁用
  }

  tempDateList[type](day)
}

/**
 * @description: 所在列
 * @param {*} tempDateList
 * @return {*}
 * @author: chen qi
 */
const setCols = (tempDateList) => {
  tempDateList.map((item, index, arr) => {
    item.cols = markRaw(
      arr
        .map((v) => {
          if (item.weekNameIndex === v.weekNameIndex) {
            return v
          }
          return undefined
        })
        .filter((item) => item !== undefined)
    )
    return item
  })
  const colsNum = tempDateList.map((item) => {
    return item.cols.length
  })
  tempDateList.forEach((element) => {
    element.realColMaxNum = Math.max(...colsNum)
  })
}
/**
 * @description: 所在行
 * @param {*} tempDateList
 * @return {*}
 * @author: chen qi
 */
const setRows = (tempDateList) => {
  tempDateList.map((item, index, arr) => {
    const temp = getWeekDays(item.momentDate, item.weekNameIndex, format)
    item.rows = markRaw(
      arr
        .map((v) => {
          if (temp.includes(v.format)) {
            return v
          }
          return undefined
        })
        .filter((item) => item !== undefined)
    )
    return item
  })
}

/**
 * @description:重置
 * @return {*}
 * @author: chen qi
 */
const reset = () => {
  emits('update:value', [])
  selectedMap.value = new Map()
  getManyMonths()
}

/**
 * @description: 去除休息日 ｜ 去除法定节假日
 * @param {*} day 'restDate' | 'legalDate'
 * @return {*}
 * @author: chen qi
 */
const deleteDays = (day) => {
  let temp
  // 去除休息日 0星期天 6星期六
  if (day === 'restDate') {
    temp = props.value.filter((item) => {
      const weekNum = getTodayStart(item as any).day()
      if (weekNum === 0 || weekNum === 6) {
        return false
      }
      return true
    })
  } else {
    temp = props.value.filter((item) => {
      const t = legalDateClone.map(item => getTodayStart(item).format(format))
      return !t.includes(getTodayStart(item as any).format(format))
    })
  }
  selectedMap.value = new Map()
  emits(
    'update:value',
    valueFormat
      ? temp.map((item) => dayjs(item).valueOf())
      : temp
  )
  nextTick(() => {
    getManyMonths()
  })
}

/**
 * @description: 确认
 * @return {*}
 * @author: chen qi
 */
const confirm = () => {
  visible.value = false
}

/**
 * @description:
 * @param {*} arr [start,end]  开始时间 ｜ 结束时间
 * @return {*}
 * @author: chen qi
 */
const shortcutSelected = (arr = []) => {
  if (arr.length === 2) {
    const betweenTimes = getTimesBetween(arr[0], arr[1], format)
    // 设置选中的
    betweenTimes.forEach((item) => {
      selectedMap.value.set(item, true)
    })
    getManyMonths()
  }
}

watch(
  () => props.value,
  (values) => {
    values.forEach((item) => {
      selectedMap.value.set(getTodayStart(item as any).format(format), true)
    })
    dates.value = values.map(item => getTodayStart(item as any).format(format)).join(separator)
    getManyMonths()
  },
  {
    immediate: true
  }
)

watch(
  () => visible.value,
  (value) => {
    if (value) {
      show()
    }
  }
)

/**
 * @description: 抛出方法
 * @return {*}
 * @author: chen qi
 */
defineExpose({
  handlerMonth,
  reset,
  deleteDays,
  selectDate,
  cancel,
  confirm,
  shortcutSelected,
  getManyMonths
})

</script>

<script lang="ts">
export default {
  name: 'cq-calendar'
  // inheritAttrs:true,
}
</script>
<style lang="less" scoped>
.content {
  display: flex;

  .shortcuts {
    width: 110px;
    text-align: center;
    user-select: none;
    overflow: auto;
    height: 302px;

    .shortcuts-items {
      padding: 0px 10px 3px;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }
  }
}

.calendars {
  width: 100%;
  display: flex;
}

.calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  // float: left;
  width: 322px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.display-conter {
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 15px;

  .leftBtn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);

    span {
      margin-left: 10px;

      &:hover {
        color: #409eff;
      }
    }

  }

  .todayDate {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #000;
    font-weight: 500;
    font-size: 16px;

    &:hover {
      color: #409eff;
    }
  }

  .rightBtn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);

    span {
      margin-right: 10px;

      &:hover {
        color: #409eff;
      }
    }

  }

}

main {
  // width: 292px;
  margin: 15px;

  .header {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ebeef5;

    .header-item {
      flex: 1;
      text-align: center;
      height: 41px;
      line-height: 41px;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .dateBox {
    position: relative;
    flex-direction: column;
    height: 30px;
    width: 14.28%;
    padding: 4px 0;
    font-size: 12px;
    text-align: center;
    background: #fff;
    color: #606275;
    .display-conter();

    &:hover {
      color: #409eff;
    }
  }

  // .isRestDate,
  // .isLegalDate,
  .isNoAvailable,
  .isDisabled {
    color: #c0c4cc !important;
    cursor: not-allowed;
  }

  .isSelected {
    color: red;
  }

  .isSelectedDate {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background: #409eff;
    color: #fff;
  }

  .isToday {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgb(235, 181, 99);
  }
}

.footer {
  text-align: right;
  padding-top: 10px;
  background: #fff;

  .ant-btn {
    margin: 0 5px;
  }
}

.pointer {
  cursor: pointer;
}
</style>
