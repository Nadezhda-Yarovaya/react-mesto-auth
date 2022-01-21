import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    return (
        <>
            <main className="main page__main">
                <form className="register" onSubmit={props.onSubmit}>
                    <h1 className="register__title">Регистрация</h1>
                    <input type="email" placeholder="Email" className="register__input" id="username" name="username" value={props.userdata.username || ''} onChange={props.onChange}>
                    </input>
                    <input placeholder="Пароль" className="register__input" id="password" name="password" type="password" value={props.userdata.password || ''} onChange={props.onChange}></input>
                    <input type="submit" value="Зарегистрироваться" className="register__submit" />
                    <div className="register__already-registered-text"><p className="register__par">Уже зарегистрированы? </p><Link to="/signin" className="register__link">Войти</Link></div>
                </form>
            </main>

        </>
    );
}

export default withRouter(Register);
