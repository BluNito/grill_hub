import React from "react";

const Spacer = ({ v, h }) => {
  const style = {
    height: `${v}px`,
    width: `${h}px`,
  };
  return <div style={style} />;
};

export default Spacer;
