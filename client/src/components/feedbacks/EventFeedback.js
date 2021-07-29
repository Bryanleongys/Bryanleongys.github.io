import React from "react";
import { Container, Dropdown, ListGroup } from "react-bootstrap";

const EventFeedback = () => {
  const events = ["Orientation", "RC4Welfare", "Acai Welfare"];
  const feedbacks = [
    {
      eventName: "Orientation",
      eventFeedback: [
        "Why is orientation on zoom I want a refund!",
        "Omg can we hold it again?",
      ],
    },
    {
      eventName: "RC4Welfare",
      eventFeedback: ["Our RC4Welfare was so good!"],
    },
    {
      eventName: "Acai Welfare",
      eventFeedback: ["There was an ant in my acai bowl wth?"],
    },
  ];
  const [dropdownItem, setDropdownItem] = React.useState(events[0]);

  const showList = () => {
    var index = feedbacks
      .map((e) => {
        return e.eventName;
      })
      .indexOf(dropdownItem);
    return (
      <ListGroup>
        {feedbacks[index].eventFeedback.map((feedbackString, index) => {
          return (
            <ListGroup.Item key={index}>
              {index + 1}. {feedbackString}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  const handlePress = (event) => {
    setDropdownItem(event);
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
      {showList()}
    </Container>
  );
};
export default EventFeedback;
