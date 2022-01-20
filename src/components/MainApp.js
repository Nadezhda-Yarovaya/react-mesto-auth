import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Header from './Header';

const MainApp = (props) => {
    return (
        <>
        <Header loggedIn={props.loggedIn} userLogout={props.userLogout} text={props.text} headerAction={props.headerAction} loginText={props.loginText}/>     
      
            <Main onEditProfile={props.handleEditProfileClick} onEditAvatar={props.handleEditAvatarClick} onAddPlace={props.handleAddPlaceClick} onCardClickMain={props.handleCardClick}
              onCardLike={props.handleCardLike} onCardDelete={props.handleCardDeleteClick} allCards={props.cards} />

            <Footer />

            <ImagePopup card={props.selectedCard} isOpen={props.isPopupImageOpen} onClose={props.closeAllPopups} />

            <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} onUpdateUser={props.handleUpdateUser} onEditButText={props.updateSaveButEdit} saveButton={props.saveButtonEdit} />

            <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} onUpdateAvatar={props.handleUpdateAvatar} onEditButText={props.updateSaveButAvatar} saveButton={props.saveButtonAvatar} />

            <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups} onAddNewPlace={props.handleAddPlaceSubmit}
              onEditButText={props.updateSaveButNewPlace} saveButton={props.saveButtonNewPlace} />

            <DeleteCardPopup isOpen={props.isDeletePopupOpen} onClose={props.closeAllPopups} onDeletePopup={props.handleCardDelete} currentCard={props.currentCard} onEditButText={props.updateSaveButDelete} saveButton={props.saveButtonDelete} />


        </>
    );
    }

export default MainApp;