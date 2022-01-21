import mainLogo from '../images/mainlogo.svg';
import { Link, useLocation } from 'react-router-dom';
import { Route, Switch, } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

const Header = (props) => {
  const location = useLocation();

  /*
  {props.loggedIn ? (
          <>
            <p className="header__email">{props.headerEmail}</p><button onClick={props.signOut} className="header__login-button">Выйти</button>
          </>
        ) :
          (
            <Link to={location.pathname === '/signin' ? './sign-up' : './signin'} className="header__link-button">{location.pathname === '/signin' ? 'Регистрация' : 'Войти'}</Link>
          )

        }
        */

  return (
    <header className="header page__header">
      <Link to="/" className="header__logo-link">
        <img src={mainLogo}
          alt="Логотип Место Россия"
          className="header__logo"
        />
      </Link>

      <div className="header__logged-in-info">
      <Switch>
              <Route path="/signin">Регистрация</Route>
              <Route path="/sign-up">ВХОД</Route>
              <ProtectedRoute path="/" loggedIn={props.loggedIn}>пишу что хочу</ProtectedRoute>
              </Switch>
        
      </div>
    </header>
  );
}

export default Header;