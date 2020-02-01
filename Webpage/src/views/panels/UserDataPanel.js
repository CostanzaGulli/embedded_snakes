import React from "react";

import {
    Progress,
    Container,
    Row,
    Col
  } from "reactstrap";

const UserPanel = () => {
    const [activeTab, setActiveTab] = React.useState("1");
    const toggle = tab => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };
    return (
      <>
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
                <b>2.5s</b>
              </Col>
              <Col>
                <b>Shake it</b>
              </Col>
            </Row>
          </Container>
        </div>{" "}
      </>
    );
}
export default UserPanel;
