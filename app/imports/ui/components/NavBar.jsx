import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar className="border-bottom border-dark" bg="light" expand="lg">
      <Container>
        <Navbar>
          <Nav.Link id="nav-logo" as={NavLink} to="/home">
            <Image width="125px" alt="Yummy Foo Logo" src="https://raw.githubusercontent.com/eat-sleep-fortnite-repeat/eat-sleep-foo-repeat.github.io/main/doc/yummyfoologo.png" />
          </Nav.Link>
        </Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className="px-2" id="about-nav" as={NavLink} to="/about" key="about">About Us</Nav.Link>
            {currentUser ? ([
              <Nav.Link className="px-2" id="add-recipe-nav" as={NavLink} to="/addrecipe" key="examplerecipe">Add Recipe</Nav.Link>,
              <Nav.Link className="px-2" id="favorites-nav" as={NavLink} to="/favorites" key="favorites">Favorites</Nav.Link>,
              <Nav.Link className="px-2" id="search-nav" as={NavLink} to="/search" key="search">Search</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className="justify-content-end p-1">
        <div id="google_translate_element" />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
