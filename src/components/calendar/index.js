import React, { useEffect, useState } from 'react';

import {
  getToday, getFirstDayByMonth,
  daysMap, getCountDaysByMonth
} from '../../utils/date';

import Cell from './cell';
import Nav from './nav';

// TODO: containerStyle로 묶은 DOM 컴포넌트 분리
const containerStyle = {
  width: "100%", 
  display: "flex", 
  flexWrap: "wrap", 
  textAlign: "center"
}

const Calendar = props => {
  let d = getToday()
  let [focusDate, setFocusDate] = useState(d);
  let [startDay, setStartDay] = useState(getFirstDayByMonth(d[0]));
  let [daysCnt, setDaysCnt] = useState(getCountDaysByMonth(d[0]));
  
  useEffect(() => {
    setStartDay(getFirstDayByMonth(focusDate[0]));
    setDaysCnt(getCountDaysByMonth(focusDate[0]));
  }, [focusDate])
  
  let days = [...Array(daysCnt + startDay).keys()]

  const onClickByPrevHandler = (prevDate) => {
    setFocusDate(prevDate)
  }
  const onClickByNextHandler = (nextDate) => {
    setFocusDate(nextDate)
  }

  return (
    <>
      <Nav
        focusDate={focusDate}
        onClickByPrevHandler = {onClickByPrevHandler}
        onClickByNextHandler = {onClickByNextHandler}
      />
      
      <div style={containerStyle}>
        {daysMap.map((day, idx) => (
          <Cell idx={idx}>{day}</Cell>
        ))}
      </div>

      <div style={containerStyle}>
        {days.map((item, idx) => (
          <>
            {startDay <= (idx + 1) 
              ? (
                <Cell idx={idx}>{idx-startDay + 1}</Cell>
              ) 
              : (
                <Cell idx={idx}></Cell>
              )
            }
          </>
        ))}
      </div>
    </>
  );
};

export default Calendar;