import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => (
  <Container id="about-page" fluid className="my-auto text-center">
    <h2>About The Project</h2><br />
    <h3>Our Goal</h3>
    <p>
      Our goal for this project is to create an information hub where students of UH Manoa can find, share, and learn new and creative recipes that will fit within the budget of a college student. For convenience and money’s sake, the
      majority of students will buy fast food or take out for their meals. However, this can lead to unhealthy eating habits as well as a selection of food that might not fit the constraints of every student, whether that be food
      allergies or intolerances.
    </p>
    <p>
      To remedy this, our website will prompt UH students to begin or expand on their culinary education, learning how to cook up meals that will fit their specific needs. We hope that with the large selection of vendors, pricing
      information, ingredient convenience, as well as acknowledgment of dietary constrictions, this will be able to help all students of UH Manoa.
    </p>
    <h3>Meet the Team</h3>
    <Row>
      <Col>
        <p>
          <strong>Aiden Woodard</strong>
          <br />
          <a href="https://github.com/aidenlkw" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Col>
      <Col>
        <p>
          <strong>Kye Steele</strong>
          <br />
          <a href="https://github.com/kyesteele" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Col>
      <Col>
        <p>
          <strong>Catelyn Jochim</strong>
          <br />
          <a href="https://github.com/cjochim" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Col>
      <Col>
        <p>
          <strong>Mairi Yoshioka</strong>
          <br />
          <a href="https://github.com/mair1" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Col>
      <Col>
        <p>
          <strong>David Rickards</strong>
          <br />
          <a href="https://github.com/davidrickards" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Col>
    </Row>
    <br /> {/* Add a line break */}
    <p>
      Check out our <a href="https://github.com/eat-sleep-fortnite-repeat" target="_blank" rel="noopener noreferrer">GitHub Organization</a>.
    </p>
  </Container>
);

export default About;
