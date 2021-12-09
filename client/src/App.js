import React, { useState } from "react";
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EventScreen from "./components/EventScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import HomeScreen from "./components/HomeScreen";
import AddEventForm from "./components/events/AddEventForm";

import "./App.css";

const App = () => (
  <Router>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/home"}>
          RC4 Welfare Bot
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/events"}>
            Events
          </Nav.Link>
          <Nav.Link as={Link} to={"/feedbacks"}>
            Feedbacks
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    {/* <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast> */}
    {/* </Container> */}
    <Container>
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route path="/events" component={EventScreen} />
        <Route path="/feedbacks" component={FeedbackScreen} />
        <Route path="/add-event" component={AddEventForm} />
      </Switch>
    </Container>
  </Router>
);

export default App;
