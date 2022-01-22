import mainLogo from "../images/mainlogo.svg";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header page__header">
      <Link to="/" className="header__logo-link">
        <img
          src={mainLogo}
          alt="Логотип Место Россия"
          className="header__logo"
        />
      </Link>

      <div className="header__logged-in-info">
        <Switch>
          <Route path="/" exact>
            {props.loggedIn ? (
              <>
                <p className="header__email">{props.email}</p>
                <button
                  onClick={props.signOut}
                  className="header__login-button"
                >
                  Выйти
                </button>
              </>
            ) : (
              ""
            )}{" "}
          </Route>
          <Route path="/signin">
            <Link to="./sign-up" className="header__link-button">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="./signin" className="header__link-button">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
};

export default Header;
