import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [inputValidName, setInputValidName] = useState(true);
  const [inputValidJob, setInputValidDesc] = useState(true);
  const [validMessageName, setValidMessageName] = useState('');
  const [validMessageJob, setValidMessageJob] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function changeName(e) {
    setName(e.target.value);
    setInputValidName(e.target.validity.valid);
    setValidMessageName(e.target.validationMessage);
  }

  function changeDesc(e) {
    setDescription(e.target.value);
    setInputValidDesc(e.target.validity.valid);
    setValidMessageJob(e.target.validationMessage);
  }

  useEffect(() => {
    handleClear();
    setName(currentUser.name);
    setDescription(currentUser.job);

  }, [currentUser, props.isOpen]);
 
  function handleClear() {
    setName('');
    setDescription('');
    setInputValidName(true);
    setValidMessageName('');
    setInputValidDesc(true);
    setValidMessageJob('');
}

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditButText('Сохранение...');
    props.onUpdateUser({
      name,
      job: description,
    }, handleClear);
  }

  const validityClassNameOnName = (
    `popup__input popup__input_type_name ${!inputValidName && 'popup__input_state_invalid'}`
  );

  const validityClassNameOnJob = (
    `popup__input popup__input_type_job ${!inputValidJob && 'popup__input_state_invalid'}`
  );

  const formValidity = (
    inputValidName && inputValidJob
  );

  return (
    <PopupWithForm name={"edit-profile"} title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} saveButton={props.saveButton} onSubmit={handleSubmit} validOrNotForm={formValidity}>
      <label className="popup__label">
        <section className="popup__section">
          <input
            type="text"
            className={validityClassNameOnName}
            placeholder="ФИО"
            value={props.isOpen ? (name) : ''}
            onChange={changeName}
            name="profileName"
            required
            minLength="5"
            maxLength="40"
            id="name-input"
            autoComplete="off"
          />
          <span className="popup__input-error name-input-error">{validMessageName}</span>
        </section>

        <section className="popup__section">
          <input
            type="text"
            className={validityClassNameOnJob}
            placeholder="должность"
            name="job"
            value={description || ''}
            onChange={changeDesc}
            required
            minLength="2"
            maxLength="200"
            id="job-input"
            autoComplete="off"
          />
          <span className="popup__input-error job-input-error">{validMessageJob}</span>
        </section>
      </label>

    </PopupWithForm>
  );
}
export default EditProfilePopup;