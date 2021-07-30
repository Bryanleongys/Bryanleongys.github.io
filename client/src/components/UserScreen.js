import React from "react";
import { Container, Dropdown, Nav } from "react-bootstrap";

const UserScreen = () => {
  const events = ["Orientation Welfare", "RC4 Welfare", "Recess Week Welfare"];
  const user = [
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
          <Nav.Link href="/signups">Sign Ups</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/selected">Selected</Nav.Link>
        </Nav.Item>
      </Nav>
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
    </Container>
  );
};
export default UserScreen;
