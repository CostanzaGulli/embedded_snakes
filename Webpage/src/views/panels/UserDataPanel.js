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
    const [successRates, setSuccessRates] = useState({"Shake":0,"Raise":0,"Button":0});
    const [avgTimes, setAvgTimes] = useState({"Shake":0,"Raise":0,"Button":0});
    const [winRate,setWinRate]= useState(0);
    const [avgScore,setAvgScore]= useState(0);
    const [avgTime,setAvgTime]= useState(0);
    const [firebase_initialized,setFirebaseInitialized] = useState(false);
    const [userId,setUserId] = useState("PI1");
    const moves=["Shake","Raise","Button"]
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
      var aggegated_total_time= Number(0);
      var aggegated_total_number_of_moves= Number(0);

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
                  aggegated_total_number_of_moves=aggegated_total_number_of_moves+1;
                  aggegated_total_time+= data["time"];
                  aggregated_move_time+= data["time"];
                  if(data["success"]==true){
                    succesful_move_count=succesful_move_count+1;
                  }
                }
              });
              successRates[move]=succesful_move_count/total_move_count*100;
              avgTimes[move]=aggregated_move_time/total_move_count;  
            }
            setAvgTime(aggegated_total_time/aggegated_total_number_of_moves);
            setSuccessRates({...successRates});
            setAvgTimes({...avgTimes});
          }
          else{
            setAvgTime(0);
            setSuccessRates({"Shake":0,"Raise":0,"Button":0});
            setAvgTimes({"Shake":0,"Raise":0,"Button":0});
          }
      });
      var gamesRef =database.ref("games/"+userId);
      var game_count=Number(0);
      var game_score=Number(0);
      var game_win=Number(0);
      gamesRef.once("value")
        .then(function(snapshot){
          if (snapshot.hasChildren()){
              aggregated_move_time = 0;
              snapshot.forEach(function(child) {
                var data=child.toJSON()
                game_count++;
                if(data["win"]==true){
                  game_win++;
                }
                game_score+=data["score"];
              });
            setAvgScore(game_score/game_count);
            setWinRate(game_win/game_count*100);
          }
          else{
            setAvgScore(0);
            setWinRate(0);
          }
          var rootRef =database.ref("games/"+userId);

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
                        defaultValue={userId}
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
                  value={winRate}
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>{winRate} %</b>
              </Col>
              <Col>
                <b>Win rate</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
                <Progress
                  max="1500"
                  value={avgScore}
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>{avgScore}</b>
              </Col>
              <Col>
                <b>Average Score</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="3" value={avgTime} barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>{avgTime} s</b>
              </Col>
              <Col>
                <b>Average time</b>
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
                  value={successRates["Shake"]}
                  barClassName="win-rate"
                />
              </Col>
              <Col>
                <b>{successRates["Shake"]} %</b>
              </Col>
              <Col>
                <b>Shake!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="100" value={successRates["Raise"]} barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>{successRates["Raise"]} %</b>
              </Col>
              <Col>
                <b>Raise!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress
                  max="100"
                  value={successRates["Button"]}
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>{successRates["Button"]} %</b>
              </Col>
              <Col>
                <b>Button!</b>
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
                  max="3"
                  value={avgTimes["Shake"]}
                  barClassName="progress-bar-success"
                />
              </Col>
              <Col>
                <b>{avgTimes["Shake"]} s</b>
              </Col>
              <Col>
                <b>Shake!</b>
              </Col>
            </Row>
            
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress max="3" value={avgTimes["Raise"]} barClassName="progress-bar-info" />
              </Col>
              <Col>
                <b>{avgTimes["Raise"]} s</b>
              </Col>
              <Col>
                <b>Raise!</b>
              </Col>
            </Row>
            <Row style={{height:"3em"}}>
              <Col md="6">
              <div style={{ textAlign: "center", height:"0.5em"}}>
              </div>
              <Progress
                  max="3"
                  value={avgTimes["Button"]} 
                  barClassName="progress-bar-danger"
                />
              </Col>
              <Col>
                <b>{avgTimes["Button"]} s</b>
              </Col>
              <Col>
                <b>Button!</b>
              </Col>
            </Row>
          </Container>
        </div>{" "}      
    );
      </>
    );
}
export default UserPanel;
