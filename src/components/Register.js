import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import { useState, useEffect, useHistory } from 'react';
import * as auth from '../utils/auth.js';

function Register(props) {
    const [userdata, setUserData] = useState({
        username: '',
        password: ''
    });
    const [userName, setUserName] = useState('user');
    const [password, setPassword] = useState('pass');

    const [notCurrentField, setNotCurrentField] = useState('setName');
    const [otherFields, setOtherFields] = useState([]);

    //<input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          
    /*
    confirmPassword: ''*/
    function handleFields(keysArray, name) {
        const newArr= keysArray.filter(item => {
            if (item !== name) return item;
        });
        return newArr;

        //console.log('otherfields: ' + keysArray + 'name: ' + name);

        console.log('otherfields newarr: ' + newArr);
    }


    function handleChange(e) {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        );
        console.log('login: ' + userdata.username + '  pass: ' + userdata.password);

    }

   function handleSubmit(e) {
            e.preventDefault();
            console.log(userdata);
            const {username, password} = userdata;
          // console.log('userNameS: ' + username + '  passwordS: ' + password);
        

       auth.register(username, password)
       .then((res) => {
        if(res){

            setUserData({message: ''}, () => { props.history.push('/signin');});
        } else {
            setUserData({ message: 'Что-то пошло не так!'   });
        }
      })
      .catch(err => console.log('error in connection: ' + err));



          console.log('loginSUBM: ' + username + '  passSUBM: ' + password);
      }
/* форму починила добавив // '' но иногда все равно андефайнд проскакивает*/
    return (
<>
<main className="main page__main">
    <form className="register" onSubmit={handleSubmit}>
        <h1 className="register__title">Регистрация</h1>
        <input type="email" placeholder="login" className="register-input" id="username" name="username" value={userdata.username || ''} onChange={handleChange}>
        </input>
        <input placeholder="password" className="register-input" id="password" name="password" type="password" value={userdata.password || ''} onChange={handleChange}></input>
        <input type="submit" value="Зарегистрироваться" className="register-submit" />
        <div className="register-to-login"><p className="register__par">Уже зарегистрированы? </p><Link to="/" className="register__link">Войти</Link></div>
        </form> 
    </main>
</>
    );
}

export default withRouter(Register);
