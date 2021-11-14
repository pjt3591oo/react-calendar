const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const format = require('date-fns/format');
const getDaysInMonth = require('date-fns/getDaysInMonth');

const FORMAT_DATE = "yyyy-MM-dd"

function getRangeDates(startDate, endDate) {
  return eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  }).map(date => format(new Date(date), FORMAT_DATE));
}

function getCountDaysByMonth(focusDate) {
  return getDaysInMonth(new Date(focusDate));
}

class Task {
  
  constructor(tasks) {
    this.tasks = tasks.map(day => ({...day, length: getRangeDates(day.dateS, day.dateE).length}))
    this.days = this._getDays()
  }

  _getDays() {
    let temp = []
    let monthCnt = getCountDaysByMonth(new Date())
    for (let i = 0 ; i < monthCnt ; i++) {
      temp.push([])
    }

    return temp
  }
}

module.exports = Task;