import React, { useState } from "react";
import "./index.css"; // Import your CSS file for styling

const Popover = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popover-container">
      <div className="popover-trigger" onClick={togglePopover}>
        {children}
      </div>
      {isOpen && <div className="popover-content">{content}</div>}
    </div>
  );
};

export default Popover;
