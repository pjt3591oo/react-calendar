import React, { useState } from 'react';

import Calendar from '../calendar';

function CalendarModal(props) {
  
  let [ isShow, setIsShow ] = useState(true);

  const wrapStyle = {
    borderRadius: 5, 
    padding: 5,
    boxSizing: "border-box",
    display: isShow? 'block': 'none', 
    position: "absolute",
    width: "100%" ,
    top: "50%", 
    transform: "translateY(-50%)"
  }

  return (
    <div>
      <div style={wrapStyle}>
        <Calendar 
          onSelectDate={props.onSelectDate}
          onSelectDates={props.onSelectDates}
          selectDate={props.selectDate}
          selectDates={props.selectDates}
          beforeDisablePoint={props.beforeDisablePoint}
          afterDisablePoint={props.afterDisablePoint}
        />
      </div>

      <div>
        <input type="date" value={props.selectDate}/>
        <button onClick={() => setIsShow(!isShow)}>달력보기</button>
      </div>
    </div>
  );
}

export default CalendarModal;
