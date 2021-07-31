import React from "react";
import { Container, Table, Button, Form, Alert, Card } from "react-bootstrap";

const UserTable = ({ event }) => {
  // make query using event name
  const userArray = [
    "smulboi",
    "bryanwhl",
    "smulboi",
    "bryanwhl",
    "smulboi",
    "bryanwhl",
    "smulboi",
    "bryanwhl",
    "smulboi",
    "bryanwhl",
  ];
  const initialArray = new Array(userArray.length).fill(0);

  const [pax, setPax] = React.useState();
  const [shouldHighlight, setShouldHighlight] = React.useState(initialArray);
  const [sendAlert, setSendAlert] = React.useState(false);
  const [selectedAlert, setSelectedAlert] = React.useState(false);
  const [colorChosen, setColorChosen] = React.useState("#52e1a2");
  const [colorRest, setColorRest] = React.useState("#fff");
  const [buttonText, setButtonText] = React.useState(
    "Selected Highlighted People"
  );

  const handleSubmit = () => {
    if (pax > userArray.length) {
      setSendAlert(true);
      return;
    }
    setSendAlert(false);
    var array = [];
    for (var i = 0; i < userArray.length; i++) {
      if (i < pax) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    setShouldHighlight(array);
  };

  const handleSelect = () => {
    if (pax == 0 || pax == null) {
      setSelectedAlert(true);
      return;
    }
    setSelectedAlert(false);
    setButtonText("Send Message");
    setColorChosen("#52ffa2");
    setColorRest("#c8c8c8");
  };

  return (
    <Container>
      <h3>Manage {event}</h3>
      <Form style={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of People</Form.Label>
          <Form.Control
            value={pax}
            onChange={(e) => setPax(e.target.value)}
            placeholder="Number"
          />
          <Form.Text className="text-muted">
            Key in no. of pax to receive giveaway
          </Form.Text>
          {sendAlert ? (
            <Alert variant="danger">Number exceeded number of users!</Alert>
          ) : null}
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Telegram Handle</th>
          </tr>
        </thead>
        <tbody>
          {userArray.map((handle, index) => {
            return (
              <tr
                style={{
                  backgroundColor: shouldHighlight[index]
                    ? colorChosen
                    : colorRest,
                }}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{handle}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button> Randomize </Button>
      <Button style={styles.confirmButton} onClick={handleSelect}>
        {buttonText}
      </Button>
      {selectedAlert ? (
        <Alert variant="danger">Please key in minimum one pax!</Alert>
      ) : null}
    </Container>
  );
};
const styles = {
  form: {
    marginBottom: 20,
  },
  confirmButton: {
    marginLeft: 30,
  },
};
export default UserTable;
