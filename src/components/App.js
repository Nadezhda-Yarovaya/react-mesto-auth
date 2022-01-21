import React from 'react';
import api from '../utils/api.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Header from './Header';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState('');
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

  function assignData(dataGot) {
    const resultProfileData = {
      id: dataGot._id,
      name: dataGot.name,
      job: dataGot.about,
      avatar: dataGot.avatar
    };
    return resultProfileData;
  }

  /* проверяем токен при обновлении страницы и загружаем юзера и карточки */
  useEffect(() => {
    checkToken();
    loadUserAndCards();
  }, [loggedIn]);

  /* initial load function */
  function loadUserAndCards() {
    Promise.all([api.getProfileInfo(), api.getInitialCards()
    ])
      .then(([userData, cards]) => {
        /* handling user information: */
        setCurrentUser(assignData(userData));

        /* handling cards loading */
        setCards(cards);
      })
      .catch((err) => {
        console.log('ошибка: ' + err);

      })
      .finally(res => { });
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
  }




  /* handle submits */
  function handleUpdateUser(newUser, handleClear) {
    api.saveProfileData(newUser.name, newUser.job)
      .then(result => {
        setCurrentUser(assignData(result));
        handleClear();
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newUser, handleClear) {
    api.saveAvatarUrl(newUser.avatar)
      .then(result => {

        setCurrentUser(assignData(result));
        handleClear();
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(res => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        closeAllPopups();
        setCards((state) => state.filter(
          (currentCard) => currentCard._id !== card._id));
      })
      .catch(err => console.log(err))
      .finally(res => {
        setIsLoading(false);
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
        setIsLoading(false);
      });
  }

  /* */
  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
          setHeaderEmail(res.data.email);
        }
      });

    }
  }

  function handleLogin() {
    setLoggedIn(true);
    checkToken();
  }

  /* register */
  const [userdata, setUserData] = useState({
    username: '',
    password: ''
  });

  const [popupRegisterIsOpen, setPopupRegisterIsOpen] = useState(false);
  const [successOrNot, setSuccessOrNot] = useState(true);

  function handleRegisterInputChange(e) {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    );
  }

  function closeRegisterPopup() {
    setPopupRegisterIsOpen(false);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const { username, password } = userdata;

    auth.register(username, password)
      .then((res) => {

        if (res) {
          setPopupRegisterIsOpen(true);
          setSuccessOrNot(true);

          setTimeout(() => {
            closeRegisterPopup();
            login(username, password);
          }, 1200
          );

        } else {
          setPopupRegisterIsOpen(true);
          setSuccessOrNot(false);
          setTimeout(() => {
            closeRegisterPopup();
          }, 1200
          );
        }
      })
      .catch(err => console.log('Ошибка соединения: ' + err));
  }

  /*Login */
  function handleLoginInputChange(e) {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    );
  }

  function login(username, password) {
    if (!username || !password) {
      return;
    }

    auth.authorize(username, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setUserData({ username: '', password: '' });
          handleLogin();
          history.push('/');
          return data;
        }
      })
      .catch(err => console.log('user wasnt found: ' + err));

  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const { username, password } = userdata;
    login(username, password);
  }

  /*Header, signOut */
  function signOut() {
    localStorage.removeItem('jwt');
    setHeaderEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  function changeSaveText() {
    setIsLoading(true);
  }


  /* header check what i transfer */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>

        <div className="App">
          <div className="page">

            <Header loggedIn={loggedIn}
              signOut={signOut}
              headerEmail={headerEmail}
            />
            <Switch>
              <Route path="/signin">
                <Login onChange={handleLoginInputChange}
                  onSubmit={handleLoginSubmit} userdata={userdata} />
              </Route>

              <Route path="/sign-up">
                <Register onSubmit={handleRegisterSubmit} userdata={userdata} onChange={handleRegisterInputChange}
                />
              </Route>

              <ProtectedRoute path="/" component={Main} loggedIn={loggedIn} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick} allCards={cards} onCardClickMain={handleCardClick}
                onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} >
              </ProtectedRoute>
            </Switch>

            <Footer />
          </div> </div>

        <ImagePopup card={selectedCard} isOpen={isPopupImageOpen} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
          isLoading={isLoading} changeSaveText={changeSaveText} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading} changeSaveText={changeSaveText} saveButton='Отправить'
        />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlaceSubmit}
          saveButton='Добавить'
          creationText='Создание...'
          isLoading={isLoading}
          changeSaveText={changeSaveText}
        />

        <DeleteCardPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}
          onDeletePopup={handleCardDelete} currentCard={currentCard}
          isLoading={isLoading} saveButton='Да' creationText='Удаление...' changeSaveText={changeSaveText} />

        <InfoTooltip isOpen={popupRegisterIsOpen} successOrNot={successOrNot} onClose={closeRegisterPopup} />

      </>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);

