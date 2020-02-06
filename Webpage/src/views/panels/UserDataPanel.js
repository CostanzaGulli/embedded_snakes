import React, { useState, useEffect } from 'react';
import {
    Progress,
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
  } from "reactstrap";


const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const UserPanel = () => {
    const [successRates, setSuccessRates] = useState({"Shake":0,"Tap":0,"Shout Out":0,"UpsideDown":0});
    const [avgTimes, setAvgTimes] = useState({"Shake":0,"Tap":0,"Shout Out":0,"UpsideDown":0});

    const [firebase_initialized,setFirebaseInitialized] = useState(false);
    const [userId,setUserId] = useState("Eirik");
    const moves=["Shake","Tap","Shout Out","UpsideDown"]
    const UserOptions=[
      {key:"Eirik",text:"Eirik",value:"Eirik"},
      {key:"Valeria",text:"Valeria",value:"Valeria"},
      {key:"Costanza",text:"Costanza",value:"Costanza"}]


    document.documentElement.classList.remove("nav-open");
    useEffect(() => {
      document.body.classList.add("userpanel");
      return function cleanup() {
        document.body.classList.remove("userpanel");
      };
    }, [successRates]);
    
    if(!firebase_initialized){
      setFirebaseInitialized(true);
      firebase.initializeApp({
        apiKey: "AIzaSyDyjYPyvuttJ3IHPhmuY4ygNnGCxB0zgAQ",
        authDomain: "embedded-snakes.firebaseapp.com",
        databaseURL: "https://embedded-snakes.firebaseio.com",
        projectId: "embedded-snakes",
        storageBucket: "embedded-snakes.appspot.com",
        messagingSenderId: "1033037649596",
      });
    }
    
    const database=firebase.database();
    function get_info_from_database(){
      var total_move_count = Number(0);
      var succesful_move_count  = Number(0);
      var aggregated_move_time = Number(0);
      var move;
      var rootRef =database.ref("moves/"+userId);
      rootRef.once("value")
        .then(function(snapshot){
          if (snapshot.hasChildren()){
            for(move of moves){
              total_move_count = 0;
              succesful_move_count  = 0;
              aggregated_move_time = 0;
              
              snapshot.forEach(function(child) {
                var data=child.toJSON()
                if (data["move"]==move){
                  total_move_count=total_move_count+1;
                  aggregated_move_time+= data["time"];
                  if(data["success"]==true){
                    succesful_move_count=succesful_move_count+1;
                  }
                }
              });
              successRates[move]=succesful_move_count/total_move_count*100;
              avgTimes[move]=aggregated_move_time/total_move_count;  
            }
            setSuccessRates({...successRates});
            setAvgTimes({...avgTimes});
          }
          else{
            setSuccessRates({"Shake":0,"Tap":0,"Shout Out":0,"UpsideDown":0});
            setAvgTimes({"Shake":0,"Tap":0,"Shout Out":0,"UpsideDown":0});
          }
        });
    }
    return (
      <>
        <div className="game-statistics">

          <Container>
          <Row style={{height:"3em"}}>
              <Col md="6">
                <FormGroup className="has-success">
                      <Input
                        className="form-control-success"
                        defaultValue="Success"
                        id="inputDanger1"
                        type="text"
                        onInput={(text) => {setUserId(text.target.value);
                                                console.log(text.target.value)}}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button onClick={() => get_info_from_database()}>
                      Read data from database
                    </Button>
                  </Col>
                </Row>
            <h2>Game statistics</h2>
          <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                <Progress
                  max="100"
                  value={successRates["Shake"]}
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>{successRates["Shake"]} %</b>
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
                  value={successRates["UpsideDown"]}
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>{successRates["UpsideDown"]} %</b>
              </Col>
              <Col>
                <b>Upside down!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="100" value={successRates["Shout Out"]} barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>{successRates["Shout Out"]} %</b>
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
                  value={successRates["Tap"]}
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>{successRates["Tap"]} %</b>
              </Col>
              <Col>
                <b>Tap it!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                  <Progress
                    barClassName="progress-bar-success"
                    max="100"
                    value= {successRates["Shake"]}
                  />
              </Col>
              <Col>
                <b>{successRates["Shake"]} %</b>
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
                  max="5"
                  value={avgTimes["UpsideDown"]}
                  barClassName="progress-bar-success"
                />
              </Col>
              <Col>
                <b>{avgTimes["UpsideDown"]} s</b>
              </Col>
              <Col>
                <b>Upside down!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="5" value={avgTimes["Shout Out"]} barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>{avgTimes["Shout Out"]} s</b>
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
                  max="5"
                  value={avgTimes["Tap"]} 
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>{avgTimes["Tap"]} s</b>
              </Col>
              <Col>
                <b>Tap it!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                  <Progress
                    barClassName="progress-bar-success"
                    max="5"
                    value={avgTimes["Shake"]} 
                  />
              </Col>
              <Col>
                <b>{avgTimes["Shake"]} s </b>
              </Col>
              <Col>
                <b>Shake it</b>
              </Col>
            </Row>
          </Container>
        </div>{" "}      
    );
      </>
    );
}
export default UserPanel;
