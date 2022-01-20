import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react/cjs/react.development';

function PageNotFound(props) {

 
    return (
<>
<Header loggedIn={props.loggedIn} text={props.text} headerAction={props.headerAction} loginText={props.loginText}/>
<main className="main page__main">
    <section className="elements main__elements-section not-found">
        <h1 className="not-found__title">404 Страница не найдена</h1>
        <Link to="/" className="not-found__link">Вернуться на главную</Link></section>
    </main>

</>
    );
}

export default PageNotFound;