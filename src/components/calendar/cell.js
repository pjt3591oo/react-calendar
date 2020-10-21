import React, { useState } from 'react';

import styled from 'styled-components';

// 0, 7, 14, 21, 28 일요일: 순서 - 0이 7배수 #B6001A 
// 6, 13, 20, 27    토요일: 순서 - 6이 6배수 #174491 

const COLOR_RED = "#B6001A"
const COLOR_BLUE = "#174491"
const COLOR_BLACK = "#000"

const _Cell = styled.div`
  &:hover {
    background-color: #efefef;
  }
`

const getColos = (idx) =>{
  if ( !idx || !((idx - 0) % 7) ) {
    return COLOR_RED 
  } else if ( !((idx - 6) % 7)) {
    return COLOR_BLUE
  } else {
    return COLOR_BLACK
  }
}

const Cell = (props) => {
  let [ selected, setSelected ] = useState(false)
  const cellStyle = {
    width : `${100/7}%`,
    padding: 35,
    boxSizing: "border-box",
    color: `${getColos(props.idx)}`,
    fontWeight: 900,
  }

  return (
    <_Cell 
      style={{...cellStyle, backgroundColor: selected? "#efefef": ""}}
      onClick={() => setSelected(!selected)}
      draggable={true}
      dragStart={(e) => {console.log(e.target)}}
      dragEnd={(e) => {console.log(e.target)}}
    >
      {props.children || " "}
    </_Cell>
  )
}

export default Cell;