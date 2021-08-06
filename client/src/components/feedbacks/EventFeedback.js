import React from "react";
import { Container, Dropdown, ListGroup } from "react-bootstrap";
import axios from "axios";

const EventFeedback = () => {
  // const events = ["Orientation", "RC4Welfare", "Acai Welfare"];
  // const feedbacks = [
  //   {
  //     eventName: "Orientation",
  //     eventFeedback: [
  //       "Why is orientation on zoom I want a refund!",
  //       "Omg can we hold it again?",
  //     ],
  //   },
  //   {
  //     eventName: "RC4Welfare",
  //     eventFeedback: ["Our RC4Welfare was so good!"],
  //   },
  //   {
  //     eventName: "Acai Welfare",
  //     eventFeedback: ["There was an ant in my acai bowl wth?"],
  //   },
  // ];
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [dropdownItem, setDropdownItem] = React.useState(null);

  React.useEffect(() => {
    const eventType = {
      eventType: "past",
    };

    axios
      .get(`http://127.0.0.1:5000/events`, { params: eventType })
      .then((res) => {
        const eventArray = [];
        for (var i = 0; i < res.data.length; i++) {
          eventArray.push(res.data[i][0]);
        }
        setEvents(eventArray);
        setDropdownItem(eventArray[0]);
        const eventName = {
          eventName: eventArray[0],
        };

        axios
          .get(`http://127.0.0.1:5000/feedbacks`, { params: eventName })
          .then((res) => {
            const feedbackArray = [];
            for (var i = 0; i < res.data.length; i++) {
              feedbackArray.push(res.data[i][2]);
            }
            setFeedbacks(feedbackArray);
          })
          .catch((error) => console.log(error.response));
      });
  }, []);

  const handlePress = (event) => {
    const eventName = {
      eventName: event,
    };

    axios
      .get(`http://127.0.0.1:5000/feedbacks`, { params: eventName })
      .then((res) => {
        const feedbackArray = [];
        for (var i = 0; i < res.data.length; i++) {
          feedbackArray.push(res.data[i][2]);
        }
        setFeedbacks(feedbackArray);
      })
      .catch((error) => console.log(error.response));
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
      <ListGroup>
        {feedbacks.map((feedbackString, index) => {
          return (
            <ListGroup.Item key={index}>
              {index + 1}. {feedbackString}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};
export default EventFeedback;
