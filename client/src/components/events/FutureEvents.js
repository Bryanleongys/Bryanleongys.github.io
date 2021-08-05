import React, { useRef } from "react";
import { Container, Table, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Plus, PlusSquare } from "react-bootstrap-icons";
import axios from "axios";
import EditEvent from "./EditEvent";

const FutureEvents = () => {
  let match = useRouteMatch();
  const [arrayObject, setArrayObject] = React.useState([]);

  React.useEffect(() => {
    const event_type = {
      eventType: "future",
    };
    axios
      .get(`http://127.0.0.1:5000/events`, { params: event_type })
      .then((res) => {
        var initialArray = [];
        for (var i = 0; i < res.data.length; i++) {
          var object = {
            name: res.data[i][0],
            startDate: res.data[i][2],
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
      <Table striped bordered hover responsive>
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
export default FutureEvents;
