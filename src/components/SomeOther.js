// ProtectedRoute.js

import React from "react";
import Header from './Header';

const SomeOther = (props) => {
  return (
      <>
    <Header />
    <div>
       {props.mainText ? props.mainText  : 'тут ничего нет' }
    </div>
    </>
  );
};

export default SomeOther; 