import React from "react";
import {
  InputGroup,
  FormControl,
  Row,
  Col,
  FloatingLabel,
  Container,
  Form,
  Table,
  Button,
  Nav,
  Dropdown,
  DropdownButton,
  Alert,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { Plus } from "react-bootstrap-icons";

const AddEventForm = () => {
  const [eventName, setEventName] = React.useState(null);
  const [eventType, setEventType] = React.useState("Future Event");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [collectionDate, setCollectionDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [choiceArray, setChoiceArray] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [question, setQuestion] = React.useState("");
  const [submitType, setSubmitType] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);

  const handlePostRequest = () => {
    const eventJson = {
      requestType: "add_event",
      eventName: eventName,
      eventType: eventType,
      startDate: startDate,
      endDate: endDate,
      collectionDate: collectionDate,
      startTime: startTime,
      endTime: endTime,
      message: message,
      question: question,
      choiceArray: choiceArray,
    };

    axios
      .post(`http://127.0.0.1:5000/events`, eventJson)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSubmitClick = (event) => {
    if (
      eventName !== null &&
      startDate !== null &&
      endDate !== null &&
      collectionDate !== null &&
      startTime !== null &&
      endTime !== null &&
      message !== null
    ) {
      setValidated(true);
    }
  };

  const handleSubmitCheck = (eventName) => {
    const eventJson = {
      requestType: "check",
      eventName: eventName,
    };

    axios
      .post(`http://127.0.0.1:5000/events`, eventJson)
      .then((res) => {
        if (!res.data) {
          setSubmitType("submit");
          setShowToast(false);
        } else {
          setSubmitType("");
          setShowToast(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    if (validated === true) {
      handlePostRequest();
    }
  });

  return (
    <Container>
      <Form onSubmit={handleSubmitClick}>
        <h2>Create an event</h2>
        <br></br>
        <Form.Label htmlFor="basic-url">Event Name:</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            required
            placeholder="e.g. Recess Week Welfare"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setEventName(e.target.value);
              handleSubmitCheck(e.target.value);
            }}
          />
        </InputGroup>
        <Row>
          <Col xs={6}>
            <Toast bg={"danger"} show={showToast}>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">
                  Event name already exists! Please use different name.
                </strong>
              </Toast.Header>
              {/* <Toast.Body>Event Name already exists!</Toast.Body> */}
            </Toast>
          </Col>
        </Row>

        <Form.Label htmlFor="basic-url">Event Type:</Form.Label>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={eventType === null ? "Select Type" : eventType}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item as="button">
              <div onClick={(e) => setEventType(e.target.textContent)}>
                Future Event
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => setEventType(e.target.textContent)}>
                Current Event
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => setEventType(e.target.textContent)}>
                Past Event
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>

        <Form.Label htmlFor="basic-url">Event Duration:</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
          <Form.Control
            required
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
          <Form.Control
            required
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Collection Date:</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            required
            type="date"
            onChange={(e) => setCollectionDate(e.target.value)}
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Collection Time:</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Start Time</InputGroup.Text>
          <Form.Control
            required
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
          />
          <InputGroup.Text id="basic-addon1">End Time</InputGroup.Text>
          <Form.Control
            required
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Confirmation Message:</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            required
            placeholder="e.g. You have been selected for Recess Week Welfare. Please remember to make your payment on www.payment.com!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setMessage(e.target.value)}
            as="textarea"
            rows={3}
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Question To Ask (Optional)</Form.Label>

        <Col md>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="e.g. What is your desired sugar level?"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md>
          {choiceArray.map((choice, index) => {
            return (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Option {index + 1}
                  </InputGroup.Text>
                  <FormControl
                    defaultControl
                    defaultValue={choice}
                    placeholder="e.g. 25% Sugar"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      let tempArray = choiceArray;
                      tempArray[index] = e.target.value;
                      console.log(tempArray);
                      return tempArray;
                    }}
                  />
                </InputGroup>
              </div>
            );
          })}
        </Col>
        <Button onClick={() => setChoiceArray((oldArray) => [...oldArray, ""])}>
          <Plus />
          Add Option
        </Button>

        <br></br>
        <br></br>
        <br></br>

        <Button variant="primary" type={submitType}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddEventForm;
