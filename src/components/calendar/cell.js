import React from 'react';

import styled from 'styled-components';

// 0, 7, 14, 21, 28 일요일: 순서 - 0이 7배수 #B6001A 
// 6, 13, 20, 27    토요일: 순서 - 6이 6배수 #174491 

const COLOR_RED = "#B6001A"
const COLOR_BLUE = "#174491"
const COLOR_BLACK = "#000"

const getColos = (idx) => {
  if (!idx || !((idx - 0) % 7)) {
    return COLOR_RED
  } else if (!((idx - 6) % 7)) {
    return COLOR_BLUE
  } else {
    return COLOR_BLACK
  }
}

const isRange = (props) => {

  if (
    props.dragRange[0] > -1
    && props.dragRange[1] > -1
    && props.idx >= props.dragRange[0] + props.startDay - 1
    && props.idx <= props.dragRange[1] + props.startDay - 1
  ) {
    return "#e8e8e8"
  }

  return "";
}

const CellForm = styled.div`
  width : ${100 / 7}%;
  padding: 35px;
  box-sizing: border-box;
  color: ${(props) => getColos(props.idx)};
  font-weight: 900;
  background-color: ${props => props.hover && !props.disable ? isRange(props) : !props.header? "#242424": ""};
  &:hover{
    background-color: ${(props) => props.hover && !props.disable ? "#f6f4f1" : "black"};
  }
`

const Cell = (props) => {
  const onDragStart = e => {
    if (props.disable) {msg(); return}
    props.onDragStart(parseInt(e.target.textContent))
  }
  const onDragEnd = e => {
    if (props.disable) {msg(); return}
    props.onDragEnd(parseInt(e.target.textContent)) 
  }

  const onClick= e => {
    if (props.disable) {msg(); return}
    props.onSelectDate(e.target.textContent)
  }

  const msg = () =>alert("해당 날짜는 선택할 수 없습니다.");
  

  if (props.hover) {
    return (
      <CellForm
        {...props}
        onMouseUp={onDragEnd}
        onMouseDown={onDragStart}
        onClick={onClick}
      >
        {props.children || " "}
      </CellForm>
    )
  }
  return (
    <CellForm
      {...props}
    >
      {props.children || " "}
    </CellForm>
  )
}

export default Cell;