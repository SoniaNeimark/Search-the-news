const Hamburger = (props) => {
  return (
    <div
      className={`nav__humburger${
        props.white ? " nav__humburger_theme_white" : ""
      }${props.popup.clicked ? " nav__humburger_clicked" : ""}`}
      onClick={() =>
        props.popup.clicked ? props.closePopup() : props.setPopup({ clicked: true })
      }
    ></div>
  );
};

export default Hamburger;
