import React from "react";

const Like = (props) => {
  let iconClass = "fa fa-heart";
  iconClass += props.liked ? "" : "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onLikeToggle}
      className={iconClass}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
