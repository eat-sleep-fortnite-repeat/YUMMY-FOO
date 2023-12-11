// components/HomePage.jsx
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';
import Recipe from '../components/Recipe';

const UserHome = () => {
  const { ready, recipeInfo } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    const rdy = subscription.ready();
    const recipeItems = Recipes.collection.find({}).fetch();
    return {
      recipeInfo: recipeItems,
      ready: rdy,
    };
  }, []);

  // Filter recipes based on whether the user's ID is present in the owner array
  const filteredRecipes = recipeInfo.filter(recipe => recipe.owner.includes(Meteor.user().emails[0].address));

  return (
    ready ? (
      <Container id="favorites-page">
        <h1 className="py-3">Favorites</h1>
        <Row className="mt-2 pb-4">
          <Col className="px-3" xs={1}>
            <Link to="/search">
              <Button variant="primary" block>
                Search
              </Button>
            </Link>
          </Col>
          <Col xs={1} className="w-25 px-3">
            <Link to="/addrecipe">
              <Button variant="primary" block>
                Add Recipe
              </Button>
            </Link>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4 pb-5">
          {filteredRecipes.map((recipe) => (
            <Col key={recipe._id}>
              <Recipe recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default UserHome;
