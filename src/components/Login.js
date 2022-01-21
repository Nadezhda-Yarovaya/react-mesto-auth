import React from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
    return (
        <>
            <main className="main page__main">
                <form className="register" onSubmit={props.onSubmit}>
                    <h1 className="register__title">Вход</h1>
                    <input type="email" placeholder="Email" className="register__input" id="username" name="username"
                        value={props.userdata.username || ''} onChange={props.onChange}>
                    </input>
                    <input placeholder="Пароль" className="register__input" id="password" name="password" type="password"
                        value={props.userdata.password || ''} onChange={props.onChange}></input>
                    <input type="submit" value="Вход" className="register__submit" />
                </form>
            </main>
        </>
    );
}

export default withRouter(Login);
