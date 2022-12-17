import { useRef, useEffect } from "react";
import DropOutPopup from "../Popups/DropOutPopup/DropOutPopup";
import Navigation from "../Navigation/Navigation";
function Header(props) {
  const ref = useRef("");
  useEffect(() => {
    ref.current.value = props.values["search"]
      ? props.values["search"]
      : "";
  }, [props.values]);
  return (
    <header className="header">
      <Navigation {...props} white={false} />
      {props.popup.clicked ? <DropOutPopup {...props} menu={true} /> : null}

      <div className="header__main-group">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form
          name="search"
          className="header__form"
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmitSearch();
          }}
          onChange={(e) => props.handleChange(e)}
        >
          <input
            ref={ref}
            name="search"
            className="header__input"
            type="text"
            placeholder="Enter topic"
            required
          ></input>
          <button
            className="submit-button submit-button_place_header submit-button_active"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
