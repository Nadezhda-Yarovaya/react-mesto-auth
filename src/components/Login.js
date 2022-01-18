import React from 'react';
import {Link, withRouter, useHistory} from 'react-router-dom';

import { useState, useEffect } from 'react';
import * as auth from '../utils/auth.js';


function Login(props) {
    const history=useHistory();
    const [userdata, setUserData] = useState({
        username: '',
        password: ''
    });
    const [userName, setUserName] = useState('user');
    const [password, setPassword] = useState('pass');

    const [notCurrentField, setNotCurrentField] = useState('setName');
    const [otherFields, setOtherFields] = useState([]);

    //<input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          

    function handleChange(e) {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        );
        console.log('login: ' + userdata.username + '  pass: ' + userdata.password);

    }

    /*

    useEffect(() => {
            props.handleLogin();         
    }, [props.loggedIn]);*/
      
      function handleSubmit(e) {
            e.preventDefault();
            console.log('login userdata: ' + userdata);
            const {username, password} = userdata;

            if (!username || !password){
                return;
              }

              auth.authorize(username, password)
              .then((data) => {
                if (data.token){                    
                    console.log('performed');
                setUserData({username: '', password: ''});
                history.push('/');
                props.handleLogin();
                }  
              })
              .catch(err => console.log('user wasnt found: ' + err));
          // console.log('userNameS: ' + username + '  passwordS: ' + password);
  
          console.log('login em: ' + username + '  login pass subm: ' + password);
      }
/* форму починила добавив // '' но иногда все равно андефайнд проскакивает*/
    return (
<>
<main className="main page__main">
    <form className="register" onSubmit={handleSubmit}>
        <h1 className="register__title">Логин</h1>
        <input type="email" placeholder="login" className="register-input" id="username" name="username" value={userdata.username || ''} onChange={handleChange}>
        </input>
        <input placeholder="password" className="register-input" id="password" name="password" type="password" value={userdata.password || ''} onChange={handleChange}></input>
        <input type="submit" value="Вход" className="register-submit" />
        </form> 
    </main>
</>
    );
}

export default withRouter(Login);
