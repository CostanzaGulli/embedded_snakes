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
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function SectionTypography() {
  return (
    <>
      <Container className="tim-container">
      <div className="title">
          <h3>About the game</h3>
        </div>
        <div className="typography">
          <p>
            SmartSnake is a game aimed at combinig fun and useful. 
            Play by performing the moves in the least amount of time and with the highest degree of precision.
            There are three moves you will be asked to perform: "Shake!", "Raise!" and "Button".
            Watch the video to learn the game.
            <Button className="btn-link" color="info" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
               Watch video
            </Button>
          </p>
        </div>
        <div className="title">
          <h3>Game Rules</h3>
        </div>
        <div className="typography">
          <p>
          You have a maximum of 3s to perform each move.
          <ul>
            <li>If you perfom a move correctly, you earn +100 points.</li>
            <li>If you perform the move within one second, you earn a +50 bonus.</li>
            <li>If you don't proform any move, your score doesn't change</li>
            <li>If you perform the wrong move, you get a -20 points penalty</li>
            </ul>
          After 10 moves, the game stops. If your total score is more than 1000, you win! If not, try again.
          </p>
        </div>
        <div className="title">
          <h3>Game Modes</h3>
        </div>
        <div className="typography">
          <p>
            SmartSnake supports two Game Modes:
            <ul>
            <li><strong>OnePlayer</strong>: to play alone, press the button once on the main device.</li>
            <li><strong>TwoPlayers</strong>: to play against a friend, press the button twice on the main device and see who performs better.</li>
            </ul>
          </p>
        </div>
        <div className="title">
          <h3>User Interface</h3>
        </div>
        <div className="typography">
          <p>
            The <strong>web used interface</strong> allows you to access <strong>statistics</strong> on your performance. You just need to enter 
            your username and you will see data about:
            <ul>
            <li><strong>Average win rates</strong>,<strong>scores</strong> and <strong>reaction times</strong>.</li>
            <li><strong>Success rates</strong> and <strong>reaction times</strong> for each move. </li>
            </ul>
            <Button className="btn-link" color="info" href="/app">
               Go to app
            </Button>
          </p>
        </div>
        <br />
      </Container>
    </>
  );
}

export default SectionTypography;
