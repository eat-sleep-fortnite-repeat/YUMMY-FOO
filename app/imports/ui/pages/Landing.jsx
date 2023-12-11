import React from 'react';
import { Container, Carousel, Image, Row, Col } from 'react-bootstrap';

const Landing = () => {
  const body = document.body;
  body.style.backgroundColor = '#00000';
  return (
    <Container id="landing-page" fluid className="my-auto text-center">
      <Carousel className="py-5" id="carousel">
        <Carousel.Item id="carousel-item">
          <Image src="https://github.com/eat-sleep-fortnite-repeat/YUMMY-FOO/blob/main/lumpia.jpg?raw=true" text="First slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item id="carousel-item">
          <Image src="https://github.com/eat-sleep-fortnite-repeat/YUMMY-FOO/blob/main/friedRice.jpg?raw=true" text="Second slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item id="carousel-item">
          <Image src="https://github.com/eat-sleep-fortnite-repeat/YUMMY-FOO/blob/main/curry.jpg?raw=true" text="Third slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item className="carousel-image">
          <Image
            src="https://github.com/eat-sleep-fortnite-repeat/YUMMY-FOO/blob/main/musubi.jpg?raw=true"
            text="Fourth slide"
            className="carousel-image"
          />
        </Carousel.Item>
      </Carousel>
      <Row> <br /> </Row>
      <Container>
        <Row>
          <Col><Image src="https://github.com/eat-sleep-fortnite-repeat/YUMMY-FOO/blob/main/book.jpg?raw=true" className="py-5" width="400px" /></Col>
          <Col>
            <div className="landing-blurb1 pe-5 fs-5">
              Yummy Foo is dedicated to setting up college students for success in the kitchen!
              <br />
              <br />
              With our continuously growing database of recipes our goal is to provide students with affordable and accessible meals within their time and skill range.
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="landing-blurb2 ps-5 fs-5">
              Students can browse through recipes provided by their fellow students and learn to cook new dishes!
              <br />
              <br />
              Please feel free to add in any of your own special recipes and secret techniques as well!
            </div>
          </Col>
          <Col><Image src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/09/uhm-students-courtyard-1024x597.jpg" className="py-5" width="400px" /></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Landing;
