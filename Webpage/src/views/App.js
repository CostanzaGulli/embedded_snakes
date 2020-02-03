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
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState(0);
  const [endpoint, setEndpoint] = useState("localhost:4001");

  function mountSocket() {
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {setResponse(data) });
  }

  return (
    <>
      <GameNavbar />
      <div style={{height:"100px"}}></div>
      <UserDataPanel/>
      
      {/*<div style={{backgroundColor: 'info'}}>
      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <Button onClick={() => mountSocket()}>
        Mount socket
      </Button>
      <div style={{ textAlign: "center"}}>
        {response
            ? <p>
              The temperature in Florence is: {response} °F
            </p>
            : <p>Loading...</p>}
      </div>
    </div>*/}

   </> 
  );
}
  export default App;