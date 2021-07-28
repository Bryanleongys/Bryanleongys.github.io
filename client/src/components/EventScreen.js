import React, { Component } from "react";
import { Container, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import PastEvents from "./events/PastEvents";
import CurrentEvents from "./events/CurrentEvents";
import FutureEvents from "./events/FutureEvents";

const EventScreen = () => {
  let match = useRouteMatch();

  return (
    <Container>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/past-events`}>
            Past Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/current-events`}>
            Current Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/future-events`}>
            Future Events
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route path={`${match.url}/past-events`} component={PastEvents} />
        <Route path={`${match.url}/current-events`} component={CurrentEvents} />
        <Route path={`${match.url}/future-events`} component={FutureEvents} />
      </Switch>
    </Container>
  );
};
export default EventScreen;
