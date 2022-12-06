const TopNavBar = (props) => {
  const handleNavigate = (path) => {
    props.navigate(path);
    props.closePopup();
  };
  return (
    <nav
      className={`nav${props.white ? " nav_theme_white" : ""}${
        props.popup.PopupWithFormIsOpen || (props.popup.clicked && !props.menu) ? " nav_hidden" : ""
      }`}
      id="nav"
    >
    <div className={`nav__top${props.white ? " nav__top_theme_white" : ""}`}>
      <h1 className="nav__logo" onClick={() => handleNavigate("/")}>
        NewsExplorer
      </h1>
      {props.children}
    </div>
    </nav>
  );
};

export default TopNavBar;