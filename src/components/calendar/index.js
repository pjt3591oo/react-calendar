import React, { useEffect, useState } from 'react';

import {
  getToday, getFirstDayByMonth,
  daysMap, getCountDaysByMonth
} from '../../utils/date';

import Nav from './nav';
import Row from './row';
import Cell from './cell';

const Calendar = props => {
  let d = getToday()
  let [focusDate, setFocusDate] = useState(d);
  let [startDay, setStartDay] = useState(getFirstDayByMonth(d[0]));
  let [daysCnt, setDaysCnt] = useState(getCountDaysByMonth(d[0]));
  
  let [ dragRange, setDragRange ] = useState([4, 8]); // 드레그 [시작, 끝]

  useEffect(() => {
    setStartDay(getFirstDayByMonth(focusDate[0]));
    setDaysCnt(getCountDaysByMonth(focusDate[0]));
    setDragRange([-1, -1]);
  }, [focusDate])
  
  let days = [...Array(daysCnt + startDay).keys()]

  const onClickByPrevHandler = (prevDate) => {
    setFocusDate(prevDate)
  }
  const onClickByNextHandler = (nextDate) => {
    setFocusDate(nextDate)
  }

  const onDragStart = (startDay) => {
    setDragRange([startDay, -1])
  }

  const onDragEnd = (endDay) => {
    let temp = [...dragRange]
    if (dragRange[0] <= endDay) {
      temp[1] = endDay
    }else {
      temp = [endDay].concat([temp[0]])
    }
    setDragRange(temp)
  }

  const onSelectDate = (e) => {
    console.log(focusDate)
    let splited = focusDate[0].split('-')

    splited[2] = parseInt(e.target.textContent) < 10 ? `0${e.target.textContent}`: e.target.textContent
    props.onSelectDate(splited.join('-'));
  }  


  return (
    <div style={{ backgroundColor: "#FFFBD5" }}>
      <Nav
        focusDate={focusDate}
        onClickByPrevHandler = {onClickByPrevHandler}
        onClickByNextHandler = {onClickByNextHandler}
      />
      
      <Row>
        {daysMap.map((day, idx) => (
          <Cell idx={idx}>{day}</Cell>
        ))}
      </Row>

      <Row>
        {days.map((item, idx) => (
          <>
            {startDay <= (idx + 1) 
              ? (
                <Cell 
                  idx={idx} 
                  hover={true}
                  startDay={startDay}
                  dragRange={dragRange}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onClick={onSelectDate}
                >{idx-startDay + 1}</Cell>
              ) 
              : (
                <Cell idx={idx}></Cell>
              )
            }
          </>
        ))}
      </Row>
    </div>
  );
};

export default Calendar;