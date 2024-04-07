import React from "react";
import SettingIcon from "../../Assests/setting-lines.png";
import Popover from "../Popover";
import "./index.css";

export default function Header(props) {
  const { content } = props;
  return (
    <div className="app">
      <Popover content={content}>
        <div className="displayContainer">
          <div className="contentWrapper">
            <img src={SettingIcon} height={12} />
            <span className="typoDisplay">Display</span>
          </div>
        </div>
      </Popover>
    </div>
  );
}
