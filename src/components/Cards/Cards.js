import React, { useState } from "react";
import { savedNewsPath } from "../../utils/constants/constants";
import Card from "../Card/Card";
import CardNew from "../Card/CardNew";

function Cards(props) {
  const cardProps = {
    location: props.location,
    handleAddArticle: props.handleAddArticle,
    loggedIn: props.loggedIn,
    setSavedArticles: props.setSavedArticles, 
    areSavedArticles: props.areSavedArticles,
    savedArticles: props.savedArticles,
    articlesToSave: props.articlesToSave,
    articlesToRemove: props.articlesToRemove,
    setArticlesToSave: props.setArticlesToSave,
    setArticlesToRemove: props.setArticlesToRemove,
    handleDeleteArticle: props.handleDeleteArticle,
    savedNewsPath: savedNewsPath
  };
  const len = props.foundArticles.length;
  const [arrIndexes, setArrIndexes] = useState([0]);

  let arr = [];

  const renderCards = (arrToRender, prefix) => {
    console.log();
    if (arrToRender && arrToRender !== null && !Array.isArray(arrToRender)) {
      return <CardNew article={arrToRender} handleAddArticle={cardProps.handleAddArticle} {...cardProps} />;
    } else if (Array.isArray(arrToRender)) {
      return arrToRender.map((item) => {
        const key = item._id
          ? item._id
          : `${prefix}${arrToRender.indexOf(item)}`;
        const id = item._id ? item._id : key;
        return <CardNew article={item} key={id} id={id} {...cardProps} />;
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
          ? props.foundArticles.slice(j, num)
          : props.foundAarticles.slice(j - len);
      i++;
    }
  };
  sliceArticlesArr();

  return (
    <section className="cards">
      <h2 className="cards__title">
        {cardProps.location.pathname !== savedNewsPath &&
          "Search results"}
      </h2>
      <ul className="cards__gallery">
        {cardProps.location.pathname === savedNewsPath
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
      cardProps.location.pathname === savedNewsPath ? null : (
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
