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
import { baseURL } from "../common/Constants";

const EVENT_NAME = 1;
const START_DATE = 2;
const END_DATE = 3;
const COLLECTION_DATE = 4;
const START_TIME = 5;
const END_TIME = 6;
const EVENT_MESSAGE = 7;

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

    axios.get(`${baseURL}events`, { params: all_events }).then((res) => {
      var initialArray = [];
      for (var i = 0; i < res.data.length; i++) {
        initialArray.push(res.data[i][EVENT_NAME]);
      }
      setAllEvents(initialArray);
    });
    axios.get(`${baseURL}events`, { params: current_events }).then((res) => {
      var initialArray = [];
      for (var i = 0; i < res.data.length; i++) {
        initialArray.push(res.data[i][EVENT_NAME]);
      }
      setCurrentEvents(initialArray);
    });
    // allEvents.map((event, index) => {
    //   console.log("hello" + event);
    // });
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
          {currentEvents.map((event, index) => {
            return (
              <Route key={index} path={`${match.url}/users-${event}`}>
                <UserTable event={event} />
              </Route>
            );
          })}
          {allEvents.map((event, index) => {
            return (
              <Route key={index} path={`${match.url}/${event}`}>
                <EditEvent event={event} />
              </Route>
            );
          })}
          {/* <Route path={`${match.url}/past-events`} component={PastEvents} /> */}
          <Route path={`${match.url}/past-events`}>
            <PastEvents />
          </Route>
          <Route
            path={`${match.url}/current-events`}
            component={CurrentEvents}
          />
          <Route path={`${match.url}/future-events`} component={FutureEvents} />
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
