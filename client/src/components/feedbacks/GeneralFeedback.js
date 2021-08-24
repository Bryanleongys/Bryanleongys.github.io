import React from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../common/Constants";

const EVENT_NAME = 0;
const USER_NAME = 1;
const FEEDBACK_MESSAGE = 2;

const GeneralFeedback = () => {
  // const feedbacks = [
  //   "Thank you for giving out welfare packs to us! We loved it",
  //   "Thank you RC4Welfare!",
  //   "Omg why are there ants around RC4Welfare?",
  // ];
  const [feedbacks, setFeedbacks] = React.useState([]); // array of objects
  React.useEffect(() => {
    const eventName = {
      eventName: "general",
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
  }, []);

  return (
    <Container>
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
export default GeneralFeedback;
