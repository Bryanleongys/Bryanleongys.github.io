import React, { useRef } from "react";
import { Container, Table, Button, Nav, Modal } from "react-bootstrap";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";

import { baseURL } from "../../common/Constants";

const EVENT_NAME = 1;
const START_DATE = 2;
const END_DATE = 3;
const COLLECTION_DATE = 4;
const START_TIME = 5;
const END_TIME = 6;
const EVENT_MESSAGE = 7;

const CurrentEvents = () => {
  let history = useHistory();
  let match = useRouteMatch();
  const [arrayObject, setArrayObject] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [eventName, setEventName] = React.useState(null);
  const [eventIndex, setEventIndex] = React.useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (index, eventName) => {
    setShow(true);
    setEventName(eventName);
    setEventIndex(index);
  };

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
            startDate: res.data[i][START_DATE],
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

  const handleRemove = () => {
    setShow(false);
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
    newArray.splice(eventIndex, 1);
    setArrayObject([...newArray]);
  };

  const handleManage = (name) => {
    history.push(`/events/users-${name}`);
  };

  return (
    <Container>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm to Remove Event?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are unable to undo this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name of Event</th>
            <th>Start Date</th>
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
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.eventDate}</td>
                <td>{event.startTime}</td>
                <td>{event.endTime}</td>
                <td>
                  <Button
                    onClick={() => handleShow(index, event.name)}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </td>
                <td>
                  {/* <Link to={`users-${event.name}`}> */}
                  <Button
                    onClick={() => handleManage(event.name)}
                    variant="warning"
                  >
                    Manage
                  </Button>
                  {/* </Link> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <Switch>
        {arrayObject.map((event, index) => {
          <Route key={index} path={`${event.name}`} component={EditEvent}>
            <EditEvent event={event}/>
          </Route>;
        })}
      </Switch> */}
    </Container>
  );
};
export default CurrentEvents;
