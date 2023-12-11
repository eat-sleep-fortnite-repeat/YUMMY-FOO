import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Recipes } from '../../api/recipes/Recipes';
import { FavRecipes } from '../../api/recipes/FavRecipes';

// User-level publication for Contacts.
// Publish all recipes to all users.
Meteor.publish(Recipes.userPublicationName, function () {
  return Recipes.collection.find({}, { /* any additional options */ });
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(FavRecipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return FavRecipes.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication for Contacts.
// Publish all recipes to admins.
Meteor.publish('Recipes.adminPublicationName', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
