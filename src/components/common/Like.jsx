import React from "react";

const Like = props => {
  let strclass = "fa fa-heart";

  if (props.liked === false) {
    strclass += "-o";
  }
  return (
    <i
      className={strclass}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
