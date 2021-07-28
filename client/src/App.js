import React, { useState } from "react";
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventScreen from "./components/EventScreen";
import UserScreen from "./components/UserScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import HomeScreen from "./components/HomeScreen";

import "./App.css";

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const App = () => (
  <Router>
    <Container className="p-3">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/home"}>
            RC4 Welfare Bot
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/events"}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to={"/users"}>
              Users
            </Nav.Link>
            <Nav.Link as={Link} to={"/feedbacks"}>
              Feedbacks
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <h1 className="header">Welcome To RC4 Welfare Bot</h1> */}
      {/* <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast> */}
    </Container>
    <Container>
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route path="/events" component={EventScreen} />
        <Route path="/users" component={UserScreen} />
        <Route path="/feedbacks" component={FeedbackScreen} />
      </Switch>
    </Container>
  </Router>
);

export default App;