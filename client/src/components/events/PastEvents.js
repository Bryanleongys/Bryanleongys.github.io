import React, { Component } from "react";
import { Container, Table, Button } from "react-bootstrap";

const PastEvents = () => {
  // const [arrayObjects, setArrayObjects] = React.useState();
  let arrayObject = [
    { name: "Orientation Welfare", eventDate: "07/07/21" },
    { name: "Recess Week Welfare", eventDate: "08/07/21" },
    { name: "Study Welfare", eventDate: "09/07/21" },
    { name: "For Noobs Welfare", eventDate: "10/07/21" },
  ];
  // setArrayObjects(array);
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
              <tr>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.eventDate}</td>
                <td>
                  <Button variant="danger">Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default PastEvents;
