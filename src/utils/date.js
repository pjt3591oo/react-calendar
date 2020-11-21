import getDay from 'date-fns/getDay';
import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';

import addMonths from 'date-fns/addMonths';
import sunMonths from 'date-fns/subMonths';

import format from 'date-fns/format';
import compareAsc from 'date-fns/compareAsc';

import { ko } from 'date-fns/locale';

const FORMAT_DATE = "yyyy-MM-dd"

/**
 * 일요일(0), 월요일(1), 화요일(2), 수요일(3), 목요일(4), 금요일(5), 토요일(6)
 */

export const daysMap = [
  "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일",
] 

// 오늘날짜 - 표시때 쓸듯.
export function getToday() {
  let currentDatetime = new Date()
  let convertedFormat = format(currentDatetime, FORMAT_DATE, {locale: ko});
  return [convertedFormat, getDay(currentDatetime)];
}

// 해당 년-월의 첫번째 요일
export function getFirstDayByMonth(focusDate) {
  let startDay = startOfMonth(new Date(focusDate));

  return getDay(startDay);
}

// 해당 달의 날짜
export function getCountDaysByMonth(focusDate) {
  return getDaysInMonth(new Date(focusDate));
}

// 전달 날짜
export function getPrevMonthDate(focusDate) {
  let prevDate = sunMonths(new Date(focusDate), 1)
  let convertedFormat = format(prevDate, FORMAT_DATE, {locale: ko});
  return [convertedFormat, getDay(prevDate)];
}

// 다음달 날짜
export function getNextMonthDate(focusDate) {
  let nextDate = addMonths(new Date(focusDate), 1)
  let convertedFormat = format(nextDate, FORMAT_DATE, {locale: ko});
  return [convertedFormat, getDay(nextDate)];
}

// 포맷 변환
export function format_YYYYMMDD(y, m, d) {
  return format(new Date(y, m-1, d), FORMAT_DATE);
}

// 크기비교 source < target true
export function rightBig ( source, target) {
  return compareAsc(new Date(source), new Date(target)) === -1
}

// 크기비교 source > target false
export function leftBig ( source, target) {
  return compareAsc(new Date(source), new Date(target)) !== -1
}