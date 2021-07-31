import React from 'react'
import { InputGroup, FormControl, Container, Form, Table, Button, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import axios from 'axios';

const AddEventForm = () => {

  const [eventType, setEventType] = React.useState("Future Event");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [collectionDate, setCollectionDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [validated, setValidated] = React.useState(false);

  const handlePostRequest = () => {
    const eventJson = {
      eventType: eventType,
      startDate: startDate,
      endDate: endDate,
      collectionDate: collectionDate,
      startTime: startTime,
      endTime: endTime
    }
    
    console.log(eventJson);

    axios.post(`http://127.0.0.1:5000/events`, eventJson)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  const handleSubmitClick = (event) => {

    const eventJson = {
      eventType: eventType,
      startDate: startDate,
      endDate: endDate,
      collectionDate: collectionDate,
      startTime: startTime,
      endTime: endTime
    }
    
    console.log(eventJson);
    
    if (startDate !== null && endDate !== null && collectionDate !== null && startTime !== null && endTime !== null) {
      setValidated(true);
    }
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
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Event Type:</Form.Label>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={eventType === null ? "Select Type" : eventType}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item as="button"><div onClick={(e) => setEventType(e.target.textContent)}>Future Event</div></Dropdown.Item>
            <Dropdown.Item as="button"><div onClick={(e) => setEventType(e.target.textContent)}>Current Event</div></Dropdown.Item>
            <Dropdown.Item as="button"><div onClick={(e) => setEventType(e.target.textContent)}>Past Event</div></Dropdown.Item>
          </DropdownButton>
        </InputGroup>

        <Form.Label htmlFor="basic-url">Event Duration:</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
          <Form.Control required type="date" onChange={(e) => setStartDate(e.target.value)} />
          <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
          <Form.Control required type="date" onChange={(e) => setEndDate(e.target.value)} />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Collection Date:</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control required type="date" onChange={(e) => setCollectionDate(e.target.value)} />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Collection Time:</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Start Time</InputGroup.Text>
          <Form.Control required type="time" onChange={(e) => setStartTime(e.target.value)} />
          <InputGroup.Text id="basic-addon1">End Time</InputGroup.Text>
          <Form.Control required type="time" onChange={(e) => setEndTime(e.target.value)} />
        </InputGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    
  )
}

export default AddEventForm
