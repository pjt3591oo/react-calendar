import React, { useState, useEffect, useRef } from 'react';

import {getToday, getPrevDay } from '../../../utils/date';

import Calendar from '../../calendar';

const DEFAULT_WIDTH = 520

const DatePicker = (props) => {
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  
  const ref = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);

  useEffect(() => {
    return () => window.removeEventListener('click', onUnShowHandler)
  }, [])

  useEffect(() => {
    if (isDatePickerShow) window.addEventListener('click', onUnShowHandler);
    return () => window.removeEventListener('click', onUnShowHandler)
  }, [isDatePickerShow])

  const onUnShowHandler = (e) => {
    if (
      e.target === leftNavRef?.current
      || e.target === rightNavRef?.current
      || e.target === ref?.current
    ) {
      return
    }
    setIsDatePickerShow(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={props.value}
        className="form_control form_lg"
        onClick={() => setIsDatePickerShow(!isDatePickerShow)}
      />
      <div
        style={{
          borderRadius: "2px",
          boxShadow: "0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
          position: 'absolute',
          backgroundColor: 'white',
          width: `${props.width || DEFAULT_WIDTH}px`,
          top: 20,
          left: 0,
          display: isDatePickerShow? "block" :"none"
        }}
        ref={ref}
      >
        <Calendar
          onSelectDate={props.onChange || function () {}}
          onSelectDates={props.onSelectDates || function () {}}
          selectDate={props.value}
          selectDates={props.selectDates || [getToday()[0], getToday()[0]]}
          beforeDisablePoint={props.min ? props.min : ''}
          afterDisablePoint={props.max ? props.max : ''}
          disableDates={props.disableDates || []}
          leftNavRef={leftNavRef}
          rightNavRef={rightNavRef}
        />
      </div>
    </div>
  );
};

export default DatePicker;
