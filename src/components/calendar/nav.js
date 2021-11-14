import React from 'react';

import {
  daysMap,
  getPrevMonthDate, getNextMonthDate
} from '../utils/date';

const dateStyle = {
  boxSizing: "border-box",
  padding: 10,
}

const buttonStyle = {
  boxSizing: "border-box",
  padding: 10,
  backgroundColor: "#EFEFEF",
  border: 0,
  width: 36,
  height: 36,
  borderRadius: 5,
  cursor: "pointer"
}

const wrapStyle = {
  width: "100%", 
  display: "flex", 
  justifyContent: "space-between", 

  paddingBottom: 10, 
  marginTop: 10 
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
    <div style={wrapStyle}>
      <div>
        <button
          style={buttonStyle}
          onClick={onClickByPrevHandler}
          ref={props.leftNavRef}
        >
          {"<"}
        </button>
      </div>

      <div style={dateStyle}>
        {props.focusDate[0]} ({daysMap[props.focusDate[1]]})
      </div>

      <div>
        <button
          style={buttonStyle}
          onClick={onClickByNextHandler}
          ref={props.rightNavRef}
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Nav;