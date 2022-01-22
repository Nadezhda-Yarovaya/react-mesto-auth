import React from "react";
import api from "../utils/api.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Header from "./Header";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, editProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, addPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopup] = useState(false);
  const [isPopupImageOpen, openPopupImage] = useState(false);
  const [isDeletePopupOpen, openPopupDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentCard, setCurrentCard] = useState();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function receiveUserInfo(user) {
    const resultProfileData = {
      id: user._id,
      name: user.name,
      job: user.about,
      avatar: user.avatar,
    };
    return resultProfileData;
  }

  /* проверяем токен при обновлении страницы и загружаем юзера и карточки */
  useEffect(() => {
    checkToken();
    loadUserAndCards();
  }, []);

  /* initial load function */
  function loadUserAndCards() {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        /* handling user information: */
        setCurrentUser(receiveUserInfo(userData));

        /* handling cards loading */
        setCards(cards);
      })
      .catch((err) => {
        console.log("ошибка: " + err);
      });
  }

  /*Dealing with popups */
  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPopupImage(true);
  };

  const closeAllPopups = () => {
    editProfilePopup(false);
    editAvatarPopup(false);
    addPlacePopup(false);
    openPopupImage(false);
    openPopupDelete(false);
  };

  const handleEditAvatarClick = () => {
    editAvatarPopup(true);
  };

  const handleAddPlaceClick = () => {
    addPlacePopup(true);
  };

  const handleEditProfileClick = () => {
    editProfilePopup(true);
  };

  const handleCardDeleteClick = (card) => {
    openPopupDelete(true);
    setCurrentCard(card);
  };

  /* handle submits */
  function handleUpdateUser(newUser, handleClear) {
    setIsLoading(true);
    api
      .saveProfileData(newUser.name, newUser.job)
      .then((result) => {
        setCurrentUser(receiveUserInfo(result));
        handleClear();
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newUser, handleClear) {
    setIsLoading(true);
    api
      .saveAvatarUrl(newUser.avatar)
      .then((result) => {
        setCurrentUser(receiveUserInfo(result));
        handleClear();
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        closeAllPopups();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((result) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? result : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardName, cardLink, handleClear) {
    setIsLoading(true);
    api
      .postNewCard({
        name: cardName,
        link: cardLink,
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClear();
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
          setEmail(res.data.email);
        }
      });
    }
  }

  /* register */
  function handleRegisterSubmit(username, password) {
    auth
      .register(username, password)
      .then((res) => {
        if (res) {
          setPopupRegisterIsOpen(true);
          setIsSuccess(true);

          setTimeout(() => {
            closeRegisterPopup();
            handleLoginSubmit(username, password);
          }, 1200);
        } else {
          setPopupRegisterIsOpen(true);
          setIsSuccess(false);
          setTimeout(() => {
            closeRegisterPopup();
          }, 1200);
        }
      })
      .catch((err) => console.log("Ошибка соединения: " + err));
  }

  /*Login */
  function handleLoginSubmit(username, password) {
    if (!username || !password) {
      return;
    }
    auth
      .authorize(username, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/");
          setEmail(username);
          return data;
        }
      })
      .catch((err) => console.log("user wasnt found: " + err));
  }

  /* signOut */
  function signOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/signin");
  }

  /* register popup */
  const [popupRegisterIsOpen, setPopupRegisterIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  function closeRegisterPopup() {
    setPopupRegisterIsOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="App">
          <div className="page">
            <Header loggedIn={loggedIn} signOut={signOut} email={email} />
            <Switch>
              <Route path="/signin">
                <Login onSubmit={handleLoginSubmit} />
              </Route>

              <Route path="/sign-up">
                <Register onSubmit={handleRegisterSubmit} />
              </Route>

              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                allCards={cards}
                onCardClickMain={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
              ></ProtectedRoute>
            </Switch>

            <Footer />
          </div>{" "}
        </div>

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeletePopup={handleCardDelete}
          currentCard={currentCard}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={popupRegisterIsOpen}
          isSuccess={isSuccess}
          onClose={closeRegisterPopup}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
