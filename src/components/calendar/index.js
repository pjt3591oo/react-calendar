import React, { useEffect, useState } from 'react';

import {
  getFirstDayByMonth,
  daysMap, getCountDaysByMonth,
  format_YYYYMMDD,
  leftBig
} from '../../utils/date';

import Nav from './nav';
import Row from './row';
import Cell from './cell';

const Calendar = props => {
  let [focusDate, setFocusDate] = useState(props.selectDate);
  let [startDay, setStartDay] = useState(getFirstDayByMonth(props.selectDate[0]));
  let [daysCnt, setDaysCnt] = useState(getCountDaysByMonth(props.selectDate[0]));
  
  let [ dragRange, setDragRange ] = useState([-1, -1]); // 드레그 [시작, 끝]
 
  useEffect(() => {
    setStartDay(getFirstDayByMonth(focusDate[0]));
    setDaysCnt(getCountDaysByMonth(focusDate[0]));
    setDragRange([-1, -1]);
    props.onSelectDate(focusDate)
  }, [focusDate])
  
  useEffect(() => {
    _isDragEnd()
      && !_isClick() 
      && props.onSelectDates(dragRange.map(day => _converDate(day)));
  }, [dragRange])

  let days = [...Array(daysCnt + startDay).keys()]

  const onClickByPrevHandler = prevDate => setFocusDate(prevDate)
  const onClickByNextHandler = nextDate => setFocusDate(nextDate)
  const onDragStartHandler = startDay => setDragRange([startDay, -1])
  const onDragEndHandler = endDay => {
    let temp = [...dragRange]
    if (dragRange[0] <= endDay) {
      temp[1] = endDay
    }else {
      temp = [endDay].concat([temp[0]])
    }
    setDragRange(temp)
  }

  const onSelectDate = day => {
    let temp = [...focusDate];
    temp[0] = _converDate(day);
    setFocusDate(temp);
  }

  const _converDate = _day => {

    let [year, month] = focusDate[0].split('-').slice(0, 2)
    return format_YYYYMMDD(year, month, _day);
  }

  const _isDisable = _day => {
    let is = leftBig(props.beforeDisablePoint, _converDate(_day))
    return is
  }

  const _isClick = () => dragRange[0] === dragRange[1]
  const _isDragEnd = () => dragRange[0] > -1  && dragRange[1] > -1

  return (
    <div style={{ backgroundColor: "#FFFBD5" }}>
      <Nav
        focusDate={focusDate}
        onClickByPrevHandler = {onClickByPrevHandler}
        onClickByNextHandler = {onClickByNextHandler}
      />
      
      <Row>
        {daysMap.map((day, idx) => (
          <Cell 
            key={idx} 
            idx={idx}
            header={true}
          >{day}</Cell>
        ))}
      </Row>

      <Row>
        {days.map((item, idx) => (
          <React.Fragment key={idx}>
            {startDay <= (idx + 1) 
              ? (
                <Cell 
                  idx={idx} 
                  hover={true}
                  startDay={startDay}
                  dragRange={dragRange}
                  disable={_isDisable( idx-startDay + 1)}
                  onDragStart={onDragStartHandler}
                  onDragEnd={onDragEndHandler}
                  onSelectDate={onSelectDate}
                >{idx-startDay + 1}</Cell>
              ) 
              : (
                <Cell idx={idx} disable={false}></Cell>
              )
            }
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(Calendar);