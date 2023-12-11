import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecipeAdmin = ({ recipe }) => (
  <Card className="h-100 grow-on-hover" style={{ boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', border: 'none', borderRadius: '15px', borderBottomRadius: '0px', overflow: 'hidden', position: 'relative' }}>
    <Card.Header style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
      <Link to={`/examplerecipe/${recipe._id}`}>
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.name}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            maxHeight: '250px',
            objectFit: 'cover',
            borderTop: '15px',
          }}
        />
      </Link>
    </Card.Header>
    <Card.Body style={{ color: 'black', position: 'relative', zIndex: 1 }}>
      <Row>
        <Col>
          <Link to={`/examplerecipe/${recipe._id}`}>
            <Card.Title id="admin-recipe-name" style={{ fontSize: 'xx-large', marginBottom: '10px' }}>
              {recipe.name}
            </Card.Title>
          </Link>
        </Col>
      </Row>
      <Card.Text>Time: {recipe.time}</Card.Text>
      <Card.Text>Cost: {recipe.cost}</Card.Text>
      <Card.Text>Filter: {recipe.filter.join(', ')}</Card.Text>
      <Card.Text>Appliances: {recipe.appliances.join(', ')}</Card.Text>
      <Card.Text>Ingredients: {recipe.ingredients.join(', ')}</Card.Text>
      <Card.Text>
        Recipe:
        {recipe.recipe.split('|').map((line, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {line.trim()}
          </span>
        ))}
      </Card.Text>
    </Card.Body>
  </Card>
);

RecipeAdmin.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    filter: PropTypes.arrayOf(PropTypes.string).isRequired,
    appliances: PropTypes.arrayOf(PropTypes.string).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    recipe: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeAdmin;
