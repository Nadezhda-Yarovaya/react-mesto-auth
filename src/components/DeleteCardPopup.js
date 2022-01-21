import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = (props) => {
    function handleSubmit(e) {
        e.preventDefault();
        props.changeSaveText();
        props.onDeletePopup(props.currentCard);
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose}
            saveButton={props.saveButton} onSubmit={handleSubmit} isValid={true}
            isLoading={props.isLoading}
            creationText={props.creationText}  >
            <label className="popup__label">
            </label>
        </PopupWithForm>
    );
}

export default DeleteCardPopup;