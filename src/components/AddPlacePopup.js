import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

const AddPlacePopup = (props) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [inputValidName, setInputValidName] = useState(false);
    const [inputValidLink, setInputValidLink] = useState(false);
    const [validMessageName, setValidMessageName] = useState('');
    const [validMessageLink, setValidMessageLink] = useState('');
    const [inputNameClass, setInputNameClass] = useState('popup__input popup__input_type_place');
    const [inputLinkClass, setInputLinkClass] = useState('popup__input popup__input_type_link');

    function checkValidityName(e) {
        setName(e.target.value);
        const isValid = e.target.validity.valid;
        setInputValidName(isValid);
        setValidMessageName(e.target.validationMessage);
        setClassName(isValid);
    }

    function checkValidityLink(e) {
        setLink(e.target.value);
        const isValid = e.target.validity.valid;
        setInputValidLink(isValid);
        setValidMessageLink(e.target.validationMessage);
        setClassLink(isValid);
    }

    function setClassName(isValid) {
        const validityClassNameOnName = (
            `popup__input popup__input_type_place ${!isValid && 'popup__input_state_invalid'}`
        );
        setInputNameClass(validityClassNameOnName);
    }

    function setClassLink(isValid) {
        const validityClassNameOnLink = (
            `popup__input popup__input_type_link ${!isValid && 'popup__input_state_invalid'}`
        );
        setInputLinkClass(validityClassNameOnLink);
    }

    const formValidity = (
        inputValidName && inputValidLink
    );

    function handleClear() {
        setName('');
        setLink('');
        setInputValidName(false);
        setInputValidLink(false);
        setValidMessageName('');
        setValidMessageLink('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.changeSaveText();
        props.onAddNewPlace(name, link, handleClear);
    }

    return (
        <PopupWithForm name="newplace" title="Новое место" isOpen={props.isOpen} onClose={props.onClose}
            saveButton={props.saveButton} onSubmit={handleSubmit}
            isLoading={props.isLoading}
            creationText={props.creationText}
            isValid={formValidity}>

            <label className="popup__label">
                <section className="popup__section">
                    <input
                        type="text"
                        className={inputNameClass}
                        placeholder="Название Места"
                        value={name || ''}
                        onChange={checkValidityName}
                        required
                        name="name"
                        id="newplace-input"
                        autoComplete="off"
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="popup__input-error newplace-input-error">{validMessageName}</span>
                </section>
                <section className="popup__section">
                    <input
                        type="url"
                        className={inputLinkClass}
                        placeholder="Ссылка на картинку"
                        value={link || ''}
                        onChange={checkValidityLink}
                        required
                        name="link"
                        id="url-input"
                        autoComplete="off"
                    />
                    <span className="popup__input-error url-input-error">{validMessageLink}</span>
                </section>
            </label>
        </PopupWithForm>

    );
}
export default AddPlacePopup;
