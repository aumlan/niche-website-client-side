import React, { useState } from "react";
import Cart from "./Cart.js";
import Profile from "./Profile.js";
import MyOrder from "./MyOrder";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { AllContexts } = useAuth();
  const { logOut } = AllContexts;
  const [current, setCurrent] = useState("Profile");
  function profileHandler(e) {
    setCurrent(e.target.value);
  }
  function cartHandler(e) {
    setCurrent(e.target.value);
  }

  return (
    <div className="pt-5">
      {/*<div className="d-flex my-2 justify-content-center">*/}
      {/*  <input onClick={profileHandler} type="button" value="Profile" />*/}
      {/*  <input onClick={cartHandler} type="button" value="My Order" />*/}
      {/*</div>*/}

      {/*{(current === "Profile" && <Profile></Profile>) ||*/}
      {/*  (current === "Cart" && <Cart></Cart>)}*/}

      {/*{(current === "Profile" && <Profile></Profile>) ||*/}
      {/*(current === "My Order" && <MyOrder></MyOrder>)}*/}

      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">My Order</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Review</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Pay</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="five" onClick={logOut}>
                    Sign Out
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Profile/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <MyOrder/>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h1> Review</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <h1> Payment system coming soon. </h1>
                </Tab.Pane>
                <Tab.Pane eventKey="five">
                  <h1>Logout</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>










    </div>
  );
};

export default Dashboard;
