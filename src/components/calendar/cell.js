import React from 'react';

import styled from 'styled-components';

// 0, 7, 14, 21, 28 일요일: 순서 - 0이 7배수 #B6001A 
// 6, 13, 20, 27    토요일: 순서 - 6이 6배수 #174491 

const COLOR_RED = "#B6001A"
const COLOR_BLUE = "#174491"
const COLOR_BLACK = "#000"

const COLOR_SELECT = "#E3EBF6"
const COLOR_DISABLE = "E7E7E7";

const getColos = (props) => {
  if (!props.idx || !((props.idx - 0) % 7)) {
    return COLOR_RED ;
  } else if (!((props.idx - 6) % 7)) {
    return COLOR_BLUE ;
  } else {
    return !props.disable ? COLOR_BLACK: "white";
  }
}

const isRange = (props) => {

  if (
    props.dragRange[0] > -1
    && props.dragRange[1] > -1
    && props.idx >= props.dragRange[0] + props.startDay - 1
    && props.idx <= props.dragRange[1] + props.startDay - 1
  ) {
    return COLOR_SELECT
  }

  return "";
}

const getRadiusByStart = (props) => {
  if (props.isStart) return "40px";
  else return "";
}

const getRadiusByEnd = (props) => {
  if (props.isEnd) return "40px";
  else return "";
}

export const EmptyCell = styled.div`
  width : ${100 / 7}%;
  height: 12vh;
`

const CellForm = styled.div`
  width : ${100 / 7}%;
  // padding: 30px;
  height: 12vh;
  box-sizing: border-box;
  color: ${(props) => getColos(props)};
  font-weight: 900;
  background-color: ${props => props.hover && !props.disable ? isRange(props) : !props.header? COLOR_DISABLE: ""};
  
  border-top-left-radius: ${getRadiusByStart};
  border-bottom-left-radius: ${getRadiusByStart};

  border-top-right-radius: ${props => getRadiusByEnd};
  border-bottom-right-radius: ${props => getRadiusByEnd};

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  &:hover{
    background-color: ${(props) => props.hover && !props.disable ? COLOR_SELECT : ""};
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
        // onClick={onClick}
      >
        {props.children || ""}
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