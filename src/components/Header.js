import mainLogo from '../images/mainlogo.svg';

const Header = () => {
    return (
        <header className="header page__header">
        <a href="#" className="header__logo-link">
          <img src={mainLogo}
            alt="Логотип Место Россия"
            className="header__logo"
          />
        </a>
      </header>  
    );
}

export default Header;