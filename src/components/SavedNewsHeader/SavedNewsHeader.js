import DropOutPopup from "../Popups/DropOutPopup/DropOutPopup";
import Navigation from "../Navigation/Navigation";

function SavedNewsHeader(props) {
  const allKeys = props.savedArticles.map((article) => article["keyword"]);
  const uniqueKeys = [...new Set(allKeys)];
  const keywords =
    allKeys[0] +
    " " +
    `${uniqueKeys.length > 1 ? ", " + uniqueKeys[1] : ""}` +
    `${
      uniqueKeys.length > 2
        ? ` and ${uniqueKeys.length - 2} other`
        : ""
    }`;
  return (
    <header className="header header_theme_white">
      <Navigation {...props} white={true} />
      {props.popup.clicked ? <DropOutPopup {...props} menu={true} /> : null}

      <div className="header__main-group header__main-group_place_saved">
        <p
          className="header__subtitle header__subtitle_theme_white"
        >
          Saved articles
        </p>
        <h2 className="header__title header__title_theme_white">
          {props.currentUser.name}, you have{" "}
          {props.savedArticles ? props.savedArticles.length : 0} saved articles
        </h2>
        {props.savedArticles ? (
          <h3 className="paragraph paragraph_place_header">
            By keywords: <b>{keywords}</b>
          </h3>
        ) : null}
      </div>
    </header>
  );
}

export default SavedNewsHeader;
