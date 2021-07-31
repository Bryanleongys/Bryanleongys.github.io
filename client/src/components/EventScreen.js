import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PastEvents from "./events/PastEvents";
import CurrentEvents from "./events/CurrentEvents";
import FutureEvents from "./events/FutureEvents";
import EditEvent from "./events/EditEvent";
import UserTable from "./users/UserTable";

const EventScreen = () => {
  let match = useRouteMatch();

  // includes past, current & future events - must be unique
  const all_events = [
    "Orientation Welfare",
    "Study Welfare",
    "For Noobs Welfare",
    "Recess Week Welfare",
    "Recess Week Welfare",
    "Acai Welfare",
    "Mr Coconut Welfare",
    "Hotpot Welfare",
    "Bulgogi Welfare",
    "Macdonalds Welfare",
  ];

  const current_events = [
    "Recess Week Welfare",
    "Acai Welfare",
    "Mr Coconut Welfare",
  ];

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
        {all_events.map((event, index) => {
          return (
            <Route key={index} path={`${match.url}/${event}`}>
              <EditEvent event={event} />
            </Route>
          );
        })}
        {current_events.map((event, index) => {
          return (
            <Route key={index} path={`${match.url}/users-${event}`}>
              <UserTable event={event} />
            </Route>
          );
        })}
      </Switch>
    </Container>
  );
};
export default EventScreen;
