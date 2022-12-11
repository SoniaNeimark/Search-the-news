import React, { useEffect, useState } from "react";
import { checkArray } from "../../utils/callbacks/callbacks";
function CardNew(props) {
  const savedArray = props.savedArticles;

  const checkIfSaved = (item) => {
    return item.link === props.article.link;
  };
  const isSaved = () => {
    if (!Array.isArray(savedArray) || savedArray.length === 0) {
      return false;
    } else if (Array.isArray(savedArray) && savedArray.length === 1) {
      return checkIfSaved(savedArray[0]);
    } else {
      return savedArray.some(checkIfSaved);
    }
  };
  const savedState = isSaved();

  const [saved, setSaved] = useState(false);
  useEffect(() => {
    (() => {
      if (savedState && savedState !== null) {
        return setSaved(true);
      }
      return setSaved(false);
    })();
  }, [savedState, savedArray]);

  const checkLink = (item) => {
    return item.link === props.article.link;
  };

  const handleButtonclick = () => {
    if (props.location.pathname !== props.savedNewsPath) {
      if (!saved) {
        console.log(props.article);
        return props.handleAddArticle(props.article);
        /*if (
          props.savedArticles &&
          !checkArray(props.savedArticles, checkLink)
        ) {
          props.savedArticles.push(props.article);
          localStorage.setItem(
            "savedArticles",
            JSON.stringify(props.savedArticles)
          );
          setSaved(!saved);
        }*/
      } else {
        return props.handleDeleteArticle(props.article);
        //setSaved(!saved);
      }

      //console.log([props.savedArticles]);
    } else {
      return props.handleDeleteArticle(props.article);
      /*props.savedArticles.splice(props.savedArticles.indexOf(props.article), 1);
      localStorage.setItem(
        "savedArticles",
        JSON.stringify(props.savedArticles)
      );*/
    }
  };

  return (
    <li className="card" id={props.id}>
      <img
        className="card__image"
        src={props.article.image}
        alt={props.article.title}
      />
      {props.location.pathname === props.savedNewsPath ? (
        <button className="card__keyword" disabled type="button">
          {props.article.keyword}
        </button>
      ) : null}
      <button
        className={`card__label${
          props.location.pathname === props.savedNewsPath
            ? " card__label_trashbin"
            : ""
        }${saved ? " card__label_marked" : ""}`}
        disabled={!props.loggedIn}
        onClick={handleButtonclick}
      ></button>
      {(props.loggedIn && props.location.pathname === props.savedNewsPath) ||
      !props.loggedIn ? (
        <button className="card__alert" disabled type="button">
          {`${
            props.location.pathname === props.savedNewsPath
              ? "Remove from saved"
              : "Sign in to save articles"
          }`}
        </button>
      ) : null}

      <article className="card__article">
        <div className="card__text">
          <p className="card__date">{`${saved}`}</p>
          <h2 className="card__title">{props.article.title}</h2>
          <p className="card__paragraph">{props.article.text}</p>
        </div>
        <p className="card__source">{props.article.source}</p>
      </article>
    </li>
  );
}

export default CardNew;
