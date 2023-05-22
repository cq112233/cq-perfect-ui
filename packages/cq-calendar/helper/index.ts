/*
 * @Author: chen qi
 * @Date: 2023-03-07 16:35:39
 * @LastEditors: chen qi
 * @LastEditTime: 2023-05-19 16:01:19
 * @Description: ~
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import weekOfYear from 'dayjs/plugin/weekOfYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.locale('zh-cn')
dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)
const lang = window.navigator.language
// lang = 'en'
export const weekLists = lang.includes('en')
    ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    : ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 获取某天开始时间戳
export function getTodayStart(day = dayjs()) {
    return dayjs(day).startOf('day')
}

// 获取某天结束时间戳
export function getTodayEnd(day = dayjs()) {
    return dayjs().endOf('day')
}

// 获取本月的第一天
export function getDate(number = 1, time = dayjs()) {
    return dayjs(time).set('date', number)
}

// 获取 ['周日' '周一' '周二' '周三' '周四' '周五' '周六']
export function getTimeInWeekday(time = dayjs(new Date())) {
    return weekLists[dayjs(time).day()]
}

// 当天是周几
export function getTimeInWeekdayNumber(time = dayjs(new Date())) {
    return dayjs(time).day()
}

// 获取时间在一年中的第几周
export function getTimeInWeek(time = dayjs(new Date())) {
    return dayjs(time).week()
}

// 获取明天后天昨天
export function getDiffTime(type = 'YYYY年MM月DD日 HH:mm:ss', diff = 0) {
    return dayjs().add(diff, 'day').format(type)
}

// 获取今年有几天
export function getYearNumber() {
    return dayjs().endOf('year').diff(dayjs().startOf('year'), 'days') + 1
}

// 获取本月有几天
export function getMonthNumber(time = dayjs(new Date())) {
    return dayjs(time).daysInMonth()
}

export function getCurrentWeekDays(current = dayjs(), format = 'YYYY/MM/DD') {
    const currentDay = current
    const startOfWeek = currentDay.startOf('week')
    const weekDays = []

    for (let i = 0; i < 7; i++) {
        weekDays.push(startOfWeek.add(i, 'day').format(format))
    }

    return weekDays
}

export function getWeekDays(current = dayjs(), j = 7, format = 'YYYY/MM/DD') {
    const weekDays = []
    for (let i = 0; i < j; i++) {
        weekDays.unshift(current.add(-(i + 1), 'day').format(format))
    }

    for (let i = j; i < 7; i++) {
        weekDays.push(current.add(i - j, 'day').format(format))
    }

    return weekDays
}

/**
 * @description:
 * @param {*} startTimestamp
 * @param {*} endTimestamp
 * @param {*} format
 * @return {*}
 * @author: chen qi
 */
export function getTimesBetween(startTimestamp: any, endTimestamp: any, format = 'YYYY-MM-DD HH:mm:ss') {
    let start = dayjs(startTimestamp)
    const end = dayjs(endTimestamp)
    const times = []
    // 每次循环增加一天，并将日期格式化成所需的格式，然后存入数组中
    while (end.diff(start, 'day') >= 0) {
        times.push(start.format(format))
        if (end.diff(start, 'day') === 0) break
        start = start.add(1, 'day')
    }

    return times
}
