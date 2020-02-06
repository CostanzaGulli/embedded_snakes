/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import socketIOClient from "socket.io-client";
import GameNavbar from "components/Navbars/GameNavbar.js";
import UserDataPanel from "views/panels/UserDataPanel.js";
import React, { useState, useEffect } from 'react';
import { Button,Container } from "reactstrap";

const App = () => {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("app");
    return function cleanup() {
      document.body.classList.remove("app");
    };
  });
  return (
    <>
      <GameNavbar />
      <div style={{height:"100px"}}></div>
      <UserDataPanel/>
   </> 
  );
}
  export default App;