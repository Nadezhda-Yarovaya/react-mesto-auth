import mainLogo from '../images/mainlogo.svg';
import {Link, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';

const Header = (props) => {

  const history= useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    props.userLogout();
    history.push('/signin'); } 

    return (
        <header className="header page__header">
        <Link to="/" className="header__logo-link">
          <img src={mainLogo}
            alt="Логотип Место Россия"
            className="header__logo"
          />
        </Link>        

       <div className="temp__header">
        { props.loggedIn ? (
          <>
           <p className="header__email">{props.text}</p>      
        <button onClick={signOut} className="header__login-button">{props.loginText}</button>
        </>
        )  :
        ( 
          props.headerAction ? (<Link to={props.headerAction} className="header__link-button">{props.loginText}</Link>) : (
            <p className="header__email">сработало нелогед ин?</p>   )
        )
        
}
</div>
      </header>  
    );
}

export default Header;