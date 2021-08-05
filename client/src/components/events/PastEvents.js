import React, { useRef } from "react";
import { Container, Table, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import EditEvent from "./EditEvent";

const PastEvents = () => {
  let match = useRouteMatch();
  const [arrayObject, setArrayObject] = React.useState([]);

  React.useEffect(() => {
    const event_type = {
      eventType: "past",
    };

    axios
      .get(`http://127.0.0.1:5000/events`, { params: event_type })
      .then((res) => {
        var initialArray = [];
        for (var i = 0; i < res.data.length; i++) {
          var object = {
            name: res.data[i][0],
            eventDate: res.data[i][4],
          };
          initialArray.push(object);
        }
        setArrayObject(initialArray);
      });
  }, []);

  // React.useEffect(() => {
  //   console.log("hello");
  // }, [arrayObject]);

  // const handlePress = (index) => {
  //   console.log(index);
  //   var newArray = arrayObject;
  //   newArray.splice(index, 1);
  //   console.log(newArray);
  //   setArrayObject(newArray);
  // };

  const handlePress = (index) => {
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
            <th>Date of Event</th>
            <th>Remove Event</th>
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
                <td>{event.eventDate}</td>
                <td>
                  <Button onClick={() => handlePress(index)} variant="danger">
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Switch>
        {arrayObject.map((event, index) => {
          <Route
            key={index}
            path={`${match.url}/${event.name}`}
            component={EditEvent}
          />;
        })}
      </Switch>
    </Container>
  );
};
export default PastEvents;
