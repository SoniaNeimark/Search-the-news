import React, { useState } from "react";
import Card from "../Card/Card";

function Cards(props) {
  const [arrIndexes, setArrIndexes] = useState([0]);
  const location = props.location;
  const len = props.articles.length;
  const handleSaveArticle = props.handleSaveArticle;
  const loggedIn = props.loggedIn;
  let arr = [];

  const renderCards = (arrToRender, prefix) => {
    console.log()
    if (arrToRender && arrToRender !== null && !Array.isArray(arrToRender)) {
      return (
        <Card
          article={arrToRender}
          handleSaveArticle={handleSaveArticle}
          location={location}
          loggedIn={loggedIn}
        />
      );
    } else if (Array.isArray(arrToRender)) {
      return arrToRender.map((item) => {
        const key = item._id ? item._id : `${prefix}${arrToRender.indexOf(item)}`;
        const id = item._id ? item._id : key;
        return (
          <Card
            article={item}
            handleSaveArticle={handleSaveArticle}
            location={location}
            loggedIn={loggedIn}
            key={id}
            id={id}
          />
        );
      });
    } else {
      return null;
    }
  };

  const sliceArticlesArr = () => {
    for (
      let j = 0, i = 0, num = 3;
      j < len && i < len / 3;
      j = j + 3, num = num + 3
    ) {
      arr[i] =
        j < len - 1
          ? props.articles.slice(j, num)
          : props.articles.slice(j - len);
      i++;
    }
  };
  sliceArticlesArr();

  return (
    <section className="cards">
      <h2 className="cards__title">
        {location.pathname !== "/saved" && "Search results"}
      </h2>
      <ul className="cards__gallery">
        {location.pathname === "/saved"
          ? renderCards(props.savedArticles, "s")
          : arr.length > 0
          ? arrIndexes.map((arrIndex) => {
              return renderCards(arr[arrIndex], `f${arrIndex}`);
            })
          : null}
      </ul>
      {!arr.length ||
      arr.length < 1 ||
      arrIndexes.length === arr.length ||
      location.pathname === "/saved" ? null : (
        <button
          className="button cards__button"
          type="button"
          onClick={() => {
            setArrIndexes([...arrIndexes, arrIndexes.length]);
          }}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default Cards;
