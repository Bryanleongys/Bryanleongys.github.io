import React, { useRef } from "react";
import { Container, Table, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";

const CurrentEvents = () => {
  let match = useRouteMatch();
  const [arrayObject, setArrayObject] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://127.0.0.1:5000/currentevents`).then((res) => {
      var initialArray = [];
      for (var i = 0; i < res.data.length; i++) {
        var object = {
          name: res.data[i][0],
          endDate: res.data[i][3],
          eventDate: res.data[i][4],
          startTime: res.data[i][5],
          endTime: res.data[i][6],
        };
        initialArray.push(object);
      }
      setArrayObject(initialArray);
    });
  }, []);

  const handleRemove = (index, eventName) => {
    var newArray = arrayObject;
    newArray.splice(index, 1);
    setArrayObject([...newArray]);

    const eventJson = {
      eventName: eventName,
    };
    console.log(eventJson);
    axios
      .delete(`http://127.0.0.1:5000/events`, eventJson)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
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
