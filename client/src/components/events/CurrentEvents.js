import React, { useRef } from "react";
import { Container, Table, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";

import baseURL from "../../common/Constants";

const EVENT_NAME = 0;
const START_DATE = 1;
const END_DATE = 2;
const COLLECTION_DATE = 3;
const START_TIME = 4;
const END_TIME = 5;
const MESSAGE = 6;
const ITEM_BOOL = 7;

const CurrentEvents = () => {
  let match = useRouteMatch();
  const [arrayObject, setArrayObject] = React.useState([]);

  React.useEffect(() => {
    const event_type = {
      eventType: "current",
    };

    axios
      .get(`${baseURL}events`, { params: event_type })
      .then((res) => {
        var initialArray = [];
        for (var i = 0; i < res.data.length; i++) {
          var object = {
            name: res.data[i][EVENT_NAME],
            endDate: res.data[i][END_DATE],
            eventDate: res.data[i][COLLECTION_DATE],
            startTime: res.data[i][START_TIME],
            endTime: res.data[i][END_TIME],
          };
          initialArray.push(object);
        }
        setArrayObject(initialArray);
      })
      .catch((error) => {
        if (error.request) {
          console.log(error.request);
        }
        if (error.response) {
          console.log(error.response);
        }
      });
  }, []);

  const handleRemove = (index, eventName) => {
    const eventJson = {
      eventName: eventName,
    };
    console.log(eventJson);

    axios
      .delete(`${baseURL}events`, { data: eventJson })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.request) {
          console.log(error.request);
        }
        if (error.response) {
          console.log(error.response);
        }
      });

    var newArray = arrayObject;
    newArray.splice(index, 1);
    setArrayObject([...newArray]);
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name of Event</th>
            <th>End Date</th>
            <th>Date of Event</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Remove Event</th>
            <th>User Database</th>
          </tr>
        </thead>
        <tbody>
          {arrayObject.map((event, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <Nav>
                  <Nav.Link as={Link} to={`${event.name}`}>
                    {event.name}
                  </Nav.Link>
                </Nav>
                <td>{event.endDate}</td>
                <td>{event.eventDate}</td>
                <td>{event.startTime}</td>
                <td>{event.endTime}</td>
                <td>
                  <Button
                    onClick={() => handleRemove(index, event.name)}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </td>
                <td>
                  <Link to={`users-${event.name}`}>
                    <Button variant="warning">Manage</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <Switch>
        {arrayObject.map((event, index) => {
          <Route
            key={index}
            path={`${match.url}/${event.name}`}
            component={EditEvent}
          />;
        })}
      </Switch> */}
    </Container>
  );
};
export default CurrentEvents;
