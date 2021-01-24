import React, { useState, useEffect } from 'react';

import {
  getToday, getPrevDay, getNextDay
} from './utils/date';

import Calendar, { DatePicker } from './components/templetes/calendar';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [selectDate, setSelectDate] = useState(getToday());
  const [selectDates, setSelectDates] = useState([]);
  
  const [beforeDisablePoint] = useState(getPrevDay(selectDate[0], 10)[0]);
  const [afterDisablePoint] = useState(getNextDay(selectDate[0], 10)[0]);
  const [disableDates] = useState(["2021-01-13"]);

  useEffect(() => {
    console.log('click select: ', selectDate)
  }, [selectDate])
  
  useEffect(() => {
    console.log('drag select: ', selectDates)
  }, [selectDates])

  return (
    <div className="App">
      <h1>{selectDate[0]}</h1>
      <button onClick={() => setIsShow(!isShow)} >달력보기</button>
      <div style={{display: isShow? "block": "none"}}>
        <Calendar 
          onSelectDate={date => setSelectDate(date)}
          onSelectDates={dates => setSelectDates(dates)}
          selectDate={selectDate}
          selectDates={selectDates}
          beforeDisablePoint={beforeDisablePoint}
          afterDisablePoint={afterDisablePoint}
          disableDates={disableDates}
        />
      </div>

      <div> 
         <DatePicker 
            onChange={date => setSelectDate(date)}
            value={selectDate}
            min={beforeDisablePoint}
            max={afterDisablePoint}
            disableDates={disableDates}
            width={520}
         />
      </div>

      <input type="date" />
    </div>
  );
}

export default App;
