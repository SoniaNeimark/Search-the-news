const TopNavBar = (props) => {
  return (
    <nav
      className={`nav${props.white ? " nav_theme_white" : ""}${
        props.popup.PopupWithFormIsOpen || (props.popup.clicked && !props.menu) ? " nav_hidden" : ""
      }`}
      id="nav"
    >
    <div className={`nav__top${props.white ? " nav__top_theme_white" : ""} hover-opacity`}>
      <h2 className="nav__logo" onClick={() => props.handleNavigate("/")}>
        NewsExplorer
      </h2>
      {props.children}
    </div>
    </nav>
  );
};

export default TopNavBar;