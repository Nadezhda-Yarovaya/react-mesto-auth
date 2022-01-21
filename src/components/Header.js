import mainLogo from '../images/mainlogo.svg';
import { Link, useLocation } from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();

  return (
    <header className="header page__header">
      <Link to="/" className="header__logo-link">
        <img src={mainLogo}
          alt="Логотип Место Россия"
          className="header__logo"
        />
      </Link>

      <div className="header__logged-in-info">
        {props.loggedIn ? (
          <>
            <p className="header__email">{props.headerEmail}</p><button onClick={props.signOut} className="header__login-button">Выйти</button>
          </>
        ) :
          (
            <Link to={location.pathname === '/signin' ? './sign-up' : './signin'} className="header__link-button">{location.pathname === '/signin' ? 'Регистрация' : 'Войти'}</Link>
          )

        }
      </div>
    </header>
  );
}

export default Header;