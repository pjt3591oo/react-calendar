import React, { useEffect, useState } from 'react';

import {
  getFirstDayByMonth,
  getPrevMonthDate,
  daysMap, getCountDaysByMonth,
  format_YYYYMMDD,
  leftBig,rightBig,
  getRangeDates
} from '../utils/date';

import Nav from './nav';
import Row from './row';
import Cell, {EmptyCell} from './cell';

/*
*/
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
    props.onSelectDates([focusDate[0], focusDate[0]])
  }, [focusDate])
  
  useEffect(() => {
    _isDragEnd()
      // && !_isClick() 
      && props.onSelectDates(dragRange.map(day => _converDate(day)));
  }, [dragRange])

  let days = [...Array(daysCnt + startDay).keys()]

  const onClickByPrevHandler = prevDate => setFocusDate(prevDate)
  const onClickByNextHandler = nextDate => setFocusDate(nextDate)
  const onDragStartHandler = startDay => {
    setDragRange([startDay, -1])
  }
  const onDragEndHandler = endDay => {
    let temp = [...dragRange]
    if (dragRange[0] < endDay) {
      temp[1] = endDay
    }else {
      temp = [endDay].concat([temp[0]])
    }
    
    let convertedDates = temp.map(day => _converDate(day))
    let isDisableIncludes = getRangeDates(convertedDates[0], convertedDates[1]).filter(day => props.disableDates.includes(day))
    
    if (!isDisableIncludes.length) {
      setDragRange(temp)
    } else {
      alert("해당 날짜는 선택할 수 없습니다.")
      setDragRange([-1, -1])
    }

  }

  const onSelectDate = day => {
    if(!day) return
    let temp = [...focusDate];
    temp[0] = _converDate(day);
    setFocusDate(temp);
  }

  const _converDate = _day => {
    let [year, month] = focusDate[0].split('-').slice(0, 2)
    return format_YYYYMMDD(year, month, _day);
  }

  const _isDisable = _day => {
    let d = _converDate(_day)

    let isBefore = props.beforeDisablePoint ? leftBig(props.beforeDisablePoint, d ) : false;
    if (isBefore) return true
    
    let isAfter = props.afterDisablePoint ? leftBig(d, props.afterDisablePoint) : false;
    if(isAfter) return true

    let isDisableDates = props.disableDates.includes(d)
    return isDisableDates
  }

  const _isSelect = _day => {
    let d = _converDate(_day)
    return leftBig(d, props.selectDates[0]) && leftBig(props.selectDates[1], d)
  }

  const isStart = idx => {
    let target = _converDate(idx)
    let start = props.selectDates.length && props.selectDates[0]
    
    return start === target;
  }
  
  const isEnd = idx => {
    let target = _converDate(idx)
    let end = props.selectDates.length > 1 && props.selectDates[1]

    return target === end;
  }

  const _isDragEnd = () => dragRange[0] > -1  && dragRange[1] > -1
  const _isClick = () => props.selectDates[0] === props.selectDates[1]
  const getDay = idx => idx - startDay + 1

  return (
    <div style={{ 
      backgroundColor: '#FAFAFA',
      padding: 10,
      boxSizing: 'border-box',
    }}>
      <Nav
        focusDate={focusDate}
        onClickByPrevHandler = {onClickByPrevHandler}
        onClickByNextHandler = {onClickByNextHandler}
        leftNavRef={props.leftNavRef}
        rightNavRef={props.rightNavRef}
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
            {startDay <= (idx) 
              ? (
                <Cell 
                  idx={idx} 
                  hover={true}
                  startDay={startDay}
                  disable={_isDisable(getDay(idx))}
                  isSelect={_isSelect(getDay(idx))}
                  onDragStart={onDragStartHandler}
                  onDragEnd={onDragEndHandler}
                  onSelectDate={onSelectDate}
                  isStart={isStart(getDay(idx))}
                  isEnd={isEnd(getDay(idx))}
                >{getDay(idx)}</Cell>
              ) 
              : (
                <EmptyCell />
              )
            }
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(Calendar);