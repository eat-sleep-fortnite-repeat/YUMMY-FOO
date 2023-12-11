import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class FavRecipesCollection {
  constructor() {
    this.name = 'FavRecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: {
        type: String,
        label: 'Recipe Name',
        max: 100,
      },
      image: {
        type: String,
        label: 'Image URL',
        optional: true,
      },
      time: {
        type: String,
        label: 'Time',
      },
      cost: {
        type: String,
        label: 'Cost',
      },
      filter: {
        type: Array,
        label: 'Filter',
        optional: true,
      },
      'filter.$': {
        type: String,
      },
      appliances: {
        type: Array,
        label: 'Appliances',
        optional: true,
      },
      'appliances.$': {
        type: String,
      },
      ingredients: {
        type: Array,
        label: 'Ingredients',
      },
      'ingredients.$': {
        type: String,
      },
      recipe: {
        type: String,
        label: 'Recipe',
      },
      imageId: {
        type: String,
        optional: true,
      },
      dietary: {
        type: Array,
        optional: true,
      },
      'dietary.$': {
        type: String,
        allowedValues: ['Dairy-Free', 'Vegan', 'Gluten-Free', 'Vegetarian'],
      },
      _id: {
        type: String,
        label: '_id',
      },
      owner: {
        type: Array,
        label: 'Owners',
      },
      'owner.$': {
        type: String,
      },
    });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const FavRecipes = new FavRecipesCollection();
