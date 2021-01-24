import React from 'react';

import {
  getToday
} from '../../../utils/date';

import DatePicker from './datepicker';
import Calendar from '../../calendar';

function CalendarTemplete(props) {
  
  return (
    <Calendar 
      onSelectDate={props.onSelectDate || function () {}}
      onSelectDates={props.onSelectDates || function () {}}
      selectDate={props.selectDate || getToday()}
      selectDates={props.selectDates || [getToday()[0], getToday()[0]]}
      beforeDisablePoint={props.beforeDisablePoint || ""}
      afterDisablePoint={props.afterDisablePoint || ""}
      disableDates={props.disableDates || []}
    />
  );
}

export {
  DatePicker
}

export default CalendarTemplete;
