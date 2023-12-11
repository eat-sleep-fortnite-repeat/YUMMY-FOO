import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const isLogged = Meteor.userId() !== null;
  return (
    <footer className="mt-auto py-3 bg-light border-top border-dark">
      <Container>
        <Col className="text-center">
          <Link to="/about" style={{ textDecoration: 'none', marginRight: '10px' }}>
            About
          </Link>
          {isLogged ? (
            <Link to="/home" style={{ textDecoration: 'none', marginRight: '10px' }}>
              Home
            </Link>
          ) : (
            <Link to="/" style={{ textDecoration: 'none', marginRight: '10px' }}>
              Home
            </Link>
          )}
          <a href="https://eat-sleep-fortnite-repeat.github.io/eat-sleep-foo-repeat.github.io/">
            Project Home Page
          </a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
