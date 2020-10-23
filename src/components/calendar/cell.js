import React, { useState } from 'react';

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

const _Cell = styled.div`
  width : ${100 / 7}%;
  padding: 35px;
  box-sizing: border-box;
  color: ${(props) => getColos(props.idx)};
  font-weight: 900;
  background-color: ${props => props.hover ? isRange(props) : ""};
  &:hover{
    background-color: ${(props) => props.hover ? "#f6f4f1" : ""};
  }
`


const Cell = (props) => {

  const onDragStart = (e) => {
    props.onDragStart(parseInt(e.target.textContent))
  }

  const onDragEnd = (e) => {
    props.onDragEnd(parseInt(e.target.textContent))
  }

  if (props.hover) {
    return (
      <_Cell
        {...props}
        onMouseUp={onDragEnd}
        onMouseDown={onDragStart}
      >
        {props.children || " "}
      </_Cell>
    )
  }
  return (
    <_Cell
      {...props}
    >
      {props.children || " "}
    </_Cell>
  )
}

export default Cell;