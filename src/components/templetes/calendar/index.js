import React from 'react';

import {
  getToday
} from '../../../utils/date';

import Calendar from '../../calendar';

function CalendarTemplete(props) {
  
  return (
    <Calendar 
      onSelectDate={props.onSelectDate}
      onSelectDates={props.onSelectDates}
      selectDate={props.selectDate || getToday()}
      selectDates={props.selectDates || []}
      beforeDisablePoint={props.beforeDisablePoint || ""}
      afterDisablePoint={props.afterDisablePoint || ""}
      disableDates={props.disableDates || []}
    />
  );
}

export default CalendarTemplete;
