import React, { useEffect, useState } from "react";
import { convertDate } from "../../utils/constants/constants";
import { checkIfSaved } from "../../utils/callbacks/callbacks";
function Card(props) {
  const savedArray = props.savedArticles;
  const loggedIn = props.loggedIn;
  const cardDate = convertDate(props.article.date);

  const isSaved = () => {
    if (!Array.isArray(savedArray) || savedArray.length === 0) {
      return false;
    } else {
      return savedArray.some((el => checkIfSaved(el, props.article)));
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
  }, [savedState, savedArray, loggedIn]);

  const handleButtonclick = () => {
    if (props.location.pathname !== props.REACT_APP_SAVED_NEWS_PATH) {
      if (!loggedIn) {
        props.signIn();
      } else {
        if (!saved) {
          props.handleAddArticle(props.article);
        } else {
          props.handleDeleteArticle(props.article);
        }
      }
    } else {
      props.handleDeleteArticle(props.article);
    }
  };

  return (
    <li className="card" id={props.id}>
      <a
            className="card__link"
            href={props.article.link}
            target="_blank"
            rel="noreferrer noopener"
          >
      <img
        className="card__image"
        src={props.article.image}
        alt={props.article.title}
      />
      {props.location.pathname === props.REACT_APP_SAVED_NEWS_PATH ? (
        <button className="card__keyword" disabled type="button">
          {props.article.keyword}
        </button>
      ) : null}
      
      {(loggedIn && props.location.pathname === props.REACT_APP_SAVED_NEWS_PATH) ||
      !loggedIn ? (
        <button className="card__alert" disabled type="button">
          {`${
            props.location.pathname === props.REACT_APP_SAVED_NEWS_PATH
              ? "Remove from saved"
              : "Sign in to save articles"
          }`}
        </button>
      ) : null}

      <article className="card__article">
        <div className="card__text">
          <p className="card__date">{cardDate}</p>
          <h2 className="card__title">{props.article.title}</h2>
          <p className="card__paragraph">{props.article.text}</p>
        </div>
        <p className="card__source">{props.article.source}</p>
      </article>
      </a>
      <button
        className={`card__label${
          props.location.pathname === props.REACT_APP_SAVED_NEWS_PATH
            ? " card__label_trashbin"
            : ""
        }${saved && loggedIn ? " card__label_marked" : ""}`}
        onClick={handleButtonclick}
      ></button>
    </li>
  );
}

export default Card;
