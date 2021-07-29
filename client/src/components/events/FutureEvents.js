import React, { useRef } from "react";
import { Container, Table, Button, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import EditEvent from "./EditEvent";

const FutureEvents = () => {
  let match = useRouteMatch();
  const sample = [
    {
      name: "Hotpot Welfare",
      startDate: "29/07/21",
      endDate: "30/07/21",
      eventDate: "08/08/21",
      startTime: "1200hrs",
      endTime: "1400hrs",
    },
    {
      name: "Bulgogi Welfare",
      startDate: "29/07/21",
      endDate: "08/08/21",
      eventDate: "09/08/21",
      startTime: "1400hrs",
      endTime: "1600hrs",
    },
    {
      name: "Macdonalds Welfare",
      startDate: "29/07/21",
      endDate: "10/08/21",
      eventDate: "19/08/21",
      startTime: "1300hrs",
      endTime: "1500hrs",
    },
  ];
  const [arrayObject, setArrayObject] = React.useState(sample);

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
                  <Nav.Link as={Link} to={`${match.url}/${event.name}`}>
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
