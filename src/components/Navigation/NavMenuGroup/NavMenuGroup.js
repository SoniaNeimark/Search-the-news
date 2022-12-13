import React, { useContext } from "react";
import { CurrentUserContext } from "../../../utils/cotexts/CurrentUserContext";
function NavMenuGroup(props) {
  const user = useContext(CurrentUserContext)
  const handleNavigateToSaved = () => {
    props.handleNavigate(props.REACT_APP_SAVED_NEWS_PATH);
  };
  return (
    <div
      className={`menu${props.white ? " menu_theme_white" : ""}${
        props.wide ? " menu_screen_wide" : " menu_screen_narrow"
      }`}
    >
      <p
        className={`menu__item${props.white ? "" : " menu__item_active"}`}
        onClick={() => props.handleNavigate("/")}
      >
        Home
      </p>
      {props.loggedIn ? (
        <p
          className={`menu__item${props.white ? " menu__item_active" : ""}`}
          onClick={handleNavigateToSaved}
        >
          Saved articles
        </p>
      ) : null}
      <button
        className={`button menu__button${
          props.loggedIn
            ? ` menu__button_image${
                props.white ? " menu__button_image_white" : ""
              }`
            : " menu__button_image_none"
        }`}
        onClick={!props.loggedIn ? props.signIn : props.handleLogOut}
      >
        {props.loggedIn ? user.name : "Sign in"}
      </button>
    </div>
  );
}

export default NavMenuGroup;
