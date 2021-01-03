import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
  getFirstDayByMonth,
  daysMap, getCountDaysByMonth,
  format_YYYYMMDD,
  leftBig,rightBig
} from '../../utils/date';

import Nav from './nav';
import Row from './row';
import Cell, {EmptyCell} from './cell';

/*
  props
    selectDate: [date(str), date(str) | 0] => [1] 0일 땐 클릭

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
  }, [focusDate])
  
  useEffect(() => {
    console.log('useEffect', _isDragEnd(), !_isClick(), dragRange )
    _isDragEnd()
      // && !_isClick() 
      && props.onSelectDates(dragRange.map(day => _converDate(day)));
  }, [dragRange])

  let days = [...Array(daysCnt + startDay).keys()]

  const onClickByPrevHandler = prevDate => setFocusDate(prevDate)
  const onClickByNextHandler = nextDate => setFocusDate(nextDate)
  const onDragStartHandler = startDay => {
    console.log('onDragStartHandler')
    setDragRange([startDay, -1])
  }
  const onDragEndHandler = endDay => {
    let temp = [...dragRange]
    if (dragRange[0] < endDay) {
      temp[1] = endDay
    }else {
      temp = [endDay].concat([temp[0]])
    }
    setDragRange(temp)
    // console.log(temp)
    // props.onSelectDates(temp)
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
    if (!props.beforeDisablePoint) return false;
    let is = leftBig(props.beforeDisablePoint, _converDate(_day))
    return is
  }

  const isStart = idx => {
    let target = `${focusDate[0].split('-').slice(0, 2).join('-')}-${idx.toString().padStart(2, '0')}`
    let start = props.selectDates.length && props.selectDates[0]
    
    return start === target;
  }
  
  const isEnd = idx => {
    let target = `${focusDate[0].split('-').slice(0, 2).join('-')}-${idx.toString().padStart(2, '0')}`
    let end = props.selectDates.length > 1 && props.selectDates[1]

    return target === end;
  }

  const _isClick = () => dragRange[0] === dragRange[1]
  const _isDragEnd = () => dragRange[0] > -1  && dragRange[1] > -1

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
                  dragRange={dragRange}
                  disable={_isDisable( getDay(idx))}
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