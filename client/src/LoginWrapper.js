import React from "react";
import {
    Container,
    Form,
    Button,
    Alert,
} from "react-bootstrap";
import App from "./App";
import { username, password } from "./common/Constants";
import "./LoginWrapper.css";

const LoginWrapper = () => {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmitClick = (event) => {
        if (event.target.username.value === username && event.target.password.value === password) {
            setIsAuthenticated(true);
        } else {
            setErrorMessage("Access denied.")
            event.preventDefault();
            event.target.reset();
        }
    };

    return <div>
        {!isAuthenticated && (
            <Container className="login">
                <Form onSubmit={handleSubmitClick}>
                    <h2>Welcome to RC4 Welfare Bot</h2>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    {errorMessage && <Alert variant="danger"> {errorMessage}</Alert>}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>)}
        {isAuthenticated && <App />}
    </div>

};

export default LoginWrapper;