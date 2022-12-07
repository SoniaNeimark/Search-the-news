function NavMenuGroup(props) {
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
          onClick={() => props.handleNavigate("/saved")}
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
        onClick={!props.loggedIn ? props.signIn : props.logOut}
      >
        {props.loggedIn ? props.currentUser.name : "Sign in"}
      </button>
    </div>
  );
}

export default NavMenuGroup;
