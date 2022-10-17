import React, { useState } from "react";
import eventBus from "../../util/event";

import "./index.scss";
const Envelope = () => {
  const [active, setActive] = useState(false);

  const handleOpen = () => {
    setActive(true);
    eventBus.emit("message", "hello world");
  };
  return (
    <div className="layout">
      <div className={`envelope ${active ? "active" : ""} `}>
        <div className="top"></div>
        <div className="tag" onClick={handleOpen}>
          <img className="logo" src={require("../../images/队徽.png")} alt="" />
        </div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default Envelope;
