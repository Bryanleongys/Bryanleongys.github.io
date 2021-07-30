import React from "react";
import { Container, Dropdown, Nav } from "react-bootstrap";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import UserTable from "./users/UserTable";

const UserScreen = () => {
  let match = useRouteMatch();
  const events = ["Orientation Welfare", "RC4 Welfare", "Recess Week Welfare"];
  const eventSignUp = [
    { event: "Orientation Welfare", usernames: ["bryanwhl", "smulboi"] },
    { event: "RC4 Welfare", usernames: ["bryanlys", "bryant"] },
    { event: "Recess Week Welfare", usernames: ["smallboi", "smolboi99"] },
  ];
  const [dropdownItem, setDropdownItem] = React.useState(events[0]);

  const handlePress = (event) => {
    setDropdownItem(event);
  };

  const showTable = () => {
    return (
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/sign-ups`}>
            Sign Ups
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${match.url}/selected`}>
            Selected
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  };

  const showRoutes = () => {
    var index = eventSignUp
      .map((e) => {
        return e.event;
      })
      .indexOf(dropdownItem);
    var arrayHandles = eventSignUp[index].usernames;
    return (
      <Route path={`${match.url}/selected`}>
        <UserTable arrayHandles={arrayHandles} />
      </Route>
    );
  };

  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">{dropdownItem}</Dropdown.Toggle>
        <Dropdown.Menu>
          {events.map((event, index) => {
            return (
              <Dropdown.Item onClick={() => handlePress(event)} key={index}>
                {event}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      {showTable()}
      <Switch>{showRoutes()}</Switch>
    </Container>
  );
};
export default UserScreen;
