import editImg from "../images/edit-avatar.svg";
import React from "react";
import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const context = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile main__profile-section">
        <div className="profile__avatar-cont">
          <img className="profile__avatar" src={context.avatar} alt="Аватар" />
          <div className="profile__av-overlay" onClick={props.onEditAvatar}>
            <img
              className="profile__av-overlay-edit-pic"
              src={editImg}
              alt="изменить аватар"
            />
          </div>
        </div>

        <div className="profile__personal-data">
          <div className="profile__name-containter">
            <h1 className="profile__name">{context.name}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              aria-label="редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{context.job}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements main__elements-section">
        <ul className="elements__list">
          {props.allCards.map((card) => (
            <li className="elements__element" key={card._id}>
              <Card
                card={card}
                onCardClick={props.onCardClickMain}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Main;
