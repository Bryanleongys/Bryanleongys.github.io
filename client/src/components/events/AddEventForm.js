import React from 'react'
import { InputGroup, FormControl, Container, Form, Table, Button, Nav } from "react-bootstrap";

const AddEventForm = () => {
  return (
    <Container>
      <h2>Create an event</h2>
      <br></br>
      <Form.Label htmlFor="basic-url">Event Name</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="e.g. Recess Week Welfare"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>

      <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          https://example.com/users/
        </InputGroup.Text>
        <FormControl id="basic-url" aria-describedby="basic-addon3" />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <FormControl as="textarea" aria-label="With textarea" />
      </InputGroup>
    </Container>
  )
}

export default AddEventForm
