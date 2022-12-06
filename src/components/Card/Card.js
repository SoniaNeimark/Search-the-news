import React, { useState } from "react";
function Card(props) {
  const [saved, setSaved] = useState(false);
  return (
    <li className="card" id={props.id}>
      <img
        className="card__image"
        src={props.article.link}
        alt={props.article.title}
      />
      {props.location.pathname === "/saved" ? (
        <button className="card__keyword" disabled type="button">
          {props.article.keyword}
        </button>
      ) : null}
      <button
        className={`card__label${
          props.location.pathname === "/saved" ? " card__label_trashbin" : ""
        }${saved ? " card__label_marked" : ""}`}
        disabled={!props.loggedIn}
        onClick={
          props.location.pathname === "/saved"
            ? props.deleteCard
            : () => (!saved ? setSaved(true) : setSaved(false))
        }
      ></button>
      {(props.loggedIn && props.location.pathname === "/saved") ||
      !props.loggedIn ? (
        <button className="card__alert" disabled type="button">
          {`${
            props.location.pathname === "/saved"
              ? "Remove from saved"
              : "Sign in to save articles"
          }`}
        </button>
      ) : null}

      <article className="card__article">
        <div className="card__text">
          <p className="card__date">{props.article.date}</p>
<<<<<<< Updated upstream
          <h2 className="card__title">{props.article.title}</h2>
=======
          <h2 className="card__title">
            {props.id + " " + props.article.title}
          </h2>
>>>>>>> Stashed changes
          <p className="card__paragraph">{props.article.text}</p>
        </div>
        <p className="card__source">{props.article.source}</p>
      </article>
    </li>
  );
}

export default Card;
