import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipes/Recipes.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
let counter = 0;
const addRecipe = (recipe) => {
  console.log(`  Adding: ${recipe.name} (${recipe.owner})${counter}`);
  counter++;
  Recipes.collection.insert(recipe);
};

// Initialize the RecipesCollection if empty.
if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipes) {
    console.log('Creating default recipe.');
    Meteor.settings.defaultRecipes.forEach(recipe => addRecipe(recipe));
  }
}
