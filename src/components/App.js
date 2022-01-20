import React from 'react';
import api from '../utils/api.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import MainApp from './MainApp';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth.js';

function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [loginText, setLoginText] = useState('Зарегистрироваться');
  const [text, setText] = useState('');
  const history = useHistory();
  function userLogout() {
    setText('');
    setLoginText('Зарегистрироваться');
    setLoggedIn(false);
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);




  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, editProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, addPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopup] = useState(false);
  const [isPopupImageOpen, openPopupImage] = useState(false);
  const [isDeletePopupOpen, openPopupDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState();
  const [saveButtonEdit, setSaveButtonEdit] = useState('Сохранить');
  const [saveButtonAvatar, setSaveButtonAvatar] = useState('Отправить');
  const [saveButtonDelete, setSaveButDelete] = useState('Да');
  const [saveButtonNewPlace, setSaveButtonNewPlace] = useState('Создать');




  useEffect(() => {
    handleRequest();

    renderCards();
  }, []);

  function handleRequest() {
    api.getProfileInfo()
      .then((data) => {
        const resultProfileData = {
          id: data._id,
          name: data.name,
          job: data.about,
          avatar: data.avatar
        };
        setCurrentUser(resultProfileData);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }

  function assignCard(card) {
    setCurrentCard(card);
  }

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
    assignCard(card);
  }

  function updateSaveButNewPlace(text) {
    setSaveButtonNewPlace(text);
  }

  function updateSaveButEdit(text) {
    setSaveButtonEdit(text);
  }

  function updateSaveButAvatar(text) {
    setSaveButtonAvatar(text);
  }

  function updateSaveButDelete(text) {
    setSaveButDelete(text);
  }

  function handleUpdateUser(newUser, handleClear) {
    api.saveProfileData(newUser.name, newUser.job)
      .then(result => {
        const resultProfileData = {
          id: result._id,
          name: result.name,
          job: result.about,
          avatar: result.avatar
        };
        setCurrentUser(resultProfileData);
        handleClear();
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        updateSaveButEdit('Сохранить');
      });
  }

  function handleUpdateAvatar(newUser, handleClear) {
    api.saveAvatarUrl(newUser.avatar)
      .then(result => {
        const resultProfileData = {
          id: result._id,
          name: result.name,
          job: result.about,
          avatar: result.avatar
        };
        setCurrentUser(resultProfileData);
        handleClear();
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        updateSaveButAvatar('Отправить');
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        setCards((state) => state.filter(
          (c) => c._id !== card._id && c));
        setSaveButDelete('Да');
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    api.changeLikeCardStatus(card._id, isLiked).then((result) => {
      setCards((state) => state.map(
        (c) => c._id === card._id ? result : c)
      );
    })
      .catch(err => console.log(err));
  }

  function renderCards() {
    api.getInitialCards()
      .then((data) => {
        const resultCards = data.map(card => {
          return {
            _id: card._id,
            likes: card.likes,
            name: card.name,
            link: card.link,
            owner: card.owner
          };
        });
        setCards(resultCards);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }

  function handleAddPlaceSubmit(cardName, cardLink, handleClear) {
    api.postNewCard({
      name: cardName,
      link: cardLink
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClear();
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        updateSaveButNewPlace('Создать');
      });
  }

  /* */
  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {

            const userData = {
              email: res.data.email
            }
            setLoggedIn(true);
            history.push("/");
            setText(userData.email);
            setLoginText('Выйти');

          }
        });
      }
    }
  }

  /* here */
  function handleLogin() {
    setLoggedIn(true);
    tokenCheck();
  }
  //     {(loggedIn === false) && <Redirect to="/sign-up" />}
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="App">
          <div className="page">

            <Switch>
              <Route path="/sign-up"><Header loggedIn={loggedIn} text={text} userLogout={userLogout} loginText="Вход" headerAction="/signin" /><Register /></Route>
              <Route path="/signin"><Header loggedIn={loggedIn} text={text} userLogout={userLogout} loginText="Регистрация" headerAction="/signup" />
                <Login handleLogin={handleLogin} loggedIn={loggedIn} /></Route>

              <ProtectedRoute path="/" component={MainApp} loggedIn={loggedIn} text={text} userLogout={userLogout} loginText={loginText}
                handleLogin={handleLogin}
                handleEditAvatarClick={handleEditAvatarClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleCardDeleteClick={handleCardDeleteClick}
                cards={cards}
                selectedCard={selectedCard}
                isPopupImageOpen={isPopupImageOpen}
                closeAllPopups={closeAllPopups}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                handleUpdateUser={handleUpdateUser}
                updateSaveButEdit={updateSaveButEdit}
                saveButtonEdit={saveButtonEdit}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                handleUpdateAvatar={handleUpdateAvatar}
                updateSaveButAvatar={updateSaveButAvatar}
                saveButtonAvatar={saveButtonAvatar}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                handleAddPlaceSubmit={handleAddPlaceSubmit}
                updateSaveButNewPlace={updateSaveButNewPlace}
                saveButtonNewPlace={saveButtonNewPlace}
                isDeletePopupOpen={isDeletePopupOpen}
                handleCardDelete={handleCardDelete}
                currentCard={currentCard}
                updateSaveButDelete={updateSaveButDelete}
                saveButtonDelete={saveButtonDelete}
                handleEditProfileClick={handleEditProfileClick}
              >
              </ProtectedRoute>


            </Switch>
          </div> </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

