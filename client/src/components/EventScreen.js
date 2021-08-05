import React from "react";
import { Container, Nav, Card, Button } from "react-bootstrap";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import PastEvents from "./events/PastEvents";
import CurrentEvents from "./events/CurrentEvents";
import FutureEvents from "./events/FutureEvents";
import { Plus, PlusSquare } from "react-bootstrap-icons";
import EditEvent from "./events/EditEvent";
import UserTable from "./users/UserTable";
import axios from "axios";

const EventScreen = () => {
  let match = useRouteMatch();
  let history = useHistory();

  const handleToAddEvent = () => {
    history.push("/add-event");
  };

  // includes past, current & future events - must be unique
  const [allEvents, setAllEvents] = React.useState([]);
  const [currentEvents, setCurrentEvents] = React.useState([]);
  React.useEffect(() => {
    const all_events = {
      eventType: "all",
    };
    const current_events = {
      eventType: "current",
    };
    axios
      .get(`http://127.0.0.1:5000/events`, { params: all_events })
      .then((res) => {
        var initialArray = [];
        for (var i = 0; i < res.data.length; i++) {
          initialArray.push(res.data[i][0]);
        }
        setAllEvents(initialArray);
      });
    axios
      .get(`http://127.0.0.1:5000/events`, { params: current_events })
      .then((res) => {
        var initialArray = [];
        for (var i = 0; i < res.data.length; i++) {
          initialArray.push(res.data[i][0]);
        }
        setCurrentEvents(initialArray);
      });
  }, []);

  return (
    <Container>
      <Card>
        <Nav variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`${match.url}/past-events`}
              eventKey="link-0"
            >
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
          <Route
            path={`${match.url}/current-events`}
            component={CurrentEvents}
          />
          <Route path={`${match.url}/future-events`} component={FutureEvents} />
          {allEvents.map((event, index) => {
            return (
              <Route key={index} path={`${match.url}/${event}`}>
                <EditEvent event={event} />
              </Route>
            );
          })}
          {currentEvents.map((event, index) => {
            return (
              <Route key={index} path={`${match.url}/users-${event}`}>
                <UserTable event={event} />
              </Route>
            );
          })}
        </Switch>
      </Card>
      <br></br>
      <Button onClick={() => handleToAddEvent()}>
        <Plus />
        Add Event
      </Button>
    </Container>
  );
};
export default EventScreen;
