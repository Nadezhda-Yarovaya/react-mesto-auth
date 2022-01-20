import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useRef } from 'react';

const EditAvatarPopup = (props) => {
  const [inputValidAvatar, setInputValidAvatar] = useState(false);
  const [validMessageAvatar, setValidMessageAvatar] = useState('');
  const [inputAvatarClass, setInputAvatarClass] = useState('popup__input popup__input_type_avatar');
  const avatarRef = useRef('');

  function checkAvatarValidity() {
    const isValid = avatarRef.current.validity.valid;
    setInputValidAvatar(isValid);
    setValidMessageAvatar(avatarRef.current.validationMessage);
    setAvatarClass(isValid);
  }

  function setAvatarClass(isValid) {
    const validityClassNameOnAvatar = (
      `popup__input popup__input_type_avatar ${!isValid && 'popup__input_state_invalid'}`
    );
    setInputAvatarClass(validityClassNameOnAvatar);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditButText('Сохранение...');

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    }, handleClear);
  }

  function handleClear() {
    avatarRef.current.value = '';
    setValidMessageAvatar('');
    setInputValidAvatar(false);
  }

  return (
    <PopupWithForm name="upd-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit} validOrNotForm={inputValidAvatar}>
      <label className="popup__label">
        <section className="popup__section">
          <input
            ref={avatarRef}
            type="URL"
            onChange={checkAvatarValidity}
            className={inputAvatarClass}
            placeholder="URL"
            required
            name="avatarupdate"
            id="avatarupdateinput" autoComplete="off"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error avatarupdateinput-error">{validMessageAvatar}
          </span>
        </section>
      </label>
    </PopupWithForm>

  );
}

export default EditAvatarPopup;