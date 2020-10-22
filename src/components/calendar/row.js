import React from 'react';

import styled from 'styled-components';

const Row = (props) => {
  let _style = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  }
  return (
    <div
      style={_style}
      {...props}
    >
      {props.children}
    </div>
  )

};

export default Row;