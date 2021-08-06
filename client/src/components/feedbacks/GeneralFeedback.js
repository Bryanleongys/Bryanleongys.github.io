import React from "react";
import { Container, Dropdown, ListGroup } from "react-bootstrap";
import axios from "axios";

const GeneralFeedback = () => {
  // const feedbacks = [
  //   "Thank you for giving out welfare packs to us! We loved it",
  //   "Thank you RC4Welfare!",
  //   "Omg why are there ants around RC4Welfare?",
  // ];
  const [feedbacks, setFeedbacks] = React.useState([]);
  React.useEffect(() => {
    const eventName = {
      eventName: "general",
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
  }, []);

  return (
    <Container>
      <ListGroup>
        {feedbacks.map((feedback, index) => {
          return (
            <ListGroup.Item key={index}>
              {index + 1}. {feedback}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};
export default GeneralFeedback;
