import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeAdmin from '../components/RecipeAdmin';
import EditRecipe from './EditRecipe';
import '../../api/recipes/methods';

const ListRecipeAdmin = () => {
  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    return {
      recipes: Recipes.collection.find({}).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const applySearch = () => {
    if (!searchTerm.trim()) {
      setData(recipes);
      return;
    }

    const filteredData = recipes.filter((item) => {
      const fieldsToSearch = ['name', 'time', 'cost', 'filter', 'appliances', 'ingredients', 'recipe'];

      return fieldsToSearch.some((field) => {
        const fieldValue = item[field];
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(
            (element) => typeof element === 'string' &&
              element.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        } if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });

    setData(filteredData);
  };

  useEffect(() => {
    if (ready) {
      applySearch();
    }
  }, [ready, searchTerm, recipes]);

  const resetSearch = () => {
    setSearchTerm('');
    setData(recipes);
  };

  const removeRecipe = (recipeId) => {
    setData((prevData) => prevData.filter((recipe) => recipe._id !== recipeId));
    Recipes.collection.remove(recipeId);
    swal('Success', 'Recipe removed successfully', 'success');
  };

  const openEditModal = (recipeId) => {
    // eslint-disable-next-line no-shadow
    const selectedRecipe = recipes.find((recipe) => recipe._id === recipeId);
    setSelectedRecipe(selectedRecipe);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedRecipe(null);

    const updatedRecipes = Recipes.collection.find({}).fetch();
    setData(updatedRecipes);
  };

  return ready ? (
    <Container id="list-recipe-admin-page" className="py-3">
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <h1 className="text-center">List Recipe Admin</h1>
              <Form.Control
                id="admin-searchbar"
                type="text"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" className="mt-3" onClick={resetSearch}>
          Reset Search
        </Button>
      </Form>
      <Row className="mt-4">
        {data.map((item, index) => (
          <Col key={index} sm={6} md={4} lg={6} className="mb-4">
            <div className="recipe-card-container">
              {/* Add some padding or margin to create space */}
              <RecipeAdmin recipe={item} />
              <div className="d-flex justify-content-between mt-4">
                <Button variant="info" id="admin-edit-button" onClick={() => openEditModal(item._id)}>
                  Edit Recipe
                </Button>
                <Button variant="danger" id="admin-remove-button" onClick={() => removeRecipe(item._id)}>
                  Remove Recipe
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {selectedRecipe && (
        <Modal show={editModalOpen} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Pass the selected recipe, not just the recipe ID */}
            <EditRecipe recipe={selectedRecipe} onClose={closeEditModal} />
          </Modal.Body>
        </Modal>
      )}
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ListRecipeAdmin;
