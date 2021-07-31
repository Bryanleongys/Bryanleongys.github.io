import React from "react";
import { Container, Nav, Card, Button } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import PastEvents from "./events/PastEvents";
import CurrentEvents from "./events/CurrentEvents";
import FutureEvents from "./events/FutureEvents";
import { Plus, PlusSquare } from 'react-bootstrap-icons';

const EventScreen = () => {
  let match = useRouteMatch();
  let history = useHistory();

  const handleToAddEvent = () => {
    history.push('/add-event')
  };

  return (
    <Container>
      <Card>
      <Nav variant="tabs" defaultActiveKey="/home">
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
      </Card>
      <br></br>
      <Button onClick={() => handleToAddEvent()}>
        <Plus/>
        Add Event
      </Button>
    </Container>
  );
};
export default EventScreen;
