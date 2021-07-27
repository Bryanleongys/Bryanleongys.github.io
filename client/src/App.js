import React, { useState } from 'react';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './App.css';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const App = () => (
  <Container className="p-3">
    <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href="#home">RC4 Welfare Bot</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#manage-events">Manage Events</Nav.Link>
        <Nav.Link href="#manage-users">Manage Users</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
    <h1 className="header">Welcome To RC4 Welfare Bot</h1>
    <ExampleToast>
      We now have Toasts
      <span role="img" aria-label="tada">
        🎉
      </span>
    </ExampleToast>
  </Container>
);

export default App;
