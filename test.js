let Task = require('./src/utils/tasks');
let data = [
  {
    dateS: "2020-01-01",
    dateE: "2020-01-01",
    title: "title a",
    id: 1
  },
  {
    dateS: "2020-01-01",
    dateE: "2020-01-05",
    title: "title b",
    id: 2
  },
  {
    dateS: "2020-01-04",
    dateE: "2020-01-04",
    title: "title c",
    id: 3
  }
]

let {tasks, days} = new Task(data)

console.log(tasks, days)