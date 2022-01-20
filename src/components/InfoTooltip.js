import React from 'react';
import successLogo from '../images/union.png';
import failureLogo from '../images/failure.png';

const InfoTooltip = (props) => {
  return (
    <>
      <div className={`popup ${props.isOpen && ('popup_opened')}`}>
        <div className="popup__container">
          <div className="register-popup">
            <img src={props.successOrNot ? successLogo : failureLogo} className="register-popup__logo" alt={props.successOrNot ? 'Успешная регистрация' : 'Неудачная регистрация'} />
            <p className="register-popup__text">{props.successOrNot ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так, попробуйте еще раз'}</p>
          </div>
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

export default InfoTooltip;