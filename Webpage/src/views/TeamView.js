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
                src={require("assets/img/faces/joe-gardner-2.jpg")}
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
                An artist of considerable range, Jane Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.
              </p>
              <br />
              <Button className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Settings
              </Button>
            </Col>
          </Row>
          <div id="images">
          <Container>
            <div className="title">
              <h3>Images</h3>
            </div>
            <Row>
              <Col md="3" sm="6">
                <h4 className="images-title">Rounded Image</h4>
                <img
                  alt="..."
                  className="img-rounded img-responsive"
                  src={require("assets/img/uriel-soberanes.jpg")}
                />
                <div className="img-details">
                  <div className="author">
                    <img
                      alt="..."
                      className="img-circle img-no-padding img-responsive"
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <p>Sonia Green</p>
                  <p>TODO: WRITE text here</p>
                </div>
              </Col>
              <Col className="mr-auto ml-auto" md="2" sm="3">
                <h4 className="images-title">Circle Image</h4>
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={require("assets/img/faces/kaci-baum-2.jpg")}
                />
                <p className="text-center">Brigitte Bardot</p>
                <p>TODO: WRITE text here</p>

              </Col>
              <Col className="mr-auto" md="2" sm="3">
                <h4 className="images-title">Thumbnail</h4>
                <img
                  alt="..."
                  className="img-thumbnail img-responsive"
                  src={require("assets/img/faces/erik-lucatero-2.jpg")}
                />
                <p className="text-center">John Keynes</p>
                <p>TODO: WRITE text here</p>
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
