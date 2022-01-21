import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";

function Register(props) {
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });

  function handleRegisterInputChange(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = userdata;
    props.onSubmit(username, password);
  }

  return (
    <>
      <main className="main page__main">
        <form className="register" onSubmit={handleSubmit}>
          <h1 className="register__title">Регистрация</h1>
          <input
            type="email"
            placeholder="Email"
            className="register__input"
            id="username"
            name="username"
            value={userdata.username || ""}
            onChange={handleRegisterInputChange}
          ></input>
          <input
            placeholder="Пароль"
            className="register__input"
            id="password"
            name="password"
            type="password"
            value={userdata.password || ""}
            onChange={handleRegisterInputChange}
          ></input>
          <input
            type="submit"
            value="Зарегистрироваться"
            className="register__submit"
          />
          <div className="register__already-registered-text">
            <p className="register__par">Уже зарегистрированы? </p>
            <Link to="/signin" className="register__link">
              Войти
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default withRouter(Register);
