import React from "react";
const Popup = (props) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      props.closePopup();
      return;
    }
    return;
  };

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      className={`popup${props.opened ? " popup_opened" : ""}${
        props.nav ? " popup_opened_place_nav" : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Popup;
