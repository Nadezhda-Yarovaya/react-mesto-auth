import React from 'react';

const PopupWithForm = (props) => {
  const submitButClassName = (
    `popup__submit ${!props.isValid ? 'popup__submit_invalid' : ''}`
  );

  const formClassName = (
    `popup__form ${props.name === 'delete' ? 'popup__form-delete' : ''}`
  );
  //props.saveButton
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen && ('popup_opened')}`}>
        <div className="popup__container">
          <form className={formClassName} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
            <p className="popup__paragraph">{props.title}</p>
            {props.children}
            <input type="submit" className={submitButClassName} value={props.isLoading ? (props.creationText ? props.creationText : 'Сохранение ...') : (props.saveButton ? props.saveButton : 'Сохранить')} disabled={!props.isValid} />
          </form>
          <button
            type="button"
            className="popup__close-btn"
            aria-label="закрыть окно"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );

}
export default PopupWithForm;