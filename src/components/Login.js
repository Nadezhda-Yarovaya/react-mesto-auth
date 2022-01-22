import React from "react";
import { withRouter } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });

  function handleLoginInputChange(e) {
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
          <h1 className="register__title">Вход</h1>
          <input
            type="email"
            placeholder="Email"
            className="register__input"
            id="username"
            name="username"
            value={userdata.username || ""}
            onChange={handleLoginInputChange}
          ></input>
          <input
            placeholder="Пароль"
            className="register__input"
            id="password"
            name="password"
            type="password"
            value={userdata.password || ""}
            onChange={handleLoginInputChange}
          ></input>
          <input type="submit" value="Вход" className="register__submit" />
        </form>
      </main>
    </>
  );
}

export default withRouter(Login);
