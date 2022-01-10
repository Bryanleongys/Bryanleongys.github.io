import React from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../common/Constants";

// Constants
const EVENT_NAME = 1;
const USER_NAME = 2;
const FEEDBACK_MESSAGE = 2;

const EventFeedback = () => {
  const [feedbacks, setFeedbacks] = React.useState([]); // array of objects
  const [events, setEvents] = React.useState([]);
  const [dropdownItem, setDropdownItem] = React.useState(null);

  React.useEffect(() => {
    const eventType = {
      eventType: "past",
    };

    axios.get(`${baseURL}events`, { params: eventType }).then((res) => {
      const eventArray = [];
      for (var i = 0; i < res.data.length; i++) {
        eventArray.push(res.data[i][EVENT_NAME]);
      }
      setEvents(eventArray);
      setDropdownItem(eventArray[0]); // first option
      const eventName = {
        eventName: eventArray[0],
      };

      axios
        .get(`${baseURL}feedbacks`, { params: eventName })
        .then((res) => {
          const feedbackArray = [];
          for (var i = 0; i < res.data.length; i++) {
            feedbackArray.push({
              name: res.data[i][USER_NAME],
              message: res.data[i][FEEDBACK_MESSAGE],
            });
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
      .get(`${baseURL}feedbacks`, { params: eventName })
      .then((res) => {
        const feedbackArray = [];
        for (var i = 0; i < res.data.length; i++) {
          feedbackArray.push({
            name: res.data[i][USER_NAME],
            message: res.data[i][FEEDBACK_MESSAGE],
          });
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
      {/* <ListGroup>
        {feedbacks.map((feedbackString, index) => {
          return (
            <ListGroup.Item key={index}>
              {index + 1}. {feedbackString}
            </ListGroup.Item>
          );
        })}
      </ListGroup> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Feedback Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{feedback.name}</td>
                <td>{feedback.message}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default EventFeedback;
