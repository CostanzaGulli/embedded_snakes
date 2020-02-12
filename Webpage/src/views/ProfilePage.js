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
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
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
                src={require("assets/img/light.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Further Improvements <br />
              </h4>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <h5>
                Explore how Smart Snake 2.0 will be like.
              </h5>
              <br />
            </Col>
          </Row>
          <br />
        <div className="title">
          <h3>More moves</h3>
        </div>
        <div className="typography">
          <p>
            Smart Snake supports two Game Modes:
            <ul>
            <li><strong>OnePlayer</strong>: if this is selected, play alone.</li>
            <li><strong>TwoPlayer</strong>: play against your friends, trying to win by making the right moves 
              faster than the other. </li>
            </ul>
          </p>
        </div>
        <div className="title">
          <h3>More interaction</h3>
        </div>
        <div className="typography">
          <p>
            Smart Snake supports two Game Modes:
            <ul>
            <li><strong>OnePlayer</strong>: if this is selected, play alone.</li>
            <li><strong>TwoPlayer</strong>: play against your friends, trying to win by making the right moves 
              faster than the other. </li>
            </ul>
          </p>
        </div>
        <div className="title">
          <h3>Easier user interface</h3>
        </div>
        <div className="typography">
          <p>
            Smart Snake supports two Game Modes:
            <ul>
            <li><strong>OnePlayer</strong>: if this is selected, play alone.</li>
            <li><strong>TwoPlayer</strong>: play against your friends, trying to win by making the right moves 
              faster than the other. </li>
            </ul>
          </p>
        </div>
          {/* Tab panes */}
          
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
