import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js';


function Login(props) {
    const history = useHistory();
    const [userdata, setUserData] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { username, password } = userdata;

        if (!username || !password) {
            return;
        }

        auth.authorize(username, password)
            .then((data) => {
                if (data.token) {
                    setUserData({ username: '', password: '' });
                    props.handleLogin();
                    history.push('/');

                }
            })
            .catch(err => console.log('user wasnt found: ' + err));
    }
    return (
        <>
            <main className="main page__main">
                <form className="register" onSubmit={handleSubmit}>
                    <h1 className="register__title">Вход</h1>
                    <input type="email" placeholder="Email" className="register__input" id="username" name="username" value={userdata.username || ''} onChange={handleChange}>
                    </input>
                    <input placeholder="Пароль" className="register__input" id="password" name="password" type="password" value={userdata.password || ''} onChange={handleChange}></input>
                    <input type="submit" value="Вход" className="register__submit" />
                </form>
            </main>
        </>
    );
}

export default withRouter(Login);
