import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

function Register(props) {
    const history = useHistory();
    const [userdata, setUserData] = useState({
        username: '',
        password: ''
    });

    const [popupRegisterIsOpen, setPopupRegisterIsOpen] = useState(false);
    const [successOrNot, setSuccessOrNot] = useState(true);

    function handleChange(e) {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        );
    }

    function closeRegisterPopup() {
        setPopupRegisterIsOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { username, password } = userdata;


        auth.register(username, password)
            .then((res) => {

                console.log('res in register: ' + res);
                if (res) {
                    setPopupRegisterIsOpen(true);
                    setSuccessOrNot(true);

                    setTimeout(() => {
                        closeRegisterPopup();
                        setUserData({ message: '' });
                        history.push('/signin');
                    }, 1200
                    );

                } else {
                    setPopupRegisterIsOpen(true);
                    setSuccessOrNot(false);

                    setTimeout(() => {
                        setUserData({ message: 'Что-то пошло не так!' });
                        closeRegisterPopup();
                    }, 1200
                    );
                }
            })
            .catch(err => console.log('Ошибка соединения: ' + err));
    }

    return (
        <>
            <main className="main page__main">
                <form className="register" onSubmit={handleSubmit}>
                    <h1 className="register__title">Регистрация</h1>
                    <input type="email" placeholder="Email" className="register__input" id="username" name="username" value={userdata.username || ''} onChange={handleChange}>
                    </input>
                    <input placeholder="Пароль" className="register__input" id="password" name="password" type="password" value={userdata.password || ''} onChange={handleChange}></input>
                    <input type="submit" value="Зарегистрироваться" className="register__submit" />
                    <div className="register__already-registered-text"><p className="register__par">Уже зарегистрированы? </p><Link to="/signin" className="register__link">Войти</Link></div>
                </form>
            </main>
            <InfoTooltip isOpen={popupRegisterIsOpen} successOrNot={successOrNot} onClose={closeRegisterPopup} />
        </>
    );
}

export default withRouter(Register);
