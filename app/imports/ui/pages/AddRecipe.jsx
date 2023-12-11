import React, { useRef, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Recipes } from '../../api/recipes/Recipes';
import { RecipeImages } from '../../api/recipes/RecipeImages';

const formSchema = new SimpleSchema({
  name: String,
  recipe: String,
  time: String,
  cost: String,
  ingredients: String,
  appliances: String,
  filter: { type: String, optional: true },
  dietary: {
    type: Array,
    optional: true,
  },
  'dietary.$': {
    type: String,
    allowedValues: ['Dairy-Free', 'Vegan', 'Gluten-Free', 'Vegetarian'],
  },
  image: {
    type: String,
    optional: true,
  },
  imageId: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddStuff = () => {
  const fRef = useRef();
  const [checkedDietary, setCheckedDietary] = useState([]);

  const handleCheckboxChange = (value) => {
    if (checkedDietary.includes(value)) {
      setCheckedDietary(checkedDietary.filter((option) => option !== value));
    } else {
      setCheckedDietary([...checkedDietary, value]);
    }
  };
  const submit = (data) => {
    console.log('Form Data:', data);
    const { name, recipe, time, cost, ingredients, appliances, image, filter } = data;
    const owner = Meteor.user().username;
    const imageFile = fRef?.current?.imageFile?.files[0]; // Assuming file input has a ref="imageFile"
    const imageId = imageFile ? RecipeImages.insert(imageFile) : null;
    Recipes.collection.insert(
      { name, recipe, time, cost, ingredients, appliances, dietary: checkedDietary, image, imageId, filter, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          setCheckedDietary([]);
          fRef.reset();
        }
      },
    );
  };
  return (
    <Container id="add-recipe-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2 className="text-white">Add Recipe</h2></Col>
          <AutoForm ref={fRef} schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" label="Recipe Name" id="add-recipe-name" /></Col>
                  <Col><TextField name="time" label="Estimated Time" id="add-recipe-time" /></Col>
                  <Col><TextField name="cost" label="Estimated Cost" id="add-recipe-cost" /></Col>
                  <Col><TextField name="filter" label="Filter" id="add-recipe-filter" /></Col>
                </Row>
                <LongTextField name="recipe" label="Recipe" id="add-recipe-directions" />
                <Row>
                  <Col><LongTextField name="ingredients" label="List Ingredients Needed" id="add-recipe-ingredients" /></Col>
                  <Col><LongTextField name="appliances" label="List Appliances Needed" id="add-recipe-appliances" /></Col>
                </Row>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Attach Image or URL of Dish</Form.Label>
                  {/* eslint-disable-next-line no-unused-expressions */}
                  <Form.Control type="file" ref={ref => { fRef && (fRef.imageFile = ref); }} />
                </Form.Group>
                <LongTextField label="" name="image" placeholder="URL of image" id="add-recipe-link" />
                <Form>
                  <div key="default-checkbox" className="mb-3">
                    Dietary Info
                    {['Dairy-Free', 'Vegan', 'Gluten-Free', 'Vegetarian'].map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        id={option.toLowerCase().replace('-', '')}
                        name="dietary"
                        label={option}
                        value={option}
                        checked={checkedDietary.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        data-testid={`dietary-checkbox-${option.toLowerCase()}`}
                      />
                    ))}
                  </div>
                </Form>
                <SubmitField value="Submit" className="text-center" id="add-recipe-submit" />
                <ErrorsField id="add-recipe-error" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStuff;
