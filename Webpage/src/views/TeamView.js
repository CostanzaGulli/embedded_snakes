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
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/GameNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });;
  return (
    <>
      <ExamplesNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/snake.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Meet the team! <br />
              </h4>
              <h6 className="description">Electrical Engineers</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                We are a group of three Electrical and Electronic Engineering students at Imperial College London.....
              </p>
              <br />
              
            </Col>
          </Row>
          <div className="section section-dark text-center">
            <Container>
              <h2 className="title">The Snakes</h2>
              <Row>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("assets/img/faces/eirik_profile.jpeg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">Eirik Albrektsen</CardTitle>
                          <h6 className="card-category">Web depelopement</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        something.
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="https://www.linkedin.com/in/eirik-albrektsen-9a0686147/"
                        //onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-linkedin" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("assets/img/faces/vale_profile.jpeg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">Valeria Cardazzi</CardTitle>
                          <h6 className="card-category">Hardware and communication</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        Vale something
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="https://www.linkedin.com/in/valeria-cardazzi-18690b18a/"
                        //onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-linkedin" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("assets/img/faces/c_gulli.png")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">Costanza Gulli</CardTitle>
                          <h6 className="card-category">Hardware and Communicaiton</h6>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        something_costanza
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="https://www.linkedin.com/in/costanza-gulli-b65840194/"
                        //onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-linkedin" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          
        </Container>
          {/* Tab panes */}
      </div>

      <DemoFooter />
    </>
  );
}

export default ProfilePage;
