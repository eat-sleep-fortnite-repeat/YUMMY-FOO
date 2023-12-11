// EditRecipe.jsx

import React, { useState } from 'react';
import swal from 'sweetalert';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipes/Recipes';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

const EditRecipe = ({ recipe, onClose }) => {
  const [formData] = useState(recipe);

  const submit = (data) => {
    const { _id, name, image, time, cost, filter, appliances, ingredients } = data;

    // Update the recipe directly in the client-side collection
    Recipes.collection.update(_id, {
      $set: { name, image, time, cost, filter, appliances, ingredients },
    });

    // Display success message
    swal('Success', 'Recipe updated successfully', 'success');
    onClose();
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2 className="text-white">Edit Recipe</h2></Col>
          <AutoForm id="admin-submit-button" schema={bridge} onSubmit={submit} model={formData} />
        </Col>
      </Row>
    </Container>
  );
};

EditRecipe.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipe: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditRecipe;
