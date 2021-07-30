import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PastEvents from "./events/PastEvents";
import CurrentEvents from "./events/CurrentEvents";
import FutureEvents from "./events/FutureEvents";

const EventScreen = () => {
  let match = useRouteMatch();

  return (
    <Container>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/past-events`} eventKey="link-0">
            Past Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`${match.url}/current-events`}
            eventKey="link-1"
          >
            Current Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`${match.url}/future-events`}
            eventKey="link-2"
          >
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
