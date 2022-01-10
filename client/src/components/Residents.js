import axios from "axios";
import React from "react";
import { Container, Nav, Table, Button, Modal } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { baseURL } from "../common/Constants";

const USERNAME = 1;
const NUSNET_ID = 2;
const HOUSE = 3;
const TELEGRAM_ID = 4;

const Residents = () => {
  const [users, setUsers] = React.useState([]);
  const [telegram_id, setTelegramId] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [userIndex, setUserIndex] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${baseURL}users`)
      .then((res) => {
        const userArray = [];
        for (var i = 0; i < res.data.length; i++) {
          userArray.push({
            name: res.data[i][USERNAME],
            nusnet_id: res.data[i][NUSNET_ID],
            house: res.data[i][HOUSE],
            telegram_id: res.data[i][TELEGRAM_ID],
          });
        }
        setUsers(userArray);
      })
      .catch((error) => console.log(error.response));
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (index, telegramId) => {
    setShow(true);
    setTelegramId(telegramId);
    setUserIndex(index);
  };

  const handlePress = () => {
    setShow(false);
    const userJson = {
      telegram_id: telegram_id,
    };
    axios
      .delete(`${baseURL}users`, { data: userJson })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.request) {
          console.log(error.request);
        }
        if (error.response) {
          console.log(error.response);
        }
      });
    var newArray = users;
    newArray.splice(userIndex, 1);
    setUsers([...newArray]);
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
          <Button variant="danger" onClick={() => handlePress()}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>NUSNET ID</th>
            <th>House</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.nusnet_id}</td>
                <td>{user.house}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShow(index, user.telegram_id)}
                  >
                    Remove
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
export default Residents;
