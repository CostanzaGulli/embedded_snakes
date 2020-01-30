import React from "react";

// reactstrap components
import { Button,Container } from "reactstrap";

// core components

const GameHeader=() => {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Game</h1>
              <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Press here to start game:
            </h2>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Button
                  className="btn-round mr-1"
                  color="info"
                  outline
                  size="sm"
                  type="button"

                >
                <i className="fa fa-heart mr-1" />
                  Whats up?
                </Button>
            </div>
            
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        />
      </div>
    </>
  );
}

export default GameHeader;
