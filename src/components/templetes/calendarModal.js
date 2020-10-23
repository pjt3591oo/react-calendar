import { parseWithOptions } from 'date-fns/fp';
import React, { useState, useEffect } from 'react';

import Calendar from '../calendar';

function CalendarModal(props) {
  let [ selectDate, setSelectDate ] = useState('');
  let [ isShow, setIsShow ] = useState(false);

  useEffect(() => {
    props.onChange(selectDate);
  }, [selectDate])

  const s = {
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
    <div className="App">
      <div style={s}>
        <Calendar onSelectDate={(selectDate) => setSelectDate(selectDate)}/>
      </div>

      <div>
        <input type="date" value={selectDate}/>
        <button onClick={() => setIsShow(!isShow)}>달력보기</button>
      </div>
    </div>
  );
}

export default CalendarModal;
