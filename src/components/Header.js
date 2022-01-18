import mainLogo from '../images/mainlogo.svg';
import {Link, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';

const Header = (props) => {

  const history= useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    props.userLogout();
    history.push('/signin');
  }

 

    return (
        <header className="header page__header temp__header">
        <Link to="/" className="header__logo-link">
          <img src={mainLogo}
            alt="Логотип Место Россия"
            className="header__logo"
          />
        </Link>
        <Link to="/sign-up">Register, sign up</Link>
        <Link to="/some-other">Some Other</Link>
        <Link to="/signin">Log In</Link>

        <p className="header__email">{props.text}</p>

      
        <button onClick={signOut} className="exit-button">Выйти</button>
      </header>  
    );
}

export default Header;