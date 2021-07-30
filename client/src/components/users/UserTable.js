import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Check, X } from "react-bootstrap-icons";

const UserTable = ({ arrayHandles }) => {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Telegram Handle</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {arrayHandles.map((handle, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{handle}</td>
                <td>
                  <Button variant="success">
                    <Check />
                  </Button>
                </td>
                <td>
                  <Button variant="warning">
                    <X />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default UserTable;
