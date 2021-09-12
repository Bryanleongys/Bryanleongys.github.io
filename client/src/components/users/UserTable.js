import React from "react";
import { Container, Table, Button, Form, Alert, Card } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../common/Constants";

const USER_NAME = 1;
const TELEGRAM_ID = 2;
const TELEGRAM_HANDLE = 3;
const COLLECTION_TIME = 4;
const ITEM_CHOSEN = 5;
const ITEM_BOOL = 7;

// Helper function to check if input is a number
function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const UserTable = ({ event }) => {
  const [userArray, setUserArray] = React.useState([]); // array of object
  const initialArray = new Array(userArray.length).fill(0);
  const [pax, setPax] = React.useState(null);
  const [shouldHighlight, setShouldHighlight] = React.useState(initialArray);
  const [randomizeAlert, setRandomizeAlert] = React.useState(false);
  const [sendAlert, setSendAlert] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [choiceArray, setChoiceArray] = React.useState(null);
  const [choicePax, setChoicePax] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  // Unused States (might remove)
  // const [colorChosen, setColorChosen] = React.useState("#52cca2");
  // const [colorRest, setColorRest] = React.useState("#fff");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);

  const formProps = isSubmitted ? { disabled: true } : {};
  const randomProps = isSelected ? { disabled: true } : {};
  const sendProps = isSent ? { disabled: true } : {};

  React.useEffect(() => {
    const eventJson = {
      eventName: event[0],
    };

    axios
      .get(`${baseURL}users/event`, { params: eventJson })
      .then((res) => {
        var arrayUser = [];
        for (var i = 0; i < res.data.length; i++) {
          arrayUser.push({
            telegram_id: res.data[i][TELEGRAM_ID],
            name: res.data[i][USER_NAME],
            telegram_handle: res.data[i][TELEGRAM_HANDLE],
            item_chosen: res.data[i][ITEM_CHOSEN],
            collection_time: res.data[i][COLLECTION_TIME],
          });
        }
        setUserArray(arrayUser);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    if (event[ITEM_BOOL] === "1") {
      const eventJson = {
        eventName: event[0],
      };
      axios
        .get(`${baseURL}events/choices`, { params: eventJson })
        .then((res) => {
          setChoiceArray(res.data);
          let tempArray = [];
          res.data.map((choice) => {
            tempArray.push("");
          });
          setChoicePax(tempArray);
          console.log(tempArray);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  }, []);

  const handleRandomize = () => {
    let validated = true;
    if (isNumeric(pax) === false) {
      validated = false;
    }
    if (choicePax) {
      var totalPax = 0;
      choicePax.map((pax, index) => {
        totalPax += parseInt(pax);
      });
      if (totalPax != pax || pax > userArray.length || pax == 0) {
        validated = false;
      }
      choicePax.map((choice) => {
        if (isNumeric(choice) === false) {
          validated = false;
        }
      });
    } else {
      // if no choices available
      if (pax > userArray.length || pax == 0) {
        validated = false;
      }
    }
    if (validated == false) {
      return setRandomizeAlert(true);
    } else {
      setRandomizeAlert(false);
      let choiceJson = {
        eventName: event[0],
        choicePax: choicePax,
        totalPax: pax,
      };
      axios
        .get(`${baseURL}users/shuffle`, { params: choiceJson })
        .then((res) => {
          var arraySet = [];
          for (var i = 0; i < res.data.length; i++) {
            arraySet.push({
              telegram_id: res.data[i][TELEGRAM_ID],
              name: res.data[i][USER_NAME],
              telegram_handle: res.data[i][TELEGRAM_HANDLE],
              item_chosen: res.data[i][ITEM_CHOSEN],
              collection_time: res.data[i][COLLECTION_TIME],
            });
          }

          console.log(arraySet);
          console.log(userArray);

          // Change shouldHighlight list
          // var i = 0; // counter for userArray
          // var j = 0; // counter for arraySet
          // while (i < userArray.length) {
          //   if (
          //     j < arraySet.length &&
          //     userArray[i].telegram_id == arraySet[j].telegram_id
          //   ) {
          //     array.push(1);
          //     j++;
          //   } else {
          //     array.push(0);
          //   }
          //   i++;
          // }
          var array = [];
          for (var i = 0; i < userArray.length; i++) {
            if (
              arraySet.some((e) => e.telegram_id === userArray[i].telegram_id)
            ) {
              array.push(1);
            } else {
              array.push(0);
            }
          }
          console.log(array);
          setShouldHighlight(array);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  };

  const handleSend = () => {
    var totalCondition = 0;
    shouldHighlight.map((condition, index) => {
      totalCondition += parseInt(condition);
    });
    if (totalCondition == 0) {
      return setSendAlert(true);
    }
    setSendAlert(false);
    for (var i = 0; i < shouldHighlight.length; i++) {
      const eventJson = {
        chat_id: userArray[i].telegram_id,
        message: message,
      };
      if (shouldHighlight[i]) {
        axios.post(`${baseURL}users/event`, eventJson);
      }
    }
    setIsSent(true);
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
          {choiceArray !== null
            ? choiceArray.map((choice, index) => {
                return (
                  <div>
                    <Form.Label>No. of pax for {choice[2]}</Form.Label>
                    <Form.Control
                      required
                      className="mb-3"
                      defaultValue={choicePax === null ? "" : choicePax[index]}
                      onChange={(e) => {
                        let tempArray = choicePax;
                        tempArray[index] = e.target.value;
                        setChoicePax(tempArray);
                      }}
                      placeholder="e.g. 3"
                      {...formProps}
                    />
                  </div>
                );
              })
            : null}
          {randomizeAlert ? (
            <Alert variant="danger">Please key in valid inputs!</Alert>
          ) : null}
        </Form.Group>
        <Button variant="primary" onClick={handleRandomize} {...formProps}>
          Generate List Of Welfare Recipients
        </Button>
        {/* <Button
          variant="primary"
          onClick={handleRefresh}
          style={styles.confirmButton}
        >
          Refresh
        </Button> */}
      </Form>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Names</th>
            <th>Telegram Handle</th>
            <th>Item Chosen</th>
            <th>Collection Time</th>
          </tr>
        </thead>
        <tbody>
          {userArray.map((user, index) => {
            return (
              <tr
                style={{
                  backgroundColor: shouldHighlight[index] ? "#52cca2" : "#fff",
                }}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.telegram_handle}</td>
                <td>{user.item_chosen}</td>
                <td>{user.collection_time}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Confirmation Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="You have been selected! Please head down to the dining hall at your respective time slot to collect your welfare."
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Button onClick={handleSend} {...randomProps} disabled={isSent}>
        {" "}
        Send Welfare Message To Recipients{" "}
      </Button>

      <br></br>
      <br></br>

      {sendAlert ? (
        <Alert variant="danger">No user selected! Please generate list.</Alert>
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
