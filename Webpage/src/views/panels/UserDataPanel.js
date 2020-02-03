import React from "react";
import {
    Progress,
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const UserPanel = () => {
    const [activeTab, setActiveTab] = React.useState("1");
    const toggle = tab => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };

    firebase.initializeApp({
      apiKey: "AIzaSyDyjYPyvuttJ3IHPhmuY4ygNnGCxB0zgAQ",
      authDomain: "embedded-snakes.firebaseapp.com",
      projectId: "embedded-snakes",
    });
    
    const db = firebase.firestore();
    function add_info(){
      db.collection("moves").add({
        user: "Eirik",
        moves: "Shake",
        time: 1.2,
        success: false
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }
    function read_info(){
      db.collection("moves").where("user", "==", "Eirik")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }

    return (
      <>
        <div className="game-statistics">
        
          <Container>
            <h2>Game statistics</h2>
          <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                <Progress
                  max="100"
                  value="25"
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>25 %</b>
              </Col>
              <Col>
                <b>Upside down!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="100" value="50" barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>50 %</b>
              </Col>
              <Col>
                <b>Shout out!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress
                  max="100"
                  value="75"
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>75 %</b>
              </Col>
              <Col>
                <b>Tap it!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress multi>
                  <Progress bar max="100" value="15" />
                  <Progress
                    bar
                    barClassName="progress-bar-success"
                    max="100"
                    value="30"
                  />
                  <Progress
                    bar
                    barClassName="progress-bar-warning"
                    max="100"
                    value="20"
                  />
                </Progress>
              </Col>
              <Col>
                <b>65 %</b>
              </Col>
              <Col>
                <b>Shake it</b>
              </Col>
            </Row>
            </Container>
        </div>
        <div className="success-rates">
          <Container>
          <h2>Success rate:</h2>
          <Row style={{height:"3em"}}>

              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                <Progress
                  max="100"
                  value="25"
                  barClassName="progress-bar-success"
                />
              </Col>
              <Col>
                <b>25 %</b>
              </Col>
              <Col>
                <b>Upside down!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="100" value="50" barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>50 %</b>
              </Col>
              <Col>
                <b>Shout out!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress
                  max="100"
                  value="75"
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>75 %</b>
              </Col>
              <Col>
                <b>Tap it!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress multi>
                  <Progress bar max="100" value="15" />
                  <Progress
                    bar
                    barClassName="progress-bar-success"
                    max="100"
                    value="30"
                  />
                  <Progress
                    bar
                    barClassName="progress-bar-warning"
                    max="100"
                    value="20"
                  />
                </Progress>
              </Col>
              <Col>
                <b>65 %</b>
              </Col>
              <Col>
                <b>Shake it</b>
              </Col>
            </Row>
          </Container>
        </div>{" "}
        <div className="time-rates">
          <Container>
          <h2>Reaction time:</h2>
          <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                <Progress
                  max="100"
                  value="25"
                  barClassName="progress-bar-success"
                />
              </Col>
              <Col>
                <b>1s</b>
              </Col>
              <Col>
                <b>Upside down!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="100" value="50" barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>2s</b>
              </Col>
              <Col>
                <b>Shout out!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress
                  max="100"
                  value="75"
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>3s</b>
              </Col>
              <Col>
                <b>Tap it!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress multi>
                  <Progress bar max="100" value="15" />
                  <Progress
                    bar
                    barClassName="progress-bar-success"
                    max="100"
                    value="30"
                  />
                  <Progress
                    bar
                    barClassName="progress-bar-warning"
                    max="100"
                    value="20"
                  />
                </Progress>
              </Col>
              <Col>
                <b>2.5s </b>
              </Col>
              <Col>
                <b>Shake it</b>
              </Col>
            </Row>
          </Container>
        </div>{" "}
        <Button onClick={() => add_info()}>
          Add info
        </Button>
        <Button onClick={() => read_info()}>
          Read data
        </Button>
      </>
    );
}
export default UserPanel;
