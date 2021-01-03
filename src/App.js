import React, { useState, useEffect } from 'react';

import {
  getToday
} from './utils/date';

import CalendarModal from './components/templetes/calendarModal';

function App() {
  const [selectDate, setSelectDate] = useState(getToday());
  const [selectDates, setSelectDates] = useState([]);
  
  const [beforeDisablePoint] = useState(selectDate[0]);
  const [afterDisablePoint] = useState("2021-01-21");
  const [disableDates] = useState(["2021-01-13"]);

  useEffect(() => {
    console.log('click select: ', selectDate)
  }, [selectDate])
  
  useEffect(() => {
    console.log('drag select: ', selectDates)
  }, [selectDates])


  return (
    <div className="App">
      <CalendarModal 
        onSelectDate={date=>setSelectDate(date)}
        onSelectDates={dates => setSelectDates(dates)}
        // selectDate={selectDate}
        // selectDates={selectDates}
        // beforeDisablePoint={beforeDisablePoint}
        // afterDisablePoint={afterDisablePoint}
        // disableDates={disableDates}
      />

      <h1>{selectDate[0]}</h1>
    </div>
  );
}

export default App;
