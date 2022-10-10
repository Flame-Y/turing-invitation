import React, { useState } from "react";

import "./index.scss";

const Envelope = () => {
  const [active, setActive] = useState(false);

  const handleOpen = () => {
    setActive(true);
  };
  return (
    <div className="layout">
      <div className={`envelope ${active ? "active" : ""} `}>
        <div className="top"></div>
        <div className="tag" onClick={handleOpen}>
          <img className="logo" src={require("../../images/队徽.png")} alt="" />
          {/* <img
            className="mini"
            style={{ display: active ? "" : "none" }}
            src={require("../../images/TR_logo.png")}
            alt=""
          /> */}
        </div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default Envelope;
