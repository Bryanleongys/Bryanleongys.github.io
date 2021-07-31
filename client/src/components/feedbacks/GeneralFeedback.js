import React from "react";
import { Container, Dropdown, ListGroup } from "react-bootstrap";

const GeneralFeedback = () => {
  const feedbacks = [
    "Thank you for giving out welfare packs to us! We loved it",
    "Thank you RC4Welfare!",
    "Omg why are there ants around RC4Welfare?",
  ];
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
