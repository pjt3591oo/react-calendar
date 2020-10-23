import React, {useState} from 'react';

import CalendarModal from './components/templetes/calendarModal';

function App() {
  let [d, setD] = useState("");
  
  return (
    <div className="App">
      <CalendarModal value={d} onChange={(d)=>setD(d)}/>
      <h1>{d}</h1>
    </div>
  );
}

export default App;
