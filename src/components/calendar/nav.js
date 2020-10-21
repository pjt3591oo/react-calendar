import React, { useState } from 'react';

import {
  daysMap, 
  getPrevMonthDate, getNextMonthDate
} from '../../utils/date';

const dateStyle = {
  boxSizing: "border-box",
  padding: 10,
}

const buttonStyle = {
  boxSizing: "border-box",
  padding: 10,
  backgroundColor: "#e8e8e8",
  border: 0, 
  marginLeft: 10,
  width: 36,
  height: 36,
  borderRadius: 5,
  cursor: "pointer"
}



// 현재날짜, 방향버튼
const Nav = (props) => {
  const onClickByPrevHandler = () => {
    props.onClickByPrevHandler(getPrevMonthDate(props.focusDate[0]))
  }
  const onClickByNextHandler = () => {
    props.onClickByNextHandler(getNextMonthDate(props.focusDate[0]))
  }

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
      <div style={dateStyle}>
        {props.focusDate[0]} ({daysMap[props.focusDate[1]]})
      </div>

      <div>
        <button 
          style={buttonStyle}
          onClick={onClickByPrevHandler}
        >
          {"<"}
        </button>

        <button 
          style={buttonStyle}
          onClick={onClickByNextHandler}
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Nav;