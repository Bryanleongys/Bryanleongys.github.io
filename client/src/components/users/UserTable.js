import React from "react";
import { Container, Table, Button, Form, Alert, Card } from "react-bootstrap";
import axios from "axios";

const USER_NAME = 1;
const TELEGRAM_ID = 2;

// Helper function to check if input is a number
function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) &&
         !isNaN(parseFloat(str))
}

const UserTable = ({ event }) => {
  // make query using event name
  // const userArray = [
  //   "smulboi",
  //   "bryanwhl",
  //   "smulboi",
  //   "bryanwhl",
  //   "smulboi",
  //   "bryanwhl",
  //   "smulboi",
  //   "bryanwhl",
  //   "smulboi",
  //   "bryanwhl",
  // ];

  const [userArray, setUserArray] = React.useState([]); // array of object
  const initialArray = new Array(userArray.length).fill(0);
  const [pax, setPax] = React.useState(null);
  const [shouldHighlight, setShouldHighlight] = React.useState(initialArray);
  const [sendAlert, setSendAlert] = React.useState(false);
  const [selectedAlert, setSelectedAlert] = React.useState(false);
  const [colorChosen, setColorChosen] = React.useState("#52cca2");
  const [colorRest, setColorRest] = React.useState("#fff");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [choiceArray, setChoiceArray] = React.useState(null);
  const [choicePax, setChoicePax] = React.useState(null);

  const formProps = isSubmitted ? { disabled: true } : {};
  const randomProps = isSelected ? { disabled: true } : {};
  const sendProps = isSent ? { disabled: true } : {};

  React.useEffect(() => {
    const eventJson = {
      eventName: event[0],
    };

    axios
      .get(`http://127.0.0.1:5000/users`, { params: eventJson })
      .then((res) => {
        var arrayUser = [];
        for (var i = 0; i < res.data.length; i++) {
          arrayUser.push({
            telegram_id: res.data[i][TELEGRAM_ID],
            name: res.data[i][USER_NAME],
          });
        }
        setUserArray(arrayUser);
      })
      .catch((error) => console.log(error.response));
  }, []);

  React.useEffect(() => {
    if (event[8] === '1') {
      const eventJson = {
        eventName: event[0],
      };
      axios
      .get(`http://127.0.0.1:5000/events/choices`, { params: eventJson })
      .then((res) => {
        console.log(res.data)
        setChoiceArray(res.data);
        let tempArray = [];
        res.data.map(choice => {
          tempArray.push("");
        })
        console.log(tempArray)
        setChoicePax(tempArray)
      })
      .catch((error) => console.log(error.response));
    }
  }, []);

  const handleSubmit = () => {
    if (pax > userArray.length || pax == null || pax == 0) {
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
    setIsSubmitted(true);
    setShouldHighlight(array);
  };

  const handleSend = () => {
    console.log("Send Button Pressed");
    for (var i = 0; i < shouldHighlight.length; i++) {
      const eventJson = {
        chat_id: userArray[i].telegram_id,
        event: event[0],
      };
      if (shouldHighlight[i]) {
        axios.post(`http://127.0.0.1:5000/users`, eventJson);
      }
    }
    setIsSent(true);
  };

  const handleSelect = () => {
    if (pax == 0 || pax == null) {
      setSelectedAlert(true);
      return;
    }
    setIsSelected(true);
    setSelectedAlert(false);
    setColorChosen("#52ffa2");
    setColorRest("#e1e1e1");
  };

  const handleRandomize = () => {
    let validated = true;
    choicePax.map(choice => {
      if (isNumeric(choice) === false) {
        validated = false;
      }
    })
    if (validated === true) {
      let choiceJson = {
        choicePax: choicePax
      }
      axios
      .get(`http://127.0.0.1:5000/users/shuffle`, { params: choiceJson })
      .then((res) => {
        var arraySet = [];
        for (var i = 0; i < res.data.length; i++) {
          arraySet.push({
            telegram_id: res.data[i][TELEGRAM_ID],
            name: res.data[i][USER_NAME],
          });
        }
        setUserArray(arraySet);
      })
      .catch((error) => console.log(error.response));
    }
  };

  const handleRefresh = () => {
    setShouldHighlight(initialArray);
    setIsSubmitted(false);
    setIsSelected(false);
    setIsSent(false);
    setColorChosen("#52cca2");
    setColorRest("#fff");
  };

  return (
    <Container>
      <h3>Manage {event[0]}</h3>
      <Form style={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="mb-3">
            <Form.Label>Number of People</Form.Label>
            <Form.Control
              required
              value={pax}
              onChange={(e) => setPax(e.target.value)}
              placeholder="e.g. 3"
              {...formProps}
            />
            <Form.Text className="text-muted">
              Key in no. of pax to receive giveaway
            </Form.Text>
          </div>
          {choiceArray !== null ? choiceArray.map ((choice, index) => {
          return <div>
            <Form.Label>No. of pax for {choice[2]}</Form.Label>
            <Form.Control
              required
              className="mb-3"
              defaultValue={choicePax[index]}
              onChange={(e) => {
                let tempArray = choicePax;
                tempArray[index] = e.target.value;
                console.log(tempArray);
                setChoicePax(tempArray)
              }}
              placeholder="e.g. 3"
              {...formProps}
            />
          </div>
          }) : null
          }
          {sendAlert ? (
            <Alert variant="danger">Please key in a valid input!</Alert>
          ) : null}
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} {...formProps}>
          Submit
        </Button>
        <Button
          variant="primary"
          onClick={handleRefresh}
          style={styles.confirmButton}
        >
          Refresh
        </Button>
      </Form>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Names</th>
          </tr>
        </thead>
        <tbody>
          {userArray.map((user, index) => {
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
                <td>{user.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={handleRandomize} {...randomProps}>
        {" "}
        Randomize{" "}
      </Button>
      {isSelected ? (
        <Button
          style={styles.confirmButton}
          onClick={handleSend}
          {...sendProps}
        >
          Send Message
        </Button>
      ) : (
        <Button style={styles.confirmButton} onClick={handleSelect}>
          Select Highlighted People
        </Button>
      )}

      <br></br>
      <br></br>

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
